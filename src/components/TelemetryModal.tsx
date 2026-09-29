import React, { useState, useEffect } from 'react';

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({ isOpen, onClose }) => {
  const [temp, setTemp] = useState<number>(46.2);
  const [jitter, setJitter] = useState<number>(1.8);
  const [vddVolts, setVddVolts] = useState<number>(0.75);
  const [isRunningSelfTest, setIsRunningSelfTest] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTemp((prev) => Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setJitter((prev) => Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)));
      setVddVolts((prev) => Number((prev + (Math.random() * 0.004 - 0.002)).toFixed(3)));
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const runDiagnostics = () => {
    setIsRunningSelfTest(true);
    setTestResult(null);
    setTimeout(() => {
      setIsRunningSelfTest(false);
      setTestResult('ALL SILICON BUILT-IN SELF TEST (BIST) CHAINS PASSED. ZERO DRC/LVS FAULTS DETECTED.');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#181b26] dark:bg-[#181b26] light:bg-white text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#3d494c]/40 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3d494c]/30">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[24px]">memory</span>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white dark:text-white light:text-slate-900">
                Silicon Die Telemetry
              </h3>
              <p className="font-mono text-[10px] text-[#869397]">
                Live On-Chip Sensor Diagnostics &amp; Thermal Mesh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 text-[#bcc9cd] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
          <div className="p-3 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30">
            <span className="block text-[10px] text-[#869397] uppercase">Junction Temp (Tj)</span>
            <span className="text-lg font-bold text-[#4edea3]">{temp} °C</span>
            <span className="block text-[9px] text-[#869397] mt-0.5">Tcase Max: 105 °C</span>
          </div>

          <div className="p-3 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30">
            <span className="block text-[10px] text-[#869397] uppercase">Core VDD Rail</span>
            <span className="text-lg font-bold text-[#4cd7f6]">{vddVolts} V</span>
            <span className="block text-[9px] text-[#869397] mt-0.5">IR Drop: &lt; 18 mV</span>
          </div>

          <div className="p-3 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30">
            <span className="block text-[10px] text-[#869397] uppercase">Clock Jitter (RMS)</span>
            <span className="text-lg font-bold text-[#adc6ff]">{jitter} ps</span>
            <span className="block text-[9px] text-[#869397] mt-0.5">PLL Lock: Locked</span>
          </div>

          <div className="p-3 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30">
            <span className="block text-[10px] text-[#869397] uppercase">Process Litho Node</span>
            <span className="text-lg font-bold text-white dark:text-white light:text-slate-900">TSMC N3E</span>
            <span className="block text-[9px] text-[#4edea3] mt-0.5">EUV High-NA Ready</span>
          </div>
        </div>

        {/* Die Static Characteristics */}
        <div className="p-3.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30 font-mono text-xs mb-4 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#869397]">Total Monolithic Transistors:</span>
            <span className="font-bold text-[#4cd7f6]">19.4 Billion</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#869397]">Standard Cell Row Height:</span>
            <span className="font-bold text-white dark:text-white light:text-slate-800">120 nm (6-Track)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#869397]">Interconnect Copper Tiers:</span>
            <span className="font-bold text-white dark:text-white light:text-slate-800">14 Layers (M1–M14)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#869397]">Wafer Fab Yield Est:</span>
            <span className="font-bold text-[#4edea3]">84.7% Defect-Free</span>
          </div>
        </div>

        {/* Self-Test Result */}
        {testResult && (
          <div className="p-3 rounded-xl bg-[#003824]/50 border border-[#4edea3]/50 text-xs font-mono text-[#4edea3] mb-4 animate-in fade-in duration-150">
            {testResult}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={runDiagnostics}
            disabled={isRunningSelfTest}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-mono text-xs font-bold active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isRunningSelfTest ? 'sync' : 'play_arrow'}
            </span>
            <span>{isRunningSelfTest ? 'Running BIST Scans...' : 'Execute BIST Self-Test'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-200 text-xs font-mono text-[#bcc9cd] hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
