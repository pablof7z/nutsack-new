// NDK singleton setup for React Native Expo app

import NDK from "@nostr-dev-kit/ndk";
import { NDKCacheAdapterSqlite } from "@nostr-dev-kit/ndk-mobile";

// Recommended relay URLs
const explicitRelayUrls = [
  "wss://f7z.io",
  "wss://relay.primal.net",
  "wss://relay.nostr.band"
];

// Use a stable client name for cache separation
const clientName = "acorn-app";

// Create the singleton instance
const ndk = new NDK({
  explicitRelayUrls,
  clientName,
  // Disable event signature validation for performance (per guidelines)
  initialValidationRatio: 0.0,
  lowestValidationRatio: 0.0,
});

// Set up persistent cache using SQLite (from ndk-mobile)
ndk.cacheAdapter = new NDKCacheAdapterSqlite(clientName);
(ndk.cacheAdapter as NDKCacheAdapterSqlite).initialize();

export default ndk;