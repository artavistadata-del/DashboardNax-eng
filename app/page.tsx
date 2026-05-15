'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Globe, Thermometer, Wind } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2557 50%, #1a1060 100%)' }}>

      {/* ── Animated background orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob delay-0 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2a4db3, transparent 70%)' }} />
        <div className="animate-blob delay-2000 absolute top-1/2 -right-60 w-[700px] h-[700px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }} />
        <div className="animate-blob delay-4000 absolute -bottom-60 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1e3a8a, transparent 70%)' }} />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── LEFT PANEL — Branding ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 px-16 py-16 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M3 17l2-8h14l2 8H3z" fill="white" fillOpacity="0.9"/>
              <path d="M7 17v2M17 17v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="2" fill="white" fillOpacity="0.6"/>
              <path d="M12 4l3 5h-6l3-5z" fill="white" fillOpacity="0.8"/>
            </svg>
          </div>
          <span className="text-white font-black text-xl tracking-wide">NAX USA Logistics</span>
        </div>

        {/* Center illustration + text */}
        <div className="space-y-8">
          {/* Floating 3D-ish world map illustration */}
          <div className="animate-float relative">
            <div className="w-80 h-80 relative mx-auto">
              {/* Globe base circle */}
              <div className="absolute inset-0 rounded-full opacity-20 border-2 border-amber-400/30"
                style={{ background: 'radial-gradient(ellipse at 35% 35%, rgba(42,77,179,0.5), rgba(15,37,87,0.8))' }}>
              </div>
              {/* Routes SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="1"/>
                <circle cx="160" cy="160" r="100" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="1"/>
                {/* Route lines */}
                <path d="M 60 120 Q 160 80 260 140" fill="none" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <path d="M 80 200 Q 160 240 240 180" fill="none" stroke="rgba(100,180,255,0.5)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <path d="M 100 140 Q 160 160 220 120" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3"/>
                {/* Location dots */}
                <circle cx="60" cy="120" r="5" fill="#f59e0b" className="animate-pulse-glow"/>
                <circle cx="260" cy="140" r="5" fill="#f59e0b"/>
                <circle cx="80" cy="200" r="4" fill="#60a5fa"/>
                <circle cx="240" cy="180" r="4" fill="#60a5fa"/>
                <circle cx="160" cy="100" r="6" fill="white" fillOpacity="0.9"/>
                <text x="160" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" opacity="0.8">LAX</text>
                <text x="62" y="112" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">NRT</text>
                <text x="255" y="132" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">NWK</text>
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white leading-tight">
              Global Freight <br/>
              <span style={{ color: '#f59e0b' }}>Intelligence</span>
            </h1>
            <p className="text-blue-200/80 text-lg leading-relaxed max-w-md">
              Unified platform for air & ocean freight, cold chain logistics, and perishable cargo management across the Pacific.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Thermometer size={14}/>, label: 'Cold Chain' },
              { icon: <Globe size={14}/>, label: 'Global Network' },
              { icon: <Wind size={14}/>, label: '24/7 Operations' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-blue-100"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="text-amber-400">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-blue-300/50 text-sm">
          © 2026 NAX (U.S.A.), INC. · Los Angeles, CA
        </p>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-white font-black text-xl">NAX USA Logistics</span>
          </div>

          {/* Card */}
          <div className="animate-fade-up rounded-2xl sm:rounded-3xl p-6 sm:p-10"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.13)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-white mb-1">Sign In</h2>
              <p className="text-blue-300/70 text-sm">Access your logistics portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-200/70 uppercase tracking-widest">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/50 group-focus-within:text-amber-400 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="your@naxusa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-semibold text-white placeholder-blue-300/30 outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.border = '1px solid rgba(245,158,11,0.5)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-200/70 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300/50 group-focus-within:text-amber-400 transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-semibold text-white placeholder-blue-300/30 outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.border = '1px solid rgba(245,158,11,0.5)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-amber-400"/>
                  <span className="text-sm text-blue-200/60 font-medium">Remember me</span>
                </label>
                <button type="button" className="text-sm font-semibold" style={{ color: '#f59e0b' }}>
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-base font-black text-white relative overflow-hidden flex items-center justify-center gap-3 transition-all mt-2"
                style={{
                  background: loading ? 'rgba(245,158,11,0.5)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(245,158,11,0.4)',
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Access Portal
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}/>
              <span className="text-xs text-blue-300/40 font-medium">DEMO CREDENTIALS</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}/>
            </div>

            <div className="rounded-xl px-4 py-3 text-xs text-blue-200/60 font-mono space-y-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div>Email: <span className="text-amber-400/80">admin@naxusa.com</span></div>
              <div>Password: <span className="text-amber-400/80">any password</span></div>
            </div>
          </div>

          {/* Bottom links */}
          <p className="text-center text-blue-300/40 text-xs mt-6 font-medium">
            NAX (U.S.A.), INC. · Secure Portal · 5343 W Imperial Hwy, Los Angeles CA
          </p>
        </div>
      </div>
    </div>
  );
}