'use client';
import { IndexDefinition } from '@/data/mockData';
import { Wallet } from 'lucide-react';

interface Props {
  balances: {
    USDC: number;
    [indexId: string]: number;
  };
  indices: IndexDefinition[];
}

export const UserPortfolio = ({ balances, indices }: Props) => {
  const ownedIndices = indices.filter(index => balances[index.id] > 0.0001);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Wallet size={20} />
        My Portfolio
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-lg">
          <span className="text-slate-300 font-normal">USDC Balance</span>
          <span className="font-mono text-white">${balances.USDC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        
        {ownedIndices.length > 0 && (
          <div className="border-t border-slate-700 pt-3 mt-3 space-y-2">
            <h4 className="text-sm font-semibold text-slate-400">Owned Index Tokens</h4>
            {ownedIndices.map(index => (
              <div key={index.id} className="flex justify-between items-center">
                <span className="text-slate-300 font-normal">{index.name}</span>
                <span className="font-mono">{balances[index.id].toFixed(4)}</span>
              </div>
            ))}
          </div>
        )}

        {ownedIndices.length === 0 && (
             <div className="border-t border-slate-700 pt-3 mt-3">
                {/* ★★★ ここを修正 ★★★ */}
                <p className="text-sm text-slate-500 font-normal text-center">You don&apos;t own any index tokens yet.</p>
             </div>
        )}
      </div>
    </div>
  );
};