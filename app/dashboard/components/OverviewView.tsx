'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Package, TrendingUp, DollarSign, Clock, ArrowUpRight, ArrowDownRight,
  Plane, Ship, Truck, Fish, Beef, Apple, ExternalLink
} from 'lucide-react';
import { useToast } from './Toast';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const kpis = [
  { label: 'Active Shipments', value: '247', unit: 'orders', change: '+12%', up: true, icon: Package, color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)', desc: 'currently in transit' },
  { label: 'Total Cargo Weight', value: '184,320', unit: 'kg', change: '+8.4%', up: true, icon: TrendingUp, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', desc: 'this month' },
  { label: 'Estimated Revenue', value: '$2.31M', unit: 'USD', change: '+5.2%', up: true, icon: DollarSign, color: '#10b981', bg: 'rgba(16,185,129,0.08)', desc: 'May 2026' },
  { label: 'On-Time Delivery', value: '96.4', unit: '%', change: '-0.3%', up: false, icon: Clock, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', desc: 'success rate' },
];

const recentShipments = [
  { id: 'NAX-20240501', client: 'Tsukiji Fish Market', origin: 'NRT', dest: 'LAX', type: 'Air — Fresh', weight: 420, status: 'In Transit', statusColor: '#f59e0b', statusBg: 'rgba(245,158,11,0.1)' },
  { id: 'NAX-20240502', client: 'Pacific Wagyu Co.', origin: 'OSA', dest: 'LAX', type: 'Air — Fresh', weight: 180, status: 'Delivered', statusColor: '#10b981', statusBg: 'rgba(16,185,129,0.1)' },
  { id: 'NAX-20240503', client: 'Fresh Mart LA', origin: 'MEX', dest: 'LAX', type: 'Ocean — Cargo', weight: 3800, status: 'At Customs', statusColor: '#8b5cf6', statusBg: 'rgba(139,92,246,0.1)' },
  { id: 'NAX-20240504', client: 'Blue Ocean Seafood', origin: 'LAX', dest: 'NWK', type: 'Reefer Truck', weight: 650, status: 'In Transit', statusColor: '#f59e0b', statusBg: 'rgba(245,158,11,0.1)' },
  { id: 'NAX-20240505', client: 'SoCal Produce', origin: 'LAX', dest: 'NRT', type: 'Air — Cargo', weight: 2100, status: 'Processing', statusColor: '#64748b', statusBg: 'rgba(100,116,139,0.1)' },
  { id: 'NAX-20240506', client: 'Manta Ray Sushi', origin: 'LAX', dest: 'PEK', type: 'Ocean — Cargo', weight: 5400, status: 'Delivered', statusColor: '#10b981', statusBg: 'rgba(16,185,129,0.1)' },
];

const productCategories = [
  { label: 'Bluefin Tuna', pct: 34, color: '#1e3a8a' },
  { label: 'Sea Urchin (Uni)', pct: 22, color: '#3b82f6' },
  { label: 'Wagyu Beef', pct: 18, color: '#f59e0b' },
  { label: 'Fresh Produce', pct: 15, color: '#10b981' },
  { label: 'Other Seafood', pct: 11, color: '#8b5cf6' },
];

const chartData: Record<string, { air: number[]; ocean: number[] }> = {
  '1M': {
    air:   [750000, 820000, 780000, 910000, 870000, 980000, 1050000, 1100000, 1020000, 1130000, 1080000, 1200000].slice(-4),
    ocean: [520000, 540000, 580000, 620000, 640000, 680000, 720000, 760000, 780000, 810000, 830000, 860000].slice(-4),
  },
  '3M': {
    air:   [820000, 870000, 920000, 980000, 1010000, 1080000, 1100000, 1150000, 1200000, 1230000, 1280000, 1320000].slice(-12).slice(0, 3 * 4),
    ocean: [540000, 560000, 590000, 620000, 640000, 680000, 710000, 740000, 770000, 800000, 820000, 850000].slice(-12).slice(0, 3 * 4),
  },
  '1Y': {
    air:   [520000, 610000, 580000, 720000, 810000, 760000, 870000, 920000, 890000, 1010000, 980000, 1100000],
    ocean: [380000, 420000, 460000, 500000, 540000, 580000, 620000, 660000, 700000, 740000, 780000, 820000],
  },
};

const periodLabels: Record<string, string[]> = {
  '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  '3M': ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].slice(0, 12),
  '1Y': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export default function OverviewView() {
  const { showToast } = useToast();
  const [period, setPeriod] = useState<'1M' | '3M' | '1Y'>('1Y');
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const lineOption = {
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb', textStyle: { color: '#1e293b', fontFamily: 'Inter' } },
    legend: { show: true, bottom: 0, textStyle: { color: '#64748b', fontFamily: 'Inter', fontSize: 11 } },
    grid: { left: '3%', right: '3%', top: '10%', bottom: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: periodLabels[period],
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11, fontFamily: 'Inter' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'dashed' } },
      axisLabel: { color: '#94a3b8', fontSize: 11, fontFamily: 'Inter', formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` }
    },
    color: ['#1e3a8a', '#f59e0b'],
    series: [
      {
        name: 'Air', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { width: 2.5 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(30,58,138,0.15)' }, { offset: 1, color: 'rgba(30,58,138,0)' }] } },
        data: chartData[period].air
      },
      {
        name: 'Ocean', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        lineStyle: { width: 2.5 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(245,158,11,0.12)' }, { offset: 1, color: 'rgba(245,158,11,0)' }] } },
        data: chartData[period].ocean
      },
    ]
  };

  const pieOption = {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb', textStyle: { fontFamily: 'Inter' } },
    color: ['#1e3a8a', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
    series: [{
      type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'],
      label: { show: false },
      emphasis: { scale: true, scaleSize: 8 },
      data: productCategories.map(c => ({ name: c.label, value: c.pct }))
    }]
  };

  return (
    <div className="space-y-6 animate-fade-up">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i}
              className="glass-card p-5 flex flex-col gap-3 cursor-default animate-fade-up group hover:scale-[1.02] transition-transform"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{k.label}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#cbd5e1' }}>{k.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: k.bg }}>
                  <Icon size={18} style={{ color: k.color }} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black" style={{ color: '#0f172a' }}>
                  {k.value} <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>{k.unit}</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {k.up
                  ? <ArrowUpRight size={14} className="text-emerald-500" />
                  : <ArrowDownRight size={14} className="text-red-400" />}
                <span className={`text-xs font-bold ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>{k.change}</span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue Line Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Revenue Trend</h3>
              <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>Air vs Ocean freight revenue comparison (USD)</p>
            </div>
            <div className="flex gap-1.5">
              {(['1M', '3M', '1Y'] as const).map(t => (
                <button key={t}
                  onClick={() => { setPeriod(t); showToast('info', `Showing last ${t === '1M' ? '1 month' : t === '3M' ? '3 months' : '1 year'} data`); }}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                  style={period === t
                    ? { background: '#1e3a8a', color: 'white', boxShadow: '0 2px 8px rgba(30,58,138,0.3)' }
                    : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ReactECharts option={lineOption} style={{ height: 240 }} />
        </div>

        {/* Pie — Product Types */}
        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-black text-base mb-1" style={{ color: '#0f172a' }}>Product Types</h3>
          <p className="text-xs font-medium mb-4" style={{ color: '#94a3b8' }}>Cargo composition by product category</p>
          <ReactECharts option={pieOption} style={{ height: 160 }} />
          <div className="space-y-2 mt-3">
            {productCategories.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#475569' }}>
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  {c.label}
                </div>
                <span className="text-xs font-black" style={{ color: '#0f172a' }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transport Mode Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Air Freight', icon: <Plane size={18}/>, value: 89, count: 112, color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)', desc: 'active orders' },
          { label: 'Ocean Freight', icon: <Ship size={18}/>, value: 64, count: 87, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', desc: 'active orders' },
          { label: 'Reefer Truck', icon: <Truck size={18}/>, value: 42, count: 48, color: '#10b981', bg: 'rgba(16,185,129,0.08)', desc: 'active orders' },
        ].map((m, i) => (
          <div key={i}
            className="glass-card p-5 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => showToast('info', `${m.label}: ${m.count} active shipments, ${m.value}% capacity`)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                <span style={{ color: m.color }}>{m.icon}</span>
              </div>
              <div>
                <p className="text-sm font-black" style={{ color: '#0f172a' }}>{m.label}</p>
                <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{m.count} {m.desc}</p>
              </div>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${m.value}%`, background: m.color }} />
            </div>
            <p className="text-xs font-bold mt-1.5 text-right" style={{ color: m.color }}>{m.value}% capacity</p>
          </div>
        ))}
      </div>

      {/* Recent Shipments Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          <div>
            <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Recent Shipments</h3>
            <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Click a row to view details</p>
          </div>
          <span className="badge badge-blue">{recentShipments.length} records</span>
        </div>
        <div className="table-scroll-wrapper">
          <table className="w-full text-sm" style={{ minWidth: '600px' }}>
            <thead>
              <tr className="text-left border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {['Shipment ID', 'Client', 'Route', 'Type', 'Weight', 'Status'].map(h => (
                  <th key={h} className="px-6 py-3 text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentShipments.map((s, i) => (
                <tr key={i}
                  className="border-b transition-all cursor-pointer"
                  style={{
                    borderColor: 'rgba(0,0,0,0.04)',
                    background: selectedRow === s.id ? 'rgba(30,58,138,0.04)' : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedRow(selectedRow === s.id ? null : s.id);
                    showToast('info', `${s.id} — ${s.client}`, `${s.origin} → ${s.dest} · ${s.weight.toLocaleString()} kg · ${s.status}`);
                  }}>
                  <td className="px-6 py-3.5 font-black text-xs" style={{ color: '#1e3a8a' }}>{s.id}</td>
                  <td className="px-6 py-3.5 font-semibold" style={{ color: '#1e293b' }}>{s.client}</td>
                  <td className="px-6 py-3.5">
                    <span className="flex items-center gap-1.5 font-bold text-xs" style={{ color: '#475569' }}>
                      <span className="px-2 py-0.5 rounded bg-slate-100">{s.origin}</span>
                      →
                      <span className="px-2 py-0.5 rounded bg-slate-100">{s.dest}</span>
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-xs font-semibold" style={{ color: '#475569' }}>{s.type}</td>
                  <td className="px-6 py-3.5 font-bold" style={{ color: '#1e293b' }}>{s.weight.toLocaleString()} kg</td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"
                      style={{ background: s.statusBg, color: s.statusColor }}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: s.statusColor }} />
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t flex items-center justify-between" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Showing {recentShipments.length} recent shipments</p>
          <button
            className="flex items-center gap-1.5 text-xs font-bold transition-all hover:opacity-70"
            style={{ color: '#1e3a8a' }}
            onClick={() => showToast('info', 'Opening full shipment list...')}>
            View all <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
