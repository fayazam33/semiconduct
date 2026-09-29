import React, { useState } from 'react';
import { ASIC_STAGES } from '../data/vlsiData';
import { AsicStage } from '../types/vlsi';

export const AsicFlowSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const currentStage = ASIC_STAGES.find((s) => s.id === activeStageId) || ASIC_STAGES[0];

  const getPhaseColor = (phase: AsicStage['phase']) => {
    switch (phase) {
      case 'Front-End':
        return 'text-[#4cd7f6] bg-[#003640]/30 border-[#4cd7f6]/30';
      case 'Synthesis':
        return 'text-[#adc6ff] bg-[#002e6a]/30 border-[#adc6ff]/30';
      case 'Back-End':
        return 'text-[#4edea3] bg-[#003824]/30 border-[#4edea3]/30';
      case 'Foundry':
        return 'text-[#acedff] bg-[#06b6d4]/30 border-[#4cd7f6]/40';
      default:
        return 'text-white bg-slate-800';
    }
  };

  const getDotColor = (phase: AsicStage['phase']) => {
    switch (phase) {
      case 'Front-End': return 'bg-[#4cd7f6]';
      case 'Synthesis': return 'bg-[#0566d9]';
      case 'Back-End': return 'bg-[#4edea3]';
      case 'Foundry': return 'bg-[#acedff]';
    }
  };

  return (
    <section className="px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full" id="flow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
          04 / ASIC PIPELINE
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        From Spec to Silicon
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 max-w-2xl leading-relaxed">
        The industry standard digital ASIC implementation pipeline from architectural specifications to GDSII foundry tapeout.
      </p>

      {/* Stepper + Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Pipeline Stepper Column */}
        <div className="lg:col-span-5 flex flex-col gap-2 relative">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#3d494c]/30"></div>

          {ASIC_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`relative pl-10 pr-3 py-3 rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#181b26] dark:bg-[#181b26] light:bg-white border-[#4cd7f6]/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border-[#3d494c]/20 hover:border-[#3d494c]/50'
                }`}
              >
                {/* Stage Step Indicator Dot */}
                <div className="absolute left-2.5 top-4 w-3.5 h-3.5 rounded-full bg-[#0a0e18] flex items-center justify-center -translate-x-1/2">
                  <div
                    className={`w-2 h-2 rounded-full transition-transform ${getDotColor(
                      stage.phase
                    )} ${isActive ? 'scale-125 ring-2 ring-cyan-400' : ''}`}
                  ></div>
                </div>

                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 truncate">
                    {stage.name}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase border ${getPhaseColor(
                      stage.phase
                    )}`}
                  >
                    {stage.phase}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#869397] line-clamp-1">
                  {stage.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="lg:col-span-7 bg-[#181b26] dark:bg-[#181b26] light:bg-white border border-[#3d494c]/30 rounded-2xl p-5 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#3d494c]/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#4cd7f6] font-bold">
                  STAGE 0{currentStage.id}
                </span>
                <span
                  className={`font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase border ${getPhaseColor(
                    currentStage.phase
                  )}`}
                >
                  {currentStage.phase} Phase
                </span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-white dark:text-white light:text-slate-900">
                {currentStage.name}
              </h3>
            </div>
          </div>

          <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-5 leading-relaxed">
            {currentStage.description}
          </p>

          {/* Section: Deliverables */}
          <div className="mb-4">
            <span className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider block mb-2">
              Deliverables &amp; Output Artifacts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentStage.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/20 text-xs font-mono text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800 flex items-start gap-2"
                >
                  <span className="text-[#4cd7f6] mt-0.5">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Critical Signoff Checks */}
          <div className="mb-4">
            <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider block mb-2">
              Critical Engineering Checks &amp; Sign-Off
            </span>
            <ul className="space-y-1.5">
              {currentStage.criticalChecks.map((check, idx) => (
                <li
                  key={idx}
                  className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 flex items-start gap-2"
                >
                  <span className="text-[#4edea3] font-mono">▸</span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Key Industry EDA Tools */}
          <div className="pt-3 border-t border-[#3d494c]/20">
            <span className="font-mono text-xs text-[#869397] font-semibold uppercase tracking-wider block mb-2">
              Industry Standard EDA Tooling
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentStage.keyTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/30 text-xs font-mono text-[#4cd7f6] font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
