import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const Gallery: React.FC = () => {
  // Generate random seeds for Picsum to get different images
  const images = [
    { id: 1, size: 'h-64', seed: 101, title: 'Εκδρομή Αθήνα' },
    { id: 2, size: 'h-48', seed: 102, title: 'Χημεία Lab' },
    { id: 3, size: 'h-80', seed: 103, title: 'Αγώνας Μπάσκετ' },
    { id: 4, size: 'h-56', seed: 104, title: 'Χριστούγεννα' },
    { id: 5, size: 'h-64', seed: 105, title: 'Project Ιστορίας' },
    { id: 6, size: 'h-48', seed: 106, title: 'Διάλειμμα' },
    { id: 7, size: 'h-72', seed: 107, title: 'Θεατρικό' },
    { id: 8, size: 'h-56', seed: 108, title: 'Αποφοίτηση' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Φωτογραφίες</h2>
          <p className="text-slate-400">Οι καλύτερες στιγμές της τάξης μας</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-sm">
          <ImageIcon size={16} /> Προβολή Όλων
        </button>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img) => (
          <div 
            key={img.id} 
            className={`relative group rounded-2xl overflow-hidden break-inside-avoid border border-white/5 bg-card`}
          >
            <img 
              src={`https://picsum.photos/seed/${img.seed}/400/${Math.floor(Math.random() * 200 + 300)}`} 
              alt={img.title}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
              <p className="text-xs text-slate-300 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">B2 Class • 2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};