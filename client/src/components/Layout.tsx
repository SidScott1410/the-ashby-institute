/*
 * Layout.tsx — TAI Site Layout v2
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 * Colors: #0A0C0F near-black | #F5F2EC warm parchment | #8B1A14 deep crimson
 * Fonts: Playfair Display (display) | Space Mono (labels) | Source Serif 4 (body)
 * No gradients. No border-radius. Sharp rules. Asymmetric editorial grid.
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

// Inline SVG: feedback loop — a continuous cycle with inner model square
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="12.5" stroke="#8B1A14" strokeWidth="1.4" fill="none" />
      <rect x="11.5" y="11.5" width="9" height="9" stroke="#8B1A14" strokeWidth="1.2" fill="none" />
      {/* Top arrow right */}
      <path d="M16 3.5 L20.5 3.5" stroke="#8B1A14" strokeWidth="1.3" strokeLinecap="square" />
      <path d="M19 2 L21 3.5 L19 5" stroke="#8B1A14" strokeWidth="1.1" fill="none" strokeLinecap="square" />
      {/* Bottom arrow left */}
      <path d="M16 28.5 L11.5 28.5" stroke="#8B1A14" strokeWidth="1.3" strokeLinecap="square" />
      <path d="M13 27 L11 28.5 L13 30" stroke="#8B1A14" strokeWidth="1.1" fill="none" strokeLinecap="square" />
      <circle cx="16" cy="16" r="1.2" fill="#8B1A14" />
    </svg>
  );
}

export { LogoMark };

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5F2EC" }}>

      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,12,15,0.96)" : "#0A0C0F",
          borderBottom: "1px solid #1E2228",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: "60px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
              <LogoMark size={24} />
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#E8E4DC",
              }}>
                The Ashby Institute
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center" style={{ gap: "2rem" }}>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: location === link.href ? "#8B1A14" : "#7A7570",
                    textDecoration: "none",
                    transition: "color 200ms ease",
                    position: "relative",
                  }}
                  onMouseEnter={e => { if (location !== link.href) e.currentTarget.style.color = "#E8E4DC"; }}
                  onMouseLeave={e => { if (location !== link.href) e.currentTarget.style.color = "#7A7570"; }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile button */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", padding: "0.5rem", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "block", width: "20px", height: "1px", background: "#E8E4DC", transition: "transform 200ms", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
                <span style={{ display: "block", width: "20px", height: "1px", background: "#E8E4DC", opacity: menuOpen ? 0 : 1, transition: "opacity 200ms" }} />
                <span style={{ display: "block", width: "20px", height: "1px", background: "#E8E4DC", transition: "transform 200ms", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#0A0C0F", borderTop: "1px solid #1E2228" }}>
            <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: location === link.href ? "#8B1A14" : "#8A8580",
                  textDecoration: "none",
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A0C0F", borderTop: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "4rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ marginBottom: "4rem" }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <LogoMark size={20} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6560" }}>
                  The Ashby Institute
                </span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                "Every good regulator of a system must be a model of that system."
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#3A3530" }}>
                — W. Ross Ashby & Roger Conant, 1970
              </p>
            </div>

            {/* Research */}
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4540", marginBottom: "1.25rem" }}>Research</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Compute Futures", "Compute Governance", "The Good Regulator Project", "Compute & Society", "AI Alignment"].map(item => (
                  <Link key={item} href="/research" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", textDecoration: "none", transition: "color 200ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#E8E4DC")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#5A5550")}
                  >{item}</Link>
                ))}
              </div>
            </div>

            {/* Institute */}
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4540", marginBottom: "1.25rem" }}>Institute</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "The Theory", href: "/theory" },
                  { label: "Fellows", href: "/fellows" },
                  { label: "Publications", href: "/publications" },
                  { label: "Events", href: "/events" },
                  { label: "About", href: "/about" },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", textDecoration: "none", transition: "color 200ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#E8E4DC")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#5A5550")}
                  >{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4540", marginBottom: "1.25rem" }}>Newsletter</p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Research updates, event notices, and new publications. No promotional content.
              </p>
              <Link href="/contact" style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#E8E4DC",
                border: "1px solid rgba(232,228,220,0.25)",
                padding: "0.6rem 1.25rem",
                textDecoration: "none",
                transition: "border-color 200ms",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.25)")}
              >
                Subscribe →
              </Link>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ borderTop: "1px solid #1E2228", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }} className="md:flex-row md:items-center md:justify-between">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#3A3530" }}>
              © 2026 The Ashby Institute. Independent nonprofit research organization.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Independence Policy", "Contact"].map(item => (
                <Link key={item} href={item === "Contact" ? "/contact" : "/about"} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.08em",
                  color: "#3A3530",
                  textDecoration: "none",
                  transition: "color 200ms",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#7A7570")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#3A3530")}
                >{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
