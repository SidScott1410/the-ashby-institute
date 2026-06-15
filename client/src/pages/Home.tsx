/*
 * Home.tsx — TAI Homepage v4
 * Design: General Intuition clone — 50/50 vertical splits, ASCII canvas fills one half
 * Background: #FFFFFF white throughout all scrolling sections
 * ASCII canvas panels: #0A0A0A near-black, fill full section height
 * Accent: #2C3E6B slate blue — labels, active states, formula notation
 * Logo mark: crimson #A02D24 only
 * Typography: Chakra Petch (geometric monospace) for ALL text — matching GI exactly
 * No serif, no rounded corners, no shadows, no gradients
 * Sections: abrupt transitions, generous padding, thin 1px #E0E0E0 dividers
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import AsciiCanvas, { SimType } from "../components/AsciiCanvas";

function LogoMark({ size = 24, color = "#A02D24" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="11.5" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="11" y="11" width="10" height="10" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M16 4.5 L19.5 4.5" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M18 3 L20 4.5 L18 6" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square" />
      <path d="M16 27.5 L12.5 27.5" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M14 26 L12 27.5 L14 29" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/research", label: "Research" },
  { href: "/theory", label: "The Theory" },
  { href: "/fellows", label: "Fellows" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

const DOMAINS = [
  { id: "01", label: "AI Alignment", eq: "V(R) ≥ V(D)", desc: "Superintelligent systems exceed human regulatory variety" },
  { id: "02", label: "Compute Governance", eq: "V(G) ≥ V(C)", desc: "Governance structures must model compute system complexity" },
  { id: "03", label: "Financial Systems", eq: "V(Reg) ≥ V(Mkt)", desc: "Regulators must match market state-space dimensionality" },
  { id: "04", label: "Cybersecurity", eq: "V(Def) ≥ V(Att)", desc: "Defenders require variety equal to attacker state-space" },
  { id: "05", label: "Autonomous Systems", eq: "V(Ctrl) ≥ V(Env)", desc: "Controllers must model full environmental variety" },
  { id: "06", label: "Critical Infrastructure", eq: "V(Ops) ≥ V(Fail)", desc: "Operational models must span all failure mode variety" },
  { id: "07", label: "Democratic Governance", eq: "V(Inst) ≥ V(Soc)", desc: "Institutions must model societal complexity to govern it" },
  { id: "08", label: "Healthcare & Biology", eq: "V(Med) ≥ V(Path)", desc: "Medical systems must match pathogen variety to treat" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const font = "'Chakra Petch', 'IBM Plex Mono', monospace";

  return (
    <div style={{ fontFamily: font, background: "#FFFFFF", minHeight: "100vh" }}>

      {/* ── FIXED NAV ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #E0E0E0" : "none",
        transition: "background 200ms, border 200ms",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <LogoMark size={20} color="#A02D24" />
            <span style={{ fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", fontWeight: 500, transition: "color 200ms" }}>
              The Ashby Institute
            </span>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: font, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase",
                color: scrolled ? "#333" : "rgba(255,255,255,0.75)", textDecoration: "none",
                transition: "color 150ms",
              }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? "#000" : "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? "#333" : "rgba(255,255,255,0.75)"}
              >{l.label}</Link>
            ))}
            <Link href="/contact" style={{
              fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#fff", background: "#111",
              padding: "0.4rem 1rem", textDecoration: "none", transition: "background 200ms, color 200ms",
              border: "1px solid transparent",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2C3E6B"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
            >Contact</Link>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          SECTION 1: HERO — full viewport ASCII canvas
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", background: "#FFFFFF", overflow: "hidden", borderBottom: "1px solid #E0E0E0" }}>
        <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

        {/* Sim selector — top right, like GI */}
        <div style={{ position: "absolute", top: "56px", right: "2rem", display: "flex", flexDirection: "column", gap: "0.375rem", zIndex: 10, paddingTop: "1.5rem" }}>
          {(["cellular", "reaction-diffusion", "lorenz", "network", "boids"] as SimType[]).map((s) => (
            <span key={s} style={{
              fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: s === "cellular" ? "#fff" : "rgba(255,255,255,0.3)",
              // s is SimType — no comparison needed here
              cursor: "default", textAlign: "right",
            }}>{s === "cellular" ? "Cellular Automaton" : s === "reaction-diffusion" ? "Reaction-Diffusion" : s === "lorenz" ? "Lorenz Attractor" : s === "network" ? "Regulatory Network" : "Flocking System"}</span>
          ))}
        </div>

        {/* Floating white card — bottom left, like GI */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: "min(560px, 50%)",
          background: "#FFFFFF",
          padding: "3rem 3rem 3rem 3rem",
          zIndex: 10,
        }}>
          <h1 style={{
            fontFamily: font, fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
            fontWeight: 700, lineHeight: 1.2, color: "#111",
            margin: "0 0 1.5rem 0", letterSpacing: "-0.01em",
          }}>
            Every good regulator must be a model of its system.
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.875rem", color: "#444", lineHeight: 1.7, margin: "0 0 2rem 0", fontWeight: 300 }}>
            TAI is an independent nonprofit research organization applying Ashby's Law of Requisite Variety to the defining governance problems of the compute era.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/theory" style={{
              fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
              background: "#111", color: "#fff", padding: "0.75rem 1.75rem",
              textDecoration: "none", fontWeight: 500,
              transition: "background 150ms",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#2C3E6B"}
              onMouseLeave={e => e.currentTarget.style.background = "#111"}
            >The Theory</Link>
            <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
              background: "transparent", color: "#111", padding: "0.75rem 1.75rem",
              textDecoration: "none", fontWeight: 500, border: "1px solid #111",
              transition: "background 150ms, color 150ms",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
            >Compute 2030 Report ↗</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2: THE LAW — 50/50 split
          LEFT: ASCII canvas (reaction-diffusion)
          RIGHT: White panel — Ashby's Law exposition
      ══════════════════════════════════════════════ */}
      <section style={{ display: "flex", minHeight: "600px" }}>
        {/* Left: ASCII canvas */}
        <div style={{ flex: "0 0 50%", background: "#FFFFFF", position: "relative", minHeight: "600px" }}>
          <AsciiCanvas sim="reaction-diffusion" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          {/* Label overlay */}
          <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
            <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Reaction-Diffusion · Turing Patterns
            </span>
          </div>
        </div>
        {/* Right: white panel */}
        <div style={{ flex: "0 0 50%", background: "#FFFFFF", padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C3E6B", marginBottom: "1.5rem", display: "block" }}>
            Theoretical Foundation
          </span>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15, color: "#111", margin: "0 0 2rem 0", letterSpacing: "-0.02em" }}>
            Ashby's Law of<br />Requisite Variety
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: "0 0 1.5rem 0", fontWeight: 300 }}>
            W. Ross Ashby proved in 1956 that a regulator can only effectively control a system if its internal variety — the number of distinguishable states it can occupy — is greater than or equal to the variety of the disturbances it must absorb.
          </p>
          <p style={{ fontFamily: font, fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: "0 0 2.5rem 0", fontWeight: 300 }}>
            This is not a metaphor. It is a mathematical constraint that applies to any system attempting to govern any other system. Every failure of governance — from AI misalignment to financial crises to democratic breakdown — is, at its root, a variety deficit.
          </p>
          {/* Formula */}
          <div style={{ borderTop: "1px solid #E0E0E0", paddingTop: "2rem" }}>
            <div style={{ fontFamily: font, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#2C3E6B", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>
              V(R) ≥ V(D)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { sym: "V(R)", def: "Variety of the Regulator — distinguishable states the governing system can occupy" },
                { sym: "V(D)", def: "Variety of the Disturbance — distinguishable states the governed system can produce" },
              ].map(({ sym, def }) => (
                <div key={sym} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.08em", color: "#2C3E6B", fontWeight: 600, minWidth: "3.5rem", paddingTop: "0.1rem" }}>{sym}</span>
                  <span style={{ fontFamily: font, fontSize: "0.8rem", color: "#666", lineHeight: 1.6, fontWeight: 300 }}>{def}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/theory" style={{
                fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#111", textDecoration: "none", borderBottom: "1px solid #0A0A0A", paddingBottom: "2px",
                transition: "color 150ms, border-color 150ms",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#2C3E6B"; e.currentTarget.style.borderColor = "#2C3E6B"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#111"; }}
              >Read the Full Theoretical Exposition →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3: EIGHT DOMAINS — white, full width
          Like GI's "Pushing the frontier" section
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
        {/* Section header row */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "3rem 4rem 0", maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C3E6B", display: "block", marginBottom: "0.75rem" }}>
              Application Domains
            </span>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.02em" }}>
              One Law. Eight Domains.
            </h2>
          </div>
          <Link href="/research" style={{
            fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#666", textDecoration: "none", borderBottom: "1px solid #CCC", paddingBottom: "2px",
            transition: "color 150ms",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#000"}
            onMouseLeave={e => e.currentTarget.style.color = "#666"}
          >Full Research →</Link>
        </div>

        {/* Domain grid — 4 columns, 2 rows, thin borders */}
        <div style={{ maxWidth: "1280px", margin: "2.5rem auto 0", borderTop: "1px solid #E0E0E0", borderLeft: "1px solid #E0E0E0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {DOMAINS.map((d) => (
            <div key={d.id} style={{
              borderRight: "1px solid #E0E0E0", borderBottom: "1px solid #E0E0E0",
              padding: "2rem 2rem 2rem",
              transition: "background 150ms",
              cursor: "default",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F8F9FC")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <span style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.14em", color: "#BBB", fontWeight: 400 }}>{d.id}</span>
                <span style={{ fontFamily: font, fontSize: "0.7rem", color: "#2C3E6B", fontWeight: 600, letterSpacing: "0.02em" }}>{d.eq}</span>
              </div>
              <h3 style={{ fontFamily: font, fontSize: "0.9rem", fontWeight: 700, color: "#111", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>{d.label}</h3>
              <p style={{ fontFamily: font, fontSize: "0.75rem", color: "#777", lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4: COMPUTE 2030 — 50/50 split
          LEFT: White panel — featured publication
          RIGHT: ASCII canvas (Lorenz attractor)
      ══════════════════════════════════════════════ */}
      <section style={{ display: "flex", minHeight: "600px", borderTop: "1px solid #E0E0E0" }}>
        {/* Left: white panel */}
        <div style={{ flex: "0 0 50%", background: "#FFFFFF", padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C3E6B", marginBottom: "0.5rem", display: "block" }}>
            Featured Publication
          </span>
          <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAA", marginBottom: "2rem", display: "block" }}>
            Ashby Report Series · June 2026
          </span>
          <h2 style={{ fontFamily: font, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#111", margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Compute 2030
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: "0 0 2rem", fontWeight: 300 }}>
            TAI's inaugural scenario report series. Four structural scenarios for how AI-native compute orchestration reshapes the global economy, governance, and strategic balance through 2030.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {["Concentrated Dominance", "Multilateral Fragmentation", "Governed Transition", "Diffuse Proliferation"].map((s, i) => (
              <div key={s} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontFamily: font, fontSize: "0.5rem", color: "#2C3E6B", letterSpacing: "0.1em" }}>0{i + 1}</span>
                <span style={{ fontFamily: font, fontSize: "0.8rem", color: "#555", fontWeight: 300 }}>{s}</span>
              </div>
            ))}
          </div>
          <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: font, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
            background: "#111", color: "#fff", padding: "0.75rem 1.75rem",
            textDecoration: "none", fontWeight: 500, alignSelf: "flex-start",
            transition: "background 150ms",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#2C3E6B"}
            onMouseLeave={e => e.currentTarget.style.background = "#111"}
          >Read the Report ↗</a>
        </div>
        {/* Right: ASCII canvas */}
        <div style={{ flex: "0 0 50%", background: "#FFFFFF", position: "relative", minHeight: "600px" }}>
          <AsciiCanvas sim="lorenz" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
            <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Lorenz Attractor · Deterministic Chaos
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5: RESEARCH PROGRAMS — white, full width
          Like GI's text-only section
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 4rem 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div>
              <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C3E6B", display: "block", marginBottom: "0.75rem" }}>
                Research Programs
              </span>
              <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.02em" }}>
                Four Programs. One Premise.
              </h2>
            </div>
            <Link href="/research" style={{
              fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#666", textDecoration: "none", borderBottom: "1px solid #CCC", paddingBottom: "2px",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#000"}
              onMouseLeave={e => e.currentTarget.style.color = "#666"}
            >All Programs →</Link>
          </div>
        </div>

        {/* Programs — rows with dividers, like GI's paper list */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #E0E0E0" }}>
          {[
            { code: "CF", name: "Compute Futures", desc: "Structural scenario analysis of the global compute landscape through 2030 and beyond. Examines how concentration, governance, and allocation of AI-native compute infrastructure will reshape economic power and institutional capacity.", href: "/research" },
            { code: "CG", name: "Compute Governance", desc: "Institutional design for governing AI-native compute orchestration at national and multilateral levels. Applies Ashby's Law to ask whether existing governance structures have sufficient variety to regulate what they oversee.", href: "/research" },
            { code: "GRP", name: "The Good Regulator Project", desc: "Theoretical development of Ashby's Law across AI oversight, financial regulation, and democratic institutions. Produces formal models of variety deficits and institutional design requirements.", href: "/research" },
            { code: "CS", name: "Compute & Society", desc: "Distributional analysis of the compute transition — who benefits, who is displaced, and what structural interventions can reduce variety deficits in underserved communities and nations.", href: "/research" },
          ].map((p, i) => (
            <Link key={p.code} href={p.href} style={{
              display: "flex", alignItems: "flex-start", gap: "3rem",
              padding: "2.5rem 4rem",
              borderBottom: "1px solid #E0E0E0",
              textDecoration: "none",
              transition: "background 150ms",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F8F9FC")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", color: "#BBB", minWidth: "2.5rem", paddingTop: "0.2rem" }}>{String(i + 1).padStart(2, "0")}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2C3E6B" }}>{p.code}</span>
                  <h3 style={{ fontFamily: font, fontSize: "1rem", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.01em" }}>{p.name}</h3>
                </div>
                <p style={{ fontFamily: font, fontSize: "0.8rem", color: "#666", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{p.desc}</p>
              </div>
              <span style={{ fontFamily: font, fontSize: "0.7rem", color: "#CCC", paddingTop: "0.2rem", transition: "color 150ms" }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6: INDEPENDENCE — 50/50 split
          LEFT: ASCII canvas (boids flocking)
          RIGHT: White panel — independence statement
      ══════════════════════════════════════════════ */}
      <section style={{ display: "flex", minHeight: "560px", borderTop: "1px solid #E0E0E0" }}>
        {/* Left: ASCII canvas */}
        <div style={{ flex: "0 0 50%", background: "#FFFFFF", position: "relative", minHeight: "560px" }}>
          <AsciiCanvas sim="boids" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
            <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Boids Flocking · Emergent Order
            </span>
          </div>
        </div>
        {/* Right: white panel */}
        <div style={{ flex: "0 0 50%", background: "#FFFFFF", padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C3E6B", marginBottom: "1.5rem", display: "block" }}>
            Who We Are
          </span>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111", margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Independent.<br />Rigorous.<br />Open Access.
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: "0 0 1.5rem", fontWeight: 300 }}>
            The Ashby Institute accepts no funding from commercial AI developers, compute infrastructure providers, or any entity with a direct financial interest in the systems we analyze. No conflicts of interest. No institutional capture.
          </p>
          <p style={{ fontFamily: font, fontSize: "0.9rem", color: "#444", lineHeight: 1.8, margin: "0 0 2.5rem", fontWeight: 300 }}>
            Our name is drawn from W. Ross Ashby's Good Regulator Theorem (1970): "Every good regulator of a system must be a model of that system." TAI exists to be that model — a rigorous, independent institution that understands and analyzes the systems reshaping our world.
          </p>
          {/* Four pillars */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderTop: "1px solid #E0E0E0", borderLeft: "1px solid #E0E0E0" }}>
            {[
              { label: "Independent", val: "No commercial funding. No institutional affiliations. No conflicts of interest." },
              { label: "Open Access", val: "All research published open access. No paywalls. No embargoes." },
              { label: "Rigorous", val: "Peer-reviewed methodology. Formal theoretical foundations. Transparent assumptions." },
              { label: "Broad", val: "Eight domains. One analytical framework. Consistent application of Ashby's Law." },
            ].map(({ label, val }) => (
              <div key={label} style={{ padding: "1.25rem 1.5rem", borderRight: "1px solid #E0E0E0", borderBottom: "1px solid #E0E0E0" }}>
                <div style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2C3E6B", marginBottom: "0.4rem", fontWeight: 600 }}>{label}</div>
                <div style={{ fontFamily: font, fontSize: "0.75rem", color: "#666", lineHeight: 1.6, fontWeight: 300 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/about" style={{
              fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#111", textDecoration: "none", borderBottom: "1px solid #0A0A0A", paddingBottom: "2px",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#2C3E6B"; e.currentTarget.style.borderColor = "#2C3E6B"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#111"; }}
            >About the Institute →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7: NEWSLETTER — white, full width
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E0E0E0", padding: "5rem 4rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2C3E6B", display: "block", marginBottom: "1rem" }}>
            Newsletter
          </span>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
            Research updates and new publications.
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.875rem", color: "#666", lineHeight: 1.7, margin: "0 0 2rem", fontWeight: 300 }}>
            Occasional dispatches on new research, events, and publications. No promotional content. Unsubscribe at any time.
          </p>
          {subscribed ? (
            <p style={{ fontFamily: font, fontSize: "0.8rem", color: "#2C3E6B", letterSpacing: "0.04em" }}>You're subscribed. Thank you.</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1, padding: "0.75rem 1rem",
                  fontFamily: font, fontSize: "0.8rem",
                  border: "1px solid #E0E0E0", borderRight: "none",
                  outline: "none", background: "#FAFAFA",
                  color: "#111",
                }}
              />
              <button type="submit" style={{
                fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                background: "#111", color: "#fff", padding: "0.75rem 1.5rem",
                border: "1px solid #111", cursor: "pointer",
                transition: "background 150ms",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#2C3E6B"}
                onMouseLeave={e => e.currentTarget.style.background = "#111"}
              >Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER — black, like GI
      ══════════════════════════════════════════════ */}
      <footer style={{ background: "#111", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 4rem 3rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
              <LogoMark size={18} color="#A02D24" />
              <span style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>The Ashby Institute</span>
            </div>
            <p style={{ fontFamily: font, fontSize: "0.8rem", fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 0.5rem", fontWeight: 300 }}>
              "Every good regulator of a system must be a model of that system."
            </p>
            <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.25)", margin: 0 }}>— W. Ross Ashby & Roger Conant, 1970</p>
          </div>
          {[
            { heading: "Research", links: [{ label: "Compute Futures", href: "/research" }, { label: "Compute Governance", href: "/research" }, { label: "Good Regulator Project", href: "/research" }, { label: "Compute & Society", href: "/research" }] },
            { heading: "Institute", links: [{ label: "The Theory", href: "/theory" }, { label: "Fellows", href: "/fellows" }, { label: "Publications", href: "/publications" }, { label: "Events", href: "/events" }, { label: "About", href: "/about" }] },
            { heading: "Connect", links: [{ label: "Newsletter", href: "/contact" }, { label: "Contact", href: "/contact" }, { label: "Research Inquiries", href: "/contact" }, { label: "Independence Policy", href: "/about" }] },
          ].map(col => (
            <div key={col.heading}>
              <p style={{ fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>{col.heading}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map(l => (
                  <Link key={l.label} href={l.href} style={{
                    fontFamily: font, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textDecoration: "none",
                    fontWeight: 300, transition: "color 150ms",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 4rem 2.5rem", borderTop: "1px solid #1A1A1A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: font, fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", fontWeight: 300 }}>
            © 2026 The Ashby Institute. Independent nonprofit research organization.
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[{ label: "Independence Policy", href: "/about" }, { label: "Contact", href: "/contact" }].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)",
                textDecoration: "none", transition: "color 150ms",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
