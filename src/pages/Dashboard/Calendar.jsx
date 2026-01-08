import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

// --- YARDIMCI FONKSİYONLAR ---
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0: Pazar, 1: Ptesi...

const months = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", 
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const Calendar = () => {
  const { user } = useAuth();
  
  // State'ler
  const [view, setView] = useState('year'); // 'year' veya 'month'
  const [currentDate, setCurrentDate] = useState(new Date()); // Şu anki seçili tarih (Ay/Yıl takibi için)
  const [selectedDayTasks, setSelectedDayTasks] = useState(null); // Tıklanan günün görevleri (Modal için)
  const [tasks, setTasks] = useState([]); // Tüm görev verisi
  const [loading, setLoading] = useState(true);

  // 1. Görevleri Çek (Takvimde işaretlemek için)
  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, content, due_date, due_time, status')
        .eq('user_id', user.id);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Takvim verisi çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  // Belirli bir günde görev var mı? Varsa döndür.
  const getTasksForDate = (day, month, year) => {
    // Tarih formatını 'YYYY-MM-DD'ye çevir (Ay ve Gün tek haneyse başına 0 ekle)
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.due_date === dateStr);
  };

  // Ay Görünümüne Geçiş
  const openMonthView = (monthIndex) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    setCurrentDate(newDate);
    setView('month');
  };

  // Bir güne tıklandığında
  const handleDayClick = (day, month, year) => {
    const dayTasks = getTasksForDate(day, month, year);
    // Seçilen tarihi ve görevleri state'e at (Modal açılır)
    setSelectedDayTasks({
      date: new Date(year, month, day),
      tasks: dayTasks
    });
  };

  // --- ALT BİLEŞENLER ---

  // 1. Tekil Ay Bileşeni (Hem Yıllık hem Aylık görünümde kullanılır)
  const MonthGrid = ({ year, month, isInteractive = false, isLarge = false }) => {
    const daysInMonth = getDaysInMonth(year, month);
    // Takvimde günlerin doğru sütuna gelmesi için boşluk bırakma (Pazartesi başlangıçlı yapmak için ayar)
    // Not: getDay() Pazar=0 döner. Biz Ptesi=0 olsun istiyorsak biraz kaydıracağız.
    // Türkiye'de hafta Pazartesi başlar.
    let startDay = getFirstDayOfMonth(year, month) - 1; 
    if (startDay === -1) startDay = 6; // Pazar ise en sona at

    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className={`flex flex-col ${isLarge ? 'h-full' : ''}`}>
        {/* Ay Başlığı */}
        <div 
          onClick={() => isInteractive && openMonthView(month)}
          className={`font-bold text-cream-900 mb-2 ${isInteractive ? 'cursor-pointer hover:text-cream-500 transition-colors' : ''} ${isLarge ? 'text-2xl mb-6' : 'text-sm'}`}
        >
          {months[month]} {isLarge && year}
        </div>

        {/* Günler Izgarası */}
        <div className="grid grid-cols-7 gap-1 flex-1">
          {/* Gün İsimleri (Sadece Büyük Görünümde) */}
          {isLarge && ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(d => (
            <div key={d} className="text-center text-xs text-cream-400 font-bold mb-2">{d}</div>
          ))}

          {/* Boşluklar */}
          {blanks.map((_, i) => <div key={`blank-${i}`} />)}

          {/* Gün Kutucukları */}
          {days.map(day => {
            const dayTasks = getTasksForDate(day, month, year);
            const hasTask = dayTasks.length > 0;
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            return (
              <div
                key={day}
                onClick={() => handleDayClick(day, month, year)}
                className={`
                  relative rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer group
                  ${isLarge ? 'h-24 border border-cream-200 hover:shadow-md bg-white' : 'h-8 text-xs hover:bg-cream-200 bg-white/50'}
                  ${isToday ? 'bg-cream-200 font-bold ring-1 ring-cream-400' : ''}
                `}
              >
                <span className={`text-cream-900 ${isLarge ? 'text-lg absolute top-2 left-2' : ''}`}>{day}</span>
                
                {/* Görev Varsa Nokta Koy */}
                {hasTask && (
                  <div className={`
                    rounded-full bg-cream-400 
                    ${isLarge ? 'absolute bottom-3 right-3 flex gap-1' : 'w-1 h-1 mt-0.5'}
                  `}>
                    {isLarge ? (
                      // Büyük görünümde görev sayısı kadar nokta (max 3)
                      dayTasks.slice(0, 3).map((_, i) => (
                         <div key={i} className="w-2 h-2 rounded-full bg-cream-900/40"></div>
                      ))
                    ) : null}
                  </div>
                )}
                
                {/* Büyük görünümde görev metni özeti (opsiyonel) */}
                {isLarge && dayTasks.length > 0 && (
                   <div className="hidden md:block mt-4 px-1 w-full">
                      <div className="text-[10px] bg-cream-100 rounded px-1 py-0.5 truncate text-cream-600">
                        {dayTasks[0].content}
                      </div>
                      {dayTasks.length > 1 && <div className="text-[9px] text-center text-cream-400">+{dayTasks.length - 1} tane daha</div>}
                   </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Header / Navigasyon */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold text-cream-900">Takvimim</h2>
        {view === 'month' && (
          <Button variant="ghost" onClick={() => setView('year')} className="text-sm">
            ← Yıllık Görünüme Dön
          </Button>
        )}
      </div>

      {/* --- YILLIK GÖRÜNÜM --- */}
      {view === 'year' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto pb-10">
          {months.map((_, index) => (
            <div key={index} className="bg-white/40 p-4 rounded-2xl border border-cream-100 hover:border-cream-300 transition-all hover:shadow-sm">
              <MonthGrid year={currentDate.getFullYear()} month={index} isInteractive={true} />
            </div>
          ))}
        </div>
      )}

      {/* --- AYLIK GÖRÜNÜM (Büyütülmüş) --- */}
      {view === 'month' && (
        <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-3xl border border-cream-200 p-6 shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
          {/* Ay Değiştirme Butonları */}
          <div className="flex justify-between mb-4">
             <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 hover:bg-cream-100 rounded-full">←</button>
             <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 hover:bg-cream-100 rounded-full">→</button>
          </div>
          <MonthGrid 
            year={currentDate.getFullYear()} 
            month={currentDate.getMonth()} 
            isLarge={true} 
            isInteractive={false} 
          />
        </div>
      )}

      {/* --- GÜN DETAY MODALI --- */}
      {selectedDayTasks && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-cream-200 scale-100 animate-in zoom-in-95">
            
            <div className="flex justify-between items-center mb-4 border-b border-cream-100 pb-2">
              <h3 className="font-bold text-lg text-cream-900">
                {selectedDayTasks.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              <button onClick={() => setSelectedDayTasks(null)} className="text-cream-400 hover:text-red-500">✕</button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-3">
              {selectedDayTasks.tasks.length > 0 ? (
                selectedDayTasks.tasks.map(task => (
                  <div key={task.id} className="bg-cream-50 p-3 rounded-xl border border-cream-100 flex items-start gap-3">
                    {/* Durum İkonu */}
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      task.status === 'done' ? 'bg-green-400' : 
                      task.status === 'in_progress' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    
                    <div>
                      <p className="text-sm font-medium text-cream-900">{task.content}</p>
                      {task.due_time && (
                        <p className="text-xs text-cream-400 mt-1">⏰ {task.due_time.slice(0, 5)}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-cream-400 text-sm py-4">Bu gün için planlanmış görev yok.</p>
              )}
            </div>

            <div className="mt-6">
              <Button variant="primary" onClick={() => setSelectedDayTasks(null)} className="w-full">
                Tamam
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Calendar;