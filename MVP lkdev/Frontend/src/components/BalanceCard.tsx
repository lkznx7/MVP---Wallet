import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export function BalanceCard({ balance, income, expenses }: BalanceCardProps) {
  const isPositive = balance >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-2xl p-6 balance-gradient"
    >
      <p className="text-muted-foreground text-sm font-medium mb-2">
        Total Balance
      </p>
      <motion.h1
        key={balance}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-4xl font-bold tracking-tight mb-6 ${
          isPositive ? 'text-income' : 'text-expense'
        }`}
      >
        {isPositive ? '+' : '-'}${Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </motion.h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-income/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-income" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="text-sm font-semibold text-foreground">
              +${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-expense/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-expense" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expenses</p>
            <p className="text-sm font-semibold text-foreground">
              -${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
