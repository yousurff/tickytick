import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/common/Button';

const PastTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // Hangi görevi düzenliyoruz?
  const [newDate, setNewDate] = useState('');

  const fetchPastTasks = async () => {
    const today = new Date().toISOString().split('T')[0]; // Bugünün tarihi (YYYY-MM-DD)
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .lt('due_date', today) // Tarihi bugünden KÜÇÜK olanlar (lt = less than)
        .neq('status', 'done'); // Ve tamamlanmamış olanlar

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPastTasks(); }, [user]);

  // Tarihi Güncelleme Fonksiyonu
  const handleUpdateDate = async (taskId) => {
    if (!newDate) return;
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ due_date: newDate }) // Yeni tarihi kaydet
        .eq('id', taskId);

      if (error) throw error;
      
      setEditingId(null);
      setNewDate('');
      fetchPastTasks(); // Listeyi yenile (görev buradan kaybolup 'Bütün Görevler'e gidecek)
      alert("Görev yeniden planlandı ve aktif edildi!");
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  if (loading) return <div className="text-center text-xs text-cream-400 p-4">Yükleniyor...</div>;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-cream-900 mb-1">Geçmiş Görevler</h2>
      <p className="text-xs text-cream-400 mb-6">Zamanında tamamlayamadığın görevler. Tarihi değiştirerek aktif edebilirsin.</p>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="bg-red-50/40 p-4 rounded-xl border border-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div>
                <p className="text-cream-900 font-medium text-sm line-through opacity-70">{task.content}</p>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] text-red-500 font-bold bg-white px-1.5 py-0.5 rounded border border-red-100 flex items-center gap-1">
                     ⚠️ {new Date(task.due_date).toLocaleDateString('tr-TR')}
                   </span>
                </div>
              </div>

              {/* Düzenleme Alanı */}
              <div className="flex items-center gap-2">
                {editingId === task.id ? (
                  <div className="flex items-center gap-2 animate-in fade-in">
                    <input 
                      type="date" 
                      className="text-xs border border-cream-300 rounded-lg px-2 py-1.5 bg-white focus:outline-cream-400"
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                    <Button variant="primary" className="text-xs py-1.5 px-3" onClick={() => handleUpdateDate(task.id)}>Kaydet</Button>
                    <button onClick={() => setEditingId(null)} className="text-xs text-red-400 hover:text-red-600">✕</button>
                  </div>
                ) : (
                  <Button variant="outline" className="text-xs py-1.5 px-3 bg-white border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300" onClick={() => setEditingId(task.id)}>
                    Tarihi Güncelle
                  </Button>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-10 text-cream-400 text-sm bg-cream-50/50 rounded-2xl border border-dashed border-cream-200">
            Gecikmiş görevin yok. Tebrikler! 👏
          </div>
        )}
      </div>
    </div>
  );
};

export default PastTasks;