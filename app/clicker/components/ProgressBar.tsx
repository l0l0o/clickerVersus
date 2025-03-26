import { View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { TeamColor, TeamStats } from "../types";
import { styles } from "../styles";

type ProgressBarProps = {
  teamStats: TeamStats;
};

export const ProgressBar = ({ teamStats }: ProgressBarProps) => {
  const getPercentage = (teamColor: TeamColor) => {
    const total = teamStats.red + teamStats.blue;
    if (total === 0) return 0;
    return (teamStats[teamColor] / total) * 100;
  };

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            styles.redFill,
            { width: `${getPercentage("red")}%` },
          ]}
        />
        <View
          style={[
            styles.progressFill,
            styles.blueFill,
            { width: `${getPercentage("blue")}%` },
          ]}
        />
      </View>
      <View style={styles.statsContainer}>
        <ThemedText style={styles.statsText}>
          Rouge: {getPercentage("red").toFixed(1)}%
        </ThemedText>
        <ThemedText style={styles.statsText}>
          Bleu: {getPercentage("blue").toFixed(1)}%
        </ThemedText>
      </View>
    </View>
  );
};
