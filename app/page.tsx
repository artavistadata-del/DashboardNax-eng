'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Package, Shield, Thermometer, Star } from 'lucide-react';

const SLIDES = [
  {
    headline: 'Kendalikan Pengiriman\nGlobal Anda.',
    sub: 'Pantau status kiriman udara & laut, kelola dokumen, dan koordinasi klien — semua dalam satu platform.',
  },
  {
    headline: 'Cold Storage\nReal-Time.',
    sub: 'Monitor suhu kontainer refrigerated dari mana saja. Alert otomatis saat terjadi anomali.',
  },
  {
    headline: 'Data Aman,\nOperasi Lancar.',
    sub: 'Enkripsi end-to-end dan audit trail lengkap untuk setiap transaksi pengiriman Anda.',
  },
];

const STATS = [
  { value: '2,400+', label: 'Pengiriman/bulan' },
  { value: '99.2%', label: 'Tepat waktu' },
  { value: '18', label: 'Negara tujuan' },
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
      setError('Mohon isi email dan password terlebih dahulu.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    }, 1400);
  };

  const quickFill = () => {
    setEmail('admin@naxusa.com');
    setPassword('demo1234');
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL — Clean Form ── */}
      <div className="flex-1 flex flex-col justify-between bg-white px-8 py-10 sm:px-12 lg:px-16 relative overflow-hidden">

        {/* Subtle top-left accent */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(30,58,138,0.06), transparent 70%)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            <Package size={19} className="text-white" />
          </div>
          <div>
            <span className="font-black text-base tracking-tight" style={{ color: '#0f2557' }}>NAX USA Logistics</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield size={9} style={{ color: '#10b981' }} />
              <span className="text-xs font-semibold" style={{ color: '#10b981' }}>Terverifikasi &amp; Aman</span>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="w-full max-w-sm mx-auto relative z-10">

          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-1.5" style={{ color: '#0f172a' }}>
              Selamat datang kembali!
            </h1>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Masuk untuk melanjutkan ke portal logistik Anda.
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
                placeholder="contoh@naxusa.com"
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
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                  style={{ color: '#94a3b8' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: '#1e3a8a' }}
                />
                <span className="text-sm" style={{ color: '#64748b' }}>Ingat saya</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Link reset kata sandi telah dikirim ke email Anda.')}
                className="text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: '#1e3a8a' }}>
                Lupa kata sandi?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-all group relative overflow-hidden mt-1"
              style={{
                background: loading ? 'rgba(30,58,138,0.5)' : 'linear-gradient(135deg, #1e3a8a 0%, #2a4db3 100%)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(30,58,138,0.35)',
              }}>
              {/* Hover shimmer */}
              {!loading && (
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12), transparent)' }} />
              )}
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk ke Portal
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
            <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>atau</span>
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
          </div>

          {/* Quick demo fill */}
          <button
            id="demo-login-btn"
            onClick={quickFill}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              color: '#64748b',
            }}>
            🔑 Isi Otomatis Akun Demo
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-center relative z-10" style={{ color: '#cbd5e1' }}>
          © 2026 NAX (U.S.A.), INC. · Los Angeles, CA · Semua hak dilindungi
        </p>
      </div>

      {/* ── RIGHT PANEL — Visual Hero ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden">

        {/* Background image */}
        <img
          src="/login-hero.png"
          alt="NAX Logistics"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(6,14,31,0.72) 0%, rgba(15,37,87,0.55) 50%, rgba(6,14,31,0.80) 100%)' }} />

        {/* Top content */}
        <div className="relative z-10 p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.35)', color: '#fbbf24' }}>
            🚀 Sistem Manajemen Logistik Modern
          </div>
        </div>

        {/* Center — Slide text */}
        <div className="relative z-10 px-12 pb-4">
          <h2 className="text-4xl font-black text-white leading-tight mb-4 whitespace-pre-line">
            {SLIDES[activeSlide].headline.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1
                  ? <span style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{line}</span>
                  : line}
                {i < SLIDES[activeSlide].headline.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(219,234,254,0.75)' }}>
            {SLIDES[activeSlide].sub}
          </p>

          {/* Slide dots */}
          <div className="flex gap-2 mt-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="transition-all"
                style={{
                  width: i === activeSlide ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: i === activeSlide ? '#f59e0b' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom — Stats + Testimonial */}
        <div className="relative z-10 p-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {STATS.map((s, i) => (
              <div key={i} className="rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: 'rgba(148,163,184,0.9)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#f59e0b" stroke="none" />)}
            </div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(219,234,254,0.8)' }}>
              &ldquo;NAX membuat kami bisa lacak kiriman segar dari Jepang ke LA dalam hitungan menit. Sangat membantu!&rdquo;
            </p>
            <div className="flex items-center gap-2.5 mt-3">
              <img src="https://i.pravatar.cc/40?img=1" alt="" className="w-7 h-7 rounded-full"
                style={{ border: '1.5px solid rgba(245,158,11,0.4)' }} />
              <div>
                <p className="text-xs font-bold text-white">Hiroshi T.</p>
                <p className="text-xs" style={{ color: '#64748b' }}>Tsukiji Fish Market</p>
              </div>
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { icon: <Thermometer size={11} />, text: 'Cold Storage Monitor', color: '#60a5fa' },
              { icon: <Package size={11} />, text: 'Live Tracking', color: '#34d399' },
              { icon: <Shield size={11} />, text: 'Enkripsi TLS 1.3', color: '#f59e0b' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}35`, color: f.color }}>
                {f.icon}
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}