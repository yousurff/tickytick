import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGreeting, formatDate, formatTime } from '../utils/helpers';
import Button from '../components/common/Button';
import CreateTaskModal from '../components/ui/CreateTaskModal'; // Modal'ı içe aktardık
import logo from '../assets/logo/ticky_tick_logo.png';

const MainLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Modalın açık/kapalı durumu
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Yeni görev eklenince çalışacak fonksiyon (İleride listeyi yenilemek için kullanacağız)
  const handleTaskAdded = () => {
    // Sayfa yenilenmeden veriyi çekmek için buraya global bir state veya context eklenebilir.
    // Şimdilik sayfayı yenilemek en basit çözüm:
    window.location.reload(); 
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

        {/* ORTA: Menü ve GÖREV EKLE BUTONU */}
        <div className="hidden md:flex items-center gap-3 bg-black/5 p-1.5 rounded-xl backdrop-blur-sm">
          
          {/* Menü Linkleri */}
          <nav className="flex items-center gap-1">
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

          {/* Ayırıcı Çizgi */}
          <div className="w-px h-6 bg-cream-900/10 mx-1"></div>

          {/* GÖREV EKLEME BUTONU (Kare ve Artı) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-9 h-9 bg-cream-900 hover:bg-cream-800 text-cream-50 rounded-lg flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
            title="Yeni Görev Ekle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>

        </div>

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

      {/* --- GÖREV EKLEME MODALI --- */}
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTaskAdded}
      />

    </div>
  );
};

export default MainLayout;