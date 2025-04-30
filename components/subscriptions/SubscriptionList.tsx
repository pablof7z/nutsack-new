import React from "react";
import { View, FlatList } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../Themed";
import { SubscriptionItem, SubscriptionStatus } from "./SubscriptionItem";
import type { NDKUser } from "@nostr-dev-kit/ndk";

export interface SubscriptionListItem {
  user: NDKUser;
  tier: string;
  nextPaymentDate: string;
  status: SubscriptionStatus;
  onPay?: () => void;
  onPress?: () => void;
}

interface SubscriptionListProps {
  subscriptions: SubscriptionListItem[];
  emptyMessage?: string;
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  emptyMessage = "You have no active subscriptions.",
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Subscriptions</Text>
      {subscriptions.length === 0 ? (
        <Text style={styles.empty}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={subscriptions}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <SubscriptionItem
              user={item.user}
              tier={item.tier}
              nextPaymentDate={item.nextPaymentDate}
              status={item.status}
              onPay={item.onPay}
              onPress={item.onPress}
            />
          )}
          contentContainerStyle={styles.list}
          style={{ height: 240 }}
        />
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  empty: {
    color: "#AAA",
    fontSize: 15,
    textAlign: "center",
    marginTop: 32,
  },
  list: {
    paddingBottom: 24,
  },
}));

export default SubscriptionList;