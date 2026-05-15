'use client';

import { Thermometer, Droplets, Zap, AlertTriangle, CheckCircle2, Clock, Package } from 'lucide-react';

const chambers = [
  {
    id: 'A1', name: 'Chamber A1 — Bluefin Tuna', setTemp: -2, currTemp: -1.8, humidity: 85, capacity: 78, maxCap: 5000, currCap: 3900, status: 'Normal', product: 'Bluefin Tuna / Sea Urchin', location: 'Building A, Floor 1',
  },
  {
    id: 'A2', name: 'Chamber A2 — Seafood Mixed', setTemp: 0, currTemp: 0.5, humidity: 82, capacity: 62, maxCap: 4000, currCap: 2480, status: 'Normal', product: 'Mixed Seafood / Shellfish', location: 'Building A, Floor 2',
  },
  {
    id: 'B1', name: 'Chamber B1 — Wagyu Beef', setTemp: 2, currTemp: 3.8, humidity: 75, capacity: 45, maxCap: 6000, currCap: 2700, status: 'Warning', product: 'Wagyu Beef / Meat Products', location: 'Building B, Floor 1',
  },
  {
    id: 'B2', name: 'Chamber B2 — Fresh Produce', setTemp: 4, currTemp: 4.2, humidity: 90, capacity: 88, maxCap: 8000, currCap: 7040, status: 'Normal', product: 'Fresh Fruits & Vegetables', location: 'Building B, Floor 2',
  },
  {
    id: 'C1', name: 'Chamber C1 — Frozen Storage', setTemp: -18, currTemp: -18.5, humidity: 60, capacity: 55, maxCap: 10000, currCap: 5500, status: 'Normal', product: 'Frozen Seafood / IQF', location: 'Building C, Floor 1',
  },
  {
    id: 'C2', name: 'Chamber C2 — Import Holding', setTemp: 1, currTemp: 2.9, humidity: 80, capacity: 30, maxCap: 3000, currCap: 900, status: 'Critical', product: 'Import Quarantine Hold', location: 'Building C, Floor 2',
  },
];

const statusMeta = {
  Normal:   { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  icon: <CheckCircle2 size={14}/> },
  Warning:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: <AlertTriangle size={14}/> },
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   icon: <AlertTriangle size={14}/> },
};

function TempGauge({ setTemp, currTemp }: { setTemp: number; currTemp: number }) {
  const diff = Math.abs(currTemp - setTemp);
  const color = diff <= 1 ? '#10b981' : diff <= 2 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8"/>
          <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${188.5 * Math.min(1, (1 - diff / 10))} 188.5`}
            strokeLinecap="round" style={{ transition: 'all 1s ease' }}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Thermometer size={12} style={{ color }}/>
          <p className="text-sm font-black leading-none" style={{ color }}>{currTemp}°</p>
        </div>
      </div>
      <p className="text-xs font-semibold mt-1" style={{ color: '#94a3b8' }}>Set: {setTemp}°C</p>
    </div>
  );
}

export default function ColdStorageView() {
  const total = chambers.reduce((s, c) => s + c.currCap, 0);
  const maxTotal = chambers.reduce((s, c) => s + c.maxCap, 0);
  const alertCount = chambers.filter(c => c.status !== 'Normal').length;

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Summary KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Capacity', value: `${maxTotal.toLocaleString()} kg`, icon: <Package size={16}/>, color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)' },
          { label: 'Currently Stored', value: `${total.toLocaleString()} kg`, icon: <Thermometer size={16}/>, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Active Chambers', value: `${chambers.length}`, icon: <Zap size={16}/>, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Active Alerts', value: `${alertCount}`, icon: <AlertTriangle size={16}/>, color: alertCount > 0 ? '#ef4444' : '#10b981', bg: alertCount > 0 ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)' },
        ].map((k, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{k.label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: k.bg, color: k.color }}>{k.icon}</div>
            </div>
            <p className="text-2xl font-black" style={{ color: '#0f172a' }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Chambers Grid */}
      <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: '#94a3b8' }}>Storage Chambers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {chambers.map(c => {
          const st = statusMeta[c.status as keyof typeof statusMeta];
          const capPct = Math.round((c.currCap / c.maxCap) * 100);
          const capColor = capPct > 85 ? '#ef4444' : capPct > 65 ? '#f59e0b' : '#10b981';

          return (
            <div key={c.id} className="glass-card p-5 flex flex-col gap-4"
              style={c.status !== 'Normal' ? { border: `1px solid ${st.color}30` } : {}}>

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md" style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>
                      {c.id}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color }}>
                      {st.icon} {c.status}
                    </span>
                  </div>
                  <p className="text-sm font-black" style={{ color: '#0f172a' }}>{c.name}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{c.location}</p>
                </div>
              </div>

              {/* Temp Gauge + Humidity */}
              <div className="flex items-center gap-4">
                <TempGauge setTemp={c.setTemp} currTemp={c.currTemp}/>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#64748b' }}>
                        <Droplets size={11}/> Humidity
                      </span>
                      <span className="text-xs font-black" style={{ color: '#0f172a' }}>{c.humidity}%</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                      <div className="h-full rounded-full" style={{ width: `${c.humidity}%`, background: '#3b82f6' }}/>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#64748b' }}>
                        <Package size={11}/> Capacity
                      </span>
                      <span className="text-xs font-black" style={{ color: '#0f172a' }}>{capPct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${capPct}%`, background: capColor }}/>
                    </div>
                    <p className="text-xs font-medium mt-1" style={{ color: '#94a3b8' }}>
                      {c.currCap.toLocaleString()} / {c.maxCap.toLocaleString()} kg
                    </p>
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="text-xs font-medium px-3 py-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.03)', color: '#64748b' }}>
                <span className="font-bold" style={{ color: '#475569' }}>Current Stock:</span> {c.product}
              </div>

              {/* Alert banner */}
              {c.status !== 'Normal' && (
                <div className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg" style={{ background: st.bg, color: st.color }}>
                  {st.icon}
                  {c.status === 'Warning' ? `Temperature deviation: ${Math.abs(c.currTemp - c.setTemp).toFixed(1)}°C above setpoint` : 'Critical: Immediate inspection required'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sensor Log */}
      <div className="glass-card p-6">
        <h3 className="font-black text-base mb-4" style={{ color: '#0f172a' }}>Recent Sensor Events</h3>
        <div className="space-y-2">
          {[
            { time: '12:45:02', chamber: 'C2', event: 'Temperature exceeded threshold (+1.9°C above set)', type: 'critical' },
            { time: '12:30:18', chamber: 'B1', event: 'Temperature deviation detected (+1.8°C above set)', type: 'warning' },
            { time: '11:55:00', chamber: 'A1', event: 'Re-icing cycle completed successfully', type: 'info' },
            { time: '10:20:44', chamber: 'B2', event: 'New cargo loaded — 840 kg fresh produce', type: 'info' },
            { time: '09:15:30', chamber: 'C1', event: 'Defrost cycle initiated and completed', type: 'info' },
          ].map((ev, i) => (
            <div key={i} className="flex items-center gap-4 text-sm py-2 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
              <span className="text-xs font-mono font-bold flex-shrink-0" style={{ color: '#94a3b8' }}>{ev.time}</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-md flex-shrink-0"
                style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>{ev.chamber}</span>
              <span className="flex-1 font-medium" style={{ color: ev.type === 'critical' ? '#ef4444' : ev.type === 'warning' ? '#f59e0b' : '#475569' }}>
                {ev.event}
              </span>
              <Clock size={12} style={{ color: '#94a3b8' }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
