'use client';

import { useState } from 'react';
import { MapPin, Plane, Ship, Truck, CheckCircle2, Circle, Clock, AlertTriangle, RefreshCw, Thermometer, Navigation } from 'lucide-react';
import { useToast } from './Toast';

const trackingData = [
  {
    awb: 'NAX-20240501', client: 'Tsukiji Fish Market', product: 'Tuna Bluefin — 420 kg',
    type: 'Udara — Segar', typeColor: '#1e3a8a',
    origin: 'Tokyo (NRT)', dest: 'Los Angeles (LAX)',
    eta: '2026-05-16 08:30', temp: '-2°C',
    currentLeg: 3,
    milestones: [
      { label: 'Pesanan Dikonfirmasi', loc: 'Tokyo, Jepang', time: '2026-05-14 09:00', done: true, alert: false },
      { label: 'Kargo Dikumpulkan & Didinginkan', loc: 'Cold Storage NRT', time: '2026-05-14 14:30', done: true, alert: false },
      { label: 'Berangkat dari NRT', loc: 'Bandara Narita', time: '2026-05-14 22:00', done: true, alert: false },
      { label: 'Sedang Terbang', loc: 'Jalur Udara Pasifik', time: '2026-05-15 02:00', done: false, alert: false },
      { label: 'Tiba di LAX', loc: 'Bandara Los Angeles', time: '2026-05-15 18:00', done: false, alert: false },
      { label: 'Pemeriksaan Bea Cukai', loc: 'LAX — CBP', time: '2026-05-15 20:00', done: false, alert: false },
      { label: 'Dikirim ke Klien', loc: 'Los Angeles, CA', time: '2026-05-16 08:30', done: false, alert: false },
    ],
  },
  {
    awb: 'NAX-20240503', client: 'Fresh Mart LA', product: 'Sayuran Segar — 3.800 kg',
    type: 'Kargo Laut', typeColor: '#f59e0b',
    origin: 'Mexico City (MEX)', dest: 'Los Angeles (LAX)',
    eta: '2026-05-18 15:00', temp: '4°C',
    currentLeg: 3,
    milestones: [
      { label: 'Pesanan Dikonfirmasi', loc: 'Mexico City, MX', time: '2026-05-10 10:00', done: true, alert: false },
      { label: 'Kargo Dimuat di Pelabuhan', loc: 'Pelabuhan Manzanillo', time: '2026-05-12 06:00', done: true, alert: false },
      { label: 'Kapal Berangkat', loc: 'Samudra Pasifik', time: '2026-05-12 18:00', done: true, alert: false },
      { label: 'Pemeriksaan FDA — Ditahan', loc: 'Pelabuhan Long Beach', time: '2026-05-15 10:00', done: false, alert: true },
      { label: 'Bea Cukai Dilepaskan', loc: 'Bea Cukai LA', time: '2026-05-17 12:00', done: false, alert: false },
      { label: 'Distribusi ke Gudang', loc: 'Gudang NAX — LA', time: '2026-05-18 09:00', done: false, alert: false },
      { label: 'Selesai Dikirim', loc: 'Los Angeles, CA', time: '2026-05-18 15:00', done: false, alert: false },
    ],
  },
  {
    awb: 'NAX-20240504', client: 'Blue Ocean Seafood', product: 'Bulu Babi (Uni) — 650 kg',
    type: 'Truk Berpendingin', typeColor: '#10b981',
    origin: 'Los Angeles (LAX)', dest: 'Newark (NWK)',
    eta: '2026-05-17 09:00', temp: '2°C',
    currentLeg: 1,
    milestones: [
      { label: 'Penjemputan Dijadwalkan', loc: 'Cold Storage LAX', time: '2026-05-15 08:00', done: true, alert: false },
      { label: 'Dalam Perjalanan — Hari 1', loc: 'I-40, Arizona', time: '2026-05-15 20:00', done: false, alert: false },
      { label: 'Dalam Perjalanan — Hari 2', loc: 'I-40, New Mexico', time: '2026-05-16 12:00', done: false, alert: false },
      { label: 'Dalam Perjalanan — Hari 3', loc: 'I-70, Kansas', time: '2026-05-17 06:00', done: false, alert: false },
      { label: 'Tiba di Depot', loc: 'Newark, NJ', time: '2026-05-17 09:00', done: false, alert: false },
    ],
  },
];

const typeIcon: Record<string, React.ReactNode> = {
  'Udara — Segar': <Plane size={14}/>,
  'Kargo Laut': <Ship size={14}/>,
  'Truk Berpendingin': <Truck size={14}/>,
};

export default function TrackingView() {
  const { showToast } = useToast();
  const [selected, setSelected] = useState(trackingData[0]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('success', 'Data berhasil diperbarui', 'Status pengiriman sudah disegarkan ke data terbaru.');
    }, 1200);
  };

  const progressPct = (selected.currentLeg / selected.milestones.length) * 100;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 animate-fade-up">

      {/* Left — Shipment List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: '#94a3b8' }}>Pengiriman Aktif</h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>
            {trackingData.length} kiriman
          </span>
        </div>
        {trackingData.map(s => (
          <button key={s.awb} onClick={() => setSelected(s)}
            className="w-full text-left glass-card p-4 transition-all duration-200 hover:scale-[1.01]"
            style={selected.awb === s.awb ? { border: '1px solid rgba(30,58,138,0.3)', background: 'rgba(30,58,138,0.05)' } : {}}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-black" style={{ color: '#1e3a8a' }}>{s.awb}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: '#0f172a' }}>{s.client}</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0"
                style={{ color: s.typeColor, background: `${s.typeColor}15` }}>
                {typeIcon[s.type]} {s.type}
              </span>
            </div>
            <p className="text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>{s.product}</p>
            <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: '#475569' }}>
              <Navigation size={11} className="text-amber-500" />
              {s.origin.split(' ')[0]} → {s.dest.split(' ')[0]}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Thermometer size={11} style={{ color: s.typeColor }} />
              <span className="text-xs font-bold" style={{ color: s.typeColor }}>{s.temp}</span>
              <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>Suhu kargo</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 w-full h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${(s.currentLeg / s.milestones.length) * 100}%`, background: s.typeColor }} />
            </div>
            <p className="text-xs font-medium mt-1" style={{ color: '#94a3b8' }}>
              Langkah {s.currentLeg} dari {s.milestones.length}
            </p>
          </button>
        ))}
      </div>

      {/* Right — Tracking Detail */}
      <div className="lg:col-span-2 space-y-5">

        {/* Header card */}
        <div className="glass-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>AWB</span>
                <span className="font-black" style={{ color: '#1e3a8a' }}>{selected.awb}</span>
              </div>
              <p className="text-xl font-black" style={{ color: '#0f172a' }}>{selected.client}</p>
              <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>{selected.product}</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-4 py-2.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Suhu</p>
                <p className="text-lg font-black" style={{ color: '#10b981' }}>{selected.temp}</p>
              </div>
              <div className="text-center px-4 py-2.5 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Tiba</p>
                <p className="text-xs font-black" style={{ color: '#f59e0b' }}>{selected.eta.split(' ')[0]}</p>
                <p className="text-xs font-bold" style={{ color: '#f59e0b' }}>{selected.eta.split(' ')[1]}</p>
              </div>
            </div>
          </div>

          {/* Progress summary */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold" style={{ color: '#64748b' }}>Progress Pengiriman</span>
              <span className="text-xs font-black" style={{ color: '#1e3a8a' }}>{Math.round(progressPct)}%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: selected.typeColor }} />
            </div>
          </div>

          {/* Route visual */}
          <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)' }}>
            <div className="text-center">
              <p className="text-lg font-black" style={{ color: '#0f172a' }}>{selected.origin.split(' ')[0]}</p>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{selected.origin}</p>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-0.5 rounded-full" style={{ background: `${selected.typeColor}40` }} />
              <span style={{ color: selected.typeColor }}>{typeIcon[selected.type]}</span>
              <div className="flex-1 h-0.5 rounded-full" style={{ background: `${selected.typeColor}40` }} />
            </div>
            <div className="text-center">
              <p className="text-lg font-black" style={{ color: '#0f172a' }}>{selected.dest.split(' ')[0]}</p>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{selected.dest}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Riwayat Perjalanan</h3>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Status terkini setiap tahap pengiriman</p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}>
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Memperbarui...' : 'Perbarui'}
            </button>
          </div>

          <div className="space-y-0">
            {selected.milestones.map((m, i) => {
              const isLast = i === selected.milestones.length - 1;
              const isCurrent = !m.done && (i === 0 || selected.milestones[i - 1]?.done);
              return (
                <div key={i} className="flex gap-4 group cursor-default">
                  {/* Left — icon column */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                      style={m.done
                        ? { background: '#10b981', color: 'white' }
                        : m.alert
                          ? { background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '2px solid #ef4444' }
                          : isCurrent
                            ? { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '2px solid #f59e0b' }
                            : { background: 'rgba(0,0,0,0.05)', color: '#94a3b8' }
                      }>
                      {m.done ? <CheckCircle2 size={16}/> : m.alert ? <AlertTriangle size={14}/> : isCurrent ? <Clock size={14}/> : <Circle size={14}/>}
                    </div>
                    {!isLast && <div className="w-0.5 flex-1 my-1 min-h-[28px]" style={{ background: m.done ? '#10b981' : 'rgba(0,0,0,0.08)' }} />}
                  </div>
                  {/* Right — content */}
                  <div className={`pb-5 flex-1 ${isLast ? 'pb-0' : ''}`}>
                    <div className="flex items-start justify-between flex-wrap gap-1">
                      <div>
                        <p className={`text-sm font-black ${!m.done && !m.alert && !isCurrent ? 'opacity-40' : ''}`}
                          style={{ color: m.done ? '#0f172a' : m.alert ? '#ef4444' : isCurrent ? '#f59e0b' : '#94a3b8' }}>
                          {m.label}
                          {m.alert && <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>⚠ Ditahan</span>}
                          {isCurrent && !m.alert && <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>● Aktif</span>}
                        </p>
                        <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>
                          <MapPin size={10} className="inline mr-1" />{m.loc}
                        </p>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: '#94a3b8' }}>{m.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
