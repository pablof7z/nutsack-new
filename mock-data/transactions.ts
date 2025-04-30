export type TransactionType = "incoming" | "outgoing";

export interface Counterparty {
  pubkey: string;
  name: string;
  avatarUrl: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: number;
  mint: string;
  memo?: string;
  isZap?: boolean;
  counterparty: Counterparty;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "incoming",
    amount: 42000,
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    mint: "mint.cashu.space",
    memo: "Salary payout",
    isZap: false,
    counterparty: {
      pubkey: "abcdef123456",
      name: "Alice",
      avatarUrl: "https://robohash.org/alice.png",
    },
  },
  {
    id: "tx2",
    type: "outgoing",
    amount: 1500,
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    mint: "mint.nutsack.io",
    memo: "Coffee",
    isZap: false,
    counterparty: {
      pubkey: "fedcba654321",
      name: "Bob",
      avatarUrl: "https://robohash.org/bob.png",
    },
  },
  {
    id: "tx3",
    type: "incoming",
    amount: 10000,
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    mint: "mint.cashu.space",
    isZap: true,
    counterparty: {
      pubkey: "123456abcdef",
      name: "Zappr",
      avatarUrl: "https://robohash.org/zappr.png",
    },
  },
  {
    id: "tx4",
    type: "outgoing",
    amount: 5000,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    mint: "mint.nutsack.io",
    memo: "Rent",
    isZap: false,
    counterparty: {
      pubkey: "654321fedcba",
      name: "Landlord",
      avatarUrl: "https://robohash.org/landlord.png",
    },
  },
  {
    id: "tx5",
    type: "outgoing",
    amount: 5000,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    mint: "mint.nutsack.io",
    memo: "Rent",
    isZap: false,
    counterparty: {
      pubkey: "654321fedcba",
      name: "Landlord",
      avatarUrl: "https://robohash.org/landlord.png",
    },
  },
  {
    id: "tx6",
    type: "outgoing",
    amount: 5000,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    mint: "mint.nutsack.io",
    memo: "Rent",
    isZap: false,
    counterparty: {
      pubkey: "654321fedcba",
      name: "Landlord",
      avatarUrl: "https://robohash.org/landlord.png",
    },
  },
  {
    id: "tx7",
    type: "outgoing",
    amount: 5000,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    mint: "mint.nutsack.io",
    memo: "Rent",
    isZap: false,
    counterparty: {
      pubkey: "654321fedcba",
      name: "Landlord",
      avatarUrl: "https://robohash.org/landlord.png",
    },
  },
  {
    id: "tx8",
    type: "outgoing",
    amount: 5000,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    mint: "mint.nutsack.io",
    memo: "Rent",
    isZap: false,
    counterparty: {
      pubkey: "654321fedcba",
      name: "Landlord",
      avatarUrl: "https://robohash.org/landlord.png",
    },
  },
  {
    id: "tx9",
    type: "outgoing",
    amount: 5000,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    mint: "mint.nutsack.io",
    memo: "Rent",
    isZap: false,
    counterparty: {
      pubkey: "654321fedcba",
      name: "Landlord",
      avatarUrl: "https://robohash.org/landlord.png",
    },
  },
];