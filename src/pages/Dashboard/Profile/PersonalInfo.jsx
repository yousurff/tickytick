import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../services/supabase';
import Button from '../../../components/common/Button';

const PersonalInfo = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  
  // Form Verileri
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    birth_date: ''
  });

  // Silme Modalı State'leri
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // 1. Verileri Çek
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || user.email, // Mail auth'dan da gelebilir
        birth_date: data.birth_date || ''
      });
    } catch (error) {
      console.error('Profil yüklenirken hata:', error);
    }
  };

  // 2. Güncelleme İşlemi
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          birth_date: formData.birth_date,
        })
        .eq('id', user.id);

      if (error) throw error;
      setEditing(false);
      alert('Profil başarıyla güncellendi.');
    } catch (error) {
      alert('Hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Şifre Değiştirme (Basit Reset Maili Gönderimi)
  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: 'https://tickytick.vercel.app/update-password',
    });
    if (error) alert('Hata: ' + error.message);
    else alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
  };

  // 4. Hesap Silme (Soft Delete)
  const handleDeleteAccount = async () => {
    if (deleteConfirmationText !== 'sil') return;

    try {
      setLoading(true);
      // Hesabı tamamen silmek yerine "inactive" yapıyoruz
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'inactive' })
        .eq('id', user.id);

      if (error) throw error;

      await signOut(); // Çıkış yaptır
      window.location.href = '/login'; // Login'e at
    } catch (error) {
      alert('Hesap silinirken hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      
      {/* Başlık ve Düzenle Butonu */}
      <div className="flex justify-between items-center mb-8 border-b border-cream-200 pb-4">
        <h2 className="text-2xl font-bold text-cream-900">Kişisel Bilgiler</h2>
        {!editing && (
          <Button variant="outline" onClick={() => setEditing(true)} className="text-xs px-4 py-2">
            Düzenle ✎
          </Button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="space-y-6 flex-1">
        
        {/* İsim Soyisim */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-cream-400 mb-1 uppercase">İsim</label>
            <input
              type="text"
              disabled={!editing}
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-300 disabled:bg-transparent disabled:border-transparent disabled:px-0 disabled:font-bold disabled:text-lg disabled:text-cream-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-cream-400 mb-1 uppercase">Soyisim</label>
            <input
              type="text"
              disabled={!editing}
              value={formData.last_name}
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-300 disabled:bg-transparent disabled:border-transparent disabled:px-0 disabled:font-bold disabled:text-lg disabled:text-cream-900 transition-all"
            />
          </div>
        </div>

        {/* E-posta (DÜZENLENEMEZ) */}
        <div>
          <label className="block text-xs font-bold text-cream-400 mb-1 uppercase">E-posta (Değiştirilemez)</label>
          <input
            type="email"
            disabled
            value={formData.email}
            className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl text-gray-500 cursor-not-allowed font-medium"
          />
        </div>

        {/* Doğum Tarihi */}
        <div>
          <label className="block text-xs font-bold text-cream-400 mb-1 uppercase">Doğum Tarihi</label>
          <input
            type="date"
            disabled={!editing}
            value={formData.birth_date}
            onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
            className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-300 disabled:bg-transparent disabled:border-transparent disabled:px-0 disabled:text-cream-900 transition-all"
          />
        </div>

        {/* Düzenleme Modu Butonları */}
        {editing && (
          <div className="flex gap-4 pt-4 animate-in fade-in">
             <Button type="button" variant="ghost" onClick={() => setEditing(false)} className="flex-1">Vazgeç</Button>
             <Button type="submit" variant="primary" className="flex-1" disabled={loading}>Kaydet</Button>
          </div>
        )}
      </form>

      {/* --- TEHLİKELİ BÖLGE (Alt Kısım) --- */}
      <div className="mt-12 pt-8 border-t border-cream-200">
        <h3 className="text-sm font-bold text-red-900/70 mb-4 uppercase tracking-wider">Hesap İşlemleri</h3>
        
        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={handlePasswordReset}
            className="w-full text-left px-4 py-3 rounded-xl border border-cream-200 hover:bg-cream-50 text-cream-900 font-medium transition-colors flex justify-between items-center group"
          >
            Şifre Değiştir
            <span className="text-cream-400 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button 
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="w-full text-left px-4 py-3 rounded-xl border border-red-100 bg-red-50/30 hover:bg-red-50 text-red-600 font-medium transition-colors flex justify-between items-center"
          >
            Hesabımı Sil
            <span className="text-red-400">✕</span>
          </button>
        </div>
      </div>

      {/* --- HESAP SİLME MODALI --- */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl scale-100 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-red-600 mb-2">Hesabını silmek üzeresin!</h3>
            <p className="text-gray-600 text-sm mb-4">
              Bu işlem geri alınamaz. Hesabın inaktif duruma getirilecek ve bir daha giriş yapamayacaksın.
            </p>
            
            <label className="block text-xs font-bold text-gray-500 mb-2">
              Onaylamak için kutuya <span className="text-black">"sil"</span> yaz:
            </label>
            <input 
              type="text" 
              placeholder="sil"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:border-red-500 outline-none"
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
            />

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setDeleteModalOpen(false)} className="flex-1">Vazgeç</Button>
              <Button 
                variant="primary" 
                onClick={handleDeleteAccount} 
                disabled={deleteConfirmationText !== 'sil' || loading}
                className="flex-1 bg-red-600 hover:bg-red-700 border-red-600 text-white disabled:opacity-50"
              >
                Hesabı Sil
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PersonalInfo;