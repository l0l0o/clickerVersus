import { ThemedText } from "./components/ThemedText";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles, COLORS } from "./styles";
import React from "react";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem("username");
      const savedTeam = await AsyncStorage.getItem("team");

      if (savedUsername && savedTeam) {
        // L'utilisateur a déjà un pseudo et une équipe, redirection vers le clicker
        router.push({
          pathname: "/clicker",
          params: { team: savedTeam },
        });
      } else if (savedUsername) {
        // L'utilisateur a déjà un pseudo mais pas d'équipe
        setUsername(savedUsername);
        setStep(2);
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement des données utilisateur:",
        error
      );
    }
  };

  const handleUsernameSubmit = async () => {
    if (username.trim().length < 3) {
      setError("Le pseudo doit contenir au moins 3 caractères");
      return;
    }

    try {
      await AsyncStorage.setItem("username", username.trim());
      setError("");
      setStep(2);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du pseudo:", error);
      setError("Erreur lors de la sauvegarde du pseudo");
    }
  };

  const selectTeam = async (selectedTeam: string) => {
    try {
      await AsyncStorage.setItem("team", selectedTeam);
      router.push({
        pathname: "/clicker",
        params: { team: selectedTeam },
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'équipe:", error);
      setError("Erreur lors de la sauvegarde de l'équipe");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar
        backgroundColor={COLORS.purple.light}
        barStyle="dark-content"
      />

      {step === 1 ? (
        <>
          <ThemedText style={styles.title}>
            Bienvenue dans le Clicker Game!
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Choisissez un pseudo pour commencer
          </ThemedText>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Entrez votre pseudo"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            maxLength={20}
            placeholderTextColor={COLORS.neutral.textSecondary}
          />

          <TouchableOpacity
            style={[styles.button, styles.neutralButton]}
            onPress={handleUsernameSubmit}
          >
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.teamSelectionContainer}>
          <ThemedText style={styles.title}>Bonjour {username}!</ThemedText>
          <ThemedText style={styles.teamSelectionTitle}>
            Choisissez votre équipe
          </ThemedText>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={() => selectTeam("red")}
            >
              <Text style={styles.buttonText}>Rouge</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.blueButton]}
              onPress={() => selectTeam("blue")}
            >
              <Text style={styles.buttonText}>Bleu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
