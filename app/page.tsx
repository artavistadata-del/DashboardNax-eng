'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f1f5f9]">
      
      {/* --- INJEKSI CSS ANIMASI KHUSUS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -20px); }
          100% { transform: translate(-50%, 0px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />

      {/* Background Animated Blobs (Matching Dashboard Light Theme) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-400/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-400/30 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

      {/* Light Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-lg p-10 mx-4 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
        
        {/* Character / 3D Asset Illustration */}
        <div className="absolute -top-28 left-1/2 animate-float">
          <img 
            src="https://cdn3d.iconscout.com/3d/premium/thumb/delivery-boy-5692601-4743380.png" 
            alt="Logistics Character" 
            className="w-44 h-44 object-contain drop-shadow-2xl"
          />
        </div>

        <div className="mt-14 text-center mb-8">
          <div className="flex justify-center items-center text-[#1e3a8a] mb-2">
            <Plane className="w-8 h-8 mr-2 text-orange-500" />
            <h1 className="text-3xl font-black tracking-wider">NAX-Nest</h1>
          </div>
          <p className="text-gray-500 text-sm font-bold tracking-wide uppercase">Secure Logistics Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-[#1e3a8a] transition-colors" />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/60 focus:bg-white border border-white/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all shadow-inner font-bold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-[#1e3a8a] transition-colors" />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/60 focus:bg-white border border-white/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] transition-all shadow-inner font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#1e3a8a] to-[#2a4db3] hover:from-[#152a6b] hover:to-[#1e3a8a] text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border border-blue-400/20 mt-4"
          >
            Sign In to Workspace
          </button>
        </form>
      </div>
    </div>
  );
}