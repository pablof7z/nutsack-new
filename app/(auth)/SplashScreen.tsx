import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AcornLogo from "../../components/AcornLogo";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <AcornLogo />
      <ActivityIndicator size="large" color="#4A148C" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    marginTop: 24,
  },
});