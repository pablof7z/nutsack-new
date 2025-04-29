import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useNDKCurrentUser } from "@nostr-dev-kit/ndk-mobile";
import { useEffect } from "react";
import NDKHeadless from "../components/NDKHeadless";
import DrawerContent from "../components/DrawerContent";
import { Drawer } from "expo-router/drawer";

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
      router.replace("/(tabs)");
    }
  }, [user, segments, router]);

  // Only show the Drawer for authenticated users and non-auth routes
  const inAuthGroup = segments[0] === "(auth)";

  return (
    <>
      <NDKHeadless />
      {user && !inAuthGroup ? (
        <Drawer
          drawerContent={() => <DrawerContent user={user} />}
          screenOptions={{
            drawerType: 'front',
            swipeEdgeWidth: 40,
            drawerStyle: {
              width: 280,
            },
            drawerHideStatusBarOnOpen: false,
            sceneContainerStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Slot />
        </Drawer>
      ) : (
        <Slot />
      )}
      <StatusBar style="dark" />
    </>
  );
}
