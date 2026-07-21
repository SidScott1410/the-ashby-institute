/**
 * Theory.tsx — The Theory
 * Design: GI-clone border grid system
 * White background, 1px solid #111 borders, Chakra Petch, slate blue accent
 * ASCII canvases: white bg, black/slate chars
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";
const BODY_FONT = "'IBM Plex Mono', monospace";

const DOMAINS = [
  { label: "AI Alignment", eq: "V(AI) ≫ V(H)", desc: "A superintelligent AI operates with variety vastly exceeding human regulatory capacity. Human oversight hits a mathematical ceiling, not a political one." },
  { label: "Compute Governance", eq: "V(compute) > V(regulator)", desc: "AI-native compute systems generate variety faster than regulatory institutions can model. Governance deficits are structurally inevitable without deliberate design." },
  { label: "Financial Systems", eq: "V(market) > V(regulator)", desc: "The 2008 crisis was a GRT failure: regulators lacked the internal model complexity to anticipate the variety of structured credit instruments." },
  { label: "Cybersecurity", eq: "V(attacker) > V(defender)", desc: "Persistent insecurity is a variety problem. Defenders who cannot model the full attack surface cannot defend it." },
  { label: "Democratic Governance", eq: "V(polity) > V(institution)", desc: "Democratic institutions that cannot model the full variety of their polity lose legitimacy and effectiveness over time." },
  { label: "Critical Infrastructure", eq: "V(system) > V(operator)", desc: "Cascading infrastructure failures follow from operator models too simple to anticipate the variety of failure modes in complex coupled systems." },
];

export default function Theory() {
  return (
    <Layout>
      <style>{`
        @media (max-width: 640px) {
          .theory-2col { grid-template-columns: 1fr !important; }
          .theory-canvas { display: none !important; }
          .theory-text { padding: 32px 20px !important; border-right: none !important; }
          .theory-header-pad { padding: 40px 20px 32px !important; border-right: none !important; }
          .theory-domains { grid-template-columns: 1fr !important; }
          .theory-domains > div { border-right: none !important; padding: 24px 20px !important; }
          .theory-header-row { padding: 24px 20px !important; flex-direction: column !important; gap: 8px !important; }
          .theory-cta { flex-direction: column !important; }
          .theory-cta a { border-right: none !important; border-bottom: 1px solid #111 !important; }
        }
        @media (max-width: 768px) and (min-width: 641px) {
          .theory-domains { grid-template-columns: 1fr 1fr !important; }
          .theory-domains > div:nth-child(2n) { border-right: none !important; }
        }
      `}</style>
      {/* ── PAGE HEADER ── */}
      <section style={{ borderBottom: B }}>
        <div className="theory-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="theory-header-pad" style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>
              THEORETICAL FOUNDATION
            </p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              The Theory
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: 0 }}>
              W. Ross Ashby's Law of Requisite Variety (1956) and the Good Regulator Theorem (Conant & Ashby, 1970) are not metaphors. They are mathematical results with direct implications for every governance problem of the compute era.
            </p>
          </div>
          <div className="theory-canvas" style={{ position: "relative", minHeight: 280 }}>
            <AsciiCanvas sim="network" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>REGULATORY NETWORK · FEEDBACK DYNAMICS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASHBY'S LAW ── */}
      <section style={{ borderBottom: B }}>
        <div className="theory-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Left: ASCII canvas */}
          <div className="theory-canvas" style={{ position: "relative", minHeight: 560, borderRight: B }}>
            <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>CELLULAR AUTOMATON · EMERGENT VARIETY</span>
            </div>
          </div>

          {/* Right: content */}
          <div className="theory-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>ASHBY · 1956</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Law of Requisite Variety
            </h2>
            <div style={{ border: B, padding: "24px 28px", marginBottom: 28, background: "#F9F9F9" }}>
              <p style={{ fontFamily: FONT, fontSize: "2.25rem", fontWeight: 700, color: SLATE, margin: "0 0 8px", letterSpacing: "-0.01em" }}>V(R) ≥ V(D)</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0, letterSpacing: "0.1em" }}>
                VARIETY OF REGULATOR ≥ VARIETY OF DISTURBANCE
              </p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              Only variety can absorb variety. A regulator can reduce the variety of outcomes in a system only to the extent that it possesses at least as much variety as the disturbances it must absorb.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              This is not a design principle; it is a mathematical constraint. It applies to thermostats, immune systems, financial regulators, AI oversight architectures, and democratic institutions alike.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 12, color: "#888", fontStyle: "italic", margin: 0 }}>
              "Only variety can destroy variety." — W. Ross Ashby, 1956
            </p>
          </div>
        </div>
      </section>

      {/* ── GOOD REGULATOR THEOREM ── */}
      <section style={{ borderBottom: B }}>
        <div className="theory-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Left: content */}
          <div className="theory-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>CONANT & ASHBY · 1970</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              The Good Regulator Theorem
            </h2>
            <div style={{ border: B, padding: "24px 28px", marginBottom: 28, background: "#F9F9F9" }}>
              <p style={{ fontFamily: FONT, fontSize: "1.2rem", fontWeight: 700, color: SLATE, margin: "0 0 8px" }}>∀S ∃R: R ≡ model(S)</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0, letterSpacing: "0.1em" }}>
                EVERY GOOD REGULATOR MUST BE A MODEL OF ITS SYSTEM
              </p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              The GRT is a stronger result than Ashby's Law. It proves that any regulator achieving good regulation must, necessarily, contain an internal model of the regulated system. Model-building is not optional; it is the mechanism of regulation itself.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              A regulatory body that lacks an adequate internal model of the system it governs cannot regulate it effectively, not because of insufficient effort or political will, but because of a structural impossibility.
            </p>
          </div>

          {/* Right: ASCII canvas */}
          <div className="theory-canvas" style={{ position: "relative", minHeight: 560 }}>
            <AsciiCanvas sim="reaction-diffusion" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>REACTION-DIFFUSION · TURING PATTERNS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI ALIGNMENT ── */}
      <section style={{ borderBottom: B }}>
        <div className="theory-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Left: ASCII canvas */}
          <div className="theory-canvas" style={{ position: "relative", minHeight: 500, borderRight: B }}>
            <AsciiCanvas sim="lorenz" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>LORENZ ATTRACTOR · DETERMINISTIC CHAOS</span>
            </div>
          </div>

          {/* Right: content */}
          <div className="theory-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>THE ULTIMATE APPLICATION</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              AI Alignment as a Variety Problem
            </h2>
            <div style={{ border: B, padding: "24px 28px", marginBottom: 28, background: "#F9F9F9" }}>
              <p style={{ fontFamily: FONT, fontSize: "1.75rem", fontWeight: 700, color: SLATE, margin: "0 0 8px" }}>V(AI) ≫ V(H)</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0, letterSpacing: "0.1em" }}>
                AI VARIETY VASTLY EXCEEDS HUMAN REGULATORY VARIETY
              </p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              As AI systems grow in capability, their variety (the range of states they can occupy and outputs they can produce) will exceed the variety of any human oversight system. This is not a prediction about malevolence. It is a mathematical constraint on the possibility of control.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              The GRT adds a second constraint: any system that successfully aligns an AI must model that AI. As AI systems become more capable, the model required for alignment becomes more complex, potentially as complex as the AI itself.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOMAIN APPLICATIONS GRID ── */}
      <section style={{ borderBottom: B }}>
        <div className="theory-header-row" style={{ borderBottom: B, padding: "40px 48px", display: "flex", alignItems: "baseline", gap: 32 }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>APPLICATIONS</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.02em" }}>
            The Law Applied Across Domains
          </h2>
        </div>
        <div className="theory-domains" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {DOMAINS.map((d, i) => (
            <div key={d.label} style={{
              padding: "36px 40px",
              borderRight: i % 3 !== 2 ? B : "none",
              borderBottom: i < 3 ? B : "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#F9F9F9"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}
            >
              <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#111", margin: "0 0 6px" }}>{d.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 13, color: SLATE, fontWeight: 400, margin: "0 0 12px", letterSpacing: "0.02em" }}>{d.eq}</p>
              <p style={{ fontFamily: FONT, fontSize: 12, color: "#555", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderBottom: B }}>
        <div className="theory-cta" style={{ display: "flex" }}>
          <Link href="/research" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#fff", background: "#111", padding: "20px 32px",
            textDecoration: "none", borderRight: B,
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >RESEARCH PROGRAMS →</Link>
          <Link href="/publications" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none", borderRight: B,
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >PUBLICATIONS</Link>
          <Link href="/fellows" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >FELLOWS</Link>
        </div>
      </section>
    </Layout>
  );
}
