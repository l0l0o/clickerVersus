import { ThemedText } from "../../components/ThemedText";
import { styles } from "../styles";

type ScoreCounterProps = {
  count: number;
};

export const ScoreCounter = ({ count }: ScoreCounterProps) => {
  return <ThemedText style={styles.countText}>{count}</ThemedText>;
};
