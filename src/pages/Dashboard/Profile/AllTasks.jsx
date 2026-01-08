import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../../context/AuthContext';
import { formatTime } from '../../../utils/helpers';

const AllTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Sadece 'todo' ve 'in_progress' olanları çek
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['todo', 'in_progress']) 
          .order('due_date', { ascending: true });

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  if (loading) return <div className="text-center text-xs text-cream-400 p-4">Yükleniyor...</div>;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-cream-900 mb-1">Bütün Görevler</h2>
      <p className="text-xs text-cream-400 mb-6">Henüz tamamlamadığın tüm aktif görevlerin.</p>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-xl border border-cream-100 shadow-sm flex items-center justify-between group hover:border-cream-300 transition-all">
              <div className="flex items-center gap-3">
                {/* Durum İkonu */}
                <div className={`w-2.5 h-2.5 rounded-full ${task.status === 'in_progress' ? 'bg-yellow-400' : 'bg-red-400'}`} title={task.status === 'in_progress' ? 'Yapılıyor' : 'Yapılacak'}></div>
                
                <div>
                  <p className="text-cream-900 font-medium text-sm">{task.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] text-cream-400 bg-cream-50 px-1.5 py-0.5 rounded border border-cream-100">
                       {new Date(task.due_date).toLocaleDateString('tr-TR')}
                     </span>
                     {task.due_time && <span className="text-[10px] text-cream-400">⏰ {task.due_time.slice(0,5)}</span>}
                  </div>
                </div>
              </div>
              <div className="text-xs text-cream-300 font-medium uppercase tracking-wider">
                {task.status === 'in_progress' ? 'Yapılıyor' : 'Bekliyor'}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-cream-400 text-sm bg-cream-50/50 rounded-2xl border border-dashed border-cream-200">
            Aktif görevin yok. Harika! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;