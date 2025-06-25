'use client';
import { useState } from 'react';
import { IndexDefinition } from '@/data/mockData';
import { CheckCircle, Loader } from 'lucide-react';

interface PurchasePanelProps {
  index: IndexDefinition | undefined;
  onPurchase: (amount: number) => void;
  txStatus: 'idle' | 'pending' | 'success' | 'error';
}

export const PurchasePanel = ({ index, onPurchase, txStatus }: PurchasePanelProps) => {
  const [amount, setAmount] = useState('100');

  if (!index) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-md h-full flex items-center justify-center">
        <p className="font-normal text-slate-400">Select an index from the left.</p>
      </div>
    );
  }

  const isButtonDisabled = txStatus === 'pending';
  
  const getButtonContent = () => {
    if (txStatus === 'pending') {
      return (
        <>
          <Loader size={20} className="animate-spin" />
          <span>Processing...</span>
        </>
      );
    }
    return (
      <>
        <CheckCircle size={20} />
        <span>Buy Index Token</span>
      </>
    );
  };
  
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
      <h3 className="text-2xl font-bold">Buy {index.name}</h3>
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-normal text-slate-400">Amount (USDC)</label>
          <div className="mt-1">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border-white/20 bg-black/50 p-2 font-normal focus:border-solana-green focus:ring-solana-green"
              placeholder="e.g., 100"
            />
          </div>
        </div>
        <button 
          onClick={() => onPurchase(Number(amount))}
          disabled={isButtonDisabled || !amount || Number(amount) <= 0}
          className="btn-solana-glow flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};