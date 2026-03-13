import { MoreVertical, Server, Database, HardDrive, Wifi } from 'lucide-react';

const devices = [
  { id: 'DEV-001', name: 'Edge Server Alpha', type: 'Server', status: 'Online', uptime: '99.9%', load: 45, icon: Server },
  { id: 'DEV-002', name: 'Primary DB Cluster', type: 'Database', status: 'Online', uptime: '99.8%', load: 62, icon: Database },
  { id: 'DEV-003', name: 'Cache Layer Node', type: 'Storage', status: 'Warning', uptime: '94.2%', load: 89, icon: HardDrive },
  { id: 'DEV-004', name: 'Main Load Balancer', type: 'Network', status: 'Online', uptime: '99.9%', load: 31, icon: Wifi },
];

export default function DeviceTable() {
  return (
    <div className="device-table-card glass-panel fade-in">
      <div className="card-header">
        <div className="card-title">
          <h3>Active Devices</h3>
          <span className="text-muted text-sm">Real-time status</span>
        </div>
        <button className="btn-outline">View All</button>
      </div>
      <div className="table-wrapper">
        <table className="device-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Status</th>
              <th>Uptime</th>
              <th>System Load</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((dev, i) => {
              const Icon = dev.icon;
              return (
                <tr key={dev.id} className="table-row" style={{ animationDelay: `${i * 0.1}s` }}>
                  <td>
                    <div className="device-info">
                      <div className="device-icon-box">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="device-name">{dev.name}</div>
                        <div className="device-id font-mono">{dev.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${dev.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {dev.status}
                    </span>
                  </td>
                  <td className="font-mono text-sm">{dev.uptime}</td>
                  <td>
                    <div className="load-indicator">
                      <div className="progress-bg">
                        <div 
                          className={`progress-fill ${dev.load > 80 ? 'critical' : 'normal'}`} 
                          style={{ width: `${dev.load}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-sm">{dev.load}%</span>
                    </div>
                  </td>
                  <td>
                    <button className="icon-btn-small">
                      <MoreVertical size={16}/>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
