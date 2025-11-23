import React from 'react';
import { View } from '../App';
import { Bell, CalendarClock, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Announcement } from '../types';

interface HeroProps {
  onNavigate: (view: View) => void;
}

const announcements: Announcement[] = [
  { id: 1, title: 'Εκδρομή στα Μετέωρα', date: '15 Νοε', content: 'Μην ξεχάσετε την υπεύθυνη δήλωση! Θα περάσουμε τέλεια!', tag: 'Event' },
  { id: 2, title: 'Διαγώνισμα Φυσικής', date: '18 Νοε', content: 'Ύλη: Κεφάλαια 1-3. Καλό διάβασμα παιδιά.', tag: 'Important' },
  { id: 3, title: 'Αλλαγή Προγράμματος', date: 'Σήμερα', content: 'Την Τρίτη η Γυμναστική αλλάζει με Ιστορία.', tag: 'Info' },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-16">
      
      {/* Hero Header */}
      <section className="relative mt-8 text-center flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md animate-float">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Σχολικό Έτος 2024-2025
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight relative z-10">
          Η Καλύτερη Τάξη <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-x">
            B2 LEGENDS
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-2xl max-w-2xl font-light">
          Το ψηφιακό αρχηγείο του τμήματός μας. <br/>
          <span className="text-slate-300 font-normal">Πρόγραμμα • Νέα • AI Βοηθός • Memes</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button 
            onClick={() => onNavigate(View.AI)}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Ask B2 Bot
          </button>
          <button 
            onClick={() => onNavigate(View.SCHEDULE)}
            className="group px-8 py-4 rounded-full bg-card/50 backdrop-blur-md border border-white/10 text-white font-semibold text-lg transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <CalendarClock className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            Πρόγραμμα
          </button>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
              <Bell size={24} />
            </div>
            <h2 className="text-3xl font-bold">Πίνακας Ανακοινώσεων</h2>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden md:block">UPDATED: TODAY</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((ann) => (
            <div 
              key={ann.id} 
              className="glass-card p-6 rounded-3xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 group relative overflow-hidden"
            >
              {/* Decorative gradient blob inside card */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                  ann.tag === 'Important' ? 'bg-red-500 text-white' :
                  ann.tag === 'Event' ? 'bg-green-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {ann.tag}
                </span>
                <span className="text-slate-400 text-xs font-mono bg-black/20 px-2 py-1 rounded">{ann.date}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{ann.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{ann.content}</p>
              
              <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                <ChevronRight className="text-slate-300" />
              </div>
            </div>
          ))}
          
          {/* Quick Stat Card */}
          <div className="md:col-span-3 glass-card rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-accent">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/20 text-accent">
                <Zap size={24} fill="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Tip της ημέρας</h3>
                <p className="text-slate-400 text-sm">Ο B2 Bot μπορεί να σου λύσει ασκήσεις Μαθηματικών. Δοκίμασέ το!</p>
              </div>
            </div>
            <button 
               onClick={() => onNavigate(View.AI)}
               className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
            >
              Άνοιγμα Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};