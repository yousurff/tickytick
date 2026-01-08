import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGreeting, formatDate, formatTime } from '../utils/helpers';
import Button from '../components/common/Button';

// LOGOYU BURADAN İÇERİ AKTARIYORUZ
import logo from '../assets/logo/ticky_tick_logo.png';

const MainLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
      isActive 
        ? 'text-cream-900 font-bold bg-white/50 shadow-sm' 
        : 'text-cream-400 hover:text-cream-900 hover:bg-white/30'
    }`;

  const userName = user?.user_metadata?.first_name || 'Kullanıcı';

  return (
    <div className="min-h-screen bg-cream-50 font-sans flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="bg-[#D2CFC2] px-8 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        
        {/* SOL: Logo ve Selamlama */}
        <div className="flex items-center gap-4">
          
          {/* LOGO GÜNCELLEMESİ */}
          <img 
            src={logo} 
            alt="Ticky Tick Logo" 
            className="w-10 h-10 object-contain drop-shadow-sm"
          />

          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white drop-shadow-sm leading-none mb-1">
              {getGreeting()} {userName}
            </h1>
            <span className="text-[10px] text-cream-50/80 font-medium tracking-wider uppercase">
              {formatDate(currentTime)} {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* ORTA: Menü */}
        <nav className="hidden md:flex items-center gap-2 bg-black/5 p-1 rounded-xl backdrop-blur-sm">
          <NavLink to="/dashboard" className={navLinkClass}>
            Günüm
          </NavLink>
          <NavLink to="/calendar" className={navLinkClass}>
            Takvimim
          </NavLink>
          <NavLink to="/dashboard/profile" className={navLinkClass}>
            Kişisel Bilgiler
          </NavLink>
        </nav>

        {/* SAĞ: Çıkış */}
        <div>
          <Button variant="ghost" onClick={handleLogout} className="text-xs text-white bg-white/20 hover:bg-white/30 border border-white/30 rounded-full px-5 py-1.5 transition-all">
            Güvenli Çıkış
          </Button>
        </div>
      </header>

      {/* --- İÇERİK --- */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <div className="bg-cream-100/50 min-h-[500px] rounded-3xl border border-cream-200/50 p-6 shadow-sm">
           <Outlet />
        </div>
      </main>

    </div>
  );
};

export default MainLayout;