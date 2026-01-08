import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import { formatTime } from '../../utils/helpers';

const MyDay = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sütunların yapılandırması (Başlıklar ve ID'ler)
  const columns = {
    todo: { id: 'todo', title: 'Yapılacaklar', color: 'bg-red-50/50 border-red-100' },
    in_progress: { id: 'in_progress', title: 'Yapılıyor', color: 'bg-yellow-50/50 border-yellow-100' },
    done: { id: 'done', title: 'Yapıldı', color: 'bg-green-50/50 border-green-100' }
  };

  // 1. Görevleri Veritabanından Çek
  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Görevler çekilemedi:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Sürükleme Bittiğinde Çalışacak Fonksiyon
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Eğer geçerli bir yere bırakılmadıysa işlem yapma
    if (!destination) return;

    // Eğer aynı yere bırakıldıysa işlem yapma
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // --- Optimistik Güncelleme (Arayüzde hemen göster) ---
    const updatedTasks = tasks.map(t => 
      t.id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(updatedTasks);

    // --- Veritabanı Güncellemesi (Arkaplanda kaydet) ---
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: destination.droppableId })
        .eq('id', draggableId);

      if (error) throw error;
    } catch (error) {
      console.error('Durum güncellenemedi:', error);
      // Hata olursa eski haline döndür (opsiyonel ama güvenli)
      fetchTasks();
    }
  };

  // Görevleri sütunlara göre filtrele
  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  if (loading) return <div className="text-center p-10 text-cream-400">Yükleniyor...</div>;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-cream-900 mb-6 px-2">Günüm</h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          
          {Object.values(columns).map((column) => (
            <div key={column.id} className={`flex flex-col h-full rounded-3xl border ${column.color} backdrop-blur-sm p-4`}>
              
              {/* Sütun Başlığı */}
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-cream-900 text-sm uppercase tracking-wider">{column.title}</h3>
                <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-medium text-cream-500 shadow-sm">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>

              {/* Sürüklenebilir Alan */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 overflow-y-auto pr-2 space-y-3 transition-colors rounded-xl ${
                      snapshot.isDraggingOver ? 'bg-cream-100/30' : ''
                    }`}
                  >
                    {getTasksByStatus(column.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-xl border border-cream-100 shadow-sm group hover:shadow-md transition-all ${
                              snapshot.isDragging ? 'rotate-2 scale-105 shadow-xl ring-2 ring-cream-300 z-50' : ''
                            }`}
                          >
                            <p className="text-cream-900 font-medium text-sm leading-relaxed mb-3">
                              {task.content}
                            </p>
                            
                            <div className="flex items-center justify-between border-t border-cream-50 pt-2">
                              {/* Tarih/Saat */}
                              <div className="flex items-center gap-1.5 text-[10px] text-cream-400 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7v-1.25a.75.75 0 011.5 0V4h1.25c1.243 0 2.25 1.007 2.25 2.25v11.25c0 1.243-1.007 2.25-2.25 2.25h-13.5c-1.243 0-2.25-1.007-2.25-2.25V6.25c0-1.243 1.007-2.25 2.25-2.25H4.5V2.75A.75.75 0 015.75 2zm-1 5.5h10.5a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5z" clipRule="evenodd" />
                                </svg>
                                <span>{new Date(task.due_date).toLocaleDateString('tr-TR')}</span>
                                {task.due_time && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-cream-300"></span>
                                    <span>{task.due_time.slice(0, 5)}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MyDay;