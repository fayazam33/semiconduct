import { AsicStage, CoreConcept, HierarchyNode, Milestone, QuizQuestion } from '../types/vlsi';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1V12A1h9_Mt67dB8UILMJxHNQPKVeTAcCfqjdjY4YJT_cO8l_RnqsNm-HiQB8l2b5I1yz33iuHYAhEGBc3NPEGVcFWlq3LeFZ59MJP5of-Ec8N1W-NG-KZVu2wIM1V9fq1EQFUx2HCiTca_1ER0rZ_QZjJ0XhU34U0Lc7CUxvbIVjY5cHYjRsO3Ae5ic-VpFlT6e9f7Yr3rkbsnKKMTM2CfOjr3J2DDTJF_vV9ynSDgKudNkdFq9N2J134';

export const HIERARCHY_NODES: HierarchyNode[] = [
  {
    level: 1,
    name: 'Transistor',
    subtitle: 'Gate-All-Around (GAA) nanosheet switch',
    badge: '< 3nm',
    badgeColor: 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/60',
    description: 'The fundamental atomic-scale semiconductor building block. Modern nodes employ GAAFET (nanosheets) where the gate dielectric wraps all four sides of stacked silicon channels for maximum electrostatic gate control and minimum sub-threshold leakage.',
    keyConcepts: ['Channel Length (Lg ~ 12nm)', 'Threshold Voltage (Vth)', 'Drain-Induced Barrier Lowering (DIBL)', 'Subthreshold Swing (SS ~ 65 mV/dec)'],
    equation: 'I_{ds} = \\mu C_{ox} \\frac{W}{L} \\left( (V_{gs} - V_{th})V_{ds} - \\frac{V_{ds}^2}{2} \\right)',
    realWorldExample: 'TSMC N2 / Intel 18A RibbonFET technology with ~100M+ transistors per square millimeter.'
  },
  {
    level: 2,
    name: 'Logic Gate',
    subtitle: 'Static CMOS NAND, NOR & Inverters',
    badge: 'Boolean',
    badgeColor: 'text-sky-300 bg-sky-950/60 border border-sky-800/60',
    description: 'Complementary PMOS pull-up networks (PUN) and NMOS pull-down networks (PDN). CMOS ensures virtually zero static power consumption because one network is always in high-impedance cutoff when the other conducts.',
    keyConcepts: ['Complementary Logic Symmetry', 'Noise Margin (NMH, NML)', 'Propagation Delay (tpLH, tpHL)', 'Elmore Delay Model'],
    equation: 'V_{out} = \\neg (A \\land B) \\quad \\text{[Static CMOS NAND2]}',
    realWorldExample: 'Foundry standard cell libraries containing hundreds of drive-strength variants (e.g. NAND2_X1 to NAND2_X16).'
  },
  {
    level: 3,
    name: 'Digital Circuit',
    subtitle: 'Adders, Shifters, Multipliers & Flip-Flops',
    badge: 'RTL Circuit',
    badgeColor: 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/60',
    description: 'Combinational logic units paired with edge-triggered sequential flip-flops to create finite state machines (FSMs) and synchronous pipelined datapath stages controlled by a shared clock mesh.',
    keyConcepts: ['Setup Time (Tsu) & Hold Time (Th)', 'Clock-to-Q Delay (Tcq)', 'Metastability & Synchronizers', 'Carry-Lookahead Addition'],
    equation: 'T_{period} \\ge T_{cq} + T_{comb\\_max} + T_{setup} - T_{skew}',
    realWorldExample: 'High-speed 64-bit IEEE 754 Floating Point Multiply-Accumulate (FMA) execution units.'
  },
  {
    level: 4,
    name: 'Processor Core',
    subtitle: 'RISC-V / ARM Superscalar Out-of-Order Execution',
    badge: 'ISA Core',
    badgeColor: 'text-indigo-300 bg-indigo-950/60 border border-indigo-800/60',
    description: 'A complete Instruction Set Architecture implementation featuring instruction fetch, branch prediction, register renaming, out-of-order reservation stations, reorder buffer (ROB), and L1 instruction/data caches.',
    keyConcepts: ['Branch Target Buffer (BTB)', 'Tomasulo Algorithm & ROB', 'Translation Lookaside Buffer (TLB)', 'Non-blocking Cache Miss Handlers'],
    equation: '\\text{CPI} = \\text{Base CPI} + \\sum (\\text{Miss Rate} \\times \\text{Penalty})',
    realWorldExample: 'ARM Cortex-X4 or SiFive Performance P870 RISC-V superscalar cores operating up to 4.0 GHz.'
  },
  {
    level: 5,
    name: 'System-on-Chip',
    subtitle: 'Heterogeneous CPU + GPU + NPU + LPDDR5X',
    badge: 'Full SoC',
    badgeColor: 'text-cyan-300 bg-cyan-500/20 border border-cyan-400/40',
    description: 'Monolithic or multi-die 2.5D/3D chiplet integration combining general-purpose compute, matrix AI accelerators, ray-tracing graphics, unified system cache (SLC), security enclaves, and high-speed memory interfaces.',
    keyConcepts: ['Network-on-Chip (NoC AXI/CHI)', 'Coherent Interconnect', 'Dynamic Voltage & Frequency Scaling (DVFS)', 'Unified Memory Architecture (UMA)'],
    equation: '\\text{Bandwidth} = \\text{Bus Width} \\times \\text{Clock Frequency} \\times \\text{DDR Factor}',
    realWorldExample: 'Apple M4 Max, Qualcomm Snapdragon 8 Elite, Nvidia Blackwell GPU.'
  }
];

export const ROADMAP_MILESTONES: Milestone[] = [
  {
    id: 1,
    title: 'Semiconductor Fundamentals',
    phase: 'Phase 1',
    description: 'Bandgap energy, Fermi-Dirac distribution, carrier drift/diffusion, and intrinsic P-N junction depletion physics.',
    topics: ['Energy Band Diagrams & Silicon Bandgap (1.12 eV)', 'Carrier Concentrations (Electrons & Holes)', 'Drift-Diffusion Current Equations', 'P-N Junction Built-in Potential & Depletion Capacitance'],
    recommendedTools: ['TCAD Sentaurus', 'Python / NumPy Device Models', 'SPICE'],
    estimatedHours: 40
  },
  {
    id: 2,
    title: 'MOSFET Physics & Scaling',
    phase: 'Phase 2',
    description: 'Threshold voltage (Vth), DIBL, sub-threshold slope, velocity saturation, and leakage mitigation in FinFET/GAA.',
    topics: ['MOS Capacitor C-V Characteristics', 'Long-Channel vs Short-Channel Effects (SCE)', 'Body Effect & Sub-threshold Leakage', 'FinFET 3D Channels & GAA Nanosheet Architecture'],
    recommendedTools: ['BSIM4 / BSIM-CMG Model', 'HSPICE', 'LTspice'],
    estimatedHours: 50
  },
  {
    id: 3,
    title: 'CMOS Logic & Inverter Sizing',
    phase: 'Phase 3',
    description: 'Static inverter dynamics, W/L channel sizing ratios, Voltage Transfer Characteristics (VTC), and regenerative noise margins.',
    topics: ['CMOS Inverter DC Switching Characteristics', 'PMOS/NMOS Mobility Matching (Wp ≈ 2-3 Wn)', 'Rise/Fall Times & Slew Rate Sizing', 'Dynamic Switching Power (P = α·C·V²·f) & Static Leakage'],
    recommendedTools: ['Cadence Spectre', 'Synopsys HSPICE', 'Electric VLSI'],
    estimatedHours: 60
  },
  {
    id: 4,
    title: 'Digital RTL & Timing Closure',
    phase: 'Phase 4',
    description: 'Verilog/SystemVerilog RTL modeling, pipelining, setup time, hold time, and clock skew optimization.',
    topics: ['SystemVerilog Synthesizable Subset', 'FSM State Encodings (One-Hot vs Binary)', 'Synchronous Datapath Pipelining', 'Static Timing Equations (Slack, Tsu, Th, Tskew)'],
    recommendedTools: ['ModelSim / Questa', 'Synopsys VCS', 'Verilator (Open-Source)'],
    estimatedHours: 80
  },
  {
    id: 5,
    title: 'Synthesis & Static Timing (STA)',
    phase: 'Phase 5',
    description: 'Transforming behavioral code to standard cell gate netlists using Synopsys Design Compiler, SDC constraints, and path slack calculation.',
    topics: ['Logic Optimization & Technology Mapping', 'Synopsys Design Constraints (SDC format)', 'Setup/Hold Timing Slack Analysis', 'Design For Testability (DFT Scan Insertion)'],
    recommendedTools: ['Synopsys Design Compiler', 'Synopsys PrimeTime', 'Yosys Open Synthesis'],
    estimatedHours: 90
  },
  {
    id: 6,
    title: 'Physical Design & Tapeout',
    phase: 'Foundry Ready',
    description: 'Floorplanning, Power Mesh (P/G), Clock Tree Synthesis (CTS), global/detail routing, DRC/LVS clean-up, and GDSII handoff.',
    topics: ['Die Size Budgeting & Macro Placement', 'Power Mesh Grid (VDD/VSS IR Drop)', 'Clock Tree Synthesis (CTS H-Tree Balancing)', 'Detail Routing, DRC/LVS Sign-off, and GDSII Stream-Out'],
    recommendedTools: ['Cadence Innovus', 'Synopsys IC Compiler II', 'OpenLane / SkyWater 130nm'],
    estimatedHours: 120
  }
];

export const CORE_CONCEPTS: CoreConcept[] = [
  {
    id: 'mosfet',
    title: 'MOSFET',
    icon: 'toggle_on',
    tag: 'Device Physics',
    summary: 'The electric-field driven switch at the core of all modern digital and analog logic circuits.',
    deepDive: 'The Metal-Oxide-Semiconductor Field-Effect Transistor controls current between Source and Drain through the electrostatic potential applied to an insulated Gate terminal. In modern advanced nodes, planar gates have been superseded by 3D FinFETs and multi-tier Gate-All-Around (GAA) nanosheets to suppress short-channel leakages.',
    formula: 'I_{ds,sat} = \\frac{1}{2} \\mu C_{ox} \\frac{W}{L} (V_{gs} - V_{th})^2',
    formulaExplanation: 'Square-law saturation current in long-channel MOSFETs. In nanoscale devices, velocity saturation linearizes current with respect to (Vgs - Vth).',
    industryTools: ['BSIM-CMG', 'Sentaurus TCAD', 'Cadence Spectre']
  },
  {
    id: 'cmos',
    title: 'CMOS',
    icon: 'balance',
    tag: 'Circuit Topology',
    summary: 'Complementary PMOS/NMOS pairs ensuring high input impedance and virtually zero static DC power.',
    deepDive: 'Complementary MOS topology uses PMOS transistors to pull output voltages to VDD (logic 1) and NMOS transistors to pull output voltages to GND (logic 0). Because NMOS and PMOS switches are never meant to be simultaneously conductive in steady state, static power dissipation is limited solely to sub-threshold and gate oxide leakage currents.',
    formula: 'P_{total} = \\alpha C_L V_{DD}^2 f_{clk} + I_{leakage} V_{DD}',
    formulaExplanation: 'Total power consumption is divided into dynamic switching dissipation (charging and discharging parasitic load capacitance CL) and static subthreshold leakage.',
    industryTools: ['Synopsys HSPICE', 'Cadence Virtuoso', 'LTspice']
  },
  {
    id: 'logic-gates',
    title: 'Logic Gates',
    icon: 'alt_route',
    tag: 'Standard Cells',
    summary: 'NAND and NOR standard cell logic networks executing Boolean arithmetic and logic state decisions.',
    deepDive: 'In CMOS fabrication, inverting gates (NAND, NOR, NOT, AOI, OAI) are significantly faster, more compact, and require fewer transistors than non-inverting equivalents (AND, OR). A 2-input NAND gate uses just 4 transistors (2 series NMOS, 2 parallel PMOS), whereas an AND gate requires an extra inverter stage (6 transistors).',
    formula: 't_{pd} = \\frac{t_{pLH} + t_{pHL}}{2} \\approx 0.69 R_{eff} C_L',
    formulaExplanation: 'Average propagation delay calculated as half the sum of rise and fall times driven by effective channel resistances.',
    industryTools: ['Synopsys SiliconSmart', 'Cadence Liberate', 'Liberty .lib format']
  },
  {
    id: 'rtl-design',
    title: 'RTL Design',
    icon: 'terminal',
    tag: 'Hardware Architecture',
    summary: 'Describing high-frequency hardware cycles, datapaths, and control logic in Verilog and SystemVerilog.',
    deepDive: 'Register Transfer Level (RTL) models synchronous digital hardware in terms of data flow through hardware registers and combinational operations performed between clock ticks. Strict synthesis coding styles differentiate non-blocking (<=) assignments for clocked flip-flops from blocking (=) assignments for combinational logic.',
    formula: '\\text{always\\_ff } @(\\text{posedge clk or negedge rst\\_n}) \\dots',
    formulaExplanation: 'Canonical synthesizable idiom for asynchronous-reset edge-triggered sequential flip-flop registers.',
    industryTools: ['Synopsys VCS', 'Cadence Xcelium', 'Verilator', 'Mentor Questa']
  },
  {
    id: 'physical-design',
    title: 'Physical Design',
    icon: 'grid_4x4',
    tag: 'Backend Implementation',
    summary: 'Synthesizing gate netlists into nanometer-precise polygons distributed across multi-tier copper layers.',
    deepDive: 'Physical Design (PD) translates gate-level netlists into geometric masks ready for foundry manufacturing. The flow includes floorplanning, power distribution networks (PDN), placement of millions of standard cells, Clock Tree Synthesis (CTS) with balanced clock buffers, global and detail routing, and parasitic extraction (SPEF) for timing signoff.',
    formula: '\\text{Slack} = \\text{Required Time} - \\text{Arrival Time} \\ge 0',
    formulaExplanation: 'Positive timing slack guarantees that signals reliably settle before clock edges without timing violations.',
    industryTools: ['Cadence Innovus', 'Synopsys IC Compiler II', 'Synopsys PrimeTime', 'Calibre DRC/LVS']
  },
  {
    id: 'fabrication',
    title: 'Fabrication',
    icon: 'wb_sunny',
    tag: 'Silicon Foundry',
    summary: 'EUV photolithography, chemical etching, ion implantation, and chemical mechanical planarization.',
    deepDive: 'Monolithic integrated circuits are fabricated on ultra-pure 300mm single-crystal silicon wafers in ISO Class 1 cleanrooms. Extreme Ultraviolet (EUV) light at 13.5nm wavelength prints sub-micron geometries onto photoresist masks, followed by reactive ion etching (RIE), atomic layer deposition (ALD), and copper dual-damascene metallization.',
    formula: '\\text{CD} = k_1 \\frac{\\lambda}{\\text{NA}} \\quad [\\text{Rayleigh Lithography Limit}]',
    formulaExplanation: 'Critical Dimension (CD) determines minimum resolvable feature size as a function of light wavelength (λ) and lens numerical aperture (NA).',
    industryTools: ['ASML High-NA EUV Twinscan', 'Applied Materials Endura', 'Lam Research Etch']
  }
];

export const ASIC_STAGES: AsicStage[] = [
  {
    id: 1,
    name: '1. Specification & Architecture',
    phase: 'Front-End',
    description: 'Defining target Power, Performance, Area (PPA) goals, microarchitectural blocks, clock frequency budgets, bus protocols, and external IO interfaces.',
    deliverables: ['Microarchitecture Specification (MAS)', 'Memory & Register Map', 'Target PPA & Thermal Budgets', 'Clock & Power Domain Plan'],
    keyTools: ['Gem5 / SystemC Architectural Simulators', 'Excel PPA Models', 'Python Cycle-Accurate Models'],
    criticalChecks: ['Bandwidth saturation under peak loads', 'Floating-point precision limits', 'Latency guarantees on memory bus']
  },
  {
    id: 2,
    name: '2. RTL Design & Verification',
    phase: 'Front-End',
    description: 'Writing hardware description in synthesizable SystemVerilog. Implementing constrained-random Universal Verification Methodology (UVM) testbenches.',
    deliverables: ['Synthesizable SystemVerilog RTL files', 'UVM Verification Testbench', 'Functional & Code Coverage Reports (100%)', 'Lint & CDC (Clock Domain Crossing) Clean netlists'],
    keyTools: ['Synopsys VCS', 'Cadence Xcelium', 'SpyGlass Lint & CDC', 'Questa Formal Verification'],
    criticalChecks: ['Race conditions in clock domains', 'Metastability across asynchronous boundaries', 'Corner-case protocol adherence']
  },
  {
    id: 3,
    name: '3. Logic Synthesis & DFT',
    phase: 'Synthesis',
    description: 'Compiling behavioral RTL code into target foundry standard cell gate primitives; inserting scan chains and BIST (Built-In Self-Test) for post-silicon manufacturing validation.',
    deliverables: ['Gate-level netlist (.v)', 'Synopsys Design Constraints (.sdc)', 'Scan-inserted netlist (ATPG patterns)', 'Initial timing & area reports'],
    keyTools: ['Synopsys Design Compiler (DC-NXT)', 'Cadence Genus', 'Synopsys TestMAX DFT'],
    criticalChecks: ['High-effort timing closure', 'Unmapped latch avoidance', 'Scan chain continuity & test coverage > 99%']
  },
  {
    id: 4,
    name: '4. Floorplanning & Placement',
    phase: 'Back-End',
    description: 'Allocating silicon die perimeter, macro placement (SRAM caches, analog PLLs, PCIe SerDes), power grid straps (VDD/VSS rings), and optimal cell placement density.',
    deliverables: ['DEF Floorplan files', 'Power Mesh Grid (M1-M12)', 'Standard Cell Placed Database', 'Early congestion & pin density maps'],
    keyTools: ['Cadence Innovus', 'Synopsys IC Compiler II (ICC2)', 'Voltus Early Rail Analysis'],
    criticalChecks: ['Macro pin accessibility', 'Hotspot thermal dissipation', 'Static & dynamic IR drop along power rails']
  },
  {
    id: 5,
    name: '5. Clock Tree Synthesis & Routing',
    phase: 'Back-End',
    description: 'Synthesizing balanced H-tree or multi-mesh clock distribution networks to minimize clock skew and jitter. Detailed signal routing across all copper interconnect layers.',
    deliverables: ['Clock Tree with CTS buffers', 'Routed design with zero DRC violations', 'Parasitic extracted netlists (SPEF)', 'Signoff timing reports (PrimeTime)'],
    keyTools: ['Cadence Innovus CCOpt', 'Synopsys ICC2 CTS Engine', 'Synopsys StarRC', 'Cadence Quantus QRC'],
    criticalChecks: ['Clock skew < 30ps across all corners', 'Crosstalk-induced noise delay glitching', 'Electromigration (EM) on high-current lines']
  },
  {
    id: 6,
    name: '6. Sign-off & Tapeout (GDSII)',
    phase: 'Foundry',
    description: 'Exhaustive physical verification: DRC (Design Rule Checking), LVS (Layout vs Schematic), DFM (Design For Manufacturability), and exporting photomask stream to foundry.',
    deliverables: ['Final GDSII / OASIS stream files', 'Clean DRC, LVS, and Antenna reports', 'Full-chip IR drop and electro-thermal sign-off', 'Formal Equivalence Verification (FV) proofs'],
    keyTools: ['Siemens EDA Calibre DRC/LVS', 'Synopsys PrimeTime SI', 'Ansys RedHawk-SC', 'Cadence Conformal LEC'],
    criticalChecks: ['Zero DRC/LVS errors across 10,000+ geometric rules', 'Antenna gate oxide breakdown prevention', 'Wafer yield optimization (dummy metal fills)']
  }
];

export const SOC_BLOCKS = [
  {
    id: 'cpu',
    name: 'Octa-Core CPU Cluster',
    role: 'Compute',
    area: '18.4 mm²',
    power: '4.2 W',
    spec: '4× Performance (4.8 GHz, 192KB L1) + 4× Efficiency (2.2 GHz)',
    accent: '#4cd7f6',
    description: 'Superscalar out-of-order execution engine handling OS kernel operations, thread scheduling, and general serial algorithms.'
  },
  {
    id: 'npu',
    name: 'Neural Engine (NPU)',
    role: 'AI Acceleration',
    area: '12.8 mm²',
    power: '3.6 W',
    spec: '38 TOPS Int8 / 19 TFLOPS FP16 Matrix Systolic Array',
    accent: '#4edea3',
    description: 'Dedicated tensor processing unit optimized for convolutional layers, transformer self-attention projections, and quantized on-device LLMs.'
  },
  {
    id: 'gpu',
    name: '16-Core Ray Tracing GPU',
    role: 'Graphics & Compute',
    area: '28.6 mm²',
    power: '8.5 W',
    spec: '2048 ALU Shaders, Hardware BVH Ray Acceleration, 1.4 GHz',
    accent: '#adc6ff',
    description: 'High-throughput SIMD vector graphics pipeline executing vertex shading, rasterization, real-time path-tracing, and OpenCL compute kernels.'
  },
  {
    id: 'slc',
    name: 'System-Level Cache (SLC)',
    role: 'Memory',
    area: '14.2 mm²',
    power: '1.2 W',
    spec: '32MB SRAM, 48-way Set Associative, 1.8 TB/s Throughput',
    accent: '#06b6d4',
    description: 'Ultra-low latency shared SRAM memory buffer that drastically filters DRAM power dissipation by caching active working frames.'
  },
  {
    id: 'dram',
    name: 'LPDDR5X Memory Controller',
    role: 'Memory Interface',
    area: '9.6 mm²',
    power: '2.1 W',
    spec: '128-bit Bus, 8533 MT/s, 136.5 GB/s Theoretical Bandwidth',
    accent: '#4cd7f6',
    description: 'Low-power double-data-rate physical layer (PHY) driving high-frequency differential signals to external stacked DRAM packages.'
  },
  {
    id: 'pcie',
    name: 'PCIe 5.0 & USB4 Subsystem',
    role: 'High-Speed I/O',
    area: '6.4 mm²',
    power: '1.4 W',
    spec: '16 Lanes @ 32 GT/s per lane, USB4 / Thunderbolt 4 PHY',
    accent: '#adc6ff',
    description: 'High-speed serialized differential transceivers powering NVMe storage devices, Wi-Fi 7 chipsets, and peripheral interfaces.'
  },
  {
    id: 'noc',
    name: 'Coherent Network-on-Chip (NoC)',
    role: 'Interconnect',
    area: '11.5 mm²',
    power: '1.8 W',
    spec: 'Crossbar Matrix, AXI-5 / CHI Protocol, 1.2 TB/s Aggregate',
    accent: '#4edea3',
    description: 'The internal highway distributing packets between compute masters and memory slaves with guaranteed QoS and low-latency arbitration.'
  }
];

export const TIMELINE_EPOCHS = [
  {
    era: '1960s',
    name: 'Small-Scale Integration (SSI)',
    transistorCount: '< 10 Transistors',
    milestone: 'Individual logic gates (NAND, NOT, Flip-Flops) on single planar silicon substrates.',
    techNode: '10 µm (10,000 nm)',
    keyChip: 'Texas Instruments SN5400 Series'
  },
  {
    era: '1970s',
    name: 'Large-Scale Integration (LSI)',
    transistorCount: '1,000 – 20,000 Transistors',
    milestone: 'The dawn of the programmable microprocessor era with single-die CPU architectures.',
    techNode: '6 µm – 3 µm',
    keyChip: 'Intel 4004 (2,300 transistors) & 8080'
  },
  {
    era: '1980s-90s',
    name: 'Very Large-Scale Integration (VLSI)',
    transistorCount: '20,000 – 1,000,000+ Transistors',
    milestone: 'Pipelined 32-bit microprocessors, dedicated floating-point units, and on-chip SRAM cache memories.',
    techNode: '1.5 µm – 0.25 µm',
    keyChip: 'Intel 80386 & Pentium Pro'
  },
  {
    era: '2000s',
    name: 'Ultra Large-Scale Integration (ULSI)',
    transistorCount: '10,000,000 – 1,000,000,000 Transistors',
    milestone: 'Multi-core architectures introduced as Dennard scaling collapsed due to gate oxide leakage.',
    techNode: '90 nm – 32 nm High-k Metal Gate',
    keyChip: 'Intel Core 2 Duo & AMD Athlon 64'
  },
  {
    era: '2010s',
    name: 'System-on-Chip (SoC) & FinFET',
    transistorCount: '1 – 15 Billion Transistors',
    milestone: '3D FinFET transistors triumphed over planar leakage; heterogeneous smartphone SoCs exploded.',
    techNode: '22 nm – 7 nm FinFET',
    keyChip: 'Apple A12 Bionic & AMD Zen 2'
  },
  {
    era: '2020s+',
    name: '3D Chiplets & GAAFET / RibbonFET',
    transistorCount: '50 – 200+ Billion Transistors',
    milestone: 'Gate-All-Around nanosheets, backside power delivery (PowerVia), and 2.5D/3D hybrid bonding.',
    techNode: '3 nm – 2 nm / 18A (Angstrom Era)',
    keyChip: 'Nvidia Blackwell B200 (208B) & Apple M4'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why are static CMOS gates preferred over pseudo-NMOS or dynamic logic in general standard cell ASIC libraries?',
    options: [
      'They operate at twice the clock frequency',
      'They feature virtually zero static DC power dissipation',
      'They require fewer transistors per gate',
      'They do not require VDD connection'
    ],
    correctIndex: 1,
    explanation: 'Static CMOS circuits utilize complementary PMOS and NMOS networks where one is always in cutoff when the other conducts, ensuring that current only flows during dynamic logic transitions (ignoring sub-threshold leakage).',
    category: 'CMOS Fundamentals'
  },
  {
    id: 2,
    question: 'In a CMOS inverter, why is the channel width of the PMOS transistor typically sized 2 to 3 times larger than the NMOS transistor (Wp ≈ 2-3 Wn)?',
    options: [
      'PMOS has a much higher threshold voltage than NMOS',
      'Electron mobility (μn) is approximately 2 to 3 times greater than hole mobility (μp)',
      'PMOS transistors are physically located farther from ground',
      'To prevent gate oxide breakdown at VDD'
    ],
    correctIndex: 1,
    explanation: 'In silicon, electrons have roughly 2 to 3 times higher mobility than holes (μn ≈ 2.5 μp). To achieve symmetric pull-up and pull-down drive resistances and equal rise/fall times, the PMOS channel width must be widened proportionally.',
    category: 'Inverter Sizing'
  },
  {
    id: 3,
    question: 'What happens to a synchronous flip-flop if the input data signal changes within the setup time (Tsu) window before the clock edge?',
    options: [
      'The clock frequency instantly doubles',
      'The flip-flop enters a metastable state where output voltage hovers indefinitely between 0 and 1',
      'The power grid blows an internal fuse',
      'The circuit automatically corrects the bit using ECC'
    ],
    correctIndex: 1,
    explanation: 'Violating setup time (Tsu) causes internal latch feedback loops to receive intermediate energy, pushing internal nodes into an unstable metastable equilibrium between logic 0 and logic 1, causing non-deterministic delays.',
    category: 'Static Timing (STA)'
  },
  {
    id: 4,
    question: 'What is the primary role of Clock Tree Synthesis (CTS) during the backend physical design flow?',
    options: [
      'To convert SystemVerilog into gate-level Boolean logic',
      'To build a balanced distribution network minimizing clock skew and insertion delay across all sequential flip-flops',
      'To verify lithographic DRC rules with the foundry',
      'To calculate cache hit rates'
    ],
    correctIndex: 1,
    explanation: 'Clock Tree Synthesis (CTS) inserts balanced inverter/buffer trees (such as H-Trees) to deliver the clock edge to millions of sequential registers simultaneously, minimizing skew and preventing catastrophic hold time violations.',
    category: 'Physical Design'
  },
  {
    id: 5,
    question: 'Why did the semiconductor industry transition from 3D FinFETs to Gate-All-Around (GAA) nanosheets at the 3nm / 2nm nodes?',
    options: [
      'FinFETs could no longer be made out of silicon',
      'GAA wraps the gate completely around all four sides of horizontal nanosheets, maximizing electrostatic channel control and curbing leakage',
      'FinFETs require optical lasers rather than EUV lithography',
      'To reduce the total number of metal routing layers'
    ],
    correctIndex: 1,
    explanation: 'As gate lengths shrank below 15nm, FinFETs (with 3-sided gates) suffered from excessive sub-threshold drain leakage. GAAFET encircles the channel on all 4 sides, ensuring superior electrostatic confinement and adjustable sheet widths for drive current tuning.',
    category: 'Advanced Nodes'
  }
];
