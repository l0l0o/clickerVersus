import { StyleSheet } from "react-native";
import { COLORS } from "../styles";
import { ComboLevel } from "./types";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    padding: 16,
    gap: 20,
  },
  redBackground: {
    backgroundColor: COLORS.red.light,
  },
  blueBackground: {
    backgroundColor: COLORS.blue.light,
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.neutral.text,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  progressBar: {
    width: "100%",
    height: 20,
    backgroundColor: COLORS.neutral.card,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressFill: {
    height: "100%",
  },
  redFill: {
    backgroundColor: COLORS.red.primary,
  },
  blueFill: {
    backgroundColor: COLORS.blue.primary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.neutral.textSecondary,
  },
  countText: {
    fontSize: 38,
    fontWeight: "bold",
    marginVertical: 8,
    color: COLORS.neutral.text,
  },
  clickButton: {
    width: "100%",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  redButton: {
    backgroundColor: COLORS.red.primary,
  },
  blueButton: {
    backgroundColor: COLORS.blue.primary,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Styles pour UserInfo (réduits)
  userInfoContainer: {
    width: "100%",
    backgroundColor: COLORS.neutral.background,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.neutral.text,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 6,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.neutral.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.neutral.text,
  },
  redStatValue: {
    color: COLORS.red.primary,
  },
  blueStatValue: {
    color: COLORS.blue.primary,
  },
  hint: {
    fontSize: 10,
    color: COLORS.neutral.textSecondary,
    textAlign: "center",
    marginTop: 6,
    fontStyle: "italic",
  },

  // Styles pour Auto-Clicker
  autoClickerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: -6,
    marginBottom: 6,
  },
  autoClickerButton: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  redAutoButton: {
    backgroundColor: COLORS.red.secondary,
  },
  blueAutoButton: {
    backgroundColor: COLORS.blue.secondary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  autoClickerInfo: {
    fontSize: 11,
    color: COLORS.neutral.textSecondary,
    fontWeight: "500",
    marginBottom: 4,
  },
  autoClickerNextLevel: {
    fontSize: 10,
    color: COLORS.neutral.textSecondary,
    fontStyle: "italic",
    marginBottom: 6,
  },

  // Styles pour le système de combo
  comboContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  comboText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.neutral.text,
  },
  comboProgressBar: {
    width: 100,
    height: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    marginTop: 4,
    overflow: "hidden",
  },
  comboProgressFill: {
    height: "100%",
    backgroundColor: "#FFD700",
  },

  // Styles pour les différents niveaux de glow
  // Ces styles seront appliqués dynamiquement au bouton de clic
  comboGlowNone: {
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  comboGlowLevel1: {
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  comboGlowLevel2: {
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  comboGlowLevel3: {
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  redGlow: {
    shadowColor: COLORS.red.primary,
  },
  blueGlow: {
    shadowColor: COLORS.blue.primary,
  },

  // Conteneur pour l'animation des pièces
  coinAnimationContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
});

// Fonction d'aide pour obtenir le style de glow en fonction du niveau de combo
export const getComboGlowStyle = (level: ComboLevel, team: string) => {
  const baseGlowStyle = (() => {
    switch (level) {
      case ComboLevel.LEVEL_1:
        return styles.comboGlowLevel1;
      case ComboLevel.LEVEL_2:
        return styles.comboGlowLevel2;
      case ComboLevel.LEVEL_3:
        return styles.comboGlowLevel3;
      default:
        return styles.comboGlowNone;
    }
  })();

  // Ajouter la couleur d'équipe au glow
  const teamGlowStyle = team === "red" ? styles.redGlow : styles.blueGlow;

  return [baseGlowStyle, level > ComboLevel.NONE ? teamGlowStyle : null];
};
