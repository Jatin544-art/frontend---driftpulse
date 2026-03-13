import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', cpu: 30, ram: 45 },
  { time: '04:00', cpu: 45, ram: 50 },
  { time: '08:00', cpu: 65, ram: 70 },
  { time: '12:00', cpu: 85, ram: 80 },
  { time: '16:00', cpu: 55, ram: 65 },
  { time: '20:00', cpu: 40, ram: 55 },
  { time: '23:59', cpu: 35, ram: 45 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip glass-panel">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-item" style={{ color: entry.color }}>
            <span className="tooltip-dot" style={{ backgroundColor: entry.color }}></span>
            {entry.name.toUpperCase()}: <span className="font-bold">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendChart() {
  return (
    <div className="chart-card glass-panel fade-in delay-1">
      <div className="card-header">
        <h3 className="card-title">System Metrics Trend</h3>
        <select className="select-dark">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
            <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}/>
            <Area type="monotone" dataKey="cpu" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
            <Area type="monotone" dataKey="ram" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRam)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
