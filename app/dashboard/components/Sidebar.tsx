'use client';

import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, ClipboardList, MapPin, Thermometer,
  Users, BarChart2, Bell, Settings, LogOut, ChevronRight,
  Package, Globe, X
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  unreadAlerts?: number;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'overview',    label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'shipments',  label: 'Manage Shipments',  icon: ClipboardList },
  { id: 'tracking',   label: 'Live Tracking',     icon: MapPin },
  { id: 'storage',    label: 'Cold Storage',      icon: Thermometer },
  { id: 'clients',    label: 'Clients',           icon: Users },
  { id: 'analytics',  label: 'Analytics',         icon: BarChart2 },
];

const bottomItems = [
  { id: 'alerts',   label: 'Alerts',   icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeMenu, setActiveMenu, unreadAlerts = 3, isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    onClose(); // close sidebar on mobile after navigation
  };

  const NavBtn = ({ item, badge }: { item: typeof navItems[0]; badge?: number }) => {
    const isActive = activeMenu === item.id;
    const Icon = item.icon;
    return (
      <button
        onClick={() => handleMenuClick(item.id)}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative text-sm font-semibold"
        style={isActive ? {
          background: 'linear-gradient(135deg, rgba(30,58,138,0.15), rgba(42,77,179,0.1))',
          color: '#1e3a8a',
          border: '1px solid rgba(30,58,138,0.15)',
        } : {
          color: '#64748b',
          border: '1px solid transparent',
        }}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
            style={{ background: '#f59e0b' }} />
        )}
        <Icon size={17} className={`flex-shrink-0 transition-colors ${isActive ? 'text-amber-500' : 'text-slate-400 group-hover:text-slate-600'}`}/>
        <span className="flex-1 text-left">{item.label}</span>
        {badge && badge > 0 && (
          <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
            style={{ background: '#ef4444' }}>
            {badge}
          </span>
        )}
        {isActive && <ChevronRight size={14} className="text-amber-400"/>}
      </button>
    );
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
        }}>

        {/* ── Logo + Close Button (mobile) ── */}
        <div className="px-6 py-5 flex items-center gap-3 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.6)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)' }}>
            <Package size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-black text-sm" style={{ color: '#0f2557' }}>NAX-Nest</p>
            <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Logistics Portal</p>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ background: 'rgba(0,0,0,0.05)', color: '#64748b' }}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Navigation ── */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          <p className="px-4 text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>
            Main Menu
          </p>
          {navItems.map(item => <NavBtn key={item.id} item={item} />)}

          <div className="pt-4 mt-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <p className="px-4 text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>
              System
            </p>
            {bottomItems.map(item => (
              <NavBtn key={item.id} item={item} badge={item.id === 'alerts' ? unreadAlerts : undefined} />
            ))}
          </div>
        </div>

        {/* ── User Profile ── */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.6)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-3"
            style={{ background: 'rgba(30,58,138,0.05)' }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-8 h-8 rounded-full border-2" style={{ borderColor: '#f59e0b' }}/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: '#0f172a' }}>John Abraham</p>
              <div className="flex items-center gap-1">
                <Globe size={10} className="text-green-500"/>
                <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Operations Manager</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{
              background: 'rgba(239,68,68,0.08)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.15)',
            }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
