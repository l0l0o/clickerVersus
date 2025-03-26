import { TouchableOpacity } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { styles, getComboGlowStyle } from "../styles";
import { ComboLevel } from "../types";

type ClickButtonProps = {
  onPress: () => void;
  team: string;
  comboLevel?: ComboLevel;
};

export const ClickButton = ({
  onPress,
  team,
  comboLevel = ComboLevel.NONE,
}: ClickButtonProps) => {
  // Fonction pour déterminer le style du bouton en fonction de l'équipe
  const getButtonStyle = () => {
    switch (team) {
      case "red":
        return styles.redButton;
      case "blue":
        return styles.blueButton;
      default:
        return styles.redButton;
    }
  };

  // Obtenir les styles de glow basés sur le niveau de combo
  const glowStyles = getComboGlowStyle(comboLevel, team);

  return (
    <TouchableOpacity
      style={[styles.clickButton, getButtonStyle(), ...glowStyles]}
      onPress={onPress}
    >
      <ThemedText style={styles.buttonText}>CLICK ME</ThemedText>
    </TouchableOpacity>
  );
};
