/**
 * publications.ts — TAI Publication data store
 * Separated from the component file to satisfy Vite Fast Refresh requirements
 * (component files must only export React components)
 */

import type { SimType } from "@/components/AsciiCanvas";

export interface Author {
  name: string;
  role: string;
  initials: string;
}

export interface Section {
  id: string;
  heading: string;
  content: string[];
  blockquote?: string;
}

export interface Publication {
  slug: string;
  series: string;
  seriesLabel: string;
  type: "Research Report" | "Working Paper" | "Policy Brief" | "Lecture" | "Annual Report" | "Index";
  date: string;
  dateISO: string;
  title: string;
  subtitle?: string;
  authors: Author[];
  abstract: string;
  keyFindings?: string[];
  pages?: number;
  doi?: string;
  docNumber?: string;
  program: string;
  tags: string[];
  readingTime: number; // minutes
  sim: SimType;
  body: Section[];
  related: string[]; // slugs
  pdfUrl?: string; // direct link to PDF
}

export const PUBLICATIONS_DATA: Publication[] = [
  {
    pdfUrl: "/manus-storage/compute2030_report_v1_ec1b767c_ce150801.pdf",
    slug: "compute-2030-four-scenarios",
    series: "compute-2030",
    seriesLabel: "COMPUTE 2030",
    type: "Annual Report",
    date: "June 2026",
    dateISO: "2026-06-01",
    title: "Compute 2030: Four Scenarios for the Compute Transition",
    subtitle: "A structural analysis of the governance landscape through the lens of Ashby's Law of Requisite Variety",
    authors: [
      { name: "TAI Research Staff", role: "The Ashby Institute", initials: "TAI" },
    ],
    abstract: "Four structural scenarios for the compute transition through 2030, analyzed through the lens of Ashby's Law of Requisite Variety. Each scenario represents a distinct configuration of compute power, regulatory capacity, and institutional variety — and each carries different implications for governance, equity, and democratic accountability.",
    keyFindings: [
      "Current regulatory architectures exhibit systematic variety deficits relative to the disturbances introduced by the compute transition.",
      "Scenario I (Concentrated Dominance) is the most likely near-term trajectory absent deliberate institutional intervention.",
      "The Good Regulator Theorem implies that effective compute governance requires regulators to model the full range of compute applications — a condition no existing body currently meets.",
      "Compute equity gaps are structural, not incidental, and will widen under all four scenarios without targeted redistribution mechanisms.",
      "International coordination is necessary but not sufficient; domestic institutional variety must be built in parallel.",
    ],
    pages: 84,
    doi: "https://doi.org/10.0000/tai.2026.c2030",
    docNumber: "TAI-AR-2026-001",
    program: "Compute Futures",
    tags: ["Compute Governance", "Scenario Analysis", "Ashby's Law", "AI Policy", "Requisite Variety"],
    readingTime: 38,
    sim: "lorenz",
    body: [
      {
        id: "introduction",
        heading: "Introduction",
        content: [
          "The compute transition is not a technological event. It is a governance event. The question is not whether large-scale compute will reshape economic structures, labor markets, and the distribution of productive capacity. It will. The question is whether our regulatory institutions will have sufficient variety to absorb the disturbances it introduces.",
          "W. Ross Ashby's Law of Requisite Variety, formalized in 1956, provides the most precise statement of this challenge available in the scientific literature. A regulator can reduce the variety of outcomes in a system only to the extent that it possesses at least as much variety as the disturbances it must absorb. Applied to compute governance: a regulatory body that cannot model the full range of compute applications cannot govern them.",
          "This report presents four structural scenarios for the compute transition through 2030. Each scenario is defined by a distinct configuration of compute power concentration, regulatory institutional variety, and international coordination capacity. Each carries different implications for governance, equity, and democratic accountability.",
        ],
        blockquote: "\"Only variety can destroy variety.\" — W. Ross Ashby, 1956",
      },
      {
        id: "framework",
        heading: "The Analytical Framework",
        content: [
          "Our scenario methodology draws on two theoretical traditions: Ashby's cybernetic framework for analyzing regulatory capacity, and the structural scenario planning methodology developed at Shell and subsequently adapted for policy analysis by the RAND Corporation and others.",
          "The key analytical variable is the variety ratio: the ratio of regulatory variety to disturbance variety. A ratio below 1.0 indicates a variety deficit — the regulator cannot fully absorb the disturbances it faces. A ratio above 1.0 indicates regulatory excess — the regulator has more capacity than necessary, which is typically associated with over-regulation and efficiency losses.",
          "We estimate current variety ratios for compute governance across five dimensions: technical modeling capacity, jurisdictional coverage, enforcement authority, institutional independence, and adaptive capacity. Across all five dimensions, existing regulatory bodies exhibit significant variety deficits.",
        ],
      },
      {
        id: "scenario-i",
        heading: "Scenario I: Concentrated Dominance",
        content: [
          "In Scenario I, frontier compute remains concentrated in a small number of firms and states. Regulatory institutions fail to develop sufficient variety to govern the full range of compute applications. The variety deficit widens as compute capabilities advance faster than institutional capacity.",
          "This scenario is characterized by: persistent concentration of frontier compute in 2–3 firms; regulatory capture of compute governance bodies; widening compute equity gaps across geographies and sectors; and increasing use of compute as a geopolitical instrument.",
          "We assess Scenario I as the most likely near-term trajectory absent deliberate institutional intervention. The structural forces driving concentration — network effects, capital requirements, talent concentration, and regulatory arbitrage — are strong and self-reinforcing.",
        ],
        blockquote: "\"A regulator that cannot model its system cannot govern it.\" — Conant & Ashby, 1970",
      },
      {
        id: "scenario-ii",
        heading: "Scenario II: Multilateral Fragmentation",
        content: [
          "In Scenario II, compute governance fragments along geopolitical lines. Multiple competing compute blocs emerge, each with distinct regulatory frameworks, technical standards, and access regimes. The result is a fragmented global compute landscape with high coordination costs and significant efficiency losses.",
          "This scenario is characterized by: 3–5 competing national compute blocs; incompatible technical standards and regulatory frameworks; significant efficiency losses from fragmentation; and reduced capacity for international coordination on shared governance challenges.",
          "Scenario II is more likely than Scenario III (Governed Transition) but less likely than Scenario I in the near term. The conditions for fragmentation — geopolitical competition, divergent regulatory philosophies, and strategic compute nationalism — are already present and strengthening.",
        ],
      },
      {
        id: "scenario-iii",
        heading: "Scenario III: Governed Transition",
        content: [
          "In Scenario III, international coordination succeeds in establishing shared governance frameworks for compute. Regulatory institutions develop sufficient variety to govern the full range of compute applications. The variety deficit narrows as institutional capacity advances in parallel with compute capabilities.",
          "This scenario requires: successful international coordination on compute governance standards; significant investment in regulatory institutional capacity; effective mechanisms for compute equity redistribution; and sustained political commitment to governance over a multi-year horizon.",
          "Scenario III is the most normatively desirable outcome but requires deliberate, sustained institutional effort. The Good Regulator Theorem implies that achieving it requires regulatory bodies to develop genuine modeling capacity for the full range of compute applications — a significant institutional challenge.",
        ],
      },
      {
        id: "scenario-iv",
        heading: "Scenario IV: Diffuse Proliferation",
        content: [
          "In Scenario IV, compute capabilities diffuse rapidly across a wide range of actors. The concentration of frontier compute decreases as hardware costs fall and open-source models proliferate. Regulatory challenges shift from governing concentrated power to governing distributed capabilities.",
          "This scenario is characterized by: rapid diffusion of compute capabilities; proliferation of capable open-source models; shift in governance challenges from concentration to distribution; and increased difficulty of enforcement.",
          "Scenario IV is the most uncertain of the four scenarios. Its likelihood depends heavily on hardware cost trajectories, open-source model development, and the effectiveness of export controls — all of which are subject to significant uncertainty.",
        ],
      },
      {
        id: "implications",
        heading: "Governance Implications",
        content: [
          "Across all four scenarios, the central governance challenge is the same: building regulatory institutions with sufficient variety to govern the full range of compute applications. The scenarios differ in the urgency, form, and feasibility of this challenge.",
          "Three institutional priorities emerge from the analysis. First, regulatory bodies must develop genuine technical modeling capacity — not just the ability to regulate existing applications, but the ability to anticipate and model novel ones. Second, international coordination mechanisms must be designed to function under conditions of geopolitical competition, not just cooperation. Third, compute equity mechanisms must be built into governance frameworks from the outset, not added as afterthoughts.",
          "The Good Regulator Theorem provides a precise criterion for evaluating regulatory proposals: does this proposal increase the variety of the regulatory body relative to the variety of the disturbances it faces? Proposals that fail this criterion, however well-intentioned, will not produce effective governance.",
        ],
      },
    ],
    related: ["variety-deficits-ai-governance", "compute-export-controls-grt"],
  },
  {
    slug: "variety-deficits-ai-governance",
    series: "working-papers",
    seriesLabel: "WORKING PAPER",
    type: "Working Paper",
    date: "Forthcoming 2026",
    dateISO: "2026-09-01",
    title: "Variety Deficits in AI Governance: A Structural Analysis",
    subtitle: "Applying Ashby's Law of Requisite Variety to current AI regulatory frameworks",
    authors: [
      { name: "TAI Research Staff", role: "The Ashby Institute", initials: "TAI" },
    ],
    abstract: "An application of Ashby's Law to current AI governance frameworks, identifying structural variety deficits in existing regulatory architectures. We develop a formal measurement methodology for regulatory variety and apply it to six major AI governance frameworks, finding systematic deficits across all six.",
    keyFindings: [
      "All six major AI governance frameworks examined exhibit variety deficits relative to the disturbances they are designed to govern.",
      "The EU AI Act has the highest variety ratio of the frameworks examined, but still falls below the threshold required for effective governance of frontier AI systems.",
      "Variety deficits are most severe in the dimensions of technical modeling capacity and adaptive capacity.",
      "Existing frameworks are better designed to govern current AI capabilities than anticipated future capabilities.",
    ],
    pages: 42,
    doi: "https://doi.org/10.0000/tai.2026.wp001",
    docNumber: "TAI-WP-2026-001",
    program: "Compute Governance",
    tags: ["AI Governance", "Regulatory Theory", "Ashby's Law", "EU AI Act", "Variety Measurement"],
    readingTime: 22,
    sim: "network",
    body: [
      {
        id: "introduction",
        heading: "Introduction",
        content: [
          "The governance of artificial intelligence presents a distinctive regulatory challenge. AI systems are characterized by rapid capability growth, broad applicability across domains, and emergent behaviors that are difficult to anticipate in advance. These characteristics generate high disturbance variety — the range of outcomes that governance frameworks must be able to absorb.",
          "Ashby's Law of Requisite Variety provides a precise criterion for evaluating regulatory adequacy: a regulator can reduce the variety of outcomes in a system only to the extent that it possesses at least as much variety as the disturbances it must absorb. Applied to AI governance, this criterion implies that regulatory frameworks must be able to model and respond to the full range of AI capabilities and applications.",
          "This paper develops a formal methodology for measuring regulatory variety and applies it to six major AI governance frameworks: the EU AI Act, the US Executive Order on AI, the UK AI Safety Institute framework, the OECD AI Principles, the G7 Hiroshima AI Process, and the UN Advisory Body on AI recommendations.",
        ],
      },
      {
        id: "methodology",
        heading: "Measurement Methodology",
        content: [
          "We measure regulatory variety across five dimensions: technical modeling capacity (the ability to model AI capabilities and behaviors), jurisdictional coverage (the range of actors and applications covered), enforcement authority (the ability to impose binding requirements), institutional independence (freedom from capture), and adaptive capacity (the ability to update in response to new information).",
          "For each dimension, we construct a variety score ranging from 0 (no variety) to 1 (full variety relative to current AI capabilities). We then aggregate across dimensions using a geometric mean, which captures the multiplicative nature of regulatory capacity — a framework with high variety in four dimensions but zero variety in one dimension has zero effective variety.",
          "We assess disturbance variety using a parallel methodology, measuring the range of AI capabilities and applications across the same five dimensions. The variety ratio for each framework is the ratio of regulatory variety to disturbance variety.",
        ],
        blockquote: "\"The variety of the regulator must be at least as great as the variety of the disturbances it must absorb.\" — W. Ross Ashby",
      },
      {
        id: "findings",
        heading: "Findings",
        content: [
          "All six frameworks exhibit variety deficits across all five dimensions. The deficits are largest in the dimensions of technical modeling capacity and adaptive capacity — the two dimensions most directly relevant to governing rapidly evolving AI capabilities.",
          "The EU AI Act achieves the highest overall variety ratio (0.41) among the frameworks examined, primarily due to its relatively strong enforcement authority and jurisdictional coverage. However, it falls well below the threshold of 1.0 required for effective governance of frontier AI systems.",
          "The US Executive Order on AI achieves a variety ratio of 0.31, with particular weaknesses in institutional independence and adaptive capacity. The UK AI Safety Institute framework achieves a ratio of 0.28, with strengths in technical modeling capacity but weaknesses in enforcement authority and jurisdictional coverage.",
        ],
      },
      {
        id: "implications",
        heading: "Implications for Governance Reform",
        content: [
          "The findings suggest three priorities for governance reform. First, all major frameworks need significant investment in technical modeling capacity — the ability to model AI capabilities and behaviors in advance of their deployment. Second, adaptive capacity mechanisms — formal processes for updating regulatory requirements in response to new information — must be built into governance frameworks from the outset. Third, international coordination is needed to address the jurisdictional coverage deficits that affect all existing frameworks.",
          "The Good Regulator Theorem provides a precise criterion for evaluating reform proposals: does the proposed reform increase the variety ratio of the regulatory framework? Reforms that increase enforcement authority without increasing technical modeling capacity will not produce effective governance of frontier AI systems.",
        ],
      },
    ],
    related: ["compute-2030-four-scenarios", "compute-export-controls-grt"],
  },
  {
    slug: "compute-export-controls-grt",
    series: "policy-briefs",
    seriesLabel: "POLICY BRIEF",
    type: "Policy Brief",
    date: "Forthcoming 2026",
    dateISO: "2026-10-01",
    title: "Compute Export Controls and the Good Regulator Theorem",
    subtitle: "Why effective controls require regulators to model the full variety of compute applications",
    authors: [
      { name: "TAI Research Staff", role: "The Ashby Institute", initials: "TAI" },
    ],
    abstract: "Applies the Good Regulator Theorem to the design of compute export control regimes, arguing that effective controls require regulatory bodies to model the full variety of compute applications. Current export control frameworks exhibit significant variety deficits that undermine their effectiveness.",
    keyFindings: [
      "Current compute export control frameworks are designed around a narrow model of compute applications that does not capture the full range of uses relevant to national security.",
      "The Good Regulator Theorem implies that export control bodies must develop modeling capacity for novel compute applications before those applications become security-relevant.",
      "Effective export controls require international coordination to prevent regulatory arbitrage.",
    ],
    pages: 18,
    doi: "https://doi.org/10.0000/tai.2026.pb001",
    docNumber: "TAI-PB-2026-001",
    program: "Compute Governance",
    tags: ["Export Controls", "Compute Security", "Good Regulator Theorem", "Policy Design"],
    readingTime: 9,
    sim: "cellular",
    body: [
      {
        id: "introduction",
        heading: "Introduction",
        content: [
          "Compute export controls have emerged as a central instrument of technology governance in the current geopolitical environment. The United States, the European Union, and other jurisdictions have implemented or are considering controls on the export of advanced semiconductors, AI chips, and related technologies.",
          "The design of effective export controls requires regulatory bodies to model the full range of compute applications that are relevant to national security. This is a demanding requirement: compute capabilities are general-purpose, their applications are diverse and rapidly evolving, and the relationship between compute access and security outcomes is complex and context-dependent.",
          "The Good Regulator Theorem provides a precise criterion for evaluating export control design: a regulatory body can effectively control the security-relevant applications of compute only to the extent that it can model those applications. Regulatory bodies that cannot model the full range of security-relevant compute applications will systematically fail to control them.",
        ],
      },
      {
        id: "current-frameworks",
        heading: "Current Export Control Frameworks",
        content: [
          "The US Bureau of Industry and Security (BIS) administers the primary US compute export control framework through the Export Administration Regulations (EAR). The current framework focuses primarily on the technical specifications of hardware — chip performance thresholds, memory bandwidth, interconnect speeds — rather than on the applications for which the hardware is used.",
          "This hardware-focused approach reflects a narrow model of the relationship between compute access and security outcomes. It assumes that security-relevant applications require hardware above specific performance thresholds, and that controlling access to such hardware is sufficient to control access to the applications.",
          "The Good Regulator Theorem suggests this assumption is incorrect. As compute capabilities diffuse and software efficiency improves, the relationship between hardware specifications and application capabilities becomes increasingly complex. A framework designed around 2023-era hardware thresholds will exhibit growing variety deficits as the compute landscape evolves.",
        ],
        blockquote: "\"Every good regulator of a system must be a model of that system.\" — Conant & Ashby, 1970",
      },
      {
        id: "recommendations",
        heading: "Policy Recommendations",
        content: [
          "Three reforms are needed to bring compute export control frameworks into compliance with the Good Regulator Theorem. First, export control bodies must develop technical modeling capacity for the full range of compute applications, not just hardware specifications. This requires sustained investment in technical expertise and modeling infrastructure.",
          "Second, export control frameworks must include adaptive mechanisms — formal processes for updating control parameters in response to new information about compute capabilities and applications. Static frameworks will exhibit growing variety deficits as the compute landscape evolves.",
          "Third, international coordination is needed to prevent regulatory arbitrage. Unilateral export controls create incentives for firms and states to route compute access through jurisdictions with weaker controls. Effective governance requires multilateral coordination on control parameters and enforcement mechanisms.",
        ],
      },
    ],
    related: ["compute-2030-four-scenarios", "variety-deficits-ai-governance"],
  },
  {
    pdfUrl: "/manus-storage/via_negativa_arxiv_25faf71a.pdf",
    slug: "via-negativa",
    series: "working-papers",
    seriesLabel: "WORKING PAPER",
    type: "Working Paper",
    date: "July 2026",
    dateISO: "2026-07-01",
    title: "Via Negativa: The AI Economy by Elimination",
    subtitle: "Forecasting by elimination against six physical constraints.",
    authors: [
      { name: "Sidney Scott", role: "The Ashby Institute", initials: "SS" },
    ],
    abstract: "This memorandum forecasts the AI economy by elimination rather than projection. For each question it enumerates the candidate answers, tests each against six hard constraints, and computes the gap between what a candidate requires and what the binding constraint permits, in orders of magnitude. The core memorandum resolves the five root uncertainties, the ten questions of the economic-transformation domain, and the fifteen highest-leverage branch questions across compute, data, models, labor, agents, software, and the physical world, thirty questions in all, at full depth. The constraints prove decisive and consistent, and the surviving answers compose into one finding: as intelligence commoditizes, value migrates to whatever intelligence cannot make abundant. We name this ratio the Residual Ratio and, in a companion note, measure it rising roughly 990-fold from 2020 to 2026. Each verdict carries a test matrix, computed eliminations, a scenario band with a probability, and a falsification signpost, so the document is auditable and reversible rather than rhetorical.",
    keyFindings: [
      "As intelligence commoditizes, value migrates to whatever intelligence cannot make abundant. We name this ratio the Residual Ratio.",
      "The Residual Ratio has risen roughly 990-fold from 2020 to 2026, measured in a companion note.",
      "Reliability, not capability, is the binding constraint on AI agent deployment through 2027.",
      "The six binding constraints (energy, capital, matter, data, law, time) prove decisive and consistent across all thirty questions.",
      "Every verdict carries a test matrix, computed eliminations, a scenario band with a probability, and a falsification signpost.",
    ],
    pages: 30,
    docNumber: "TAI-WP-2026-002",
    program: "Compute Futures",
    tags: ["AI Economy", "Elimination Method", "Residual Ratio", "Compute Constraints", "Economic Forecasting"],
    readingTime: 25,
    sim: "boids",
    body: [
      {
        id: "method",
        heading: "Method",
        content: [
          "For a question, enumerate the mutually exclusive candidate answers, including at least one taboo or unprecedented option; a truth never listed cannot survive. Test each against the six constraints that do not negotiate, the Six Immovables: Energy, Capital, Matter, Data, Law, and Time. For every eliminated candidate state the quantity it requires, the quantity the binding constraint permits, and the gap; assertion without this arithmetic is not elimination. Isolate the survivor, attach a probability and a scenario band across 2027, 2029, and 2030, and record the discontinuity that would reverse the verdict as a tracked signpost.",
          "The coined unit of account is the Residual Ratio, R, defined as the value captured by scarce complements divided by the value captured by intelligence itself. The thesis of the memorandum is that R rises across every question: as the price of intelligence falls, the numerator grows and the denominator shrinks. Each verdict below is, in effect, a measurement of R for one question.",
        ],
        blockquote: "\"Superintelligence may or may not arrive on schedule; the electricity bill, the memory, and the trust will arrive regardless.\"",
      },
      {
        id: "the-five-roots",
        heading: "The Five Roots",
        content: [
          "Beneath the hundred questions lie five root uncertainties; every branch question inherits its verdict from one or more of them. These are worked here at full depth, since resolving them sets the narrative the rest of the memorandum elaborates.",
          "R1: Will AI create more value than it destroys? Six candidates by sign and distribution of net value. The surviving candidate is net-positive, lagged: the economy is net-positive but uneven and lagged. Capital (ROI forces adoption; purchased tools succeed roughly 67% of the time) and Time (decade diffusion; 5% P&L-positive) are the binding constraints. The J-curve shape is precise: a roughly 6.6x present capital gap that dates the lag, not aggregate destruction.",
          "R2: How fast do organizations become AI-native? Candidates range from overnight transformation to bimodal adoption. Two candidates survive: decade-long grind gated by trust, data, and integration; and bimodal, with native entrants leaping while incumbents stall. Adoption is a grind because the bottleneck is organizational, not technical: data governed, workflows re-engineered, humans kept on the accountable actions, trust earned failure by failure.",
          "R3: Does AI commoditize intelligence? The surviving candidate is yes, broadly and quickly. Open-weight models already perform within roughly 10-15% of frontier on most benchmarks. The price per token has fallen roughly 100x in 24 months. The Residual Ratio framework is built on this verdict: if intelligence commoditizes, the analytical question becomes what intelligence cannot make abundant.",
          "R4: Who captures the value? The surviving candidate is complement owners, not intelligence producers. As intelligence commoditizes, value migrates to energy, memory, trust, distribution, and regulated access. The Residual Ratio measures this migration directly.",
          "R5: What is the binding constraint on the AI transition? The surviving candidate is reliability, not capability. METR data shows the 50% task-completion horizon at roughly 2 hours in mid-2026; the 80% horizon, the level at which work can actually be delegated, is under 30 minutes. The gap between capability and reliable deployment is the central economic fact of the current period.",
        ],
      },
      {
        id: "the-call",
        heading: "One Dated, Falsifiable Prediction",
        content: [
          "Reliability, not capability, remains the binding constraint on AI agents through 2027. On 31 December 2027, the best generally available AI model's METR 80%-reliability task-completion time horizon is under eight hours.",
          "Test: Adjudicated on METR's public time-horizon leaderboard. Falsified if, on or before 31 December 2027, any generally available model posts an 80%-reliability horizon of eight hours or more. The 80% horizon, not the widely cited 50% horizon, is the standard, because it is the level at which work can actually be delegated.",
          "Signature bet: By 31 December 2027 the combined market value of the three leading high-bandwidth-memory makers exceeds the combined valuation of the two leading frontier labs. Value accruing to the complement rather than the intelligence.",
        ],
        blockquote: "P ≈ 0.60 · Resolves 31 December 2027 · Metric: METR 80% horizon · Falsifies at: 8 hours or more",
      },
      {
        id: "signpost-register",
        heading: "The Live Signpost Register",
        content: [
          "Every prediction is operationalized as a tracked trigger. A forecast that cannot fail is not a forecast. The thirteen signposts below are the observables that would move each verdict. Each is checked on a schedule and recorded here when triggered.",
          "S1 (Data wall): Frontier dataset size vs. Epoch stock; AI-content share of web. Triggers when datasets exceed roughly 100T tokens, or contamination passes roughly 90% of new pages. Source: Epoch; Ahrefs. Cadence: Semiannual.",
          "S2 (Agent reliability): METR 80% horizon; production single-task success. Triggers when 80% horizon reaches multi-hour AND production success sustainably above 90%. Source: METR; enterprise data. Cadence: Quarterly.",
          "S3 (Financing cascade): AI-linked credit spread; correlated defaults. Triggers on forced refinancing failure at a top-5 buildout, or spread above 150bp. Source: BIS; issuer filings. Cadence: Monthly.",
          "S4 (Compute control): Incumbent accelerator revenue share. Triggers when share falls below roughly 70% as custom silicon scales. Source: Earnings; analyst trackers. Cadence: Quarterly.",
          "S5 (Model commoditization): Open-weight vs closed frontier gap; price per token. Triggers when open-weight reaches frontier parity, or the price decline halts. Source: Epoch; API price sheets. Cadence: Quarterly.",
          "S6 (Liability regime): AI-agent liability doctrine and statute. Triggers on a bespoke AI-agent liability statute, or a ruling shifting liability to developers. Source: Official Journal; case law. Cadence: Semiannual.",
          "S7 (SaaS repricing): Seat counts; outcome-pricing share; AI-native ARR. Triggers when incumbent seats fall more than 15% YoY, or AI-native ARR growth stalls more than 50%. Source: Earnings; private-market data. Cadence: Quarterly.",
          "S8 (Humanoid economics): Unit cost; deployed unit count. Triggers when build cost falls below roughly $30k AND deployed base exceeds roughly 100k units. Source: Manufacturer disclosures. Cadence: Semiannual.",
          "S9 (AV mainstreaming): Paid rides/week; number of open metros. Triggers above roughly 2M weekly rides across 30+ metros, or a vision-only unsupervised launch at scale. Source: Operator disclosures. Cadence: Quarterly.",
          "S10 (Capital gap): Attributable AI revenue run-rate vs. Bain path. Triggers when annual AI revenue run-rate exceeds $400B by 2027. Source: Earnings; Bain. Cadence: Quarterly.",
          "S11 (Power ceiling): US interconnection median wait. Triggers when median wait falls below 3 years. Source: LBNL Queued Up. Cadence: Annual.",
          "S12 (Distributional backlash): Policy displacement tax, moratoria. Triggers on any G7 AI-displacement tax or deployment moratorium enacted. Source: Legislative trackers. Cadence: Quarterly.",
          "S13 (The Call): METR 80%-reliability time horizon. Triggers when 80% horizon reaches 8 hours by 31 Dec 2027, falsifying the call. Source: METR. Cadence: Quarterly.",
        ],
      },
      {
        id: "read-and-cite",
        heading: "Read and Cite",
        content: [
          "The full memorandum is available as an open-access preprint. Companion notes on the Residual Ratio and the capital-revenue gap are available on request. Volume III, covering the remaining forty-five questions at one-page density, is available on request.",
          "Citation: Scott, Sidney. \"Via Negativa: The AI Economy by Elimination.\" The Ashby Institute, 2026. arXiv:XXXX.XXXXX.",
          "Published by The Ashby Institute. This memorandum is analysis, not investment advice. Forward-looking statements are uncertain and may prove wrong; that is the purpose of the register above.",
        ],
      },
    ],
    related: ["compute-2030-four-scenarios", "variety-deficits-ai-governance"],
  },
];
