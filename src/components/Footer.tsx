import React from 'react';
import { LOGO_URL } from '../data/vlsiData';
import { TabType } from '../types/vlsi';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="px-3 sm:px-6 pt-10 pb-20 sm:pb-8 bg-[#0a0e18] dark:bg-[#0a0e18] light:bg-slate-100 border-t border-[#3d494c]/30 mt-8 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Brand Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="VLSI Hub Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900">
                VLSI Hub
              </span>
            </div>
            <p className="font-sans text-xs text-[#869397] dark:text-[#869397] light:text-slate-600 max-w-md leading-relaxed">
              Understanding Silicon, One Transistor at a Time. Dedicated to semiconductor device physics, RTL architecture, synthesis, and physical tapeout sign-off.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[#4cd7f6] dark:text-[#4cd7f6] light:text-cyan-700">
            <button onClick={() => setActiveTab('home')} className="hover:underline cursor-pointer">
              Home
            </button>
            <button onClick={() => setActiveTab('concepts')} className="hover:underline cursor-pointer">
              Concepts
            </button>
            <button onClick={() => setActiveTab('flow')} className="hover:underline cursor-pointer">
              Design Flow
            </button>
            <button onClick={() => setActiveTab('cmos-lab')} className="hover:underline cursor-pointer">
              CMOS Lab
            </button>
            <button onClick={() => setActiveTab('soc')} className="hover:underline cursor-pointer">
              SoC Arch
            </button>
            <button onClick={() => setActiveTab('roadmap')} className="hover:underline cursor-pointer">
              Roadmap
            </button>
            <button onClick={() => setActiveTab('calc')} className="hover:underline cursor-pointer">
              Calculators
            </button>
          </div>
        </div>

        {/* Target Audience Pill Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#3d494c]/20">
          <span className="font-mono text-[10px] text-[#869397] uppercase">Disciplines:</span>
          {['CSE', 'ECE', 'EEE', 'VLSI Engineers', 'RTL Verification', 'Physical Design'].map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-[#181b26] dark:bg-[#181b26] light:bg-slate-200 border border-[#3d494c]/30 text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-700 font-mono text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Copyright Notice */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-[11px] font-mono text-[#869397] gap-2">
          <span>© 2026 VLSI Hub. Designed for next-generation silicon architects.</span>
          <span className="text-[#4edea3]">Monolithic Node Status: Operational</span>
        </div>
      </div>
    </footer>
  );
};
