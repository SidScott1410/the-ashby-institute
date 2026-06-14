/*
 * Home.tsx — The Ashby Institute v4
 * Layout: General Intuition clone structure
 *   - Full-screen dark hero with animated ASCII canvas (procedural simulations)
 *   - White card floating over lower hero
 *   - Scrolling white/warm-grey content sections below
 * Design: Black background hero, white body, IBM Plex Mono labels, DM Serif Display headlines
 * Accent: #A02D24 crimson — logo, labels, hover states only
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import AsciiCanvas from "@/components/AsciiCanvas";

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(18px)", transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── TAI Logo SVG (feedback-loop mark) ───────────────────────────────────────
function LogoMark({ color = "#A02D24", size = 28 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="2" fill="none" />
      <path d="M16 5 A11 11 0 1 1 5.5 21.5" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <polygon points="5.5,21.5 2,17 9,18.5" fill={color} />
    </svg>
  );
}

// ─── Simulation labels ────────────────────────────────────────────────────────
const SIMS = [
  { id: "cellular" as const, label: "Cellular Automaton", sub: "Emergent order from local rules" },
  { id: "reaction-diffusion" as const, label: "Reaction-Diffusion", sub: "Turing pattern formation" },
  { id: "lorenz" as const, label: "Lorenz Attractor", sub: "Deterministic chaos" },
  { id: "network" as const, label: "Regulatory Network", sub: "Feedback topology" },
  { id: "boids" as const, label: "Flocking System", sub: "Distributed control" },
];

// ─── Research programs ────────────────────────────────────────────────────────
const PROGRAMS = [
  { code: "P1", title: "Compute Futures", desc: "Structural scenario analysis of the global compute landscape through 2030 and beyond." },
  { code: "P2", title: "Compute Governance", desc: "Institutional design for governing AI-native compute at national and multilateral levels." },
  { code: "P3", title: "The Good Regulator Project", desc: "Formal development of the GRT across AI oversight, financial regulation, and democratic institutions." },
  { code: "P4", title: "Compute & Society", desc: "Distributional analysis of the compute transition — who benefits, who is displaced, and why." },
];

// ─── Application domains ──────────────────────────────────────────────────────
const DOMAINS = [
  { n: "D1", label: "AI Alignment", eq: "V(R) ≥ V(D)", note: "Variety matching as alignment" },
  { n: "D2", label: "Compute Governance", eq: "∀s ∈ S: R(s) ∈ G", note: "Institutional design" },
  { n: "D3", label: "Financial Systems", eq: "∂R/∂t ≥ ∂D/∂t", note: "Regulatory variety rate" },
  { n: "D4", label: "Cybersecurity", eq: "V(R) → ∞", note: "Adversarial variety arms race" },
  { n: "D5", label: "Autonomous Systems", eq: "GRT: R* = f(S)", note: "Optimal model-based control" },
  { n: "D6", label: "Critical Infrastructure", eq: "Σ V(Ri) ≥ V(D)", note: "Distributed regulatory variety" },
  { n: "D7", label: "Democratic Governance", eq: "V(legislature) ≥ V(society)", note: "Requisite political variety" },
  { n: "D8", label: "Healthcare & Biology", eq: "Homeostasis ≡ V(R) = V(D)", note: "Biological regulation" },
];

export default function Home() {
  const [activeSim, setActiveSim] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotate sims every 12s
  useEffect(() => {
    const t = setInterval(() => setActiveSim(s => (s + 1) % SIMS.length), 12000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF" }}>

      {/* ── FIXED NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition: "background 300ms, border-color 300ms",
        padding: "0 2rem", height: "56px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <LogoMark color="#A02D24" size={22} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFFFFF", fontWeight: 400 }}>
            The Ashby Institute
          </span>
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { label: "Research", href: "/research" },
            { label: "The Theory", href: "/theory" },
            { label: "Fellows", href: "/fellows" },
            { label: "Publications", href: "/publications" },
            { label: "Events", href: "/events" },
            { label: "About", href: "/about" },
          ].map(({ label, href }) => (
            <Link key={href} href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >{label}</Link>
          ))}
          <Link href="/contact" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.35)", padding: "0.4rem 0.875rem", textDecoration: "none", transition: "border-color 150ms, color 150ms" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#A02D24"; e.currentTarget.style.color = "#A02D24"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#FFFFFF"; }}
          >Contact</Link>
        </div>
      </nav>

      {/* ── HERO: Full-screen ASCII canvas ── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "700px", background: "#0A0A0A", overflow: "hidden" }}>

        {/* ASCII Canvas — fills entire hero */}
        <div style={{ position: "absolute", inset: 0 }}>
          <AsciiCanvas sim={SIMS[activeSim].id} cellSize={12} opacity={0.9} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Sim selector — top right, like GI's settings toggle */}
        <div style={{ position: "absolute", top: "72px", right: "2rem", zIndex: 10, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {SIMS.map((s, i) => (
            <button key={s.id} onClick={() => setActiveSim(i)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "right", padding: "0.25rem 0",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: i === activeSim ? "#A02D24" : "rgba(255,255,255,0.3)",
              transition: "color 200ms",
            }}
              onMouseEnter={e => { if (i !== activeSim) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={e => { if (i !== activeSim) e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Current sim label — bottom left */}
        <div style={{ position: "absolute", bottom: "calc(38% + 20px)", left: "2rem", zIndex: 10 }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.2rem" }}>
            {SIMS[activeSim].label}
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}>
            {SIMS[activeSim].sub}
          </p>
        </div>

        {/* White card — floating over lower portion of hero, like GI */}
        <div style={{
          position: "absolute", bottom: 0, left: "2rem",
          width: "min(560px, calc(100% - 4rem))",
          background: "#FFFFFF",
          padding: "2.5rem 2.5rem 2rem",
          zIndex: 10,
        }}>
          <h1 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
            color: "#0A0A0A",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
            letterSpacing: "-0.01em",
          }}>
            Every good regulator must be a model of its system.
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "#444444", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            TAI is an independent nonprofit research organization applying Ashby's Law of Requisite Variety to the defining governance problems of the compute era — from AI alignment to democratic institutions, from financial regulation to critical infrastructure.
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", paddingTop: "0.5rem", borderTop: "1px solid #E8E6E2" }}>
            <Link href="/theory" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", fontWeight: 500,
              color: "#FFFFFF", background: "#A02D24", padding: "0.625rem 1.25rem",
              textDecoration: "none", transition: "background 150ms", display: "inline-block",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#8B1A14")}
              onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
            >The Theory</Link>
            <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", fontWeight: 400,
              color: "#0A0A0A", border: "1px solid #CCCCCC", padding: "0.625rem 1.25rem",
              textDecoration: "none", transition: "border-color 150ms",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#A02D24")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#CCCCCC")}
            >Compute 2030 Report ↗</a>
          </div>
        </div>
      </section>

      {/* ── THE LAW ── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E6E2", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1.25rem" }}>
                Theoretical Foundation
              </p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0A0A0A", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Ashby's Law of Requisite Variety
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                W. Ross Ashby proved in 1956 that a regulator can only effectively control a system if its internal variety — the number of distinguishable states it can occupy — is greater than or equal to the variety of the disturbances it must absorb.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                This is not a metaphor. It is a mathematical constraint that applies to any system attempting to govern any other system — from AI alignment to financial regulation, from cybersecurity to democratic governance. Every failure of regulation is, at its root, a variety deficit.
              </p>
              <Link href="/theory" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", textDecoration: "none", transition: "opacity 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >Read the full theoretical exposition →</Link>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ border: "1px solid #E8E6E2", padding: "2.5rem" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.5rem" }}>The Constraint</p>
                <div style={{ textAlign: "center", padding: "2rem 0", borderBottom: "1px solid #E8E6E2", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#0A0A0A", letterSpacing: "0.08em" }}>V(R) ≥ V(D)</p>
                </div>
                {[
                  { sym: "V(R)", def: "Variety of the Regulator — the number of distinguishable states the governing system can occupy" },
                  { sym: "V(D)", def: "Variety of the Disturbance — the number of distinguishable states the governed system can generate" },
                ].map(item => (
                  <div key={item.sym} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "#A02D24", paddingTop: "0.1rem" }}>{item.sym}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.6 }}>{item.def}</p>
                  </div>
                ))}
                <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#555555", lineHeight: 1.6, marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #E8E6E2" }}>
                  "Only variety can destroy variety."
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "#AAAAAA", letterSpacing: "0.08em", marginTop: "0.5rem" }}>— W. Ross Ashby, 1956</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── APPLICATION DOMAINS — with inline ASCII canvases ── */}
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E8E6E2", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>Application Domains</p>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#0A0A0A", lineHeight: 1.1 }}>
                  One Law. Eight Domains.
                </h2>
              </div>
              <Link href="/theory" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A02D24")}
                onMouseLeave={e => (e.currentTarget.style.color = "#888888")}
              >Full exposition →</Link>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", border: "1px solid #E8E6E2" }} className="grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d, i) => (
              <Reveal key={d.n} delay={i * 35}>
                <Link href="/theory" style={{
                  display: "block", background: "#FFFFFF", padding: "2rem 1.75rem",
                  textDecoration: "none", height: "100%",
                  borderRight: i % 4 !== 3 ? "1px solid #E8E6E2" : "none",
                  borderBottom: i < 4 ? "1px solid #E8E6E2" : "none",
                  borderLeft: "3px solid transparent",
                  transition: "background 150ms, border-left-color 150ms",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F7F6F4"; e.currentTarget.style.borderLeftColor = "#A02D24"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderLeftColor = "transparent"; }}
                >
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>{d.n}</p>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1rem", color: "#0A0A0A", lineHeight: 1.25, marginBottom: "0.625rem" }}>{d.label}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: "#A02D24", letterSpacing: "0.06em", marginBottom: "0.375rem" }}>{d.eq}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "#AAAAAA", letterSpacing: "0.04em", lineHeight: 1.5 }}>{d.note}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PUBLICATION: COMPUTE 2030 — with ASCII canvas panel ── */}
      <section style={{ background: "#0A0A0A", borderBottom: "1px solid #1A1A1A", padding: "0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "520px" }} className="grid-cols-1 lg:grid-cols-2">
          {/* ASCII canvas panel */}
          <div style={{ position: "relative", minHeight: "320px", background: "#0A0A0A" }}>
            <AsciiCanvas sim="lorenz" cellSize={11} opacity={0.7} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24" }}>Lorenz Attractor</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>Deterministic chaos — V(R) &lt; V(D)</p>
            </div>
          </div>
          {/* Content panel */}
          <div style={{ padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Featured Publication</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>Inaugural Edition · June 2026</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Compute 2030
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                TAI's inaugural scenario report series. Four structural scenarios for how AI-native compute orchestration reshapes the global economy, governance, and strategic balance through 2030.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
                {[
                  { n: "Scenario I", title: "Concentrated Dominance" },
                  { n: "Scenario II", title: "Multilateral Fragmentation" },
                  { n: "Scenario III", title: "Governed Transition" },
                  { n: "Scenario IV", title: "Diffuse Proliferation" },
                ].map(s => (
                  <div key={s.n} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: "#A02D24", minWidth: "80px" }}>{s.n}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)" }}>{s.title}</p>
                  </div>
                ))}
              </div>
              <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", fontWeight: 500,
                color: "#FFFFFF", background: "#A02D24", padding: "0.75rem 1.5rem",
                textDecoration: "none", display: "inline-block", transition: "background 150ms", alignSelf: "flex-start",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B1A14")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >Read the Report ↗</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RESEARCH PROGRAMS ── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E6E2", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>Research Programs</p>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#0A0A0A", lineHeight: 1.1 }}>
                  Four Programs. One Premise.
                </h2>
              </div>
              <Link href="/research" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A02D24")}
                onMouseLeave={e => (e.currentTarget.style.color = "#888888")}
              >All programs →</Link>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0", border: "1px solid #E8E6E2" }} className="grid-cols-1 lg:grid-cols-2">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.code} delay={i * 50}>
                <Link href="/research" style={{
                  display: "block", padding: "2.5rem", textDecoration: "none",
                  borderRight: i % 2 === 0 ? "1px solid #E8E6E2" : "none",
                  borderBottom: i < 2 ? "1px solid #E8E6E2" : "none",
                  borderLeft: "3px solid transparent",
                  transition: "background 150ms, border-left-color 150ms",
                  background: "#FFFFFF",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F7F6F4"; e.currentTarget.style.borderLeftColor = "#A02D24"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderLeftColor = "transparent"; }}
                >
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.75rem" }}>{p.code}</p>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.1875rem", color: "#0A0A0A", lineHeight: 1.25, marginBottom: "0.75rem" }}>{p.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.7 }}>{p.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOIDS SECTION — with ASCII canvas + independence statement ── */}
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E8E6E2", padding: "0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px" }} className="grid-cols-1 lg:grid-cols-2">
          {/* Content */}
          <div style={{ padding: "5rem 3rem 5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1.25rem" }}>Who We Are</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#0A0A0A", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Independent. Rigorous. Open Access.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                The Ashby Institute accepts no funding from commercial AI developers, compute infrastructure providers, or any entity with a direct financial interest in the systems we analyze.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "2rem" }}>
                Our name is drawn from W. Ross Ashby's Good Regulator Theorem (1970): "Every good regulator of a system must be a model of that system." TAI exists to be that model — a rigorous, independent analytical institution that maintains sufficient internal variety to understand and analyze the systems reshaping our world.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Independent", note: "No commercial funding. No institutional affiliations. No conflicts of interest." },
                  { label: "Open Access", note: "All research published open access. No paywalls. No embargoes." },
                  { label: "Rigorous", note: "Peer-reviewed methodology. Formal theoretical foundations. Transparent assumptions." },
                  { label: "Broad", note: "Eight domains. One analytical framework. Consistent application of Ashby's Law." },
                ].map(item => (
                  <div key={item.label} style={{ borderTop: "2px solid #E8E6E2", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{item.label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#666666", lineHeight: 1.6 }}>{item.note}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", textDecoration: "none", marginTop: "2rem", display: "inline-block", transition: "opacity 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >About the Institute →</Link>
            </Reveal>
          </div>
          {/* Boids ASCII canvas */}
          <div style={{ position: "relative", minHeight: "360px", background: "#0A0A0A" }}>
            <AsciiCanvas sim="boids" cellSize={11} opacity={0.75} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", textAlign: "right" }}>Flocking System</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textAlign: "right" }}>Distributed control — no central regulator</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: "#FFFFFF", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <div style={{ maxWidth: "560px" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Newsletter</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", color: "#0A0A0A", lineHeight: 1.1, marginBottom: "1rem" }}>
                Research updates and new publications.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "#666666", lineHeight: 1.75, marginBottom: "2rem" }}>
                Occasional dispatches on new research, events, and publications. No promotional content. Unsubscribe at any time.
              </p>
              <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: "0" }}>
                <input type="email" placeholder="your@email.com" style={{
                  flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem",
                  padding: "0.75rem 1rem", border: "1px solid #CCCCCC", borderRight: "none",
                  outline: "none", background: "#FFFFFF", color: "#0A0A0A",
                }} />
                <button type="submit" style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", background: "#A02D24", color: "#FFFFFF",
                  border: "1px solid #A02D24", padding: "0.75rem 1.25rem", cursor: "pointer",
                  transition: "background 150ms",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#8B1A14")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
                >Subscribe →</button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1A1A1A", padding: "4rem 0 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="grid-cols-1 lg:grid-cols-4">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
                <LogoMark color="#A02D24" size={20} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF" }}>The Ashby Institute</span>
              </div>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "260px" }}>
                "Every good regulator of a system must be a model of that system."
              </p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", marginTop: "0.5rem" }}>— W. Ross Ashby & Roger Conant, 1970</p>
            </div>
            {[
              { heading: "Research", links: [{ label: "Compute Futures", href: "/research" }, { label: "Compute Governance", href: "/research" }, { label: "The Good Regulator Project", href: "/research" }, { label: "Compute & Society", href: "/research" }] },
              { heading: "Institute", links: [{ label: "The Theory", href: "/theory" }, { label: "Fellows", href: "/fellows" }, { label: "Publications", href: "/publications" }, { label: "Events", href: "/events" }, { label: "About", href: "/about" }] },
              { heading: "Contact", links: [{ label: "Newsletter", href: "/contact" }, { label: "Research Inquiries", href: "/contact" }, { label: "Press", href: "/contact" }, { label: "Independence Policy", href: "/about" }] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>{col.heading}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {col.links.map(l => (
                    <Link key={l.label} href={l.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 150ms" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                    >{l.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
              © 2026 The Ashby Institute. Independent nonprofit research organization.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[{ label: "Independence Policy", href: "/about" }, { label: "Contact", href: "/contact" }].map(l => (
                <Link key={l.label} href={l.href} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
