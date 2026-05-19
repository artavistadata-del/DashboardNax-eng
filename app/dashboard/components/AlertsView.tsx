'use client';

import { useState } from 'react';
import { AlertTriangle, Info, CheckCircle2, XCircle, Bell, BellOff, Filter, RefreshCw } from 'lucide-react';
import { useToast } from './Toast';

type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

interface AlertItem {
  id: number; severity: AlertSeverity; title: string; desc: string;
  time: string; category: string; read: boolean;
}

const initAlerts: AlertItem[] = [
  { id: 1, severity: 'critical', title: 'Temperature Exceeded — Chamber C2', desc: 'Refrigeration chamber C2 exceeded temperature limit by +1.9°C. Immediate inspection required.', time: '12 mins ago', category: 'Cold Storage', read: false },
  { id: 2, severity: 'warning', title: 'Shipment on FDA Hold — NAX-20240503', desc: 'Shipment from Mexico (Fresh Mart LA) held for FDA inspection at Port of Long Beach.', time: '45 mins ago', category: 'Customs', read: false },
  { id: 3, severity: 'warning', title: 'Temperature Deviation — Chamber B1', desc: 'Wagyu storage chamber B1 showing +1.8°C above setpoint. Currently being monitored.', time: '1.5 hrs ago', category: 'Cold Storage', read: false },
  { id: 4, severity: 'info', title: 'Flight EK201 Departed from NRT', desc: 'Shipment NAX-20240501 (Bluefin Tuna, 420 kg) departed from Narita Airport on schedule.', time: '3 hrs ago', category: 'Tracking', read: true },
  { id: 5, severity: 'success', title: 'Customs Cleared — NAX-20240502', desc: 'Wagyu shipment (Pacific Wagyu Co.) cleared US Customs. Ready for final delivery.', time: '5 hrs ago', category: 'Customs', read: true },
  { id: 6, severity: 'info', title: 'New Client Registered', desc: 'Vietnam Seafood Export Ltd. has been successfully registered as a new client.', time: '6 hrs ago', category: 'Clients', read: true },
  { id: 7, severity: 'success', title: 'Shipment Received — NAX-20240506', desc: 'Manta Ray Sushi Group confirmed receipt of 5,400 kg ocean shipment. Client confirmation received.', time: '8 hrs ago', category: 'Tracking', read: true },
  { id: 8, severity: 'warning', title: 'ETA Delayed — NAX-20240504', desc: 'Reefer truck carrying Sea Urchin (Blue Ocean Seafood) delayed ~2 hours due to traffic.', time: '9 hrs ago', category: 'Tracking', read: true },
  { id: 9, severity: 'info', title: 'Chamber A1 Cooling Cycle Complete', desc: 'Bluefin Tuna re-icing cycle completed successfully. Temperature stable at -2°C.', time: '10 hrs ago', category: 'Cold Storage', read: true },
  { id: 10, severity: 'info', title: 'Monthly Report Generated', desc: 'April 2026 operations report has been automatically generated and sent to management.', time: '1 day ago', category: 'System', read: true },
];

const severityMeta: Record<AlertSeverity, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  critical: { icon: <XCircle size={16}/>,      color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   label: 'Critical' },
  warning:  { icon: <AlertTriangle size={16}/>, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  label: 'Warning' },
  info:     { icon: <Info size={16}/>,          color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  label: 'Info' },
  success:  { icon: <CheckCircle2 size={16}/>,  color: '#10b981', bg: 'rgba(16,185,129,0.1)',  label: 'Success' },
};

export default function AlertsView() {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>(initAlerts);
  const [filterSev, setFilterSev] = useState<AlertSeverity | 'All'>('All');
  const [filterCat, setFilterCat] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(alerts.map(a => a.category)))];

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    showToast('success', 'All notifications marked as read');
  };
  const markRead = (id: number) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  const dismiss = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    showToast('info', 'Notification dismissed');
  };

  const filtered = alerts.filter(a => {
    const matchSev = filterSev === 'All' || a.severity === filterSev;
    const matchCat = filterCat === 'All' || a.category === filterCat;
    return matchSev && matchCat;
  });

  const unread = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-5 animate-fade-up">

      {/* Summary pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', desc: 'requires immediate action' },
          { label: 'Warning', count: alerts.filter(a => a.severity === 'warning').length, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', desc: 'needs attention' },
          { label: 'Info', count: alerts.filter(a => a.severity === 'info').length, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', desc: 'system updates' },
          { label: 'Unread', count: unread, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', desc: 'pending review' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => showToast('info', `${s.label}: ${s.count} notifications`)}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <Bell size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{s.label}</p>
              <p className="text-2xl font-black" style={{ color: '#0f172a' }}>{s.count}</p>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="glass-card px-4 sm:px-5 py-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Severity:</span>
          {(['All', 'critical', 'warning', 'info', 'success'] as const).map(s => {
            const meta = s !== 'All' ? severityMeta[s] : null;
            return (
              <button key={s} onClick={() => setFilterSev(s)}
                className="text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all"
                style={filterSev === s
                  ? { background: meta?.color ?? '#1e3a8a', color: 'white' }
                  : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                {s === 'All' ? 'All' : severityMeta[s].label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold" style={{ color: '#94a3b8' }}>Category:</span>
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className="text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all"
              style={filterCat === c ? { background: '#1e3a8a', color: 'white' } : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
              {c}
            </button>
          ))}
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ml-auto"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
              <BellOff size={12} /> Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filtered.map(a => {
          const meta = severityMeta[a.severity];
          return (
            <div key={a.id}
              className="glass-card px-5 py-4 flex items-start gap-4 transition-all duration-200"
              style={!a.read ? { border: `1px solid ${meta.color}30`, background: `${meta.color}04` } : {}}>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: meta.bg, color: meta.color }}>
                {meta.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-black" style={{ color: '#0f172a' }}>{a.title}</p>
                    {!a.read && (
                      <span className="text-xs font-black px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                        style={{ background: meta.color, fontSize: '9px' }}>NEW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{a.time}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                      {a.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium mt-1" style={{ color: '#64748b' }}>{a.desc}</p>
                <div className="flex items-center gap-3 mt-3">
                  {!a.read && (
                    <button onClick={() => { markRead(a.id); showToast('info', 'Notification marked as read'); }}
                      className="text-xs font-bold transition-all hover:opacity-70" style={{ color: '#1e3a8a' }}>
                      Mark as Read
                    </button>
                  )}
                  <button onClick={() => dismiss(a.id)}
                    className="text-xs font-bold transition-all hover:opacity-70" style={{ color: '#94a3b8' }}>
                    Dismiss
                  </button>
                  {a.severity === 'critical' && (
                    <button onClick={() => showToast('warning', 'Contacting technical team...', 'Escalation sent to on-duty supervisor.')}
                      className="text-xs font-bold transition-all hover:opacity-70" style={{ color: '#ef4444' }}>
                      Escalate Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="glass-card p-12 text-center">
            <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-400" />
            <p className="font-bold text-base" style={{ color: '#0f172a' }}>All clear! 🎉</p>
            <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>No notifications match your current filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
