import { useState } from 'react';
import { Save, Bell, Shield, Sliders, Globe } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    enableAlerts: true,
    emailNotifications: 'admin@driftpulse.com',
    darkMode: true,
    dataRetention: '30',
    apiEndpoint: 'https://api.driftpulse.local/v1'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 fade-in h-full overflow-y-auto max-w-4xl mx-auto">
      <div className="page-header items-center">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your DriftPulse platform configuration</p>
        </div>
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

      <form className="space-y-6 pb-8" onSubmit={handleSave}>
        
        {/* General Settings */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Sliders className="text-brand-secondary" size={20} />
            <h2 className="text-lg font-bold">General Settings</h2>
          </div>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Theme Preference</label>
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-md border border-white/5">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-xs text-gray-500">Enable dark theme for the dashboard</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="darkMode" className="sr-only peer" checked={settings.darkMode} onChange={handleChange} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Data Retention Period (Days)</label>
              <select 
                name="dataRetention" 
                value={settings.dataRetention} 
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#8B5CF6] outline-none"
              >
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
                <option value="365">1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Globe className="text-brand-secondary" size={20} />
            <h2 className="text-lg font-bold">System Preferences</h2>
          </div>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">API Endpoint Configuration</label>
              <input 
                type="text" 
                name="apiEndpoint" 
                value={settings.apiEndpoint} 
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#8B5CF6] outline-none font-mono text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">The primary endpoint the dashboard uses to fetch telemetry data.</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Bell className="text-[#FACC15]" size={20} />
            <h2 className="text-lg font-bold">Notification Settings</h2>
          </div>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-md border border-white/5">
                <div>
                  <div className="font-medium">Enable Alerts</div>
                  <div className="text-xs text-gray-500">Receive system-wide anomaly alerts</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="enableAlerts" className="sr-only peer" checked={settings.enableAlerts} onChange={handleChange} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FACC15]"></div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Notifications Address</label>
              <input 
                type="email" 
                name="emailNotifications" 
                value={settings.emailNotifications} 
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#FACC15] outline-none disabled:opacity-50"
                disabled={!settings.enableAlerts}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-panel p-6 border-l-[3px] border-l-[#EF4444]">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <Shield className="text-[#EF4444]" size={20} />
            <h2 className="text-lg font-bold">Security Settings</h2>
          </div>
          
          <div className="space-y-4 max-w-xl">
            <p className="text-sm text-gray-400 mb-4">
              Advanced security configurations. Modifying these may affect user access and dashboard functionality.
            </p>
            <div className="flex gap-3">
              <button type="button" className="btn-outline text-sm text-[#EF4444]! border-[#EF4444]/30! hover:bg-[#EF4444]/10!">
                Manage ACL
              </button>
              <button type="button" className="btn-outline text-sm">
                Rotate API Keys
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
