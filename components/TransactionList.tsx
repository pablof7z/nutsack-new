import React from "react";
import { View } from "react-native";
import { LegendList } from "@legendapp/list";
import { mockTransactions, Transaction } from "../mock-data/transactions";
import TransactionItem from "./TransactionItem";
import Animated, { SharedValue } from "react-native-reanimated";

interface TransactionListProps {
  onItemPress: (id: string) => void;
  scrollY: SharedValue<number>;
}

export default function TransactionList({ onItemPress, scrollY }: TransactionListProps) {
  // Sort transactions by timestamp descending (latest first)
  const sorted = [...mockTransactions].sort((a, b) => b.timestamp - a.timestamp);

  // Standard scroll handler to update scrollY from JS thread
  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    scrollY.value = y;
  };

  return (
    <View style={{ flex: 1 }}>
      <LegendList
        data={sorted}
        keyExtractor={(item: Transaction) => item.id}
        renderItem={({ item }: { item: Transaction }) => (
          <TransactionItem transaction={item} onPress={onItemPress} />
        )}
        estimatedItemSize={80}
        style={{ paddingBottom: 32 }}
        onScroll={onScroll}
      />
    </View>
  );
}