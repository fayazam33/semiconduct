import React from 'react';
import { TIMELINE_EPOCHS } from '../data/vlsiData';

export const TimelineSection: React.FC = () => {
  return (
    <section className="px-3 sm:px-6 py-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider">
          08 / EVOLUTION
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        The Scale of Integration
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 leading-relaxed max-w-2xl">
        Tracking Moore&apos;s Law across seven historical epochs of semiconductor engineering.
      </p>

      {/* Epochs List */}
      <div className="flex flex-col gap-3">
        {TIMELINE_EPOCHS.map((epoch, index) => {
          const isLatest = index === TIMELINE_EPOCHS.length - 1;
          return (
            <div
              key={index}
              className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border transition-all ${
                isLatest
                  ? 'bg-[#181b26] dark:bg-[#181b26] light:bg-white border-[#4edea3]/50 shadow-xl'
                  : 'bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border-[#3d494c]/20'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider font-semibold">
                    {epoch.era} // Node: {epoch.techNode}
                  </span>
                  {isLatest && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#4edea3]/20 text-[#4edea3] font-mono font-bold">
                      Current Frontier
                    </span>
                  )}
                </div>

                <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900">
                  {epoch.name}
                </h3>

                <p className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mt-0.5">
                  {epoch.milestone}
                </p>

                <span className="inline-block mt-1 font-mono text-[11px] text-[#4cd7f6]">
                  Key Chip: {epoch.keyChip}
                </span>
              </div>

              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#3d494c]/20">
                <span className="font-mono text-sm sm:text-base font-bold text-[#4edea3] block">
                  {epoch.transistorCount}
                </span>
                <span className="font-mono text-[10px] text-[#869397] uppercase">
                  Active Gate Count
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
