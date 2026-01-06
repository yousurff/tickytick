import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthLayout = () => {
  const { user } = useAuth();

  // Eğer kullanıcı zaten giriş yapmışsa Dashboard'a gönder
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4">
      {/* Üst Logo */}
      <div className="mb-8 text-center">
        <div className="w-12 h-12 bg-cream-900 rounded-lg flex items-center justify-center text-cream-50 font-bold text-2xl mx-auto mb-3">
            T
        </div>
        <h1 className="text-2xl font-bold text-cream-900">Ticky Tick</h1>
      </div>

      {/* Form Alanı (Beyaz Kutu) */}
      <div className="w-full max-w-md bg-white/50 backdrop-blur-sm border border-cream-200 rounded-2xl shadow-xl p-8">
        <Outlet /> 
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-sm text-cream-400">
        &copy; 2026 Ticky Tick
      </p>
    </div>
  );
};

export default AuthLayout;