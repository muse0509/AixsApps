'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

// CSSも作成します
const styles = {
  overlay: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50",
  content: "bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-md relative text-center",
  closeButton: "absolute top-4 right-4 text-slate-400 hover:text-white",
  iconContainer: "mb-6",
  icon: "mx-auto",
  iconSuccess: "text-green-500",
  iconError: "text-red-500",
  iconPending: "text-sky-500 animate-spin",
  title: "text-2xl font-bold mb-2",
  message: "text-slate-300",
};

export type ModalType = 'success' | 'error' | 'pending';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  title: string;
  message: string;
}

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  pending: Loader,
};

const iconColors = {
    success: styles.iconSuccess,
    error: styles.iconError,
    pending: styles.iconPending,
}

export const Modal = ({ isOpen, onClose, type, title, message }: ModalProps) => {
  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.content}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {type !== 'pending' && (
              <button className={styles.closeButton} onClick={onClose}><X /></button>
            )}
            <div className={styles.iconContainer}>
                <Icon className={`${styles.icon} ${iconColors[type]}`} size={48} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};