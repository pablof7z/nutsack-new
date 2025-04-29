import React from "react";
import { View } from "react-native";
import { LegendList } from "@legendapp/list";
import { mockTransactions, Transaction } from "../mock-data/transactions";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  onItemPress: (id: string) => void;
}

export default function TransactionList({ onItemPress }: TransactionListProps) {
  // Sort transactions by timestamp descending (latest first)
  const sorted = [...mockTransactions].sort((a, b) => b.timestamp - a.timestamp);

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
      />
    </View>
  );
}