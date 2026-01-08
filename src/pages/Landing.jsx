import React from 'react';
import Button from '../components/common/Button';

// LOGOYU BURADAN İÇERİ AKTARIYORUZ
import logo from '../assets/logo/ticky_tick_logo.png';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-cream-900 font-sans overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* LOGO GÜNCELLEMESİ */}
          <img 
            src={logo} 
            alt="Logo" 
            className="w-12 h-12 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-cream-900">Ticky Tick</span>
        </div>

        {/* Butonlar */}
        <div className="flex gap-4">
          <Button to="/login" variant="ghost" className="hidden sm:inline-flex">
            Giriş Yap
          </Button>
          <Button to="/register" variant="primary">
            Kayıt Ol
          </Button>
        </div>
      </header>

      {/* --- MAIN HERO SECTION --- */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative">
        
        <div className="absolute top-10 left-10 w-64 h-64 bg-cream-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-cream-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-cream-900 leading-tight">
            Zamanı Yönet,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-400 to-cream-900">
              Hayatı Yakala.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Karmaşadan uzak, sade ve modern bir iş takip deneyimi. 
            "Ticky Tick" ile gününü planla, hedeflerine odaklan.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button to="/register" variant="primary" className="px-12 py-4 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Hemen Başla
            </Button>
            <Button to="/login" variant="outline" className="px-12 py-4 text-lg border-cream-900">
               Hesabım Var
            </Button>
          </div>
        </div>

        <div className="mt-20 w-full max-w-6xl mx-auto px-4">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-t-3xl shadow-2xl p-4 h-48 md:h-80 flex items-center justify-center">
             <span className="text-cream-400 font-medium tracking-widest text-sm uppercase">
               • Uygulama Önizleme •
             </span>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-cream-400 font-medium">
        &copy; 2026 Ticky Tick. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Landing;