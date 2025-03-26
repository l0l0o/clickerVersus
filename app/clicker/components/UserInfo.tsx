import React from "react";
import { View, Text } from "react-native";
import { UserData } from "../types";
import { styles } from "../styles";

interface UserInfoProps {
  userData: UserData;
  team: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userData, team }) => {
  // Fonction pour obtenir la couleur du stat value selon l'équipe
  const getStatValueStyle = () => {
    switch (team) {
      case "red":
        return styles.redStatValue;
      case "blue":
        return styles.blueStatValue;
      default:
        return {};
    }
  };

  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.username}>{userData.username}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Score Personnel</Text>
          <Text style={[styles.statValue, getStatValueStyle()]}>
            {userData.score}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Pièces</Text>
          <Text style={[styles.statValue, getStatValueStyle()]}>
            {userData.coins}
          </Text>
        </View>
      </View>

      <Text style={styles.hint}>Gagnez une pièce tous les 25 clics !</Text>
    </View>
  );
};
