'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { IndexSelector } from '@/components/IndexSelector';
import { IndexChart } from '@/components/IndexChart';
import { PurchasePanel } from '@/components/PurchasePanel';
import { mockAssets, mockIndices } from '@/data/mockData';
import { calculateIndexHistory } from '@/lib/indexCalculator';

export default function Home() {
  // 選択されているインデックスIDを管理するstate
  const [selectedIndexId, setSelectedIndexId] = useState<string>(mockIndices[0].id);

  // 全インデックスの価格履歴を計算（useMemoで不要な再計算を防ぐ）
  const allIndicesHistory = useMemo(() => {
    const histories: { [key: string]: ReturnType<typeof calculateIndexHistory> } = {};
    for (const index of mockIndices) {
      histories[index.id] = calculateIndexHistory(index, mockAssets);
    }
    return histories;
  }, []);

  // 選択中のインデックスの定義と価格履歴を取得
  const selectedIndex = mockIndices.find(idx => idx.id === selectedIndexId);
  const selectedIndexHistory = allIndicesHistory[selectedIndexId] || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 左カラム */}
          <div className="lg:col-span-1">
            <IndexSelector
              indices={mockIndices}
              selectedIndexId={selectedIndexId}
              onSelect={setSelectedIndexId}
            />
          </div>
          {/* 右カラム */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <IndexChart data={selectedIndexHistory} name={selectedIndex?.name || ''} />
            </div>
            <PurchasePanel index={selectedIndex} />
          </div>
        </div>
      </main>
    </div>
  );
}