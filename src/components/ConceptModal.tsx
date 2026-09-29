import React from 'react';
import { CoreConcept } from '../types/vlsi';

interface ConceptModalProps {
  concept: CoreConcept | null;
  onClose: () => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({ concept, onClose }) => {
  if (!concept) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#181b26] dark:bg-[#181b26] light:bg-white text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#3d494c]/40 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-[#3d494c]/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-[#0566d9] text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">{concept.icon}</span>
            </div>
            <div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#10131d] text-[#4cd7f6] uppercase font-bold">
                {concept.tag}
              </span>
              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-0.5">
                {concept.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 text-[#bcc9cd] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Deep Dive Prose */}
        <div className="mb-5">
          <span className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider block mb-2">
            Theoretical Principles &amp; Architecture
          </span>
          <p className="font-sans text-xs sm:text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 leading-relaxed">
            {concept.deepDive}
          </p>
        </div>

        {/* Formula Box */}
        {concept.formula && (
          <div className="mb-5 p-4 rounded-2xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30 font-mono text-xs">
            <span className="text-[10px] text-[#4cd7f6] uppercase font-bold block mb-1.5">
              Governing Equation
            </span>
            <code className="text-[#4cd7f6] text-xs sm:text-sm block py-1 break-all">
              {concept.formula}
            </code>
            {concept.formulaExplanation && (
              <p className="font-sans text-[11px] text-[#869397] mt-2 pt-2 border-t border-[#3d494c]/20 leading-relaxed">
                {concept.formulaExplanation}
              </p>
            )}
          </div>
        )}

        {/* Industry EDA Tooling */}
        <div className="mb-5">
          <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider block mb-2">
            Commercial EDA Tools &amp; Methodologies
          </span>
          <div className="flex flex-wrap gap-2">
            {concept.industryTools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/30 text-xs font-mono text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#3d494c]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-mono text-xs font-semibold cursor-pointer active:scale-95 transition-all shadow-md"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
