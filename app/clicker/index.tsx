import React, { useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import {
  useTeamScores,
  useTeamActions,
  useUserData,
  useComboSystem,
} from "./hooks";
import {
  ProgressBar,
  ClickButton,
  TeamTitle,
  ScoreCounter,
  UserInfo,
  AutoClickerButton,
  CoinAnimation,
  ComboMeter,
} from "./components";
import { COLORS } from "../styles";
import { ComboLevel } from "./types";

export default function ClickerScreen() {
  const { team } = useLocalSearchParams<{ team: string }>();
  const teamColor = (team as string) || "red";

  // État pour gérer les animations de pièces
  const [coinAnimations, setCoinAnimations] = useState<
    { id: string; amount: number }[]
  >([]);

  // Données d'équipe (globales)
  const { teamStats, count } = useTeamScores();
  const { handleIncrementScore } = useTeamActions(teamColor);

  // Données utilisateur (individuelles)
  const {
    userData,
    loading,
    incrementUserScore,
    buyAutoClicker,
    upgradeAutoClicker,
    addBonusCoins,
  } = useUserData(teamColor);

  // Fonction pour générer un ID unique basé sur le timestamp et un nombre aléatoire
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Système de combo
  const {
    comboLevel,
    isComboActive,
    handleClick: handleComboClick,
    clicksCounter,
  } = useComboSystem({
    onBonusCoinsEarned: (amount) => {
      // Ajouter une animation de pièces avec un ID unique
      const newId = generateUniqueId();
      setCoinAnimations((prev) => [...prev, { id: newId, amount }]);

      // Ajouter les pièces au compte de l'utilisateur avec la fonction dédiée
      addBonusCoins(amount);
    },
    onComboLevelChange: (level) => {
      // On pourrait ajouter des animations ou sons ici
      console.log(`Combo level changed to ${level}`);
    },
  });

  // Fonction pour gérer le clic (incrémente à la fois le score d'équipe et individuel)
  const handleClick = async () => {
    // Incrémenter le score de l'équipe
    await handleIncrementScore();

    // Incrémenter le score personnel
    await incrementUserScore();

    // Mettre à jour le système de combo
    handleComboClick();
  };

  // Fonction pour supprimer une animation de pièce une fois terminée
  const handleAnimationComplete = (id: string) => {
    setCoinAnimations((prev) => prev.filter((anim) => anim.id !== id));
  };

  // Fonction pour déterminer le style de fond en fonction de l'équipe
  const getBackgroundStyle = () => {
    switch (teamColor) {
      case "red":
        return styles.redBackground;
      case "blue":
        return styles.blueBackground;
      default:
        return styles.redBackground;
    }
  };

  // Fonction pour déterminer la couleur de la barre de statut
  const getStatusBarColor = () => {
    switch (teamColor) {
      case "red":
        return COLORS.red.light;
      case "blue":
        return COLORS.blue.light;
      default:
        return COLORS.red.light;
    }
  };

  // Fonction pour déterminer la couleur de l'indicateur de chargement
  const getLoadingColor = () => {
    switch (teamColor) {
      case "red":
        return COLORS.red.primary;
      case "blue":
        return COLORS.blue.primary;
      default:
        return COLORS.red.primary;
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          getBackgroundStyle(),
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <StatusBar
          backgroundColor={getStatusBarColor()}
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" color={getLoadingColor()} />
      </View>
    );
  }

  return (
    <View style={[styles.container, getBackgroundStyle()]}>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        barStyle="dark-content"
      />
      <View style={styles.contentContainer}>
        <TeamTitle team={teamColor} />

        {/* Informations utilisateur */}
        <UserInfo userData={userData} team={teamColor} />

        {/* Progression globale des équipes */}
        <ProgressBar teamStats={teamStats} />
        <ScoreCounter count={count} />

        {/* Bouton de clic avec effet de glow basé sur le niveau de combo */}
        <ClickButton
          onPress={handleClick}
          team={teamColor}
          comboLevel={comboLevel}
        />

        {/* Bouton d'auto-clicker */}
        <AutoClickerButton
          autoClicker={userData.autoClicker}
          coins={userData.coins}
          team={teamColor}
          onBuy={buyAutoClicker}
          onUpgrade={upgradeAutoClicker}
        />

        {/* Indicateur de combo */}
        <ComboMeter comboLevel={comboLevel} isActive={isComboActive} />

        {/* Conteneur pour les animations de pièces */}
        <View style={styles.coinAnimationContainer}>
          {coinAnimations.map((anim) => (
            <CoinAnimation
              key={anim.id}
              amount={anim.amount}
              onAnimationComplete={() => handleAnimationComplete(anim.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
