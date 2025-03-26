import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, setDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/connection/database";
import { UserData } from "../types";

// Fonction pour calculer le prix d'amélioration de l'auto-clicker
// Avec une courbe plus douce pour rendre la progression plus accessible
export const calculateUpgradePrice = (level: number): number => {
  // Prix de base : 10
  // Nouvelle formule : prix = base + (niveau * 5)
  // Cette formule crée une progression linéaire plus douce
  // Niveau 1->2 : 15 pièces
  // Niveau 2->3 : 20 pièces
  // Niveau 3->4 : 25 pièces
  // etc.
  const basePrice = 10;
  const incrementPerLevel = 5;

  return basePrice + level * incrementPerLevel;
};

// Fonction pour calculer la vitesse de l'auto-clicker avec une courbe exponentielle
export const calculateAutoClickRate = (level: number): number => {
  // Niveau 1: 0.5 clics par seconde (base)
  // Augmentation exponentielle: base * (1.3 ^ (level-1))
  // Cette formule donne une progression plus rapide en niveaux supérieurs
  const baseRate = 0.5;
  const growthFactor = 1.3;

  if (level <= 0) return 0;
  return baseRate * Math.pow(growthFactor, level - 1);
};

export const useUserData = (team: string) => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    team: team,
    score: 0,
    coins: 0,
    autoClicker: {
      level: 0,
      isBought: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const autoClickerInterval = useRef<NodeJS.Timeout | null>(null);
  const teamDocRef = useRef(doc(db, "scores", team));

  // Effet pour charger les données utilisateur
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        // Récupérer le nom d'utilisateur depuis AsyncStorage
        const username = await AsyncStorage.getItem("username");

        if (!username) {
          console.error("Aucun nom d'utilisateur trouvé");
          return;
        }

        // Création d'un ID unique pour l'utilisateur basé sur son username
        const userId = username.toLowerCase().replace(/\s+/g, "_");

        // Essayer de récupérer les données utilisateur depuis Firestore
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // Mettre à jour les données utilisateur depuis Firestore
          const data = userDoc.data() as UserData;

          // Assurer la compatibilité avec les anciens documents qui n'ont pas la propriété autoClicker
          if (!data.autoClicker) {
            data.autoClicker = {
              level: 0,
              isBought: false,
            };
          }

          setUserData(data);
        } else {
          // Créer un nouvel utilisateur si non existant
          const newUserData: UserData = {
            username,
            team,
            score: 0,
            coins: 0,
            autoClicker: {
              level: 0,
              isBought: false,
            },
          };

          await setDoc(userRef, newUserData);
          setUserData(newUserData);
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données utilisateur:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
    // Mise à jour de la référence de l'équipe quand l'équipe change
    teamDocRef.current = doc(db, "scores", team);
  }, [team]);

  // Effet pour gérer l'auto-clicker
  useEffect(() => {
    // Démarrer l'auto-clicker si acheté et niveau > 0
    if (userData.autoClicker.isBought && userData.autoClicker.level > 0) {
      const clickRate = calculateAutoClickRate(userData.autoClicker.level);
      const intervalTime = Math.floor(1000 / clickRate);

      // Nettoyer l'intervalle existant s'il y en a un
      if (autoClickerInterval.current) {
        clearInterval(autoClickerInterval.current);
      }

      // Créer un nouvel intervalle
      autoClickerInterval.current = setInterval(() => {
        incrementUserScore(true);
      }, intervalTime);
    }

    // Nettoyage lors du démontage ou des changements
    return () => {
      if (autoClickerInterval.current) {
        clearInterval(autoClickerInterval.current);
        autoClickerInterval.current = null;
      }
    };
  }, [userData.autoClicker.isBought, userData.autoClicker.level]);

  const incrementUserScore = async (fromAutoClicker = false) => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (!username) return;

      const userId = username.toLowerCase().replace(/\s+/g, "_");
      const userRef = doc(db, "users", userId);

      // Récupérer les données actuelles pour calculer les pièces
      const userDoc = await getDoc(userRef);
      const currentData = userDoc.exists()
        ? (userDoc.data() as UserData)
        : null;

      if (currentData) {
        const newScore = currentData.score + 1;
        const shouldAddCoin = newScore % 10 === 0; // Une pièce tous les 10 clics (nouveau ratio)

        // Mise à jour du score dans Firestore
        await updateDoc(userRef, {
          score: increment(1),
          ...(shouldAddCoin ? { coins: increment(1) } : {}),
        });

        // Si le clic provient de l'auto-clicker, on incrémente également le score de l'équipe
        if (fromAutoClicker) {
          await updateDoc(teamDocRef.current, {
            score: increment(1),
          });
        }

        // Mise à jour locale de l'état
        setUserData((prev) => ({
          ...prev,
          score: newScore,
          coins: shouldAddCoin ? prev.coins + 1 : prev.coins,
        }));
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du score utilisateur:",
        error
      );
    }
  };

  // Fonction pour ajouter des pièces bonus (utilisée par le système de combo)
  const addBonusCoins = async (amount: number) => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (!username) return;

      const userId = username.toLowerCase().replace(/\s+/g, "_");
      const userRef = doc(db, "users", userId);

      // Mise à jour dans Firestore
      await updateDoc(userRef, {
        coins: increment(amount),
      });

      // Mise à jour locale
      setUserData((prev) => ({
        ...prev,
        coins: prev.coins + amount,
      }));

      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout de pièces bonus:", error);
      return false;
    }
  };

  // Fonction pour acheter l'auto-clicker
  const buyAutoClicker = async () => {
    if (userData.coins < 10 || userData.autoClicker.isBought) return;

    try {
      const username = await AsyncStorage.getItem("username");
      if (!username) return;

      const userId = username.toLowerCase().replace(/\s+/g, "_");
      const userRef = doc(db, "users", userId);

      // Mise à jour dans Firestore
      await updateDoc(userRef, {
        coins: increment(-10),
        "autoClicker.isBought": true,
        "autoClicker.level": 1,
      });

      // Mise à jour locale
      setUserData((prev) => ({
        ...prev,
        coins: prev.coins - 10,
        autoClicker: {
          isBought: true,
          level: 1,
        },
      }));
    } catch (error) {
      console.error("Erreur lors de l'achat de l'auto-clicker:", error);
    }
  };

  // Fonction pour améliorer l'auto-clicker
  const upgradeAutoClicker = async () => {
    if (!userData.autoClicker.isBought) return;

    const currentLevel = userData.autoClicker.level;
    const upgradePrice = calculateUpgradePrice(currentLevel);

    if (userData.coins < upgradePrice) return;

    try {
      const username = await AsyncStorage.getItem("username");
      if (!username) return;

      const userId = username.toLowerCase().replace(/\s+/g, "_");
      const userRef = doc(db, "users", userId);

      // Mise à jour dans Firestore
      await updateDoc(userRef, {
        coins: increment(-upgradePrice),
        "autoClicker.level": increment(1),
      });

      // Mise à jour locale
      setUserData((prev) => ({
        ...prev,
        coins: prev.coins - upgradePrice,
        autoClicker: {
          ...prev.autoClicker,
          level: prev.autoClicker.level + 1,
        },
      }));
    } catch (error) {
      console.error("Erreur lors de l'amélioration de l'auto-clicker:", error);
    }
  };

  return {
    userData,
    loading,
    incrementUserScore,
    buyAutoClicker,
    upgradeAutoClicker,
    calculateUpgradePrice,
    addBonusCoins,
  };
};
