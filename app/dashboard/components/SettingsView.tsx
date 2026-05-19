'use client';

import { useState } from 'react';
import { User, Bell, Globe, Shield, Save, Check, Camera } from 'lucide-react';
import { useToast } from './Toast';

export default function SettingsView() {
  const { showToast } = useToast();
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
    showToast('success', 'Settings saved!', 'All your changes have been saved successfully.');
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all";
  const inputStyle = { background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', color: '#1e293b' };

  const Toggle = ({
    checked, onChange, label, desc
  }: { checked: boolean; onChange: () => void; label: string; desc?: string }) => (
    <div className="flex items-center justify-between py-3.5 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
      <div>
        <p className="text-sm font-bold" style={{ color: '#1e293b' }}>{label}</p>
        {desc && <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{desc}</p>}
      </div>
      <button
        type="button"
        onClick={() => { onChange(); showToast(checked ? 'info' : 'success', `${label} ${checked ? 'disabled' : 'enabled'}`); }}
        className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ml-4"
        style={{ background: checked ? '#1e3a8a' : '#e2e8f0' }}>
        <span className="absolute top-0.5 transition-all duration-300 w-5 h-5 bg-white rounded-full shadow-md"
          style={{ left: checked ? '26px' : '2px' }}/>
      </button>
    </div>
  );

  return (
    <div className="space-y-5 animate-fade-up max-w-4xl">
      <form onSubmit={handleSave}>

        {/* Profile */}
        <div className="glass-card p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>
              <User size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>My Profile</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Your account information and identity</p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <div className="relative">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile Photo" className="w-20 h-20 rounded-2xl border-2 object-cover" style={{ borderColor: '#f59e0b' }}/>
              <button type="button"
                onClick={() => showToast('info', 'Select new photo', 'Photo upload feature coming soon.')}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                style={{ background: '#1e3a8a' }}
                title="Change profile photo">
                <Camera size={14}/>
              </button>
            </div>
            <div>
              <p className="font-black text-lg" style={{ color: '#0f172a' }}>{profile.name}</p>
              <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>{profile.role}</p>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full mt-2 inline-block"
                style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                ● Active &amp; Verified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Full Name', field: 'name', type: 'text', placeholder: 'Your name' },
              { label: 'Email Address', field: 'email', type: 'email', placeholder: 'email@naxusa.com' },
              { label: 'Phone Number', field: 'phone', type: 'tel', placeholder: '+1 ...' },
              { label: 'Job Title', field: 'role', type: 'text', placeholder: 'e.g. Operations Manager' },
              { label: 'City / Location', field: 'location', type: 'text', placeholder: 'e.g. Los Angeles, CA' },
            ].map(f => (
              <div key={f.field}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  value={(profile as Record<string, string>)[f.field]}
                  onChange={e => setProfile(prev => ({ ...prev, [f.field]: e.target.value }))}
                  className={inputClass} style={inputStyle}/>
              </div>
            ))}
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Language</label>
              <select value={profile.language} onChange={e => setProfile(p => ({ ...p, language: e.target.value }))}
                className={inputClass} style={inputStyle}>
                <option>English</option>
                <option>Bahasa Indonesia</option>
                <option>日本語 (Japanese)</option>
                <option>中文 (Chinese)</option>
                <option>Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
              <Bell size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Notification Settings</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Choose how you want to receive notifications</p>
            </div>
          </div>
          <Toggle checked={notif.emailAlerts} onChange={() => setNotif(p => ({ ...p, emailAlerts: !p.emailAlerts }))} label="Email Notifications" desc="Receive alerts to your email inbox"/>
          <Toggle checked={notif.smsAlerts} onChange={() => setNotif(p => ({ ...p, smsAlerts: !p.smsAlerts }))} label="SMS Notifications" desc="Receive SMS for important alerts"/>
          <Toggle checked={notif.criticalOnly} onChange={() => setNotif(p => ({ ...p, criticalOnly: !p.criticalOnly }))} label="Critical Alerts Only" desc="Skip routine info &amp; updates"/>
          <Toggle checked={notif.weeklyReport} onChange={() => setNotif(p => ({ ...p, weeklyReport: !p.weeklyReport }))} label="Weekly Report" desc="Automatic summary every Monday morning"/>
          <Toggle checked={notif.shipmentUpdates} onChange={() => setNotif(p => ({ ...p, shipmentUpdates: !p.shipmentUpdates }))} label="Shipment Status Updates" desc="Notify on every shipment status change"/>
          <Toggle checked={notif.coldChainAlerts} onChange={() => setNotif(p => ({ ...p, coldChainAlerts: !p.coldChainAlerts }))} label="Cold Storage Temperature Alerts" desc="Alert when temperature exceeds safe limits"/>
          <Toggle checked={notif.customsAlerts} onChange={() => setNotif(p => ({ ...p, customsAlerts: !p.customsAlerts }))} label="Customs Notifications" desc="Updates on clearance status &amp; inspections"/>
        </div>

        {/* System Config */}
        <div className="glass-card p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
              <Globe size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Display Configuration</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Set your timezone and measurement units</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Timezone</label>
              <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
                className={inputClass} style={inputStyle}>
                {['America/Los_Angeles', 'America/New_York', 'Asia/Tokyo', 'Asia/Shanghai', 'Europe/London', 'Asia/Jakarta'].map(tz => (
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
                <option>Kilogram (kg)</option>
                <option>Pound (lbs)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Currency</label>
              <select className={inputClass} style={inputStyle}>
                <option>USD ($)</option>
                <option>JPY (¥)</option>
                <option>IDR (Rp)</option>
                <option>CNY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
              <Shield size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Account Security</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Change your password to keep your account secure</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Current Password', span: 'sm:col-span-2' },
              { label: 'New Password', span: '' },
              { label: 'Confirm New Password', span: '' },
            ].map(f => (
              <div key={f.label} className={f.span}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                <input type="password" placeholder="••••••••" className={inputClass} style={inputStyle}/>
              </div>
            ))}
          </div>
          <button type="button"
            onClick={() => showToast('info', 'Verifying password...', 'Make sure your new password is at least 8 characters.')}
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-80"
            style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.15)' }}>
            Change Password
          </button>
        </div>

        {/* Save */}
        <button type="submit"
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-black text-white transition-all hover:opacity-90"
          style={{
            background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #1e3a8a, #2a4db3)',
            boxShadow: saved ? '0 4px 15px rgba(16,185,129,0.35)' : '0 4px 15px rgba(30,58,138,0.35)',
          }}>
          {saved ? <><Check size={18}/>Saved!</> : <><Save size={18}/>Save All Changes</>}
        </button>
      </form>
    </div>
  );
}
