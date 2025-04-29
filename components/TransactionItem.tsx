import React from "react";
import { View, Text, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Transaction } from "../mock-data/transactions";
import UserAvatar from "./UserAvatar";
import type { AppTheme } from "../constants/theme";

interface TransactionItemProps {
  transaction: Transaction;
  onPress: (id: string) => void;
}

function formatShortDate(ts: number) {
  const date = new Date(ts);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const { styles } = useStyles(stylesheet);

  const isIncoming = transaction.type === "incoming";
  const arrow = isIncoming ? "▼" : "▲";
  const arrowColor = isIncoming ? "#22c55e" : "#ef4444"; // green/red
  const sign = isIncoming ? "+" : "-";

  return (
    <Pressable style={styles.container} onPress={() => onPress(transaction.id)}>
      <UserAvatar
        size={40}
        user={{
          pubkey: transaction.counterparty.pubkey,
          profile: {
            displayName: transaction.counterparty.name,
            image: transaction.counterparty.avatarUrl,
          },
        } as any}
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.date}>{formatShortDate(transaction.timestamp)}</Text>
          <View style={styles.amountRow}>
            <Text style={[styles.arrow, { color: arrowColor }]}>{arrow}</Text>
            <Text style={styles.amount}>
              {sign}
              {transaction.amount.toLocaleString()} sats
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.counterparty}>{transaction.counterparty.name}</Text>
          <Text style={styles.mint}>{transaction.mint}</Text>
        </View>
        <View style={styles.row}>
          {transaction.isZap ? (
            <Text style={styles.zap}>⚡ NIP-61 Zap</Text>
          ) : transaction.memo ? (
            <Text style={styles.memo}>{transaction.memo}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border ?? "#E5E7EB",
    marginBottom: 0,
    marginHorizontal: 0,
    backgroundColor: "transparent",
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  arrow: {
    fontSize: 16,
    marginRight: 2,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222", // neutral color
  },
  date: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  counterparty: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222", // neutral color, no highlight
  },
  mint: {
    fontSize: 12,
    color: theme.colors.secondary,
  },
  memo: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontStyle: "italic",
  },
  zap: {
    fontSize: 13,
    color: "#fbbf24",
    fontWeight: "600",
  },
}));