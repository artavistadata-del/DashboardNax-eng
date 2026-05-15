'use client';

import { Search, Bell, Calendar, Download, ChevronDown, Menu } from 'lucide-react';

const pageTitles: Record<string, { title: string; sub: string }> = {
  overview:   { title: 'Dashboard Overview', sub: 'Real-time freight operations summary' },
  shipments:  { title: 'Manage Shipments', sub: 'Create, update, and track bookings' },
  tracking:   { title: 'Live Tracking', sub: 'Real-time cargo status & route visibility' },
  storage:    { title: 'Cold Storage', sub: 'Temperature monitoring & capacity management' },
  clients:    { title: 'Client Directory', sub: 'Customer accounts and contact management' },
  analytics:  { title: 'Analytics & Reports', sub: 'Business intelligence and performance metrics' },
  alerts:     { title: 'Alerts & Notifications', sub: 'System alerts and cargo status updates' },
  settings:   { title: 'System Settings', sub: 'Account, preferences, and configurations' },
};

interface HeaderProps {
  activeMenu: string;
  unreadAlerts?: number;
  onMenuToggle: () => void;
}

export default function Header({ activeMenu, unreadAlerts = 3, onMenuToggle }: HeaderProps) {
  const page = pageTitles[activeMenu] ?? { title: 'Dashboard', sub: '' };

  return (
    <header className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-30"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.65)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
      }}>

      {/* Left — Hamburger (mobile) + Page title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — visible on mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
          aria-label="Open menu"
          id="hamburger-menu-btn"
        >
          <Menu size={18} style={{ color: '#475569' }} />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base lg:text-lg font-black truncate" style={{ color: '#0f2557' }}>{page.title}</h1>
          <p className="text-xs font-medium hidden sm:block" style={{ color: '#94a3b8' }}>{page.sub}</p>
        </div>
      </div>

      {/* Right — Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Search — hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }}/>
          <input
            type="text"
            placeholder="Search AWB, client..."
            className="pl-9 pr-4 py-2 text-sm font-medium rounded-xl outline-none transition-all w-44 lg:w-56"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#1e293b',
            }}
          />
        </div>

        {/* Date range — hidden on mobile & tablet */}
        <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: '#475569',
          }}>
          <Calendar size={14} className="text-slate-400"/>
          May 2026
          <ChevronDown size={13} className="text-slate-400"/>
        </button>

        {/* Export — hidden on small screens */}
        <button className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)',
            boxShadow: '0 4px 12px rgba(30,58,138,0.3)',
          }}>
          <Download size={14}/> <span className="hidden sm:inline">Export</span>
        </button>

        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all"
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}>
          <Bell size={16} style={{ color: '#475569' }}/>
          {unreadAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs font-black text-white rounded-full"
              style={{ background: '#ef4444', fontSize: '9px' }}>
              {unreadAlerts}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-8 h-8 rounded-full border-2" style={{ borderColor: '#f59e0b' }}/>
          <div className="hidden lg:block">
            <p className="text-xs font-black leading-tight" style={{ color: '#0f172a' }}>John Abraham</p>
            <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Ops Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
