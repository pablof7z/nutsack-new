import React from "react";
import { View, Text, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { mockWalletBalance } from "../mock-data/wallet";
import type { AppTheme } from "../constants/theme";


interface WalletHeaderProps {
  onSend: () => void;
  onReceive: () => void;
}

export default function WalletHeader({ onSend, onReceive }: WalletHeaderProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{mockWalletBalance.total.toLocaleString()} sats</Text>
        <Text style={styles.fiatText}>
          ≈ {mockWalletBalance.currency} {mockWalletBalance.fiatEquivalent.toFixed(2)}
        </Text>
      </View>
      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={onSend}>
          <Text style={styles.actionText}>Send</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onReceive}>
          <Text style={styles.actionText}>Receive</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  headerContainer: {
    flex: 0.75,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: "transparent",
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  balanceText: {
    fontSize: 56,
    fontWeight: "800",
    color: "#222", // neutral color
    letterSpacing: -2,
  },
  fiatText: {
    fontSize: 24,
    color: "#222", // neutral color
    marginTop: 8,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 32,
  },
  actionButton: {
    backgroundColor: "transparent", // no colored background
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 48,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD", // subtle border for button shape
  },
  actionText: {
    color: "#222", // neutral color
    fontWeight: "700",
    fontSize: 22,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
}));

