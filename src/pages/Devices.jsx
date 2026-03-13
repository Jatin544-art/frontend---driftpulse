import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Download, ShieldAlert } from 'lucide-react';

const mockDevices = [
  { id: 'DP-99283-AX', ip: '192.168.1.142', trustScore: 64, driftScore: 0.45, anomalyScore: 0.22, policy: 'Non-Compliant', risk: 'Medium', lastSeen: '2 min ago' },
  { id: 'DP-44910-BX', ip: '10.0.5.22', trustScore: 92, driftScore: 0.05, anomalyScore: 0.01, policy: 'Compliant', risk: 'Low', lastSeen: '1 min ago' },
  { id: 'DP-11002-CX', ip: '192.168.2.14', trustScore: 41, driftScore: 0.88, anomalyScore: 0.75, policy: 'Non-Compliant', risk: 'High', lastSeen: '5 min ago' },
  { id: 'DP-09384-DX', ip: '172.16.0.44', trustScore: 78, driftScore: 0.20, anomalyScore: 0.15, policy: 'Warning', risk: 'Medium', lastSeen: '12 min ago' },
  { id: 'DP-55821-EX', ip: '10.0.1.105', trustScore: 95, driftScore: 0.02, anomalyScore: 0.04, policy: 'Compliant', risk: 'Low', lastSeen: 'Just now' },
];

export default function Devices() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = mockDevices.filter(dev => 
    dev.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dev.ip.includes(searchTerm)
  );

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'text-[#22C55E]';
      case 'Medium': return 'text-[#FACC15]';
      case 'High': return 'text-[#EF4444]';
      default: return 'text-gray-400';
    }
  };

  const getPolicyBadge = (policy) => {
    switch(policy) {
      case 'Compliant': return 'status-badge online w-max';
      case 'Warning': return 'status-badge warning w-max';
      case 'Non-Compliant': return 'status-badge critical w-max';
      default: return 'status-badge';
    }
  };

  return (
    <div className="p-6 fade-in h-full flex flex-col">
      <div className="page-header items-center">
        <div>
          <h1 className="page-title">Devices</h1>
          <p className="page-subtitle">Monitor and manage all connected IoT assets</p>
        </div>
        <div className="search-bar w-80">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search devices, IPs or IDs" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="device-table-card glass-panel flex-1 overflow-hidden flex flex-col mt-4">
        <div className="table-wrapper flex-1 overflow-y-auto">
          <table className="device-table w-full">
            <thead className="sticky top-0 bg-[#0a0a0f] z-10 shadow-sm">
              <tr>
                <th>Device ID</th>
                <th>IP Address</th>
                <th>Trust Score</th>
                <th>Drift Score</th>
                <th>Anomaly Score</th>
                <th>Policy Status</th>
                <th>Risk Level</th>
                <th>Last Seen</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((dev, i) => (
                <tr 
                  key={dev.id} 
                  className="table-row cursor-pointer hover:bg-white/5 transition-colors"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => navigate(`/devices/${dev.id}`)}
                >
                  <td className="font-mono text-brand font-semibold">{dev.id}</td>
                  <td className="font-mono text-sm text-gray-300">{dev.ip}</td>
                  <td>
                    <div className="load-indicator w-32">
                      <div className="progress-bg w-full">
                        <div 
                          className={`progress-fill ${dev.trustScore < 50 ? 'bg-[#EF4444]' : dev.trustScore < 80 ? 'bg-[#FACC15]' : 'bg-[#22C55E]'}`} 
                          style={{ width: `${dev.trustScore}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-sm ml-2">{dev.trustScore}</span>
                    </div>
                  </td>
                  <td className="font-mono text-sm">{dev.driftScore}</td>
                  <td className="font-mono text-sm">{dev.anomalyScore}</td>
                  <td>
                    <span className={getPolicyBadge(dev.policy)}>
                      <span className="status-dot"></span>
                      {dev.policy}
                    </span>
                  </td>
                  <td className={`font-semibold ${getRiskColor(dev.risk)}`}>
                    {dev.risk}
                  </td>
                  <td className="text-sm text-gray-400">{dev.lastSeen}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-3" onClick={e => e.stopPropagation()}>
                      <button 
                        className="text-gray-400 hover:text-white transition-colors" 
                        title="View Device"
                        onClick={() => navigate(`/devices/${dev.id}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-[#22D3EE] transition-colors" title="Export Logs">
                        <Download size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-[#EF4444] transition-colors" title="Quarantine Device">
                        <ShieldAlert size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDevices.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-gray-500">
                    No devices found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
