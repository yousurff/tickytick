import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabase';
import Button from '../common/Button';

const CreateTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [taskContent, setTaskContent] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]); // Bugün
  const [dueTime, setDueTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            user_id: user.id,
            content: taskContent,
            due_date: dueDate,
            due_time: dueTime || null, // Saat seçilmediyse boş gönder
            status: 'todo', // Başlangıç durumu
            recurrence: 'none' // Şimdilik tekrar yok
          }
        ]);

      if (error) throw error;

      // Başarılı olursa
      setTaskContent('');
      setDueTime('');
      onSuccess?.(); // Listeyi yenilemesi için tetikleyici
      onClose(); // Modalı kapat

    } catch (error) {
      console.error('Görev eklenirken hata:', error.message);
      alert('Hata: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-cream-200 scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Başlık */}
        <div className="bg-cream-100 px-6 py-4 border-b border-cream-200 flex justify-between items-center">
          <h3 className="font-bold text-cream-900">Yeni Görev</h3>
          <button onClick={onClose} className="text-cream-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Görev Metni */}
          <div>
            <label className="block text-xs font-bold text-cream-400 mb-1 ml-1 uppercase">GÖREV</label>
            <textarea
              autoFocus
              required
              rows={3}
              maxLength={999}
              placeholder="Ne yapılması gerekiyor?"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-300 resize-none text-cream-900"
            />
            <div className="text-right text-[10px] text-cream-300 mt-1">
              {taskContent.length}/999
            </div>
          </div>

          {/* Tarih ve Saat */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-cream-400 mb-1 ml-1 uppercase">TARİH</label>
              <input 
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-300 text-cream-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-cream-400 mb-1 ml-1 uppercase">SAAT (Opsiyonel)</label>
              <input 
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-300 text-cream-900 text-sm"
              />
            </div>
          </div>

          {/* Aksiyonlar */}
          <div className="pt-2 flex gap-3">
             <Button type="button" variant="ghost" onClick={onClose} className="flex-1 bg-gray-50 text-gray-500">
               Vazgeç
             </Button>
             <Button type="submit" variant="primary" className="flex-[2]" disabled={loading}>
               {loading ? 'Ekleniyor...' : 'Listeye Ekle'}
             </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;