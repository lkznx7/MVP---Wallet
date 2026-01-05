export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: Date;
  category?: string;
}

export type TransactionType = 'income' | 'expense';
