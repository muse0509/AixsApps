'use client';

import { createContext, useState, useContext, useMemo, ReactNode, FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
// ★★★ 1. 不要な 'Puzzle' を削除しました ★★★
import { Flame, Shield } from 'lucide-react';
import { SiEthereum, SiPolygon } from 'react-icons/si';

// --- Types ---
export interface Chain {
  id: 'solana' | 'ethereum' | 'polygon' | 'base';
  name: string;
  Icon: React.ElementType;
  isEVM: boolean;
  dummyAddress: string;
}

interface ChainContextType {
  chains: Chain[];
  selectedChain: Chain;
  setSelectedChain: (chain: Chain) => void;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
}

// --- Data ---
const supportedChains: Chain[] = [
  { id: 'solana', name: 'Solana', Icon: Flame, isEVM: false, dummyAddress: '' },
  { id: 'ethereum', name: 'Ethereum', Icon: SiEthereum, isEVM: true, dummyAddress: '0x1a2...b3c4' },
  { id: 'polygon', name: 'Polygon', Icon: SiPolygon, isEVM: true, dummyAddress: '0x5d6...e7f8' },
  { id: 'base', name: 'Base', Icon: Shield, isEVM: true, dummyAddress: '0x9a0...b1c2' },
];

// --- Context ---
export const ChainContext = createContext<ChainContextType | undefined>(undefined);


// --- Provider ---
export const ChainProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedChain, setSelectedChainState] = useState<Chain>(supportedChains[0]);
  const [evmAddress, setEvmAddress] = useState<string | null>(null);
  
  const solanaWallet = useWallet();

  const isConnected = selectedChain.isEVM ? !!evmAddress : solanaWallet.connected;
  const address = selectedChain.isEVM ? evmAddress : (solanaWallet.publicKey ? solanaWallet.publicKey.toBase58() : null);

  const connect = () => {
    if (selectedChain.isEVM) {
      setEvmAddress(selectedChain.dummyAddress);
    } else {
      solanaWallet.connect().catch(() => {});
    }
  };

  const disconnect = () => {
    if (selectedChain.isEVM) {
      setEvmAddress(null);
    } else {
      solanaWallet.disconnect();
    }
  };
  
  const setSelectedChain = (chain: Chain) => {
    disconnect(); // Switch chain should disconnect previous wallet
    setSelectedChainState(chain);
  }

  // ★★★ 2. 依存配列に不足していた関数を追加しました ★★★
  const value = useMemo(() => ({
    chains: supportedChains,
    selectedChain,
    setSelectedChain,
    address,
    connect,
    disconnect,
    isConnected,
  }), [selectedChain, address, isConnected, connect, disconnect, setSelectedChain]);

  return (
    <ChainContext.Provider value={value}>
      {children}
    </ChainContext.Provider>
  );
};

// --- Hook ---
export const useChain = (): ChainContextType => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error('useChain must be used within a ChainProvider');
  }
  return context;
};