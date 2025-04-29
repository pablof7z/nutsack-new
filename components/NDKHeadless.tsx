import { useEffect, useRef } from "react";
import {
  NDKSessionStorageAdapter,
  useNDKInit,
  useNDKSessionMonitor,
} from "@nostr-dev-kit/ndk-hooks";
import ndk from "../lib/ndk";
import { NDKSessionExpoSecureStore, useSessionMonitor } from "@nostr-dev-kit/ndk-mobile";

/**
 * NDKHeadless initializes and connects the NDK singleton
 * without causing unnecessary rerenders.
 * Place this at the top level of your app layout.
 */
export default function NDKHeadless() {
  const initNDK = useNDKInit();
  const sessionStorage = useRef(new NDKSessionExpoSecureStore());

  useNDKSessionMonitor(sessionStorage.current, {
    profile: true,
    follows: true,
  });

  useEffect(() => {
    ndk.connect();
    initNDK(ndk);
  }, [initNDK]);

  return null;
}