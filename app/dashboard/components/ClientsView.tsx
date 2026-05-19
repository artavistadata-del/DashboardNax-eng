'use client';

import { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, MapPin, Package, Star, X, TrendingUp, Filter } from 'lucide-react';
import { useToast } from './Toast';

interface Client {
  id: number; name: string; contact: string; email: string; phone: string;
  country: string; type: 'Premium' | 'Regular' | 'New'; totalShipments: number;
  totalRevenue: string; lastShipment: string; rating: number; avatar: string;
  products: string[]; status: 'Active' | 'Inactive';
}

const initClients: Client[] = [
  { id: 1, name: 'Tsukiji Fish Market', contact: 'Hiroshi Tanaka', email: 'hiroshi@tsukiji.co.jp', phone: '+81-3-3541-1900', country: '🇯🇵 Japan', type: 'Premium', totalShipments: 142, totalRevenue: '$536K', lastShipment: '2026-05-14', rating: 5.0, avatar: 'https://i.pravatar.cc/60?img=3', products: ['Bluefin Tuna', 'Sea Urchin (Uni)', 'Premium Salmon'], status: 'Active' },
  { id: 2, name: 'Pacific Wagyu Co.', contact: 'Kenji Yamamoto', email: 'kenji@pacificwagyu.com', phone: '+81-6-6345-8800', country: '🇯🇵 Japan', type: 'Premium', totalShipments: 98, totalRevenue: '$389K', lastShipment: '2026-05-13', rating: 4.8, avatar: 'https://i.pravatar.cc/60?img=4', products: ['A5 Wagyu Beef', 'Premium Steak'], status: 'Active' },
  { id: 3, name: 'Blue Ocean Seafood', contact: 'Sarah Chen', email: 'sarah@blueocean.com', phone: '+1-213-555-0182', country: '🇺🇸 USA', type: 'Premium', totalShipments: 76, totalRevenue: '$478K', lastShipment: '2026-05-11', rating: 4.9, avatar: 'https://i.pravatar.cc/60?img=5', products: ['Sea Urchin', 'King Crab', 'Shrimp'], status: 'Active' },
  { id: 4, name: 'Fresh Mart LA', contact: 'Maria Gonzalez', email: 'maria@freshmart.com', phone: '+1-310-555-0291', country: '🇺🇸 USA', type: 'Regular', totalShipments: 54, totalRevenue: '$214K', lastShipment: '2026-05-12', rating: 4.2, avatar: 'https://i.pravatar.cc/60?img=6', products: ['Fresh Produce', 'Imported Fruits'], status: 'Active' },
  { id: 5, name: 'Manta Ray Sushi', contact: 'Kevin Park', email: 'kevin@mantaray.com', phone: '+1-212-555-0344', country: '🇺🇸 USA', type: 'Premium', totalShipments: 112, totalRevenue: '$612K', lastShipment: '2026-05-09', rating: 5.0, avatar: 'https://i.pravatar.cc/60?img=7', products: ['Bluefin Tuna', 'Sea Urchin', 'Salmon', 'Shellfish'], status: 'Active' },
  { id: 6, name: 'SoCal Produce Inc.', contact: 'David Miller', email: 'david@socalproc.com', phone: '+1-760-555-0178', country: '🇺🇸 USA', type: 'Regular', totalShipments: 31, totalRevenue: '$89K', lastShipment: '2026-05-10', rating: 3.9, avatar: 'https://i.pravatar.cc/60?img=8', products: ['Organic Produce', 'Grains'], status: 'Active' },
  { id: 7, name: 'Japan Premium Beef', contact: 'Yuki Sato', email: 'yuki@jpbeef.co.jp', phone: '+81-3-6789-4200', country: '🇯🇵 Japan', type: 'Regular', totalShipments: 24, totalRevenue: '$134K', lastShipment: '2026-05-07', rating: 4.5, avatar: 'https://i.pravatar.cc/60?img=9', products: ['Wagyu Beef', 'Premium Offcuts'], status: 'Active' },
  { id: 8, name: 'Vietnam Seafood Export', contact: 'Nguyen Van Long', email: 'long@vietseafood.vn', phone: '+84-28-3812-7777', country: '🇻🇳 Vietnam', type: 'New', totalShipments: 3, totalRevenue: '$18K', lastShipment: '2026-05-05', rating: 4.0, avatar: 'https://i.pravatar.cc/60?img=10', products: ['Vannamei Shrimp', 'Pangasius'], status: 'Active' },
];

const typeMeta = {
  'Premium': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'Regular': { color: '#1e3a8a', bg: 'rgba(30,58,138,0.1)' },
  'New':     { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={11} fill={i < Math.floor(rating) ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5"/>
      ))}
      <span className="text-xs font-bold ml-1" style={{ color: '#f59e0b' }}>{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ClientsView() {
  const { showToast } = useToast();
  const [clients, setClients] = useState<Client[]>(initClients);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = clients.filter(c => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-5 animate-fade-up">

      {/* Detail Side Panel */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.3)' }} onClick={() => setSelected(null)}/>
          <div className="fixed right-0 top-0 h-full z-50 w-full max-w-sm shadow-2xl overflow-y-auto animate-slide-left"
            style={{ background: 'rgba(238,242,248,0.98)', backdropFilter: 'blur(24px)' }}>
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Client Details</h3>
                <button onClick={() => setSelected(null)}
                  className="p-2 rounded-xl hover:bg-slate-200/50 transition-colors">
                  <X size={18} style={{ color: '#64748b' }}/>
                </button>
              </div>

              {/* Client card */}
              <div className="glass-card p-5 mb-5">
                <div className="flex items-center gap-4 mb-4">
                  <img src={selected.avatar} alt="" className="w-16 h-16 rounded-2xl border-2 object-cover" style={{ borderColor: '#f59e0b' }}/>
                  <div>
                    <p className="font-black text-base" style={{ color: '#0f172a' }}>{selected.name}</p>
                    <p className="text-sm font-semibold" style={{ color: '#64748b' }}>{selected.contact}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: typeMeta[selected.type].color, background: typeMeta[selected.type].bg }}>
                        {selected.type}
                      </span>
                      <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{selected.country}</span>
                    </div>
                  </div>
                </div>
                <StarRating rating={selected.rating} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'Total Shipments', value: selected.totalShipments, icon: <Package size={14}/>, color: '#1e3a8a' },
                  { label: 'Total Revenue', value: selected.totalRevenue, icon: <TrendingUp size={14}/>, color: '#10b981' },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-3.5">
                    <div className="flex items-center gap-2 mb-1" style={{ color: s.color }}>{s.icon}
                      <span className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{s.label}</span>
                    </div>
                    <p className="text-lg font-black" style={{ color: '#0f172a' }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="glass-card p-4 mb-4 space-y-3">
                <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>Contact Information</p>
                {[
                  { icon: <Mail size={13}/>, val: selected.email },
                  { icon: <Phone size={13}/>, val: selected.phone },
                  { icon: <MapPin size={13}/>, val: selected.country },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#475569' }}>
                    <span style={{ color: '#94a3b8' }}>{c.icon}</span>
                    {c.val}
                  </div>
                ))}
              </div>

              {/* Products */}
              <div className="glass-card p-4 mb-5">
                <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: '#94a3b8' }}>Main Products</p>
                <div className="flex flex-wrap gap-2">
                  {selected.products.map(p => (
                    <span key={p} className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => showToast('info', 'Opening email...', `Sending email to ${selected.email}`)}
                  className="w-full py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.25)' }}>
                  ✉️ Send Email to Client
                </button>
                <button
                  onClick={() => showToast('info', 'Opening history...', `Showing all shipments for ${selected.name}`)}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                  style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                  📦 View Shipment History
                </button>
                <button
                  onClick={() => showToast('info', 'Calling via phone...', selected.phone)}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                  style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                  📞 Call Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toolbar */}
      <div className="glass-card px-4 sm:px-5 py-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
        <div className="relative flex-1 min-w-0 w-full sm:w-auto sm:min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search client name or country..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', color: '#1e293b' }}/>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-400 flex-shrink-0"/>
          {['All', 'Premium', 'Regular', 'New'].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className="text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all"
              style={filterType === t ? { background: '#1e3a8a', color: 'white' } : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
              {t}
            </button>
          ))}
        </div>

        <button onClick={() => showToast('info', 'Add new client form coming soon', 'This feature is under development.')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white w-full sm:w-auto sm:ml-auto justify-center"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}>
          <Plus size={15}/> Add Client
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Clients', value: clients.length, color: '#1e3a8a' },
          { label: 'Premium Clients', value: clients.filter(c => c.type === 'Premium').length, color: '#f59e0b' },
          { label: 'New Clients', value: clients.filter(c => c.type === 'New').length, color: '#10b981' },
          { label: 'Active Clients', value: clients.filter(c => c.status === 'Active').length, color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 text-center cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => showToast('info', s.label, `Total: ${s.value}`)}>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-bold mt-1 uppercase tracking-wider" style={{ color: '#94a3b8' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Client grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(c => {
          const tm = typeMeta[c.type];
          return (
            <button key={c.id}
              onClick={() => setSelected(c)}
              className="glass-card p-5 text-left flex flex-col gap-4 transition-all hover:scale-[1.02] cursor-pointer w-full"
              style={selected?.id === c.id ? { border: '1px solid rgba(30,58,138,0.3)' } : {}}>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt="" className="w-12 h-12 rounded-xl border-2 object-cover" style={{ borderColor: tm.color + '60' }}/>
                  <div>
                    <p className="font-black text-sm" style={{ color: '#0f172a' }}>{c.name}</p>
                    <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{c.contact}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: tm.color, background: tm.bg }}>
                  {c.type}
                </span>
              </div>

              <StarRating rating={c.rating} />

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-2.5" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <p className="text-xs font-bold" style={{ color: '#94a3b8' }}>Shipments</p>
                  <p className="font-black text-base" style={{ color: '#0f172a' }}>{c.totalShipments}</p>
                </div>
                <div className="rounded-xl p-2.5" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <p className="text-xs font-bold" style={{ color: '#94a3b8' }}>Revenue</p>
                  <p className="font-black text-base" style={{ color: '#10b981' }}>{c.totalRevenue}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium" style={{ color: '#94a3b8' }}>
                <span className="flex items-center gap-1">
                  <MapPin size={11}/> {c.country}
                </span>
                <span>Last: {c.lastShipment}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {c.products.slice(0, 2).map(p => (
                  <span key={p} className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: 'rgba(30,58,138,0.07)', color: '#1e3a8a' }}>{p}</span>
                ))}
                {c.products.length > 2 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.05)', color: '#94a3b8' }}>
                    +{c.products.length - 2} more
                  </span>
                )}
              </div>

              <div className="text-xs font-bold pt-1 text-right" style={{ color: '#1e3a8a' }}>
                Click to view details →
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Users size={40} className="mx-auto mb-3 text-slate-300"/>
          <p className="font-bold text-base" style={{ color: '#0f172a' }}>No clients found</p>
          <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Try searching with a different keyword</p>
        </div>
      )}
    </div>
  );
}
