import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../styles";

interface CoinAnimationProps {
  amount: number;
  onAnimationComplete: () => void;
}

export const CoinAnimation: React.FC<CoinAnimationProps> = ({
  amount,
  onAnimationComplete,
}) => {
  // Animations
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Démarrer avec une animation de scale up pour une apparition
    Animated.sequence([
      // Apparition avec un effet de scale et d'opacité
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1.2,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),

      // Maintenir un moment puis commencer à monter
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),

      // Animation de montée et disparition
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Réinitialiser les valeurs d'animation
      translateY.setValue(0);
      opacity.setValue(0);
      scale.setValue(0.5);

      // Notifier que l'animation est terminée
      onAnimationComplete();
    });
  }, [amount]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    >
      <Text style={styles.text}>+{amount} 🪙</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.4)",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.neutral.text,
  },
});
