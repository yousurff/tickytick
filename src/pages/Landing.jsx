import React from 'react';
import Button from '../components/common/Button';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-cream-900 font-sans">
      
      {/* --- HEADER --- */}
      <header className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        {/* Sol Üst: Logo ve İsim  */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cream-900 rounded-md flex items-center justify-center text-cream-50 font-bold text-lg">
            T
          </div>
          <span className="text-xl font-bold tracking-tight">Ticky Tick</span>
        </div>

        {/* Sağ Üst: Giriş ve Kayıt Butonları  */}
        <div className="flex gap-4">
          <Button to="/login" variant="ghost">
            Giriş Yap
          </Button>
          <Button to="/register" variant="primary">
            Kayıt Ol
          </Button>
        </div>
      </header>

      {/* --- MAIN CONTENT (HERO) --- */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10">
        
        {/* Başlık ve Açıklama  */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-cream-900">
          Zamanı Yönet,<br />
          <span className="text-cream-400">Hayatı Yakala.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Modern, sade ve plaza şıklığında bir iş takip deneyimi. 
          Gününüzü planlayın, görevlerinizi organize edin ve üretkenliğinizi artırın.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button to="/register" variant="primary" className="px-10 py-4 text-lg">
            Hemen Başla
          </Button>
          <Button to="/login" variant="outline" className="px-10 py-4 text-lg">
             Daha Fazla Bilgi
          </Button>
        </div>

        {/* Görsel Temsili (İleride ekran görüntüsü konabilir) */}
        <div className="mt-20 w-full max-w-5xl h-64 md:h-96 bg-cream-200 rounded-t-3xl border-t border-l border-r border-cream-300 shadow-xl flex items-center justify-center">
           <p className="text-cream-400 font-medium">Uygulama Önizleme Alanı</p>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-6 text-center text-sm text-cream-400">
        &copy; 2026 Ticky Tick. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default Landing;