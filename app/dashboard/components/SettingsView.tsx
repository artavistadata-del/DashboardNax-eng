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
    role: 'Manajer Operasional',
    location: 'Los Angeles, CA',
    language: 'Bahasa Indonesia',
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
    showToast('success', 'Pengaturan disimpan!', 'Semua perubahan Anda telah berhasil tersimpan.');
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
        onClick={() => { onChange(); showToast(checked ? 'info' : 'success', `${label} ${checked ? 'dimatikan' : 'diaktifkan'}`); }}
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
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Profil Saya</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Informasi akun dan identitas Anda</p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <div className="relative">
              <img src="https://i.pravatar.cc/150?img=11" alt="Foto Profil" className="w-20 h-20 rounded-2xl border-2 object-cover" style={{ borderColor: '#f59e0b' }}/>
              <button type="button"
                onClick={() => showToast('info', 'Pilih foto baru', 'Fitur unggah foto akan segera tersedia.')}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                style={{ background: '#1e3a8a' }}
                title="Ganti foto profil">
                <Camera size={14}/>
              </button>
            </div>
            <div>
              <p className="font-black text-lg" style={{ color: '#0f172a' }}>{profile.name}</p>
              <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>{profile.role}</p>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full mt-2 inline-block"
                style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                ● Aktif & Terverifikasi
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Nama Lengkap', field: 'name', type: 'text', placeholder: 'Nama Anda' },
              { label: 'Alamat Email', field: 'email', type: 'email', placeholder: 'email@naxusa.com' },
              { label: 'Nomor HP', field: 'phone', type: 'tel', placeholder: '+62 ...' },
              { label: 'Jabatan', field: 'role', type: 'text', placeholder: 'cth. Manajer Operasional' },
              { label: 'Kota / Lokasi', field: 'location', type: 'text', placeholder: 'cth. Los Angeles, CA' },
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
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Bahasa</label>
              <select value={profile.language} onChange={e => setProfile(p => ({ ...p, language: e.target.value }))}
                className={inputClass} style={inputStyle}>
                <option>Bahasa Indonesia</option>
                <option>English</option>
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
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Pengaturan Notifikasi</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Pilih cara Anda ingin menerima pemberitahuan</p>
            </div>
          </div>
          <Toggle checked={notif.emailAlerts} onChange={() => setNotif(p => ({ ...p, emailAlerts: !p.emailAlerts }))} label="Notifikasi via Email" desc="Terima pemberitahuan ke kotak masuk email Anda"/>
          <Toggle checked={notif.smsAlerts} onChange={() => setNotif(p => ({ ...p, smsAlerts: !p.smsAlerts }))} label="Notifikasi via SMS" desc="Terima SMS untuk peringatan penting"/>
          <Toggle checked={notif.criticalOnly} onChange={() => setNotif(p => ({ ...p, criticalOnly: !p.criticalOnly }))} label="Hanya Notifikasi Kritis" desc="Abaikan info & pembaruan rutin"/>
          <Toggle checked={notif.weeklyReport} onChange={() => setNotif(p => ({ ...p, weeklyReport: !p.weeklyReport }))} label="Laporan Mingguan" desc="Ringkasan otomatis setiap Senin pagi"/>
          <Toggle checked={notif.shipmentUpdates} onChange={() => setNotif(p => ({ ...p, shipmentUpdates: !p.shipmentUpdates }))} label="Pembaruan Status Kiriman" desc="Notifikasi setiap kali status pengiriman berubah"/>
          <Toggle checked={notif.coldChainAlerts} onChange={() => setNotif(p => ({ ...p, coldChainAlerts: !p.coldChainAlerts }))} label="Alarm Suhu Cold Storage" desc="Peringatan saat suhu keluar dari batas aman"/>
          <Toggle checked={notif.customsAlerts} onChange={() => setNotif(p => ({ ...p, customsAlerts: !p.customsAlerts }))} label="Notifikasi Bea Cukai" desc="Pembaruan status izin masuk & pemeriksaan"/>
        </div>

        {/* System Config */}
        <div className="glass-card p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
              <Globe size={18}/>
            </div>
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Konfigurasi Tampilan</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Atur zona waktu dan satuan pengukuran</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Zona Waktu</label>
              <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
                className={inputClass} style={inputStyle}>
                {['America/Los_Angeles', 'America/New_York', 'Asia/Tokyo', 'Asia/Shanghai', 'Europe/London', 'Asia/Jakarta'].map(tz => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Satuan Suhu</label>
              <select className={inputClass} style={inputStyle}>
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Satuan Berat</label>
              <select className={inputClass} style={inputStyle}>
                <option>Kilogram (kg)</option>
                <option>Pound (lbs)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Mata Uang</label>
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
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Keamanan Akun</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Ganti kata sandi untuk menjaga akun Anda tetap aman</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Kata Sandi Saat Ini', span: 'sm:col-span-2' },
              { label: 'Kata Sandi Baru', span: '' },
              { label: 'Konfirmasi Kata Sandi Baru', span: '' },
            ].map(f => (
              <div key={f.label} className={f.span}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                <input type="password" placeholder="••••••••" className={inputClass} style={inputStyle}/>
              </div>
            ))}
          </div>
          <button type="button"
            onClick={() => showToast('info', 'Memverifikasi kata sandi...', 'Pastikan kata sandi baru minimal 8 karakter.')}
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-80"
            style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.15)' }}>
            Ganti Kata Sandi
          </button>
        </div>

        {/* Save */}
        <button type="submit"
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-black text-white transition-all hover:opacity-90"
          style={{
            background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #1e3a8a, #2a4db3)',
            boxShadow: saved ? '0 4px 15px rgba(16,185,129,0.35)' : '0 4px 15px rgba(30,58,138,0.35)',
          }}>
          {saved ? <><Check size={18}/> Tersimpan!</> : <><Save size={18}/> Simpan Semua Perubahan</>}
        </button>
      </form>
    </div>
  );
}
