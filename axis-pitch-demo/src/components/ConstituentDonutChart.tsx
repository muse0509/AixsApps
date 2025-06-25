'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#0ea5e9', '#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444'];

export const ConstituentDonutChart = ({ data }: DonutChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: '#334155',
          }}
          formatter={(value: number) => `${value.toFixed(2)}%`}
        />
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Pie
          data={data}
          cx="35%" // グラフを少し左に寄せる
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};