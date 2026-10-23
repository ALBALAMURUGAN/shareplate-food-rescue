import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ListingsFeed } from './components/ListingsFeed';
import { SmartMatchVisualizer } from './components/SmartMatchVisualizer';
import { InteractiveMap } from './components/InteractiveMap';
import { DonorDashboard } from './components/DonorDashboard';
import { NgoDashboard } from './components/NgoDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ImpactSection } from './components/ImpactSection';
import { TechStackSandbox } from './components/TechStackSandbox';
import { PostSurplusModal } from './components/PostSurplusModal';
import { ClaimModal } from './components/ClaimModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab, userRole } = useApp();

  return (
    <main className="min-h-screen pb-12">
      {activeTab === 'feed' && (
        <>
          <HeroSection />
          <ListingsFeed />
          <SmartMatchVisualizer />
          <ImpactSection />
        </>
      )}

      {activeTab === 'map' && (
        <>
          <InteractiveMap />
          <ListingsFeed />
        </>
      )}

      {activeTab === 'visualizer' && (
        <>
          <SmartMatchVisualizer />
          <ListingsFeed />
        </>
      )}

      {activeTab === 'dashboard' && (
        <>
          {userRole === 'donor' && <DonorDashboard />}
          {userRole === 'ngo' && <NgoDashboard />}
          {userRole === 'volunteer' && <VolunteerDashboard />}
          {userRole === 'admin' && <AdminDashboard />}
        </>
      )}

      {activeTab === 'impact' && (
        <ImpactSection />
      )}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0d0714] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
        <Header />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />

        {/* Global Modals */}
        <PostSurplusModal />
        <ClaimModal />
        <TechStackSandbox />
      </div>
    </AppProvider>
  );
}

export default App;
