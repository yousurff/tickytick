import React, { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../../context/AuthContext';

const CompletedTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'done') // Sadece tamamlananlar
          .order('due_date', { ascending: false });

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
      <h2 className="text-xl font-bold text-cream-900 mb-1">Tamamlanmış Görevler</h2>
      <p className="text-xs text-cream-400 mb-6">Başarıyla bitirdiğin görevlerin listesi.</p>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="bg-green-50/30 p-4 rounded-xl border border-green-100 flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
               {/* Tik İkonu */}
               <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                 </svg>
               </div>
               
               <div className="flex-1">
                  <p className="text-cream-900 font-medium text-sm line-through decoration-green-300">{task.content}</p>
                  <p className="text-[10px] text-cream-400 mt-0.5">
                    Tamamlanma: {new Date(task.due_date).toLocaleDateString('tr-TR')}
                  </p>
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-cream-400 text-sm bg-cream-50/50 rounded-2xl border border-dashed border-cream-200">
            Henüz tamamlanmış görev yok. Hadi çalışmaya! 💪
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;