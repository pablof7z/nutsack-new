import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStyles, createStyleSheet } from "react-native-unistyles";
import { getSubscriptionById, Subscription, PaymentStatus, PaymentStatus as SubPaymentStatus } from "../../mock-data/subscriptions";
import { getPaymentsBySubscriptionId, Payment } from "../../mock-data/payments";
import { creators } from "../../mock-data/creators";
import UserAvatar from "../../components/UserAvatar";

const stylesheet = createStyleSheet((theme: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  creatorName: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 2,
    textAlign: "center",
  },
  overviewCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  planLabel: {
    color: theme.colors.textSecondary,
    fontSize: 15,
  },
  planValue: {
    color: theme.colors.text,
    fontWeight: "500",
    fontSize: 15,
  },
  nextPayment: {
    marginTop: 8,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  cancelButton: {
    marginTop: 18,
    backgroundColor: theme.colors.error,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  payNowButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  payNowButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 10,
    marginTop: 8,
  },
  paymentHistory: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 10,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  paymentRowLast: {
    borderBottomWidth: 0,
  },
  paymentAmount: {
    fontWeight: "500",
    color: theme.colors.text,
    fontSize: 15,
  },
  paymentDate: {
    color: theme.colors.textSecondary,
    fontSize: 13,
  },
  paymentStatus: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 8,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 24,
    padding: 8,
    zIndex: 10,
  },
  backButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
}));

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getCreatorById(creatorId: string) {
  // "creator-1" => index 0, "creator-2" => index 1, etc.
  const idx = parseInt(creatorId.replace("creator-", ""), 10) - 1;
  return creators[idx];
}

function getCreatorDisplayName(creatorId: string) {
  // For mock, just "Creator 1", etc.
  const idx = parseInt(creatorId.replace("creator-", ""), 10);
  return `Creator ${idx}`;
}

function getPaymentStatusColor(status: string, theme: any) {
  switch (status) {
    case "completed":
      return theme.colors.success || "#2ecc40";
    case "failed":
      return theme.colors.error || "#e74c3c";
    case "canceled":
      return theme.colors.textSecondary;
    default:
      return theme.colors.textSecondary;
  }
}

export default function SubscriptionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();

  const [canceling, setCanceling] = useState(false);

  const subscription: Subscription | undefined = useMemo(() => {
    if (!id) return undefined;
    return getSubscriptionById(id);
  }, [id]);

  const creator = useMemo(() => {
    if (!subscription) return undefined;
    return getCreatorById(subscription.creatorId);
  }, [subscription]);

  const creatorName = useMemo(() => {
    if (!subscription) return "";
    return getCreatorDisplayName(subscription.creatorId);
  }, [subscription]);

  const payments: Payment[] = useMemo(() => {
    if (!subscription) return [];
    return getPaymentsBySubscriptionId(subscription.id).sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [subscription]);

  const showPayNow =
    subscription &&
    (subscription.paymentStatus === "overdue" || subscription.paymentStatus === "due-soon") &&
    subscription.status === "active";

  const handleCancel = useCallback(() => {
    if (!subscription) return;
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel this subscription? This action cannot be undone.",
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Cancel Subscription",
          style: "destructive",
          onPress: () => {
            setCanceling(true);
            setTimeout(() => {
              setCanceling(false);
              Alert.alert("Subscription canceled", "Your subscription has been canceled.");
              router.back();
            }, 900);
          },
        },
      ]
    );
  }, [subscription, router]);

  const handlePayNow = useCallback(() => {
    Alert.alert("Pay Now", "Payment flow would be triggered here.");
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!id || !subscription) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Subscription not found.</Text>
        <Pressable style={[styles.payNowButton, { marginTop: 32 }]} onPress={handleBack}>
          <Text style={styles.payNowButtonText}>Back to Subscriptions</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Pressable style={styles.backButton} onPress={handleBack} accessibilityLabel="Back">
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <UserAvatar user={creator} size={72} />
        </View>
        <Text style={styles.creatorName}>{creatorName}</Text>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.planRow}>
          <Text style={styles.planLabel}>Plan</Text>
          <Text style={styles.planValue}>{subscription.tier}</Text>
        </View>
        <View style={styles.planRow}>
          <Text style={styles.planLabel}>Price</Text>
          <Text style={styles.planValue}>
            {subscription.amount} {subscription.currency}
          </Text>
        </View>
        <View style={styles.planRow}>
          <Text style={styles.planLabel}>Status</Text>
          <Text style={styles.planValue}>{subscription.status === "active" ? "Active" : "Canceled"}</Text>
        </View>
        <Text style={styles.nextPayment}>
          Next Payment: {formatDate(subscription.nextPaymentDate)}
        </Text>
        {subscription.status === "active" && (
          <Pressable
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={canceling}
            accessibilityLabel="Cancel Subscription"
          >
            <Text style={styles.cancelButtonText}>
              {canceling ? "Canceling..." : "Cancel Subscription"}
            </Text>
          </Pressable>
        )}
      </View>

      {showPayNow && (
        <Pressable style={styles.payNowButton} onPress={handlePayNow} accessibilityLabel="Pay Now">
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </Pressable>
      )}

      <Text style={styles.sectionTitle}>Payment History</Text>
      <View style={styles.paymentHistory}>
        {payments.length === 0 ? (
          <Text style={styles.planLabel}>No payments yet.</Text>
        ) : (
          payments.map((payment, idx) => (
            <View
              key={payment.id}
              style={[
                styles.paymentRow,
                idx === payments.length - 1 && styles.paymentRowLast,
              ]}
            >
              <View>
                <Text style={styles.paymentAmount}>
                  {payment.amount} {payment.currency}
                </Text>
                <Text style={styles.paymentDate}>{formatDate(payment.date)}</Text>
              </View>
              <Text
                style={[
                  styles.paymentStatus,
                  { color: getPaymentStatusColor(payment.status, theme) },
                ]}
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}