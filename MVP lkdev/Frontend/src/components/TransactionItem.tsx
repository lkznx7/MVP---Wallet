import { motion } from 'framer-motion';
import { Transaction } from '@/types/transaction';
import { ShoppingBag, Zap, Briefcase, Coffee, Car, Heart, MoreHorizontal } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const categoryIcons: Record<string, React.ElementType> = {
  Food: ShoppingBag,
  Utilities: Zap,
  Work: Briefcase,
  Coffee: Coffee,
  Transport: Car,
  Health: Heart,
};

export function TransactionItem({ transaction, index }: TransactionItemProps) {
  const Icon = categoryIcons[transaction.category || ''] || MoreHorizontal;
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isIncome ? 'bg-income/20' : 'bg-expense/20'
          }`}
        >
          <Icon className={`w-5 h-5 ${isIncome ? 'text-income' : 'text-expense'}`} />
        </div>
        <div>
          <p className="font-medium text-foreground">{transaction.description}</p>
          <p className="text-xs text-muted-foreground">
            {transaction.date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
      <p
        className={`font-semibold ${
          isIncome ? 'text-income' : 'text-expense'
        }`}
      >
        {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
      </p>
    </motion.div>
  );
}
