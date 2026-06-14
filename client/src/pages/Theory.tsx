/*
 * Theory.tsx — The Theory page
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 * Deep dive into Ashby's Law of Requisite Variety, the Good Regulator Theorem,
 * and their application to AI alignment, governance, and complex systems.
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

const APPLICATIONS = [
  {
    domain: "AI Alignment & Superintelligence",
    tag: "The Control Problem",
    theorem: "V(H) < V(AI) → Human oversight fails",
    body: "A superintelligent AI will operate with cognitive variety vastly exceeding human processing bounds. Because V(H) < V(AI), human oversight hits a mathematical limit where we can no longer absorb or regulate its outputs. This is not a policy failure. It is a mathematical certainty derived directly from the Law of Requisite Variety. The alignment problem is, at its core, a variety matching problem.",
    implication: "Any alignment strategy that does not address the fundamental variety gap is structurally insufficient, regardless of its technical sophistication.",
  },
  {
    domain: "Compute Infrastructure & Scaling Laws",
    tag: "Scaling Laws",
    theorem: "Parameters ∝ V(training distribution)",
    body: "Scaling laws are variety matching. An LLM's parameter count must scale proportionally to absorb the vocabulary, contextual nuance, and factual variety of human knowledge. Ashby's Law dictates the design limits of every compute architecture: a model with insufficient parameters cannot represent the variety of its training distribution, and will systematically fail on out-of-distribution inputs.",
    implication: "Compute allocation is not merely an engineering optimization problem — it is a variety-matching problem with hard mathematical bounds.",
  },
  {
    domain: "Governance & Regulatory Design",
    tag: "Institutional Design",
    theorem: "V(regulator) ≥ V(regulated system)",
    body: "Regulatory bodies that do not maintain adequate internal models of the systems they oversee will be systematically inadequate — not because of bad faith, but because of a structural mismatch between regulatory model complexity and system complexity. The SEC cannot regulate algorithmic trading if its internal model of market microstructure has insufficient variety. The FDA cannot regulate AI diagnostics if its review processes cannot represent the variety of failure modes.",
    implication: "Regulatory failure is a predictable mathematical outcome when institutional variety is insufficient. The solution is not more rules — it is more variety in the regulator.",
  },
  {
    domain: "Cybersecurity & Threat Detection",
    tag: "Threat Modeling",
    theorem: "V(defense) ≥ V(attack surface)",
    body: "To protect against metamorphic malware and polymorphic zero-day exploits, a security stack must possess variety matching the threat landscape. XDR systems that fail to model attacker variety are mathematically guaranteed to be breached. The attacker's variety advantage — the ability to generate novel attack vectors faster than defenders can model them — is the fundamental asymmetry in cybersecurity.",
    implication: "Security architectures must be designed with explicit variety budgets. Any system with a fixed detection signature set will eventually be defeated by an attacker with higher variety.",
  },
  {
    domain: "Financial Systems & Market Regulation",
    tag: "Systemic Risk",
    theorem: "V(oversight) < V(financial system) → Crisis",
    body: "The 2008 financial crisis was a variety failure. Regulators' internal models of the financial system — their risk models, their stress tests, their understanding of interconnections — had insufficient variety to represent the actual state space of the system they were regulating. The same pattern appears in every major financial crisis: the regulator's model is always simpler than the system it is supposed to control.",
    implication: "Systemic financial risk is fundamentally a variety problem. Macro-prudential regulation must be designed to continuously expand regulatory variety to match financial system complexity.",
  },
  {
    domain: "Healthcare & Biological Systems",
    tag: "Biological Regulation",
    theorem: "Homeostasis = continuous variety matching",
    body: "Homeostasis is the original regulator. Biological systems maintain internal models of their environments at every scale — from cellular feedback loops to immune system modeling of pathogen variety. Medicine fails when its models are insufficient: antibiotic resistance is a pathogen variety problem; cancer immunotherapy is a tumor variety problem; pandemic response failures are epidemiological model variety problems.",
    implication: "Precision medicine is, at its core, a variety-matching project: matching therapeutic interventions to the full variety of patient-specific biological states.",
  },
  {
    domain: "Democratic Governance & Political Systems",
    tag: "Political Theory",
    theorem: "V(government) ≥ V(governed society)",
    body: "Democratic institutions are regulators of social variety. A government that cannot represent the variety of its citizens' interests, needs, and conditions will systematically fail to govern effectively. Populism, polarization, and institutional breakdown are symptoms of variety deficits: the governing model has become too simple to represent the actual variety of the governed system.",
    implication: "Democratic reform is a variety expansion problem. Institutions must be designed to continuously increase their representational variety as social complexity grows.",
  },
  {
    domain: "Climate & Environmental Systems",
    tag: "Earth Systems",
    theorem: "V(climate model) must match V(climate system)",
    body: "Climate governance fails when policymakers' models of the climate system are insufficient. The variety of feedback loops, tipping points, regional variations, and socioeconomic interactions in the climate system vastly exceeds the variety of most policy models. This variety deficit explains why climate policy consistently underestimates the speed and severity of climate change.",
    implication: "Climate governance requires models with sufficient variety to represent the full complexity of Earth system dynamics — not simplified models optimized for political palatability.",
  },
];

export default function Theory() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", paddingTop: "8rem", paddingBottom: "5rem", borderBottom: "1px solid #1E2228" }}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "2rem", height: "1px", background: "#8B1A14" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14" }}>
                Theoretical Foundation
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#E8E4DC", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
              The Theory
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.125rem", color: "#6A6560", lineHeight: 1.75, maxWidth: "640px" }}>
              Ashby's Law of Requisite Variety and the Good Regulator Theorem — the mathematical foundations of TAI's research program. One law. Every system.
            </p>
          </div>
        </div>
      </section>

      {/* ── ASHBY'S LAW ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Theorem I
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1A1410", lineHeight: 1.2, marginBottom: "1rem" }}>
                The Law of Requisite Variety
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#8A8580", textTransform: "uppercase", marginBottom: "2rem" }}>
                W. Ross Ashby, 1956<br />
                <em style={{ fontStyle: "italic", textTransform: "none" }}>An Introduction to Cybernetics</em>
              </p>
              <div style={{ background: "#0A0C0F", padding: "1.5rem 2rem" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", marginBottom: "0.75rem" }}>
                  The Constraint
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "2rem", color: "#8B1A14", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
                  V(R) ≥ V(D)
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#4A4540", lineHeight: 1.7 }}>
                  V(R) = variety of regulator<br />
                  V(D) = variety of disturbances<br />
                  Violation → control failure
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <div style={{ borderLeft: "3px solid #8B1A14", paddingLeft: "2rem", marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.125rem, 2vw, 1.5rem)", color: "#1A1410", lineHeight: 1.45 }}>
                  "Only variety can absorb variety."
                </p>
              </div>

              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The Law of Requisite Variety is a mathematical law about managing information states. A regulator can only effectively control an environment if its internal variety — the number of distinguishable states it can occupy — is greater than or equal to the variety of the disturbances it must absorb.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                Variety, in Ashby's framework, is a precise technical term: it refers to the number of distinguishable states that a system can occupy. A thermostat has low variety — it can be in one of a small number of states. A human brain has extraordinarily high variety. A global economy has variety that may be effectively infinite.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The law states that for a regulator to successfully control a system, the regulator must have at least as much variety as the disturbances it must handle. If the environment can be in 1,000 different states, the regulator must be capable of producing at least 1,000 different responses. A regulator with insufficient variety will be overwhelmed — it will encounter situations it cannot handle, and control will fail.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "2rem" }}>
                This is not a metaphor. It is a mathematical constraint that applies to any system attempting to govern any other system — from AI alignment to financial regulation, from cybersecurity to democratic governance. Every failure of regulation is, at its root, a variety deficit.
              </p>

              {/* Key implications */}
              <div style={{ background: "#FDFBF7", border: "1px solid #D8D4CC", padding: "2rem" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "1.25rem" }}>
                  Key Implications
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    "A regulator that is simpler than the system it governs will always fail eventually.",
                    "Adding more rules to a regulatory framework does not increase variety — it may actually reduce it.",
                    "Complexity in the regulated system demands equivalent complexity in the regulator.",
                    "Variety reduction (simplification) in the environment is the only alternative to increasing regulator variety.",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#8B1A14", flexShrink: 0, marginTop: "0.1rem" }}>→</span>
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#3A3530", lineHeight: 1.7 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE GOOD REGULATOR THEOREM ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Theorem II
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "1rem" }}>
                The Good Regulator Theorem
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#5A5550", textTransform: "uppercase", marginBottom: "2rem" }}>
                Conant & Ashby, 1970<br />
                <em style={{ fontStyle: "italic", textTransform: "none" }}>International Journal of Systems Science</em>
              </p>
              <div style={{ background: "#0A0C0F", padding: "1.5rem 2rem", border: "1px solid #1E2228" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", marginBottom: "0.75rem" }}>
                  The Theorem
                </p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#E8E4DC", lineHeight: 1.5 }}>
                  "Every good regulator of a system must be a model of that system."
                </p>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                In 1970, W. Ross Ashby and Roger Conant published a formal proof of a theorem that would become the foundation of TAI's research program. The Good Regulator Theorem states that any system capable of regulating another must maintain an internal model of the regulated system.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                This is not a design recommendation. It is a mathematical proof. A regulator without an adequate internal model of its environment cannot achieve good regulation — it is mathematically impossible. The model need not be explicit or conscious, but it must exist in some form within the regulator's structure.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "2rem" }}>
                The theorem has profound implications for institutional design. A regulatory agency that does not maintain an adequate model of the industry it regulates will fail to regulate it effectively. A government that does not maintain an adequate model of its society will fail to govern it. An AI alignment system that does not maintain an adequate model of the AI it is aligning will fail to align it.
              </p>

              {/* GRT implications grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Regulatory Adequacy", body: "A regulator's effectiveness is bounded by the accuracy and completeness of its internal model. Model degradation leads to regulatory failure." },
                  { title: "Model Maintenance", body: "As regulated systems evolve, regulators must continuously update their internal models. Static models governing dynamic systems will fail." },
                  { title: "Institutional Knowledge", body: "Regulatory expertise is not bureaucratic overhead — it is the substance of the internal model. Expertise loss is model degradation." },
                  { title: "AI Alignment", body: "An alignment system that cannot model the AI it is aligning cannot align it. The alignment problem is fundamentally a modeling problem." },
                ].map(item => (
                  <div key={item.title} style={{ borderLeft: "2px solid #1E2228", paddingLeft: "1.25rem" }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.5rem" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#6A6560", lineHeight: 1.65 }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AI ALIGNMENT: THE CONTROL PROBLEM ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <div style={{ marginBottom: "4rem" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                The Ultimate Application
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#E8E4DC", lineHeight: 1.1, maxWidth: "600px" }}>
                AI Alignment &<br />
                <em style={{ fontStyle: "italic" }}>The Mathematical Limit of Human Oversight</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-7">
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The ultimate proof of Ashby's supremacy over conventional alignment approaches is found in the mathematics of superintelligence. A system cannot perfectly control an environment that includes itself.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                Because a superintelligent AI (C) will operate with cognitive variety vastly exceeding human processing bounds (S), human oversight will eventually hit a mathematical limit where V(H) &lt; V(AI) — we can no longer absorb or regulate its outputs. This is not a policy failure. It is a mathematical certainty.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78, marginBottom: "2rem" }}>
                Ashby's Law tells us something terrifying about our ability to govern advanced AI: the moment an AI system's variety exceeds the variety of its human overseers, oversight becomes mathematically impossible. Not difficult — impossible. Any alignment strategy that does not address this fundamental variety gap is structurally insufficient.
              </p>

              {/* The failure condition */}
              <div style={{ background: "#111318", border: "1px solid #1E2228", padding: "2rem", marginBottom: "2rem" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4540", marginBottom: "1.5rem" }}>
                  The Alignment Failure Condition
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", color: "#8B1A14", minWidth: "120px" }}>V(AI) → ∞</span>
                    <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560" }}>AI variety grows with capability</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", color: "#4A4540", minWidth: "120px" }}>V(H) = const</span>
                    <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560" }}>Human cognitive variety is bounded</span>
                  </div>
                  <div style={{ height: "1px", background: "#1E2228" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", color: "#8B1A14", minWidth: "120px" }}>V(H) &lt; V(AI)</span>
                    <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#8B1A14" }}>Oversight fails. Control is lost.</span>
                  </div>
                </div>
              </div>

              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#8A8580", lineHeight: 1.78 }}>
                The implications are stark: alignment must be built into the system's architecture before the variety gap opens, not imposed from outside after it has opened. Constitutional AI, interpretability research, and corrigibility design are all attempts to solve the variety problem before it becomes unsolvable.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={150}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029926944/TLXgUMFr75EaJR9nBJmBKv/tai_alignment_diagram-QVLQapM6t4HUwr7cgNq9bV.webp"
                alt="AI Alignment Control Problem Diagram"
                style={{ width: "100%", display: "block", border: "1px solid #1E2228", marginBottom: "1rem" }}
              />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#3A3530", textTransform: "uppercase" }}>
                Fig. 2 — The AI Alignment Control Problem
              </p>

              {/* Key insight box */}
              <div style={{ marginTop: "2rem", borderLeft: "3px solid #8B1A14", paddingLeft: "1.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#E8E4DC", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                  "The alignment problem is not a problem of values. It is a problem of variety. We cannot align what we cannot model."
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#4A4540" }}>
                  — TAI Working Paper, 2026
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── APPLICATION DOMAINS ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <div style={{ marginBottom: "4rem" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Application Domains
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1A1410", lineHeight: 1.1 }}>
                One Law.<br />
                <em style={{ fontStyle: "italic" }}>Every System.</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {APPLICATIONS.map((app, i) => (
              <Reveal key={app.domain} delay={i * 40}>
                <div style={{
                  borderTop: "1px solid #D8D4CC",
                  padding: "2.5rem 0",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.5rem",
                }}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-3">
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.3)", padding: "0.2rem 0.5rem", display: "inline-block", marginBottom: "0.75rem" }}>
                        {app.tag}
                      </span>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "1.0625rem", color: "#1A1410", lineHeight: 1.3, marginBottom: "0.75rem" }}>
                        {app.domain}
                      </h3>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#8B1A14", letterSpacing: "0.04em" }}>
                        {app.theorem}
                      </p>
                    </div>
                    <div className="lg:col-span-5">
                      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#4A4540", lineHeight: 1.75 }}>
                        {app.body}
                      </p>
                    </div>
                    <div className="lg:col-span-4">
                      <div style={{ borderLeft: "2px solid #D8D4CC", paddingLeft: "1.25rem" }}>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8580", marginBottom: "0.5rem" }}>
                          Implication
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65 }}>
                          {app.implication}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid #D8D4CC" }} />
          </div>
        </div>
      </section>

      {/* ── VARIETY DIAGRAM ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029926944/TLXgUMFr75EaJR9nBJmBKv/tai_variety_diagram-oSmq5RYK4qmYKzHyf9vn8U.webp"
                alt="Law of Requisite Variety — Technical Diagram"
                style={{ width: "100%", display: "block", border: "1px solid #1E2228" }}
              />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#3A3530", marginTop: "0.75rem", textTransform: "uppercase" }}>
                Fig. 3 — The Law of Requisite Variety (Ashby, 1956)
              </p>
            </Reveal>
            <Reveal delay={150}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                The Formal Structure
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                The Variety Matching Problem
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#8A8580", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                In Ashby's formal framework, a system S is characterized by its state space — the set of all possible states it can occupy. The variety of S is the log₂ of the number of distinguishable states. A regulator R must have variety V(R) sufficient to match the variety V(D) of the disturbances it must handle.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#8A8580", lineHeight: 1.75, marginBottom: "2rem" }}>
                The diagram illustrates the fundamental constraint: when the regulator's variety is insufficient, there exist disturbance states for which the regulator has no adequate response. These are the failure modes — the states where control breaks down.
              </p>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link href="/research" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F0EDE6",
                  background: "#8B1A14",
                  border: "1px solid #8B1A14",
                  padding: "0.875rem 1.75rem",
                  textDecoration: "none",
                  transition: "background 200ms",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                >
                  Research Programs
                </Link>
                <Link href="/publications" style={{
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
                  Publications
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
