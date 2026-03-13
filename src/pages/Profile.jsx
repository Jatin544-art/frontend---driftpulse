import { useState } from 'react';
import { User, Mail, Building, Key, Bell, LogOut, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@driftpulse.com',
    role: 'SECURITY LEAD',
    organization: 'Acme Corp Security',
    lastLogin: '2 hours ago',
    notificationsEnabled: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert('Password changed successfully!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="p-6 fade-in h-full overflow-y-auto max-w-4xl mx-auto">
      <div className="page-header items-center">
        <div>
          <h1 className="page-title">User Profile</h1>
          <p className="page-subtitle">Manage your personal account and security settings</p>
        </div>
        <button className="btn-outline text-[#EF4444]! border-[#EF4444]/30! hover:bg-[#EF4444]/10!">
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
        
        {/* Profile Summary Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <User size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-[#22D3EE] font-bold text-sm tracking-wider uppercase mt-1">{profile.role}</p>
            
            <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400 text-left">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-500" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building size={16} className="text-gray-500" />
                <span className="truncate">{profile.organization}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#22C55E]" />
                <span className="truncate">Active Account</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs">
                Last login: {profile.lastLogin}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Forms Column */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-brand-secondary" />
              Edit Profile
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={profile.name} 
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#22D3EE] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role (Read Only)</label>
                  <input 
                    type="text" 
                    value={profile.role} 
                    readOnly
                    className="w-full bg-black/10 border border-white/5 rounded-md p-2.5 text-gray-500 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={profile.email} 
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#22D3EE] outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Notification Preferences</label>
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-md border border-white/5">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-[#FACC15]" />
                      <div className="text-sm">Receive email digests and alerts</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="notificationsEnabled" className="sr-only peer" checked={profile.notificationsEnabled} onChange={handleChange} />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22D3EE]"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                <button type="submit" className="btn-primary">Update Profile</button>
              </div>
            </form>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Key size={20} className="text-[#EF4444]" />
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                <input 
                  type="password" 
                  value={passwordForm.currentPassword} 
                  onChange={(e) => setPasswordForm(prev => ({...prev, currentPassword: e.target.value}))}
                  className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#EF4444] outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.newPassword} 
                    onChange={(e) => setPasswordForm(prev => ({...prev, newPassword: e.target.value}))}
                    className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#EF4444] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.confirmPassword} 
                    onChange={(e) => setPasswordForm(prev => ({...prev, confirmPassword: e.target.value}))}
                    className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white focus:border-[#EF4444] outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                <button type="submit" className="btn-outline text-sm text-[#EF4444]! border-[#EF4444]/30! hover:bg-[#EF4444]/10!">
                  Change Password
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
