import React from "react";
import { View, ViewProps, StyleSheet, useColorScheme } from "react-native";

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode;
}

export function ThemedView({ style, children, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#121212" : "#fff";

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
