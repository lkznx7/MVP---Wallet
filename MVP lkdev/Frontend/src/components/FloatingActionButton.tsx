import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-6 w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-2xl flex items-center justify-center z-30 hover:shadow-primary/40 transition-shadow"
      style={{
        boxShadow: '0 8px 32px hsl(var(--primary) / 0.4)',
      }}
    >
      <Plus className="w-7 h-7" />
    </motion.button>
  );
}
