import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Schedule } from './components/Schedule';
import { AiAssistant } from './components/AiAssistant';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

// Define the available views
export enum View {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
  AI = 'AI',
  GALLERY = 'GALLERY'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  // Function to render the active component based on state
  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="animate-slide-up">
            <Hero onNavigate={setCurrentView} />
          </div>
        );
      case View.SCHEDULE:
        return (
          <div className="animate-slide-up">
            <Schedule />
          </div>
        );
      case View.AI:
        return (
          <div className="animate-slide-up">
            <AiAssistant />
          </div>
        );
      case View.GALLERY:
        return (
          <div className="animate-slide-up">
            <Gallery />
          </div>
        );
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark text-slate-100 selection:bg-primary selection:text-white relative">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-grow z-10 pt-24 pb-24 px-4 container mx-auto max-w-6xl">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
};

export default App;