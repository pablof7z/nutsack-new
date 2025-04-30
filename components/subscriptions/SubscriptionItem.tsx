import React from "react";
import { Pressable, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import UserAvatar from "../UserAvatar";
import { Text } from "../Themed";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import { useProfileValue } from "@nostr-dev-kit/ndk-hooks";
import { listItemStylesheet } from "../ListItemStyles";

export type SubscriptionStatus = "overdue" | "due-soon" | "active";

export interface SubscriptionItemProps {
  user: NDKUser | null | undefined;
  tier: string;
  nextPaymentDate: string;
  status: SubscriptionStatus;
  onPay?: () => void;
  onPress?: () => void;
}

export const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  user,
  tier,
  nextPaymentDate,
  status,
  onPay,
  onPress,
}) => {
  const { styles } = useStyles(stylesheet);
  const { styles: listItem } = useStyles(listItemStylesheet);
  const profile = useProfileValue(user?.pubkey);

  const showPayButton = status === "overdue" || status === "due-soon";

  return (
    <View style={listItem.container}>
      <View style={styles.avatar}>
        <UserAvatar user={user} size={40} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>
          {profile?.displayName || profile?.name || profile?.username || "Unknown"}
        </Text>
        <Text style={styles.tier}>{tier}</Text>
        <Text style={styles.date}>{nextPaymentDate}</Text>
      </View>
      {showPayButton && (
        <Pressable
          style={styles.payButton}
          onPress={() => {
            console.log("Pay button pressed");
            if (onPay) {
              console.log("Calling onPay handler");
              onPay();
            } else {
              console.log("No onPay handler provided");
            }
          }}
        >
          <Text style={styles.payButtonText}>Pay</Text>
        </Pressable>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  avatar: {
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
    color: "#222",
  },
  tier: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#AAA",
  },
  payButton: {
    backgroundColor: "#4F8EF7",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
}));