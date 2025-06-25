'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectSolana: () => void;
  onSelectEVM: () => void; // EVMはモックとして扱います
}

export const ChainSelectionModal = ({ isOpen, onClose, onSelectSolana, onSelectEVM }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-xl font-bold text-center mb-6">Select a Chain to Connect</h3>
            <div className="space-y-4">
              <button
                onClick={onSelectSolana}
                className="w-full flex items-center justify-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Flame className="text-purple-400" />
                <span>Solana</span>
              </button>
              <button
                onClick={onSelectEVM}
                className="w-full flex items-center justify-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Layers className="text-sky-400" />
                <span>Ethereum / EVM (Mock)</span>
              </button>
            </div>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white" onClick={onClose}><X /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};