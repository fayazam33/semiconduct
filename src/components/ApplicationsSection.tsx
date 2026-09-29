import React from 'react';

export const ApplicationsSection: React.FC = () => {
  const apps = [
    { icon: 'smartphone', title: 'Smartphones', desc: '3nm APUs with 19+ billion transistors per single die.', color: 'text-[#4cd7f6]' },
    { icon: 'dns', title: 'Data Centers', desc: '128-core server CPUs powering global cloud infrastructure.', color: 'text-[#4edea3]' },
    { icon: 'sports_esports', title: 'Ultra GPUs', desc: 'Real-time path tracing with tens of thousands of ALU shader cores.', color: 'text-[#adc6ff]' },
    { icon: 'psychology', title: 'AI Accelerators', desc: 'Systolic tensor arrays training billion-parameter frontier LLMs.', color: 'text-[#4cd7f6]' },
    { icon: 'directions_car', title: 'Automotive', desc: 'ISO 26262 ASIL-D certified chips for autonomous driving perception.', color: 'text-amber-400' },
    { icon: 'sensors', title: 'IoT Sensors', desc: 'Sub-microwatt standby power nodes harvesting ambient energy.', color: 'text-[#4edea3]' },
    { icon: 'watch', title: 'Wearables', desc: 'Ultra-compact PMICs and continuous optical biometric DSPs.', color: 'text-[#4cd7f6]' },
    { icon: 'cell_tower', title: '5G / 6G Comms', desc: 'RFIC transceivers and phased-array beamforming silicon.', color: 'text-[#adc6ff]' },
  ];

  return (
    <section className="px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full" id="applications">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
          07 / IMPACT
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        VLSI Powers the Modern World
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 leading-relaxed max-w-2xl">
        Every facet of the global digital civilization exists because of sub-micron silicon fabrication and automated electronic design.
      </p>

      {/* Grid of 8 Application Sectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {apps.map((app, index) => (
          <div
            key={index}
            className="p-3.5 sm:p-4 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-xl border border-[#3d494c]/30 hover:border-[#4cd7f6]/50 transition-all shadow-md group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <span className={`material-symbols-outlined text-[20px] ${app.color}`}>
                {app.icon}
              </span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-1">
              {app.title}
            </h3>
            <p className="font-sans text-xs text-[#869397] dark:text-[#869397] light:text-slate-600 leading-relaxed">
              {app.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
