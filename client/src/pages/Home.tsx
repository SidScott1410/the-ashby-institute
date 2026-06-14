/*
 * Home.tsx — TAI Homepage v4
 * Design: Clean Institutional — white background, DM Serif Display headlines
 * Reference: Redwood Research × General Intuition × RAND
 */
import { useEffect, useRef, useState } from "react";
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
  { n: "01", label: "AI Alignment", short: "V(R) ≥ V(AI)" },
  { n: "02", label: "Compute Governance", short: "Institutional design" },
  { n: "03", label: "Financial Systems", short: "Regulatory deficits" },
  { n: "04", label: "Cybersecurity", short: "Threat modeling" },
  { n: "05", label: "Autonomous Systems", short: "Recursive control" },
  { n: "06", label: "Critical Infrastructure", short: "Chokepoint analysis" },
  { n: "07", label: "Democratic Governance", short: "Variety & representation" },
  { n: "08", label: "Healthcare & Biology", short: "Adaptive regulation" },
];

const PROGRAMS = [
  { code: "CF", title: "Compute Futures", desc: "Structural scenario analysis of the global compute landscape through 2030 and beyond." },
  { code: "CG", title: "Compute Governance", desc: "Institutional design for governing AI-native compute at national and multilateral levels." },
  { code: "GRP", title: "The Good Regulator Project", desc: "Formal development of the GRT across AI oversight, financial regulation, and democratic institutions." },
  { code: "CS", title: "Compute & Society", desc: "Distributional analysis of the compute transition — who benefits, who is displaced, and why." },
];

function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return done ? (
    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.08em", color: "#2D7A3A" }}>Subscribed. Thank you.</p>
  ) : (
    <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }} style={{ display: "flex", gap: "0", maxWidth: "400px" }}>
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)} required
        placeholder="your@email.com"
        style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#111111", background: "#FFFFFF", border: "1px solid #CCCCCC", borderRight: "none", padding: "0.625rem 1rem", outline: "none" }}
      />
      <button type="submit" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.625rem 1.25rem", cursor: "pointer", transition: "background 150ms", whiteSpace: "nowrap" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
        onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
      >Subscribe</button>
    </form>
  );
}

export default function Home() {
  return (
    <Layout>

      {/* ── HERO ── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: "820px" }}>
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1.5rem" }}>
                The Ashby Institute — Independent Research
              </p>
              <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(2.25rem, 5vw, 4rem)", color: "#111111", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
                Every good regulator must be a model of its system.
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.0625rem", color: "#555555", lineHeight: 1.8, maxWidth: "620px", marginBottom: "2.5rem" }}>
                TAI is an independent nonprofit research organization applying Ashby's Law of Requisite Variety to the defining governance problems of the compute era — from AI alignment to democratic institutions, from financial regulation to critical infrastructure.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/theory" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "background 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
                >
                  The Theory
                </Link>
                <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#333333", border: "1px solid #CCCCCC", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "border-color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#555555")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#CCCCCC")}
                >
                  Compute 2030 Report ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE LAW ── */}
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>
                Theoretical Foundation
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Ashby's Law of Requisite Variety
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                W. Ross Ashby proved in 1956 that a regulator can only effectively control a system if its internal variety — the number of distinguishable states it can occupy — is greater than or equal to the variety of the disturbances it must absorb.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "2rem" }}>
                This is not a metaphor. It is a mathematical constraint that applies to any system attempting to govern any other system — from AI alignment to financial regulation, from cybersecurity to democratic governance. Every failure of regulation is, at its root, a variety deficit.
              </p>
              <Link href="/theory" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", textDecoration: "none", borderBottom: "1px solid #A02D24", paddingBottom: "0.125rem", transition: "opacity 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Read the full theoretical exposition →
              </Link>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ border: "1px solid #E5E4E0", padding: "2.5rem", background: "#FFFFFF" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.5rem" }}>
                  The Constraint
                </p>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "2.5rem", color: "#111111", textAlign: "center", padding: "2rem 0", borderTop: "1px solid #E5E4E0", borderBottom: "1px solid #E5E4E0", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
                  V(R) ≥ V(D)
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { sym: "V(R)", def: "Variety of the Regulator — the number of distinguishable states the governing system can occupy" },
                    { sym: "V(D)", def: "Variety of the Disturbance — the number of distinguishable states the governed system can generate" },
                  ].map(item => (
                    <div key={item.sym} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "#A02D24", minWidth: "3rem", paddingTop: "0.1rem" }}>{item.sym}</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.65 }}>{item.def}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #E5E4E0" }}>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#555555", lineHeight: 1.6 }}>
                    "Only variety can destroy variety."
                  </p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#AAAAAA", marginTop: "0.5rem" }}>
                    — W. Ross Ashby, 1956
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── APPLICATION DOMAINS ── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>
                  Application Domains
                </p>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#111111", lineHeight: 1.1 }}>
                  One Law. Eight Domains.
                </h2>
              </div>
              <Link href="/theory" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555555", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A02D24")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
              >
                Full exposition →
              </Link>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", border: "1px solid #E5E4E0" }} className="grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d, i) => (
              <Reveal key={d.n} delay={i * 40}>
                <Link href="/theory" style={{ display: "block", background: "#FFFFFF", padding: "2rem 1.75rem", textDecoration: "none", transition: "background 150ms, border-left-color 150ms", height: "100%", borderRight: i % 4 !== 3 ? "1px solid #E5E4E0" : "none", borderBottom: i < 4 ? "1px solid #E5E4E0" : "none", borderLeft: "3px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F7F6F4"; e.currentTarget.style.borderLeftColor = "#A02D24"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderLeftColor = "transparent"; }}
                >
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.875rem" }}>{d.n}</p>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.0625rem", color: "#111111", lineHeight: 1.25, marginBottom: "0.625rem" }}>{d.label}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: "#AAAAAA", letterSpacing: "0.05em", lineHeight: 1.5 }}>{d.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED: COMPUTE 2030 ── */}
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>
              Featured Publication
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1rem" }}>
                Compute 2030
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888", marginBottom: "1.5rem" }}>
                Inaugural Edition — June 2026
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                TAI's inaugural scenario report series. Four structural scenarios for how AI-native compute orchestration reshapes the global economy, governance, and strategic balance through 2030.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "2rem" }}>
                Applying Ashby's Law to compute governance: which institutions will have sufficient variety to regulate the systems they oversee? Which will not?
              </p>
              <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", display: "inline-block", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >
                Read the Report ↗
              </a>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E4E0" }}>
                {[
                  { label: "Scenario I", title: "Concentrated Dominance", desc: "A small number of actors control the majority of AI-native compute. Regulatory variety deficits become acute." },
                  { label: "Scenario II", title: "Multilateral Fragmentation", desc: "Compute infrastructure fragments along geopolitical lines. Governance variety is distributed but incoherent." },
                  { label: "Scenario III", title: "Governed Transition", desc: "International institutions develop sufficient variety to govern the compute transition. The GRT condition is met." },
                  { label: "Scenario IV", title: "Diffuse Proliferation", desc: "Compute capabilities diffuse broadly. Governance variety is distributed but regulatory frameworks lag." },
                ].map((s, i) => (
                  <div key={s.label} style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", minWidth: "80px", paddingTop: "0.15rem" }}>{s.label}</span>
                      <div>
                        <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "0.9375rem", color: "#111111", marginBottom: "0.375rem" }}>{s.title}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#888888", lineHeight: 1.6 }}>{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RESEARCH PROGRAMS ── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>Research Programs</p>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#111111", lineHeight: 1.1 }}>Four Programs. One Premise.</h2>
              </div>
              <Link href="/research" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555555", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A02D24")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
              >All programs →</Link>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "#E5E4E0" }} className="grid-cols-1 lg:grid-cols-2">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.code} delay={i * 50}>
                <Link href="/research" style={{ display: "block", background: "#FFFFFF", padding: "2rem", textDecoration: "none", transition: "background 150ms", height: "100%" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F7F6F4")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#FFFFFF")}
                >
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>{p.code}</p>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.125rem", color: "#111111", marginBottom: "0.75rem", lineHeight: 1.25 }}>{p.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.7 }}>{p.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Who We Are</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Independent. Rigorous. Open Access.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                The Ashby Institute is an independent nonprofit research organization. We accept no funding from commercial AI developers, compute infrastructure providers, or any entity with a direct financial interest in the systems we analyze.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "2rem" }}>
                Our name is drawn from W. Ross Ashby's Good Regulator Theorem (1970): "Every good regulator of a system must be a model of that system." TAI exists to be that model — a rigorous, independent analytical institution that maintains sufficient internal variety to understand and analyze the systems reshaping our world.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/about" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", textDecoration: "none", borderBottom: "1px solid #A02D24", paddingBottom: "0.125rem", transition: "opacity 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >About the Institute →</Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E4E0" }}>
                {[
                  { label: "Independence", value: "No commercial funding. No institutional affiliations. No conflicts of interest." },
                  { label: "Open Access", value: "All research published open access. No paywalls. No embargoes." },
                  { label: "Rigor", value: "Peer-reviewed methodology. Formal theoretical foundations. Transparent assumptions." },
                  { label: "Scope", value: "Eight domains. One analytical framework. Consistent application of Ashby's Law." },
                ].map(item => (
                  <div key={item.label} style={{ background: "#FFFFFF", padding: "1.5rem 1.75rem" }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{item.label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#555555", lineHeight: 1.65 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: "#FFFFFF", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ maxWidth: "600px" }}>
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Newsletter</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1rem" }}>
                Research updates and new publications.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Occasional dispatches on new research, events, and publications. No promotional content. Unsubscribe at any time.
              </p>
              <NewsletterInline />
            </Reveal>
          </div>
        </div>
      </section>

    </Layout>
  );
}
