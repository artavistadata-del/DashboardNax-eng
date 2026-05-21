'use client';

import { useState } from 'react';
import { AlertTriangle, Info, CheckCircle2, XCircle, Bell, BellOff, Filter } from 'lucide-react';
import { useToast } from './Toast';

type AlertSeverity = 'kritis' | 'peringatan' | 'info' | 'sukses';

interface AlertItem {
  id: number; severity: AlertSeverity; title: string; desc: string;
  time: string; category: string; read: boolean;
}

const initAlerts: AlertItem[] = [
  { id: 1, severity: 'kritis', title: 'Suhu Melebihi Batas — Ruang C2', desc: 'Ruang pendingin C2 melampaui batas suhu sebesar +1,9°C. Segera lakukan pengecekan.', time: '12 menit lalu', category: 'Cold Storage', read: false },
  { id: 2, severity: 'peringatan', title: 'Kiriman Ditahan FDA — NAX-20240503', desc: 'Kiriman dari Meksiko (Fresh Mart LA) ditahan untuk pemeriksaan FDA di Pelabuhan Long Beach.', time: '45 menit lalu', category: 'Bea Cukai', read: false },
  { id: 3, severity: 'peringatan', title: 'Deviasi Suhu — Ruang B1', desc: 'Ruang penyimpanan Wagyu B1 menunjukkan +1,8°C di atas setpoint. Sedang dipantau.', time: '1,5 jam lalu', category: 'Cold Storage', read: false },
  { id: 4, severity: 'info', title: 'Pesawat EK201 Berangkat dari NRT', desc: 'Kiriman NAX-20240501 (Tuna Bluefin, 420 kg) berangkat dari Bandara Narita sesuai jadwal.', time: '3 jam lalu', category: 'Pelacakan', read: true },
  { id: 5, severity: 'sukses', title: 'Bea Cukai Selesai — NAX-20240502', desc: 'Kiriman Wagyu (Pacific Wagyu Co.) lolos Bea Cukai AS. Siap dikirim ke tujuan.', time: '5 jam lalu', category: 'Bea Cukai', read: true },
  { id: 6, severity: 'info', title: 'Klien Baru Terdaftar', desc: 'Vietnam Seafood Export Ltd. berhasil didaftarkan sebagai klien baru.', time: '6 jam lalu', category: 'Klien', read: true },
  { id: 7, severity: 'sukses', title: 'Kiriman Diterima — NAX-20240506', desc: 'Manta Ray Sushi Group telah menerima kiriman laut 5.400 kg. Konfirmasi dari klien masuk.', time: '8 jam lalu', category: 'Pelacakan', read: true },
  { id: 8, severity: 'peringatan', title: 'ETA Terlambat — NAX-20240504', desc: 'Truk berpendingin pengangkut Bulu Babi (Blue Ocean Seafood) tertunda ~2 jam karena kemacetan.', time: '9 jam lalu', category: 'Pelacakan', read: true },
  { id: 9, severity: 'info', title: 'Siklus Pendinginan Ruang A1 Selesai', desc: 'Siklus re-icing penyimpanan Tuna Bluefin berhasil. Suhu stabil di -2°C.', time: '10 jam lalu', category: 'Cold Storage', read: true },
  { id: 10, severity: 'info', title: 'Laporan Bulanan Dibuat', desc: 'Laporan operasional April 2026 telah dibuat otomatis dan dikirim ke manajemen.', time: '1 hari lalu', category: 'Sistem', read: true },
];

const severityMeta: Record<AlertSeverity, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  kritis: { icon: <XCircle size={16} />, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Kritis' },
  peringatan: { icon: <AlertTriangle size={16} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Peringatan' },
  info: { icon: <Info size={16} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Informasi' },
  sukses: { icon: <CheckCircle2 size={16} />, color: '#10b981', bg: 'rgba(16,185,129,0.1)', label: 'Sukses' },
};

export default function AlertsView() {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>(initAlerts);
  const [filterSev, setFilterSev] = useState<AlertSeverity | 'Semua'>('Semua');
  const [filterCat, setFilterCat] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(alerts.map(a => a.category)))];

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    showToast('success', 'Semua notifikasi ditandai sudah dibaca');
  };
  const markRead = (id: number) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  const dismiss = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    showToast('info', 'Notifikasi dihapus');
  };

  const filtered = alerts.filter(a => {
    const matchSev = filterSev === 'Semua' || a.severity === filterSev;
    const matchCat = filterCat === 'Semua' || a.category === filterCat;
    return matchSev && matchCat;
  });

  const unread = alerts.filter(a => !a.read).length;

  return (
    // Memastikan w-full dan overflow teratasi agar tidak ada yang bocor di layar kecil
    <div className="w-full space-y-5 animate-fade-up overflow-x-hidden pb-4">

      {/* Summary pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
        {[
          { label: 'Kritis', count: alerts.filter(a => a.severity === 'kritis').length, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', desc: 'perlu tindakan segera' },
          { label: 'Peringatan', count: alerts.filter(a => a.severity === 'peringatan').length, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', desc: 'perlu perhatian' },
          { label: 'Informasi', count: alerts.filter(a => a.severity === 'info').length, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', desc: 'pembaruan sistem' },
          { label: 'Belum Dibaca', count: unread, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', desc: 'menunggu tinjauan' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-pointer hover:scale-[1.02] transition-transform w-full overflow-hidden"
            onClick={() => showToast('info', `${s.label}: ${s.count} notifikasi`)}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <Bell size={18} style={{ color: s.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider truncate" style={{ color: '#94a3b8' }}>{s.label}</p>
              <p className="text-xl sm:text-2xl font-black truncate" style={{ color: '#0f172a' }}>{s.count}</p>
              <p className="text-[10px] sm:text-xs font-medium truncate hidden sm:block" style={{ color: '#94a3b8' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="glass-card px-4 sm:px-5 py-4 flex flex-col gap-3 w-full overflow-x-auto">
        <div className="flex items-center gap-2 flex-wrap min-w-max md:min-w-0">
          <Filter size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider flex-shrink-0" style={{ color: '#94a3b8' }}>Tingkat:</span>
          {(['Semua', 'kritis', 'peringatan', 'info', 'sukses'] as const).map(s => {
            const meta = s !== 'Semua' ? severityMeta[s] : null;
            return (
              <button key={s} onClick={() => setFilterSev(s)}
                className="text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0"
                style={filterSev === s
                  ? { background: meta?.color ?? '#1e3a8a', color: 'white' }
                  : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                {s === 'Semua' ? 'Semua' : severityMeta[s].label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-wrap min-w-max md:min-w-0">
            <span className="text-xs font-bold flex-shrink-0" style={{ color: '#94a3b8' }}>Kategori:</span>
            {categories.map(c => (
              <button key={c} onClick={() => setFilterCat(c)}
                className="text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0"
                style={filterCat === c ? { background: '#1e3a8a', color: 'white' } : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                {c}
              </button>
            ))}
          </div>

          {/* Tombol mark read diatur agar responsif di bawah/samping */}
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 sm:py-1.5 rounded-lg transition-all sm:ml-auto w-full sm:w-auto"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
              <BellOff size={12} /> Tandai Semua Dibaca
            </button>
          )}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3 w-full">
        {filtered.map(a => {
          const meta = severityMeta[a.severity];
          return (
            <div key={a.id}
              className="glass-card px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-all duration-200 w-full"
              style={!a.read ? { border: `1px solid ${meta.color}30`, background: `${meta.color}04` } : {}}>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: meta.bg, color: meta.color }}>
                {meta.icon}
              </div>

              <div className="flex-1 min-w-0 w-full">
                {/* Header card dibuat wrap agar flexibel */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-black break-words" style={{ color: '#0f172a' }}>{a.title}</p>
                    {!a.read && (
                      <span className="text-xs font-black px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                        style={{ background: meta.color, fontSize: '9px' }}>BARU</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1 sm:mt-0">
                    <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{a.time}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                      {a.category}
                    </span>
                  </div>
                </div>

                {/* Deskripsi text break-words */}
                <p className="text-sm font-medium mt-1 leading-relaxed break-words" style={{ color: '#64748b' }}>{a.desc}</p>

                {/* Aksi tombol wrap */}
                <div className="flex items-center flex-wrap gap-3 mt-3">
                  {!a.read && (
                    <button onClick={() => { markRead(a.id); showToast('info', 'Notifikasi ditandai sudah dibaca'); }}
                      className="text-xs font-bold transition-all hover:opacity-70" style={{ color: '#1e3a8a' }}>
                      Tandai Sudah Dibaca
                    </button>
                  )}
                  <button onClick={() => dismiss(a.id)}
                    className="text-xs font-bold transition-all hover:opacity-70" style={{ color: '#94a3b8' }}>
                    Hapus
                  </button>
                  {a.severity === 'kritis' && (
                    <button onClick={() => showToast('warning', 'Menghubungi tim teknis...', 'Eskalasi telah dikirim ke supervisor on-duty.')}
                      className="text-xs font-bold transition-all hover:opacity-70" style={{ color: '#ef4444' }}>
                      Eskalasi Sekarang
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="glass-card p-12 text-center w-full">
            <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-400" />
            <p className="font-bold text-base" style={{ color: '#0f172a' }}>Semuanya beres! 🎉</p>
            <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Tidak ada notifikasi yang cocok dengan filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}