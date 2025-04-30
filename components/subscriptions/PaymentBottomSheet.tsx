import React, { useMemo, useRef, forwardRef, useImperativeHandle, useCallback } from "react";
import { View, Text as RNText, Button } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../Themed";

interface PaymentBottomSheetProps {
  user: any;
  amountDue: string;
  bannerUrl?: string;
  onSwipePay: () => void;
  onCancel: () => void;
}

export const PaymentBottomSheet = forwardRef<BottomSheetModal, PaymentBottomSheetProps>(
  ({ amountDue, onSwipePay, onCancel }, ref) => {
    console.log("PaymentBottomSheet render", { amountDue });
    const { styles } = useStyles(stylesheet);
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    // Forward the ref
    useImperativeHandle(ref, () => {
      console.log("Forwarding ref to parent", !!bottomSheetRef.current);
      return bottomSheetRef.current!;
    });

    const snapPoints = useMemo(() => ["40%"], []);

    const handleOpenSheet = useCallback(() => {
      console.log("Directly opening sheet");
      bottomSheetRef.current?.present();
    }, []);

    return (
      <>
        <Button title="Direct Open" onPress={handleOpenSheet} />
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}
          backgroundStyle={styles.sheetBg}
          enablePanDownToClose={true}
          handleComponent={() => (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Payment</Text>
            <Text style={styles.amountDue}>{amountDue}</Text>
            <RNText style={styles.buttonText} onPress={onSwipePay}>Pay Now</RNText>
            <RNText style={styles.cancelText} onPress={onCancel}>Cancel</RNText>
          </View>
        </BottomSheetModal>
      </>
    );
  }
);

const stylesheet = createStyleSheet(() => ({
  sheetBg: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amountDue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F8EF7",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4F8EF7",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
  },
  cancelText: {
    fontSize: 16,
    color: "#E57373",
    textDecorationLine: "underline",
  },
  handleContainer: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#888",
  },
}));

export default PaymentBottomSheet;
