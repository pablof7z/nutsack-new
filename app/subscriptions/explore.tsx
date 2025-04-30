import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Pressable, Dimensions } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { LegendList } from "@legendapp/list";
import { useRouter } from "expo-router";
import UserAvatar from "../../components/UserAvatar";
import { creators } from "../../mock-data/creators";
import type { NDKUser } from "@nostr-dev-kit/ndk";

// Demo: Generate a random subscription tier for each creator
function getRandomTier(index: number) {
  const tiers = [2, 5, 10, 15, 20];
  return tiers[index % tiers.length];
}

// Demo: Generate a random description
function getDescription(index: number) {
  const samples = [
    "Sharing insights and stories.",
    "Your daily dose of inspiration.",
    "Unlock premium content and more.",
    "Join my creative journey.",
    "Exclusive updates for subscribers.",
    "Behind the scenes and more.",
    "Thoughts, art, and community.",
    "Support my work and get perks.",
    "Curated content for you.",
    "Connect and grow together."
  ];
  return samples[index % samples.length];
}

// Demo: Generate a random name if not available
function getName(user: NDKUser, index: number): string {
  return (
    user?.profile?.displayName?.toString() ||
    user?.profile?.name?.toString() ||
    user?.profile?.username?.toString() ||
    `Creator #${index + 1}`
  );
}

// Demo: Generate mutual followers (random creators, not including self)
function getMutualFollowers(index: number, count = 3) {
  const others = creators.filter((_, i) => i !== index);
  const shuffled = others.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const CARD_HEIGHT = 120;
const AVATAR_SIZE = 56;
const MUTUAL_AVATAR_SIZE = 28;

const styles = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  header: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  searchBox: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
    borderWidth: 0,
  },
  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: CARD_HEIGHT,
  },
  avatarContainer: {
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  tier: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "500",
    marginBottom: 6,
  },
  mutualRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  mutualLabel: {
    fontSize: 12,
    color: "#999",
    marginRight: 6,
  },
  mutualAvatars: {
    flexDirection: "row",
  },
  mutualAvatar: {
    marginRight: -8,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: MUTUAL_AVATAR_SIZE / 2,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
});

const screenWidth = Dimensions.get("window").width;

export default function ExploreCreatorsScreen() {
  const { styles: s } = useStyles(styles);
  const [search, setSearch] = useState("");

  const router = useRouter();

  // Filter creators by name (case-insensitive, demo only)
  const filteredCreators = useMemo(() => {
    if (!search.trim()) return creators;
    return creators.filter((user, i) => {
      const name = getName(user, i).toLowerCase();
      return name.includes(search.trim().toLowerCase());
    });
  }, [search]);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Explore Creators & Publications</Text>
        <TextInput
          style={s.searchBox}
          placeholder="Search creators or publications"
          placeholderTextColor="#AAA"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          accessible
          accessibilityLabel="Search creators or publications"
        />
      </View>
      <LegendList
        data={filteredCreators}
        style={s.list}
        estimatedItemSize={CARD_HEIGHT}
        renderItem={({ item: user, index }) => {
          const name = getName(user, index);
          const description = user?.profile?.about || getDescription(index);
          const tier = getRandomTier(index);
          const mutualFollowers = getMutualFollowers(index, 3);

          return (
            <Pressable
              key={user.pubkey}
              style={s.card}
              onPress={() =>
                router.push(`/subscriptions/creators/${user.pubkey}`)
              }
              android_ripple={{ color: "#F5F5F5" }}
              accessibilityRole="button"
              accessibilityLabel={`View profile for ${name}`}
            >
              <View style={s.avatarContainer}>
                <UserAvatar user={user} size={AVATAR_SIZE} />
              </View>
              <View style={s.info}>
                <Text style={s.name} numberOfLines={1}>
                  {name}
                </Text>
                <Text style={s.description} numberOfLines={2}>
                  {description}
                </Text>
                <Text style={s.tier}>From ${tier}/month</Text>
                <View style={s.mutualRow}>
                  <Text style={s.mutualLabel}>Mutuals:</Text>
                  <View style={s.mutualAvatars}>
                    {mutualFollowers.map((mf, idx) => (
                      <View
                        key={mf.pubkey}
                        style={[
                          s.mutualAvatar,
                          { zIndex: mutualFollowers.length - idx },
                        ]}
                      >
                        <UserAvatar user={mf} size={MUTUAL_AVATAR_SIZE} />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}