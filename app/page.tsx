'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const SLIDES = [
  {

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

        <div className="absolute top-0 left-0 w-full h-2 rounded-none pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #1e3a8a, #f59e0b)' }} />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(30,58,138,0.04), transparent 70%)' }} />

        {/* Area formulir */}
        <div className="w-full max-w-sm mx-auto relative z-10">

          {/* LOGO BARU NAX USA */}
          <div className="mb-10">
            <img
              src="/logo_nax-FIX.png"
              alt="NAX USA Logistics Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

            </p>
          </div>

          {/* Kesalahan (Error) */}
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

            {/* Kata Sandi (Password) */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748b' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
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
                className="text-sm font-bold transition-opacity hover:opacity-70"
                style={{ color: '#1e3a8a' }}>
                Forgot password?
              </button>
            </div>

            {/* Kirim (Submit) */}
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
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

      <div className="hidden lg:block w-[55%] relative overflow-hidden bg-slate-900">

        {/* Gambar latar belakang (Membaca gambar login-hero.jpg yang diberikan) */}
        <img
          src="/login-hero.jpg"
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