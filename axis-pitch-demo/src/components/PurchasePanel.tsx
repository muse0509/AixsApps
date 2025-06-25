'use client';
import { IndexDefinition, mockAssets } from '@/data/mockData';
import { ArrowRight, CheckCircle, Flame, Layers, Link2, Puzzle } from 'lucide-react';

const mockChains = [
    { name: 'Solana', icon: Flame },
    { name: 'Ethereum', icon: Layers },
    { name: 'Base', icon: Puzzle },
    { name: 'Blast', icon: Link2 },
];

export const PurchasePanel = ({ index }: { index: IndexDefinition | undefined }) => {
  if (!index) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-slate-700 bg-slate-800 p-6">
        <p>Select an index to see details.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
      <h3 className="text-2xl font-bold">{index.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{index.description}</p>
      
      <div className="mt-4">
          <p className="text-xs uppercase text-slate-500">Constituents</p>
          <div className="flex flex-wrap gap-2 mt-2">
              {index.constituents.map(symbol => (
                  <span key={symbol} className="px-2 py-1 text-sm bg-slate-700 rounded-md">{mockAssets[symbol]?.name}</span>
              ))}
          </div>
      </div>

      {/* 購入UI */}
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-300">
            Amount (USDC)
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="amount"
              defaultValue={100}
              className="w-full rounded-md border-slate-600 bg-slate-700 p-2 text-white focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="chain" className="block text-sm font-medium text-slate-300">
            Purchase on
          </label>
          <select
            id="chain"
            className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 py-2 pl-3 pr-10 text-base text-white focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
          >
            {mockChains.map(chain => (
                <option key={chain.name}>{chain.name}</option>
            ))}
          </select>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700">
            <CheckCircle size={20}/>
            Buy Index Token
        </button>
      </div>
    </div>
  );
};