import { StyleSheet } from "react-native";

// Palette de couleurs modernes pour chaque équipe
export const COLORS = {
  red: {
    primary: "#FF5252", // Rouge principal
    secondary: "#FF7F7F", // Rouge secondaire (pour l'auto-clicker)
    light: "#FFECEC", // Rouge très clair (background)
    dark: "#E53935", // Rouge foncé (boutons, accents)
    text: "#FFFFFF", // Texte sur fond rouge
  },
  blue: {
    primary: "#448AFF", // Bleu principal
    secondary: "#7AADFF", // Bleu secondaire (pour l'auto-clicker)
    light: "#ECF2FF", // Bleu très clair (background)
    dark: "#2962FF", // Bleu foncé (boutons, accents)
    text: "#FFFFFF", // Texte sur fond bleu
  },
  purple: {
    primary: "#AB47BC", // Violet principal
    light: "#F5EEFA", // Violet très clair (background)
    dark: "#8E24AA", // Violet foncé (boutons, accents)
  },
  neutral: {
    background: "#FFFFFF", // Fond blanc
    card: "#F5F5F5", // Gris très clair (cards)
    text: "#212121", // Texte principal
    textSecondary: "#757575", // Texte secondaire
    input: "#F5F5F5", // Fond des inputs
    border: "#EEEEEE", // Bordures légères
    button: "#424242", // Bouton neutre
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    padding: 24,
    backgroundColor: COLORS.purple.light, // Fond violet pour l'écran d'accueil
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: COLORS.neutral.text,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.neutral.textSecondary,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: COLORS.neutral.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 16,
    color: COLORS.neutral.text,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  teamSelectionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  teamSelectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    color: COLORS.neutral.text,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
    flexWrap: "wrap",
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  redButton: {
    backgroundColor: COLORS.red.primary,
  },
  blueButton: {
    backgroundColor: COLORS.blue.primary,
  },
  purpleButton: {
    backgroundColor: COLORS.purple.primary,
  },
  neutralButton: {
    backgroundColor: COLORS.purple.primary, // Utiliser le violet pour le bouton neutre
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: COLORS.red.primary,
    marginBottom: 16,
    fontSize: 14,
  },
});
