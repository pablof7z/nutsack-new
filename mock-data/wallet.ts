export interface WalletBalance {
  total: number; // in sats
  fiatEquivalent: number; // in fiat currency (e.g., USD)
  currency: string; // fiat currency code, e.g., "USD"
}

export const mockWalletBalance: WalletBalance = {
  total: 55500,
  fiatEquivalent: 18.23,
  currency: "USD",
};