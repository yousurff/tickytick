import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  
  const linkClass = ({ isActive }) => 
    `block px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
      isActive 
        ? 'bg-cream-900 text-cream-50 shadow-md' 
        : 'text-cream-900 hover:bg-cream-200'
    }`;

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[600px]">
      
      {/* --- SOL SIDEBAR (SABİT) --- */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white/60 backdrop-blur-sm border border-cream-200 rounded-3xl p-6 shadow-sm h-full">
          <h3 className="text-xs font-bold text-cream-400 uppercase tracking-wider mb-4 ml-2">Profil Menüsü</h3>
          
          <nav className="space-y-2">
            <NavLink to="/dashboard/profile" end className={linkClass}>
              Kişisel Bilgiler
            </NavLink>
            <NavLink to="/dashboard/profile/all-tasks" className={linkClass}>
              Bütün Görevler
            </NavLink>
            <NavLink to="/dashboard/profile/past-tasks" className={linkClass}>
              Geçmiş Görevler
            </NavLink>
            <NavLink to="/dashboard/profile/completed-tasks" className={linkClass}>
              Tamamlanmış Görevler
            </NavLink>
            <NavLink to="/dashboard/profile/contact" className={linkClass}>
              İletişim & Yardım
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* --- SAĞ İÇERİK ALANI --- */}
      <div className="flex-1 bg-white/60 backdrop-blur-sm border border-cream-200 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden">
        <Outlet />
      </div>

    </div>
  );
};

export default ProfileLayout;