import React, { useState } from 'react';
import { ROADMAP_MILESTONES } from '../data/vlsiData';
import { Milestone } from '../types/vlsi';

export const RoadmapSection: React.FC = () => {
  const [completedPhases, setCompletedPhases] = useState<number[]>([1]);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedPhases((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const progressPercent = Math.round(
    (completedPhases.length / ROADMAP_MILESTONES.length) * 100
  );

  return (
    <section className="px-3 sm:px-6 py-8 max-w-4xl mx-auto w-full" id="roadmap">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider">
          02 / CURRICULUM
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-1">
            Curated VLSI Roadmap
          </h2>
          <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600">
            Master the spectrum from solid-state device physics to automated physical silicon tapeout.
          </p>
        </div>

        {/* Progress Badge & Bar */}
        <div className="bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 p-3 rounded-xl border border-[#3d494c]/30 shrink-0 w-full sm:w-56">
          <div className="flex items-center justify-between font-mono text-xs mb-1.5">
            <span className="text-[#869397]">Curriculum Mastery</span>
            <span className="font-bold text-[#4edea3]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#10131d] dark:bg-[#10131d] light:bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#06b6d4] to-[#4edea3] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="block text-[10px] font-mono text-[#869397] mt-1">
            {completedPhases.length} of {ROADMAP_MILESTONES.length} phases completed
          </span>
        </div>
      </div>

      {/* Milestone Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {ROADMAP_MILESTONES.map((milestone: Milestone) => {
          const isDone = completedPhases.includes(milestone.id);
          const isExpanded = expandedPhase === milestone.id;

          return (
            <div
              key={milestone.id}
              onClick={() => setExpandedPhase(isExpanded ? null : milestone.id)}
              className={`p-4 rounded-xl transition-all cursor-pointer border ${
                isExpanded
                  ? 'bg-[#181b26] dark:bg-[#181b26] light:bg-white border-[#4cd7f6]/50 shadow-xl'
                  : 'bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border-[#3d494c]/20 hover:border-[#3d494c]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Completion Checkbox */}
                  <button
                    onClick={(e) => toggleComplete(milestone.id, e)}
                    title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all mt-0.5 cursor-pointer ${
                      isDone
                        ? 'bg-[#4edea3] border-[#4edea3] text-black font-bold'
                        : 'border-[#3d494c] bg-[#181b26] hover:border-[#4cd7f6]'
                    }`}
                  >
                    {isDone && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#4cd7f6] font-bold">
                        MILESTONE 0{milestone.id}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#262a35] dark:bg-[#262a35] light:bg-slate-200 text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-700 font-semibold uppercase">
                        {milestone.phase}
                      </span>
                      <span className="font-mono text-[10px] text-[#869397] hidden sm:inline">
                        · ~{milestone.estimatedHours} hrs
                      </span>
                    </div>

                    <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900">
                      {milestone.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mt-1 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="material-symbols-outlined text-[#869397] text-[20px] transition-transform">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {/* Expanded Curriculum Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-[#3d494c]/20 pl-9 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Topics Covered */}
                    <div>
                      <span className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider block mb-2">
                        Core Syllabus Topics
                      </span>
                      <ul className="space-y-1.5">
                        {milestone.topics.map((topic, i) => (
                          <li
                            key={i}
                            className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 flex items-start gap-2"
                          >
                            <span className="text-[#4cd7f6] font-mono mt-0.5">›</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Industry EDA Tools */}
                    <div>
                      <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider block mb-2">
                        Industry Standard EDA Tools
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {milestone.recommendedTools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#181b26] dark:bg-[#181b26] light:bg-slate-200 border border-[#3d494c]/30 text-xs font-mono text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
