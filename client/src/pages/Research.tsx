/*
 * Research.tsx — Research Programs v3
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

const PROGRAMS = [
  {
    code: "CF",
    title: "Compute Futures",
    tagline: "Structural forecasting of the AI-native compute landscape",
    desc: "Compute Futures produces structural scenario analysis of the global compute landscape through 2030 and beyond. The program examines how the concentration, governance, and allocation of AI-native compute infrastructure will reshape economic power, geopolitical alignment, and institutional capacity. Ashby's Law frames the central question: do the institutions governing compute have sufficient internal variety to regulate the systems they oversee?",
    outputs: ["Compute 2030 (annual scenario report series)", "Compute Infrastructure Monitor (quarterly)", "Structural Briefings for policymakers"],
    domains: ["AI Infrastructure", "Geopolitics", "Economic Forecasting"],
  },
  {
    code: "CG",
    title: "Compute Governance",
    tagline: "Institutional design for governing strategic compute",
    desc: "Compute Governance produces rigorous institutional analysis of the governance frameworks — national, multilateral, and private — that regulate AI-native compute. The program applies the Good Regulator Theorem directly: what internal model complexity does a governance institution require to adequately regulate the compute systems it oversees? The program examines regulatory variety deficits and proposes institutional designs that satisfy the variety condition.",
    outputs: ["Compute Governance Annual", "Policy Briefs", "Institutional Design Studies"],
    domains: ["Regulatory Design", "International Law", "Technology Policy"],
  },
  {
    code: "GRP",
    title: "The Good Regulator Project",
    tagline: "Formal development of the GRT across governance domains",
    desc: "The Good Regulator Project is TAI's theoretical core. It develops the formal implications of the Good Regulator Theorem for contemporary governance problems — AI oversight architectures, financial regulatory design, democratic institutions, and critical infrastructure governance. The program produces both theoretical work (extending the GRT to new domains) and applied work (diagnosing variety deficits in specific regulatory contexts).",
    outputs: ["GRT Lecture Series", "Working Papers", "Theoretical Monographs"],
    domains: ["Cybernetics", "Institutional Theory", "AI Alignment"],
  },
  {
    code: "CS",
    title: "Compute & Society",
    tagline: "Distributional analysis of the compute transition",
    desc: "Compute & Society examines the distributional consequences of the AI-native compute transition — who benefits, who is displaced, and how the structural changes in compute allocation interact with existing patterns of economic and political inequality. The program applies Ashby's Law to questions of democratic governance: do democratic institutions have sufficient variety to represent the interests of those affected by the compute transition?",
    outputs: ["Compute Equity Index (annual)", "Policy Briefs", "Research Reports"],
    domains: ["Political Economy", "Labor Economics", "Democratic Theory"],
  },
];

const CROSS_DOMAINS = [
  { n: "01", label: "AI Alignment", desc: "Variety-matching conditions for AI oversight architectures" },
  { n: "02", label: "Compute Governance", desc: "Institutional design for governing strategic compute" },
  { n: "03", label: "Financial Systems", desc: "Regulatory variety deficits in complex financial markets" },
  { n: "04", label: "Cybersecurity", desc: "Threat detection as a model adequacy problem" },
  { n: "05", label: "Autonomous Systems", desc: "Governing systems that make governance decisions" },
  { n: "06", label: "Critical Infrastructure", desc: "Chokepoints, control, and structural dependencies" },
  { n: "07", label: "Democratic Governance", desc: "Institutional variety and the representation problem" },
  { n: "08", label: "Healthcare & Biology", desc: "Adaptive medical AI and regulatory complexity" },
];

export default function Research() {
  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Research Programs</p>
            <h1 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              Four Programs. One Premise.
            </h1>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              TAI's research programs apply Ashby's Law of Requisite Variety to the defining governance problems of the compute era. Each program addresses a distinct domain where variety deficits are consequential — and where rigorous structural analysis can improve institutional design.
            </p>
          </Reveal>
        </div>
      </section>

      {PROGRAMS.map((p, i) => (
        <section key={p.code} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
              <Reveal>
                <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{p.code}</p>
                <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "0.5rem" }}>{p.title}</h2>
                <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#888888", fontStyle: "italic", marginBottom: "1.5rem" }}>{p.tagline}</p>
                <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8 }}>{p.desc}</p>
              </Reveal>
              <Reveal delay={100}>
                <div style={{ border: "1px solid #E5E4E0", padding: "2rem", background: i % 2 === 0 ? "#FAFAF8" : "#FFFFFF" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Program Outputs</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
                    {p.outputs.map(o => (
                      <div key={o} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#A02D24", fontSize: "0.75rem", paddingTop: "0.15rem", flexShrink: 0 }}>→</span>
                        <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555" }}>{o}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid #E5E4E0", paddingTop: "1.25rem" }}>
                    <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "0.75rem" }}>Domains</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {p.domains.map(d => (
                        <span key={d} style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666666", border: "1px solid #DDDDDD", padding: "0.25rem 0.625rem" }}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Cross-Domain Application</p>
            <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "0.75rem" }}>One Law. Eight Domains.</h2>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, maxWidth: "560px", marginBottom: "3rem" }}>
              TAI's four programs collectively address eight domains where Ashby's Law identifies structural governance deficits.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1px", background: "#E5E4E0" }}>
            {CROSS_DOMAINS.map((d, i) => (
              <Reveal key={d.n} delay={i * 30}>
                <div style={{ background: "#FFFFFF", padding: "1.5rem", height: "100%" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F7F6F4")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#FFFFFF")}
                >
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{d.n}</p>
                  <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "1rem", color: "#111111", marginBottom: "0.5rem" }}>{d.label}</p>
                  <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.8125rem", color: "#888888", lineHeight: 1.6 }}>{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/theory" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >The Theory →</Link>
              <Link href="/publications" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555", border: "1px solid #CCCCCC", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "border-color 150ms" }}
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
