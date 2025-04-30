import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { mockWalletBalance } from "../mock-data/wallet";
import type { AppTheme } from "../constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface WalletHeaderProps {
  onSend: () => void;
  onReceive: () => void;
  scrollY: SharedValue<number>;
}

const SCROLL_THRESHOLD = 100;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function WalletHeader({
  onSend,
  onReceive,
  scrollY,
}: WalletHeaderProps) {
  const { styles } = useStyles(stylesheet);

  const containerStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [220, 80], Extrapolate.CLAMP),
  }));

  const width = Dimensions.get("window").width;

  const balanceStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [56, 22], Extrapolate.CLAMP),
    marginTop: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [50, 0], Extrapolate.CLAMP),
    width: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [width, width/4], Extrapolate.CLAMP),
    textAlign: "center",
  }));

  const fiatStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, SCROLL_THRESHOLD * 0.6, SCROLL_THRESHOLD], [1, 0.5, 0], Extrapolate.CLAMP),
    textAlign: "center",
    width: "100%",
  }));

  const actionsStyle = useAnimatedStyle(() => ({
    flexDirection: "row",
    opacity: 1,
    marginTop: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [20, -30], Extrapolate.CLAMP),
    marginLeft: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [0, width*0.5], Extrapolate.CLAMP),
    justifyContent: "center",
    width: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [width, width/3], Extrapolate.CLAMP),
  }));

  const actionButton = useAnimatedStyle(() => ({
    width: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [width * 0.4, 50], Extrapolate.CLAMP),
    height: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [50, 50], Extrapolate.CLAMP),
    borderRadius: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [8, 100], Extrapolate.CLAMP),
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [24, 0], Extrapolate.CLAMP),
  }));

  const actionText = useAnimatedStyle(() => ({
    ...styles.actionText,
    opacity: interpolate(scrollY.value, [0, SCROLL_THRESHOLD * 0.6, SCROLL_THRESHOLD], [1, 0], Extrapolate.CLAMP),
    fontSize: interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [18, 1], Extrapolate.CLAMP),
    color: "#222",
    fontWeight: "700",
    textTransform: "uppercase",
  }));

  return (
    <Animated.View style={[styles.headerContainer, containerStyle]}>
      <Animated.Text style={[styles.balanceText, balanceStyle]}>
        {mockWalletBalance.total.toLocaleString()} sats
      </Animated.Text>
      <Animated.Text style={[styles.fiatText, fiatStyle]}>
        ≈ {mockWalletBalance.currency} {mockWalletBalance.fiatEquivalent.toFixed(2)}
      </Animated.Text>
        <Animated.View style={actionsStyle}>
          <AnimatedPressable style={actionButton} onPress={onSend}>
            <FontAwesome name="arrow-up" size={18} color="#222" />
            <Animated.Text style={actionText}>{' '}Send</Animated.Text>
          </AnimatedPressable>
          <AnimatedPressable style={actionButton} onPress={onReceive}>
            <FontAwesome name="arrow-down" size={18} color="#222" />
            <Animated.Text style={actionText}>{' '}Receive</Animated.Text>
          </AnimatedPressable>
      </Animated.View>
    </Animated.View>
  );
}

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  headerContainer: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },
  balanceText: {
    fontWeight: "800",
    color: "#222",
    letterSpacing: -2,
  },
  fiatText: {
    fontSize: 24,
    color: "#222",
    fontWeight: "600",
  },
  actionButton: {
    borderWidth: 1,
    backgroundColor: "#000000",
    borderColor: "#DDD",
    flexDirection: "row",
  },
  actionText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
}));