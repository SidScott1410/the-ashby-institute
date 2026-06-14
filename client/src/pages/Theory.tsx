/*
 * Theory.tsx — The Theory v4
 * Design: GI-clone — Chakra Petch, white background, black typography, slate blue accent
 * 50/50 splits with ASCII canvas panels
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const font = "'Chakra Petch', 'IBM Plex Mono', monospace";
const slate = "#2C3E6B";
const black = "#111111";
const mid = "#555555";
const light = "#999999";
const border = "#E0E0E0";

const DOMAINS = [
  { label: "AI Alignment", eq: "V(AI) ≫ V(H)", desc: "A superintelligent AI operates with variety vastly exceeding human regulatory capacity. Human oversight hits a mathematical ceiling — not a political one." },
  { label: "Compute Governance", eq: "V(compute) > V(regulator)", desc: "AI-native compute systems generate variety faster than regulatory institutions can model. Governance deficits are structurally inevitable without deliberate design." },
  { label: "Financial Systems", eq: "V(market) > V(regulator)", desc: "The 2008 crisis was a GRT failure: regulators lacked the internal model complexity to anticipate the variety of structured credit instruments." },
  { label: "Cybersecurity", eq: "V(attacker) > V(defender)", desc: "Persistent insecurity is a variety problem. Defenders who cannot model the full attack surface cannot defend it." },
  { label: "Democratic Governance", eq: "V(polity) > V(institution)", desc: "Democratic institutions that cannot model the full variety of their polity lose legitimacy and effectiveness over time." },
  { label: "Critical Infrastructure", eq: "V(system) > V(operator)", desc: "Cascading infrastructure failures follow from operator models too simple to anticipate the variety of failure modes in complex coupled systems." },
];

export default function Theory() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>Theoretical Foundation</p>
          <h1 style={{ fontFamily: font, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            The Theory
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.95rem", color: mid, lineHeight: 1.8, maxWidth: "600px", fontWeight: 300, margin: 0 }}>
            W. Ross Ashby's Law of Requisite Variety (1956) and the Good Regulator Theorem (Conant & Ashby, 1970) are not metaphors. They are mathematical results with direct implications for every governance problem of the compute era.
          </p>
        </div>
      </section>

      {/* ── ASHBY'S LAW: 50/50 SPLIT ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}>
          {/* Left: ASCII canvas */}
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "600px" }}>
            <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Cellular Automaton · Emergent Variety</span>
            </div>
          </div>

          {/* Right: content */}
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Ashby · 1956</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Law of Requisite Variety
            </h2>
            <div style={{ border: `1px solid ${border}`, padding: "1.5rem 2rem", marginBottom: "1.75rem", background: "#F8F8F8" }}>
              <p style={{ fontFamily: font, fontSize: "2rem", fontWeight: 700, color: slate, margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>V(R) ≥ V(D)</p>
              <p style={{ fontFamily: font, fontSize: "0.6rem", color: light, margin: 0, fontWeight: 300, letterSpacing: "0.08em" }}>
                Variety of Regulator ≥ Variety of Disturbance
              </p>
            </div>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 1rem", fontWeight: 300 }}>
              Only variety can absorb variety. A regulator can reduce the variety of outcomes in a system only to the extent that it possesses at least as much variety as the disturbances it must absorb.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 1rem", fontWeight: 300 }}>
              This is not a design principle — it is a mathematical constraint. It applies to thermostats, immune systems, financial regulators, AI oversight architectures, and democratic institutions alike.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.75rem", color: light, fontStyle: "italic", margin: 0, fontWeight: 300 }}>
              "Only variety can destroy variety." — W. Ross Ashby, 1956
            </p>
          </div>
        </div>
      </section>

      {/* ── GOOD REGULATOR THEOREM: 50/50 SPLIT (reversed) ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}>
          {/* Left: content */}
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Conant & Ashby · 1970</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              The Good Regulator Theorem
            </h2>
            <div style={{ border: `1px solid ${border}`, padding: "1.5rem 2rem", marginBottom: "1.75rem", background: "#F8F8F8" }}>
              <p style={{ fontFamily: font, fontSize: "1.1rem", fontWeight: 700, color: slate, margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>∀S ∃R: R ≡ model(S)</p>
              <p style={{ fontFamily: font, fontSize: "0.6rem", color: light, margin: 0, fontWeight: 300, letterSpacing: "0.08em" }}>
                Every good regulator of a system must be a model of that system
              </p>
            </div>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 1rem", fontWeight: 300 }}>
              The GRT is a stronger result than Ashby's Law. It proves that any regulator achieving good regulation must, necessarily, contain an internal model of the regulated system. Model-building is not optional — it is the mechanism of regulation itself.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              A regulatory body that lacks an adequate internal model of the system it governs cannot regulate it effectively — not because of insufficient effort or political will, but because of a structural impossibility. The theorem's name gives TAI its name.
            </p>
          </div>

          {/* Right: ASCII canvas */}
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "600px" }}>
            <AsciiCanvas sim="reaction-diffusion" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Reaction-Diffusion · Turing Patterns</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI ALIGNMENT: 50/50 SPLIT ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "520px" }}>
          {/* Left: ASCII canvas */}
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "520px" }}>
            <AsciiCanvas sim="lorenz" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Lorenz Attractor · Deterministic Chaos</span>
            </div>
          </div>

          {/* Right: content */}
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>The Ultimate Application</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              AI Alignment as a Variety Problem
            </h2>
            <div style={{ border: `1px solid ${border}`, padding: "1.5rem 2rem", marginBottom: "1.75rem", background: "#F8F8F8" }}>
              <p style={{ fontFamily: font, fontSize: "1.5rem", fontWeight: 700, color: slate, margin: "0 0 0.5rem" }}>V(AI) ≫ V(H)</p>
              <p style={{ fontFamily: font, fontSize: "0.6rem", color: light, margin: 0, fontWeight: 300, letterSpacing: "0.08em" }}>
                AI variety vastly exceeds human regulatory variety
              </p>
            </div>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 1rem", fontWeight: 300 }}>
              As AI systems grow in capability, their variety — the range of states they can occupy and outputs they can produce — will exceed the variety of any human oversight system. This is not a prediction about malevolence. It is a mathematical constraint on the possibility of control.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              The GRT adds a second constraint: any system that successfully aligns an AI must model that AI. As AI systems become more capable, the model required for alignment becomes more complex — potentially as complex as the AI itself. This is the formal core of the alignment challenge.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOMAIN APPLICATIONS GRID ── */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Applications</p>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: black, margin: "0 0 3rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            The Law Applied
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: border }}>
            {DOMAINS.map((d) => (
              <div key={d.label} style={{ background: "#FFFFFF", padding: "2rem", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#F8F8F8"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FFFFFF"}
              >
                <p style={{ fontFamily: font, fontSize: "0.78rem", fontWeight: 600, color: black, margin: "0 0 0.375rem" }}>{d.label}</p>
                <p style={{ fontFamily: font, fontSize: "0.65rem", color: slate, fontWeight: 300, margin: "0 0 0.625rem" }}>{d.eq}</p>
                <p style={{ fontFamily: font, fontSize: "0.72rem", color: mid, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/research" style={{
            fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#fff", background: black, padding: "0.75rem 1.5rem", textDecoration: "none",
            border: `1px solid ${black}`, transition: "background 150ms, border-color 150ms",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slate; el.style.borderColor = slate; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = black; el.style.borderColor = black; }}
          >Research Programs →</Link>
          <Link href="/publications" style={{
            fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
            color: black, background: "transparent", padding: "0.75rem 1.5rem", textDecoration: "none",
            border: `1px solid ${border}`, transition: "border-color 150ms",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = black}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = border}
          >Publications</Link>
        </div>
      </section>
    </Layout>
  );
}
