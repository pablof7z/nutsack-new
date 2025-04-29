import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import { useNDKSessionLogout } from "@nostr-dev-kit/ndk-mobile";
import AcornLogo from "./AcornLogo";
import UserAvatar from "./UserAvatar";

type DrawerContentProps = {
  user: NDKUser | undefined | null;
};

const styles = createStyleSheet({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 1,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  bottomSection: {
    alignItems: "center",
  },
  logoutButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#F44336",
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

const DrawerContent: React.FC<DrawerContentProps> = ({ user }) => {
  const { styles: s } = useStyles(styles);
  const ndkLogout = useNDKSessionLogout();

  const handleLogout = useCallback(async () => {
    try {
      await ndkLogout();
      // Optionally: navigate to login or landing screen if needed
    } catch (error) {
      // Optionally: show error feedback
      // eslint-disable-next-line no-console
      console.error("Logout failed", error);
    }
  }, [ndkLogout]);

  const displayName =
    user?.profile?.displayName ||
    user?.profile?.name ||
    user?.profile?.username ||
    "User";

  return (
    <View style={s.container}>
      <View>
        <View style={s.topSection}>
          <View style={s.logoRow}>
            <AcornLogo style={s.logo} />
            <Text style={s.appName}>Acorn</Text>
          </View>
          <View style={s.profileSection}>
            <UserAvatar user={user} size={64} />
            <Text style={s.userName} numberOfLines={1} ellipsizeMode="tail">
              {displayName}
            </Text>
          </View>
        </View>
      </View>
      <View style={s.bottomSection}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            s.logoutButton,
            pressed && { opacity: 0.8, backgroundColor: "#D32F2F" },
          ]}
          android_ripple={{ color: "#B71C1C" }}
          accessibilityRole="button"
          accessibilityLabel="Logout"
          testID="logout-button"
        >
          <Text style={s.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DrawerContent;