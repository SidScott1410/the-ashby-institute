/*
 * Research.tsx — TAI Research Programs v4
 * Design: GI-clone — Chakra Petch, white background, black typography, slate blue accent
 * No serif fonts. No rounded corners. No gradients.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";

const font = "'Chakra Petch', 'IBM Plex Mono', monospace";
const slate = "#2C3E6B";
const black = "#111111";
const mid = "#555555";
const light = "#888888";
const border = "#E0E0E0";

const PROGRAMS = [
  {
    label: "Program I",
    title: "Compute Futures",
    equation: "V(R) ≥ V(D)",
    description: "Scenario analysis and structural forecasting for the compute transition. Examines how shifts in AI-native compute orchestration reshape economic structures, labor markets, and the distribution of productive capacity across geographies and institutions.",
    outputs: ["Compute 2030 Annual Report", "Scenario Modeling Working Papers", "Compute Transition Indicators", "Quarterly Structural Briefings"],
    domains: ["Economics", "Infrastructure", "Labor Markets"],
  },
  {
    label: "Program II",
    title: "Compute Governance",
    equation: "R ⊇ model(S)",
    description: "Institutional design for compute regulation. Applies the Good Regulator Theorem to governance architectures: a regulatory body that cannot model the system it governs cannot govern it. Produces frameworks for compute access policy, export controls, and international coordination mechanisms.",
    outputs: ["Compute Governance Annual", "Policy Briefs", "Treaty Framework Analysis", "Regulatory Design Templates"],
    domains: ["Policy", "International Law", "Institutional Design"],
  },
  {
    label: "Program III",
    title: "The Good Regulator Project",
    equation: "∀S ∃R: R ≡ model(S)",
    description: "Foundational research applying Ashby's Law and the Good Regulator Theorem across domains beyond compute — AI alignment, critical infrastructure, financial systems, democratic governance, and biological systems. The theorem is a universal constraint on the possibility of control.",
    outputs: ["GRT Lecture Series", "Cross-Domain Working Papers", "Alignment Research Notes", "Mathematical Foundations"],
    domains: ["AI Alignment", "Systems Theory", "Control Theory"],
  },
  {
    label: "Program IV",
    title: "Compute & Society",
    equation: "V(equity) ≥ V(harm)",
    description: "Distributional analysis of the compute transition. Examines who gains and loses variety — adaptive capacity — as AI-native systems reshape access to economic opportunity, information, and political agency. Produces the annual Compute Equity Index.",
    outputs: ["Compute Equity Index", "Distributional Analysis Reports", "Civil Society Briefings", "Policy Recommendations"],
    domains: ["Equity", "Political Economy", "Civil Society"],
  },
];

const CROSS_DOMAINS = [
  { label: "AI Alignment", eq: "V(AI) ≫ V(H)", desc: "Superintelligent systems exceed human regulatory variety — the alignment problem is a variety-matching failure." },
  { label: "Cybersecurity", eq: "V(attacker) > V(defender)", desc: "Persistent insecurity arises when attackers hold more variety than defenders. Defense requires modeling the full attack surface." },
  { label: "Autonomous Systems", eq: "V(env) ≤ V(controller)", desc: "Autonomous vehicles, drones, and robotic systems fail when environmental variety exceeds controller model fidelity." },
  { label: "Critical Infrastructure", eq: "V(grid) ≤ V(operator)", desc: "Power grid failures and supply chain collapse follow from insufficient operator variety relative to system complexity." },
  { label: "Financial Systems", eq: "V(market) > V(regulator)", desc: "Systemic financial risk accumulates when market complexity exceeds regulatory model capacity — 2008 as a GRT failure." },
  { label: "Healthcare Systems", eq: "V(pathogen) > V(response)", desc: "Pandemic response failures are variety failures: public health systems that cannot model novel pathogens cannot control them." },
  { label: "Democratic Governance", eq: "V(polity) > V(institution)", desc: "Democratic institutions that cannot model the full variety of their polity lose legitimacy and effectiveness." },
  { label: "Climate & Earth Systems", eq: "V(climate) > V(policy)", desc: "Climate governance fails when policy instruments lack the variety to absorb the complexity of Earth system feedbacks." },
];

export default function Research() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>Research Programs</p>
          <h1 style={{ fontFamily: font, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Four Programs.<br />One Law.
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.95rem", color: mid, lineHeight: 1.8, maxWidth: "600px", fontWeight: 300, margin: 0 }}>
            Every research program at TAI is grounded in the same structural premise: Ashby's Law of Requisite Variety. A regulator that cannot model its system cannot govern it. We apply this constraint to compute, governance, society, and the full range of complex systems that define the modern world.
          </p>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      {PROGRAMS.map((prog, i) => (
        <section key={prog.label} style={{ borderBottom: `1px solid ${border}` }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px" }}>
              {/* Left: content */}
              <div style={{
                padding: "4rem 3rem 4rem 0",
                borderRight: `1px solid ${border}`,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate }}>{prog.label}</span>
                    <span style={{ fontFamily: font, fontSize: "0.85rem", color: "rgba(44,62,107,0.4)", fontWeight: 300 }}>{prog.equation}</span>
                  </div>
                  <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: black, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                    {prog.title}
                  </h2>
                  <p style={{ fontFamily: font, fontSize: "0.875rem", color: mid, lineHeight: 1.85, margin: "0 0 1.75rem", fontWeight: 300 }}>
                    {prog.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {prog.domains.map(d => (
                      <span key={d} style={{ fontFamily: font, fontSize: "0.48rem", letterSpacing: "0.14em", textTransform: "uppercase", color: slate, border: `1px solid rgba(44,62,107,0.35)`, padding: "0.25rem 0.625rem" }}>{d}</span>
                    ))}
                  </div>
                </div>
                <Link href="/publications" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem",
                  fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  color: black, textDecoration: "none", borderBottom: `1px solid ${black}`, paddingBottom: "2px",
                  transition: "color 150ms, border-color 150ms", width: "fit-content",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = slate; el.style.borderColor = slate; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = black; el.style.borderColor = black; }}
                >View Publications →</Link>
              </div>

              {/* Right: outputs */}
              <div style={{ padding: "4rem 0 4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontFamily: font, fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase", color: light, marginBottom: "1.5rem", marginTop: 0 }}>Program Outputs</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {prog.outputs.map((output, j) => (
                    <div key={output} style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem 0",
                      borderBottom: j < prog.outputs.length - 1 ? `1px solid ${border}` : "none",
                    }}>
                      <span style={{ fontFamily: font, fontSize: "0.48rem", color: "rgba(44,62,107,0.4)", minWidth: "1.5rem", letterSpacing: "0.06em" }}>0{j + 1}</span>
                      <span style={{ fontFamily: font, fontSize: "0.85rem", color: black, fontWeight: 400 }}>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CROSS-DOMAIN: 50/50 SPLIT ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>
          {/* Left: ASCII canvas */}
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "640px" }}>
            <AsciiCanvas sim="network" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.48rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Regulatory Network · Variety Matching</span>
            </div>
          </div>

          {/* Right: domains list */}
          <div style={{ background: "#FFFFFF", padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Cross-Domain Applications</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: black, margin: "0 0 2.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              One Law Governs Every System
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {CROSS_DOMAINS.map((d, i) => (
                <div key={d.label} style={{
                  padding: "1.1rem 0",
                  borderBottom: i < CROSS_DOMAINS.length - 1 ? `1px solid ${border}` : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.875rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: font, fontSize: "0.78rem", fontWeight: 600, color: black }}>{d.label}</span>
                    <span style={{ fontFamily: font, fontSize: "0.6rem", color: "rgba(44,62,107,0.5)", fontWeight: 300 }}>{d.eq}</span>
                  </div>
                  <p style={{ fontFamily: font, fontSize: "0.72rem", color: mid, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPUTE 2030 FEATURE ── */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Inaugural Publication · June 2026</p>
              <h2 style={{ fontFamily: font, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Compute 2030
              </h2>
              <p style={{ fontFamily: font, fontSize: "0.875rem", color: mid, lineHeight: 1.85, margin: "0 0 2rem", fontWeight: 300 }}>
                TAI's inaugural annual scenario report. Four structural scenarios for the compute transition through 2030, each analyzed through the lens of Ashby's Law — examining how regulatory variety must evolve to match the variety of AI-native compute systems.
              </p>
              <a
                href="https://theashbyinstitute.manus.space"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#fff", background: black, padding: "0.75rem 1.5rem",
                  textDecoration: "none", border: `1px solid ${black}`,
                  transition: "background 150ms, border-color 150ms",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slate; el.style.borderColor = slate; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = black; el.style.borderColor = black; }}
              >Read the Report →</a>
            </div>
            <div style={{ border: `1px solid ${border}`, padding: "2.5rem" }}>
              <p style={{ fontFamily: font, fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase", color: light, marginBottom: "1.5rem", marginTop: 0 }}>Four Scenarios</p>
              {[
                { n: "I", title: "Concentrated Dominance", desc: "One or two actors control the majority of global compute capacity." },
                { n: "II", title: "Multilateral Fragmentation", desc: "Compute infrastructure fractures along geopolitical fault lines." },
                { n: "III", title: "Governed Transition", desc: "International frameworks successfully coordinate compute governance." },
                { n: "IV", title: "Diffuse Proliferation", desc: "Compute capacity distributes broadly, outpacing governance capacity." },
              ].map((s, i) => (
                <div key={s.n} style={{ padding: "1rem 0", borderBottom: i < 3 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                    <span style={{ fontFamily: font, fontSize: "0.5rem", color: "rgba(44,62,107,0.4)", minWidth: "1rem" }}>{s.n}</span>
                    <div>
                      <p style={{ fontFamily: font, fontSize: "0.8rem", fontWeight: 600, color: black, margin: "0 0 0.25rem" }}>{s.title}</p>
                      <p style={{ fontFamily: font, fontSize: "0.72rem", color: mid, margin: 0, fontWeight: 300, lineHeight: 1.55 }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
