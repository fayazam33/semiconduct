import React, { useState } from 'react';

interface DieBlockInfo {
  id: string;
  name: string;
  type: string;
  density: string;
  freq: string;
  power: string;
  desc: string;
}

export const DieSchematic: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'metal' | 'logic'>('all');
  const [selectedBlock, setSelectedBlock] = useState<DieBlockInfo | null>({
    id: 'npu',
    name: 'NPU-AI Accelerator',
    type: 'Tensor Matrix Core',
    density: '38 TOPS Int8 / 19 TFLOPS FP16',
    freq: '2.10 GHz',
    power: '3.6 W',
    desc: 'High-density systolic array specialized for matrix multiplications, transformer attention, and on-device generative AI workloads.'
  });

  const blocks: Record<string, DieBlockInfo> = {
    cpu: {
      id: 'cpu',
      name: 'CPU-8C Heterogeneous Cluster',
      type: 'ARMv9.2 / RISC-V Out-of-Order',
      density: '4P + 4E Cores (192KB L1 + 8MB L2)',
      freq: '4.80 GHz Peak',
      power: '4.2 W Avg',
      desc: 'High-IPC performance cluster paired with energy-efficient micro-cores for sustained serial thread processing.'
    },
    npu: {
      id: 'npu',
      name: 'NPU-AI Accelerator',
      type: 'Tensor Matrix Core',
      density: '38 TOPS Int8 / 19 TFLOPS FP16',
      freq: '2.10 GHz',
      power: '3.6 W',
      desc: 'High-density systolic array specialized for matrix multiplications, transformer attention, and on-device generative AI workloads.'
    },
    gpu: {
      id: 'gpu',
      name: 'GPU Core Cluster (16-Core)',
      type: 'SIMD Vector Shaders & BVH Ray Tracing',
      density: '2048 Compute Units',
      freq: '1.40 GHz',
      power: '8.5 W Peak',
      desc: 'Hardware BVH bounding-box traversal units and high-throughput vector ALUs for real-time ray-traced rendering and compute shaders.'
    },
    slc: {
      id: 'slc',
      name: 'System-Level Cache (SLC)',
      type: 'Ultra-Dense Embedded SRAM',
      density: '32MB Unified Pool (48-way)',
      freq: '3.20 GHz',
      power: '1.2 W',
      desc: 'High-bandwidth, low-power SRAM buffer reducing DRAM memory bus latency and DRAM energy consumption by over 65%.'
    },
    pcie: {
      id: 'pcie',
      name: 'PCIe Gen 6.0 Subsystem',
      type: 'PAM4 High-Speed SerDes PHY',
      density: '64 GT/s per Lane (x16)',
      freq: 'Differential 32 GHz',
      power: '1.4 W',
      desc: 'High-speed serialized differential interface routing directly to NVMe SSDs and external high-speed co-processors.'
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#181b26] dark:bg-[#181b26] light:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#3d494c]/40 relative overflow-hidden transition-all">
      {/* Top Header & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#3d494c]/30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></div>
          <span className="font-mono text-xs text-[#bcc9cd] tracking-wider uppercase font-semibold">
            FLIP-CHIP DIE // BGA-3240
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#4cd7f6]/15 text-[#4cd7f6] font-bold border border-[#4cd7f6]/30">
            N2 / 2nm GAAFET
          </span>
        </div>
      </div>

      {/* Layer Filter Buttons */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[11px] font-mono text-[#869397] mr-1 hidden xs:inline">VIEW:</span>
        <button
          onClick={() => setActiveLayer('all')}
          className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
            activeLayer === 'all'
              ? 'bg-[#06b6d4] text-white font-bold'
              : 'bg-[#262a35] text-[#bcc9cd] hover:text-white'
          }`}
        >
          All Layers
        </button>
        <button
          onClick={() => setActiveLayer('logic')}
          className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
            activeLayer === 'logic'
              ? 'bg-[#06b6d4] text-white font-bold'
              : 'bg-[#262a35] text-[#bcc9cd] hover:text-white'
          }`}
        >
          Logic Cores
        </button>
        <button
          onClick={() => setActiveLayer('metal')}
          className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
            activeLayer === 'metal'
              ? 'bg-[#06b6d4] text-white font-bold'
              : 'bg-[#262a35] text-[#bcc9cd] hover:text-white'
          }`}
        >
          M9 Power Mesh
        </button>
      </div>

      {/* Vector Die Cross-section and Micro-bus Layout */}
      <div className="w-full h-56 sm:h-64 bg-[#0a0e18] rounded-xl relative flex items-center justify-center overflow-hidden border border-[#3d494c]/30 shadow-inner">
        <svg
          viewBox="0 0 320 180"
          className="w-full h-full p-2 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Substrate wafer grid lines */}
          <pattern id="siliconGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(76, 215, 246, 0.08)" strokeWidth="0.75" />
          </pattern>
          <rect width="320" height="180" fill="url(#siliconGrid)" />

          {/* Outer Package Heat Spreader */}
          <rect
            x="22"
            y="12"
            width="276"
            height="156"
            rx="10"
            fill="#181b26"
            stroke="#262a35"
            strokeWidth="1.5"
          />

          {/* Silicon Die Boundary */}
          <rect
            x="50"
            y="28"
            width="220"
            height="124"
            rx="6"
            fill="#10131d"
            stroke="#3d494c"
            strokeWidth="1"
          />

          {/* M9 Power Ring (Conditional on layer) */}
          {(activeLayer === 'all' || activeLayer === 'metal') && (
            <g className="transition-opacity duration-300">
              <rect
                x="58"
                y="36"
                width="204"
                height="108"
                rx="4"
                fill="none"
                stroke="#0566d9"
                strokeDasharray="4 2"
                strokeWidth="1.5"
              />
              <line x1="58" y1="90" x2="262" y2="90" stroke="#0566d9" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
            </g>
          )}

          {/* Core compute clusters (CPU, NPU, GPU, SLC, PCIe) */}
          {(activeLayer === 'all' || activeLayer === 'logic') && (
            <g className="transition-opacity duration-300">
              {/* CPU-8C */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedBlock(blocks.cpu)}
              >
                <rect
                  x="70"
                  y="46"
                  width="44"
                  height="42"
                  rx="4"
                  fill={selectedBlock?.id === 'cpu' ? '#003640' : '#1c1f2a'}
                  stroke={selectedBlock?.id === 'cpu' ? '#4cd7f6' : '#262a35'}
                  strokeWidth={selectedBlock?.id === 'cpu' ? '1.5' : '1'}
                />
                <text x="76" y="66" fill="#4cd7f6" fontFamily="JetBrains Mono" fontSize="7.5" fontWeight="700">
                  CPU-8C
                </text>
                <text x="76" y="77" fill="#869397" fontFamily="JetBrains Mono" fontSize="6">
                  4P + 4E
                </text>
              </g>

              {/* NPU-AI */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedBlock(blocks.npu)}
              >
                <rect
                  x="120"
                  y="46"
                  width="44"
                  height="42"
                  rx="4"
                  fill={selectedBlock?.id === 'npu' ? '#003824' : '#1c1f2a'}
                  stroke={selectedBlock?.id === 'npu' ? '#4edea3' : '#262a35'}
                  strokeWidth={selectedBlock?.id === 'npu' ? '1.5' : '1'}
                />
                <text x="126" y="66" fill="#4edea3" fontFamily="JetBrains Mono" fontSize="7.5" fontWeight="700">
                  NPU-AI
                </text>
                <text x="126" y="77" fill="#869397" fontFamily="JetBrains Mono" fontSize="6">
                  38 TOPS
                </text>
              </g>

              {/* GPU CORE CLUSTER */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedBlock(blocks.gpu)}
              >
                <rect
                  x="170"
                  y="46"
                  width="88"
                  height="42"
                  rx="4"
                  fill={selectedBlock?.id === 'gpu' ? '#002e6a' : '#1c1f2a'}
                  stroke={selectedBlock?.id === 'gpu' ? '#adc6ff' : '#262a35'}
                  strokeWidth={selectedBlock?.id === 'gpu' ? '1.5' : '1'}
                />
                <text x="180" y="66" fill="#adc6ff" fontFamily="JetBrains Mono" fontSize="7.5" fontWeight="700">
                  GPU CLUSTER
                </text>
                <text x="180" y="77" fill="#869397" fontFamily="JetBrains Mono" fontSize="6">
                  16-Core RT
                </text>
              </g>

              {/* SYSTEM CACHE (SLC) */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedBlock(blocks.slc)}
              >
                <rect
                  x="70"
                  y="96"
                  width="134"
                  height="36"
                  rx="4"
                  fill={selectedBlock?.id === 'slc' ? '#00424f' : '#181b26'}
                  stroke={selectedBlock?.id === 'slc' ? '#06b6d4' : '#262a35'}
                  strokeWidth={selectedBlock?.id === 'slc' ? '1.5' : '1'}
                />
                <text x="100" y="117" fill="#4cd7f6" fontFamily="JetBrains Mono" fontSize="7.5" fontWeight="700">
                  SYSTEM CACHE (32MB SLC)
                </text>
              </g>

              {/* PCIe G6 */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedBlock(blocks.pcie)}
              >
                <rect
                  x="210"
                  y="96"
                  width="48"
                  height="36"
                  rx="4"
                  fill={selectedBlock?.id === 'pcie' ? '#002e6a' : '#181b26'}
                  stroke={selectedBlock?.id === 'pcie' ? '#adc6ff' : '#262a35'}
                  strokeWidth={selectedBlock?.id === 'pcie' ? '1.5' : '1'}
                />
                <text x="216" y="117" fill="#adc6ff" fontFamily="JetBrains Mono" fontSize="7" fontWeight="700">
                  PCIe G6
                </text>
              </g>
            </g>
          )}

          {/* Interconnect Pulse Waves */}
          <path d="M 92 88 L 92 96" stroke="#4cd7f6" strokeLinecap="round" strokeWidth="2">
            <animate attributeName="opacity" dur="1.8s" repeatCount="indefinite" values="0.3;1;0.3" />
          </path>
          <path d="M 142 88 L 142 96" stroke="#4edea3" strokeLinecap="round" strokeWidth="2">
            <animate attributeName="opacity" dur="1.2s" repeatCount="indefinite" values="0.2;1;0.2" />
          </path>
          <path d="M 214 88 L 214 96" stroke="#adc6ff" strokeLinecap="round" strokeWidth="2">
            <animate attributeName="opacity" dur="2.1s" repeatCount="indefinite" values="0.4;1;0.4" />
          </path>

          {/* Micro Solder Bumps (BGA Array on peripheral) */}
          {[32, 56, 80, 104, 128, 148].map((y, i) => (
            <React.Fragment key={`bump-${i}`}>
              <circle cx="34" cy={y} r="2.5" fill="#4cd7f6" opacity="0.8" />
              <circle cx="286" cy={y} r="2.5" fill="#4cd7f6" opacity="0.8" />
            </React.Fragment>
          ))}
        </svg>

        {/* Live Click Hint */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-[#3d494c]/40 text-[10px] font-mono text-[#bcc9cd]">
          Tap any block to inspect
        </div>
      </div>

      {/* Selected Block Micro-Inspector */}
      {selectedBlock && (
        <div className="mt-3 p-3 rounded-xl bg-[#10131d] border border-[#3d494c]/40 text-left animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
            <span className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
              {selectedBlock.name}
            </span>
            <span className="font-mono text-xs text-[#4edea3] font-semibold">
              {selectedBlock.freq}
            </span>
          </div>
          <p className="text-xs text-[#bcc9cd] mb-2 leading-relaxed">
            {selectedBlock.desc}
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px] pt-2 border-t border-[#3d494c]/20">
            <div className="p-1 rounded bg-[#181b26]">
              <span className="block text-[9px] text-[#869397] uppercase">Capacity</span>
              <span className="font-semibold text-white truncate block">{selectedBlock.density}</span>
            </div>
            <div className="p-1 rounded bg-[#181b26]">
              <span className="block text-[9px] text-[#869397] uppercase">Architecture</span>
              <span className="font-semibold text-[#4cd7f6] truncate block">{selectedBlock.type}</span>
            </div>
            <div className="p-1 rounded bg-[#181b26]">
              <span className="block text-[9px] text-[#869397] uppercase">Power Est.</span>
              <span className="font-semibold text-[#4edea3] truncate block">{selectedBlock.power}</span>
            </div>
          </div>
        </div>
      )}

      {/* Real-time telemetry indicators below die */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#3d494c]/30">
        <div className="bg-[#10131d] rounded-lg p-2 text-center border border-[#3d494c]/20">
          <span className="block font-mono text-[10px] text-[#869397] uppercase tracking-wider">
            Logic Density
          </span>
          <span className="font-mono text-xs sm:text-sm text-[#4cd7f6] font-bold">
            290 MTr/mm²
          </span>
        </div>
        <div className="bg-[#10131d] rounded-lg p-2 text-center border border-[#3d494c]/20">
          <span className="block font-mono text-[10px] text-[#869397] uppercase tracking-wider">
            Power Track
          </span>
          <span className="font-mono text-xs sm:text-sm text-[#4edea3] font-bold">
            0.75V VDD
          </span>
        </div>
        <div className="bg-[#10131d] rounded-lg p-2 text-center border border-[#3d494c]/20">
          <span className="block font-mono text-[10px] text-[#869397] uppercase tracking-wider">
            Clock Mesh
          </span>
          <span className="font-mono text-xs sm:text-sm text-[#adc6ff] font-bold">
            4.80 GHz
          </span>
        </div>
      </div>
    </div>
  );
};
