/**
 * Layout.tsx — TAI Inner Page Shell
 * Design: GI-clone border grid system
 * White background, 1px solid #111 borders, Chakra Petch, slate blue #2C3E6B accent
 * No crimson. No gradients. No rounded corners.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const BORDER = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";

const NAV_LINKS = [
  { href: "/theory", label: "THEORY" },
  { href: "/research", label: "RESEARCH" },
  { href: "/fellows", label: "FELLOWS" },
  { href: "/publications", label: "PUBLICATIONS" },
  { href: "/events", label: "EVENTS" },
  { href: "/about", label: "ABOUT" },
];

export function LogoMark({ size = 24, color = SLATE }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 5 A11 11 0 0 1 27 16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M27 16 A11 11 0 0 1 16 27" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M16 27 A11 11 0 0 1 5 16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M5 16 A11 11 0 0 1 16 5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <polygon points="16,3 18.2,7 13.8,7" fill={color}/>
    </svg>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <div style={{ fontFamily: FONT, background: "#fff", color: "#111", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── NAV — GI-style border grid ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "stretch",
        height: 52,
        borderBottom: BORDER,
        background: "#fff",
      }}>
        {/* Logo cell */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0 20px", borderRight: BORDER, textDecoration: "none", flexShrink: 0,
        }}>
          <LogoMark size={22} color={SLATE} />
          <span style={{ fontSize: 9, letterSpacing: "0.14em", fontWeight: 600, color: "#111" }}>
            THE ASHBY INSTITUTE
          </span>
        </Link>

        {/* Nav links — right side */}
        <div style={{ display: "flex", alignItems: "stretch", marginLeft: "auto" }}>
          {NAV_LINKS.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", padding: "0 16px",
                borderLeft: BORDER,
                fontSize: 9, letterSpacing: "0.12em", fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                color: isActive ? SLATE : "#555",
                borderBottom: isActive ? `2px solid ${SLATE}` : "2px solid transparent",
                transition: "color 0.15s, border-color 0.15s",
              }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#111"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#555"; }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Contact CTA — filled cell */}
          <Link href="/contact" style={{
            display: "flex", alignItems: "center", padding: "0 20px",
            borderLeft: BORDER,
            fontSize: 9, letterSpacing: "0.12em",
            textDecoration: "none", color: "#fff", background: "#111",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >
            CONTACT
          </Link>
        </div>
      </header>

      {/* ── MAIN — offset for fixed nav ── */}
      <main style={{ flex: 1, paddingTop: 52 }}>
        {children}
      </main>

      {/* ── FOOTER — border grid ── */}
      <footer style={{ borderTop: BORDER }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}>

          {/* Brand */}
          <div style={{ padding: "40px 32px", borderRight: BORDER }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <LogoMark size={20} color={SLATE} />
              <span style={{ fontSize: 8, letterSpacing: "0.14em", fontWeight: 600 }}>THE ASHBY INSTITUTE</span>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.75, color: "#555", fontStyle: "italic", margin: "0 0 8px" }}>
              "Every good regulator of a system must be a model of that system."
            </p>
            <p style={{ fontSize: 10, color: "#888", margin: 0 }}>— W. Ross Ashby & Roger Conant, 1970</p>
            <p style={{ fontSize: 10, color: "#888", marginTop: 20, lineHeight: 1.6 }}>
              Independent nonprofit research organization.<br />
              Washington D.C. · London · Singapore
            </p>
          </div>

          {/* Research */}
          <div style={{ padding: "40px 28px", borderRight: BORDER }}>
            <p style={{ fontSize: 8, letterSpacing: "0.16em", color: SLATE, marginBottom: 16, marginTop: 0 }}>RESEARCH</p>
            {["Compute Futures", "Compute Governance", "Good Regulator Project", "Compute & Society"].map(item => (
              <Link key={item} href="/research" style={{
                display: "block", fontSize: 11, color: "#555",
                textDecoration: "none", marginBottom: 10, lineHeight: 1.4,
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#111"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#555"}
              >{item}</Link>
            ))}
          </div>

          {/* Institute */}
          <div style={{ padding: "40px 28px", borderRight: BORDER }}>
            <p style={{ fontSize: 8, letterSpacing: "0.16em", color: SLATE, marginBottom: 16, marginTop: 0 }}>INSTITUTE</p>
            {[
              { label: "The Theory", href: "/theory" },
              { label: "Fellows", href: "/fellows" },
              { label: "Publications", href: "/publications" },
              { label: "Events", href: "/events" },
              { label: "About TAI", href: "/about" },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: "block", fontSize: 11, color: "#555",
                textDecoration: "none", marginBottom: 10,
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#111"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#555"}
              >{item.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div style={{ padding: "40px 28px" }}>
            <p style={{ fontSize: 8, letterSpacing: "0.16em", color: SLATE, marginBottom: 16, marginTop: 0 }}>CONTACT</p>
            {[
              "research@theashbyinstitute.org",
              "fellows@theashbyinstitute.org",
              "press@theashbyinstitute.org",
            ].map(email => (
              <a key={email} href={`mailto:${email}`} style={{
                display: "block", fontSize: 10, color: "#555",
                textDecoration: "none", marginBottom: 8,
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#111"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#555"}
              >{email}</a>
            ))}
            <Link href="/contact" style={{
              display: "inline-block", marginTop: 20,
              fontSize: 9, letterSpacing: "0.12em",
              color: "#fff", background: "#111",
              padding: "8px 16px", textDecoration: "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
            >NEWSLETTER →</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: BORDER,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 32px",
        }}>
          <span style={{ fontSize: 9, color: "#888", letterSpacing: "0.06em" }}>
            © 2026 THE ASHBY INSTITUTE · INDEPENDENT NONPROFIT RESEARCH
          </span>
          <span style={{ fontSize: 9, color: SLATE, letterSpacing: "0.1em" }}>V(R) ≥ V(D)</span>
        </div>
      </footer>
    </div>
  );
}
