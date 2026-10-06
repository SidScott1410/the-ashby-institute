/**
 * Research.tsx — TAI Research Programs
 * Design: GI-clone border grid system
 * White background, 1px solid #111 borders, Chakra Petch, slate blue accent
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";
const BODY_FONT = "'IBM Plex Mono', monospace";

const PROGRAMS = [
  {
    label: "FLAGSHIP FIELD",
    title: "AI Economics",
    equation: "value = capability × scarce complements",
    sim: "cellular" as const,
    simLabel: "CELLULAR AUTOMATON · EMERGENT ORDER",
    description: "TAI studies AI as an economic system: the cost curves, bottlenecks, market structures, rents, and adjustment paths through which capability becomes output. We trace the scarce complements — energy, compute, data, talent, infrastructure, and legitimacy — that determine who captures value and when.",
    outputs: ["AI Economics Working Papers", "AI Cost Curve & Scarcity Briefs", "Market Structure Analyses", "Quarterly AI Economy Notes"],
    domains: ["Industrial Organisation", "Political Economy", "Productivity"],
  },
  {
    label: "APPLIED PROGRAM I",
    title: "Compute Futures",
    equation: "V(R) ≥ V(D)",
    sim: "lorenz" as const,
    simLabel: "LORENZ ATTRACTOR · SCENARIO SPACE",
    description: "Forward-looking AI economics. We model how shifts in compute, energy, capital expenditure, and model efficiency reshape the industrial organisation of AI, labor demand, and the distribution of productive capacity across geographies and institutions.",
    outputs: ["Compute 2030 Annual Report", "Scenario Modeling Working Papers", "Compute Transition Indicators", "Quarterly Structural Briefings"],
    domains: ["Forecasting", "Infrastructure", "Labor Markets"],
  },
  {
    label: "APPLIED PROGRAM II",
    title: "Compute Governance",
    equation: "R ⊇ model(S)",
    sim: "network" as const,
    simLabel: "REGULATORY NETWORK · FEEDBACK DYNAMICS",
    description: "The institutional economics of AI. We examine how compute access policy, export controls, liability, and international coordination shape incentives, investment, market concentration, and the public capacity to govern AI systems.",
    outputs: ["Compute Governance Annual", "Policy Briefs", "Treaty Framework Analysis", "Regulatory Design Templates"],
    domains: ["Policy", "Institutional Economics", "International Law"],
  },
  {
    label: "APPLIED PROGRAM III",
    title: "The Good Regulator Project",
    equation: "∀S ∃R: R ≡ model(S)",
    sim: "reaction-diffusion" as const,
    simLabel: "REACTION-DIFFUSION · TURING PATTERNS",
    description: "The systems theory beneath AI economics. Ashby's Law and the Good Regulator Theorem explain what institutions must model before they can govern a technological economy changing faster than their instruments, data, and incentives.",
    outputs: ["GRT Lecture Series", "Cross-Domain Working Papers", "Alignment Research Notes", "Mathematical Foundations"],
    domains: ["Systems Theory", "Control Theory", "Institutional Design"],
  },
  {
    label: "APPLIED PROGRAM IV",
    title: "Compute & Society",
    equation: "V(equity) ≥ V(harm)",
    sim: "boids" as const,
    simLabel: "BOIDS FLOCKING · DISTRIBUTED CONTROL",
    description: "The distributional economics of AI. We study how cheaper intelligence changes labor, bargaining power, access to opportunity, and public capacity — and which institutions can broaden the gains while absorbing the adjustment.",
    outputs: ["Compute Equity Index", "Distributional Analysis Reports", "Civil Society Briefings", "Policy Recommendations"],
    domains: ["Labor", "Political Economy", "Civil Society"],
  },
];

const CROSS_DOMAINS = [
  { label: "AI Alignment", eq: "V(AI) ≫ V(H)", desc: "Superintelligent systems exceed human regulatory variety; the alignment problem is a variety-matching failure." },
  { label: "Cybersecurity", eq: "V(attacker) > V(defender)", desc: "Persistent insecurity arises when attackers hold more variety than defenders. Defense requires modeling the full attack surface." },
  { label: "Autonomous Systems", eq: "V(env) ≤ V(controller)", desc: "Autonomous vehicles, drones, and robotic systems fail when environmental variety exceeds controller model fidelity." },
  { label: "Critical Infrastructure", eq: "V(grid) ≤ V(operator)", desc: "Power grid failures and supply chain collapse follow from insufficient operator variety relative to system complexity." },
  { label: "Financial Systems", eq: "V(market) > V(regulator)", desc: "Systemic financial risk accumulates when market complexity exceeds regulatory model capacity (2008 as a GRT failure)." },
  { label: "Healthcare Systems", eq: "V(pathogen) > V(response)", desc: "Pandemic response failures are variety failures: public health systems that cannot model novel pathogens cannot control them." },
  { label: "Democratic Governance", eq: "V(polity) > V(institution)", desc: "Democratic institutions that cannot model the full variety of their polity lose legitimacy and effectiveness." },
  { label: "Climate & Earth Systems", eq: "V(climate) > V(policy)", desc: "Climate governance fails when policy instruments lack the variety to absorb the complexity of Earth system feedbacks." },
];

export default function Research() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>
              RESEARCH PROGRAMS
            </p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              AI Economics.<br />Four applied programs.
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: 0 }}>
              AI Economics is the Institute's core field. The four programs below apply it to compute, governance, systems theory, and society. Ashby's Law supplies the shared discipline: institutions, like markets, cannot be understood apart from the systems and constraints that shape them.
            </p>
          </div>
          <div style={{ position: "relative", minHeight: 280 }}>
            <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>CELLULAR AUTOMATON · EMERGENT ORDER</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      {PROGRAMS.map((prog, i) => (
        <section key={prog.label} style={{ borderBottom: B }}>
          <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr" }}>
            {/* Canvas side */}
            {i % 2 === 0 ? (
              <>
                <div style={{ padding: "56px 48px", borderRight: B, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                      <span style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE }}>{prog.label}</span>
                      <span style={{ fontFamily: FONT, fontSize: 14, color: "rgba(44,62,107,0.5)", fontWeight: 300 }}>{prog.equation}</span>
                    </div>
                    <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                      {prog.title}
                    </h2>
                    <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 24px", fontWeight: 300 }}>
                      {prog.description}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                      {prog.domains.map(d => (
                        <span key={d} style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", color: SLATE, border: `1px solid ${SLATE}`, padding: "4px 10px", opacity: 0.7 }}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: "#888", marginBottom: 12, marginTop: 0 }}>PROGRAM OUTPUTS</p>
                    {prog.outputs.map((output, j) => (
                      <div key={output} style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "10px 0",
                        borderTop: j === 0 ? B : "none",
                        borderBottom: B,
                      }}>
                        <span style={{ fontFamily: FONT, fontSize: 9, color: "rgba(44,62,107,0.4)", minWidth: 24 }}>0{j + 1}</span>
                        <span style={{ fontFamily: FONT, fontSize: 12, color: "#111" }}>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="res-canvas" style={{ position: "relative", minHeight: 500 }}>
                  <AsciiCanvas sim={prog.sim} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                    <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>{prog.simLabel}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="res-canvas" style={{ position: "relative", minHeight: 500, borderRight: B }}>
                  <AsciiCanvas sim={prog.sim} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                    <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>{prog.simLabel}</span>
                  </div>
                </div>
                <div className="res-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                      <span style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE }}>{prog.label}</span>
                      <span style={{ fontFamily: FONT, fontSize: 14, color: "rgba(44,62,107,0.5)", fontWeight: 300 }}>{prog.equation}</span>
                    </div>
                    <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                      {prog.title}
                    </h2>
                    <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 24px", fontWeight: 300 }}>
                      {prog.description}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                      {prog.domains.map(d => (
                        <span key={d} style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", color: SLATE, border: `1px solid ${SLATE}`, padding: "4px 10px", opacity: 0.7 }}>{d}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: "#888", marginBottom: 12, marginTop: 0 }}>PROGRAM OUTPUTS</p>
                    {prog.outputs.map((output, j) => (
                      <div key={output} style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "10px 0",
                        borderTop: j === 0 ? B : "none",
                        borderBottom: B,
                      }}>
                        <span style={{ fontFamily: FONT, fontSize: 9, color: "rgba(44,62,107,0.4)", minWidth: 24 }}>0{j + 1}</span>
                        <span style={{ fontFamily: FONT, fontSize: 12, color: "#111" }}>{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      {/* ── CROSS-DOMAIN APPLICATIONS ── */}
      <section style={{ borderBottom: B }}>
        <div className="res-header-row" style={{ borderBottom: B, padding: "40px 48px", display: "flex", alignItems: "baseline", gap: 32 }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>CROSS-DOMAIN APPLICATIONS</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.02em" }}>
            One framework. The AI economy in full.
          </h2>
        </div>
        <div className="res-domains" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {CROSS_DOMAINS.map((d, i) => (
            <div key={d.label} style={{
              padding: "32px 32px",
              borderRight: B,
              borderBottom: B,
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#F9F9F9"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}
            >
              <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#111", margin: "0 0 6px" }}>{d.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 12, color: SLATE, margin: "0 0 10px" }}>{d.eq}</p>
              <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPUTE 2030 FEATURE ── */}
      <section style={{ borderBottom: B }}>
        <div className="res-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="res-text" style={{ padding: "56px 48px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>FEATURED PUBLICATION · JUNE 2026</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.0 }}>
              Compute 2030
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
              TAI's inaugural annual scenario report. Four structural scenarios for the AI economy through 2030, tracing how compute, energy, capital, market structure, and governance can evolve together — or fail to.
            </p>
            <a href="/manus-storage/compute2030_report_v1_ec1b767c_ce150801.pdf" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
                color: "#fff", background: "#111", padding: "14px 24px",
                textDecoration: "none", border: B,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
            >READ THE FULL REPORT →</a>
          </div>
          <div className="res-text" style={{ padding: "56px 48px" }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: "#888", marginBottom: 20, marginTop: 0 }}>FOUR SCENARIOS</p>
            {[
              { n: "I", title: "Concentrated Dominance", desc: "One or two actors control the majority of global compute capacity." },
              { n: "II", title: "Multilateral Fragmentation", desc: "Compute infrastructure fractures along geopolitical fault lines." },
              { n: "III", title: "Governed Transition", desc: "International frameworks successfully coordinate compute governance." },
              { n: "IV", title: "Diffuse Proliferation", desc: "Compute capacity distributes broadly, outpacing governance capacity." },
            ].map((s, i) => (
              <div key={s.n} style={{ padding: "16px 0", borderBottom: i < 3 ? B : "none" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                  <span style={{ fontFamily: FONT, fontSize: 9, color: "rgba(44,62,107,0.4)", minWidth: 20 }}>{s.n}</span>
                  <div>
                    <p style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{s.title}</p>
                    <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", margin: 0, fontWeight: 300 }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderBottom: B }}>
        <div className="res-cta" style={{ display: "flex" }}>
          <Link href="/fellows" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#fff", background: "#111", padding: "20px 32px",
            textDecoration: "none", borderRight: B,
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >FELLOWS →</Link>
          <Link href="/publications" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none", borderRight: B,
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >PUBLICATIONS</Link>
          <Link href="/theory" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >THE THEORY</Link>
        </div>
      </section>
    </Layout>
  );
}
