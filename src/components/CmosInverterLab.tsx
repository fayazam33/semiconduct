import React, { useState } from 'react';

export const CmosInverterLab: React.FC = () => {
  // Digital input state: 0 = GND (0.0V), 1 = VDD
  const [inputState, setInputState] = useState<0 | 1>(0);

  // Tunable circuit parameters
  const [vdd, setVdd] = useState<number>(1.2); // Volts
  const [wpWnRatio, setWpWnRatio] = useState<number>(2.5); // Sizing ratio
  const [freqGhz, setFreqGhz] = useState<number>(2.0); // GHz
  const [cLoadFemto, setCLoadFemto] = useState<number>(15); // fF

  // Dynamic power calculation: P = 0.5 * C * V^2 * f (alpha = 0.5 for typical switching activity)
  // C in Farads = cLoadFemto * 1e-15, f in Hz = freqGhz * 1e9, P in Watts
  const alpha = 0.5;
  const powerWatts = alpha * (cLoadFemto * 1e-15) * (vdd * vdd) * (freqGhz * 1e9);
  const powerMicroWatts = (powerWatts * 1e6).toFixed(2);

  // Switching thresholds
  const vtn = 0.35 * vdd;
  const vtp = 0.35 * vdd;
  const vM = (vdd / 2) * (1 + 0.1 * (wpWnRatio - 2.5)); // Midpoint switching threshold

  const toggleInput = () => {
    setInputState((prev) => (prev === 0 ? 1 : 0));
  };

  const isLow = inputState === 0;

  return (
    <section className="px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full" id="cmos-lab">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
          05 / LIVE SIMULATOR
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        Interactive CMOS Inverter Lab
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 leading-relaxed max-w-2xl">
        Toggle the digital input signal (VIN) to observe how complementary PMOS and NMOS channels switch voltage to output (VOUT), evaluate sizing ratios, and observe dynamic switching power.
      </p>

      {/* Main Lab Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Schematic & State Inspection Canvas (Left/Top) */}
        <div className="lg:col-span-7 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#3d494c]/40">
          {/* Input Control Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0a0e18] dark:bg-[#0a0e18] light:bg-slate-100 border border-[#3d494c]/30 mb-4">
            <div>
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider block font-semibold">
                Digital Input Control
              </span>
              <span
                className={`font-mono text-sm sm:text-base font-bold ${
                  isLow ? 'text-[#4cd7f6]' : 'text-[#4edea3]'
                }`}
              >
                VIN = {inputState} ({isLow ? '0.0V / GND' : `+${vdd.toFixed(1)}V / VDD`})
              </span>
            </div>

            <button
              onClick={toggleInput}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-mono text-xs sm:text-sm font-semibold active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              <span>Switch to {isLow ? '1' : '0'}</span>
            </button>
          </div>

          {/* Schematic Diagram Canvas */}
          <div className="w-full bg-[#0a0e18] rounded-xl p-3 sm:p-4 relative flex flex-col items-center border border-[#3d494c]/30 shadow-inner">
            <svg
              viewBox="0 0 300 240"
              className="w-full h-64 sm:h-72 select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* VDD Top Rail */}
              <line x1="90" y1="20" x2="210" y2="20" stroke="#869397" strokeWidth="2" />
              <text x="122" y="15" fill="#4edea3" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">
                VDD (+{vdd.toFixed(1)}V)
              </text>

              {/* Wire from VDD to PMOS Source */}
              <line
                x1="150"
                y1="20"
                x2="150"
                y2="55"
                stroke={isLow ? '#4edea3' : '#3d494c'}
                strokeWidth={isLow ? '3' : '1.5'}
                className="transition-colors duration-300"
              />

              {/* PMOS Transistor Symbol */}
              <g className={`transition-opacity duration-300 ${!isLow ? 'opacity-35' : 'opacity-100'}`}>
                {/* PMOS Channel Box */}
                <rect
                  x="135"
                  y="55"
                  width="30"
                  height="36"
                  rx="3"
                  fill="#181b26"
                  stroke={isLow ? '#4cd7f6' : '#869397'}
                  strokeWidth={isLow ? '2' : '1'}
                />
                {/* PMOS Inversion Bubble */}
                <circle
                  cx="128"
                  cy="73"
                  r="4.5"
                  fill="#10131d"
                  stroke={isLow ? '#4cd7f6' : '#869397'}
                  strokeWidth="1.5"
                />
                <text x="175" y="72" fill="#e0e2f1" fontFamily="Space Grotesk" fontSize="11" fontWeight="700">
                  PMOS (Wp={wpWnRatio.toFixed(1)}λ)
                </text>
                <text
                  x="175"
                  y="85"
                  fill={isLow ? '#4edea3' : '#869397'}
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fontWeight="600"
                >
                  {isLow ? 'ON (Conducting)' : 'OFF (Cutoff)'}
                </text>
              </g>

              {/* PMOS to Output Node */}
              <line
                x1="150"
                y1="91"
                x2="150"
                y2="120"
                stroke={isLow ? '#4edea3' : '#3d494c'}
                strokeWidth={isLow ? '3' : '1.5'}
                className="transition-colors duration-300"
              />

              {/* NMOS to Output Node */}
              <line
                x1="150"
                y1="120"
                x2="150"
                y2="149"
                stroke={!isLow ? '#4edea3' : '#3d494c'}
                strokeWidth={!isLow ? '3' : '1.5'}
                className="transition-colors duration-300"
              />

              {/* Central Junction Dot */}
              <circle cx="150" cy="120" r="4" fill={isLow ? '#4cd7f6' : '#869397'} />

              {/* Output Wire and Pin */}
              <line
                x1="150"
                y1="120"
                x2="225"
                y2="120"
                stroke={isLow ? '#4cd7f6' : '#869397'}
                strokeWidth={isLow ? '3' : '1.5'}
                className="transition-colors duration-300"
              />
              <circle
                cx="230"
                cy="120"
                r="6"
                fill={isLow ? '#4cd7f6' : '#869397'}
                className={isLow ? 'animate-pulse' : ''}
              />
              <text
                x="242"
                y="124"
                fill={isLow ? '#4cd7f6' : '#869397'}
                fontFamily="JetBrains Mono"
                fontSize="12"
                fontWeight="700"
              >
                VOUT = {isLow ? '1' : '0'} ({isLow ? `+${vdd.toFixed(1)}V` : '0V'})
              </text>

              {/* Input Gate Trace */}
              <line x1="60" y1="120" x2="105" y2="120" stroke="#869397" strokeWidth="2" />
              <line x1="105" y1="73" x2="105" y2="167" stroke="#869397" strokeWidth="2" />
              <line x1="105" y1="73" x2="123" y2="73" stroke="#869397" strokeWidth="2" />
              <line x1="105" y1="167" x2="135" y2="167" stroke="#869397" strokeWidth="2" />
              <circle cx="60" cy="120" r="5" fill={isLow ? '#869397' : '#4edea3'} />
              <text
                x="15"
                y="124"
                fill={isLow ? '#869397' : '#4edea3'}
                fontFamily="JetBrains Mono"
                fontSize="11"
                fontWeight="700"
              >
                VIN ({isLow ? '0V' : `+${vdd.toFixed(1)}V`})
              </text>

              {/* NMOS Transistor Symbol */}
              <g className={`transition-opacity duration-300 ${isLow ? 'opacity-35' : 'opacity-100'}`}>
                {/* NMOS Channel Box */}
                <rect
                  x="135"
                  y="149"
                  width="30"
                  height="36"
                  rx="3"
                  fill="#181b26"
                  stroke={!isLow ? '#4edea3' : '#869397'}
                  strokeWidth={!isLow ? '2' : '1'}
                />
                <text x="175" y="167" fill="#e0e2f1" fontFamily="Space Grotesk" fontSize="11" fontWeight="700">
                  NMOS (Wn=1.0λ)
                </text>
                <text
                  x="175"
                  y="180"
                  fill={!isLow ? '#4edea3' : '#869397'}
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  fontWeight="600"
                >
                  {!isLow ? 'ON (Conducting)' : 'OFF (Cutoff)'}
                </text>
              </g>

              {/* NMOS to Ground Rail */}
              <line
                x1="150"
                y1="185"
                x2="150"
                y2="215"
                stroke={!isLow ? '#4edea3' : '#3d494c'}
                strokeWidth={!isLow ? '3' : '1.5'}
                className="transition-colors duration-300"
              />

              {/* GND Rail Symbol */}
              <line x1="125" y1="215" x2="175" y2="215" stroke="#869397" strokeWidth="2" />
              <line x1="135" y1="220" x2="165" y2="220" stroke="#869397" strokeWidth="1.5" />
              <line x1="145" y1="225" x2="155" y2="225" stroke="#869397" strokeWidth="1.5" />
              <text x="133" y="238" fill="#869397" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600">
                GND (0V)
              </text>
            </svg>
          </div>

          {/* Real-time State Physics Explanation Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/30 text-xs font-sans text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800">
            <span className="font-mono text-xs text-[#4edea3] font-bold block mb-1">
              Solid-State Physics Analysis:
            </span>
            {isLow ? (
              <p className="leading-relaxed text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600">
                Because <strong className="text-white dark:text-white light:text-slate-900">VIN is LOW (0.0V)</strong>, PMOS gate-source potential |Vgs| = {vdd.toFixed(1)}V &gt; |Vtp| ({vtp.toFixed(2)}V). An inverted hole conduction channel is established, creating a low-resistance path that charges the load capacitor $C_L$ directly to{' '}
                <strong className="text-[#4cd7f6]">VDD (HIGH / Logic 1)</strong>. The NMOS has Vgs = 0V &lt; Vtn ({vtn.toFixed(2)}V), leaving it in high-impedance sub-threshold cutoff with zero static current.
              </p>
            ) : (
              <p className="leading-relaxed text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600">
                Because <strong className="text-white dark:text-white light:text-slate-900">VIN is HIGH (+{vdd.toFixed(1)}V)</strong>, NMOS gate-source potential Vgs = {vdd.toFixed(1)}V &gt; Vtn ({vtn.toFixed(2)}V). An inverted electron channel is formed, pulling VOUT down to{' '}
                <strong className="text-[#4edea3]">GND (LOW / Logic 0)</strong>. The PMOS has |Vgs| = 0V &lt; |Vtp|, rendering the pull-up network completely non-conductive.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Sizing Sliders, Power Metric & VTC Curve */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Circuit Parameter Tuning Card */}
          <div className="p-4 sm:p-5 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
            <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider block mb-3">
              Circuit Parameter Tuning
            </span>

            {/* VDD Slider */}
            <div className="mb-3.5">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#869397]">Supply Voltage (VDD)</span>
                <span className="text-[#4edea3] font-bold">{vdd.toFixed(2)} V</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.8"
                step="0.05"
                value={vdd}
                onChange={(e) => setVdd(parseFloat(e.target.value))}
                className="w-full accent-[#06b6d4] cursor-pointer"
              />
            </div>

            {/* PMOS/NMOS Sizing Ratio Slider */}
            <div className="mb-3.5">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#869397]">Sizing Ratio (Wp / Wn)</span>
                <span className="text-[#4cd7f6] font-bold">{wpWnRatio.toFixed(2)}×</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.5"
                step="0.1"
                value={wpWnRatio}
                onChange={(e) => setWpWnRatio(parseFloat(e.target.value))}
                className="w-full accent-[#06b6d4] cursor-pointer"
              />
              <span className="text-[10px] text-[#869397] font-mono mt-0.5 block">
                Balanced mobility: μn ≈ 2.5·μp requires Wp ≈ 2.5·Wn for symmetric rise/fall times.
              </span>
            </div>

            {/* Frequency Slider */}
            <div className="mb-3.5">
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#869397]">Clock Frequency (f)</span>
                <span className="text-[#adc6ff] font-bold">{freqGhz.toFixed(1)} GHz</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.5"
                step="0.1"
                value={freqGhz}
                onChange={(e) => setFreqGhz(parseFloat(e.target.value))}
                className="w-full accent-[#06b6d4] cursor-pointer"
              />
            </div>

            {/* Load Capacitance Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#869397]">Load Capacitance (CL)</span>
                <span className="text-[#acedff] font-bold">{cLoadFemto} fF</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={cLoadFemto}
                onChange={(e) => setCLoadFemto(parseInt(e.target.value))}
                className="w-full accent-[#06b6d4] cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Power Gauge Card */}
          <div className="p-4 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
            <span className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider block mb-1">
              Dynamic Power Dissipation
            </span>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
                {powerMicroWatts}
              </span>
              <span className="font-mono text-sm text-[#4edea3] font-bold">µW / gate</span>
            </div>
            <p className="font-mono text-[11px] text-[#869397] mb-2">
              Formula: P = α · CL · VDD² · f = 0.5 × {cLoadFemto}fF × ({vdd}V)² × {freqGhz}GHz
            </p>
            <div className="p-2 rounded bg-[#10131d] dark:bg-[#10131d] light:bg-slate-100 text-[11px] font-mono text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-700">
              Switching Threshold $V_M$: <span className="text-[#4cd7f6] font-bold">{vM.toFixed(2)} V</span>
            </div>
          </div>

          {/* Truth Table */}
          <div className="p-4 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
            <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider block mb-2">
              Inverter Truth Table &amp; Channel State
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-center font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#3d494c]/30 text-[#869397]">
                    <th className="py-1 px-2">VIN</th>
                    <th className="py-1 px-2">PMOS</th>
                    <th className="py-1 px-2">NMOS</th>
                    <th className="py-1 px-2">VOUT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b border-[#3d494c]/20 ${isLow ? 'bg-[#003640]/30 font-bold' : ''}`}>
                    <td className="py-1.5 text-[#4cd7f6]">0 (0V)</td>
                    <td className="text-[#4edea3]">ON</td>
                    <td className="text-[#869397]">OFF</td>
                    <td className="text-[#4cd7f6]">1 (+{vdd}V)</td>
                  </tr>
                  <tr className={!isLow ? 'bg-[#003824]/30 font-bold' : ''}>
                    <td className="py-1.5 text-[#4edea3]">1 (+{vdd}V)</td>
                    <td className="text-[#869397]">OFF</td>
                    <td className="text-[#4edea3]">ON</td>
                    <td className="text-[#869397]">0 (0V)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
