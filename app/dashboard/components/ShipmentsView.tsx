'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Filter, Search, Download, AlertTriangle } from 'lucide-react';
import { useToast } from './Toast';

type ShipmentType = 'Air — Fresh' | 'Ocean Cargo' | 'Reefer Truck' | 'Air Cargo';
type ShipmentStatus = 'Processing' | 'In Transit' | 'At Customs' | 'Delivered' | 'On Hold';

interface Shipment {
  id: number; awb: string; client: string; origin: string; dest: string;
  weight: number; type: ShipmentType; status: ShipmentStatus; date: string; product: string;
}

const initData: Shipment[] = [
  { id: 1, awb: 'NAX-20240501', client: 'Tsukiji Fish Market', origin: 'NRT', dest: 'LAX', weight: 420,  type: 'Air — Fresh', status: 'In Transit', date: '2026-05-14', product: 'Bluefin Tuna' },
  { id: 2, awb: 'NAX-20240502', client: 'Pacific Wagyu Co.', origin: 'OSA', dest: 'LAX', weight: 180,  type: 'Air — Fresh', status: 'Delivered', date: '2026-05-13', product: 'Wagyu Beef' },
  { id: 3, awb: 'NAX-20240503', client: 'Fresh Mart LA', origin: 'MEX', dest: 'LAX', weight: 3800, type: 'Ocean Cargo', status: 'At Customs', date: '2026-05-12', product: 'Fresh Produce' },
  { id: 4, awb: 'NAX-20240504', client: 'Blue Ocean Seafood', origin: 'LAX', dest: 'NWK', weight: 650,  type: 'Reefer Truck', status: 'In Transit', date: '2026-05-11', product: 'Sea Urchin' },
  { id: 5, awb: 'NAX-20240505', client: 'SoCal Produce Inc.', origin: 'LAX', dest: 'NRT', weight: 2100, type: 'Air Cargo', status: 'Processing', date: '2026-05-10', product: 'Fresh Produce' },
  { id: 6, awb: 'NAX-20240506', client: 'Manta Ray Sushi', origin: 'LAX', dest: 'PEK', weight: 5400, type: 'Ocean Cargo', status: 'Delivered', date: '2026-05-09', product: 'Mixed Seafood' },
  { id: 7, awb: 'NAX-20240507', client: 'Uni World LLC', origin: 'LAX', dest: 'NRT', weight: 95,   type: 'Air — Fresh', status: 'On Hold', date: '2026-05-08', product: 'Sea Urchin' },
  { id: 8, awb: 'NAX-20240508', client: 'Japan Premium Beef', origin: 'NRT', dest: 'LAX', weight: 320,  type: 'Air — Fresh', status: 'Processing', date: '2026-05-07', product: 'Wagyu Beef' },
];

const statusMeta: Record<ShipmentStatus, { color: string; bg: string }> = {
  'Processing':  { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  'In Transit':  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  'At Customs':  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  'Delivered':   { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  'On Hold':     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const typeColors: Record<ShipmentType, string> = {
  'Air — Fresh': '#1e3a8a',
  'Ocean Cargo': '#f59e0b',
  'Reefer Truck': '#10b981',
  'Air Cargo': '#3b82f6',
};

export default function ShipmentsView() {
  const { showToast } = useToast();
  const [shipments, setShipments] = useState<Shipment[]>(initData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Shipment | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<ShipmentStatus | 'All'>('All');

  const [form, setForm] = useState({
    client: '', origin: 'NRT', dest: 'LAX', weight: '',
    type: 'Air — Fresh' as ShipmentType, status: 'Processing' as ShipmentStatus, product: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setForm({ client: '', origin: 'NRT', dest: 'LAX', weight: '', type: 'Air — Fresh', status: 'Processing', product: '' });
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (s: Shipment) => {
    setForm({ client: s.client, origin: s.origin, dest: s.dest, weight: String(s.weight), type: s.type, status: s.status, product: s.product });
    setEditingId(s.id);
    setShowForm(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setShipments(prev => prev.filter(s => s.id !== deleteTarget.id));
    showToast('success', 'Shipment deleted', `${deleteTarget.awb} — ${deleteTarget.client} has been removed.`);
    setDeleteTarget(null);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.client.trim()) errs.client = 'Client name is required';
    if (!form.product.trim()) errs.product = 'Product name is required';
    if (!form.weight || isNaN(Number(form.weight)) || Number(form.weight) <= 0) errs.weight = 'Enter a valid weight (number greater than 0)';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setShipments(prev => prev.map(s => s.id === editingId ? { ...s, ...form, weight: Number(form.weight) } : s));
      showToast('success', 'Changes saved!', `Shipment data for ${form.client} updated successfully.`);
    } else {
      const newId = Date.now();
      setShipments(prev => [{
        id: newId, awb: `NAX-${newId.toString().slice(-8)}`, ...form,
        weight: Number(form.weight), date: new Date().toISOString().slice(0, 10),
      }, ...prev]);
      showToast('success', 'New shipment created!', `${form.client} — ${form.origin} → ${form.dest} added successfully.`);
    }
    resetForm();
  };

  const filtered = shipments.filter(s => {
    const matchSearch = search === '' || s.client.toLowerCase().includes(search.toLowerCase()) || s.awb.includes(search);
    const matchStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const inputClass = "w-full px-3 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all";
  const inputStyle = { background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.1)', color: '#1e293b' };

  return (
    <div className="space-y-5 animate-fade-up">

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="glass-card p-6 max-w-sm w-full animate-fade-up" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Delete Shipment?</h3>
                <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm font-medium mb-5" style={{ color: '#475569' }}>
              You are about to delete shipment <strong className="text-slate-800">{deleteTarget.awb}</strong> for {deleteTarget.client}. Are you sure?
            </p>
            <div className="flex gap-3">
              <button onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
                style={{ background: '#ef4444' }}>
                Yes, Delete
              </button>
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                style={{ background: 'rgba(0,0,0,0.06)', color: '#64748b' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="glass-card px-4 sm:px-5 py-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
        <div className="relative flex-1 min-w-0 w-full sm:w-auto sm:min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search client name or AWB number..."
            className={inputClass + " pl-9"} style={inputStyle} />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <Filter size={14} className="text-slate-400 flex-shrink-0" />
          {(['All', 'Processing', 'In Transit', 'At Customs', 'Delivered', 'On Hold'] as const).map(st => (
            <button key={st} onClick={() => setFilterStatus(st)}
              className="text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all"
              style={filterStatus === st
                ? { background: '#1e3a8a', color: 'white' }
                : { background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
              {st}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
          <button
            onClick={() => showToast('info', 'Preparing export file...', 'Excel file will download in a few seconds.')}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b', border: '1px solid rgba(0,0,0,0.08)' }}>
            <Download size={13} /> Export
          </button>
          <button onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}>
            <Plus size={15} /> Add Shipment
          </button>
        </div>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="glass-card p-6 animate-fade-up" style={{ border: '1px solid rgba(30,58,138,0.2)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-base" style={{ color: '#0f172a' }}>
                {editingId ? '✏️ Edit Shipment' : '📦 Add New Shipment'}
              </h3>
              <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>
                {editingId ? 'Update shipment information below' : 'Fill in the form to create a new shipment'}
              </p>
            </div>
            <button onClick={resetForm} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <X size={18} className="text-slate-400" />
            </button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Client Name', field: 'client', type: 'text', placeholder: 'e.g. Tsukiji Fish Market' },
              { label: 'Product Name', field: 'product', type: 'text', placeholder: 'e.g. Bluefin Tuna' },
              { label: 'Weight (kg)', field: 'weight', type: 'number', placeholder: '0' },
            ].map(f => (
              <div key={f.field}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                <input required type={f.type} placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.field]}
                  onChange={e => { setForm(prev => ({ ...prev, [f.field]: e.target.value })); setFormErrors(p => ({ ...p, [f.field]: '' })); }}
                  className={inputClass}
                  style={{ ...inputStyle, border: formErrors[f.field] ? '1px solid #ef4444' : inputStyle.border }} />
                {formErrors[f.field] && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{formErrors[f.field]}</p>
                )}
              </div>
            ))}

            {[
              { label: 'Origin Airport', field: 'origin', options: ['NRT', 'OSA', 'LAX', 'NWK', 'MEX', 'PEK', 'BKK', 'HAN'] },
              { label: 'Destination Airport', field: 'dest', options: ['LAX', 'NWK', 'NRT', 'PEK', 'MEX', 'BKK', 'HAN'] },
            ].map(f => (
              <div key={f.field}>
                <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>{f.label}</label>
                <select value={(form as Record<string, string>)[f.field]}
                  onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                  className={inputClass} style={inputStyle}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}

            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Shipment Type</label>
              <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value as ShipmentType }))}
                className={inputClass} style={inputStyle}>
                {(['Air — Fresh', 'Ocean Cargo', 'Reefer Truck', 'Air Cargo'] as const).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider block mb-1.5" style={{ color: '#64748b' }}>Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value as ShipmentStatus }))}
                className={inputClass} style={inputStyle}>
                {Object.keys(statusMeta).map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-3 pt-2">
              <button type="submit"
                className="px-8 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.25)' }}>
                {editingId ? '💾 Save Changes' : '✅ Create Shipment'}
              </button>
              <button type="button" onClick={resetForm}
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          <div>
            <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Shipment List</h3>
            <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Showing {filtered.length} of {shipments.length} shipments</p>
          </div>
          <span className="badge badge-blue">{filtered.length} records</span>
        </div>
        <div className="table-scroll-wrapper">
          <table className="w-full text-sm" style={{ minWidth: '780px' }}>
            <thead>
              <tr className="text-left border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {['AWB', 'Client', 'Product', 'Route', 'Weight', 'Type', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const st = statusMeta[s.status];
                return (
                  <tr key={s.id} className="border-b transition-colors hover:bg-white/40" style={{ borderColor: 'rgba(0,0,0,0.04)', animationDelay: `${i * 40}ms` }}>
                    <td className="px-5 py-3.5 font-black text-xs" style={{ color: '#1e3a8a' }}>{s.awb}</td>
                    <td className="px-5 py-3.5 font-semibold" style={{ color: '#1e293b' }}>{s.client}</td>
                    <td className="px-5 py-3.5 text-xs font-medium" style={{ color: '#64748b' }}>{s.product}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 font-bold text-xs" style={{ color: '#475569' }}>
                        <span className="px-2 py-0.5 rounded bg-slate-100">{s.origin}</span>→
                        <span className="px-2 py-0.5 rounded bg-slate-100">{s.dest}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-xs" style={{ color: '#1e293b' }}>{s.weight.toLocaleString()} kg</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ color: typeColors[s.type], background: `${typeColors[s.type]}12` }}>
                        {s.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => {
                          const nextStatuses = Object.keys(statusMeta) as ShipmentStatus[];
                          const idx = nextStatuses.indexOf(s.status);
                          const next = nextStatuses[(idx + 1) % nextStatuses.length];
                          setShipments(prev => prev.map(sh => sh.id === s.id ? { ...sh, status: next } : sh));
                          showToast('success', 'Status updated', `${s.awb} → ${next}`);
                        }}
                        className="text-xs font-bold px-2.5 py-1 rounded-full transition-all hover:opacity-80 cursor-pointer"
                        style={{ color: st.color, background: st.bg }}
                        title="Click to change status">
                        ● {s.status}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-medium" style={{ color: '#94a3b8' }}>{s.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <button onClick={() => handleEdit(s)}
                          className="p-1.5 rounded-lg transition-all hover:scale-110"
                          style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}
                          title="Edit">
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => setDeleteTarget(s)}
                          className="p-1.5 rounded-lg transition-all hover:scale-110"
                          style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}
                          title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-12 text-center">
                  <div className="text-slate-400">
                    <Search size={32} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No shipments found</p>
                    <p className="text-xs mt-1">Try changing your search term or status filter</p>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
