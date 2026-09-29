import React, { useState } from 'react';
import { HIERARCHY_NODES } from '../data/vlsiData';
import { HierarchyNode } from '../types/vlsi';

export const WhatIsVlsi: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(HIERARCHY_NODES[0]);

  return (
    <section className="px-3 sm:px-6 py-8 max-w-4xl mx-auto w-full" id="what-is-vlsi">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-[#4cd7f6] font-bold uppercase tracking-wider">
          01 / FOUNDATION
        </span>
        <div className="h-px flex-1 bg-[#3d494c]/30"></div>
      </div>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 mb-2">
        What is VLSI?
      </h2>
      <p className="font-sans text-sm sm:text-base text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 mb-6 leading-relaxed">
        Very Large Scale Integration is the engineering discipline of compounding billions of metal-oxide-semiconductor field-effect switches into microscopic monolithic silicon architectures operating in gigahertz clock domains.
      </p>

      {/* Interactive Abstraction Hierarchy Tree */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Tree Column */}
        <div className="md:col-span-6 flex flex-col gap-2.5 relative">
          {/* Trace conduit line connecting levels */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#4cd7f6] via-[#4edea3] to-[#adc6ff] opacity-40"></div>

          {HIERARCHY_NODES.map((node) => {
            const isSelected = selectedNode?.level === node.level;
            return (
              <button
                key={node.level}
                onClick={() => setSelectedNode(node)}
                className={`relative pl-12 pr-4 py-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#181b26] dark:bg-[#181b26] light:bg-slate-100 border-[#4cd7f6]/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#10131d] dark:bg-[#10131d] light:bg-white border-[#3d494c]/20 hover:border-[#3d494c]/60'
                }`}
              >
                {/* Node Dot on Conduit */}
                <div className="absolute left-6 w-4 h-4 rounded-full bg-[#0a0e18] flex items-center justify-center -translate-x-1/2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      node.level === 1
                        ? 'bg-[#4cd7f6] animate-pulse'
                        : node.level === 2
                        ? 'bg-[#4cd7f6]'
                        : node.level === 3
                        ? 'bg-[#4edea3]'
                        : node.level === 4
                        ? 'bg-[#adc6ff]'
                        : 'bg-[#acedff]'
                    }`}
                  ></div>
                </div>

                <div className="min-w-0 pr-2">
                  <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-900 truncate">
                    {node.level}. {node.name}
                  </h3>
                  <p className="font-sans text-xs text-[#869397] truncate mt-0.5">
                    {node.subtitle}
                  </p>
                </div>

                <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${node.badgeColor}`}>
                  {node.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Inspector */}
        <div className="md:col-span-6 bg-[#181b26] dark:bg-[#181b26] light:bg-slate-50 border border-[#3d494c]/30 rounded-2xl p-4 sm:p-5 shadow-xl">
          {selectedNode ? (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#3d494c]/30">
                <div>
                  <span className="font-mono text-xs text-[#4cd7f6] font-bold block">
                    LEVEL 0{selectedNode.level} INSPECTION
                  </span>
                  <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white dark:text-white light:text-slate-900">
                    {selectedNode.name} Tier
                  </h4>
                </div>
                <span className={`font-mono text-xs px-2.5 py-1 rounded font-bold uppercase ${selectedNode.badgeColor}`}>
                  {selectedNode.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#bcc9cd] dark:text-[#bcc9cd] light:text-slate-600 leading-relaxed mb-4">
                {selectedNode.description}
              </p>

              {/* Equation Box if available */}
              {selectedNode.equation && (
                <div className="p-3 rounded-xl bg-[#10131d] dark:bg-[#10131d] light:bg-white border border-[#3d494c]/30 mb-4 font-mono text-xs">
                  <span className="block text-[10px] text-[#4edea3] uppercase font-bold mb-1">
                    Governing Equation
                  </span>
                  <code className="text-[#4cd7f6] break-all block">
                    {selectedNode.equation}
                  </code>
                </div>
              )}

              {/* Key Architectural Concepts */}
              <div className="mb-4">
                <span className="font-mono text-xs text-[#869397] uppercase tracking-wider font-semibold block mb-2">
                  Key Engineering Concepts
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {selectedNode.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-[#10131d] dark:bg-[#10131d] light:bg-white border border-[#3d494c]/20 text-xs font-mono text-[#e0e2f1] dark:text-[#e0e2f1] light:text-slate-800 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
                      <span className="truncate">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Example */}
              <div className="p-3 rounded-xl bg-[#10131d]/60 border border-[#3d494c]/20">
                <span className="text-[10px] font-mono uppercase text-[#adc6ff] font-bold block mb-0.5">
                  Commercial Silicon Example
                </span>
                <p className="text-xs text-[#bcc9cd]">
                  {selectedNode.realWorldExample}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-xs text-[#869397] font-mono">
              Select a tier above to inspect
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
