import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Online', value: 85, color: '#10b981' },
  { name: 'Warning', value: 10, color: '#f59e0b' },
  { name: 'Offline', value: 5, color: '#ef4444' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip glass-panel">
        <p className="tooltip-item" style={{ color: data.color }}>
          <span className="tooltip-dot" style={{ backgroundColor: data.color }}></span>
          {data.name}: <span className="font-bold">{data.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DonutChart() {
  return (
    <div className="chart-card glass-panel fade-in delay-2">
      <div className="card-header">
        <h3 className="card-title">Device Health</h3>
      </div>
      <div className="chart-container donut-container">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center-info">
          <span className="donut-total">85%</span>
          <span className="donut-label">Healthy</span>
        </div>
      </div>
      <div className="legend-custom">
        {data.map((entry, idx) => (
          <div key={idx} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
            <span className="legend-text">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
