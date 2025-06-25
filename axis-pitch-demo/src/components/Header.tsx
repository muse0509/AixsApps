import Image from 'next/image';
import { WalletButton } from './WalletButton';

export const Header = () => {
  return (
    <header className="w-full border-b border-slate-700 bg-slate-800/50 p-4 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Axis Logo" width={32} height={32} /> 
        </div>
        <WalletButton />
      </div>
    </header>
  );
};