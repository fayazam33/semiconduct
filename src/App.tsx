import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomTabBar } from './components/BottomTabBar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HeroSection } from './components/HeroSection';
import { WhatIsVlsi } from './components/WhatIsVlsi';
import { RoadmapSection } from './components/RoadmapSection';
import { CoreConcepts } from './components/CoreConcepts';
import { AsicFlowSection } from './components/AsicFlowSection';
import { CmosInverterLab } from './components/CmosInverterLab';
import { SocArchitecture } from './components/SocArchitecture';
import { ApplicationsSection } from './components/ApplicationsSection';
import { TimelineSection } from './components/TimelineSection';
import { WhyVlsiSection } from './components/WhyVlsiSection';
import { SiliconCalculator } from './components/SiliconCalculator';
import { SiliconQuiz } from './components/SiliconQuiz';
import { ConceptModal } from './components/ConceptModal';
import { TelemetryModal } from './components/TelemetryModal';
import { Footer } from './components/Footer';
import { CoreConcept, TabType } from './types/vlsi';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('vlsi-theme');
    if (saved) return saved === 'dark';
    return true; // Default dark as in the reference design
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState<boolean>(false);
  const [selectedConcept, setSelectedConcept] = useState<CoreConcept | null>(null);

  // Sync dark class to root document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vlsi-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vlsi-theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#10131d] dark:bg-[#10131d] light:bg-[#f8fafc] text-[#e0e2f1] dark:text-[#e0e2f1] light:text-[#0f172a] flex flex-col transition-colors duration-200">
      {/* Top App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
      />

      {/* Slide-out Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        onOpenTelemetry={() => {
          setIsTelemetryOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-20 sm:pb-8 flex flex-col">
        {/* TAB: HOME (Comprehensive Silicon Hub Landing matching HTML) */}
        {activeTab === 'home' && (
          <div className="flex flex-col w-full animate-in fade-in duration-200">
            <HeroSection
              setActiveTab={setActiveTab}
              onExploreClick={() => handleScrollToSection('flow')}
            />
            <WhatIsVlsi />
            <RoadmapSection />
            <CoreConcepts onSelectConcept={(concept) => setSelectedConcept(concept)} />
            <AsicFlowSection />
            <CmosInverterLab />
            <SocArchitecture />
            <ApplicationsSection />
            <TimelineSection />
            <WhyVlsiSection setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB: CONCEPTS */}
        {activeTab === 'concepts' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 w-full animate-in fade-in duration-200">
            <CoreConcepts onSelectConcept={(concept) => setSelectedConcept(concept)} />
            <div className="mt-8">
              <WhatIsVlsi />
            </div>
          </div>
        )}

        {/* TAB: FLOW */}
        {activeTab === 'flow' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 w-full animate-in fade-in duration-200">
            <AsicFlowSection />
          </div>
        )}

        {/* TAB: CMOS LAB */}
        {activeTab === 'cmos-lab' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 w-full animate-in fade-in duration-200">
            <CmosInverterLab />
          </div>
        )}

        {/* TAB: SOC ARCHITECTURE */}
        {activeTab === 'soc' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 w-full animate-in fade-in duration-200">
            <SocArchitecture />
          </div>
        )}

        {/* TAB: CURRICULUM ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 w-full animate-in fade-in duration-200">
            <RoadmapSection />
          </div>
        )}

        {/* TAB: CALCULATOR & QUIZ */}
        {activeTab === 'calc' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 w-full space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
                  ENGINEERING UTILITIES
                </span>
                <div className="h-px flex-1 bg-[#3d494c]/30"></div>
              </div>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
                Silicon Calculator &amp; Mastery Quiz
              </h2>
              <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6">
                Test your semiconductor knowledge and compute real Static Timing Analysis slack, clock frequencies, and total dynamic/static power dissipation.
              </p>
            </div>

            <SiliconCalculator />
            <SiliconQuiz />
          </div>
        )}

        {/* Concept Deep Dive Modal */}
        <ConceptModal
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
        />

        {/* Telemetry Diagnostics Modal */}
        <TelemetryModal
          isOpen={isTelemetryOpen}
          onClose={() => setIsTelemetryOpen(false)}
        />
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Fixed Mobile Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
