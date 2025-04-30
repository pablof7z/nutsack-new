import React from "react";
import { View, Pressable, Image } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../Themed";
import UserAvatar from "../UserAvatar";
import type { NDKUser } from "@nostr-dev-kit/ndk";
import { useProfileValue } from "@nostr-dev-kit/ndk-hooks";

interface MutualFollower {
  user: NDKUser;
}

interface CreatorCardProps {
  user: NDKUser;
  description?: string;
  mutualFollowers?: MutualFollower[];
  onPress?: () => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  user,
  description,
  mutualFollowers = [],
  onPress,
}) => {
  const { styles } = useStyles(stylesheet);
  const profile = useProfileValue(user.pubkey);

  // Show up to 3 mutual followers, with "+X" if more
  const displayedFollowers = mutualFollowers.slice(0, 3);
  const extraCount = mutualFollowers.length - displayedFollowers.length;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <UserAvatar user={user} size={48} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {profile?.displayName || profile?.name || profile?.username || "Unknown"}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {description || profile?.about || ""}
          </Text>
        </View>
      </View>
      <View style={styles.mutualRow}>
        {displayedFollowers.map((f, idx) => (
          <View key={f.user.pubkey} style={[styles.mutualAvatar, { left: idx * 18 }]}>
            <UserAvatar user={f.user} size={24} />
          </View>
        ))}
        {extraCount > 0 && (
          <View style={[styles.extraCount, { left: displayedFollowers.length * 18 }]}>
            <Text style={styles.extraText}>+{extraCount}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const stylesheet = createStyleSheet(() => ({
  card: {
    width: 240,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    color: "#666",
  },
  mutualRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    minHeight: 28,
    position: "relative",
  },
  mutualAvatar: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
    width: 24,
    height: 24,
    zIndex: 2,
  },
  extraCount: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 1,
  },
  extraText: {
    color: "#555",
    fontSize: 13,
    fontWeight: "bold",
  },
}));

export default CreatorCard;