/**
 * THE ASHBY INSTITUTE — Homepage
 * Design: General Intuition clone
 * - Full-screen ASCII canvas hero (100vw × 100vh), white bg, black/slate chars
 * - 1px black border grid system throughout entire page
 * - Multi-canvas scrolling sections (2-3 panels wide)
 * - Sim selector top-right in hero
 * - White background, black borders, slate blue #2C3E6B accent
 * - Chakra Petch monospace font
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import AsciiCanvas, { SimType } from "@/components/AsciiCanvas";
import { LogoMark } from "@/components/LogoMark";

const SIMS: { id: SimType; label: string; desc: string }[] = [
  { id: "cellular",         label: "CELLULAR AUTOMATON",   desc: "Emergent order from local rules" },
  { id: "reaction-diffusion", label: "REACTION-DIFFUSION", desc: "Turing pattern formation" },
  { id: "lorenz",           label: "LORENZ ATTRACTOR",     desc: "Deterministic chaos" },
  { id: "network",          label: "REGULATORY NETWORK",   desc: "Feedback loop dynamics" },
  { id: "boids",            label: "BOIDS FLOCKING",       desc: "Distributed control" },
];

const BORDER = "1px solid #111";
const SLATE = "#2C3E6B";

const DOMAINS = [
  { label: "AI ALIGNMENT",        eq: "V(R) ≥ V(D)",   desc: "Regulatory variety must match or exceed disturbance variety to maintain control." },
  { label: "CYBERSECURITY",       eq: "H(X|Y) > 0",    desc: "Residual entropy after observation bounds the attacker's advantage." },
  { label: "AUTONOMOUS SYSTEMS",  eq: "∂V/∂t = f(V,D)", desc: "Variety dynamics govern the stability of autonomous regulators." },
  { label: "CRITICAL INFRASTRUCTURE", eq: "R ⊇ D",     desc: "The regulator's response set must contain every possible disturbance." },
  { label: "FINANCIAL SYSTEMS",   eq: "σ(R) ≥ σ(D)",   desc: "Regulatory bandwidth must exceed market volatility to prevent systemic failure." },
  { label: "HEALTHCARE",          eq: "I(R;S) = H(S)",  desc: "Complete information about the system is necessary for effective regulation." },
  { label: "GOVERNANCE INSTITUTIONS", eq: "C(R) ≥ C(D)", desc: "Institutional complexity must scale with the complexity of governed systems." },
  { label: "CLIMATE & EARTH",     eq: "∇·J + ∂ρ/∂t = 0", desc: "Conservation laws constrain the variety of feasible regulatory interventions." },
];

const RESEARCH_PROGRAMS = [
  {
    id: "compute-futures",
    label: "PROGRAM 01",
    title: "Compute Futures",
    desc: "Scenario analysis and forecasting for AI-native compute architectures. Inaugural output: Compute 2030 — four scenarios for the compute transition.",
  },
  {
    id: "compute-governance",
    label: "PROGRAM 02",
    title: "Compute Governance",
    desc: "Structural analysis of regulatory frameworks for compute infrastructure. Annual publication: Compute Governance Annual.",
  },
  {
    id: "good-regulator",
    label: "PROGRAM 03",
    title: "The Good Regulator Project",
    desc: "Applied research on Ashby's Law across AI alignment, autonomous systems, and institutional design. GRT Lecture Series.",
  },
  {
    id: "compute-society",
    label: "PROGRAM 04",
    title: "Compute & Society",
    desc: "Distributional effects of the compute transition on labor, equity, and democratic governance. Compute Equity Index.",
  },
];

export default function Home() {
  const [activeSim, setActiveSim] = useState<SimType>("cellular");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); hamburgerRef.current?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const NAV_ITEMS = [
    { href: "/theory", label: "THEORY" },
    { href: "/research", label: "RESEARCH" },
    { href: "/fellows", label: "FELLOWS" },
    { href: "/publications", label: "PUBLICATIONS" },
    { href: "/events", label: "EVENTS" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <div id="home-root" style={{ fontFamily: "'Chakra Petch', monospace", background: "#fff", color: "#111", overflowX: "hidden" }}>
      <style>{`
        :focus-visible { outline: 2px solid #2C3E6B !important; outline-offset: 2px !important; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger-btn { display: flex !important; } .hamburger-menu { display: block !important; } }
        @media (min-width: 769px) { .hamburger-btn { display: none !important; } #home-mobile-nav { display: none !important; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }

        /* ── MOBILE LAYOUT FIXES ── */
        @media (max-width: 640px) {
          /* Prevent all horizontal overflow */
          #home-root { overflow-x: hidden; max-width: 100vw; }

          /* Hero: hide sim selector on mobile, show below hero instead */
          #hero-sim-selector { display: none !important; }
          #hero-info-card { max-width: 100% !important; padding: 28px 20px 28px 20px !important; left: 0 !important; right: 0 !important; border-left: none !important; border-right: none !important; }
          #hero-info-card h1 { font-size: 26px !important; }
          #hero-info-card .hero-btns { flex-wrap: wrap !important; }
          #hero-bottom-label { display: none !important; }

          /* Sim selector below hero on mobile */
          #mobile-sim-strip { display: flex !important; }

          /* Section 1: 3-col → 1-col, hide canvases */
          #section-law { grid-template-columns: 1fr !important; }
          #section-law .canvas-col { display: none !important; }
          #section-law .text-col { padding: 32px 20px !important; }

          /* Section 2: header 2-col → 1-col, domain grid 4-col → 2-col */
          #section-domains .header-grid { grid-template-columns: 1fr !important; }
          #section-domains .header-grid > div { border-right: none !important; padding: 24px 20px !important; }
          #section-domains .domain-grid { grid-template-columns: 1fr 1fr !important; }
          #section-domains .domain-grid > div { padding: 20px 16px !important; }

          /* Section 3: 2-col → 1-col, hide canvases */
          #section-compute { grid-template-columns: 1fr !important; }
          #section-compute .canvas-col { display: none !important; }
          #section-compute .text-col { padding: 32px 20px !important; }
          #section-compute .scenario-grid { grid-template-columns: 1fr 1fr !important; }

          /* Section 4: programs 2-col → 1-col */
          #section-programs .programs-grid { grid-template-columns: 1fr !important; }
          #section-programs .programs-grid > div { border-right: none !important; padding: 28px 20px !important; }
          #section-programs .programs-header { padding: 24px 20px !important; }

          /* Section 5: 2-col → 1-col, hide canvas */
          #section-independence { grid-template-columns: 1fr !important; }
          #section-independence .canvas-col { display: none !important; }
          #section-independence .text-col { padding: 32px 20px !important; border-right: none !important; }
          #section-independence .checklist-grid { grid-template-columns: 1fr !important; }
          #section-independence .checklist-grid > div { border-right: none !important; padding-right: 0 !important; padding-left: 0 !important; }

          /* Section 6: newsletter 2-col → 1-col */
          #section-newsletter .newsletter-grid { grid-template-columns: 1fr !important; }
          #section-newsletter .newsletter-grid > div { border-right: none !important; padding: 28px 20px !important; }
          #section-newsletter .email-row { flex-wrap: wrap !important; }
          #section-newsletter .email-row input { min-width: 0 !important; border-right: 1px solid #111 !important; }

          /* Footer: 4-col → 1-col */
          #home-footer .footer-grid { grid-template-columns: 1fr !important; }
          #home-footer .footer-grid > div { border-right: none !important; padding: 28px 20px !important; }
          #home-footer .footer-bottom { flex-direction: column !important; }
          #home-footer .footer-bottom > * { border-right: none !important; border-bottom: 1px solid #111 !important; }
        }

        @media (max-width: 768px) and (min-width: 641px) {
          /* Tablet: collapse 4-col to 2-col, 3-col to 1-col */
          #section-law { grid-template-columns: 1fr !important; }
          #section-law .canvas-col:first-child { display: none !important; }
          #section-law .canvas-col { border-right: none !important; }
          #section-domains .domain-grid { grid-template-columns: 1fr 1fr !important; }
          #home-footer .footer-grid { grid-template-columns: 1fr 1fr !important; }
          #home-footer .footer-grid > div:nth-child(2n) { border-right: none !important; }
        }
      `}</style>

      {/* Skip to content */}
      <a href="#main-content" style={{
        position: "fixed", top: -60, left: 16, zIndex: 9999,
        background: "#111", color: "#fff",
        padding: "8px 16px", fontSize: 11, letterSpacing: "0.1em",
        textDecoration: "none", border: BORDER, transition: "top 0.15s",
      }}
        onFocus={e => { (e.currentTarget as HTMLElement).style.top = "8px"; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.top = "-60px"; }}
      >SKIP TO CONTENT</a>

      {/* ── NAV ── */}
      <header role="banner" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "stretch",
        borderBottom: scrolled ? BORDER : "1px solid transparent",
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.0)",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.2s ease, border-color 0.2s ease, backdrop-filter 0.2s ease",
        height: 56,
      }}>
        {/* Logo cell */}
        <Link href="/" aria-label="The Ashby Institute — Home" style={{
          display: "flex", alignItems: "center", padding: "0 20px",
          borderRight: scrolled ? BORDER : "1px solid transparent", textDecoration: "none",
          gap: 10, transition: "border-color 0.2s ease",
        }}>
          <LogoMark size={32} color={SLATE} />
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Primary navigation" style={{ display: "flex", alignItems: "stretch", marginLeft: "auto" }} className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", padding: "0 18px",
              borderLeft: scrolled ? BORDER : "1px solid transparent", fontSize: 10, letterSpacing: "0.12em",
              textDecoration: "none", color: "#111",
              transition: "color 0.15s, border-color 0.2s ease",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = SLATE)}
              onMouseLeave={e => (e.currentTarget.style.color = "#111")}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            display: "flex", alignItems: "center", padding: "0 20px",
            borderLeft: BORDER, fontSize: 10, letterSpacing: "0.12em",
            textDecoration: "none", color: "#fff", background: "#111",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = SLATE)}
            onMouseLeave={e => (e.currentTarget.style.background = "#111")}
          >
            CONTACT
          </Link>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          ref={hamburgerRef}
          type="button"
          className="hamburger-btn"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="home-mobile-nav"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            marginLeft: "auto", display: "none",
            alignItems: "center", justifyContent: "center",
            width: 56, height: 56,
            borderLeft: BORDER,
            background: "transparent", cursor: "pointer", flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {menuOpen ? (
              <><line x1="2" y1="2" x2="16" y2="16" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="2" x2="2" y2="16" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/></>
            ) : (
              <><line x1="2" y1="5" x2="16" y2="5" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/><line x1="2" y1="9" x2="16" y2="9" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/><line x1="2" y1="13" x2="16" y2="13" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/></>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile nav drawer */}
      <div
        id="home-mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        style={{
          position: "fixed", top: 56, left: 0, right: 0, zIndex: 99,
          background: "#fff", borderBottom: BORDER,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.18s cubic-bezier(0.23,1,0.32,1)",
          pointerEvents: menuOpen ? "auto" : "none",
          display: "none",
        }}
        className="hamburger-menu"
      >
        {[...NAV_ITEMS, { href: "/contact", label: "CONTACT" }].map((item, i) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
            display: "block", padding: "14px 20px",
            borderBottom: i < NAV_ITEMS.length ? BORDER : "none",
            fontSize: 10, letterSpacing: "0.12em",
            textDecoration: "none",
            color: item.href === "/contact" ? "#fff" : "#111",
            background: item.href === "/contact" ? "#111" : "transparent",
          }}>{item.label}</Link>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          HERO — full-screen ASCII canvas
      ══════════════════════════════════════════ */}
      <section id="main-content" style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        marginLeft: "calc(-50vw + 50%)",
      }}>
        {/* Full-screen canvas */}
        <div style={{ position: "absolute", inset: 0 }}>
          <AsciiCanvas sim={activeSim} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Sim selector — top right, inside hero */}
        <div id="hero-sim-selector" style={{
          position: "absolute", top: 56, right: 0,
          display: "flex", flexDirection: "column",
          borderLeft: BORDER,
          zIndex: 10,
        }}>
          <div style={{ padding: "8px 16px", borderBottom: BORDER, background: "rgba(255,255,255,0.95)" }}>
            <span style={{ fontFamily: "'Chakra Petch', monospace", fontSize: 8, letterSpacing: "0.16em", color: SLATE }}>SIMULATION</span>
          </div>
          {SIMS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Switch to ${s.label} simulation`}
              aria-pressed={activeSim === s.id}
              onClick={() => setActiveSim(s.id)}
              style={{
                display: "block", padding: "11px 16px",
                borderBottom: BORDER,
                background: activeSim === s.id ? "#111" : "rgba(255,255,255,0.92)",
                color: activeSim === s.id ? "#fff" : "#111",
                fontSize: 9, letterSpacing: "0.1em",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.15s",
                minWidth: 200,
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={e => { if (activeSim !== s.id) { (e.currentTarget as HTMLElement).style.background = "rgba(240,240,240,0.97)"; } }}
              onMouseLeave={e => { if (activeSim !== s.id) { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.92)"; } }}
            >
              <div style={{ fontWeight: 700, fontFamily: "'Chakra Petch', monospace", fontSize: 9 }}>{s.label}</div>
              <div style={{ opacity: 0.55, marginTop: 3, fontSize: 8, fontFamily: "'Chakra Petch', monospace" }}>{s.desc}</div>
            </button>
          ))}
        </div>

        {/* Floating white card — bottom left */}
        <div id="hero-info-card" style={{
          position: "absolute", bottom: 0, left: 0,
          background: "#fff",
          border: BORDER,
          borderBottom: "none", borderLeft: "none",
          padding: "40px 48px 40px 48px",
          maxWidth: 560,
          zIndex: 10,
        }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>
            W. ROSS ASHBY · LAW OF REQUISITE VARIETY · 1956
          </p>
          <h1 style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 700, lineHeight: 1.15,
            letterSpacing: "-0.01em", marginBottom: 20,
          }}>
            Every good regulator must be a model of its system.
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#444", marginBottom: 28, maxWidth: 420 }}>
            Independent research on compute governance and AI regulatory design. We study why AI oversight systems fail — and how to build ones that don't.
          </p>
          <div className="hero-btns" style={{ display: "flex", gap: 0 }}>
            <Link href="/theory" style={{
              display: "inline-block", padding: "12px 24px",
              background: "#111", color: "#fff",
              fontSize: 10, letterSpacing: "0.12em",
              textDecoration: "none", border: BORDER,
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = SLATE)}
              onMouseLeave={e => (e.currentTarget.style.background = "#111")}
            >
              THE THEORY
            </Link>
            <a href="/manus-storage/compute2030_report_v1_ec1b767c_ce150801.pdf" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", padding: "12px 24px",
              background: "#fff", color: "#111",
              fontSize: 10, letterSpacing: "0.12em",
              textDecoration: "none", border: BORDER, borderLeft: "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f5f5f5"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
            >
              COMPUTE 2030 REPORT ↗
            </a>
          </div>
        </div>

        {/* Bottom-right label */}
        <div id="hero-bottom-label" style={{
          position: "absolute", bottom: 0, right: 0,
          borderTop: BORDER, borderLeft: BORDER,
          padding: "10px 16px",
          fontSize: 9, letterSpacing: "0.1em", color: "#666",
          background: "rgba(255,255,255,0.85)",
        }}>
          V(R) ≥ V(D) · ASHBY 1956
        </div>
      </section>

      {/* Mobile sim strip — shown only on mobile below hero */}
      <div id="mobile-sim-strip" style={{ display: "none", overflowX: "auto", borderBottom: BORDER }}>
        {SIMS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSim(s.id)}
            style={{
              flexShrink: 0, padding: "12px 16px",
              borderRight: BORDER,
              background: activeSim === s.id ? "#111" : "#fff",
              color: activeSim === s.id ? "#fff" : "#111",
              fontSize: 9, letterSpacing: "0.1em", cursor: "pointer",
              fontFamily: "'Chakra Petch', monospace",
            }}
          >{s.label}</button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — The Law (multi-canvas + text)
          3 columns: canvas | canvas | text
      ══════════════════════════════════════════ */}
      <section id="section-law" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: BORDER }}>
        {/* Canvas 1 */}
        <div className="canvas-col" style={{ borderRight: BORDER, height: 480 }}>
          <div style={{ borderBottom: BORDER, padding: "10px 16px", fontSize: 9, letterSpacing: "0.1em", color: "#666" }}>
            REACTION-DIFFUSION · TURING PATTERNS
          </div>
          <AsciiCanvas sim="reaction-diffusion" style={{ width: "100%", height: "calc(100% - 37px)" }} />
        </div>
        {/* Canvas 2 */}
        <div className="canvas-col" style={{ borderRight: BORDER, height: 480 }}>
          <div style={{ borderBottom: BORDER, padding: "10px 16px", fontSize: 9, letterSpacing: "0.1em", color: "#666" }}>
            REGULATORY NETWORK · FEEDBACK DYNAMICS
          </div>
          <AsciiCanvas sim="network" style={{ width: "100%", height: "calc(100% - 37px)" }} />
        </div>
        {/* Text panel */}
        <div className="text-col" style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>
            ASHBY'S LAW OF REQUISITE VARIETY
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
            Only variety can absorb variety.
          </h2>
          <div style={{
            background: "#f8f8f8", border: BORDER,
            padding: "20px 24px", marginBottom: 24,
            fontFamily: "monospace",
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: SLATE, marginBottom: 8 }}>V(R) ≥ V(D)</div>
            <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6 }}>
              The variety of a regulator R must be at least as great as the variety of the disturbances D it is designed to control.
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "#444" }}>
            First stated by W. Ross Ashby in <em>An Introduction to Cybernetics</em> (1956), this theorem establishes a fundamental limit on control. A system that cannot model its environment cannot regulate it.
          </p>
          <Link href="/theory" style={{
            display: "inline-block", marginTop: 28, padding: "10px 20px",
            border: BORDER, fontSize: 10, letterSpacing: "0.1em",
            textDecoration: "none", color: "#111",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            READ THE FULL THEORY →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — Eight Domains
          Header row + 4×2 grid
      ══════════════════════════════════════════ */}
      <section id="section-domains" style={{ borderBottom: BORDER }}>
        {/* Header */}
        <div className="header-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          borderBottom: BORDER,
        }}>
          <div style={{ padding: "32px 40px", borderRight: BORDER }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 12 }}>RESEARCH SCOPE</p>
            <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
              One law.<br/>Eight domains.
            </h2>
          </div>
          <div style={{ padding: "32px 40px", display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#444", maxWidth: 480 }}>
              Ashby's Law is not a metaphor. It is a precise mathematical constraint that applies wherever a regulator must absorb disturbances: from AI alignment to democratic governance, from financial systems to climate modeling.
            </p>
          </div>
        </div>

        {/* 4×2 domain grid */}
        <div className="domain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {DOMAINS.map((d, i) => (
            <div
              key={d.label}
              style={{
                padding: "28px 24px",
                borderRight: i % 4 !== 3 ? BORDER : "none",
                borderBottom: i < 4 ? BORDER : "none",
              }}
            >
              <p style={{ fontSize: 8, letterSpacing: "0.14em", color: SLATE, marginBottom: 10 }}>{d.label}</p>
              <div style={{
                fontFamily: "monospace", fontSize: 18, fontWeight: 700,
                color: "#111", marginBottom: 12, letterSpacing: "-0.01em",
              }}>
                {d.eq}
              </div>
              <p style={{ fontSize: 11, lineHeight: 1.65, color: "#555" }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — Compute 2030 Feature
          2 columns: multi-canvas left | text right
      ══════════════════════════════════════════ */}
      <section id="section-compute" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: BORDER, minHeight: 520 }}>
        {/* Left: stacked canvases */}
        <div className="canvas-col" style={{ borderRight: BORDER, display: "grid", gridTemplateRows: "1fr 1fr" }}>
          <div style={{ borderBottom: BORDER }}>
            <div style={{ borderBottom: BORDER, padding: "10px 16px", fontSize: 9, letterSpacing: "0.1em", color: "#666" }}>
              LORENZ ATTRACTOR · DETERMINISTIC CHAOS
            </div>
            <AsciiCanvas sim="lorenz" style={{ width: "100%", height: "calc(100% - 37px)" }} />
          </div>
          <div>
            <div style={{ borderBottom: BORDER, padding: "10px 16px", fontSize: 9, letterSpacing: "0.1em", color: "#666" }}>
              CELLULAR AUTOMATON · EMERGENT ORDER
            </div>
            <AsciiCanvas sim="cellular" style={{ width: "100%", height: "calc(100% - 37px)" }} />
          </div>
        </div>

        {/* Right: text */}
        <div className="text-col" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>
            FEATURED PUBLICATION · JUNE 2026
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, marginBottom: 8 }}>
            Compute 2030
          </h2>
          <p style={{ fontSize: 11, color: "#888", letterSpacing: "0.06em", marginBottom: 24 }}>
            TAI INAUGURAL REPORT SERIES
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#444", marginBottom: 20 }}>
            Four scenarios for the compute transition, the period in which AI-native compute orchestration reshapes the global economy, governance, and strategic balance.
          </p>
          <div style={{ borderLeft: `3px solid ${SLATE}`, paddingLeft: 20, marginBottom: 28 }}>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "#555", fontStyle: "italic" }}>
              "The question is not whether compute will reshape the world. The question is whether our regulatory institutions will have sufficient variety to absorb the disturbances it introduces."
            </p>
          </div>
          <div className="scenario-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 28 }}>
            {[
              { n: "01", title: "Concentrated Dominance", desc: "State-backed monopoly on frontier compute" },
              { n: "02", title: "Multilateral Fragmentation", desc: "Competing national compute blocs" },
              { n: "03", title: "Governed Transition", desc: "International coordination succeeds" },
              { n: "04", title: "Diffuse Proliferation", desc: "Commoditized compute, distributed power" },
            ].map((s, i) => (
              <div key={s.n} style={{
                padding: "14px 16px",
                borderTop: BORDER,
                borderRight: i % 2 === 0 ? BORDER : "none",
              }}>
                <p style={{ fontSize: 8, letterSpacing: "0.1em", color: SLATE, marginBottom: 4 }}>SCENARIO {s.n}</p>
                <p style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 10, color: "#666" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <a href="/manus-storage/compute2030_report_v1_ec1b767c_ce150801.pdf" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", padding: "12px 24px",
            background: "#111", color: "#fff",
            fontSize: 10, letterSpacing: "0.12em",
            textDecoration: "none", border: BORDER,
            alignSelf: "flex-start",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = SLATE)}
            onMouseLeave={e => (e.currentTarget.style.background = "#111")}
          >
            READ THE FULL REPORT ↗
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — Research Programs
          Header + 2×2 grid
      ══════════════════════════════════════════ */}
      <section id="section-programs" style={{ borderBottom: BORDER }}>
        <div className="programs-header" style={{ borderBottom: BORDER, padding: "32px 40px" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 8 }}>RESEARCH PROGRAMS</p>
          <h2 style={{ fontSize: 26, fontWeight: 700 }}>Four programs. One framework.</h2>
        </div>
        <div className="programs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {RESEARCH_PROGRAMS.map((p, i) => (
            <div key={p.id} style={{
              padding: "36px 40px",
              borderRight: i % 2 === 0 ? BORDER : "none",
              borderBottom: i < 2 ? BORDER : "none",
            }}>
              <p style={{ fontSize: 8, letterSpacing: "0.14em", color: SLATE, marginBottom: 12 }}>{p.label}</p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>{p.title}</h3>
              <p style={{ fontSize: 12, lineHeight: 1.75, color: "#555", marginBottom: 20 }}>{p.desc}</p>
              <Link href="/research" style={{
                fontSize: 10, letterSpacing: "0.1em", color: SLATE,
                textDecoration: "none", borderBottom: `1px solid ${SLATE}`,
                paddingBottom: 2,
              }}>
                LEARN MORE →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — Independence + Boids canvas
          2 columns: text left | canvas right
      ══════════════════════════════════════════ */}
      <section id="section-independence" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: BORDER, minHeight: 400 }}>
        {/* Text */}
        <div className="text-col" style={{ padding: "56px 48px", borderRight: BORDER, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>
            INDEPENDENCE POLICY
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
            No affiliations.<br/>No exceptions.
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "#444", marginBottom: 20 }}>
            TAI accepts no funding from technology companies, governments, or any entity with a direct commercial interest in the compute transition. Our independence is structural, not aspirational.
          </p>
          <div className="checklist-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              "No corporate funding",
              "No government contracts",
              "Open access publications",
              "Public governance records",
            ].map((item, i) => (
              <div key={item} style={{
                padding: "12px 0",
                borderTop: BORDER,
                borderRight: i % 2 === 0 ? BORDER : "none",
                paddingRight: i % 2 === 0 ? 16 : 0,
                paddingLeft: i % 2 === 1 ? 16 : 0,
                fontSize: 11, color: "#444",
              }}>
                <span style={{ color: SLATE, marginRight: 8 }}>—</span>{item}
              </div>
            ))}
          </div>
        </div>
        {/* Canvas */}
        <div className="canvas-col">
          <div style={{ borderBottom: BORDER, padding: "10px 16px", fontSize: 9, letterSpacing: "0.1em", color: "#666" }}>
            BOIDS FLOCKING · DISTRIBUTED CONTROL
          </div>
          <AsciiCanvas sim="boids" style={{ width: "100%", height: "calc(100% - 37px)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — Newsletter
      ══════════════════════════════════════════ */}
      <section id="section-newsletter" style={{ borderBottom: BORDER }}>
        <div className="newsletter-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "48px 40px", borderRight: BORDER }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>NEWSLETTER</p>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
              Research updates and working papers.
            </h2>
            <p style={{ fontSize: 12, lineHeight: 1.75, color: "#555" }}>
              Receive new publications, event announcements, and occasional commentary on the compute transition. No promotional content.
            </p>
          </div>
          <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="email-row" style={{ display: "flex", gap: 0 }}>
              <input
                type="email"
                placeholder="your@institution.edu"
                style={{
                  flex: 1, padding: "12px 16px",
                  border: BORDER, borderRight: "none",
                  fontSize: 12, fontFamily: "'Chakra Petch', monospace",
                  outline: "none", background: "#fff",
                }}
              />
              <button style={{
                padding: "12px 24px",
                background: "#111", color: "#fff",
                border: BORDER, fontSize: 10, letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = SLATE)}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
              >
                SUBSCRIBE
              </button>
            </div>
            <p style={{ fontSize: 10, color: "#888", marginTop: 12 }}>
              Unsubscribe at any time. No data sharing.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer id="home-footer" style={{ borderTop: BORDER }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderBottom: BORDER }}>
          {/* Brand */}
          <div style={{ padding: "40px 32px", borderRight: BORDER }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <LogoMark size={26} color={SLATE} />
            </div>
            <p style={{ fontSize: 11, lineHeight: 1.7, color: "#555", fontStyle: "italic" }}>
              "Every good regulator of a system must be a model of that system."
            </p>
            <p style={{ fontSize: 10, color: "#888", marginTop: 8 }}>— W. Ross Ashby, 1970</p>
          </div>

          {/* Research */}
          <div style={{ padding: "40px 32px", borderRight: BORDER }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>RESEARCH</p>
            {["Compute Futures", "Compute Governance", "The Good Regulator Project", "Compute & Society"].map(item => (
              <Link key={item} href="/research" style={{
                display: "block", fontSize: 11, color: "#555",
                textDecoration: "none", marginBottom: 8,
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Institute */}
          <div style={{ padding: "40px 32px", borderRight: BORDER }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>INSTITUTE</p>
            {[
              { label: "Theory", href: "/theory" },
              { label: "Fellows", href: "/fellows" },
              { label: "Publications", href: "/publications" },
              { label: "Events", href: "/events" },
              { label: "About", href: "/about" },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: "block", fontSize: 11, color: "#555",
                textDecoration: "none", marginBottom: 8,
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div style={{ padding: "40px 32px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", color: SLATE, marginBottom: 16 }}>CONTACT</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>research@theashbyinstitute.org</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>fellows@theashbyinstitute.org</p>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>press@theashbyinstitute.org</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 16 }}>Washington, D.C.</p>
            <p style={{ fontSize: 11, color: "#555" }}>London · Singapore</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 32px",
          fontSize: 9, color: "#888", letterSpacing: "0.08em",
        }}>
          <span>© 2026 THE ASHBY INSTITUTE · INDEPENDENT NONPROFIT RESEARCH</span>
          <span>V(R) ≥ V(D)</span>
        </div>
      </footer>
    </div>
  );
}
