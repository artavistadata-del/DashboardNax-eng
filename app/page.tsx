'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Package, Thermometer, Shield, Star } from 'lucide-react';

const STATS = [
  { value: '2,400+', label: 'Pengiriman per bulan' },
  { value: '99.2%', label: 'Tepat waktu' },
  { value: '18 negara', label: 'Jaringan global' },
];

const TESTIMONIAL = {
  text: '"NAX membuat kami bisa lacak kiriman segar dari Jepang ke LA dalam hitungan menit. Sangat membantu!"',
  name: 'Hiroshi T.',
  role: 'Tsukiji Fish Market',
  avatar: 'https://i.pravatar.cc/40?img=1',
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

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
    <div className="relative min-h-screen flex overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060e1f 0%, #0d1f4a 45%, #0a1535 100%)' }}>

      {/* ── Animated ambient background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing orbs */}
        <div className="animate-blob delay-0 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(42,77,179,0.25), transparent 65%)' }} />
        <div className="animate-blob delay-2000 absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent 65%)' }} />
        <div className="animate-blob delay-4000 absolute -bottom-48 left-1/4 w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 65%)' }} />

        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
          <defs>
            <pattern id="lgrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lgrid)" />
        </svg>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              background: i % 2 === 0 ? 'rgba(245,158,11,0.4)' : 'rgba(96,165,250,0.3)',
              top: `${10 + i * 11}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── LEFT PANEL — Brand Story ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] px-14 py-12 relative z-10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}>
            <Package size={20} className="text-white" />
          </div>
          <div>
            <span className="text-white font-black text-lg tracking-tight">NAX USA Logistics</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield size={10} className="text-green-400" />
              <span className="text-green-400 text-xs font-semibold">Terverifikasi & Aman</span>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="space-y-10">
          {/* Main headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
              🚀 Sistem manajemen logistik modern
            </div>
            <h1 className="text-5xl font-black text-white leading-tight">
              Kelola pengiriman<br />
              <span style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                lebih mudah
              </span>
            </h1>
            <p className="text-blue-200/70 text-base leading-relaxed max-w-md">
              Pantau kiriman udara & laut, kontrol suhu cold storage, dan kelola klien — semuanya dalam satu platform yang sederhana.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="flex flex-col gap-3">
            {[
              { icon: <Thermometer size={15}/>, text: 'Pantau suhu cold storage secara real-time', color: '#60a5fa' },
              { icon: <Package size={15}/>, text: 'Lacak status kiriman dari mana saja', color: '#34d399' },
              { icon: <Shield size={15}/>, text: 'Data aman & terenkripsi sepenuhnya', color: '#f59e0b' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${f.color}18`, color: f.color }}>
                  {f.icon}
                </div>
                <span className="text-sm font-medium text-blue-100/80">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" stroke="none" />)}
            </div>
            <p className="text-sm text-blue-100/80 italic leading-relaxed">{TESTIMONIAL.text}</p>
            <div className="flex items-center gap-2.5 mt-3">
              <img src={TESTIMONIAL.avatar} alt="" className="w-7 h-7 rounded-full border border-amber-400/30" />
              <div>
                <p className="text-xs font-bold text-white">{TESTIMONIAL.name}</p>
                <p className="text-xs" style={{ color: '#64748b' }}>{TESTIMONIAL.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-blue-300/30 text-xs">
          © 2026 NAX (U.S.A.), INC. · Los Angeles, CA · Semua hak dilindungi
        </p>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 relative z-10">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 16px rgba(245,158,11,0.4)' }}>
              <Package size={18} className="text-white" />
            </div>
            <span className="text-white font-black text-xl">NAX Logistics</span>
          </div>

          {/* Card */}
          <div className="animate-fade-up rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>

            {/* Top gradient accent */}
            <div className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #1e3a8a, #f59e0b, #10b981)' }} />

            <div className="p-7 sm:p-8">

              {/* Greeting */}
              <div className="mb-7">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
                  Selamat datang kembali 👋
                </h2>
                <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
                  Masuk untuk melanjutkan ke portal logistik Anda
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div className="mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium animate-fade-up"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                  <span className="flex-shrink-0 mt-0.5">⚠️</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/60 uppercase tracking-widest">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <input
                      id="login-email"
                      type="email"
                      placeholder="contoh: anda@naxusa.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        caretColor: '#f59e0b',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.border = '1.5px solid rgba(245,158,11,0.6)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-200/60 uppercase tracking-widest">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Masukkan kata sandi Anda"
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(''); }}
                      className="w-full pl-4 pr-12 py-3.5 rounded-xl text-sm font-medium text-white outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        caretColor: '#f59e0b',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.border = '1.5px solid rgba(245,158,11,0.6)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-all hover:opacity-60"
                      style={{ color: '#64748b' }}>
                      {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative w-4 h-4">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        className="peer w-4 h-4 rounded cursor-pointer accent-amber-400"
                      />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Link reset kata sandi telah dikirim ke email Anda.')}
                    className="text-sm font-semibold transition-all hover:opacity-80"
                    style={{ color: '#f59e0b' }}>
                    Lupa kata sandi?
                  </button>
                </div>

                {/* Submit button */}
                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-base font-black text-white relative overflow-hidden flex items-center justify-center gap-3 transition-all mt-2 group"
                  style={{
                    background: loading
                      ? 'rgba(245,158,11,0.4)'
                      : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: loading ? 'none' : '0 6px 24px rgba(245,158,11,0.45)',
                    transform: loading ? 'scale(0.99)' : 'scale(1)',
                  }}>
                  {/* Shimmer */}
                  {!loading && (
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)' }} />
                  )}
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    <>
                      Masuk ke Portal
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }}/>
                <span className="text-xs font-medium" style={{ color: '#475569' }}>atau coba dulu</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }}/>
              </div>

              {/* Demo quick fill */}
              <button
                id="demo-login-btn"
                onClick={quickFill}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#94a3b8',
                }}>
                🔑 Isi Otomatis Akun Demo
              </button>

              {/* Security note */}
              <p className="text-center text-xs mt-4 font-medium" style={{ color: '#334155' }}>
                🔒 Koneksi Anda aman & terenkripsi (TLS 1.3)
              </p>
            </div>
          </div>

          {/* Bottom */}
          <p className="text-center mt-5 text-xs font-medium" style={{ color: '#334155' }}>
            NAX (U.S.A.), INC. · 5343 W Imperial Hwy, Los Angeles CA · © 2026
          </p>
        </div>
      </div>
    </div>
  );
}