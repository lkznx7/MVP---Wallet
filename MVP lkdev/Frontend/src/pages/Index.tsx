import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '@/hooks/useTransactions';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionList } from '@/components/TransactionList';
import { HealthIndicator } from '@/components/HealthIndicator';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { FlashOverlay } from '@/components/FlashOverlay';
import { TransactionType } from '@/types/transaction';

const Index = () => {
  const { transactions, addTransaction, totalBalance, totalIncome, totalExpenses } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashType, setFlashType] = useState<TransactionType | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  const handleAddTransaction = useCallback((amount: number, description: string, type: TransactionType) => {
    addTransaction(amount, description, type);
    
    // Trigger flash animation
    setFlashType(type);
    setShowFlash(true);
    
    setTimeout(() => {
      setShowFlash(false);
      setFlashType(null);
    }, 400);
  }, [addTransaction]);

  return (
    <div className="min-h-screen bg-background">
      <FlashOverlay type={flashType} isVisible={showFlash} />
      
      <div className="max-w-lg mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">My Wallet</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </motion.header>

        {/* Balance Card */}
        <BalanceCard
          balance={totalBalance}
          income={totalIncome}
          expenses={totalExpenses}
        />

        {/* Health Indicator */}
        <HealthIndicator
          balance={totalBalance}
          income={totalIncome}
          expenses={totalExpenses}
        />

        {/* Transactions */}
        <TransactionList transactions={transactions} />
      </div>

      {/* FAB */}
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
