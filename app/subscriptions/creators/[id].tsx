import React, { useMemo } from "react";
import { View, Text, Image, ScrollView, Alert, Pressable, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import UserAvatar from "../../../components/UserAvatar";
import { creators } from "../../../mock-data/creators";
import { NDKUser } from "@nostr-dev-kit/ndk";

type SubscriptionTier = {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
};

type CreatorProfileData = {
  pubkey: string;
  name: string;
  avatar: string;
  banner?: string;
  description: string;
  tiers: SubscriptionTier[];
  mutualFollowers: { pubkey: string; avatar: string }[];
  socials?: { type: string; url: string }[];
};

const mockProfiles: Record<string, CreatorProfileData> = {
  // Example mock data for two creators. Add more as needed.
  "17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58": {
    pubkey: "17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58",
    name: "Satoshi Nakamoto",
    avatar: "https://robohash.org/satoshi.png?set=set5",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Inventor of Bitcoin. Sharing insights on cryptography, economics, and open-source development.",
    tiers: [
      {
        id: "tier-1",
        name: "Supporter",
        price: 500,
        currency: "SATS",
        description: "Access to supporter-only posts and community chat.",
      },
      {
        id: "tier-2",
        name: "Insider",
        price: 2000,
        currency: "SATS",
        description: "All Supporter benefits plus monthly Q&A livestreams.",
      },
    ],
    mutualFollowers: [
      {
        pubkey: "04c960497af618ae18f5147b3e5c309ef3d8a6251768a1c0820e02c93768cc3b",
        avatar: "https://robohash.org/follower1.png?set=set5",
      },
      {
        pubkey: "46fcbe3065eaf1ae7811465924e48923363ff3f526bd6f73d7c184b16bd8ce4d",
        avatar: "https://robohash.org/follower2.png?set=set5",
      },
    ],
    socials: [
      { type: "twitter", url: "https://twitter.com/satoshi" },
    ],
  },
  "04c960497af618ae18f5147b3e5c309ef3d8a6251768a1c0820e02c93768cc3b": {
    pubkey: "04c960497af618ae18f5147b3e5c309ef3d8a6251768a1c0820e02c93768cc3b",
    name: "Hal Finney",
    avatar: "https://robohash.org/halfinney.png?set=set5",
    banner: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    description: "Early Bitcoin pioneer. Cryptography, digital cash, and future tech.",
    tiers: [
      {
        id: "tier-1",
        name: "Fan",
        price: 300,
        currency: "SATS",
        description: "Access to exclusive updates and private posts.",
      },
      {
        id: "tier-2",
        name: "Superfan",
        price: 1200,
        currency: "SATS",
        description: "All Fan benefits plus direct message access.",
      },
    ],
    mutualFollowers: [
      {
        pubkey: "17717ad4d20e2a425cda0a2195624a0a4a73c4f6975f16b1593fc87fa46f2d58",
        avatar: "https://robohash.org/satoshi.png?set=set5",
      },
    ],
    socials: [
      { type: "website", url: "https://halfinney.com" },
    ],
  },
};

const screenWidth = Dimensions.get("window").width;

const styles = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    width: "100%",
    height: screenWidth * 0.4,
    backgroundColor: "#e5e5e5",
  },
  avatarContainer: {
    position: "absolute",
    top: screenWidth * 0.25,
    left: 24,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  header: {
    marginTop: 56,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  tiersSection: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  tierCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  tierDesc: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
  tierPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 4,
  },
  subscribeBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  subscribeBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  mutualSection: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  mutualTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  mutualAvatarsRow: {
    flexDirection: "row",
    gap: 8,
  },
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    zIndex: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  backBtnText: {
    fontSize: 16,
    color: "#222",
  },
});

export default function CreatorProfileScreen() {
  const { styles } = useStyles(styles);
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const creatorId = params.id as string | undefined;

  // Find the NDKUser by pubkey
  const creatorUser: NDKUser | undefined = useMemo(
    () => creators.find((u) => u.pubkey === creatorId),
    [creatorId]
  );

  // Get mock profile data
  const profile: CreatorProfileData | undefined = creatorId ? mockProfiles[creatorId] : undefined;

  const handleSubscribe = (tier: SubscriptionTier) => {
    Alert.alert(
      "Subscribe",
      `Subscribe to ${profile?.name ?? "this creator"} at the ${tier.name} tier for ${tier.price} ${tier.currency}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => {/* TODO: trigger subscription logic */} },
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  if (!creatorUser || !profile) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontSize: 18, color: "#888", marginBottom: 24 }}>Creator not found</Text>
        <Pressable style={styles.backBtn} onPress={handleBack}>
          <Text style={styles.backBtnText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View>
        {profile.banner ? (
          <Image source={{ uri: profile.banner }} style={styles.banner} resizeMode="cover" />
        ) : (
          <View style={styles.banner} />
        )}
        {/* Back button */}
        <Pressable style={styles.backBtn} onPress={handleBack} accessibilityLabel="Back to explore">
          <Text style={styles.backBtnText}>←</Text>
        </Pressable>
        {/* Avatar */}
        <View style={[styles.avatarContainer, { top: screenWidth * 0.25 }]}>
          <UserAvatar user={creatorUser} size={96} />
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 56, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Name */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
        {/* Description */}
        <Text style={styles.description}>{profile.description}</Text>
        {/* Subscription Tiers */}
        <View style={styles.tiersSection}>
          {profile.tiers.map((tier) => (
            <View key={tier.id} style={styles.tierCard}>
              <Text style={styles.tierTitle}>{tier.name}</Text>
              <Text style={styles.tierDesc}>{tier.description}</Text>
              <View style={styles.tierPriceRow}>
                <Text style={styles.tierPrice}>{tier.price} {tier.currency}</Text>
              </View>
              <Pressable
                style={styles.subscribeBtn}
                onPress={() => handleSubscribe(tier)}
                accessibilityLabel={`Subscribe to ${tier.name} tier`}
              >
                <Text style={styles.subscribeBtnText}>Subscribe</Text>
              </Pressable>
            </View>
          ))}
        </View>
        {/* Mutual Followers */}
        {profile.mutualFollowers.length > 0 && (
          <View style={styles.mutualSection}>
            <Text style={styles.mutualTitle}>Mutual followers</Text>
            <View style={styles.mutualAvatarsRow}>
              {profile.mutualFollowers.map((f) => (
                <Image
                  key={f.pubkey}
                  source={{ uri: f.avatar }}
                  style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8, backgroundColor: "#eee" }}
                  accessibilityLabel="Mutual follower avatar"
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}