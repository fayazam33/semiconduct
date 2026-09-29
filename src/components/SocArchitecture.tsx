import React, { useState } from 'react';
import { SOC_BLOCKS } from '../data/vlsiData';

type WorkloadType = 'ai' | 'gaming' | 'video' | 'idle';

export const SocArchitecture: React.FC = () => {
  const [selectedWorkload, setSelectedWorkload] = useState<WorkloadType>('ai');
  const [inspectedBlockId, setInspectedBlockId] = useState<string>('npu');

  const inspectedBlock = SOC_BLOCKS.find((b) => b.id === inspectedBlockId) || SOC_BLOCKS[1];

  const getWorkloadStats = () => {
    switch (selectedWorkload) {
      case 'ai':
        return {
          title: 'On-Device AI Transformer Diffusion',
          totalPower: '7.8 W',
          temp: '54 °C',
          bandwidth: '840 GB/s',
          activeBlockIds: ['npu', 'slc', 'dram', 'noc'],
          desc: 'Systolic matrix engines saturated with Int8 tensor GEMM operations. 32MB SLC eliminates external DRAM bottleneck.'
        };
      case 'gaming':
        return {
          title: 'Hardware Ray-Traced 3D Gaming',
          totalPower: '14.2 W',
          temp: '68 °C',
          bandwidth: '1.1 TB/s',
          activeBlockIds: ['gpu', 'cpu', 'slc', 'dram', 'noc'],
          desc: '16-core GPU runs ray traversal shaders while CPU performance cores handle physics simulation and game logic.'
        };
      case 'video':
        return {
          title: '4K ProRes HDR Hardware Transcode',
          totalPower: '5.4 W',
          temp: '48 °C',
          bandwidth: '420 GB/s',
          activeBlockIds: ['pcie', 'dram', 'noc', 'cpu'],
          desc: 'Hardware NVMe PCIe streams raw frames through media pipelines directly into unified system cache.'
        };
      case 'idle':
        return {
          title: 'Sub-Microwatt Ambient Sleep / Audio',
          totalPower: '0.45 W',
          temp: '32 °C',
          bandwidth: '15 GB/s',
          activeBlockIds: ['cpu'],
          desc: 'Main performance clusters power-gated. A single efficiency core executes background audio DSP tasks.'
        };
    }
  };

  const currentWorkload = getWorkloadStats();

  return (
    <section className="px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full" id="soc">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#adc6ff] font-bold uppercase tracking-wider">
          06 / SILICON TOPOLOGY
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        Modern Heterogeneous SoC
      </h2>
      <p className="font-sans text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 leading-relaxed max-w-2xl">
        A flagship monolithic mobile die integrating compute engines, unified high-bandwidth memory interfaces, and sensory neural accelerators.
      </p>

      {/* Workload Preset Switcher */}
      <div className="mb-5 p-3.5 rounded-2xl bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 border border-[#3d494c]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
            Simulate Active Workload
          </span>
          <span className="font-mono text-xs text-[#4edea3] font-semibold">
            {currentWorkload.totalPower} @ {currentWorkload.temp}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'ai', label: 'AI Diffusion', icon: 'psychology' },
            { id: 'gaming', label: 'RT Gaming', icon: 'sports_esports' },
            { id: 'video', label: '4K Transcode', icon: 'movie' },
            { id: 'idle', label: 'Ultra Idle', icon: 'bedtime' },
          ].map((preset) => {
            const isActive = selectedWorkload === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedWorkload(preset.id as WorkloadType)}
                className={`py-2 px-3 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#06b6d4] to-[#0566d9] text-white font-bold border-cyan-400 shadow-md'
                    : 'bg-[#10131d] dark:bg-[#10131d] light:bg-white text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-700 border-[#3d494c]/20 hover:border-[#4cd7f6]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floorplan Layout & Block Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Die Floorplan Card (Left 7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 bg-[#181b26] dark:bg-[#181b26] light:bg-white rounded-2xl border border-[#3d494c]/30 shadow-xl">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3d494c]/30">
            <span className="font-mono text-xs text-[#4cd7f6] font-bold">
              DIE FLOORPLAN // 118 mm²
            </span>
            <span className="font-mono text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-500">
              TSMC N3E PROCESS
            </span>
          </div>

          {/* Grid representation */}
          <div className="grid grid-cols-6 gap-2 h-72 sm:h-80 text-center font-mono">
            {/* CPU Cores (Col 1-3, Row 1-2) */}
            <div
              onClick={() => setInspectedBlockId('cpu')}
              className={`col-span-3 row-span-2 rounded-xl p-3 flex flex-col justify-center items-center cursor-pointer transition-all border ${
                inspectedBlockId === 'cpu'
                  ? 'border-[#4cd7f6] ring-2 ring-[#4cd7f6]/40'
                  : 'border-[#3d494c]/30'
              } ${
                currentWorkload.activeBlockIds.includes('cpu')
                  ? 'bg-[#003640]/50 text-[#4cd7f6]'
                  : 'bg-[#10131d] text-[#869397] opacity-60'
              }`}
            >
              <span className="text-sm font-['Space_Grotesk'] font-bold text-white dark:text-white light:text-slate-900">
                High-Perf CPU
              </span>
              <span className="text-xs text-[#bcc9cd] mt-0.5">4P + 4E Cores</span>
              <span className="text-[10px] text-[#4cd7f6] mt-1 font-mono">4.8 GHz Peak</span>
            </div>

            {/* NPU Engine (Col 4-6, Row 1) */}
            <div
              onClick={() => setInspectedBlockId('npu')}
              className={`col-span-3 rounded-xl p-3 flex flex-col justify-center items-center cursor-pointer transition-all border ${
                inspectedBlockId === 'npu'
                  ? 'border-[#4edea3] ring-2 ring-[#4edea3]/40'
                  : 'border-[#3d494c]/30'
              } ${
                currentWorkload.activeBlockIds.includes('npu')
                  ? 'bg-[#003824]/50 text-[#4edea3]'
                  : 'bg-[#10131d] text-[#869397] opacity-60'
              }`}
            >
              <span className="text-sm font-['Space_Grotesk'] font-bold text-white dark:text-white light:text-slate-900">
                NPU / AI Engine
              </span>
              <span className="text-xs text-[#4edea3]">38 TOPS Matrix Core</span>
            </div>

            {/* SLC Cache (Col 4-6, Row 2) */}
            <div
              onClick={() => setInspectedBlockId('slc')}
              className={`col-span-3 rounded-xl p-3 flex flex-col justify-center items-center cursor-pointer transition-all border ${
                inspectedBlockId === 'slc'
                  ? 'border-[#06b6d4] ring-2 ring-[#06b6d4]/40'
                  : 'border-[#3d494c]/30'
              } ${
                currentWorkload.activeBlockIds.includes('slc')
                  ? 'bg-[#00424f]/50 text-[#4cd7f6]'
                  : 'bg-[#10131d] text-[#869397] opacity-60'
              }`}
            >
              <span className="text-sm font-['Space_Grotesk'] font-bold text-white dark:text-white light:text-slate-900">
                32MB System Cache
              </span>
              <span className="text-xs text-[#bcc9cd]">1.8 TB/s Ultra-low Latency</span>
            </div>

            {/* GPU Array (Col 1-4, Row 3-4) */}
            <div
              onClick={() => setInspectedBlockId('gpu')}
              className={`col-span-4 row-span-2 rounded-xl p-3 flex flex-col justify-center items-center cursor-pointer transition-all border ${
                inspectedBlockId === 'gpu'
                  ? 'border-[#adc6ff] ring-2 ring-[#adc6ff]/40'
                  : 'border-[#3d494c]/30'
              } ${
                currentWorkload.activeBlockIds.includes('gpu')
                  ? 'bg-[#002e6a]/50 text-[#adc6ff]'
                  : 'bg-[#10131d] text-[#869397] opacity-60'
              }`}
            >
              <span className="text-sm font-['Space_Grotesk'] font-bold text-white dark:text-white light:text-slate-900">
                16-Core Ray Tracing GPU
              </span>
              <span className="text-xs text-[#bcc9cd] mt-0.5">2048 Shader ALUs + BVH</span>
            </div>

            {/* Memory Controller (Col 5-6, Row 3) */}
            <div
              onClick={() => setInspectedBlockId('dram')}
              className={`col-span-2 rounded-xl p-2 flex flex-col justify-center items-center cursor-pointer transition-all border ${
                inspectedBlockId === 'dram'
                  ? 'border-[#4cd7f6] ring-2 ring-[#4cd7f6]/40'
                  : 'border-[#3d494c]/30'
              } ${
                currentWorkload.activeBlockIds.includes('dram')
                  ? 'bg-[#003640]/40 text-[#4cd7f6]'
                  : 'bg-[#10131d] text-[#869397] opacity-60'
              }`}
            >
              <span className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                LPDDR5X
              </span>
              <span className="text-[10px] text-[#4cd7f6]">8533 MT/s</span>
            </div>

            {/* High-Speed I/O (Col 5-6, Row 4) */}
            <div
              onClick={() => setInspectedBlockId('pcie')}
              className={`col-span-2 rounded-xl p-2 flex flex-col justify-center items-center cursor-pointer transition-all border ${
                inspectedBlockId === 'pcie'
                  ? 'border-[#adc6ff] ring-2 ring-[#adc6ff]/40'
                  : 'border-[#3d494c]/30'
              } ${
                currentWorkload.activeBlockIds.includes('pcie')
                  ? 'bg-[#002e6a]/40 text-[#adc6ff]'
                  : 'bg-[#10131d] text-[#869397] opacity-60'
              }`}
            >
              <span className="text-xs font-bold text-white dark:text-white light:text-slate-900">
                PCIe 5.0 / USB4
              </span>
              <span className="text-[10px] text-[#869397]">Thunderbolt PHY</span>
            </div>
          </div>

          {/* NoC Interconnect Bar */}
          <div
            onClick={() => setInspectedBlockId('noc')}
            className={`w-full mt-2.5 py-2 px-3 rounded-xl text-center cursor-pointer border transition-all ${
              inspectedBlockId === 'noc'
                ? 'border-[#4edea3] ring-2 ring-[#4edea3]/40'
                : 'border-[#3d494c]/30'
            } ${
              currentWorkload.activeBlockIds.includes('noc')
                ? 'bg-[#003824]/40 text-[#4edea3]'
                : 'bg-[#10131d] text-[#869397]'
            }`}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Coherent Network-on-Chip (NoC Bus 1.2 TB/s)
            </span>
          </div>
        </div>

        {/* Selected Block Specification Card (Right 5 cols) */}
        <div className="lg:col-span-5 bg-[#181b26] dark:bg-[#181b26] light:bg-white border border-[#3d494c]/30 rounded-2xl p-5 shadow-xl animate-in fade-in duration-200">
          <div className="pb-3 mb-4 border-b border-[#3d494c]/30">
            <span className="font-mono text-xs text-[#4cd7f6] font-bold block mb-1">
              {inspectedBlock.role.toUpperCase()} IP BLOCK
            </span>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white dark:text-white light:text-slate-900">
              {inspectedBlock.name}
            </h3>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-4 leading-relaxed">
            {inspectedBlock.description}
          </p>

          <div className="space-y-2 mb-4 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/20 flex justify-between">
              <span className="text-[#869397]">Silicon Area</span>
              <span className="font-bold text-[#4cd7f6]">{inspectedBlock.area}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/20 flex justify-between">
              <span className="text-[#869397]">Peak Power Budget</span>
              <span className="font-bold text-[#4edea3]">{inspectedBlock.power}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-slate-50 border border-[#3d494c]/20 flex justify-between">
              <span className="text-[#869397]">Target Spec</span>
              <span className="font-bold text-white dark:text-white light:text-slate-900 truncate ml-2">
                {inspectedBlock.spec}
              </span>
            </div>
          </div>

          {/* Architectural Note */}
          <div className="p-3 rounded-xl bg-[#10131d]/60 border border-[#3d494c]/20 text-xs text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600">
            <strong className="text-[#4cd7f6] font-mono block mb-1">Architectural Insight:</strong>
            Heterogeneous architectures maximize energy efficiency by offloading domain-specific mathematical transforms to custom systolic engines instead of executing them on general-purpose ALU cores.
          </div>
        </div>
      </div>
    </section>
  );
};
