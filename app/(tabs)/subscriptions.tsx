import React, { useRef, useState, useCallback } from "react";
import { ScrollView, View, Button } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../../components/Themed";
import { SubscriptionList, SubscriptionListItem } from "../../components/subscriptions/SubscriptionList";
import { CreatorList } from "../../components/subscriptions/CreatorList";
import { PaymentList } from "../../components/subscriptions/PaymentList";
import { PaymentBottomSheet } from "../../components/subscriptions/PaymentBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { subscriptions as mockSubscriptions, Subscription } from "../../mock-data/subscriptions";
import { creators as mockCreators } from "../../mock-data/creators";
import { payments as mockPayments } from "../../mock-data/payments";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import type { PaymentItemProps } from "../../components/subscriptions/PaymentItem";
import TestBottomSheet from "../../components/TestBottomSheet";

// Styles
const stylesheet = createStyleSheet((theme: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.background ?? "#fff",
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: theme.colors?.text ?? "#111",
    marginBottom: 28,
    letterSpacing: -0.5,
  },
  section: {
    flex: 1,
    marginBottom: 32,
  },
}));

export default function Subscriptions() {
  const { styles } = useStyles(stylesheet);

  // State for selected subscription for the bottom sheet
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  // Ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Handler to open the bottom sheet for a subscription
  const handleOpenPaymentSheet = useCallback((subscription: Subscription) => {
    console.log("handleOpenPaymentSheet called", subscription.id);
    setSelectedSubscription(subscription);
    console.log("Set selected subscription", subscription.id);

    // Use requestAnimationFrame to ensure state update before presenting
    requestAnimationFrame(() => {
      console.log("Inside requestAnimationFrame");
      if (bottomSheetRef.current) {
        console.log("Bottom sheet ref is available, presenting...");
        bottomSheetRef.current.present();
      } else {
        console.warn("Bottom sheet ref is not available");
      }
    });
  }, []);

  // Handler to close the bottom sheet
  const handleClosePaymentSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    setSelectedSubscription(null);
  }, []);

  // Handler for payment action
  const handlePay = useCallback(() => {
    // Implement payment logic here
    handleClosePaymentSheet();
  }, [handleClosePaymentSheet]);

  // Handler for cancellation action
  const handleCancel = useCallback(() => {
    // Implement cancellation logic here
    handleClosePaymentSheet();
  }, [handleClosePaymentSheet]);

  // Map subscriptions to SubscriptionListItem[]
  const subscriptionListItems: SubscriptionListItem[] = mockSubscriptions
    .map((sub) => {
      const user = mockCreators.find((c) => c.pubkey === sub.creatorId);
      if (!user) return null;
      return {
        user,
        tier: sub.tier,
        nextPaymentDate: sub.nextPaymentDate.toISOString().split("T")[0],
        status: sub.paymentStatus,
        onPay: () => handleOpenPaymentSheet(sub),
        onPress: undefined,
      };
    })
    .filter(Boolean) as SubscriptionListItem[];

  // Map payments to PaymentItemProps[]
  const paymentListItems: PaymentItemProps[] = mockPayments
    .map((p) => {
      const user = mockCreators.find((c) => c.pubkey === p.creatorId);
      if (!user) return null;
      // Map status to correct case
      let status: PaymentItemProps["status"];
      switch (p.status) {
        case "completed":
          status = "Completed";
          break;
        case "canceled":
          status = "Canceled";
          break;
        case "failed":
          status = "Failed";
          break;
        default:
          status = "Completed";
      }
      return {
        user,
        date: p.date.toISOString().split("T")[0],
        tier: "", // No tier in mock, so leave blank or use a placeholder
        amount: `${p.amount} ${p.currency}`,
        status,
      };
    })
    .filter(Boolean) as PaymentItemProps[];

  // Map creators to CreatorListItem[]
  const creatorListItems = mockCreators.map((user) => ({ user }));

  // Prepare PaymentBottomSheet props
  let paymentSheetUser: NDKUser | undefined;
  let paymentSheetAmount = "";
  if (selectedSubscription) {
    paymentSheetUser = mockCreators.find((c) => c.pubkey === selectedSubscription.creatorId);
    paymentSheetAmount = `${selectedSubscription.amount} ${selectedSubscription.currency}`;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          <SubscriptionList subscriptions={subscriptionListItems} />
        </View>

        <View style={styles.section}>
          <CreatorList creators={creatorListItems} />
        </View>

        <View style={styles.section}>
          <PaymentList payments={paymentListItems} />
        </View>

        <Button
          title="Test Bottom Sheet"
          onPress={() => {
            console.log("Test button pressed");
            if (bottomSheetRef.current) {
              console.log("Directly opening bottom sheet from button");
              bottomSheetRef.current.present();
            } else {
              console.log("Bottom sheet ref is null");
            }
          }}
        />
      </View>

      <PaymentBottomSheet
        ref={bottomSheetRef}
        user={paymentSheetUser || mockCreators[0]}
        amountDue={paymentSheetAmount || "0 SATS"}
        onSwipePay={handlePay}
        onCancel={handleClosePaymentSheet}
      />
    </>
  );
}