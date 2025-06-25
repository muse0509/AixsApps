'use client';

interface Props {
  name?: string;
  price?: number;
}

export const IndexHeader = ({ name = "Select Index", price = 0 }: Props) => {
  return (
    <div className="mb-4">
      <h2 className="text-3xl font-bold">{name}</h2>
      <p className="text-2xl font-medium text-slate-300">${price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</p>
    </div>
  );
};