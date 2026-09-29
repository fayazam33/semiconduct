import React, { useState } from 'react';

export const SiliconCalculator: React.FC = () => {
  // STA Timing Inputs (in picoseconds)
  const [tcq, setTcq] = useState<number>(35); // ps
  const [tcomb, setTcomb] = useState<number>(140); // ps
  const [tsetup, setTsetup] = useState<number>(25); // ps
  const [tskew, setTskew] = useState<number>(10); // ps
  const [targetClockPs, setTargetClockPs] = useState<number>(250); // 4.0 GHz target

  // Calculated STA values
  const minClockPeriodPs = tcq + tcomb + tsetup - tskew;
  const setupSlackPs = targetClockPs - minClockPeriodPs;
  const maxFreqGhz = (1000 / minClockPeriodPs).toFixed(2);
  const isTimingMet = setupSlackPs >= 0;

  // Power Dissipation Inputs
  const [vddVolts, setVddVolts] = useState<number>(0.75); // 0.75V
  const [freqGhz, setFreqGhz] = useState<number>(4.0); // 4 GHz
  const [gateCountMillions, setGateCountMillions] = useState<number>(150); // 150 Million gates
  const [switchingAlpha, setSwitchingAlpha] = useState<number>(0.15); // 15% activity
  const [capPerGateFf, setCapPerGateFf] = useState<number>(0.8); // 0.8 fF
  const [leakagePerGateNa, setLeakagePerGateNa] = useState<number>(1.2); // 1.2 nA

  // Power Calculations
  // Total capacitance in Farads = gateCount * capPerGate * 1e-15
  const totalCapFarads = gateCountMillions * 1e6 * (capPerGateFf * 1e-15);
  const pDynamicWatts = switchingAlpha * totalCapFarads * (vddVolts * vddVolts) * (freqGhz * 1e9);
  const totalLeakageAmps = gateCountMillions * 1e6 * (leakagePerGateNa * 1e-9);
  const pStaticWatts = totalLeakageAmps * vddVolts;
  const pTotalWatts = pDynamicWatts + pStaticWatts;

  return (
    <div className="space-y-6">
      {/* STA Calculator */}
      <div className="p-5 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">timer</span>
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white dark:text-white light:text-slate-900">
            Static Timing Analysis (STA) Slack &amp; Fmax
          </h3>
        </div>
        <p className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-4">
          Calculate the critical path timing slack and maximum clock frequency for synchronous register-to-register datapaths.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4 font-mono text-xs">
          <div>
            <label className="block text-[#869397] mb-1">Tcq (ps)</label>
            <input
              type="number"
              value={tcq}
              onChange={(e) => setTcq(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">Tcomb (ps)</label>
            <input
              type="number"
              value={tcomb}
              onChange={(e) => setTcomb(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">Tsetup (ps)</label>
            <input
              type="number"
              value={tsetup}
              onChange={(e) => setTsetup(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">Tskew (ps)</label>
            <input
              type="number"
              value={tskew}
              onChange={(e) => setTskew(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">Target Tclk (ps)</label>
            <input
              type="number"
              value={targetClockPs}
              onChange={(e) => setTargetClockPs(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30 font-mono text-center">
          <div>
            <span className="block text-[10px] text-[#869397] uppercase">Min Period (T_min)</span>
            <span className="text-base font-bold text-white dark:text-white light:text-slate-900">
              {minClockPeriodPs} ps
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-[#869397] uppercase">Setup Slack</span>
            <span
              className={`text-base font-bold ${
                isTimingMet ? 'text-[#4edea3]' : 'text-red-400'
              }`}
            >
              {setupSlackPs >= 0 ? `+${setupSlackPs} ps (PASS)` : `${setupSlackPs} ps (VIOLATION)`}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-[#869397] uppercase">Max Freq (F_max)</span>
            <span className="text-base font-bold text-[#4cd7f6]">{maxFreqGhz} GHz</span>
          </div>
        </div>
      </div>

      {/* Chip Power Calculator */}
      <div className="p-5 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#4edea3] text-[22px]">bolt</span>
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white dark:text-white light:text-slate-900">
            Total Chip Power &amp; Thermal Dissipation
          </h3>
        </div>
        <p className="font-sans text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-4">
          Calculate dynamic switching power ($P = \alpha C V^2 f$) and sub-threshold leakage power for million-gate macroblocks.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 font-mono text-xs">
          <div>
            <label className="block text-[#869397] mb-1">Gates (M)</label>
            <input
              type="number"
              value={gateCountMillions}
              onChange={(e) => setGateCountMillions(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">Activity (α)</label>
            <input
              type="number"
              step="0.05"
              value={switchingAlpha}
              onChange={(e) => setSwitchingAlpha(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">C/Gate (fF)</label>
            <input
              type="number"
              step="0.1"
              value={capPerGateFf}
              onChange={(e) => setCapPerGateFf(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">VDD (V)</label>
            <input
              type="number"
              step="0.05"
              value={vddVolts}
              onChange={(e) => setVddVolts(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">Clock (GHz)</label>
            <input
              type="number"
              step="0.1"
              value={freqGhz}
              onChange={(e) => setFreqGhz(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[#869397] mb-1">I_leak (nA)</label>
            <input
              type="number"
              step="0.1"
              value={leakagePerGateNa}
              onChange={(e) => setLeakagePerGateNa(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 border border-[#3d494c]/40 text-white dark:text-white light:text-slate-900"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30 font-mono text-center">
          <div>
            <span className="block text-[10px] text-[#869397] uppercase">Dynamic Power (P_dyn)</span>
            <span className="text-base font-bold text-[#4cd7f6]">
              {pDynamicWatts.toFixed(2)} W
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-[#869397] uppercase">Static Leakage (P_leak)</span>
            <span className="text-base font-bold text-[#adc6ff]">
              {pStaticWatts.toFixed(2)} W
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-[#869397] uppercase">Total Dissipation (P_total)</span>
            <span className="text-base font-bold text-[#4edea3]">
              {pTotalWatts.toFixed(2)} W
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
