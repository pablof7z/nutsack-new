import { Slot, useRouter, useSegments } from "expo-router"; // Import Slot, useRouter, useSegments
import { StatusBar } from "expo-status-bar";
import { useNDKCurrentUser } from "@nostr-dev-kit/ndk-mobile";
import { useEffect } from "react"; // Import useEffect

// Note: Removed AuthChoiceScreen import as it's not directly used here

export default function RootLayout() {
  const user = useNDKCurrentUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    // Wait for user status to be determined
    if (user === undefined) {
      return; // Still loading user status
    }

    if (!user && !inAuthGroup) {
      // If the user is not signed in and the initial segment is not anything in the auth group.
      console.log("RootLayout: No user, redirecting to auth...");
      router.replace("/(auth)/AuthChoiceScreen");
    } else if (user && inAuthGroup) {
      // If the user is signed in and the initial segment is in the auth group.
      console.log("RootLayout: User found, redirecting to tabs...");
      router.replace("/(tabs)"); // Or your main app screen
    }
  }, [user, segments, router]);

  // Render the Slot which will display the appropriate child route (auth or tabs)
  // based on the navigation state managed by the useEffect hook.
  return (
    <>
      {/* The Slot component renders the current child route */}
      <Slot />
      <StatusBar style="dark" />
    </>
  );
}
