'use client';

import { useState } from 'react';
import {
  Package, TrendingUp, Clock, Star, Edit2, Camera, MapPin, Mail, Phone,
  Globe, Shield, Award, CheckCircle2, BarChart2, Calendar, ExternalLink,
  Zap, Users, Plane, Ship
} from 'lucide-react';
import { useToast } from './Toast';

const STATS = [
  { label: 'Shipments Handled', value: '1,284', icon: Package, color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)', change: '+12%' },
  { label: 'On-Time Rate', value: '98.7%', icon: Clock, color: '#10b981', bg: 'rgba(16,185,129,0.08)', change: '+0.4%' },
  { label: 'Revenue Generated', value: '$4.2M', icon: TrendingUp, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', change: '+18%' },
  { label: 'Client Rating', value: '4.9/5', icon: Star, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', change: '+0.2' },
];

const ACTIVITY = [
  { icon: <Package size={14}/>, color: '#1e3a8a', bg: 'rgba(30,58,138,0.1)', title: 'New shipment created', desc: 'NAX-20240508 — Japan Premium Beef · 320 kg', time: '2 hours ago' },
  { icon: <CheckCircle2 size={14}/>, color: '#10b981', bg: 'rgba(16,185,129,0.1)', title: 'Delivery confirmed', desc: 'NAX-20240502 — Pacific Wagyu Co. delivered to LAX', time: '5 hours ago' },
  { icon: <Users size={14}/>, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'New client onboarded', desc: 'Vietnam Seafood Export Ltd. registered', time: 'Yesterday' },
  { icon: <BarChart2 size={14}/>, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', title: 'Monthly report generated', desc: 'April 2026 operations report sent to management', time: '2 days ago' },
  { icon: <Shield size={14}/>, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', title: 'Security login detected', desc: 'New device login from Los Angeles, CA', time: '3 days ago' },
];

const BADGES = [
  { icon: '🏆', label: 'Top Performer', desc: 'Q1 2026', color: '#f59e0b' },
  { icon: '⚡', label: 'Fast Responder', desc: 'Avg < 2h', color: '#1e3a8a' },
  { icon: '🌐', label: 'Global Ops', desc: '18 countries', color: '#10b981' },
  { icon: '🔒', label: 'Verified User', desc: 'Since 2022', color: '#8b5cf6' },
];

const SKILLS = [
  { label: 'Air Freight', value: 95 },
  { label: 'Cold Chain', value: 88 },
  { label: 'Ocean Cargo', value: 76 },
  { label: 'Customs & Compliance', value: 82 },
];

export default function ProfileView() {
  const { showToast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Abraham',
    role: 'Operations Manager',
    email: 'john.abraham@naxusa.com',
    phone: '+1 310-555-0199',
    location: 'Los Angeles, CA',
    bio: 'Experienced logistics operations manager specializing in cold-chain freight, customs clearance, and US–Asia trade lanes. Passionate about delivering precision and speed.',
    joined: 'March 2022',
  });

  const save = () => {
    setEditMode(false);
    showToast('success', 'Profile updated!', 'Your changes have been saved.');
  };

  return (
    <div className="space-y-6 animate-fade-up">

      {/* ── Hero Banner ── */}
      <div className="glass-card overflow-hidden">
        {/* Cover gradient */}
        <div className="h-36 relative"
          style={{ background: 'linear-gradient(135deg, #0f2557 0%, #1e3a8a 45%, #2a4db3 70%, #f59e0b 100%)' }}>
          {/* Decorative grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pg)"/>
          </svg>
          {/* Route lines decoration */}
          <div className="absolute inset-0 flex items-center justify-end pr-10 gap-6 opacity-20">
            <Plane size={28} className="text-white rotate-12"/>
            <Ship size={32} className="text-white"/>
          </div>
          {/* Edit cover btn */}
          <button
            onClick={() => showToast('info', 'Cover photo upload coming soon')}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-80"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
            <Camera size={12}/> Edit Cover
          </button>
        </div>

        {/* Profile info row */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile"
                className="w-20 h-20 rounded-2xl border-4 border-white object-cover shadow-lg"/>
              <button
                onClick={() => showToast('info', 'Photo upload coming soon')}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md transition-all hover:scale-110"
                style={{ background: '#f59e0b' }}>
                <Camera size={12}/>
              </button>
            </div>

            {/* Name + Role */}
            <div className="flex-1 min-w-0 pt-2 sm:pt-0">
              {editMode ? (
                <div className="flex flex-col gap-2">
                  <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="text-xl font-black rounded-lg px-3 py-1.5 outline-none w-full sm:w-64"
                    style={{ border: '1.5px solid #1e3a8a', color: '#0f172a', background: '#f8fafc' }}/>
                  <input value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}
                    className="text-sm font-semibold rounded-lg px-3 py-1.5 outline-none w-full sm:w-48"
                    style={{ border: '1.5px solid #e2e8f0', color: '#64748b', background: '#f8fafc' }}/>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#0f172a' }}>{profile.name}</h2>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: '#64748b' }}>{profile.role}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Online
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}>
                      <MapPin size={10}/> {profile.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.04)', color: '#64748b' }}>
                      <Calendar size={10}/> Joined {profile.joined}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 flex-shrink-0">
              {editMode ? (
                <>
                  <button onClick={save}
                    className="px-5 py-2 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}>
                    Save Changes
                  </button>
                  <button onClick={() => setEditMode(false)}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-80"
                    style={{ background: 'rgba(0,0,0,0.06)', color: '#64748b' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}>
                  <Edit2 size={14}/> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-2xl">
            {editMode ? (
              <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                style={{ border: '1.5px solid #e2e8f0', color: '#475569', background: '#f8fafc', fontFamily: 'Inter' }}/>
            ) : (
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i}
              className="glass-card p-5 flex flex-col gap-3 cursor-pointer hover:scale-[1.02] transition-transform group animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => showToast('info', s.label, `${s.value} — ${s.change} vs last quarter`)}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>{s.label}</p>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: s.bg }}>
                  <Icon size={16} style={{ color: s.color }}/>
                </div>
              </div>
              <p className="text-2xl font-black" style={{ color: '#0f172a' }}>{s.value}</p>
              <span className="text-xs font-bold text-emerald-600">{s.change} this quarter</span>
            </div>
          );
        })}
      </div>

      {/* ── Two Column ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT — Contact + Skills + Badges */}
        <div className="space-y-5">

          {/* Contact Info */}
          <div className="glass-card p-5">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>Contact Info</h3>
            <div className="space-y-3">
              {[
                { icon: <Mail size={15}/>, label: 'Email', val: profile.email, color: '#1e3a8a' },
                { icon: <Phone size={15}/>, label: 'Phone', val: profile.phone, color: '#10b981' },
                { icon: <MapPin size={15}/>, label: 'Location', val: profile.location, color: '#f59e0b' },
                { icon: <Globe size={15}/>, label: 'Portal', val: 'naxusa.com/portal', color: '#8b5cf6' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c.color}12`, color: c.color }}>
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{c.label}</p>
                    <p className="text-sm font-semibold truncate" style={{ color: '#1e293b' }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => showToast('info', 'Opening email client...')}
              className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #2a4db3)', boxShadow: '0 4px 12px rgba(30,58,138,0.25)' }}>
              Send Message
            </button>
          </div>

          {/* Skills */}
          <div className="glass-card p-5">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>Expertise</h3>
            <div className="space-y-4">
              {SKILLS.map((sk, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: '#475569' }}>{sk.label}</span>
                    <span className="text-xs font-black" style={{ color: '#0f172a' }}>{sk.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${sk.value}%`,
                        background: sk.value > 90 ? '#1e3a8a' : sk.value > 80 ? '#10b981' : '#f59e0b'
                      }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="glass-card p-5">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((b, i) => (
                <div key={i}
                  className="rounded-xl p-3 text-center cursor-pointer hover:scale-[1.03] transition-transform"
                  style={{ background: `${b.color}0a`, border: `1px solid ${b.color}25` }}
                  onClick={() => showToast('info', b.label, b.desc)}>
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <p className="text-xs font-black" style={{ color: b.color }}>{b.label}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Activity + Quick Actions */}
        <div className="lg:col-span-2 space-y-5">

          {/* Quick Actions */}
          <div className="glass-card p-5">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: <Package size={18}/>, label: 'New Shipment', color: '#1e3a8a', bg: 'rgba(30,58,138,0.08)' },
                { icon: <Users size={18}/>, label: 'Add Client', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
                { icon: <BarChart2 size={18}/>, label: 'View Report', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
                { icon: <ExternalLink size={18}/>, label: 'Export Data', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
              ].map((a, i) => (
                <button key={i}
                  onClick={() => showToast('info', `${a.label}`, 'Navigating...')}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all hover:scale-[1.04] group"
                  style={{ background: a.bg, border: `1px solid ${a.color}20` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: 'white', boxShadow: `0 4px 12px ${a.color}25` }}>
                    <span style={{ color: a.color }}>{a.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-center leading-tight" style={{ color: '#475569' }}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Recent Activity</h3>
                <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>Your latest actions and updates</p>
              </div>
              <button
                onClick={() => showToast('info', 'Loading full activity log...')}
                className="flex items-center gap-1.5 text-xs font-bold transition-all hover:opacity-70"
                style={{ color: '#1e3a8a' }}>
                View all <ExternalLink size={11}/>
              </button>
            </div>

            <div className="space-y-0">
              {ACTIVITY.map((a, i) => {
                const isLast = i === ACTIVITY.length - 1;
                return (
                  <div key={i} className="flex gap-4 group cursor-default"
                    onClick={() => showToast('info', a.title, a.desc)}>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ background: a.bg, color: a.color }}>
                        {a.icon}
                      </div>
                      {!isLast && <div className="w-px flex-1 my-2 min-h-[20px]" style={{ background: 'rgba(0,0,0,0.07)' }}/>}
                    </div>
                    <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{a.title}</p>
                        <span className="text-xs font-medium flex-shrink-0" style={{ color: '#94a3b8' }}>{a.time}</span>
                      </div>
                      <p className="text-xs font-medium mt-0.5" style={{ color: '#64748b' }}>{a.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Snapshot */}
          <div className="glass-card p-5">
            <h3 className="font-black text-base mb-4" style={{ color: '#0f172a' }}>Performance Snapshot — May 2026</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Shipments This Month', value: '84', sub: 'vs 72 last month', color: '#1e3a8a' },
                { label: 'Avg. Response Time', value: '1.8h', sub: 'SLA target: 2h', color: '#10b981' },
                { label: 'Revenue Contribution', value: '$340K', sub: '+22% vs April', color: '#f59e0b' },
              ].map((p, i) => (
                <div key={i} className="rounded-2xl p-4 text-center"
                  style={{ background: `${p.color}08`, border: `1px solid ${p.color}15` }}>
                  <p className="text-2xl font-black" style={{ color: p.color }}>{p.value}</p>
                  <p className="text-xs font-black mt-1" style={{ color: '#475569' }}>{p.label}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
