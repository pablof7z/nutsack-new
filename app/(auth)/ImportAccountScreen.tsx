import React, { useRef, useEffect, useState } from "react";
import { Animated, Pressable, View, Text, Easing, Dimensions, TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { LinearGradient } from "expo-linear-gradient";
import AcornLogo from "../../components/AcornLogo";
import { router } from "expo-router";

// Neon color options
const NEON_PINK = "#E94560";
const NEON_MINT = "#00F5D4";
const HEADER_COLOR = NEON_PINK;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ImportAccountScreen() {
  const { styles } = useStyles(stylesheet);

  // Header animation: fade-in + slide-down
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(-30)).current;

  // Logo animation: fade-in + neon pulse
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoGlow = useRef(new Animated.Value(0.6)).current;

  // Button animation: fade-in
  const primaryBtnOpacity = useRef(new Animated.Value(0)).current;

  // Shimmer overlay animation
  const shimmerTranslate = useRef(new Animated.Value(0)).current;

  // Input state
  const [importValue, setImportValue] = useState("");

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(logoGlow, {
        toValue: 1,
        duration: 750,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoGlow, { toValue: 0.6, duration: 750, useNativeDriver: false }),
          Animated.timing(logoGlow, { toValue: 1, duration: 750, useNativeDriver: false }),
        ])
      ).start();
    });

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(headerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(headerTranslate, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    }, 100);

    setTimeout(() => {
      Animated.timing(primaryBtnOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }, 300);

    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: SCREEN_WIDTH,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Button press scale/shine
  const primaryScale = useRef(new Animated.Value(1)).current;
  const handlePrimaryPressIn = () => {
    Animated.timing(primaryScale, { toValue: 1.05, duration: 100, useNativeDriver: true }).start();
  };
  const handlePrimaryPressOut = () => {
    Animated.timing(primaryScale, { toValue: 1, duration: 100, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0D0D0D", "#16213E", "#1A1A2E"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {/* Shimmer overlay */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shimmer,
            {
              opacity: 0.10,
              transform: [{ translateX: shimmerTranslate }],
            },
          ]}
        >
          <LinearGradient
            colors={["transparent", "#fff", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.shimmerInner}
          />
        </Animated.View>

        {/* Logo with neon glow and fade-in */}
        <Animated.View
          style={[
            styles.logoWrap,
            {
              opacity: logoOpacity,
              shadowColor: HEADER_COLOR,
              shadowRadius: 25,
              shadowOpacity: 0.6,
              shadowOffset: { width: 0, height: 0 },
            },
          ]}
        >
          <AcornLogo
            size={140}
            color="#fff"
            style={{ marginBottom: 32 }}
            glow
          />
        </Animated.View>

        {/* Header */}
        <Animated.Text
          style={[
            styles.header,
            {
              color: HEADER_COLOR,
              opacity: headerOpacity,
              transform: [{ translateY: headerTranslate }],
            },
          ]}
        >
          Import Account
        </Animated.Text>

        {/* Input */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Paste nsec or bunker://"
            placeholderTextColor="#aaa"
            value={importValue}
            onChangeText={setImportValue}
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={HEADER_COLOR}
          />
        </View>

        {/* Button */}
        <View style={styles.buttonGroup}>
          <Animated.View style={{ opacity: primaryBtnOpacity }}>
            <Animated.View style={{ transform: [{ scale: primaryScale }] }}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
                onPressIn={handlePrimaryPressIn}
                onPressOut={handlePrimaryPressOut}
                onPress={() => {
                  // TODO: Implement import logic
                  router.replace("/(tabs)");
                }}
                android_ripple={{ color: "#fff" }}
                disabled={!importValue.trim()}
              >
                <Text style={styles.primaryButtonText}>IMPORT</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 100,
    justifyContent: "flex-start",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  shimmerInner: {
    width: 180,
    height: "100%",
  },
  logoWrap: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    zIndex: 2,
  },
  header: {
    fontFamily: "Montserrat-Black",
    fontSize: 40,
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 48,
    textShadowColor: HEADER_COLOR,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
    zIndex: 2,
  },
  inputGroup: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
    zIndex: 2,
  },
  input: {
    width: 280,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#23243a",
    color: "#fff",
    fontSize: 16,
    borderWidth: 2,
    borderColor: HEADER_COLOR,
    marginBottom: 8,
    shadowColor: HEADER_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    zIndex: 2,
  },
  primaryButton: {
    backgroundColor: HEADER_COLOR,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 220,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: HEADER_COLOR,
    shadowOpacity: 0.7,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  primaryButtonPressed: {
    shadowRadius: 22,
    shadowOpacity: 1,
  },
  primaryButtonText: {
    color: "#0D0D0D",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
}));