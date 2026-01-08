import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// LOGOYU BURADAN İÇERİ AKTARIYORUZ
import logo from '../assets/logo/ticky_tick_logo.png';

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 w-72 h-72 bg-cream-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
         <div className="absolute bottom-10 right-10 w-72 h-72 bg-cream-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 z-10 relative">
        
        {/* Logo Alanı */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-2 group">
            {/* LOGO GÜNCELLEMESİ */}
            <img 
              src={logo} 
              alt="Logo" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="text-2xl font-bold tracking-tight text-cream-900">Ticky Tick</span>
          </Link>
        </div>

        <Outlet /> 
      </div>
      
      <p className="mt-8 text-xs text-cream-400 font-medium z-10">
        &copy; 2026 Ticky Tick
      </p>
    </div>
  );
};

export default AuthLayout;