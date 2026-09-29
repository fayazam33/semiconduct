import React from 'react';
import { LOGO_URL } from '../data/vlsiData';
import { TabType } from '../types/vlsi';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDark: boolean;
  toggleDark: () => void;
  onOpenDrawer: () => void;
  onOpenTelemetry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  onOpenDrawer,
  onOpenTelemetry,
}) => {
  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'home': return 'Home';
      case 'concepts': return 'Core Concepts';
      case 'flow': return 'ASIC Flow';
      case 'cmos-lab': return 'CMOS Lab';
      case 'soc': return 'SoC Arch';
      case 'roadmap': return 'Curriculum';
      case 'calc': return 'Calculators & Quiz';
      default: return 'Overview';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pt-safe bg-[#0a0e18]/85 dark:bg-[#0a0e18]/90 light:bg-white/90 backdrop-blur-xl border-b border-[#3d494c]/30 dark:border-[#3d494c]/30 light:border-slate-200 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Menu Drawer + Logo + Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onOpenDrawer}
            aria-label="Open Quick Navigation Drawer"
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 text-[#4cd7f6] dark:text-[#4cd7f6] light:text-cyan-600 hover:bg-[#262a35] dark:hover:bg-[#262a35] light:hover:bg-slate-200 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">menu_open</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 sm:gap-3 min-w-0 text-left cursor-pointer group"
          >
            <img
              src={LOGO_URL}
              alt="VLSI Hub Circuit Chip Logo"
              className="h-8 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 tracking-tight truncate">
                  VLSI Hub
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.5 rounded text-[10px] bg-[#262a35] dark:bg-[#262a35] light:bg-slate-200 text-[#4cd7f6] dark:text-[#4cd7f6] light:text-cyan-700 font-mono uppercase tracking-wider font-semibold shrink-0">
                  v2.6 Silicon
                </span>
              </div>
              <span className="font-mono text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-500 truncate flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                {getTabLabel(activeTab)}
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Bar (hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#181b26]/70 dark:bg-[#181b26]/70 light:bg-slate-100 border border-[#3d494c]/20">
          {(['home', 'concepts', 'flow', 'cmos-lab', 'soc', 'roadmap', 'calc'] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-[#262a35]/60'
                }`}
              >
                {getTabLabel(tab)}
              </button>
            );
          })}
        </nav>

        {/* Right: Telemetry + Dark Mode + Profile Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Telemetry Diagnostics Button */}
          <button
            onClick={onOpenTelemetry}
            title="Die Telemetry Diagnostics"
            aria-label="Telemetry Diagnostics"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 hover:text-[#4cd7f6] hover:bg-[#262a35] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">memory</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDark}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 hover:text-[#4edea3] hover:bg-[#262a35] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Quick Lab CTA */}
          <button
            onClick={() => setActiveTab('cmos-lab')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-mono text-xs font-semibold hover:opacity-95 active:scale-95 transition-transform shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">science</span>
            <span>Live Lab</span>
          </button>

          {/* User Silicon Engineer Avatar */}
          <div
            title="Silicon Designer Station"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#0566d9] to-[#4cd7f6] flex items-center justify-center text-white shrink-0 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
