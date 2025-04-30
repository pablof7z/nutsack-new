import React, { memo } from "react";
import { Pressable, Image, View, Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useProfileValue } from "@nostr-dev-kit/ndk-hooks";

type UserAvatarProps = {
  user: NDKUser | undefined | null;
  size?: number;
};

const AVATAR_SIZE = 36;

const styles = createStyleSheet({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: AVATAR_SIZE / 2,
    overflow: "hidden",
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    backgroundColor: "#E0E0E0",
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#E0E0E0",
  },
  fallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

function getInitials(user: NDKUser | undefined | null): string {
  const name =
    user?.profile?.displayName ||
    user?.profile?.name ||
    user?.profile?.username ||
    "";
  if (!name) return "U";
  const nameStr = String(name);
  const parts = nameStr.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const UserAvatar: React.FC<UserAvatarProps> = memo(({ user, size = AVATAR_SIZE }) => {
  const { styles: s } = useStyles(styles);
  const profile = useProfileValue(user?.pubkey);
  const navigation = useNavigation();

  const imageUrl = profile?.picture;

  const handlePress = () => {
    // Toggle the drawer navigation using DrawerActions (compatible with expo-router/drawer)
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        s.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      android_ripple={{ color: "#D1C4E9", borderless: true }}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Open user menu"
      testID="user-avatar"
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            s.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            s.fallback,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={s.initials}>{getInitials(user)}</Text>
        </View>
      )}
    </Pressable>
  );
});

export default UserAvatar;