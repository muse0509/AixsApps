'use client';

import { IndexHistoryPoint } from '@/lib/indexCalculator';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: IndexHistoryPoint[];
  name: string;
}

export const IndexChart = ({ data, name }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
        <YAxis
          stroke="#94a3b8"
          fontSize={12}
          domain={['dataMin - 5', 'dataMax + 5']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#334155',
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} name={name} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};