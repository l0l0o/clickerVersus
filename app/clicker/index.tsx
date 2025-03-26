import React, { useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import {
  useTeamScores,
  useTeamActions,
  useUserData,
  useComboSystem,
} from "./hooks";
import {
  ProgressBar,
  ClickButton,
  TeamTitle,
  ScoreCounter,
  UserInfo,
  AutoClickerButton,
  CoinAnimation,
  ComboMeter,
} from "./components";
import { COLORS } from "../styles";
import { ComboLevel } from "./types";

export default function ClickerScreen() {
  const { team } = useLocalSearchParams<{ team: string }>();
  const teamColor = (team as string) || "red";

  const [coinAnimations, setCoinAnimations] = useState<
    { id: string; amount: number }[]
  >([]);

  const { teamStats, count } = useTeamScores();
  const { handleIncrementScore } = useTeamActions(teamColor);

  const {
    userData,
    loading,
    incrementUserScore,
    buyAutoClicker,
    upgradeAutoClicker,
    addBonusCoins,
  } = useUserData(teamColor);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const {
    comboLevel,
    isComboActive,
    handleClick: handleComboClick,
    clicksCounter,
  } = useComboSystem({
    onBonusCoinsEarned: (amount) => {
      const newId = generateUniqueId();
      setCoinAnimations((prev) => [...prev, { id: newId, amount }]);

      addBonusCoins(amount);
    },
    onComboLevelChange: (level) => {
      console.log(`Combo level changed to ${level}`);
    },
  });

  const handleClick = async () => {
    await handleIncrementScore();

    await incrementUserScore();

    handleComboClick();
  };

  const handleAnimationComplete = (id: string) => {
    setCoinAnimations((prev) => prev.filter((anim) => anim.id !== id));
  };

  const getBackgroundStyle = () => {
    switch (teamColor) {
      case "red":
        return styles.redBackground;
      case "blue":
        return styles.blueBackground;
      default:
        return styles.redBackground;
    }
  };

  const getStatusBarColor = () => {
    switch (teamColor) {
      case "red":
        return COLORS.red.light;
      case "blue":
        return COLORS.blue.light;
      default:
        return COLORS.red.light;
    }
  };

  const getLoadingColor = () => {
    switch (teamColor) {
      case "red":
        return COLORS.red.primary;
      case "blue":
        return COLORS.blue.primary;
      default:
        return COLORS.red.primary;
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          getBackgroundStyle(),
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <StatusBar
          backgroundColor={getStatusBarColor()}
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" color={getLoadingColor()} />
      </View>
    );
  }

  return (
    <View style={[styles.container, getBackgroundStyle()]}>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        barStyle="dark-content"
      />
      <View style={styles.contentContainer}>
        <TeamTitle team={teamColor} />

        <UserInfo userData={userData} team={teamColor} />

        <ProgressBar teamStats={teamStats} />
        <ScoreCounter count={count} />

        <ClickButton
          onPress={handleClick}
          team={teamColor}
          comboLevel={comboLevel}
        />

        <AutoClickerButton
          autoClicker={userData.autoClicker}
          coins={userData.coins}
          team={teamColor}
          onBuy={buyAutoClicker}
          onUpgrade={upgradeAutoClicker}
        />

        <ComboMeter comboLevel={comboLevel} isActive={isComboActive} />

        <View style={styles.coinAnimationContainer}>
          {coinAnimations.map((anim) => (
            <CoinAnimation
              key={anim.id}
              amount={anim.amount}
              onAnimationComplete={() => handleAnimationComplete(anim.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
