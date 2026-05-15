'use client';

import dynamic from 'next/dynamic';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AnalyticsView() {
  const revenueOption = {
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb', textStyle: { fontFamily: 'Inter', color: '#1e293b' } },
    legend: { bottom: 0, textStyle: { fontFamily: 'Inter', color: '#64748b', fontSize: 11 } },
    grid: { left: '2%', right: '2%', top: '10%', bottom: '18%', containLabel: true },
    xAxis: { type: 'category', data: months, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'dashed' } }, axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` } },
    color: ['#1e3a8a', '#f59e0b', '#10b981'],
    series: [
      { name: 'Air Freight', type: 'bar', stack: 'total', barWidth: '40%', data: [520, 610, 580, 720, 810, 760, 870, 920, 890, 1010, 980, 1100] },
      { name: 'Ocean Freight', type: 'bar', stack: 'total', barWidth: '40%', data: [380, 420, 460, 500, 540, 580, 620, 660, 700, 740, 780, 820] },
      { name: 'Cold Storage', type: 'bar', stack: 'total', barWidth: '40%', itemStyle: { borderRadius: [4, 4, 0, 0] }, data: [120, 130, 150, 180, 200, 190, 210, 220, 240, 250, 270, 290] },
    ],
  };

  const originPieOption = {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb', textStyle: { fontFamily: 'Inter' } },
    color: ['#1e3a8a', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'],
    series: [{
      type: 'pie', radius: ['45%', '72%'], center: ['50%', '55%'],
      label: { show: true, formatter: '{b}\n{d}%', fontSize: 11, fontFamily: 'Inter', color: '#475569' },
      data: [
        { name: 'Japan', value: 38 },
        { name: 'Mexico', value: 22 },
        { name: 'USA (West)', value: 18 },
        { name: 'China', value: 12 },
        { name: 'Thailand', value: 6 },
        { name: 'Vietnam', value: 4 },
      ]
    }]
  };

  const weightLine = {
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e5e7eb', textStyle: { fontFamily: 'Inter' } },
    grid: { left: '2%', right: '2%', top: '10%', bottom: '10%', containLabel: true },
    xAxis: { type: 'category', data: months, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'dashed' } }, axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `${(v / 1000).toFixed(0)}t` } },
    color: ['#10b981'],
    series: [{
      name: 'Total Weight', type: 'line', smooth: true, symbol: 'none',
      lineStyle: { width: 3 },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(16,185,129,0.2)' }, { offset: 1, color: 'rgba(16,185,129,0)' }] } },
      data: [14200, 16800, 15900, 19200, 22400, 21000, 24600, 26100, 25400, 28900, 27600, 31200]
    }]
  };

  const topClients = [
    { name: 'Manta Ray Sushi', revenue: '$612K', change: '+14%', up: true },
    { name: 'Tsukiji Fish Market', revenue: '$536K', change: '+8%', up: true },
    { name: 'Blue Ocean Seafood', revenue: '$478K', change: '+21%', up: true },
    { name: 'Pacific Wagyu Co.', revenue: '$389K', change: '+5%', up: true },
    { name: 'Fresh Mart LA', revenue: '$214K', change: '-3%', up: false },
  ];

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'YTD Revenue', value: '$14.2M', change: '+18.4% YoY', up: true, color: '#1e3a8a' },
          { label: 'Total Volume', value: '2,840 t', change: '+12.1% YoY', up: true, color: '#10b981' },
          { label: 'Avg. Freight Cost/kg', value: '$5.01', change: '-2.3% YoY', up: false, color: '#f59e0b' },
          { label: 'Customer Satisfaction', value: '4.8 / 5', change: '+0.2 pts', up: true, color: '#8b5cf6' },
        ].map((k, i) => (
          <div key={i} className="glass-card p-5">
            <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>{k.label}</p>
            <p className="text-2xl font-black" style={{ color: '#0f172a' }}>{k.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {k.up ? <TrendingUp size={12} className="text-emerald-500"/> : <TrendingDown size={12} className="text-red-400"/>}
              <span className={`text-xs font-bold ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Revenue by Service Type</h3>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>Monthly breakdown in USD (thousands)</p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', color: 'white', boxShadow: '0 2px 8px rgba(30,58,138,0.3)' }}>
            <Download size={12}/> Export PDF
          </button>
        </div>
        <ReactECharts option={revenueOption} style={{ height: 260 }}/>
      </div>

      {/* 2-col charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Origin pie */}
        <div className="glass-card p-6">
          <h3 className="font-black text-base mb-1" style={{ color: '#0f172a' }}>Shipments by Origin Country</h3>
          <p className="text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>Percentage of total volume</p>
          <ReactECharts option={originPieOption} style={{ height: 240 }}/>
        </div>

        {/* Weight trend */}
        <div className="glass-card p-6">
          <h3 className="font-black text-base mb-1" style={{ color: '#0f172a' }}>Monthly Cargo Volume</h3>
          <p className="text-xs font-medium mb-4" style={{ color: '#94a3b8' }}>Total metric tons handled per month</p>
          <ReactECharts option={weightLine} style={{ height: 200 }}/>
        </div>
      </div>

      {/* Top clients + Product breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Clients */}
        <div className="glass-card p-6">
          <h3 className="font-black text-base mb-4" style={{ color: '#0f172a' }}>Top 5 Clients by Revenue</h3>
          <div className="space-y-3">
            {topClients.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-black w-5 text-center" style={{ color: i < 3 ? '#f59e0b' : '#94a3b8' }}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{c.name}</span>
                    <span className="text-sm font-black" style={{ color: '#0f172a' }}>{c.revenue}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${80 - i * 14}%`, background: i < 3 ? '#1e3a8a' : '#94a3b8' }}/>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold" style={{ color: c.up ? '#10b981' : '#ef4444' }}>
                  {c.up ? <TrendingUp size={11}/> : <TrendingDown size={11}/>} {c.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product breakdown table */}
        <div className="glass-card p-6">
          <h3 className="font-black text-base mb-4" style={{ color: '#0f172a' }}>Product Category Performance</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {['Category', 'Volume', 'Revenue', 'Growth'].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 'Bluefin Tuna', vol: '486 t', rev: '$4.2M', grow: '+22%', up: true },
                { cat: 'Wagyu Beef', vol: '214 t', rev: '$2.8M', grow: '+31%', up: true },
                { cat: 'Sea Urchin', vol: '128 t', rev: '$2.1M', grow: '+18%', up: true },
                { cat: 'Fresh Produce', vol: '1,240 t', rev: '$3.1M', grow: '+9%', up: true },
                { cat: 'Other Seafood', vol: '772 t', rev: '$1.9M', grow: '-4%', up: false },
              ].map((r, i) => (
                <tr key={i} className="border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                  <td className="py-3 font-semibold text-xs" style={{ color: '#1e293b' }}>{r.cat}</td>
                  <td className="py-3 font-bold text-xs" style={{ color: '#475569' }}>{r.vol}</td>
                  <td className="py-3 font-black text-xs" style={{ color: '#0f172a' }}>{r.rev}</td>
                  <td className="py-3">
                    <span className={`text-xs font-black ${r.up ? 'text-emerald-600' : 'text-red-500'}`}>{r.grow}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
