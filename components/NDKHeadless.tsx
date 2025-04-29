import { useEffect } from "react";
import {
  NDKSessionLocalStorage,
  NDKSessionStorageAdapter,
  useNDKInit,
  useNDKSessionMonitor
} from "@nostr-dev-kit/ndk-hooks";
import ndk from "../lib/ndk";

// Set up session storage for the browser or native
let sessionStorage: NDKSessionStorageAdapter | false = false;
if (typeof window !== "undefined") {
  sessionStorage = new NDKSessionLocalStorage();
}

/**
 * NDKHeadless initializes and connects the NDK singleton
 * without causing unnecessary rerenders.
 * Place this at the top level of your app layout.
 */
export default function NDKHeadless() {
  const initNDK = useNDKInit();

  useNDKSessionMonitor(sessionStorage, {
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