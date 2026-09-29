import React from 'react';
import { LOGO_URL } from '../data/vlsiData';
import { TabType } from '../types/vlsi';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDark: boolean;
  toggleDark: () => void;
  onOpenTelemetry: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  onOpenTelemetry,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    onClose();
  };

  const navItems: { tab: TabType; label: string; icon: string; desc: string; badge?: string }[] = [
    { tab: 'home', label: 'Silicon Vanguard Hub', icon: 'developer_board', desc: 'Die cross-section, logic density, and overview' },
    { tab: 'concepts', label: 'Semiconductor Concepts', icon: 'schema', desc: 'MOSFET, CMOS, Gates, RTL, Physical Design, Fabrication' },
    { tab: 'flow', label: 'ASIC Design Pipeline', icon: 'account_tree', desc: '6-stage ASIC flow from architectural spec to GDSII' },
    { tab: 'cmos-lab', label: 'CMOS Inverter Lab', icon: 'science', desc: 'Interactive circuit simulator with VTC & sizing curves', badge: 'Interactive' },
    { tab: 'soc', label: 'Heterogeneous SoC', icon: 'stream_apps', desc: '118 mm² die floorplan, NPU, GPU & workload simulator' },
    { tab: 'roadmap', label: 'Curated VLSI Roadmap', icon: 'school', desc: '6 milestones from device physics to tapeout signoff' },
    { tab: 'calc', label: 'Calculator & Quiz', icon: 'calculate', desc: 'Propagation delay, slack, power dissipation & quiz', badge: 'Tools' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#10131d] dark:bg-[#10131d] light:bg-white text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 h-full flex flex-col shadow-2xl border-r border-[#3d494c]/30 z-10 overflow-hidden animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d494c]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="VLSI Hub" className="h-8 w-auto object-contain" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Space_Grotesk'] text-lg font-bold">VLSI Hub</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#262a35] text-[#4cd7f6] font-mono font-semibold">
                  v2.6
                </span>
              </div>
              <p className="font-mono text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-500">
                Silicon Vanguard Engineering
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 text-[#bcc9cd] hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick System Telemetry Card */}
        <div className="p-4 bg-[#181b26]/50 dark:bg-[#181b26]/50 light:bg-slate-50 border-b border-[#3d494c]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-500 uppercase tracking-wider font-semibold">
              Die Monitor
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-[#4edea3]/15 text-[#4edea3] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
              LOCKED 4.80 GHz
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 rounded bg-[#10131d] dark:bg-[#10131d] light:bg-white border border-[#3d494c]/20">
              <span className="block text-[10px] text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-400">Node</span>
              <span className="text-xs font-bold text-[#4cd7f6]">N3E 3nm</span>
            </div>
            <div className="p-2 rounded bg-[#10131d] dark:bg-[#10131d] light:bg-white border border-[#3d494c]/20">
              <span className="block text-[10px] text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-400">VDD</span>
              <span className="text-xs font-bold text-[#4edea3]">0.75 V</span>
            </div>
            <div className="p-2 rounded bg-[#10131d] dark:bg-[#10131d] light:bg-white border border-[#3d494c]/20">
              <span className="block text-[10px] text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-400">Density</span>
              <span className="text-xs font-bold text-[#adc6ff]">290 MTr</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#06b6d4]/20 to-[#0566d9]/20 border border-[#06b6d4]/40 text-white'
                    : 'bg-[#181b26]/40 dark:bg-[#181b26]/40 light:bg-slate-50 hover:bg-[#262a35] dark:hover:bg-[#262a35] light:hover:bg-slate-100 text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-[#06b6d4] text-white'
                      : 'bg-[#262a35] dark:bg-[#262a35] light:bg-slate-200 text-[#4cd7f6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-['Space_Grotesk'] text-sm font-semibold truncate text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#06b6d4]/20 text-[#4cd7f6] shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#869397] dark:text-[#869397] light:text-slate-500 line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer Controls */}
        <div className="p-4 border-t border-[#3d494c]/20 bg-[#181b26]/60 dark:bg-[#181b26]/60 light:bg-slate-50 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenTelemetry();
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-[#262a35] dark:bg-[#262a35] light:bg-slate-200 hover:bg-[#313440] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-[#4cd7f6]"
          >
            <span className="material-symbols-outlined text-[16px]">speed</span>
            <span>Diagnostics</span>
          </button>

          <button
            onClick={toggleDark}
            className="py-2 px-3 rounded-lg bg-[#262a35] dark:bg-[#262a35] light:bg-slate-200 hover:bg-[#313440] text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer text-[#4edea3]"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
