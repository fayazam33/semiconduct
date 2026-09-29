import React from 'react';
import { CORE_CONCEPTS } from '../data/vlsiData';
import { CoreConcept } from '../types/vlsi';

interface CoreConceptsProps {
  onSelectConcept: (concept: CoreConcept) => void;
}

export const CoreConcepts: React.FC<CoreConceptsProps> = ({ onSelectConcept }) => {
  return (
    <section className="px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full" id="concepts">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider">
          03 / CORE CONCEPTS
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        Semiconductor Building Blocks
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6">
        Click any core concept below to inspect mathematical formulations, gate topologies, and commercial EDA workflows.
      </p>

      {/* Grid of 6 Building Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CORE_CONCEPTS.map((concept, index) => {
          const accentColor =
            index === 0 || index === 3
              ? 'text-[#4cd7f6]'
              : index === 1 || index === 4
              ? 'text-[#4edea3]'
              : 'text-[#adc6ff]';

          const iconBg =
            index === 0 || index === 3
              ? 'bg-[#003640]/40 text-[#4cd7f6]'
              : index === 1 || index === 4
              ? 'bg-[#003824]/40 text-[#4edea3]'
              : 'bg-[#002e6a]/40 text-[#adc6ff]';

          return (
            <div
              key={concept.id}
              onClick={() => onSelectConcept(concept)}
              className="p-4 sm:p-5 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl flex flex-col justify-between border border-[#3d494c]/30 hover:border-[#4cd7f6]/60 transition-all shadow-md group cursor-pointer active:scale-[0.98]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[22px]">{concept.icon}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 uppercase font-semibold">
                    {concept.tag}
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-1.5 group-hover:text-[#4cd7f6] transition-colors">
                  {concept.title}
                </h3>
                <p className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 leading-relaxed">
                  {concept.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3d494c]/20 flex items-center justify-between">
                <span className={`font-mono text-xs font-semibold flex items-center gap-1 ${accentColor} group-hover:translate-x-1 transition-transform`}>
                  Explore Details →
                </span>
                <span className="font-mono text-[10px] text-[#869397]">
                  {concept.industryTools.length} EDA Tools
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
