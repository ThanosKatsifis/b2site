import React from 'react';
import { DaySchedule } from '../types';
import { Clock, Calendar } from 'lucide-react';

const scheduleData: DaySchedule[] = [
  { day: 'Δευτέρα', subjects: ['Μαθηματικά', 'Αρχαία', 'Γυμναστική', 'Φυσική', 'Αγγλικά', 'Κενό', 'Κενό'] },
  { day: 'Τρίτη', subjects: ['Λογοτεχνία', 'Ιστορία', 'Βιολογία', 'Μαθηματικά', 'Πληροφορική', 'Πληροφορική', 'Θρησκευτικά'] },
  { day: 'Τετάρτη', subjects: ['Χημεία', 'Γεωγραφία', 'Αρχαία', 'Νέα Ελληνικά', 'Γαλλικά/Γερμανικά', 'Μουσική', 'Κενό'] },
  { day: 'Πέμπτη', subjects: ['Φυσική', 'Μαθηματικά', 'Ιστορία', 'Τεχνολογία', 'Καλλιτεχνικά', 'Οικιακή Οικονομία', 'ΣΕΠ'] },
  { day: 'Παρασκευή', subjects: ['Γυμναστική', 'Αγγλικά', 'Αρχαία', 'Οδύσσεια', 'Νέα Ελληνικά', 'Μαθηματικά', 'Κενό'] },
];

const hours = ['08:15 - 09:00', '09:05 - 09:50', '10:00 - 10:45', '10:55 - 11:40', '11:50 - 12:35', '12:40 - 13:25', '13:30 - 14:10'];

export const Schedule: React.FC = () => {
  const todayIndex = new Date().getDay() - 1; // 0 for Monday
  
  return (
    <div className="flex flex-col gap-8 animate-slide-up">
      <div className="text-center mb-6">
        <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
          <Calendar size={32} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">
          Ωρολόγιο Πρόγραμμα
        </h2>
        <p className="text-slate-400">Μην αργήσεις στο μάθημα!</p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="p-6 font-bold text-slate-400 w-32 sticky left-0 bg-dark/95 backdrop-blur z-20">
                  <div className="flex items-center gap-2"><Clock size={16} /> Ώρα</div>
                </th>
                {scheduleData.map((day, idx) => (
                  <th 
                    key={day.day} 
                    className={`p-6 font-bold text-center text-lg min-w-[140px] ${
                      todayIndex === idx ? 'text-accent bg-accent/5' : 'text-slate-200'
                    }`}
                  >
                    {day.day}
                    {todayIndex === idx && <div className="h-1 w-full bg-accent mt-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, hourIdx) => (
                <tr key={hour} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-sm font-mono text-slate-400 border-r border-white/5 bg-dark/30 sticky left-0 backdrop-blur z-10">
                    {hour}
                  </td>
                  {scheduleData.map((day, dayIdx) => (
                    <td 
                      key={`${day.day}-${hourIdx}`} 
                      className={`p-4 text-center border-r border-white/5 last:border-0 relative group ${
                        todayIndex === dayIdx ? 'bg-accent/5' : ''
                      }`}
                    >
                      {day.subjects[hourIdx] === 'Κενό' ? (
                        <span className="inline-block w-2 h-2 rounded-full bg-slate-700"></span>
                      ) : (
                        <span className={`font-medium relative z-10 transition-transform duration-300 group-hover:scale-110 inline-block ${
                          todayIndex === dayIdx ? 'text-white' : 'text-slate-300'
                        }`}>
                          {day.subjects[hourIdx]}
                        </span>
                      )}
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-6">
        {scheduleData.map((day, idx) => (
          <div 
            key={day.day}
            className={`rounded-3xl p-6 relative overflow-hidden transition-all duration-300 ${
              todayIndex === idx 
                ? 'bg-gradient-to-br from-card to-primary/20 border border-primary/50 shadow-lg shadow-primary/20 ring-1 ring-primary/50' 
                : 'glass-card'
            }`}
          >
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className={`font-bold text-2xl ${todayIndex === idx ? 'text-white' : 'text-slate-200'}`}>
                {day.day}
              </h3>
              {todayIndex === idx && (
                <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase shadow-lg">Σήμερα</span>
              )}
            </div>
            
            <div className="space-y-3 relative z-10">
              {day.subjects.map((sub, hIdx) => {
                 if (sub === 'Κενό') return null; // Skip empty slots on mobile for cleanliness
                 return (
                  <div key={hIdx} className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/5">
                    <span className="text-slate-400 font-mono text-xs bg-white/5 px-2 py-1 rounded">{hours[hIdx].split('-')[0]}</span>
                    <span className="font-semibold text-slate-100">{sub}</span>
                  </div>
                );
              })}
            </div>

            {/* Background Blob for aesthetics */}
            {todayIndex === idx && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};