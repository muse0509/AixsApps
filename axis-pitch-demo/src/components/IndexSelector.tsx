'use client';

import { IndexDefinition } from '@/data/mockData';
import clsx from 'clsx'; // クラス名を結合するためのユーティリティ

// clsxをインストールします: npm install clsx
// (すでにインストールされている場合は不要です)

interface Props {
  indices: IndexDefinition[];
  selectedIndexId: string;
  onSelect: (id: string) => void;
}

export const IndexSelector = ({ indices, selectedIndexId, onSelect }: Props) => {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h2 className="mb-4 text-lg font-semibold">Indices</h2>
      <div className="flex flex-col gap-2">
        {indices.map((index) => (
          <button
            key={index.id}
            onClick={() => onSelect(index.id)}
            className={clsx(
              'w-full rounded-md p-3 text-left transition-colors',
              selectedIndexId === index.id
                ? 'bg-sky-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600'
            )}
          >
            <p className="font-semibold">{index.name}</p>
            <p className="text-xs text-slate-300">{index.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};