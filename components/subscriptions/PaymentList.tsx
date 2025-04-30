import React from "react";
import { View, FlatList } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../Themed";
import PaymentItem, { PaymentItemProps } from "./PaymentItem";

interface PaymentListProps {
  payments: PaymentItemProps[];
  emptyMessage?: string;
}

export const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  emptyMessage = "No past payments found.",
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Past Payments</Text>
      {payments.length === 0 ? (
        <Text style={styles.empty}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={payments}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <PaymentItem {...item} />}
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

export default PaymentList;