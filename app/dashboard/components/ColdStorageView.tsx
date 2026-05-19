'use client';

import { useState } from 'react';
import { Thermometer, Droplets, Zap, AlertTriangle, CheckCircle2, Clock, Package, Bell } from 'lucide-react';
import { useToast } from './Toast';

const chambers = [
  { id: 'A1', name: 'Chamber A1 — Bluefin Tuna', setTemp: -2, currTemp: -1.8, humidity: 85, capacity: 78, maxCap: 5000, currCap: 3900, status: 'Normal', product: 'Bluefin Tuna / Sea Urchin', location: 'Building A, Floor 1' },
  { id: 'A2', name: 'Chamber A2 — Mixed Seafood', setTemp: 0, currTemp: 0.5, humidity: 82, capacity: 62, maxCap: 4000, currCap: 2480, status: 'Normal', product: 'Mixed Seafood / Shellfish', location: 'Building A, Floor 2' },
  { id: 'B1', name: 'Chamber B1 — Wagyu Beef', setTemp: 2, currTemp: 3.8, humidity: 75, capacity: 45, maxCap: 6000, currCap: 2700, status: 'Warning', product: 'Wagyu Beef / Meat Products', location: 'Building B, Floor 1' },
  { id: 'B2', name: 'Chamber B2 — Fresh Produce', setTemp: 4, currTemp: 4.2, humidity: 90, capacity: 88, maxCap: 8000, currCap: 7040, status: 'Normal', product: 'Fresh Fruits & Vegetables', location: 'Building B, Floor 2' },
  { id: 'C1', name: 'Chamber C1 — Frozen Storage', setTemp: -18, currTemp: -18.5, humidity: 60, capacity: 55, maxCap: 10000, currCap: 5500, status: 'Normal', product: 'Frozen Seafood / IQF', location: 'Building C, Floor 1' },
  { id: 'C2', name: 'Chamber C2 — Import Quarantine', setTemp: 1, currTemp: 2.9, humidity: 80, capacity: 30, maxCap: 3000, currCap: 900, status: 'Critical', product: 'Import Quarantine Cargo', location: 'Building C, Floor 2' },
];

const statusMeta = {
  'Normal':   { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  icon: <CheckCircle2 size={14}/>, label: 'Normal' },
  'Warning':  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: <AlertTriangle size={14}/>, label: 'Warning' },
  'Critical': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   icon: <AlertTriangle size={14}/>, label: 'Critical' },
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
  const { showToast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const total = chambers.reduce((s, c) => s + c.currCap, 0);
  const maxTotal = chambers.reduce((s, c) => s + c.maxCap, 0);
  const alertCount = chambers.filter(c => c.status !== 'Normal').length;

  return (
    <div className="space-y-5 animate-fade-up">

      {/* Summary KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Capacity', value: `${maxTotal.toLocaleString()} kg`, icon: <Package size={16}/>, color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)', desc: 'maximum capacity' },
          { label: 'Stored Inventory', value: `${total.toLocaleString()} kg`, icon: <Thermometer size={16}/>, color: '#10b981', bg: 'rgba(16,185,129,0.08)', desc: 'currently stored' },
          { label: 'Active Chambers', value: `${chambers.length}`, icon: <Zap size={16}/>, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', desc: 'in operation' },
          { label: 'Needs Attention', value: `${alertCount}`, icon: <AlertTriangle size={16}/>, color: alertCount > 0 ? '#ef4444' : '#10b981', bg: alertCount > 0 ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)', desc: alertCount > 0 ? 'check immediately' : 'all normal' },
        ].map((k, i) => (
          <div key={i} className="glass-card p-4 sm:p-5 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => showToast('info', k.label, `${k.value} — ${k.desc}`)}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{k.label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: k.bg, color: k.color }}>{k.icon}</div>
            </div>
            <p className="text-xl sm:text-2xl font-black" style={{ color: '#0f172a' }}>{k.value}</p>
            <p className="text-xs font-medium mt-1" style={{ color: '#94a3b8' }}>{k.desc}</p>
          </div>
        ))}
      </div>

      {/* Chambers Grid */}
      <div className="flex items-center justify-between">
        <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: '#94a3b8' }}>Cold Storage Chambers</h3>
        <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>Click a chamber to view details</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {chambers.map(c => {
          const st = statusMeta[c.status as keyof typeof statusMeta];
          const capPct = Math.round((c.currCap / c.maxCap) * 100);
          const capColor = capPct > 85 ? '#ef4444' : capPct > 65 ? '#f59e0b' : '#10b981';
          const isExpanded = expandedId === c.id;

          return (
            <div key={c.id}
              className="glass-card p-5 flex flex-col gap-4 cursor-pointer transition-all hover:scale-[1.01]"
              style={c.status !== 'Normal' ? { border: `1px solid ${st.color}30` } : {}}
              onClick={() => setExpandedId(isExpanded ? null : c.id)}>

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md" style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>{c.id}</span>
                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color }}>
                      {st.icon} {st.label}
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
                      <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#64748b' }}><Droplets size={11}/>Humidity</span>
                      <span className="text-xs font-black" style={{ color: '#0f172a' }}>{c.humidity}%</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                      <div className="h-full rounded-full" style={{ width: `${c.humidity}%`, background: '#3b82f6' }}/>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#64748b' }}><Package size={11}/>Capacity</span>
                      <span className="text-xs font-black" style={{ color: '#0f172a' }}>{capPct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${capPct}%`, background: capColor }}/>
                    </div>
                    <p className="text-xs font-medium mt-1" style={{ color: '#94a3b8' }}>{c.currCap.toLocaleString()} / {c.maxCap.toLocaleString()} kg</p>
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="text-xs font-medium px-3 py-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.03)', color: '#64748b' }}>
                <span className="font-bold" style={{ color: '#475569' }}>Current Stock:</span> {c.product}
              </div>

              {/* Alert banner */}
              {c.status !== 'Normal' && (
                <div className="flex items-start justify-between gap-2 text-xs font-bold px-3 py-2 rounded-lg" style={{ background: st.bg, color: st.color }}>
                  <span className="flex items-center gap-1.5">
                    {st.icon}
                    {c.status === 'Warning'
                      ? `Temperature exceeded setpoint by ${Math.abs(c.currTemp - c.setTemp).toFixed(1)}°C`
                      : 'Critical — Immediate inspection required'}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); showToast('warning', `Alert sent for Chamber ${c.id}`, 'Technician team has been notified and is on the way.'); }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg font-black flex-shrink-0 hover:opacity-80 transition-opacity"
                    style={{ background: `${st.color}20`, border: `1px solid ${st.color}30` }}>
                    <Bell size={10}/> Send Alert
                  </button>
                </div>
              )}

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t pt-3 space-y-2 animate-fade-up" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                  <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>Temperature History (Last 24 hours)</p>
                  <div className="flex gap-1.5">
                    {[...Array(24)].map((_, i) => {
                      const variation = (Math.random() - 0.5) * 2;
                      const temp = c.currTemp + variation;
                      const isOk = Math.abs(temp - c.setTemp) <= 1;
                      return (
                        <div key={i} className="flex-1 rounded-sm" title={`${temp.toFixed(1)}°C`}
                          style={{ height: `${20 + Math.abs(variation) * 10}px`, background: isOk ? '#10b981' : '#f59e0b', opacity: 0.6 + i * 0.016 }}/>
                      );
                    })}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); showToast('info', `Chamber ${c.id} report is being prepared`, 'File will download in a few seconds.'); }}
                    className="w-full py-2 rounded-lg text-xs font-bold transition-all hover:opacity-80"
                    style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}>
                    Download Temperature Report
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sensor Log */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Recent Sensor Log</h3>
          <button
            onClick={() => showToast('info', 'Loading full log...', '30-day history is being prepared.')}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}>
            View All Logs
          </button>
        </div>
        <div className="space-y-2">
          {[
            { time: '12:45:02', chamber: 'C2', event: 'Temperature exceeded limit (+1.9°C above setpoint)', type: 'critical' },
            { time: '12:30:18', chamber: 'B1', event: 'Temperature deviation detected (+1.8°C above setpoint)', type: 'warning' },
            { time: '11:55:00', chamber: 'A1', event: 'Re-icing cycle completed successfully', type: 'info' },
            { time: '10:20:44', chamber: 'B2', event: 'New cargo received — 840 kg fresh produce', type: 'info' },
            { time: '09:15:30', chamber: 'C1', event: 'Defrost cycle started and completed successfully', type: 'info' },
          ].map((ev, i) => (
            <div key={i} className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm py-2.5 border-b cursor-pointer hover:bg-slate-50/50 rounded-lg px-2 transition-colors"
              style={{ borderColor: 'rgba(0,0,0,0.05)' }}
              onClick={() => showToast(ev.type === 'critical' ? 'error' : ev.type === 'warning' ? 'warning' : 'info', `Chamber ${ev.chamber} — ${ev.time}`, ev.event)}>
              <span className="text-xs font-mono font-bold flex-shrink-0" style={{ color: '#94a3b8' }}>{ev.time}</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: 'rgba(30,58,138,0.1)', color: '#1e3a8a' }}>{ev.chamber}</span>
              <span className="flex-1 min-w-0 font-medium text-xs sm:text-sm" style={{ color: ev.type === 'critical' ? '#ef4444' : ev.type === 'warning' ? '#f59e0b' : '#475569' }}>
                {ev.event}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
