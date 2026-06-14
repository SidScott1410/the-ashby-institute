/*
 * Home.tsx — TAI Homepage v3
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 * Expanded mandate: Ashby's Law across AI, compute, governance, society, cybersecurity,
 * healthcare, finance, robotics, critical infrastructure
 */
import { useEffect, useRef, useState } from "react";
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

const DOMAINS = [
  {
    num: "01",
    title: "AI Alignment & Superintelligence",
    formula: "V(H) < V(AI) → Oversight fails",
    desc: "A superintelligent AI operates with cognitive variety vastly exceeding human processing bounds. Human oversight hits a mathematical limit. This is not a policy failure — it is a mathematical certainty derived directly from Ashby's Law.",
    tag: "The Control Problem",
  },
  {
    num: "02",
    title: "LLMs & Scaling Laws",
    formula: "Parameters ∝ V(training distribution)",
    desc: "Scaling laws are variety matching. An LLM's parameter count must scale proportionally to absorb the vocabulary, contextual nuance, and factual variety of human knowledge. Ashby's Law dictates design limits across every compute architecture.",
    tag: "AI/ML Infrastructure",
  },
  {
    num: "03",
    title: "Governance & Regulatory Design",
    formula: "V(regulator) ≥ V(regulated system)",
    desc: "Regulatory bodies that do not maintain adequate internal models of the systems they oversee will be systematically inadequate — not because of bad faith, but because of a structural mismatch between regulatory model complexity and system complexity.",
    tag: "Institutional Design",
  },
  {
    num: "04",
    title: "Cybersecurity & Threat Detection",
    formula: "V(defense) ≥ V(attack surface)",
    desc: "To protect against metamorphic malware and polymorphic zero-day exploits, a security stack must possess variety matching the threat landscape. XDR systems that fail to model attacker variety are mathematically guaranteed to be breached.",
    tag: "Threat Modeling",
  },
  {
    num: "05",
    title: "Autonomous Systems & Robotics",
    formula: "V(controller) ≥ V(environment)",
    desc: "Self-driving compute stacks must maintain a continuous 3D tracking model of dynamic actors to regulate steering and velocity. The controller's internal model must match the full variety of the physical environment it navigates.",
    tag: "Edge Computing",
  },
  {
    num: "06",
    title: "Critical Infrastructure",
    formula: "V(grid operator) ≥ V(load variation)",
    desc: "Smart grid operators use predictive AI to balance intermittent renewable energy inputs with fluctuating consumer demand. Fly-by-wire flight computers adjust control surfaces hundreds of times per second to absorb atmospheric turbulence.",
    tag: "Physical Systems",
  },
  {
    num: "07",
    title: "Financial Systems & Markets",
    formula: "V(oversight) < V(financial system) → Crisis",
    desc: "The 2008 financial crisis was a variety failure. Regulators' internal models had insufficient variety to represent the actual state space of the system they were regulating. Every major financial crisis follows the same structural pattern.",
    tag: "Systemic Risk",
  },
  {
    num: "08",
    title: "Healthcare & Biological Systems",
    formula: "Homeostasis = continuous variety matching",
    desc: "Homeostasis is the original regulator. Biological systems maintain internal models of their environments at every scale — from cellular feedback loops to immune system modeling of pathogen variety. Medicine fails when its models are insufficient.",
    tag: "Biological Regulation",
  },
];

const SCENARIOS = [
  { id: "I", title: "Concentrated Dominance", desc: "A single compute bloc achieves decisive advantage, restructuring global dependencies." },
  { id: "II", title: "Multipolar Fragmentation", desc: "Competing compute blocs emerge, with governance frameworks diverging across jurisdictions." },
  { id: "III", title: "Governed Transition", desc: "Multilateral bodies successfully coordinate compute governance, preserving institutional balance." },
  { id: "IV", title: "Diffuse Proliferation", desc: "Compute capacity distributes broadly, with governance lagging rapid technological diffusion." },
];

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <Layout>
      {/* ── HERO ── */}
      <section style={{
        background: "#0A0C0F",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Control diagram background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310419663029926944/TLXgUMFr75EaJR9nBJmBKv/tai_hero_bg-UN2MhkvGmfg5j2j6PbBTDf.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.4,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(10,12,15,0.98) 40%, rgba(10,12,15,0.25) 100%)",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 10, paddingBottom: "8rem", paddingTop: "10rem" }}>
          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "2rem", height: "1px", background: "#8B1A14" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14" }}>
                The Ashby Institute
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              fontSize: "clamp(2.75rem, 6vw, 5.75rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.02em",
              color: "#F0EDE6",
              marginBottom: "2rem",
            }}>
              Every good regulator<br />
              <em style={{ fontStyle: "italic", color: "#E8E4DC" }}>must be a model</em><br />
              of its system.
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "#8B1A14", letterSpacing: "0.04em" }}>
                V(R) ≥ V(D)
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#4A4540", textTransform: "uppercase" }}>
                Law of Requisite Variety — Ashby, 1956
              </span>
            </div>

            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(1rem, 1.8vw, 1.125rem)", color: "#8A8580", lineHeight: 1.75, marginBottom: "3rem", maxWidth: "620px" }}>
              An independent research organization applying Ashby's Law to the defining control problems of our era — AI alignment, compute governance, autonomous systems, critical infrastructure, financial regulation, and the structural limits of human oversight across every complex system.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/theory" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#F0EDE6", background: "#8B1A14", border: "1px solid #8B1A14",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
              >
                The Theory
              </Link>
              <Link href="/research" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.3)",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.3)")}
              >
                Research Programs
              </Link>
              <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#6A6560", background: "transparent", border: "1px solid rgba(106,101,96,0.4)",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms, color 200ms",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,228,220,0.4)"; e.currentTarget.style.color = "#E8E4DC"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(106,101,96,0.4)"; e.currentTarget.style.color = "#6A6560"; }}
              >
                Compute 2030 ↗
              </a>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, transparent, #3A3530)" }} />
        </div>
      </section>

      {/* ── THE LAW ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                The Foundation
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#1A1410", lineHeight: 1.2, marginBottom: "1rem" }}>
                Ashby's Law of Requisite Variety
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#8A8580", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                W. Ross Ashby, 1956
              </p>
              <Link href="/theory" style={{
                fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#8B1A14", textDecoration: "none", borderBottom: "1px solid #8B1A14", paddingBottom: "1px",
              }}>
                Full theoretical exposition →
              </Link>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <div style={{ borderLeft: "3px solid #8B1A14", paddingLeft: "2rem", marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", color: "#1A1410", lineHeight: 1.45, marginBottom: "0.75rem" }}>
                  "Only variety can absorb variety."
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#8A8580" }}>
                  — The Law of Requisite Variety
                </p>
              </div>

              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The Law of Requisite Variety is a mathematical law about managing information states. A regulator can only effectively control an environment if its internal variety — the number of distinguishable states it can occupy — is greater than or equal to the variety of the disturbances it must absorb.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "2rem" }}>
                This is not a metaphor. It is a mathematical constraint that applies to any system attempting to govern any other system — from AI alignment to financial regulation, from cybersecurity to democratic governance, from autonomous vehicles to smart grids. Every failure of regulation is, at its root, a variety deficit.
              </p>

              <div style={{ background: "#0A0C0F", padding: "2rem 2.5rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", marginBottom: "0.5rem" }}>
                    The Constraint
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#8B1A14", letterSpacing: "-0.01em" }}>
                    V(R) ≥ V(D)
                  </p>
                </div>
                <div style={{ width: "1px", height: "3rem", background: "#1E2228" }} />
                <div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", marginBottom: "0.5rem" }}>
                    The Failure Condition
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#4A4540", letterSpacing: "-0.01em" }}>
                    V(R) &lt; V(D)
                  </p>
                </div>
                <div style={{ width: "1px", height: "3rem", background: "#1E2228" }} />
                <div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", marginBottom: "0.5rem" }}>
                    Result
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#8B1A14", lineHeight: 1.5 }}>
                    System fails.<br />Control is lost.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DOMAINS: ONE LAW, EVERY SYSTEM ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <div style={{ marginBottom: "4rem" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Application Domains
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 3rem)", color: "#E8E4DC", lineHeight: 1.1 }}>
                One Law.<br />
                <em style={{ fontStyle: "italic" }}>Every System.</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#1E2228" }}>
            {DOMAINS.map((domain, i) => (
              <Reveal key={domain.num} delay={i * 50}>
                <div style={{
                  background: "#111318",
                  padding: "2rem",
                  height: "100%",
                  transition: "background 200ms",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#141820")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#111318")}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.3)", padding: "0.2rem 0.5rem" }}>
                      {domain.tag}
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", color: "#1E2228", fontWeight: 700, letterSpacing: "-0.04em" }}>
                      {domain.num}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1rem", color: "#E8E4DC", lineHeight: 1.3, marginBottom: "0.75rem" }}>
                    {domain.title}
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#8B1A14", letterSpacing: "0.04em", marginBottom: "1rem" }}>
                    {domain.formula}
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65 }}>
                    {domain.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Link href="/theory" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.2)",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.2)")}
              >
                Full theoretical exposition →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED RESEARCH: COMPUTE 2030 ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-7">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Inaugural Publication — June 2026
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1A1410", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Compute 2030:<br />
                <em style={{ fontStyle: "italic" }}>Four Structural Scenarios for the Global Compute Landscape</em>
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "2rem" }}>
                TAI's inaugural publication. Four structural scenarios for the global compute landscape through 2030, examining how the concentration, governance, and allocation of AI-native compute infrastructure will reshape economic power, geopolitical alignment, and institutional capacity.
              </p>

              {/* Scenarios */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {SCENARIOS.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", gap: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem", borderTop: "1px solid #D8D4CC", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#8B1A14", minWidth: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>
                      {s.id}
                    </span>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "0.9375rem", color: "#1A1410", marginBottom: "0.25rem" }}>
                        {s.title}
                      </p>
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560", lineHeight: 1.55 }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #D8D4CC" }} />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F0EDE6", background: "#8B1A14", border: "1px solid #8B1A14",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                >
                  Read the Report ↗
                </a>
                <Link href="/publications" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#2A2620", background: "transparent", border: "1px solid #2A2620",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms, color 200ms",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#2A2620"; e.currentTarget.style.color = "#F5F2EC"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2A2620"; }}
                >
                  All Publications
                </Link>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={150}>
              <div style={{ border: "1px solid #D8D4CC", overflow: "hidden", marginBottom: "1.5rem" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029926944/TLXgUMFr75EaJR9nBJmBKv/tai_variety_diagram-oSmq5RYK4qmYKzHyf9vn8U.webp"
                  alt="Law of Requisite Variety — Technical Diagram"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#8A8580", textTransform: "uppercase", marginBottom: "2rem" }}>
                Fig. 1 — Law of Requisite Variety (Ashby, 1956)
              </p>

              <div style={{ border: "1px solid #D8D4CC", background: "#FDFBF7" }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #D8D4CC" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14" }}>
                    Research Programs
                  </p>
                </div>
                {["Compute Futures", "Compute Governance", "The Good Regulator Project", "Compute & Society"].map((prog, i) => (
                  <div key={prog} style={{ padding: "0.875rem 1.5rem", borderBottom: i < 3 ? "1px solid #D8D4CC" : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#3A3530" }}>{prog}</span>
                    <Link href="/research" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: "#8B1A14", textDecoration: "none", letterSpacing: "0.08em" }}>→</Link>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                About TAI
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Independent.<br />
                <em style={{ fontStyle: "italic" }}>Rigorous.</em><br />
                Structurally Focused.
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {[
                  { num: "4", label: "Research Programs" },
                  { num: "8+", label: "Application Domains" },
                  { num: "2026", label: "Founded" },
                ].map(stat => (
                  <div key={stat.num} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "2.5rem", color: "#8B1A14", lineHeight: 1 }}>{stat.num}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540" }}>{stat.label}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.25)",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.25)")}
              >
                About the Institute
              </Link>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The Ashby Institute takes its name and mandate from a single theorem. In 1970, W. Ross Ashby and Roger Conant proved that any system capable of regulating another must maintain an internal model of the regulated system. The theorem is not a metaphor — it is a mathematical result with direct implications for governance design at every scale.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                TAI applies Ashby's Law broadly — to AI alignment, compute governance, autonomous systems, critical infrastructure, financial regulation, healthcare, and democratic institutions. Wherever a regulator must govern a complex system, the Law of Requisite Variety sets the mathematical floor for what adequate governance requires.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "2.5rem" }}>
                TAI is a nonprofit research organization with no commercial affiliations, no government contracts, and no industry funding. Our independence is structural, not aspirational — encoded in our governance documents and enforced by our Board. We produce structural analysis, not advocacy. We build models; we do not lobby.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "No Commercial Affiliations", desc: "No funding from AI companies, semiconductor manufacturers, or cloud infrastructure providers." },
                  { title: "No Government Contracts", desc: "Funding accepted from foundations and individuals subject to publication independence conditions." },
                  { title: "No Advocacy", desc: "TAI does not advocate for specific policy outcomes. We produce structural analysis." },
                ].map(item => (
                  <div key={item.title} style={{ borderLeft: "2px solid #1E2228", paddingLeft: "1.25rem" }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.5rem" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-7">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "0.75rem" }}>
                Stay Informed
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#1A1410", lineHeight: 1.2, marginBottom: "1rem" }}>
                Receive TAI Research Updates
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#6A6560", lineHeight: 1.7 }}>
                New publications, event announcements, and fellowship opportunities. No promotional content.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={100}>
              <div style={{ display: "flex", gap: "0" }}>
                <input
                  type="email"
                  placeholder="your@email.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: "0.9rem",
                    color: "#1A1410",
                    background: "#FDFBF7",
                    border: "1px solid #D8D4CC",
                    borderRight: "none",
                    padding: "0.875rem 1.25rem",
                    outline: "none",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#D8D4CC")}
                />
                <button
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#F0EDE6",
                    background: "#8B1A14",
                    border: "1px solid #8B1A14",
                    padding: "0.875rem 1.5rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 200ms",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                  onClick={() => window.location.href = "/contact"}
                >
                  Subscribe →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
