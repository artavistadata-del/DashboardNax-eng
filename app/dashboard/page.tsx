'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  LayoutDashboard, BarChart2, Settings, LogOut, 
  Package, Plane, Bell, Search, ClipboardList,
  Calendar, Download, MoreVertical, Box, Globe, Users, TrendingUp,
  Edit2, Trash2 // Tambahan ikon untuk CRUD
} from 'lucide-react';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const initialShipments = [
  { id: 1, clientName: 'Tokyo Sushi', destination: 'JFK', weight: 450, type: 'Air Perishable' },
  { id: 2, clientName: 'Yamaha Motors', destination: 'LAX', weight: 1200, type: 'Ocean Freight' },
  { id: 3, clientName: 'Samsung Elec.', destination: 'JFK', weight: 3500, type: 'Ocean Freight' },
  { id: 4, clientName: 'Wagyu Farm', destination: 'LAX', weight: 200, type: 'Air Perishable' },
  { id: 5, clientName: 'Target Corp', destination: 'NRT', weight: 850, type: 'Domestic Trucking' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [shipments, setShipments] = useState<any[]>([]);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null); // State untuk melacak mode EDIT
  const [clientName, setClientName] = useState('');
  const [destination, setDestination] = useState('LAX');
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('Ocean Freight');

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) router.push('/');

    const savedData = localStorage.getItem('nax_shipments');
    if (savedData) setShipments(JSON.parse(savedData));
    else {
      setShipments(initialShipments);
      localStorage.setItem('nax_shipments', JSON.stringify(initialShipments));
    }
  }, [router]);

  // --- CRUD: CREATE & UPDATE ---
  const handleSaveShipment = (e: React.FormEvent) => {
    e.preventDefault();
    
    let updatedShipments;
    
    if (editingId) {
      // UPDATE DATA LAMA
      updatedShipments = shipments.map(item => 
        item.id === editingId 
          ? { ...item, clientName, destination, weight: Number(weight), type }
          : item
      );
      setEditingId(null);
    } else {
      // CREATE DATA BARU
      const newShipment = { id: Date.now(), clientName, destination, weight: Number(weight), type };
      updatedShipments = [newShipment, ...shipments];
    }

    setShipments(updatedShipments);
    localStorage.setItem('nax_shipments', JSON.stringify(updatedShipments));
    
    // Reset Form
    setClientName(''); setWeight(''); setDestination('LAX'); setType('Ocean Freight');
  };

  // --- CRUD: PREPARE EDIT ---
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setClientName(item.clientName);
    setDestination(item.destination);
    setWeight(item.weight.toString());
    setType(item.type);
    
    // Otomatis scroll ke atas (ke form) jika tabelnya panjang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- CRUD: DELETE ---
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      const updatedShipments = shipments.filter(item => item.id !== id);
      setShipments(updatedShipments);
      localStorage.setItem('nax_shipments', JSON.stringify(updatedShipments));
      
      // Jika sedang mengedit item yang dihapus, reset form
      if (editingId === id) {
        setEditingId(null);
        setClientName(''); setWeight('');
      }
    }
  };

  // --- LOGIKA DATA DINAMIS ---
  const totalShipments = shipments.length;
  const totalWeight = shipments.reduce((sum, item) => sum + item.weight, 0);
  const totalRevenue = totalWeight * 12.5; 

  const statsByType = shipments.reduce((acc, curr) => {
    if (!acc[curr.type]) acc[curr.type] = { count: 0, weight: 0 };
    acc[curr.type].count += 1;
    acc[curr.type].weight += curr.weight;
    return acc;
  }, { 'Air Perishable': { count: 0, weight: 0 }, 'Ocean Freight': { count: 0, weight: 0 }, 'Domestic Trucking': { count: 0, weight: 0 } });

  const airPct = totalShipments ? Math.round((statsByType['Air Perishable'].count / totalShipments) * 100) : 0;
  const oceanPct = totalShipments ? Math.round((statsByType['Ocean Freight'].count / totalShipments) * 100) : 0;
  const domPct = totalShipments ? Math.round((statsByType['Domestic Trucking'].count / totalShipments) * 100) : 0;

  const destinations = ['LAX', 'JFK', 'NRT'];
  const chartData = destinations.map(dest => {
    const destShipments = shipments.filter(s => s.destination === dest);
    return {
      air: destShipments.filter(s => s.type === 'Air Perishable').reduce((sum, s) => sum + s.weight, 0),
      ocean: destShipments.filter(s => s.type === 'Ocean Freight').reduce((sum, s) => sum + s.weight, 0),
      domestic: destShipments.filter(s => s.type === 'Domestic Trucking').reduce((sum, s) => sum + s.weight, 0),
    };
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  if (!isMounted) return null;

  // --- ECHARTS CONFIG ---
  const barOptions = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e5e7eb' },
    legend: { show: false }, 
    grid: { left: '0%', right: '0%', bottom: '5%', top: '15%', containLabel: true },
    xAxis: { 
      type: 'category', data: ['Los Angeles (LAX)', 'New York (JFK)', 'Tokyo (NRT)'],
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#6b7280', fontSize: 12, interval: 0, fontWeight: 500 }
    },
    yAxis: { 
      type: 'value', name: 'Weight (Kg)', nameTextStyle: { color: '#6b7280', padding: [0, 0, 0, 20], fontWeight: 500 },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.05)' } },
      axisLabel: { color: '#6b7280', fontWeight: 500 }
    },
    color: ['#1e3a8a', '#f59e0b', '#fbbf24'],
    series: [
      { name: 'Air Perishable', type: 'bar', stack: 'total', barWidth: '40%', data: chartData.map(d => d.air) },
      { name: 'Ocean Freight', type: 'bar', stack: 'total', barWidth: '40%', data: chartData.map(d => d.ocean) },
      { name: 'Domestic Trucking', type: 'bar', stack: 'total', barWidth: '40%', itemStyle: { borderRadius: [4, 4, 0, 0] }, data: chartData.map(d => d.domestic) }
    ]
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in duration-500 relative z-10">
            {/* KPI Cards (Glassmorphism) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:bg-white/60 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-bold text-gray-600">Total Bookings</p>
                  <div className="p-2 bg-blue-100/50 rounded-lg"><Package size={18} className="text-[#1e3a8a]" /></div>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{totalShipments} <span className="text-sm font-semibold text-gray-500">Orders</span></h2>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:bg-white/60 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-bold text-gray-600">Total Cargo Weight</p>
                  <div className="p-2 bg-orange-100/50 rounded-lg"><TrendingUp size={18} className="text-orange-500" /></div>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{totalWeight.toLocaleString()} <span className="text-sm font-semibold text-gray-500">Kg</span></h2>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:bg-white/60 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-bold text-gray-600">Est. Revenue</p>
                  <div className="p-2 bg-indigo-100/50 rounded-lg"><Globe size={18} className="text-indigo-600" /></div>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-1">${totalRevenue.toLocaleString()}</h2>
                </div>
              </div>
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-4">Volume by Destination</h3>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">Air Perishable</p>
                        <p className="text-xl font-extrabold text-gray-900">{statsByType['Air Perishable'].weight.toLocaleString()} <span className="text-xs text-gray-400 font-semibold">Kg</span></p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-1">Ocean Freight</p>
                        <p className="text-xl font-extrabold text-gray-900">{statsByType['Ocean Freight'].weight.toLocaleString()} <span className="text-xs text-gray-400 font-semibold">Kg</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="hidden md:flex gap-4 text-xs font-bold text-gray-600">
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a]"></span> Air</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> Ocean</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></span> Domestic</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-h-75">
                  <ReactECharts option={barOptions} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-extrabold text-gray-900">Shipment Categories</h3>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20}/></button>
                </div>
                
                <div className="flex gap-1 mb-8 h-6 rounded-sm overflow-hidden bg-white/40 shadow-inner">
                  {airPct > 0 && <div className="bg-[#1e3a8a] relative" style={{ width: `${airPct}%` }}><div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#fff_2px,#fff_4px)]"></div></div>}
                  {oceanPct > 0 && <div className="bg-[#f59e0b]" style={{ width: `${oceanPct}%` }}></div>}
                  {domPct > 0 && <div className="bg-[#fbbf24]" style={{ width: `${domPct}%` }}></div>}
                </div>

                <div className="flex-1">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs font-bold text-left border-b border-white/40">
                        <th className="pb-3">Categories</th>
                        <th className="pb-3 text-right">Percent</th>
                        <th className="pb-3 text-right">Bookings</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-900 font-bold">
                      <tr className="border-b border-white/20">
                        <td className="py-3.5 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] shadow-sm"></div> Air Perishable</td>
                        <td className="py-3.5 text-right text-gray-600">{airPct}%</td>
                        <td className="py-3.5 text-right">{statsByType['Air Perishable'].count}</td>
                      </tr>
                      <tr className="border-b border-white/20">
                        <td className="py-3.5 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-sm"></div> Ocean Freight</td>
                        <td className="py-3.5 text-right text-gray-600">{oceanPct}%</td>
                        <td className="py-3.5 text-right">{statsByType['Ocean Freight'].count}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-sm"></div> Domestic Truck</td>
                        <td className="py-3.5 text-right text-gray-600">{domPct}%</td>
                        <td className="py-3.5 text-right">{statsByType['Domestic Trucking'].count}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        );

      case 'shipments':
        return (
          <div className="space-y-6 animate-in fade-in duration-500 relative z-10">
            {/* Input Form Glass (CRUD) */}
            <div className="bg-white/50 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-extrabold text-gray-900">
                  {editingId ? 'Update Booking' : 'Create New Booking'}
                </h3>
                {editingId && (
                  <button onClick={() => { setEditingId(null); setClientName(''); setWeight(''); }} className="text-xs font-bold text-gray-500 hover:text-red-500">Cancel Edit</button>
                )}
              </div>
              <form onSubmit={handleSaveShipment} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Client Name</label>
                  <input required placeholder="E.g., Sony Corp" value={clientName} onChange={e => setClientName(e.target.value)}
                    className="w-full p-3 bg-white/60 focus:bg-white/90 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none text-sm font-bold text-gray-900 shadow-inner" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Weight (Kg)</label>
                  <input required type="number" placeholder="0" value={weight} onChange={e => setWeight(e.target.value)}
                    className="w-full p-3 bg-white/60 focus:bg-white/90 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none text-sm font-bold text-gray-900 shadow-inner" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Destination</label>
                  <select value={destination} onChange={e => setDestination(e.target.value)}
                    className="w-full p-3 bg-white/60 focus:bg-white/90 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none text-sm font-bold text-gray-900 shadow-inner">
                    <option value="LAX">LAX (Los Angeles)</option>
                    <option value="JFK">JFK (New York)</option>
                    <option value="NRT">NRT (Tokyo)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">Cargo Type</label>
                  <select value={type} onChange={e => setType(e.target.value)}
                    className="w-full p-3 bg-white/60 focus:bg-white/90 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#1e3a8a] outline-none text-sm font-bold text-gray-900 shadow-inner">
                    <option value="Ocean Freight">Ocean Freight</option>
                    <option value="Air Perishable">Air Perishable (Cold Chain)</option>
                    <option value="Domestic Trucking">Domestic Trucking</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className={`w-full text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 border ${editingId ? 'bg-orange-500 hover:bg-orange-600 border-orange-400' : 'bg-linear-to-r from-[#1e3a8a] to-[#2a4db3] hover:from-[#152a6b] hover:to-[#1e3a8a] border-blue-400/20'}`}>
                    {editingId ? 'Save Changes' : '+ Add Shipment'}
                  </button>
                </div>
              </form>
            </div>

            {/* Table Glass with SCROLL */}
            <div className="bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-white/50 flex justify-between items-center bg-white/20 shrink-0">
                <h3 className="text-lg font-extrabold text-gray-900">Shipment Records</h3>
                <span className="bg-white/60 text-gray-800 border border-white/80 shadow-sm text-xs font-extrabold px-3 py-1 rounded-md">{shipments.length} Records</span>
              </div>
              
              {/* TABLE SCROLL CONTAINER */}
              <div className="overflow-x-auto overflow-y-auto max-h-[400px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm">
                    <tr className="text-gray-600 text-xs uppercase tracking-wider font-bold">
                      <th className="p-4 pl-6 border-b border-white/50">Tracking ID</th>
                      <th className="p-4 border-b border-white/50">Client</th>
                      <th className="p-4 border-b border-white/50">Destination</th>
                      <th className="p-4 border-b border-white/50">Weight</th>
                      <th className="p-4 border-b border-white/50">Type</th>
                      <th className="p-4 pr-6 border-b border-white/50 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {shipments.map((item) => (
                      <tr key={item.id} className={`border-b border-white/30 hover:bg-white/50 transition-colors group ${editingId === item.id ? 'bg-blue-50/50' : ''}`}>
                        <td className="p-4 pl-6 font-extrabold text-[#1e3a8a]">#NAX-{item.id.toString().slice(-4)}</td>
                        <td className="p-4 font-bold text-gray-800">{item.clientName}</td>
                        <td className="p-4 font-bold text-gray-700">
                          <span className="px-2.5 py-1 bg-white/60 border border-white/80 shadow-sm rounded-md">{item.destination}</span>
                        </td>
                        <td className="p-4 font-bold text-gray-700">{item.weight} Kg</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold shadow-sm border border-white/60
                            ${item.type === 'Air Perishable' ? 'bg-blue-100/80 text-[#1e3a8a]' : 
                              item.type === 'Ocean Freight' ? 'bg-orange-100/80 text-orange-800' :
                              'bg-yellow-100/80 text-yellow-800'}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEdit(item)} className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors" title="Edit">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {shipments.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500 font-bold">No shipments found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-gray-900 overflow-hidden relative">
      
      {/* Background Blobs */}
      <div className="fixed top-[-15%] left-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* Sidebar Glass */}
      <aside className="w-65 bg-white/40 backdrop-blur-2xl border-r border-white/60 flex-col hidden md:flex z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-18 px-6 flex items-center gap-3 font-black text-xl text-[#1e3a8a] border-b border-white/50 bg-white/20">
          <Plane className="w-6 h-6 text-orange-500" />
          NAX-Nest
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1.5">
            <button onClick={() => setActiveMenu('overview')} 
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-sm ${activeMenu === 'overview' ? 'bg-white/70 text-[#1e3a8a] shadow-sm border border-white/80' : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'}`}>
              <LayoutDashboard size={18} className={activeMenu === 'overview' ? 'text-orange-500' : ''}/> Dashboard
            </button>
            <button onClick={() => setActiveMenu('shipments')} 
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-sm ${activeMenu === 'shipments' ? 'bg-white/70 text-[#1e3a8a] shadow-sm border border-white/80' : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'}`}>
              <ClipboardList size={18} className={activeMenu === 'shipments' ? 'text-orange-500' : ''}/> Manage Shipments
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-white/40 hover:text-gray-900 transition-all">
              <BarChart2 size={18} /> Analytics
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-white/40 hover:text-gray-900 transition-all">
              <Bell size={18} /> Alerts
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-white/40 hover:text-gray-900 transition-all">
              <Settings size={18} /> Settings
            </button>
          </div>

          <div className="mt-8">
            <p className="px-4 text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Channels</p>
            <div className="space-y-1.5">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-white/40 hover:text-gray-900 transition-all">
                <Box size={16} /> Warehousing
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-white/40 hover:text-gray-900 transition-all">
                <Users size={16} /> Clients
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/50 bg-white/20">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-2.5 w-full bg-white/50 border border-white/60 hover:bg-red-50/80 text-gray-700 hover:text-red-600 rounded-xl transition-all font-bold text-sm shadow-sm">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative z-20">
        <header className="h-18 px-8 bg-white/40 backdrop-blur-2xl border-b border-white/60 flex justify-between items-center sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input type="text" placeholder="Search tracking ID..." className="w-full pl-9 pr-4 py-2 bg-white/60 border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm font-bold text-gray-900 placeholder-gray-500 shadow-inner transition-all focus:bg-white/90" />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white/60 border border-white/80 shadow-sm rounded-xl px-4 py-2 text-sm font-bold text-gray-700 hover:bg-white/80 transition-all">
                <Calendar size={16} className="text-gray-500"/> 10 Feb - 31 Dec 2026
              </button>
              <button className="flex items-center gap-2 bg-linear-to-r from-[#1e3a8a] to-[#2a4db3] text-white border border-blue-400/30 rounded-xl px-4 py-2 text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <Download size={16}/> Export Data
              </button>
            </div>

            <div className="w-px h-8 bg-white/60 mx-2 hidden md:block border-l border-gray-300/30"></div>

            <div className="flex items-center gap-3 cursor-pointer bg-white/40 border border-white/60 px-3 py-1.5 rounded-full shadow-sm hover:bg-white/60 transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-gray-900 leading-tight">John Abraham</p>
                <p className="text-xs font-semibold text-gray-600">naxusa@logistics.com</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeMenu === 'overview' && (
            <h1 className="text-2xl font-black text-[#1e3a8a] mb-6 drop-shadow-sm">Dashboard Overview</h1>
          )}
          {activeMenu === 'shipments' && (
            <h1 className="text-2xl font-black text-[#1e3a8a] mb-6 drop-shadow-sm">Manage Shipments</h1>
          )}
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
}