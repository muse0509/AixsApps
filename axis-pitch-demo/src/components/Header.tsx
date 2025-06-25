'use client';
import { Wallet, X } from 'lucide-react';
import Image from 'next/image';

// WalletButtonProps の定義
interface WalletButtonProps {
  onConnectClick: () => void;
  onDisconnect: () => void;
  activeWallet: { chain: string | null; address: string | null; connected: boolean; };
}

// WalletButtonコンポーネント
export const WalletButton = ({ onConnectClick, onDisconnect, activeWallet }: WalletButtonProps) => {
  if (!activeWallet) return null;
  const shortenAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

  if (activeWallet.connected && activeWallet.address) {
    // 接続後のボタン
    return (
      <div className="flex items-center gap-2 rounded-lg bg-black/30 border border-white/10 px-4 py-2 text-sm backdrop-blur-md">
        <span className="capitalize text-xs bg-white/10 px-2 py-0.5 rounded-full">{activeWallet.chain}</span>
        <span className='font-normal'>{shortenAddress(activeWallet.address)}</span>
        <button onClick={onDisconnect} className="text-slate-400 hover:text-white"><X size={16} /></button>
      </div>
    );
  }

  // 接続前のボタン
  return (
    <button onClick={onConnectClick} className="btn-solana-glow flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-black">
      <Wallet size={16} />
      <span>Connect Wallet</span>
    </button>
  );
};

// Headerコンポーネント
export const Header = (props: WalletButtonProps) => {
  return (
    <header className="w-full p-4 sticky top-0 z-40">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Axis Logo" width={150} height={32} />
        </div>
        <WalletButton {...props} />
      </div>
    </header>
  );
};