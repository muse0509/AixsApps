'use client';

export const Background = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-solana-green/20 via-transparent to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-solana-purple/20 via-transparent to-transparent opacity-30 blur-3xl"></div>
    </div>
  );
};