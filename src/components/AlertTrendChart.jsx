import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const getBarColor = (value) => {
  if (value > 40) return '#EF4444'; // red — high
  if (value > 20) return '#FACC15'; // yellow — medium
  return '#22C55E';                  // green — low
};

const data = [
  { time: '00:00', alerts: 12 },
  { time: '04:00', alerts: 18 },
  { time: '08:00', alerts: 35 },
  { time: '12:00', alerts: 42 },
  { time: '16:00', alerts: 55 },
  { time: '20:00', alerts: 28 },
  { time: '24:00', alerts: 15 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] border border-gray-700/50 p-3 rounded-md shadow-xl text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="font-bold" style={{ color: getBarColor(payload[0].value) }}>
          {payload[0].value} Alerts
        </p>
      </div>
    );
  }
  return null;
};

export default function AlertTrendChart() {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden group">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#22D3EE]/5 rounded-full blur-3xl group-hover:bg-[#22D3EE]/10 transition-all duration-500"></div>
      
      <h3 className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-6">
        Alert Trend (24H)
      </h3>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar 
              dataKey="alerts" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.alerts)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
