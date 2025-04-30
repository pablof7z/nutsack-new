export type PaymentStatusType = 'completed' | 'canceled' | 'failed';

export interface Payment {
  id: string;
  subscriptionId: string;
  creatorId: string;
  amount: number;
  currency: string;
  date: Date;
  status: PaymentStatusType;
}

const now = new Date();
const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
const subDays = (date: Date, days: number) => new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

export const payments: Payment[] = [
  {
    id: 'pay-1',
    subscriptionId: 'sub-1',
    creatorId: 'creator-1',
    amount: 1000,
    currency: 'SATS',
    date: subDays(now, 25),
    status: 'completed',
  },
  {
    id: 'pay-2',
    subscriptionId: 'sub-2',
    creatorId: 'creator-2',
    amount: 500,
    currency: 'SATS',
    date: subDays(now, 32),
    status: 'completed',
  },
  {
    id: 'pay-3',
    subscriptionId: 'sub-3',
    creatorId: 'creator-3',
    amount: 1200,
    currency: 'SATS',
    date: subDays(now, 10),
    status: 'completed',
  },
  {
    id: 'pay-4',
    subscriptionId: 'sub-4',
    creatorId: 'creator-4',
    amount: 400,
    currency: 'SATS',
    date: subDays(now, 15),
    status: 'canceled',
  },
  {
    id: 'pay-5',
    subscriptionId: 'sub-5',
    creatorId: 'creator-5',
    amount: 1500,
    currency: 'SATS',
    date: subDays(now, 2),
    status: 'completed',
  },
  {
    id: 'pay-6',
    subscriptionId: 'sub-6',
    creatorId: 'creator-6',
    amount: 600,
    currency: 'SATS',
    date: subDays(now, 1),
    status: 'failed',
  },
  {
    id: 'pay-7',
    subscriptionId: 'sub-7',
    creatorId: 'creator-7',
    amount: 2000,
    currency: 'SATS',
    date: subDays(now, 60),
    status: 'completed',
  },
  {
    id: 'pay-8',
    subscriptionId: 'sub-8',
    creatorId: 'creator-8',
    amount: 300,
    currency: 'SATS',
    date: subDays(now, 22),
    status: 'completed',
  },
  {
    id: 'pay-9',
    subscriptionId: 'sub-9',
    creatorId: 'creator-9',
    amount: 1750,
    currency: 'SATS',
    date: subDays(now, 7),
    status: 'completed',
  },
  {
    id: 'pay-10',
    subscriptionId: 'sub-10',
    creatorId: 'creator-10',
    amount: 900,
    currency: 'SATS',
    date: subDays(now, 3),
    status: 'failed',
  },
  {
    id: 'pay-11',
    subscriptionId: 'sub-1',
    creatorId: 'creator-1',
    amount: 1000,
    currency: 'SATS',
    date: subDays(now, 50),
    status: 'completed',
  },
  {
    id: 'pay-12',
    subscriptionId: 'sub-2',
    creatorId: 'creator-2',
    amount: 500,
    currency: 'SATS',
    date: subDays(now, 12),
    status: 'canceled',
  },
  {
    id: 'pay-13',
    subscriptionId: 'sub-3',
    creatorId: 'creator-3',
    amount: 1200,
    currency: 'SATS',
    date: subDays(now, 18),
    status: 'completed',
  },
  {
    id: 'pay-14',
    subscriptionId: 'sub-4',
    creatorId: 'creator-4',
    amount: 400,
    currency: 'SATS',
    date: subDays(now, 28),
    status: 'failed',
  },
  {
    id: 'pay-15',
    subscriptionId: 'sub-5',
    creatorId: 'creator-5',
    amount: 1500,
    currency: 'SATS',
    date: subDays(now, 35),
    status: 'completed',
  },
];

// Helper functions
export function getPaymentsBySubscriptionId(subscriptionId: string) {
  return payments.filter((p) => p.subscriptionId === subscriptionId);
}

export function getPaymentsByStatus(status: PaymentStatusType) {
  return payments.filter((p) => p.status === status);
}

export function getPaymentsByCreatorId(creatorId: string) {
  return payments.filter((p) => p.creatorId === creatorId);
}