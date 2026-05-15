'use client';

import { useState } from 'react';
import { User, Bell, Globe, Shield, Save, Check } from 'lucide-react';

export default function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Abraham',
    email: 'john.abraham@naxusa.com',
    phone: '+1 310-555-0199',
    role: 'Operations Manager',
    location: 'Los Angeles, CA',
    language: 'English',
    timezone: 'America/Los_Angeles',
  });

  const [notif, setNotif] = useState({
    emailAlerts: true,
    smsAlerts: false,
    criticalOnly: false,
    weeklyReport: true,
    shipmentUpdates: true,
    coldChainAlerts: true,
    customsAlerts: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all";
  const inputStyle = { background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', color: '#1e293b' };

  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
      <span className="text-sm font-semibold" style={{ color: '#1e293b' }}>{label}</span>
      <button onClick={onChange} className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
        style={{ background: checked ? '#1e3a8a' : '#e2e8f0' }}>
        <span className="absolute top-0.5 transition-all w-5 h-5 bg-white rounded-full shadow-md"
          style={{ left: checked ? '22px' : '2px' }}/>
      </button>
    </div>
  );

  return (
    <div className="space-y-5 animate-fade-up max-w-4xl">
      {/* Profile */}
      <form onSubmit={handleSave}>
        <div className="glass-card p-6 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>
              <User size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Profile Information</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Update your account details</p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <div className="relative">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-20 h-20 rounded-2xl border-2" style={{ borderColor: '#f59e0b' }}/>
              <button type="button" className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full text-white flex items-center justify-center text-xs font-bold"
                style={{ background: '#1e3a8a' }}>✎</button>
            </div>
            <div>
              <p className="font-black text-lg" style={{ color: '#0f172a' }}>{profile.name}</p>
              <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>{profile.role}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                ● Active
              </span>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Full Name', field: 'name', type: 'text' },
              { label: 'Email Address', field: 'email', type: 'email' },
              { label: 'Phone Number', field: 'phone', type: 'tel' },
              { label: 'Job Title', field: 'role', type: 'text' },
              { label: 'Location', field: 'location', type: 'text' },
            ].map(f => (
              <div key={f.field}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                <input type={f.type} value={(profile as Record<string, string>)[f.field]}
                  onChange={e => setProfile(prev => ({ ...prev, [f.field]: e.target.value }))}
                  className={inputClass} style={inputStyle}/>
              </div>
            ))}

            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Language</label>
              <select value={profile.language} onChange={e => setProfile(p => ({ ...p, language: e.target.value }))}
                className={inputClass} style={inputStyle}>
                <option>English</option>
                <option>Japanese</option>
                <option>Spanish</option>
                <option>Chinese</option>
                <option>Vietnamese</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
              <Bell size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Notification Preferences</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Configure alert channels and types</p>
            </div>
          </div>
          <div className="space-y-0">
            <Toggle checked={notif.emailAlerts} onChange={() => setNotif(p => ({ ...p, emailAlerts: !p.emailAlerts }))} label="Email Alerts"/>
            <Toggle checked={notif.smsAlerts} onChange={() => setNotif(p => ({ ...p, smsAlerts: !p.smsAlerts }))} label="SMS Alerts"/>
            <Toggle checked={notif.criticalOnly} onChange={() => setNotif(p => ({ ...p, criticalOnly: !p.criticalOnly }))} label="Critical Alerts Only"/>
            <Toggle checked={notif.weeklyReport} onChange={() => setNotif(p => ({ ...p, weeklyReport: !p.weeklyReport }))} label="Weekly Summary Report"/>
            <Toggle checked={notif.shipmentUpdates} onChange={() => setNotif(p => ({ ...p, shipmentUpdates: !p.shipmentUpdates }))} label="Shipment Status Updates"/>
            <Toggle checked={notif.coldChainAlerts} onChange={() => setNotif(p => ({ ...p, coldChainAlerts: !p.coldChainAlerts }))} label="Cold Chain Temperature Alerts"/>
            <Toggle checked={notif.customsAlerts} onChange={() => setNotif(p => ({ ...p, customsAlerts: !p.customsAlerts }))} label="Customs & Regulatory Alerts"/>
          </div>
        </div>

        {/* System Info */}
        <div className="glass-card p-6 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
              <Globe size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>System Configuration</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Regional and display settings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Timezone</label>
              <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
                className={inputClass} style={inputStyle}>
                {['America/Los_Angeles', 'America/New_York', 'Asia/Tokyo', 'Asia/Shanghai', 'Europe/London'].map(tz => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Temperature Unit</label>
              <select className={inputClass} style={inputStyle}>
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Weight Unit</label>
              <select className={inputClass} style={inputStyle}>
                <option>Kilograms (kg)</option>
                <option>Pounds (lbs)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Currency</label>
              <select className={inputClass} style={inputStyle}>
                <option>USD ($)</option>
                <option>JPY (¥)</option>
                <option>CNY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
              <Shield size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Security</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Password and authentication</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {['Current Password', 'New Password', 'Confirm New Password'].map(l => (
              <div key={l} className={l === 'Current Password' ? 'sm:col-span-2' : ''}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{l}</label>
                <input type="password" placeholder="••••••••" className={inputClass} style={inputStyle}/>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button type="submit"
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-black text-white transition-all"
          style={{
            background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #1e3a8a, #2a4db3)',
            boxShadow: saved ? '0 4px 15px rgba(16,185,129,0.35)' : '0 4px 15px rgba(30,58,138,0.35)',
          }}>
          {saved ? <><Check size={18}/> Saved!</> : <><Save size={18}/> Save Changes</>}
        </button>
      </form>
    </div>
  );
}
