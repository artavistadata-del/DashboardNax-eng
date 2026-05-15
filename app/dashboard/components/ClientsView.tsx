'use client';

import { Phone, Mail, Globe, MapPin, Package, TrendingUp, Star, Search } from 'lucide-react';
import { useState } from 'react';

const clients = [
  {
    id: 1, name: 'Tsukiji Fish Market Co.', country: 'Japan', flag: '🇯🇵', avatar: 'https://i.pravatar.cc/150?img=1',
    contact: 'Hiroshi Tanaka', phone: '+81 3-1234-5678', email: 'h.tanaka@tsukiji.co.jp',
    website: 'tsukiji.co.jp', type: 'Premium', orders: 148, weight: '42,800 kg', revenue: '$536K',
    products: ['Bluefin Tuna', 'Sea Urchin', 'Yellowtail'], rating: 5,
    location: 'Tokyo, Japan', since: '2018',
  },
  {
    id: 2, name: 'Pacific Wagyu Co.', country: 'Japan', flag: '🇯🇵', avatar: 'https://i.pravatar.cc/150?img=2',
    contact: 'Kenji Yamamoto', phone: '+81 6-2345-6789', email: 'k.yamamoto@pacificwagyu.jp',
    website: 'pacificwagyu.jp', type: 'VIP', orders: 94, weight: '18,600 kg', revenue: '$389K',
    products: ['Wagyu A5', 'Wagyu A4', 'Beef Cuts'], rating: 5,
    location: 'Osaka, Japan', since: '2019',
  },
  {
    id: 3, name: 'Fresh Mart LA', country: 'USA', flag: '🇺🇸', avatar: 'https://i.pravatar.cc/150?img=3',
    contact: 'Michael Chen', phone: '+1 213-555-0147', email: 'm.chen@freshmartla.com',
    website: 'freshmartla.com', type: 'Regular', orders: 62, weight: '95,200 kg', revenue: '$214K',
    products: ['Fresh Produce', 'Citrus', 'Berries'], rating: 4,
    location: 'Los Angeles, CA', since: '2021',
  },
  {
    id: 4, name: 'Blue Ocean Seafood', country: 'USA', flag: '🇺🇸', avatar: 'https://i.pravatar.cc/150?img=5',
    contact: 'Sarah Johnson', phone: '+1 310-555-0281', email: 's.johnson@blueocean.com',
    website: 'blueoceanseafood.com', type: 'Premium', orders: 113, weight: '31,500 kg', revenue: '$478K',
    products: ['Sea Urchin', 'Dungeness Crab', 'Salmon'], rating: 5,
    location: 'Los Angeles, CA', since: '2020',
  },
  {
    id: 5, name: 'Manta Ray Sushi Group', country: 'China', flag: '🇨🇳', avatar: 'https://i.pravatar.cc/150?img=7',
    contact: 'Wei Zhang', phone: '+86 10-8888-1234', email: 'w.zhang@mantaraysushi.cn',
    website: 'mantaraysushi.cn', type: 'VIP', orders: 87, weight: '28,400 kg', revenue: '$612K',
    products: ['Bluefin Tuna', 'Salmon', 'Hamachi'], rating: 5,
    location: 'Beijing, China', since: '2017',
  },
  {
    id: 6, name: 'SoCal Produce Inc.', country: 'USA', flag: '🇺🇸', avatar: 'https://i.pravatar.cc/150?img=9',
    contact: 'Carlos Rivera', phone: '+1 619-555-0382', email: 'c.rivera@socalp.com',
    website: 'socalproduceinc.com', type: 'Regular', orders: 45, weight: '120,000 kg', revenue: '$178K',
    products: ['Avocado', 'Strawberry', 'Tomato'], rating: 4,
    location: 'San Diego, CA', since: '2022',
  },
];

const typeMeta: Record<string, { color: string; bg: string }> = {
  VIP:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  Premium: { color: '#1e3a8a', bg: 'rgba(30,58,138,0.1)' },
  Regular: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
};

export default function ClientsView() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'VIP' | 'Premium' | 'Regular'>('All');
  const [selected, setSelected] = useState<typeof clients[0] | null>(null);

  const filtered = clients.filter(c => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Clients', value: clients.length, unit: 'accounts', color: '#1e3a8a' },
          { label: 'VIP Clients', value: clients.filter(c => c.type === 'VIP').length, unit: 'accounts', color: '#f59e0b' },
          { label: 'Total Orders', value: clients.reduce((s, c) => s + c.orders, 0), unit: 'shipments', color: '#10b981' },
          { label: 'Countries', value: [...new Set(clients.map(c => c.country))].length, unit: 'regions', color: '#8b5cf6' },
        ].map((k, i) => (
          <div key={i} className="glass-card p-5">
            <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>{k.label}</p>
            <p className="text-3xl font-black" style={{ color: '#0f172a' }}>{k.value} <span className="text-sm font-semibold" style={{ color: '#94a3b8' }}>{k.unit}</span></p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="glass-card px-5 py-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client or country..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-semibold outline-none"
            style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', color: '#1e293b' }}/>
        </div>
        {(['All', 'VIP', 'Premium', 'Regular'] as const).map(t => (
          <button key={t} onClick={() => setFilterType(t)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={filterType === t ? { background: '#1e3a8a', color: 'white' } : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(c => {
          const tm = typeMeta[c.type];
          return (
            <div key={c.id} onClick={() => setSelected(c === selected ? null : c)}
              className="glass-card p-5 cursor-pointer transition-all duration-200"
              style={selected?.id === c.id ? { border: '1px solid rgba(30,58,138,0.3)', background: 'rgba(30,58,138,0.04)' } : {}}>

              {/* Top row */}
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-2xl object-cover border-2" style={{ borderColor: 'rgba(255,255,255,0.8)' }}/>
                  <span className="absolute -bottom-1 -right-1 text-base">{c.flag}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-sm truncate" style={{ color: '#0f172a' }}>{c.name}</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: tm.color, background: tm.bg }}>
                      {c.type}
                    </span>
                  </div>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{c.location}</p>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} fill={i < c.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: <Package size={12}/>, label: 'Orders', value: c.orders },
                  { icon: <TrendingUp size={12}/>, label: 'Volume', value: c.weight },
                  { icon: <Globe size={12}/>, label: 'Revenue', value: c.revenue },
                ].map((s, i) => (
                  <div key={i} className="text-center p-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <span className="text-slate-400">{s.icon}</span>
                    <p className="text-xs font-black mt-0.5" style={{ color: '#0f172a' }}>{s.value}</p>
                    <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Products */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.products.map(p => (
                  <span key={p} className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: 'rgba(30,58,138,0.07)', color: '#1e3a8a' }}>
                    {p}
                  </span>
                ))}
              </div>

              {/* Contacts */}
              <div className="space-y-1.5 pt-3 border-t" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {[
                  { icon: <Phone size={11}/>, text: c.phone },
                  { icon: <Mail size={11}/>, text: c.email },
                ].map((ct, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium" style={{ color: '#64748b' }}>
                    <span className="text-slate-400">{ct.icon}</span> {ct.text}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs font-medium" style={{ color: '#64748b' }}>
                  <Globe size={11} className="text-slate-400"/> {c.website}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>No clients found matching your filter.</p>
        </div>
      )}
    </div>
  );
}
