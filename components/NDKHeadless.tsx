import { useEffect } from "react";
import {
  NDKSessionStorageAdapter,
  useNDKInit,
} from "@nostr-dev-kit/ndk-hooks";
import ndk from "../lib/ndk";
import { useSessionMonitor } from "@nostr-dev-kit/ndk-mobile";

/**
 * NDKHeadless initializes and connects the NDK singleton
 * without causing unnecessary rerenders.
 * Place this at the top level of your app layout.
 */
export default function NDKHeadless() {
  const initNDK = useNDKInit();

  useSessionMonitor({
    profile: true,
    follows: true,
  });

  useEffect(() => {
    ndk.connect();
    initNDK(ndk);
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initNDK]);

  return null;
}