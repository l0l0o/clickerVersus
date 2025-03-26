import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { COLORS } from "../styles";

interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
}

export function ThemedText({ style, children, ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? "#fff" : COLORS.neutral.text;

  return (
    <Text style={[styles.text, { color }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
