import React from 'react';
import { TabType } from '../types/vlsi';
import { DieSchematic } from './DieSchematic';

interface HeroSectionProps {
  setActiveTab: (tab: TabType) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onExploreClick }) => {
  return (
    <section className="relative px-3 sm:px-6 pt-6 pb-12 flex flex-col items-center overflow-hidden">
      {/* Ambient glowing cleanroom backdrop aura */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#4cd7f6]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-48 -right-20 w-72 h-72 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-72 h-72 bg-[#0566d9]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Live Status Pulse Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 border border-[#3d494c]/40 shadow-sm mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd7f6]"></span>
        </span>
        <span className="font-mono text-xs text-[#4cd7f6] dark:text-[#4cd7f6] light:text-cyan-700 uppercase tracking-wider font-bold">
          ⚡ EXPLORE THE WORLD OF VLSI
        </span>
      </div>

      {/* H1 Headline */}
      <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 tracking-tight max-w-3xl mb-4 font-bold leading-tight">
        From Transistors to{' '}
        <span className="bg-gradient-to-r from-[#4cd7f6] via-[#06b6d4] to-[#4edea3] bg-clip-text text-transparent">
          Intelligent Silicon
        </span>
      </h1>

      {/* Supporting Technical Copy */}
      <p className="font-sans text-sm sm:text-base text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 text-center max-w-xl mb-8 leading-relaxed">
        Learn how billions of atomic-scale transistors fuse into high-throughput processors, dense memories, and AI silicon across sub-micron fabrication nodes.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-10">
        <button
          onClick={() => setActiveTab('cmos-lab')}
          className="w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">science</span>
          <span>Start CMOS Lab</span>
        </button>

        <button
          onClick={onExploreClick}
          className="w-full sm:w-auto h-12 px-5 rounded-xl bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 border border-[#3d494c]/40 text-[#4cd7f6] dark:text-[#4cd7f6] light:text-cyan-700 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#262a35] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">account_tree</span>
          <span>Explore Pipeline</span>
        </button>
      </div>

      {/* 3D Silicon Flip-Chip IC Die Simulator */}
      <DieSchematic />
    </section>
  );
};
