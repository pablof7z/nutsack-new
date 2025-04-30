export type SubscriptionStatus = 'active' | 'canceled';
export type PaymentStatus = 'upcoming' | 'overdue' | 'paid' | 'due-soon';

export interface Subscription {
  id: string;
  creatorId: string;
  tier: string;
  amount: number;
  currency: string;
  status: SubscriptionStatus;
  nextPaymentDate: Date;
  startDate: Date;
  paymentStatus: PaymentStatus;
}

const now = new Date();
const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
const subDays = (date: Date, days: number) => new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

import { creators } from "./creators";

export const subscriptions: Subscription[] = [
  {
    id: 'sub-1',
    creatorId: creators[0].pubkey,
    tier: 'Premium',
    amount: 1000,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: addDays(now, -203),
    startDate: subDays(now, 40),
    paymentStatus: 'due-soon',
  },
  {
    id: 'sub-2',
    creatorId: creators[1].pubkey,
    tier: 'Basic',
    amount: 500,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: subDays(now, 1),
    startDate: subDays(now, 60),
    paymentStatus: 'overdue',
  },
  {
    id: 'sub-3',
    creatorId: creators[2].pubkey,
    tier: 'Gold',
    amount: 2000,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: addDays(now, 10),
    startDate: subDays(now, 90),
    paymentStatus: 'upcoming',
  },
  {
    id: 'sub-4',
    creatorId: creators[3].pubkey,
    tier: 'Silver',
    amount: 800,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: addDays(now, 7),
    startDate: subDays(now, 120),
    paymentStatus: 'due-soon',
  },
  {
    id: 'sub-5',
    creatorId: creators[4].pubkey,
    tier: 'Premium',
    amount: 1500,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: addDays(now, 1),
    startDate: subDays(now, 10),
    paymentStatus: 'due-soon',
  },
  {
    id: 'sub-6',
    creatorId: creators[5].pubkey,
    tier: 'Basic',
    amount: 600,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: subDays(now, 2),
    startDate: subDays(now, 40),
    paymentStatus: 'overdue',
  },
  {
    id: 'sub-7',
    creatorId: creators[6].pubkey,
    tier: 'Gold',
    amount: 2200,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: addDays(now, 20),
    startDate: subDays(now, 365),
    paymentStatus: 'upcoming',
  },
  {
    id: 'sub-8',
    creatorId: creators[7].pubkey,
    tier: 'Basic',
    amount: 300,
    currency: 'SATS',
    status: 'canceled',
    nextPaymentDate: subDays(now, 20),
    startDate: subDays(now, 200),
    paymentStatus: 'paid',
  },
  {
    id: 'sub-9',
    creatorId: creators[8].pubkey,
    tier: 'Premium',
    amount: 1750,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: addDays(now, 2),
    startDate: subDays(now, 25),
    paymentStatus: 'due-soon',
  },
  {
    id: 'sub-10',
    creatorId: creators[9].pubkey,
    tier: 'Silver',
    amount: 900,
    currency: 'SATS',
    status: 'active',
    nextPaymentDate: subDays(now, 3),
    startDate: subDays(now, 50),
    paymentStatus: 'overdue',
  },
];

// Helper functions
export function getActiveSubscriptions() {
  return subscriptions.filter((s) => s.status === 'active');
}

export function getOverdueSubscriptions() {
  return subscriptions.filter((s) => s.paymentStatus === 'overdue');
}

export function getDueSoonSubscriptions() {
  return subscriptions.filter((s) => s.paymentStatus === 'due-soon');
}

export function getSubscriptionById(id: string) {
  return subscriptions.find((s) => s.id === id);
}