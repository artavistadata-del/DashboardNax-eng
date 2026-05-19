'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    headline: 'Take Control of\nGlobal Shipments.',
    sub: 'Monitor air & ocean freight status, manage documents, and coordinate clients — all in one platform.',
  },
  {
    headline: 'Cold Storage\nReal-Time.',
    sub: 'Monitor refrigerated container temperatures from anywhere. Automatic alerts when anomalies occur.',
  },
  {
    headline: 'Secure Data,\nSmooth Operations.',
    sub: 'End-to-end encryption and a complete audit trail for every freight transaction you handle.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password to continue.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    }, 1400);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL — Clean Form ── */}
      <div className="flex-1 flex flex-col justify-center bg-white px-8 py-10 sm:px-12 lg:px-16 relative overflow-hidden">

        {/* Subtle accent blobs */}
        <div className="absolute top-0 left-0 w-full h-2 rounded-none pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #1e3a8a, #f59e0b)' }} />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(30,58,138,0.04), transparent 70%)' }} />

        {/* Form area */}
        <div className="w-full max-w-sm mx-auto relative z-10">

          {/* LOGO BARU NAX USA */}
          <div className="mb-10">
            <img
              src="/logo_nax-FIX.png"
              alt="NAX USA Logistics Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2 tracking-tight" style={{ color: '#0f172a' }}>
              Welcome back!
            </h1>
            <p className="text-sm font-medium" style={{ color: '#64748b' }}>
              Sign in to continue to your logistics portal.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}>
              <span className="mt-0.5 flex-shrink-0">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748b' }}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="florian@naxusa.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  color: '#0f172a',
                  fontWeight: 500,
                }}
                onFocus={e => {
                  e.currentTarget.style.border = '1.5px solid #1e3a8a';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,58,138,0.08)';
                  e.currentTarget.style.background = '#fff';
                }}
                onBlur={e => {
                  e.currentTarget.style.border = '1.5px solid #e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#f8fafc';
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748b' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-4 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    color: '#0f172a',
                    fontWeight: 500,
                  }}
                  onFocus={e => {
                    e.currentTarget.style.border = '1.5px solid #1e3a8a';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,58,138,0.08)';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.border = '1.5px solid #e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors hover:bg-slate-200/50"
                  style={{ color: '#94a3b8' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer peer appearance-none"
                    style={{ border: '1.5px solid #cbd5e1', background: '#fff' }}
                  />
                  {remember && (
                    <div className="absolute inset-0 rounded bg-blue-900 flex items-center justify-center pointer-events-none">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium" style={{ color: '#64748b' }}>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset flow initiated.')}
                className="text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: '#1e3a8a' }}>
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-all group relative overflow-hidden mt-3"
              style={{
                background: loading ? 'rgba(30,58,138,0.5)' : 'linear-gradient(135deg, #1e3a8a 0%, #2a4db3 100%)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(30,58,138,0.30)',
              }}
            >
              {!loading && (
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' }} />
              )}
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Or Continue With</span>
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
          </div>

          {/* Login with Google */}
          <button
            type="button"
            onClick={() => alert('Google authentication flow initiated.')}
            className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all hover:bg-slate-50"
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              color: '#334155',
            }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL — Beautified Visual Hero ── */}
      <div className="hidden lg:block w-[55%] relative overflow-hidden bg-slate-900">

        {/* Background image */}
        <img
          src="/login-hero.jpg"
          alt="NAX Logistics"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Smoother, elegant gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.6) 40%, rgba(15,23,42,0.1) 100%)' }} />

        {/* Content Area - Placed cleanly at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-16 pb-20">

          {/* Top subtle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase mb-6"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Modern Logistics Hub
          </div>

          <h2 className="text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight">
            {SLIDES[activeSlide].headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1
                  ? <span style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{line}</span>
                  : line}
              </span>
            ))}
          </h2>

          <p className="text-base font-medium leading-relaxed max-w-md" style={{ color: 'rgba(241,245,249,0.7)' }}>
            {SLIDES[activeSlide].sub}
          </p>

          {/* Slide dots - Elegant style */}
          <div className="flex gap-2 mt-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="transition-all duration-300 ease-out"
                style={{
                  width: i === activeSlide ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: i === activeSlide ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}