import React from 'react';
import { TabType } from '../types/vlsi';

interface WhyVlsiSectionProps {
  setActiveTab: (tab: TabType) => void;
}

export const WhyVlsiSection: React.FC<WhyVlsiSectionProps> = ({ setActiveTab }) => {
  const metrics = [
    {
      stat: 'Billions',
      title: 'Transistor Scale',
      desc: 'Design architectures packing unprecedented monolithic density into fingernail-sized dies.',
      color: 'text-[#4cd7f6]'
    },
    {
      stat: '2 nm',
      title: 'Atomic Precision',
      desc: 'Manipulate gate lengths spanning merely a dozen silicon atoms with GAA nanosheets.',
      color: 'text-[#4edea3]'
    },
    {
      stat: 'PFLOPS',
      title: 'Compute Power',
      desc: 'Enable next-gen frontier LLM model training and inference on real physical silicon hardware.',
      color: 'text-[#adc6ff]'
    },
    {
      stat: 'Sub-µW',
      title: 'Extreme Efficiency',
      desc: 'Control sub-threshold leakage currents for standby battery lifetimes measured in months.',
      color: 'text-[#acedff]'
    }
  ];

  return (
    <section className="px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full" id="why-vlsi">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
          09 / OPPORTUNITY
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        Why Learn VLSI Design?
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 leading-relaxed max-w-2xl">
        Hardware engineering remains the highest barrier-to-entry and most critical bottleneck in global technical innovation.
      </p>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-[#181b26] dark:bg-[#181b26] light:bg-white border border-[#3d494c]/30 shadow-md flex flex-col justify-between"
          >
            <span className={`font-['Space_Grotesk'] text-3xl font-bold ${m.color} mb-3 block`}>
              {m.stat}
            </span>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-1">
                {m.title}
              </h3>
              <p className="font-sans text-xs text-[#869397] dark:text-[#869397] light:text-slate-600 leading-relaxed">
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call-To-Action Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c1f2a] to-[#0a0e18] dark:from-[#1c1f2a] dark:to-[#0a0e18] light:from-slate-100 light:to-white border border-[#3d494c]/40 overflow-hidden shadow-2xl flex flex-col items-center text-center">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#4cd7f6]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-[#4edea3]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#06b6d4] to-[#0566d9] text-white flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
          <span className="material-symbols-outlined text-[26px]">stream_apps</span>
        </div>

        <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
          Ready to Explore Silicon Engineering?
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 max-w-md mb-6 leading-relaxed">
          Start your journey from a single gate transistor to the complex multi-core architectures powering intelligent hardware.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
          <button
            onClick={() => setActiveTab('cmos-lab')}
            className="w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>Start CMOS Lab</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="w-full sm:w-auto h-12 px-5 rounded-xl bg-[#262a35] dark:bg-[#262a35] light:bg-slate-200 text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800 font-mono text-xs font-semibold flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          >
            View Roadmap
          </button>
        </div>
      </div>
    </section>
  );
};
