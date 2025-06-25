'use client';

import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet } from 'lucide-react';

export const WalletButton = () => {
  const { setVisible } = useWalletModal();
  const { wallet, connect, connected, disconnect, publicKey } = useWallet();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm">
        <span>{shortenAddress(publicKey.toBase58())}</span>
        <button onClick={() => disconnect()} className="text-slate-400 hover:text-white">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setVisible(true)}
      className="flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-sky-600"
    >
      <Wallet size={16} />
      <span>Connect Wallet</span>
    </button>
  );
};