import { ThemedText } from "../../components/ThemedText";
import { styles } from "../styles";

type TeamTitleProps = {
  team: string;
};

export const TeamTitle = ({ team }: TeamTitleProps) => {
  const getTeamName = () => {
    switch (team) {
      case "red":
        return "Rouge";
      case "blue":
        return "Bleue";
      default:
        return "Rouge";
    }
  };

  return (
    <ThemedText style={styles.teamTitle}>Équipe {getTeamName()}</ThemedText>
  );
};
