import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from "../Themed";
import CreatorCard from "./CreatorCard";
import type { NDKUser } from "@nostr-dev-kit/ndk";

interface CreatorListItem {
  user: NDKUser;
  description?: string;
  mutualFollowers?: { user: NDKUser }[];
  onPress?: () => void;
}

interface CreatorListProps {
  creators: CreatorListItem[];
  onExplore?: () => void;
  emptyMessage?: string;
}

export const CreatorList: React.FC<CreatorListProps> = ({
  creators,
  onExplore,
  emptyMessage = "No featured creators to display.",
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured Creators</Text>
      {creators.length === 0 ? (
        <Text style={styles.empty}>{emptyMessage}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {creators.map((item, idx) => (
            <CreatorCard
              key={item.user.pubkey}
              user={item.user}
              description={item.description}
              mutualFollowers={item.mutualFollowers}
              onPress={item.onPress}
            />
          ))}
          <Pressable style={styles.exploreBtn} onPress={onExplore}>
            <Text style={styles.exploreText}>Explore more...</Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    paddingTop: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
    paddingHorizontal: 16,
  },
  empty: {
    color: "#AAA",
    fontSize: 15,
    textAlign: "center",
    marginTop: 32,
  },
  scroll: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 8,
  },
  exploreBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 80,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  exploreText: {
    color: "#4F8EF7",
    fontWeight: "bold",
    fontSize: 15,
  },
}));

export default CreatorList;