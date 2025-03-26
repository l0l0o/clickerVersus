import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { styles } from "../styles";
import { ComboLevel, COMBO_CONFIG } from "../types";

interface ComboMeterProps {
  comboLevel: ComboLevel;
  isActive: boolean;
}

export const ComboMeter: React.FC<ComboMeterProps> = ({
  comboLevel,
  isActive,
}) => {
  // Animation pour l'apparition/disparition
  const opacity = useRef(new Animated.Value(0)).current;

  // Calculer le prochain niveau à atteindre
  const getNextLevelTime = () => {
    switch (comboLevel) {
      case ComboLevel.NONE:
        return COMBO_CONFIG[ComboLevel.LEVEL_1].requiredTime;
      case ComboLevel.LEVEL_1:
        return COMBO_CONFIG[ComboLevel.LEVEL_2].requiredTime;
      case ComboLevel.LEVEL_2:
        return COMBO_CONFIG[ComboLevel.LEVEL_3].requiredTime;
      default:
        return COMBO_CONFIG[ComboLevel.LEVEL_3].requiredTime;
    }
  };

  // Obtenir le texte du combo basé sur le niveau
  const getComboText = () => {
    if (!isActive) return "Combo perdu!";

    switch (comboLevel) {
      case ComboLevel.NONE:
        return "Continuez à cliquer!";
      case ComboLevel.LEVEL_1:
        return "Combo x1! +1 🪙 toutes les 5 secondes";
      case ComboLevel.LEVEL_2:
        return "Combo x2! +3 🪙 toutes les 3 secondes";
      case ComboLevel.LEVEL_3:
        return "Combo x3! +1 🪙 par seconde";
      default:
        return "Continuez à cliquer!";
    }
  };

  // Largeur du fill de la barre de progression (en pourcentage)
  const getProgressWidth = () => {
    if (comboLevel === ComboLevel.LEVEL_3) return 100;

    const currentLevelTime = COMBO_CONFIG[comboLevel].requiredTime;
    const nextLevelTime = getNextLevelTime();
    const progress = (currentLevelTime / nextLevelTime) * 100;

    return progress;
  };

  // Animer l'apparition/disparition du combo meter
  useEffect(() => {
    if (isActive || comboLevel > ComboLevel.NONE) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive, comboLevel]);

  // Ne rien afficher si pas de combo actif et au niveau 0
  if (!isActive && comboLevel === ComboLevel.NONE) {
    return null;
  }

  return (
    <Animated.View style={[styles.comboContainer, { opacity }]}>
      <Text style={styles.comboText}>{getComboText()}</Text>

      {/* Barre de progression du combo */}
      {isActive && comboLevel < ComboLevel.LEVEL_3 && (
        <View style={styles.comboProgressBar}>
          <View
            style={[
              styles.comboProgressFill,
              { width: `${getProgressWidth()}%` },
            ]}
          />
        </View>
      )}
    </Animated.View>
  );
};
