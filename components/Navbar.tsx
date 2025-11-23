import React from 'react';
import { View } from '../App';
import { Home, Calendar, Sparkles, Image as ImageIcon, Menu } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  
  const navItems = [
    { id: View.HOME, label: 'Αρχική', icon: <Home size={20} /> },
    { id: View.SCHEDULE, label: 'Πρόγραμμα', icon: <Calendar size={20} /> },
    { id: View.AI, label: 'B2 Bot', icon: <Sparkles size={20} /> },
    { id: View.GALLERY, label: 'Φωτογραφίες', icon: <ImageIcon size={20} /> },
  ];

  return (
    <>
      {/* Desktop/Tablet Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange(View.HOME)}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
              B2
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Γυμνάσιο Class Hub
            </span>
          </div>
          
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-white/10 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-xl border-t border-white/10 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
           {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${
                  currentView === item.id
                    ? 'text-primary'
                    : 'text-slate-500'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${currentView === item.id ? 'bg-primary/20 scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
        </div>
      </nav>
    </>
  );
};