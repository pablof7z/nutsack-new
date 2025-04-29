import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="transactions/[id]" options={{ title: "Transaction Details" }} />
        <Stack.Screen name="subscriptions/[id]" options={{ title: "Subscription Details" }} />
        <Stack.Screen name="subscriptions/creators/[id]" options={{ title: "Creator Profile" }} />
        <Stack.Screen name="subscriptions/explore" options={{ title: "Explore Creators" }} />
        <Stack.Screen name="mints/management" options={{ title: "Mint Management" }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
