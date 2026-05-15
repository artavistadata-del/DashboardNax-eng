'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import ShipmentsView from './components/ShipmentsView';
import TrackingView from './components/TrackingView';
import ColdStorageView from './components/ColdStorageView';
import ClientsView from './components/ClientsView';
import AnalyticsView from './components/AnalyticsView';
import AlertsView from './components/AlertsView';
import SettingsView from './components/SettingsView';

type MenuId = 'overview' | 'shipments' | 'tracking' | 'storage' | 'clients' | 'analytics' | 'alerts' | 'settings';

const UNREAD_ALERTS = 3;

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) router.push('/');
  }, [router]);

  // Close sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':   return <OverviewView />;
      case 'shipments':  return <ShipmentsView />;
      case 'tracking':   return <TrackingView />;
      case 'storage':    return <ColdStorageView />;
      case 'clients':    return <ClientsView />;
      case 'analytics':  return <AnalyticsView />;
      case 'alerts':     return <AlertsView />;
      case 'settings':   return <SettingsView />;
      default:           return <OverviewView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: '#eef2f8' }}>

      {/* Background ambient orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(30,58,138,0.08), transparent 70%)', filter: 'blur(60px)' }}/>
      <div className="fixed bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)', filter: 'blur(60px)' }}/>

      {/* Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={(m) => setActiveMenu(m as MenuId)}
        unreadAlerts={UNREAD_ALERTS}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 min-w-0">
        <Header
          activeMenu={activeMenu}
          unreadAlerts={UNREAD_ALERTS}
          onMenuToggle={() => setSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}