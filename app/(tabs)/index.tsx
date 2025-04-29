import React, { useState } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import WalletHeader from "../../components/WalletHeader";
import TransactionList from "../../components/TransactionList";
import SendModal from "../../components/SendModal";
import ReceiveModal from "../../components/ReceiveModal";
import { useRouter } from "expo-router";

export default function WalletScreen() {
  const [sendVisible, setSendVisible] = useState(false);
  const [receiveVisible, setReceiveVisible] = useState(false);
  const router = useRouter();

  const handleSend = () => setSendVisible(true);
  const handleReceive = () => setReceiveVisible(true);
  const handleCloseSend = () => setSendVisible(false);
  const handleCloseReceive = () => setReceiveVisible(false);

  const handleTransactionPress = (id: string) => {
    // Navigate to transaction details screen (mock)
    router.push(`/transaction/${id}`);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <WalletHeader onSend={handleSend} onReceive={handleReceive} />
      <View style={styles.listContainer}>
        <TransactionList onItemPress={handleTransactionPress} />
      </View>
      <SendModal visible={sendVisible} onClose={handleCloseSend} />
      <ReceiveModal visible={receiveVisible} onClose={handleCloseReceive} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
    paddingBottom: 12,
  },
});
