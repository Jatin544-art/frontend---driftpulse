export default function MetricCard({ title, value, change, icon: Icon, trend, color }) {
  const isUp = trend === 'up';
  
  return (
    <div className="metric-card glass-panel slide-up">
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {Icon && (
          <div className="metric-icon-wrapper">
            <Icon className="metric-icon" size={20} />
          </div>
        )}
      </div>
      <div className="metric-body">
        <h3 className={`metric-value ${color || ''}`}>{value}</h3>
        <div className={`metric-change-wrapper ${isUp ? 'trend-up' : 'trend-down'}`}>
          <span className="metric-change">
            {isUp ? '+' : ''}{change}
          </span>
          <span className="metric-period">vs last week</span>
        </div>
      </div>
    </div>
  );
}
