/*
 * Research.tsx — TAI Research Programs page
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const CROSS_DOMAIN = [
  { sector: "AI & Machine Learning", formula: "Parameters ∝ V(training distribution)", tag: "LLMs · Vision · Alignment · RAG", desc: "Scaling laws are variety matching. An LLM's parameter count must scale proportionally to absorb the vocabulary, contextual nuance, and factual variety of human knowledge. The alignment problem is a variety problem." },
  { sector: "Cybersecurity", formula: "V(defense) ≥ V(attack surface)", tag: "XDR · Zero-Day · Threat Modeling", desc: "To protect against metamorphic malware and polymorphic zero-day exploits, a security stack must possess variety matching the threat landscape. Any fixed detection signature set will eventually be defeated." },
  { sector: "Autonomous Systems", formula: "V(controller) ≥ V(environment)", tag: "AVs · Robotics · SLAM · Drones", desc: "Self-driving compute stacks must maintain a continuous 3D tracking model of dynamic actors. The GRT is the mathematical foundation of sensor fusion and autonomous navigation." },
  { sector: "Critical Infrastructure", formula: "V(grid model) ≥ V(load variation)", tag: "Smart Grids · Avionics · Supply Chain", desc: "Electrical grid computers must process predictive demand models to regulate power flow. Aerospace control surfaces must adjust hundreds of times per second to absorb atmospheric turbulence." },
  { sector: "Financial Systems", formula: "V(oversight) < V(market) → Crisis", tag: "HFT · Systemic Risk · Regulation", desc: "The 2008 financial crisis was a variety failure. Regulators' internal models had insufficient variety to represent the actual state space of the system they were regulating. The same pattern appears in every major financial crisis." },
  { sector: "Healthcare & Biology", formula: "Homeostasis = continuous variety matching", tag: "Diagnostics · EHR · Precision Medicine", desc: "Homeostasis is the original regulator. Antibiotic resistance is a pathogen variety problem. Cancer immunotherapy is a tumor variety problem. Precision medicine is a variety-matching project." },
  { sector: "Democratic Governance", formula: "V(government) ≥ V(governed society)", tag: "Institutions · Policy · Representation", desc: "Populism, polarization, and institutional breakdown are symptoms of variety deficits: the governing model has become too simple to represent the actual variety of the governed system." },
  { sector: "Climate & Earth Systems", formula: "V(climate model) must match V(climate system)", tag: "Earth Systems · Policy · Feedback Loops", desc: "Climate governance fails when policymakers' models of the climate system are insufficient. The variety of feedback loops, tipping points, and regional variations vastly exceeds the variety of most policy models." },
];

const PROGRAMS = [
  {
    num: "01",
    code: "CF",
    title: "Compute Futures",
    tag: "Infrastructure Analysis",
    lead: "Structural forecasting and scenario analysis of the AI-native compute landscape through 2030.",
    body: "The Compute Futures program produces TAI's flagship scenario analysis work. The program examines how the physical infrastructure of AI — data centers, chip supply chains, energy systems, and network topology — will evolve through 2030 and what structural consequences follow for economic and geopolitical order. The program applies Ashby's Law to understand the variety requirements of compute governance: as compute infrastructure becomes more complex and globally distributed, the variety of governance mechanisms must scale proportionally.",
    outputs: ["Compute 2030 Annual Report Series", "Infrastructure Chokepoint Analysis", "Compute Concentration Index", "Scenario Working Papers"],
    current: "Compute 2030, Volume I — June 2026",
    link: "https://theashbyinstitute.manus.space",
    external: true,
  },
  {
    num: "02",
    code: "CG",
    title: "Compute Governance",
    tag: "Institutional Design",
    lead: "Institutional design and policy analysis for governing strategic compute at national and multilateral levels.",
    body: "The Compute Governance program applies the Good Regulator Theorem directly to the design of governance institutions. A regulatory body that does not maintain an adequate internal model of the compute infrastructure it governs will fail to govern it effectively. The program examines existing governance frameworks, identifies variety deficits, and develops structural recommendations for governance institutions with sufficient variety to match the complexity of the systems they regulate. Work draws on precedents from nuclear governance, financial regulation, and telecommunications policy.",
    outputs: ["Compute Governance Annual", "Policy Brief Series", "Institutional Design Papers", "Treaty Framework Analysis"],
    current: "Compute Governance Annual, Vol. I — forthcoming Q4 2026",
    link: "/publications",
    external: false,
  },
  {
    num: "03",
    code: "GRT",
    title: "The Good Regulator Project",
    tag: "Theoretical Research",
    lead: "Formal development of the Good Regulator Theorem and its applications across AI alignment, institutional design, and complex systems governance.",
    body: "The Good Regulator Project is TAI's flagship theoretical research program. It develops the formal mathematical foundations of Ashby's Law and the Good Regulator Theorem, extends their application to contemporary problems in AI alignment and governance, and produces the GRT Lecture Series — an annual public lecture by a leading theorist working at the intersection of cybernetics, AI, and governance. The program examines what it means, concretely, for a regulatory body to maintain an adequate model of a rapidly evolving AI system.",
    outputs: ["GRT Lecture Series", "Regulatory Model Adequacy Framework", "AI Alignment Working Papers", "Annual GRT Symposium"],
    current: "GRT Lecture Series, inaugural lecture — Q3 2026",
    link: "/events",
    external: false,
  },
  {
    num: "04",
    code: "CS",
    title: "Compute & Society",
    tag: "Social Analysis",
    lead: "Distributional analysis of the compute transition — labor, geography, equity, and political economy.",
    body: "The Compute & Society program examines who bears the costs and captures the benefits of the compute transition. The program applies the Law of Requisite Variety to understand how social institutions must adapt to maintain adequate regulatory variety as AI systems become more complex and consequential. The program produces distributional analysis of AI infrastructure investment, labor market modeling for compute-intensive industries, geographic analysis of data center concentration, and equity assessments of differential access to AI-native services.",
    outputs: ["Compute Equity Index", "Labor Market Analysis Series", "Geographic Concentration Reports", "Policy Briefs for Civil Society"],
    current: "Compute Equity Index, baseline edition — forthcoming 2026",
    link: "/publications",
    external: false,
  },
];

export default function Research() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", paddingTop: "8rem", paddingBottom: "5rem", borderBottom: "1px solid #1E2228" }}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "2rem", height: "1px", background: "#8B1A14" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14" }}>
                Research Programs
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8E4DC", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
              Research
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.125rem", color: "#6A6560", lineHeight: 1.75, maxWidth: "640px" }}>
              Four programs applying Ashby's Law to the defining control problems of the compute transition — from infrastructure analysis to AI alignment to democratic governance.
            </p>
          </div>
        </div>
      </section>

      {/* ── PREMISE ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <div style={{ borderLeft: "3px solid #8B1A14", paddingLeft: "1.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1.125rem", color: "#1A1410", lineHeight: 1.5 }}>
                  "Every good regulator of a system must be a model of that system."
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#8A8580", marginTop: "0.75rem" }}>
                  — Conant & Ashby, 1970
                </p>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.25rem" }}>
                TAI's research is organized around a single premise: the compute transition is generating variety faster than governance institutions can absorb it. As AI-native compute infrastructure reshapes the global economy, the complexity of the regulated system is growing faster than the variety of the institutions attempting to regulate it.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78 }}>
                This is not a prediction. It is a structural observation derived directly from Ashby's Law. TAI's research programs document this variety deficit, analyze its consequences, and develop structural recommendations for institutions with sufficient variety to match the systems they regulate.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section style={{ background: "#F5F2EC" }}>
        <div className="container" style={{ paddingBottom: "6rem" }}>
          {PROGRAMS.map((prog, i) => (
            <Reveal key={prog.code} delay={i * 60}>
              <div style={{ borderTop: "1px solid #D8D4CC", paddingTop: "4rem", paddingBottom: "4rem" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "1.25rem" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.5rem", fontWeight: 700, color: "#E0DDD8", lineHeight: 1, letterSpacing: "-0.04em", flexShrink: 0 }}>
                        {prog.num}
                      </span>
                      <div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.3)", padding: "0.2rem 0.5rem", display: "inline-block", marginBottom: "0.6rem" }}>
                          {prog.tag}
                        </span>
                        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2vw, 1.625rem)", color: "#1A1410", lineHeight: 1.2 }}>
                          {prog.title}
                        </h2>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#5A5550", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                      {prog.lead}
                    </p>
                    <div style={{ borderLeft: "2px solid #8B1A14", paddingLeft: "1rem", marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.4rem" }}>Current</p>
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#3A3530" }}>{prog.current}</p>
                    </div>
                    {prog.external ? (
                      <a href={prog.link} target="_blank" rel="noopener noreferrer" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#F0EDE6",
                        background: "#8B1A14",
                        border: "1px solid #8B1A14",
                        padding: "0.75rem 1.5rem",
                        textDecoration: "none",
                        transition: "background 200ms",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                      >
                        Read Report ↗
                      </a>
                    ) : (
                      <Link href={prog.link} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#2A2620",
                        background: "transparent",
                        border: "1px solid #2A2620",
                        padding: "0.75rem 1.5rem",
                        textDecoration: "none",
                        transition: "background 200ms, color 200ms",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#2A2620"; e.currentTarget.style.color = "#F5F2EC"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2A2620"; }}
                      >
                        View Outputs
                      </Link>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#3A3530", lineHeight: 1.78 }}>
                      {prog.body}
                    </p>
                  </div>

                  <div className="lg:col-span-3">
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8580", marginBottom: "1rem" }}>
                      Program Outputs
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {prog.outputs.map(output => (
                        <div key={output} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                          <span style={{ color: "#8B1A14", fontSize: "0.65rem", marginTop: "0.25rem", flexShrink: 0 }}>—</span>
                          <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.5 }}>{output}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: "1px solid #D8D4CC" }} />
        </div>
      </section>

      {/* ── CROSS-DOMAIN ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Cross-Domain Applications
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#E8E4DC", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              One Law. Every System.
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "640px", marginBottom: "3.5rem" }}>
              TAI's research draws on and contributes to a broad cross-domain literature applying the Law of Requisite Variety to every sector where governance meets complexity. The variety deficit is universal — only the domain changes.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#1E2228" }}>
            {CROSS_DOMAIN.map((d, i) => (
              <Reveal key={d.sector} delay={i * 40}>
                <div style={{ background: "#111318", padding: "1.75rem", height: "100%" }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "0.9375rem", color: "#E8E4DC", lineHeight: 1.3, marginBottom: "0.5rem" }}>
                    {d.sector}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#8B1A14", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
                    {d.formula}
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.8125rem", color: "#7A7570", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {d.desc}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#3A3830" }}>
                    {d.tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/theory" style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.2)",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.2)")}
              >
                Read the Theory →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <div style={{ maxWidth: "720px" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Research Approach
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Structural Analysis, Not Commentary
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#8A8580", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                TAI's research methodology is explicitly structural. We do not produce commentary on current events, advocacy for specific policy positions, or analysis commissioned by interested parties. We produce models — formal and informal — of the systems that policymakers and institutions must regulate.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#8A8580", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                All TAI research is subject to independent peer review before publication. All data, code, and methodological documentation are published alongside research outputs. We do not accept restricted funding that limits publication rights.
              </p>
              <Link href="/about" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#E8E4DC",
                background: "transparent",
                border: "1px solid rgba(232,228,220,0.25)",
                padding: "0.875rem 1.75rem",
                textDecoration: "none",
                transition: "border-color 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.25)")}
              >
                Independence Policy
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
