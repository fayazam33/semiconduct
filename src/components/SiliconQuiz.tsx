import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/vlsiData';

export const SiliconQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const userSelection = selectedAnswers[currentIdx];
  const isAnswered = userSelection !== undefined;

  const handleSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, chosenIdx]) => {
    const q = QUIZ_QUESTIONS[Number(qIdx)];
    return chosenIdx === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="p-5 sm:p-6 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3d494c]/20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4edea3] text-[22px]">quiz</span>
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white dark:text-white light:text-slate-900">
            VLSI &amp; Silicon Mastery Quiz
          </h3>
        </div>
        {!showResult && (
          <span className="font-mono text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-500 font-semibold">
            Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {!showResult ? (
        <div>
          <div className="mb-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#10131d] text-[#4cd7f6] uppercase font-bold">
              {currentQ.category}
            </span>
          </div>

          <h4 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-4 leading-relaxed">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5 mb-5">
            {currentQ.options.map((option, idx) => {
              const isChosen = userSelection === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle =
                'bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border-[#3d494c]/30 text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800 hover:border-[#4cd7f6]/50';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-[#003824] border-[#4edea3] text-[#4edea3] font-bold';
                } else if (isChosen) {
                  btnStyle = 'bg-red-950/60 border-red-500 text-red-300 font-bold';
                } else {
                  btnStyle = 'opacity-40 bg-[#10131d] border-[#3d494c]/20';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3 rounded-xl border text-left font-sans text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="font-mono font-bold text-xs mt-0.5 shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-1">{option}</span>
                  {isAnswered && isCorrect && (
                    <span className="material-symbols-outlined text-[18px] text-[#4edea3] shrink-0">
                      check_circle
                    </span>
                  )}
                  {isAnswered && isChosen && !isCorrect && (
                    <span className="material-symbols-outlined text-[18px] text-red-400 shrink-0">
                      cancel
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-3.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/30 mb-5 animate-in fade-in duration-200">
              <span className="font-mono text-xs text-[#4edea3] font-bold block mb-1">
                Engineering Explanation:
              </span>
              <p className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-mono text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-6 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#06b6d4] to-[#4edea3] text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/20">
            <span className="material-symbols-outlined text-[32px]">emoji_events</span>
          </div>

          <h4 className="font-['Space_Grotesk'] text-2xl font-bold text-white dark:text-white light:text-slate-900 mb-1">
            Quiz Completed!
          </h4>
          <p className="font-mono text-base text-[#4cd7f6] font-bold mb-4">
            You scored {score} out of {QUIZ_QUESTIONS.length} (
            {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
            {score === 5
              ? 'Outstanding! You possess foundry-grade comprehension of CMOS device physics, RTL timing, and physical design closure.'
              : score >= 3
              ? 'Great performance! Review the roadmap milestones and CMOS inverter equations to strengthen your core silicon intuition.'
              : 'Good attempt! Explore the interactive CMOS Inverter Lab and the 6-stage ASIC pipeline to build foundational confidence.'}
          </p>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-mono text-xs font-bold active:scale-95 transition-all shadow-md cursor-pointer"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};
