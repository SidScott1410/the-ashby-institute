/*
 * Layout.tsx — TAI Shared Layout v4
 * Design: GI-clone — Chakra Petch geometric mono, white background, black typography
 * Accent: #2C3E6B slate blue — active nav, labels, CTAs
 * Logo: crimson #A02D24 only
 * No serif fonts. No rounded corners. No gradients.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const font = "'Chakra Petch', 'IBM Plex Mono', monospace";

const NAV_LINKS = [
  { href: "/research", label: "Research" },
  { href: "/theory", label: "Theory" },
  { href: "/fellows", label: "Fellows" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export function LogoMark({ size = 22, color = "#A02D24" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="11" y="11" width="10" height="10" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M16 4 L19 4" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M17.5 2.5 L19.5 4 L17.5 5.5" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square" />
      <path d="M16 28 L13 28" stroke={color} strokeWidth="1.3" strokeLinecap="square" />
      <path d="M14.5 26.5 L12.5 28 L14.5 29.5" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="square" />
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <div style={{ fontFamily: font, background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#FFFFFF",
        borderBottom: "1px solid #E0E0E0",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <LogoMark size={20} color="#A02D24" />
            <span style={{ fontFamily: font, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", fontWeight: 600 }}>
              The Ashby Institute
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            {NAV_LINKS.map(l => {
              const active = location === l.href || location.startsWith(l.href + "/");
              return (
                <Link key={l.href} href={l.href} style={{
                  fontFamily: font, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: active ? "#2C3E6B" : "#666",
                  textDecoration: "none",
                  borderBottom: active ? "1px solid #2C3E6B" : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 150ms, border-color 150ms",
                }}
                  onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = "#111"; } }}
                  onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = "#666"; } }}
                >{l.label}</Link>
              );
            })}
            <Link href="/contact" style={{
              fontFamily: font, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#fff", background: "#111",
              padding: "0.375rem 0.875rem", textDecoration: "none",
              border: "1px solid #111",
              transition: "background 150ms, color 150ms, border-color 150ms",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#2C3E6B"; el.style.borderColor = "#2C3E6B"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#111"; el.style.borderColor = "#111"; }}
            >Contact</Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: "none", background: "none", border: "none", padding: "0.5rem", cursor: "pointer", flexDirection: "column", gap: "5px" }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <span style={{ display: "block", width: "20px", height: "1.5px", background: "#111", transition: "transform 200ms", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
              <span style={{ display: "block", width: "20px", height: "1.5px", background: "#111", opacity: menuOpen ? 0 : 1, transition: "opacity 150ms" }} />
              <span style={{ display: "block", width: "20px", height: "1.5px", background: "#111", transition: "transform 200ms", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#FFFFFF", borderTop: "1px solid #E0E0E0" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.25rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontFamily: font, fontSize: "0.875rem", color: location === l.href ? "#2C3E6B" : "#333",
                  textDecoration: "none", paddingBottom: "0.75rem", borderBottom: "1px solid #F0F0F0",
                }}>{l.label}</Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 2rem 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", paddingBottom: "3rem" }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
                <LogoMark size={18} color="#A02D24" />
                <span style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>The Ashby Institute</span>
              </div>
              <p style={{ fontFamily: font, fontSize: "0.8rem", fontStyle: "italic", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 0.5rem", fontWeight: 300 }}>
                "Every good regulator of a system must be a model of that system."
              </p>
              <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)", margin: 0 }}>— W. Ross Ashby & Roger Conant, 1970</p>
            </div>

            {/* Research */}
            <div>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem", marginTop: 0 }}>Research</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {["Compute Futures", "Compute Governance", "Good Regulator Project", "Compute & Society"].map(item => (
                  <Link key={item} href="/research" style={{ fontFamily: font, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 300, transition: "color 150ms" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
                  >{item}</Link>
                ))}
              </div>
            </div>

            {/* Institute */}
            <div>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem", marginTop: 0 }}>Institute</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {[
                  { label: "The Theory", href: "/theory" },
                  { label: "Fellows", href: "/fellows" },
                  { label: "Publications", href: "/publications" },
                  { label: "Events", href: "/events" },
                  { label: "About", href: "/about" },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ fontFamily: font, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 300, transition: "color 150ms" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
                  >{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem", marginTop: 0 }}>Connect</p>
              <p style={{ fontFamily: font, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "1.25rem", fontWeight: 300 }}>
                Research updates, event notices, and new publications. No promotional content.
              </p>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "0.4rem 0.875rem",
                textDecoration: "none", transition: "border-color 150ms, color 150ms",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2C3E6B"; el.style.color = "#8BA3D4"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.25)"; el.style.color = "#fff"; }}
              >Subscribe →</Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid #1A1A1A", padding: "1.5rem 0 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: font, fontSize: "0.58rem", color: "rgba(255,255,255,0.18)", fontWeight: 300 }}>
              © 2026 The Ashby Institute. Independent nonprofit research organization.
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[{ label: "Independence Policy", href: "/about" }, { label: "Contact", href: "/contact" }].map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.18)",
                  textDecoration: "none", transition: "color 150ms",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.18)"}
                >{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
