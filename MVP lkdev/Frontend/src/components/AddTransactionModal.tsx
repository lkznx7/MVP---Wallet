import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { TransactionType } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (amount: number, description: string, type: TransactionType) => void;
}

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && description.trim()) {
      onAdd(numAmount, description.trim(), type);
      setAmount('');
      setDescription('');
      setType('expense');
      onClose();
    }
  };

  const isValid = parseFloat(amount) > 0 && description.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl p-6 pb-10 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Add Transaction</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Type Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-secondary rounded-xl">
              <button
                onClick={() => setType('expense')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                  type === 'expense'
                    ? 'bg-expense text-expense-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Minus className="w-4 h-4" />
                Expense
              </button>
              <button
                onClick={() => setType('income')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                  type === 'income'
                    ? 'bg-income text-income-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Plus className="w-4 h-4" />
                Income
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-10 h-14 text-2xl font-bold bg-secondary border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="mb-8">
              <label className="text-sm text-muted-foreground mb-2 block">Description</label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this for?"
                className="h-14 bg-secondary border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full h-14 rounded-xl text-lg font-semibold transition-all ${
                type === 'income'
                  ? 'bg-income hover:bg-income/90 text-income-foreground'
                  : 'bg-expense hover:bg-expense/90 text-expense-foreground'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Add {type === 'income' ? 'Income' : 'Expense'}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
