import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "./components/ThemedText";
import { ThemedView } from "./components/ThemedView";
import React from "react";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Cette page n'existe pas.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText style={styles.linkText}>Retourner à l'accueil</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: "#2e78b7",
  },
});
