import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Server, Download, ShieldAlert, Activity, Shield, AlertTriangle, AlertCircle, Clock, MapPin, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { time: '00:00', drift: 0.1, anomaly: 0 },
  { time: '04:00', drift: 0.15, anomaly: 0 },
  { time: '08:00', drift: 0.2, anomaly: 0 },
  { time: '12:00', drift: 0.85, anomaly: 1 }, 
  { time: '16:00', drift: 0.4, anomaly: 0 },
  { time: '20:00', drift: 0.35, anomaly: 0 },
  { time: '24:00', drift: 0.45, anomaly: 0 },
];

export default function DeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const device = {
    id: id || 'DP-99283-AX',
    ip: '192.168.1.142',
    lastSeen: '2 min ago',
    location: 'US-East Data Center',
    firmware: 'v2.4.1-stable',
    risk: 'Medium',
    policy: 'Non-Compliant',
    trustScore: 64,
    uptime: '14d 6h 22m'
  };

  return (
    <div className="p-6 fade-in h-full overflow-y-auto">
      {/* Back navigation */}
      <button 
        className="btn-text mb-4 text-gray-400 hover:text-white"
        onClick={() => navigate('/devices')}
      >
        <ArrowLeft size={16} />
        Back to Devices
      </button>

      {/* Header section */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#22D3EE]/10 p-4 rounded-xl border border-[#22D3EE]/20">
              <Server size={32} className="text-[#22D3EE]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-mono text-brand mb-1">{device.id}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono">
                <span className="flex items-center gap-1.5"><Activity size={14} className="text-gray-500"/> {device.ip}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-500"/> {device.location}</span>
                <span className="flex items-center gap-1.5"><Cpu size={14} className="text-gray-500"/> {device.firmware}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-500"/> Last seen: {device.lastSeen}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-outline text-sm">
              <Download size={16} />
              Export Logs
            </button>
            <button className="btn-outline text-sm text-[#EF4444]! border-[#EF4444]/30! hover:bg-[#EF4444]/10!">
              <ShieldAlert size={16} />
              Quarantine Device
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Panels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <Shield size={24} className={device.risk === 'Medium' ? 'text-[#FACC15]' : 'text-[#22C55E]'} />
              <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider text-[11px] font-bold">Risk Level</div>
              <div className={`text-xl font-bold mt-1 ${device.risk === 'Medium' ? 'text-[#FACC15]' : 'text-[#22C55E]'}`}>{device.risk}</div>
            </div>
            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <AlertTriangle size={24} className={device.policy === 'Non-Compliant' ? 'text-[#EF4444]' : 'text-[#FACC15]'} />
              <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider text-[11px] font-bold">Policy Status</div>
              <div className={`text-xl font-bold mt-1 ${device.policy === 'Non-Compliant' ? 'text-[#EF4444]' : 'text-[#FACC15]'}`}>{device.policy}</div>
            </div>
            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <Activity size={24} className={device.trustScore < 50 ? 'text-[#EF4444]' : 'text-[#22D3EE]'} />
              <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider text-[11px] font-bold">Trust Score</div>
              <div className="text-xl font-bold mt-1 text-white font-mono">{device.trustScore}<span className="text-sm text-gray-500">/100</span></div>
            </div>
            <div className="glass-panel p-4 flex flex-col items-center justify-center text-center">
              <Clock size={24} className="text-[#22C55E]" />
              <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider text-[11px] font-bold">Uptime</div>
              <div className="text-xl font-bold mt-1 text-white font-mono">{device.uptime}</div>
            </div>
          </div>

          {/* Large Chart */}
          <div className="glass-panel p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                <Activity size={18} className="text-[#22D3EE]" />
                Drift Severity Analysis
              </h3>
              <p className="text-sm text-gray-400">Monitoring configuration and behavior drift over the last 24 hours</p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDrift" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', zIndex: 100 }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="drift" name="Drift Level" stroke="#22D3EE" strokeWidth={2} fillOpacity={1} fill="url(#colorDrift)" />
                  <Area type="monotone" dataKey="anomaly" name="Anomaly Spike" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAnomaly)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* AI Insights Panel Column */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 h-full border-t-[3px] border-t-[#8B5CF6]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <Cpu size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Insights</h3>
                <p className="text-xs text-brand uppercase tracking-wider font-semibold">Real-time Analysis</p>
              </div>
            </div>
            
            <div className="space-y-4">
              
              {/* Insight Card 1 */}
              <div className="bg-black/30 border border-[#EF4444]/30 border-l-[3px] border-l-[#EF4444] p-4 rounded-lg hover:bg-black/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#EF4444] px-2 py-0.5 bg-[#EF4444]/10 rounded uppercase tracking-wider">High Severity</span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">Confidence: <span className="text-white font-bold">94%</span></span>
                </div>
                <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                  Traffic volume increased by 240% compared to historical baselines for this time of day. Possible data exfiltration attempt.
                </p>
                <button className="btn-outline w-full justify-center py-2 text-xs hover:bg-[#EF4444]/10 hover:border-[#EF4444] hover:text-[#EF4444] transition-all">
                  Investigate Anomaly
                </button>
              </div>

              {/* Insight Card 2 */}
              <div className="bg-black/30 border border-[#FACC15]/30 border-l-[3px] border-l-[#FACC15] p-4 rounded-lg hover:bg-black/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold text-[#FACC15] px-2 py-0.5 bg-[#FACC15]/10 rounded uppercase tracking-wider">Medium Severity</span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">Confidence: <span className="text-white font-bold">81%</span></span>
                </div>
                <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                  Device attempted unauthorized connection to an external IP (103.45.XX.XX) known for C2 servers. Blocked by firewall.
                </p>
                <button className="btn-outline w-full justify-center py-2 text-xs hover:bg-[#FACC15]/10 hover:border-[#FACC15] hover:text-[#FACC15] transition-all">
                  Investigate Connection
                </button>
              </div>

              <div className="p-4 bg-linear-to-br from-[#8B5CF6]/10 to-[#06B6D4]/10 rounded-lg border border-[#8B5CF6]/20 mt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-[#06B6D4] mt-0.5 shrink-0" />
                  <div className="text-sm text-gray-300">
                    <strong className="text-white block mb-1">Recommendation</strong>
                    Monitor this device closely over the next 24 hours. Consider running a full diagnostic scan or rotating access credentials.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
