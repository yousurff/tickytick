import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGreeting, formatDate, formatTime } from '../utils/helpers';
import Button from '../components/common/Button';

const MainLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Anlık saat gösterimi için state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Saati her saniye güncelle
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Menü linkleri için aktiflik sınıfı
  const navLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-cream-900 font-bold' : 'text-cream-400 hover:text-cream-900'
    }`;

  // Kullanıcı ismini al (Auth verisinden veya varsayılan)
  // Not: Supabase user metadata içinde isim verisini sakladıysak oradan çekeriz.
  // Şimdilik user.email veya metadata'dan alalım.
  const userName = user?.user_metadata?.first_name || 'Kullanıcı';

  return (
    <div className="min-h-screen bg-cream-50 font-sans flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="bg-cream-200/80 backdrop-blur-md px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        
        {/* SOL KISIM: Görev Ekle Butonu + Selamlama */}
        <div className="flex items-center gap-4">
          {/* Görev Ekle Butonu (Kare Kutucuk + Artı) [cite: 8, 11] */}
          <button 
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-cream-900 shadow-sm hover:shadow-md transition-all hover:scale-105 group"
            title="Yeni Görev Ekle"
            // Buraya ileride Modal açma fonksiyonu gelecek
            onClick={() => console.log('Görev Ekle')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          {/* Selamlama ve Tarih [cite: 8, 9] */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-cream-900 leading-tight">
              {getGreeting()} {userName}
            </h1>
            <span className="text-xs text-cream-400 font-medium tracking-wide">
              {formatDate(currentTime)} {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* ORTA KISIM: Menü [cite: 10] */}
        <nav className="hidden md:flex items-center gap-12">
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

        {/* SAĞ KISIM: Güvenli Çıkış [cite: 9] */}
        <div>
          <Button variant="ghost" onClick={handleLogout} className="text-xs text-cream-400 hover:text-red-400 hover:bg-red-50 px-4 py-2">
            Güvenli Çıkış
          </Button>
        </div>
      </header>

      {/* --- SAYFA İÇERİĞİ --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;