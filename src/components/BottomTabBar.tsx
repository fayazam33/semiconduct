import React from 'react';
import { TabType } from '../types/vlsi';

interface BottomTabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'developer_board' },
    { id: 'concepts', label: 'Concepts', icon: 'schema' },
    { id: 'flow', label: 'Flow', icon: 'account_tree' },
    { id: 'cmos-lab', label: 'CMOS Lab', icon: 'science' },
    { id: 'soc', label: 'SoC', icon: 'stream_apps' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#0a0e18]/90 dark:bg-[#0a0e18]/90 light:bg-white/95 backdrop-blur-xl border-t border-[#3d494c]/30 dark:border-[#3d494c]/30 light:border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]"
    >
      <div className="flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-[#4cd7f6] dark:text-[#4cd7f6] light:text-cyan-600 font-semibold scale-105'
                  : 'text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-500 hover:text-white light:hover:text-slate-800'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 rounded-full bg-[#4cd7f6] dark:bg-[#4cd7f6] light:bg-cyan-600 shadow-sm shadow-cyan-400"></span>
              )}
              <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              <span className="font-mono text-[11px] leading-tight tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
