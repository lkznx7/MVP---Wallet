import { useState, useCallback } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    description: 'Salario',
    type: 'income',
    date: new Date(2026, 0, 1),
    category: 'Work',
  },
  {
    id: '2',
    amount: 45.99,
    description: 'teste1',
    type: 'expense',
    date: new Date(2026, 0, 2),
    category: 'Food',
  },
  {
    id: '3',
    amount: 120,
    description: 'teste2',
    type: 'expense',
    date: new Date(2026, 0, 3),
    category: 'Utilities',
  },
  {
    id: '4',
    amount: 350,
    description: 'teste3',
    type: 'income',
    date: new Date(2026, 0, 3),
    category: 'Work',
  },
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const addTransaction = useCallback((
    amount: number,
    description: string,
    type: TransactionType
  ) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      description,
      type,
      date: new Date(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const totalBalance = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    transactions,
    addTransaction,
    totalBalance,
    totalIncome,
    totalExpenses,
  };
}
