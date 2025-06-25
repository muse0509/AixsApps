'use client';

import { useState, useMemo, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Background } from '@/components/Background';

// コンポーネントのインポート
import { Header } from '@/components/Header';
import { IndexSelector } from '@/components/IndexSelector';
import { IndexHeader } from '@/components/IndexHeader';
import { IndexChart } from '@/components/IndexChart';
import { PurchasePanel } from '@/components/PurchasePanel';
import { InfoPanel } from '@/components/InfoPanel';
import { UserPortfolio } from '@/components/UserPortfolio'; // 新しくインポート
import { ChainSelectionModal } from '@/components/ChainSelectionModal';
import { Modal, ModalType } from '@/components/Modal';

// データとロジックのインポート
import { mockAssets, mockIndices } from '@/data/mockData';
import { calculateIndexHistory } from '@/lib/indexCalculator';

// --- 型定義 ---
type TxStatus = 'idle' | 'pending' | 'success' | 'error';
interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
}
interface ActiveWalletState {
    chain: 'solana' | 'ethereum' | null;
    address: string | null;
    connected: boolean;
}
interface UserBalances {
  USDC: number;
  [indexId: string]: number;
}


export default function Home() {
  // --- State管理 ---
  const [selectedIndexId, setSelectedIndexId] = useState<string>(mockIndices[0].id);
  const [txStatus, setTxStatus] = useState<TxStatus>('idle');
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, type: 'success', title: '', message: '' });
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);
  const [activeWallet, setActiveWallet] = useState<ActiveWalletState>({ chain: null, address: null, connected: false });
  const [userBalances, setUserBalances] = useState<UserBalances>({
    USDC: 10000,
    'blue-chip': 15.5,
    'l1-leaders': 50.2,
    'oracle-majors': 0,
    'de-pin': 0,
    'axis-composite': 0,
  });

  // --- Solanaウォレット関連のフック ---
  const { connected: solanaConnected, publicKey: solanaPublicKey, disconnect: solanaDisconnect } = useWallet();
  const { setVisible: setSolanaModalVisible } = useWalletModal();

  // --- ロジック ---

  // Solanaウォレットの状態を共通のactiveWallet stateに同期させる
  useEffect(() => {
    if (solanaConnected && solanaPublicKey) {
      setActiveWallet({
        chain: 'solana',
        address: solanaPublicKey.toBase58(),
        connected: true,
      });
      setIsChainModalOpen(false);
    }
  }, [solanaConnected, solanaPublicKey]);

  // チェーン選択モーダルでの処理
  const handleSelectSolana = () => { setIsChainModalOpen(false); setSolanaModalVisible(true); };
  const handleSelectEVM = () => { setActiveWallet({ chain: 'ethereum', address: '0x1a2b3c4d5e6f7g8h9i0j...c3d4', connected: true }); setIsChainModalOpen(false); };
  
  // ウォレット切断処理
  const handleDisconnect = () => {
    if (activeWallet.chain === 'solana') {
      solanaDisconnect();
    }
    setActiveWallet({ chain: null, address: null, connected: false });
  };
  
  // 購入処理シミュレーション
  const handlePurchase = async (amountToSpend: number) => {
    if (!activeWallet.connected) {
      setModalState({ isOpen: true, type: 'error', title: 'Wallet Not Connected', message: 'Please connect your wallet first.' });
      return;
    }
    if (!selectedIndex) {
      setModalState({ isOpen: true, type: 'error', title: 'No Index Selected', message: 'Please select an index to purchase.' });
      return;
    }
    if (userBalances.USDC < amountToSpend) {
      setModalState({ isOpen: true, type: 'error', title: 'Insufficient Funds', message: `You need ${amountToSpend.toLocaleString()} USDC, but you only have ${userBalances.USDC.toLocaleString()}.` });
      return;
    }

    setTxStatus('pending');
    setModalState({ isOpen: true, type: 'pending', title: 'Processing Transaction', message: `Purchasing ${amountToSpend.toLocaleString()} USDC worth of ${selectedIndex.name}...` });

    await new Promise(resolve => setTimeout(resolve, 2500));

    const history = allIndicesHistory[selectedIndex.id] || [];
    const latestPrice = history[history.length - 1]?.value || 100;
    const tokensBought = amountToSpend / latestPrice;

    setUserBalances(prev => ({
      ...prev,
      USDC: prev.USDC - amountToSpend,
      [selectedIndex.id]: (prev[selectedIndex.id] || 0) + tokensBought,
    }));
    
    setTxStatus('success');
    setModalState({ isOpen: true, type: 'success', title: 'Purchase Successful!', message: `You have successfully purchased ${tokensBought.toFixed(4)} ${selectedIndex.name} tokens.` });

    setTimeout(() => {
      setTxStatus('idle');
      setModalState(prev => ({ ...prev, isOpen: false }));
    }, 5000);
  };

  // 全インデックスの価格履歴を計算
  const allIndicesHistory = useMemo(() => {
    const histories: { [key: string]: ReturnType<typeof calculateIndexHistory> } = {};
    for (const index of mockIndices) {
      histories[index.id] = calculateIndexHistory(index, mockAssets);
    }
    return histories;
  }, []);

  const selectedIndex = mockIndices.find(idx => idx.id === selectedIndexId);
  const selectedIndexHistory = allIndicesHistory[selectedIndexId] || [];
  const latestPrice = selectedIndexHistory[selectedIndexHistory.length - 1]?.value;

  // --- UIのレンダリング ---
  return (
    <div className="flex min-h-screen flex-col relative">
      <Background /> {/* 背景コンポーネントを追加 */}
      <Header 
        onConnectClick={() => setIsChainModalOpen(true)}
        onDisconnect={handleDisconnect}
        activeWallet={activeWallet}
      />
      <main className="mx-auto w-full max-w-screen-2xl flex-grow p-4 md:p-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <IndexSelector indices={mockIndices} selectedIndexId={selectedIndexId} onSelect={setSelectedIndexId} />
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            <IndexHeader name={selectedIndex?.name} price={latestPrice} />
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
              <IndexChart data={selectedIndexHistory} name={selectedIndex?.name || ''} />
            </div>
            <InfoPanel index={selectedIndex} />
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            <UserPortfolio balances={userBalances} indices={mockIndices} />
            <PurchasePanel 
              index={selectedIndex}
              onPurchase={handlePurchase}
              txStatus={txStatus}
            />
          </div>
        </div>
      </main>

      {/* モーダル類 (変更なし) */}
      <ChainSelectionModal isOpen={isChainModalOpen} onClose={() => setIsChainModalOpen(false)} onSelectSolana={handleSelectSolana} onSelectEVM={handleSelectEVM} />
      <Modal {...modalState} onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))} />
    </div>
  );
}