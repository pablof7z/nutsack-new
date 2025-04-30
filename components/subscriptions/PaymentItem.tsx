import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../Themed";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import { useProfileValue } from "@nostr-dev-kit/ndk-hooks";

export type PaymentStatus = "Completed" | "Canceled" | "Failed";

export interface PaymentItemProps {
  user: NDKUser;
  date: string;
  tier: string;
  amount: string;
  status: PaymentStatus;
}

export const PaymentItem: React.FC<PaymentItemProps> = ({
  user,
  date,
  tier,
  amount,
  status,
}) => {
  const { styles } = useStyles(stylesheet);
  const profile = useProfileValue(user.pubkey);

  let statusColor = "#4CAF50";
  if (status === "Failed") statusColor = "#E57373";
  else if (status === "Canceled") statusColor = "#FFD54F";

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.name}>
          {profile?.displayName || profile?.name || profile?.username || "Unknown"}
        </Text>
        <Text style={styles.tier}>{tier}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#fff",
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: "#AAA",
    marginBottom: 2,
  },
  name: {
    fontWeight: "600",
    fontSize: 15,
    color: "#222",
    marginBottom: 1,
  },
  tier: {
    fontSize: 13,
    color: "#666",
  },
  right: {
    alignItems: "flex-end",
    minWidth: 80,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
    marginBottom: 2,
  },
  status: {
    fontSize: 13,
    fontWeight: "bold",
  },
}));

export default PaymentItem;