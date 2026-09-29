export type TabType = 'home' | 'concepts' | 'flow' | 'cmos-lab' | 'soc' | 'roadmap' | 'calc';

export interface ChipBlock {
  id: string;
  name: string;
  category: 'compute' | 'memory' | 'interconnect' | 'io';
  areaMm2: number;
  powerWatts: number;
  description: string;
  clockGhz?: number;
  specs: Record<string, string>;
}

export interface HierarchyNode {
  level: number;
  name: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  keyConcepts: string[];
  equation?: string;
  realWorldExample: string;
}

export interface Milestone {
  id: number;
  title: string;
  phase: string;
  description: string;
  topics: string[];
  recommendedTools: string[];
  estimatedHours: number;
}

export interface CoreConcept {
  id: string;
  title: string;
  icon: string;
  tag: string;
  summary: string;
  deepDive: string;
  formula?: string;
  formulaExplanation?: string;
  industryTools: string[];
}

export interface AsicStage {
  id: number;
  name: string;
  phase: 'Front-End' | 'Synthesis' | 'Back-End' | 'Foundry';
  description: string;
  deliverables: string[];
  keyTools: string[];
  criticalChecks: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}
