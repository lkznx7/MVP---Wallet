import { motion } from 'framer-motion';

interface HealthIndicatorProps {
  balance: number;
  income: number;
  expenses: number;
}

export function HealthIndicator({ balance, income, expenses }: HealthIndicatorProps) {
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  
  let status: 'excellent' | 'good' | 'warning' | 'danger';
  let message: string;
  
  if (savingsRate >= 30) {
    status = 'excellent';
    message = 'Excellent! You\'re saving well';
  } else if (savingsRate >= 15) {
    status = 'good';
    message = 'Good! Keep it up';
  } else if (savingsRate >= 0) {
    status = 'warning';
    message = 'Try to save a bit more';
  } else {
    status = 'danger';
    message = 'Spending exceeds income';
  }

  const statusColors = {
    excellent: 'bg-income',
    good: 'bg-primary',
    warning: 'bg-yellow-500',
    danger: 'bg-expense',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-2xl p-4 mt-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Financial Health</p>
          <p className="text-sm font-medium text-foreground mt-1">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-3 h-3 rounded-full ${statusColors[status]}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-foreground">
            {savingsRate.toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(savingsRate, 0), 100)}%` }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`h-full rounded-full ${statusColors[status]}`}
        />
      </div>
    </motion.div>
  );
}
