import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { styles } from "../styles";
import { AutoClickerData } from "../types";
import {
  calculateUpgradePrice,
  calculateAutoClickRate,
} from "../hooks/useUserData";

type AutoClickerButtonProps = {
  autoClicker: AutoClickerData;
  coins: number;
  team: string;
  onBuy: () => void;
  onUpgrade: () => void;
};

export const AutoClickerButton = ({
  autoClicker,
  coins,
  team,
  onBuy,
  onUpgrade,
}: AutoClickerButtonProps) => {
  // Fonction pour déterminer le style du bouton en fonction de l'équipe
  const getButtonStyle = () => {
    switch (team) {
      case "red":
        return styles.redAutoButton;
      case "blue":
        return styles.blueAutoButton;
      default:
        return styles.redAutoButton;
    }
  };

  // Déterminer si l'utilisateur peut acheter ou améliorer
  const canBuy = !autoClicker.isBought && coins >= 10;
  const canUpgrade =
    autoClicker.isBought && coins >= calculateUpgradePrice(autoClicker.level);

  // Calculer le temps nécessaire pour "rembourser" l'investissement (en clics)
  const calculateROI = (level: number): number => {
    const upgradePrice = calculateUpgradePrice(level);
    const clicksPerSecond = calculateAutoClickRate(level + 1);
    // Un clic équivaut en moyenne à 1/25 pièce
    const coinsPerSecond = clicksPerSecond / 25;
    // Temps de retour sur investissement en secondes
    return Math.round(upgradePrice / coinsPerSecond);
  };

  // Déterminer le texte du bouton
  const getButtonText = () => {
    if (!autoClicker.isBought) {
      return `Acheter Auto-Clicker (10 🪙)`;
    }

    const upgradePrice = calculateUpgradePrice(autoClicker.level);
    const nextRate = calculateAutoClickRate(autoClicker.level + 1).toFixed(1);
    const improvement = (
      (calculateAutoClickRate(autoClicker.level + 1) /
        calculateAutoClickRate(autoClicker.level) -
        1) *
      100
    ).toFixed(0);

    return `Améliorer (${upgradePrice} 🪙) → ${nextRate}/s (+${improvement}%)`;
  };

  // Fonction qui s'exécute lors du clic sur le bouton
  const handleButtonPress = () => {
    if (!autoClicker.isBought) {
      onBuy();
    } else {
      onUpgrade();
    }
  };

  // Déterminer si le bouton est désactivé
  const isDisabled =
    (!autoClicker.isBought && coins < 10) ||
    (autoClicker.isBought && coins < calculateUpgradePrice(autoClicker.level));

  // Calculer les détails sur la vitesse actuelle et prochaine
  const getAutoClickerDetails = () => {
    if (!autoClicker.isBought || autoClicker.level <= 0) return null;

    const currentRate = calculateAutoClickRate(autoClicker.level).toFixed(1);
    const clicksPerMinute = Math.round(
      calculateAutoClickRate(autoClicker.level) * 60
    );
    const coinsPerHour = Math.round((clicksPerMinute * 60) / 25); // 1 pièce tous les 25 clics

    return `Auto-Clicker: ${currentRate}/sec (${coinsPerHour} 🪙/heure) - Niveau ${autoClicker.level}`;
  };

  // Afficher le prochain niveau si disponible
  const getNextLevelPreview = () => {
    if (!autoClicker.isBought || autoClicker.level <= 0) return null;

    const nextLevel = autoClicker.level + 1;
    const nextRate = calculateAutoClickRate(nextLevel).toFixed(1);
    const nextClicksPerMinute = Math.round(
      calculateAutoClickRate(nextLevel) * 60
    );
    const nextCoinsPerHour = Math.round((nextClicksPerMinute * 60) / 25);
    const upgradePrice = calculateUpgradePrice(autoClicker.level);

    // Si le joueur n'a pas assez de pièces, on ne montre pas la prévisualisation
    if (coins < upgradePrice) return null;

    return `Prochain niveau: ${nextRate}/sec (${nextCoinsPerHour} 🪙/heure)`;
  };

  return (
    <View style={styles.autoClickerContainer}>
      {autoClicker.isBought && (
        <>
          <Text style={styles.autoClickerInfo}>{getAutoClickerDetails()}</Text>
          {getNextLevelPreview() && (
            <Text style={styles.autoClickerNextLevel}>
              {getNextLevelPreview()}
            </Text>
          )}
        </>
      )}

      <TouchableOpacity
        style={[
          styles.autoClickerButton,
          getButtonStyle(),
          isDisabled && styles.disabledButton,
        ]}
        onPress={handleButtonPress}
        disabled={isDisabled}
      >
        <ThemedText style={styles.buttonText}>{getButtonText()}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};
