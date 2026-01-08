import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthLayout = () => {
  const { user } = useAuth();

  // Eğer kullanıcı zaten giriş yapmışsa Dashboard'a gönder
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- Arka Plan Süslemeleri (Landing ile uyumlu) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 w-72 h-72 bg-cream-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
         <div className="absolute bottom-10 right-10 w-72 h-72 bg-cream-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      {/* --- Ana Kart --- */}
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 z-10 relative">
        
        {/* Logo ve Başlık */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-2 group">
            <div className="w-10 h-10 bg-cream-900 rounded-xl flex items-center justify-center text-cream-50 font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                T
            </div>
            <span className="text-2xl font-bold tracking-tight text-cream-900">Ticky Tick</span>
          </Link>
        </div>

        {/* Değişen İçerik (Login veya Register buraya gelir) */}
        <Outlet /> 
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-xs text-cream-400 font-medium z-10">
        &copy; 2026 Ticky Tick
      </p>
    </div>
  );
};

export default AuthLayout;