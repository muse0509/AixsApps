// src/data/mockData.ts

// --- 型定義 ---
// 各資産の基本的な情報と価格履歴を持つ型
export interface Asset {
    name: string;
    symbol: string;
    logo: string; // ロゴ画像のパス
    marketCap: number; // 時価総額（モック）
    prices: { date: string; price: number }[]; // 価格履歴
  }
  
  // インデックスの定義情報を持つ型
  export interface IndexDefinition {
    id: string;
    name: string;
    description: string;
    weighting: 'equal' | 'market_cap'; // 加重方法
    constituents: string[]; // 構成資産のシンボル
  }
  
  // --- モックデータ本体 ---
  
  // 各資産のデータ
  export const mockAssets: Record<string, Asset> = {
    BTC: {
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '/logos/btc.svg',
      marketCap: 1_300_000_000_000,
      prices: [
        { date: '2025-06-01', price: 68000 },
        { date: '2025-06-02', price: 69500 },
        { date: '2025-06-03', price: 71000 },
        { date: '2025-06-04', price: 70500 },
        { date: '2025-06-05', price: 72000 },
      ],
    },
    ETH: {
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/logos/eth.svg',
      marketCap: 450_000_000_000,
      prices: [
        { date: '2025-06-01', price: 3800 },
        { date: '2025-06-02', price: 3850 },
        { date: '2025-06-03', price: 3950 },
        { date: '2025-06-04', price: 3900 },
        { date: '2025-06-05', price: 4000 },
      ],
    },
    SOL: {
      name: 'Solana',
      symbol: 'SOL',
      logo: '/logos/sol.svg',
      marketCap: 80_000_000_000,
      prices: [
        { date: '2025-06-01', price: 165 },
        { date: '2025-06-02', price: 170 },
        { date: '2025-06-03', price: 175 },
        { date: '2025-06-04', price: 172 },
        { date: '2025-06-05', price: 180 },
      ],
    },
    LINK: {
      name: 'Chainlink',
      symbol: 'LINK',
      logo: '/logos/link.svg',
      marketCap: 11_000_000_000,
      prices: [
        { date: '2025-06-01', price: 18.5 },
        { date: '2025-06-02', price: 19.0 },
        { date: '2025-06-03', price: 19.2 },
        { date: '2025-06-04', price: 18.8 },
        { date: '2025-06-05', price: 19.5 },
      ],
    },
    RNDR: {
      name: 'Render',
      symbol: 'RNDR',
      logo: '/logos/rndr.svg',
      marketCap: 4_000_000_000,
      prices: [
        { date: '2025-06-01', price: 10.0 },
        { date: '2025-06-02', price: 10.5 },
        { date: '2025-06-03', price: 11.0 },
        { date: '2025-06-04', price: 10.8 },
        { date: '2025-06-05', price: 11.5 },
      ],
    },
  };
  
  // 5つのインデックスの定義
  export const mockIndices: IndexDefinition[] = [
    {
      id: 'blue-chip',
      name: 'Blue Chip Index',
      description: 'A market-cap weighted index of the largest and most established crypto assets.',
      weighting: 'market_cap',
      constituents: ['BTC', 'ETH'],
    },
    {
      id: 'l1-leaders',
      name: 'L1 Leaders Index',
      description: 'An equally weighted index of leading Layer 1 blockchain assets.',
      weighting: 'equal',
      constituents: ['ETH', 'SOL'],
    },
    {
      id: 'oracle-majors',
      name: 'Oracle Majors Index',
      description: 'An equally weighted index focusing on dominant oracle network providers.',
      weighting: 'equal',
      constituents: ['LINK'],
    },
    {
      id: 'de-pin',
      name: 'DePIN Index',
      description: 'A market-cap weighted index of key projects in the Decentralized Physical Infrastructure space.',
      weighting: 'market_cap',
      constituents: ['RNDR', 'LINK'],
    },
    {
      id: 'axis-composite',
      name: 'Axis Composite Index',
      description: 'Our flagship equally weighted index, representing a diverse range of market sectors.',
      weighting: 'equal',
      constituents: ['BTC', 'ETH', 'SOL', 'LINK', 'RNDR'],
    },
  ];