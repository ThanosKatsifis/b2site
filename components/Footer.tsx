import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-dark relative z-10">
      <div className="container mx-auto px-4">
        <p>© 2025 B2 Class Hub. Created by the Class Geek.</p>
        <div className="flex justify-center gap-4 mt-2">
           <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
           <span className="hover:text-primary cursor-pointer transition-colors">Discord</span>
           <span className="hover:text-primary cursor-pointer transition-colors">Email</span>
        </div>
      </div>
    </footer>
  );
};