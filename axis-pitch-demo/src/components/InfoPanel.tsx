'use client';
import { useState } from 'react';
import { IndexDefinition, mockAssets } from '@/data/mockData';
import { ConstituentDonutChart } from './ConstituentDonutChart';
import clsx from 'clsx';

interface Props {
  index?: IndexDefinition;
}

export const InfoPanel = ({ index }: Props) => {
  const [activeTab, setActiveTab] = useState('highlight');

  if (!index) return null;

  const getDonutChartData = () => {
      if (index.weighting === 'equal') {
          const weight = 100 / index.constituents.length;
          return index.constituents.map(symbol => ({ name: symbol, value: weight }));
      }
      // 時価総額加重の計算
      const totalMarketCap = index.constituents.reduce((sum, symbol) => sum + (mockAssets[symbol]?.marketCap || 0), 0);
      if (totalMarketCap === 0) return [];
      return index.constituents.map(symbol => ({
          name: symbol,
          value: ((mockAssets[symbol]?.marketCap || 0) / totalMarketCap) * 100
      }));
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800">
      <div className="border-b border-slate-700">
        <nav className="-mb-px flex gap-6 px-6">
          <button
            onClick={() => setActiveTab('highlight')}
            className={clsx(
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'highlight'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
            )}
          >
            Highlight
          </button>
        </nav>
      </div>
      <div className="p-6">
        {activeTab === 'highlight' && (
          <div>
            <h4 className="font-semibold text-lg mb-2">{index.name} Highlights</h4>
            <p className="text-slate-300 leading-relaxed">{index.description}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-semibold mb-2">Constituent Weights</h5>
                    <ConstituentDonutChart data={getDonutChartData()} />
                </div>
                <div>
                    <h5 className="font-semibold mb-2">Product Elements</h5>
                    <ul className="text-sm space-y-2 text-slate-300">
                       <li className="flex justify-between"><span>Weighting:</span> <span className="font-mono text-slate-100">{index.weighting}</span></li>
                       <li className="flex justify-between"><span>Constituents:</span> <span className="font-mono text-slate-100">{index.constituents.length}</span></li>
                       <li className="flex justify-between"><span>Rebalance:</span> <span className="font-mono text-slate-100">Monthly</span></li>
                    </ul>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};