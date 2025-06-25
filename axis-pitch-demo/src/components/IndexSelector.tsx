'use client';
import { IndexDefinition } from '@/data/mockData';
import clsx from 'clsx';

interface Props {
  indices: IndexDefinition[];
  selectedIndexId: string;
  onSelect: (id: string) => void;
}

export const IndexSelector = ({ indices, selectedIndexId, onSelect }: Props) => {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md h-full">
      <h2 className="mb-4 text-lg font-bold text-white px-2">Indices</h2>
      <div className="flex flex-col gap-2">
        {indices.map((index) => (
          <button
            key={index.id}
            onClick={() => onSelect(index.id)}
            className={clsx(
              'w-full rounded-lg p-3 text-left transition-all duration-300',
              selectedIndexId === index.id
                ? 'bg-solana-gradient shadow-lg'
                : 'bg-white/5 hover:bg-white/10'
            )}
          >
            <p className="font-bold text-white">{index.name}</p>
            <p className="text-xs text-slate-300 font-normal mt-1">{index.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};