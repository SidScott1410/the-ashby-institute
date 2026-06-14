/*
 * Layout.tsx — TAI Site Layout v3
 * Design: Clean Institutional — Redwood Research × General Intuition
 * Background: #FFFFFF white throughout
 * Nav: white, thin bottom border, logo left, links right
 * Accent: #A02D24 crimson — logo, active link, primary CTA only
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { href: "/research", label: "Research" },
  { href: "/theory", label: "The Theory" },
  { href: "/fellows", label: "Fellows" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Minimal feedback-loop SVG mark — circle with inner square and directional arrows
export function LogoMark({ size = 26, color = "#A02D24" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer circle */}
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Inner square — the model */}
      <rect x="11" y="11" width="10" height="10" stroke={color} strokeWidth="1.2" fill="none" />
      {/* Top arrow — environment to regulator */}
      <path d="M16 4 L19 4" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M17.5 2.5 L19.5 4 L17.5 5.5" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square" />
      {/* Bottom arrow — regulator to environment */}
      <path d="M16 28 L13 28" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M14.5 26.5 L12.5 28 L14.5 29.5" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square" />
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FFFFFF" }}>

      {/* ── HEADER ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "#FFFFFF",
          borderBottom: scrolled ? "1px solid #E5E4E0" : "1px solid #E5E4E0",
          transition: "box-shadow 200ms ease",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
              <LogoMark size={22} color="#A02D24" />
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#111111",
                fontWeight: 500,
              }}>
                The Ashby Institute
              </span>
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden lg:flex">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    color: location === link.href ? "#A02D24" : "#555555",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => { if (location !== link.href) e.currentTarget.style.color = "#111111"; }}
                  onMouseLeave={e => { if (location !== link.href) e.currentTarget.style.color = "#555555"; }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", padding: "0.5rem", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "block", width: "20px", height: "1.5px", background: "#111111", transition: "transform 200ms", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
                <span style={{ display: "block", width: "20px", height: "1.5px", background: "#111111", opacity: menuOpen ? 0 : 1, transition: "opacity 150ms" }} />
                <span style={{ display: "block", width: "20px", height: "1.5px", background: "#111111", transition: "transform 200ms", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#FFFFFF", borderTop: "1px solid #E5E4E0" }}>
            <div className="container" style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9375rem",
                  color: location === link.href ? "#A02D24" : "#333333",
                  textDecoration: "none",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #F0EFED",
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, paddingTop: "60px" }}>
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#F7F6F4", borderTop: "1px solid #E5E4E0" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <LogoMark size={18} color="#A02D24" />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888" }}>
                  The Ashby Institute
                </span>
              </div>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontStyle: "italic", fontSize: "0.9375rem", color: "#444444", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                "Every good regulator of a system must be a model of that system."
              </p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.06em", color: "#AAAAAA" }}>
                — W. Ross Ashby & Roger Conant, 1970
              </p>
            </div>

            {/* Research */}
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1rem" }}>Research</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {["Compute Futures", "Compute Governance", "The Good Regulator Project", "Compute & Society"].map(item => (
                  <Link key={item} href="/research" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#555555", textDecoration: "none", transition: "color 150ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
                  >{item}</Link>
                ))}
              </div>
            </div>

            {/* Institute */}
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1rem" }}>Institute</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { label: "The Theory", href: "/theory" },
                  { label: "Fellows", href: "/fellows" },
                  { label: "Publications", href: "/publications" },
                  { label: "Events", href: "/events" },
                  { label: "About", href: "/about" },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#555555", textDecoration: "none", transition: "color 150ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#111111")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
                  >{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1rem" }}>Newsletter</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.6, marginBottom: "1rem" }}>
                Research updates, event notices, and new publications. No promotional content.
              </p>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#A02D24", border: "1px solid #A02D24", padding: "0.5rem 1rem",
                textDecoration: "none", transition: "background 150ms, color 150ms",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#A02D24"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A02D24"; }}
              >
                Subscribe →
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid #E5E4E0", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#AAAAAA" }}>
              © 2026 The Ashby Institute. Independent nonprofit research organization.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[{ label: "Independence Policy", href: "/about" }, { label: "Contact", href: "/contact" }].map(item => (
                <Link key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#AAAAAA", textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#555555")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#AAAAAA")}
                >{item.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
