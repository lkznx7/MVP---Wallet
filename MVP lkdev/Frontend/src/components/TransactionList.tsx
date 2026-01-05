import { motion } from 'framer-motion';
import { Transaction } from '@/types/transaction';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
        <span className="text-sm text-muted-foreground">{transactions.length} items</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No transactions yet</p>
            <p className="text-sm mt-1">Tap + to add your first one</p>
          </div>
        ) : (
          transactions.slice(0, 10).map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              index={index}
            />
          ))
        )}
      </motion.div>
    </div>
  );
}
