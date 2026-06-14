/*
 * Theory.tsx — The Theory Page v3
 * Design: Clean Institutional — white background, DM Serif Display
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const DOMAINS = [
  { label: "AI Alignment", title: "The Alignment Problem as a Variety Problem", body: "A superintelligent AI will operate with cognitive variety vastly exceeding human processing bounds. Human oversight will eventually hit a mathematical limit — V(R) < V(D) — where we can no longer absorb or regulate its outputs. This is not a safety engineering problem. It is a mathematical inevitability unless the regulator's variety scales with the system's." },
  { label: "Compute Governance", title: "Governing AI-Native Infrastructure", body: "Compute concentration creates governance deficits at national and multilateral levels. Any regulatory body attempting to govern AI infrastructure must maintain internal models of equivalent complexity. Regulatory agencies with insufficient variety will systematically fail to govern the systems they oversee." },
  { label: "Financial Systems", title: "Regulatory Variety Deficits in Markets", body: "The 2008 financial crisis was, at its structural root, a variety failure. Financial regulators lacked sufficient internal model complexity to absorb the variety of the instruments they were governing. Ashby's Law predicts this failure class precisely." },
  { label: "Cybersecurity", title: "Threat Detection as Model Adequacy", body: "Every cybersecurity failure is a variety deficit. The attacker's variety exceeded the defender's model. Ashby's Law sets the formal lower bound on what adequate defense requires: a defender must maintain an internal model of the threat landscape with variety at least equal to the attacker's." },
  { label: "Autonomous Systems", title: "Governing Systems That Govern Themselves", body: "Autonomous vehicles, weapons systems, and AI agents introduce a new governance problem: the governed system itself makes governance decisions. The regulator must maintain a model not just of behavior, but of the decision-making process — a recursive variety requirement." },
  { label: "Critical Infrastructure", title: "Infrastructure Chokepoints & Control", body: "AI-native compute infrastructure is becoming critical infrastructure. Structural chokepoints in the AI supply chain create new governance imperatives. Any entity controlling a chokepoint effectively controls the variety of the systems that depend on it." },
  { label: "Democratic Governance", title: "Democratic Institutions & Compute Concentration", body: "Democratic institutions were not designed to regulate systems of this complexity. Legislative processes, judicial review, and administrative rulemaking all operate at variety levels far below the systems they now attempt to govern. The variety gap is widening." },
  { label: "Healthcare & Biology", title: "Biological Systems & Regulatory Complexity", body: "Healthcare AI systems operate at variety levels that exceed existing regulatory frameworks. The FDA's approval process was designed for deterministic devices, not adaptive systems whose behavior changes with deployment. Ashby's Law provides a formal criterion for adequate regulation." },
];

export default function Theory() {
  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Theoretical Foundation</p>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              Ashby's Law, the Good Regulator Theorem, and the Limits of Control
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              A formal exposition of the theoretical foundations that unify TAI's research programs — from AI alignment to financial regulation, from cybersecurity to democratic governance.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Part I — Ashby 1956</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1.5rem" }}>The Law of Requisite Variety</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                W. Ross Ashby introduced the Law of Requisite Variety in <em>An Introduction to Cybernetics</em> (1956). The law states that a regulator can only effectively control an environment if its internal variety — the number of distinguishable states it can occupy — is greater than or equal to the variety of the disturbances it must absorb.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Formally: let R be a regulator, D be the set of disturbances from the environment. The variety of R, written V(R), must satisfy V(R) ≥ V(D) for adequate regulation. If V(R) &lt; V(D), some disturbances will pass through unabsorbed — the regulator will fail.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8 }}>
                This is not a design principle or a heuristic. It is a mathematical theorem. Every failure of governance, every regulatory gap, every oversight failure can be analyzed as a variety deficit.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ border: "1px solid #E5E4E0", padding: "2.5rem", background: "#FAFAF8" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.5rem" }}>The Formal Statement</p>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "2rem", color: "#111111", textAlign: "center", padding: "2rem 0", borderTop: "1px solid #E5E4E0", borderBottom: "1px solid #E5E4E0", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>V(R) ≥ V(D)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { sym: "V(R)", def: "Variety of the Regulator — the number of distinguishable states the regulatory system can occupy" },
                    { sym: "V(D)", def: "Variety of the Disturbance — the number of distinguishable states the regulated environment can generate" },
                    { sym: "≥", def: "The regulator must match or exceed the complexity of what it governs. Any shortfall is a structural governance failure." },
                  ].map(item => (
                    <div key={item.sym} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "#A02D24", minWidth: "3rem", paddingTop: "0.1rem" }}>{item.sym}</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.65 }}>{item.def}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #E5E4E0" }}>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#555555", lineHeight: 1.6 }}>"Only variety can destroy variety."</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#AAAAAA", marginTop: "0.5rem" }}>— W. Ross Ashby, 1956</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <div style={{ border: "1px solid #E5E4E0", padding: "2.5rem", background: "#FFFFFF" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.5rem" }}>The Theorem</p>
                <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "1.25rem", color: "#111111", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                  "Every good regulator of a system must be a model of that system."
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#AAAAAA", marginBottom: "1.5rem" }}>— Conant & Ashby, 1970</p>
                <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #E5E4E0" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.7 }}>
                    The Good Regulator Theorem states that any system that successfully regulates another must contain — or effectively be — a model of the regulated system. The model need not be explicit or conscious, but it must exist in some form within the regulator's structure.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Part II — Conant & Ashby 1970</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1.5rem" }}>The Good Regulator Theorem</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                In 1970, Roger Conant and W. Ross Ashby published "Every Good Regulator of a System Must Be a Model of That System" in the <em>International Journal of Systems Science</em>. The paper proved that any regulator that successfully controls a system must contain an isomorphic representation of the system's relevant structure.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                This has profound implications for institutional design. A regulatory body that lacks an adequate internal model of the system it governs cannot regulate it effectively — not because of insufficient effort or political will, but because of a structural impossibility.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8 }}>
                TAI's Good Regulator Project extends this theorem to contemporary governance problems: AI oversight architectures, compute governance institutions, financial regulatory bodies, and democratic oversight mechanisms. In each domain, the GRT provides a formal criterion for what adequate governance requires.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Part III — The Ultimate Application</p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1.5rem", maxWidth: "600px" }}>The AI Alignment Problem as a Variety Problem</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                The ultimate proof of Ashby's supremacy is found in AI alignment and superintelligence. Ashby's Law tells us something precise about our ability to govern advanced AI: a system cannot perfectly control an environment that includes itself.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Because a superintelligent AI will operate with cognitive variety vastly exceeding human processing bounds, human oversight will eventually hit a mathematical limit where we can no longer absorb or regulate its outputs. This is not a failure of effort — it is a structural consequence of the variety inequality V(Human Regulator) &lt; V(Superintelligent AI).
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8 }}>
                The GRT adds a second constraint: any system that successfully aligns an AI must model that AI. As AI systems become more capable, the model required for alignment becomes more complex — potentially as complex as the AI itself. This creates a recursive variety problem that is the formal core of the alignment challenge.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ border: "1px solid #E5E4E0", padding: "2rem", background: "#FAFAF8" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>The Variety Inequality</p>
                {[
                  { label: "Current AI Systems", eq: "V(Human) ≥ V(AI)", status: "Satisfied", color: "#2D7A3A", note: "Human regulators can currently maintain adequate models of AI system behavior." },
                  { label: "Advanced AI Systems", eq: "V(Human) ≈ V(AI)", status: "Marginal", color: "#8B6914", note: "As AI capabilities scale, the variety gap narrows. Regulatory adequacy becomes uncertain." },
                  { label: "Superintelligent AI", eq: "V(Human) < V(AI)", status: "Violated", color: "#A02D24", note: "Human oversight hits a mathematical limit. The variety deficit is structural and irreducible." },
                ].map(item => (
                  <div key={item.label} style={{ paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #E5E4E0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#333333" }}>{item.label}</p>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: item.color, border: `1px solid ${item.color}`, padding: "0.2rem 0.5rem" }}>{item.status}</span>
                    </div>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "#555555", marginBottom: "0.375rem" }}>{item.eq}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#888888", lineHeight: 1.55 }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Part IV — Application Domains</p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "0.75rem" }}>One Law. Eight Domains.</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, maxWidth: "560px", marginBottom: "3rem" }}>
              Ashby's Law applies wherever a system attempts to govern another system. TAI documents variety deficits across eight domains where the consequences are consequential.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {DOMAINS.map((d, i) => (
              <Reveal key={d.label} delay={i * 30}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", padding: "2rem 0", borderBottom: "1px solid #E5E4E0", alignItems: "start" }} className="grid-cols-1 sm:grid-cols-[200px_1fr]">
                  <div>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{String(i + 1).padStart(2, "0")}</p>
                    <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "0.9375rem", color: "#333333" }}>{d.label}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.125rem", color: "#111111", marginBottom: "0.75rem", lineHeight: 1.3 }}>{d.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "#666666", lineHeight: 1.75 }}>{d.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/research" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >Research Programs →</Link>
              <Link href="/publications" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#555555", border: "1px solid #CCCCCC", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "border-color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#555555")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#CCCCCC")}
              >Publications</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
