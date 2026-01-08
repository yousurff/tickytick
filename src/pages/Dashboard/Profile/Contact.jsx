import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-cream-200 rounded-xl overflow-hidden bg-white/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left flex justify-between items-center text-sm font-bold text-cream-900 hover:bg-cream-50 transition-colors"
      >
        {question}
        <span className={`text-cream-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white text-xs text-gray-600 leading-relaxed border-t border-cream-100">
          {answer}
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2">
      <h2 className="text-xl font-bold text-cream-900 mb-1">İletişim & Yardım</h2>
      <p className="text-xs text-cream-400 mb-8">Soruların mı var? Sana yardımcı olalım.</p>

      {/* İletişim Kutusu */}
      <div className="bg-cream-900 text-cream-50 p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        
        <h3 className="font-bold text-lg mb-2">Bize Ulaşın</h3>
        <p className="text-cream-200 text-xs mb-4">
          Her türlü görüş, öneri ve teknik destek için e-posta adresimizden bize ulaşabilirsin.
        </p>
        
        <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cream-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="font-mono text-sm tracking-wide">destek@tickytick.com</span>
        </div>
      </div>

      {/* SSS Bölümü */}
      <h3 className="font-bold text-cream-900 mb-4 text-sm uppercase tracking-wider">Sıkça Sorulan Sorular</h3>
      <div className="space-y-3">
        <FaqItem 
          question="Görevlerimi nasıl düzenlerim?" 
          answer="Görevlerini 'Günüm' sayfasındaki kartları sürükleyip bırakarak veya takvim üzerinden görüntüleyerek yönetebilirsin. Düzenlemek için karta tıklaman yeterli." 
        />
        <FaqItem 
          question="Geçmiş görevlerimi nasıl kurtarırım?" 
          answer="'Geçmiş Görevler' sekmesine git. Orada zamanı geçmiş görevlerini göreceksin. 'Tarihi Güncelle' butonuna basarak yeni bir tarih seçersen görev tekrar aktif listene düşecektir." 
        />
        <FaqItem 
          question="Hesabımı silersem verilerim kaybolur mu?" 
          answer="Hesabını sildiğinde profilin 'inaktif' duruma geçer ve bir daha giriş yapamazsın. Güvenlik gereği verilerin veritabanından anında silinmez ancak erişilemez hale gelir." 
        />
        <FaqItem 
          question="Uygulama ücretsiz mi?" 
          answer="Evet, Ticky Tick şu an tamamen ücretsizdir. Keyfini çıkarın!" 
        />
      </div>

      <div className="mt-8 text-center text-[10px] text-cream-300">
        Ticky Tick v1.0.0 • Made with ❤️ by Yusuf
      </div>

    </div>
  );
};

export default Contact;