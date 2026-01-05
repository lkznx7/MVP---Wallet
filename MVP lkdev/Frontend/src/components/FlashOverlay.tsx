import { motion, AnimatePresence } from 'framer-motion';
import { TransactionType } from '@/types/transaction';

interface FlashOverlayProps {
  type: TransactionType | null;
  isVisible: boolean;
}

export function FlashOverlay({ type, isVisible }: FlashOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.15,
            ease: 'easeOut'
          }}
          className={`fixed inset-0 z-50 pointer-events-none ${
            type === 'income' 
              ? 'bg-income' 
              : 'bg-expense'
          }`}
          style={{
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </AnimatePresence>
  );
}
