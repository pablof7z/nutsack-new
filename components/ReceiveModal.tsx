import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ReceiveModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReceiveModal({ visible, onClose }: ReceiveModalProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Receive Sats</Text>
          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>[QR]</Text>
          </View>
          <Text style={styles.desc}>This is a mock QR code for receiving sats.</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: 24,
    padding: 32,
    minWidth: 280,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: theme.colors.primary,
  },
  qrContainer: {
    width: 140,
    height: 140,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  qrText: {
    fontSize: 32,
    color: "#9CA3AF",
    fontWeight: "bold",
  },
  desc: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginBottom: 24,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
}));