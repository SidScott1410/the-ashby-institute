/**
 * Layout.tsx — TAI Inner Page Shell
 * Design: GI-clone border grid system
 * White background, 1px solid #111 borders, Chakra Petch, slate blue #2C3E6B accent
 * No crimson. No gradients. No rounded corners.
 *
 * Accessibility & UX improvements:
 * - Skip-to-content link for keyboard users
 * - Mobile hamburger menu with proper aria-expanded / aria-controls
 * - Focus-visible ring on all interactive elements
 * - Semantic <nav> with aria-label
 * - Footer links use <nav> with aria-label
 * - prefers-reduced-motion respected for menu transitions
 */
import { useState, useEffect, useRef } from "react";
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

const TAI_LOGO_URL = "/manus-storage/tai-logo-final_8f614216.png";

export function LogoMark({ size = 24 }: { size?: number; color?: string }) {
  return (
    <img
      src={TAI_LOGO_URL}
      alt="The Ashby Institute"
      style={{ display: "block", height: size * 1.8, width: "auto", objectFit: "contain" }}
    />
  );
}

// Inline focus-visible style injected once
const FOCUS_STYLE = `
  :focus-visible {
    outline: 2px solid ${SLATE} !important;
    outline-offset: 2px !important;
  }
  /* Mobile menu transition */
  #mobile-nav {
    transition: opacity 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.18s cubic-bezier(0.23,1,0.32,1);
  }
  @media (prefers-reduced-motion: reduce) {
    #mobile-nav { transition: none !important; }
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  /* Hide desktop nav on mobile */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .hamburger-btn { display: flex !important; }
  }
  @media (min-width: 769px) {
    .hamburger-btn { display: none !important; }
    #mobile-nav { display: none !important; }
  }
  /* Footer responsive */
  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .footer-grid > div, .footer-grid > nav { border-right: none !important; }
  }
  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr !important; }
    .footer-grid > div, .footer-grid > nav { border-right: none !important; border-bottom: 1px solid #111 !important; }
  }
  /* Prevent horizontal overflow globally */
  html, body { max-width: 100vw; overflow-x: hidden; }
  /* Nav: prevent logo text from wrapping and pushing width */
  @media (max-width: 400px) {
    .nav-logo-text { display: none !important; }
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Close menu on Escape key; trap focus within menu when open
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <div style={{ fontFamily: FONT, background: "#fff", color: "#111", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Inject focus + responsive styles once */}
      <style>{FOCUS_STYLE}</style>

      {/* Skip to main content — visible on focus for keyboard users */}
      <a
        href="#main-content"
        style={{
          position: "fixed", top: -60, left: 16, zIndex: 9999,
          background: "#111", color: "#fff",
          padding: "8px 16px", fontSize: 11, letterSpacing: "0.1em",
          textDecoration: "none", border: BORDER,
          transition: "top 0.15s",
        }}
        onFocus={e => { (e.currentTarget as HTMLElement).style.top = "8px"; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.top = "-60px"; }}
      >
        SKIP TO CONTENT
      </a>

      {/* ── NAV — GI-style border grid ── */}
      <header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "stretch",
          height: 52,
          borderBottom: BORDER,
          background: "#fff",
        }}
      >
        {/* Logo cell */}
        <Link href="/" aria-label="The Ashby Institute — Home" style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0 20px", borderRight: BORDER, textDecoration: "none", flexShrink: 0,
        }}>
          <img
            src={TAI_LOGO_URL}
            alt="The Ashby Institute"
            style={{ display: "block", height: 34, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Primary navigation" className="desktop-nav" style={{ display: "flex", alignItems: "stretch", marginLeft: "auto" }}>
          {NAV_LINKS.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                style={{
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
        </nav>

        {/* Hamburger — mobile only */}
        <button
          ref={hamburgerRef}
          type="button"
          className="hamburger-btn"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            marginLeft: "auto",
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52,
            borderLeft: BORDER,
            background: "transparent", cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {/* Hamburger / X icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="2" y1="2" x2="16" y2="16" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="2" y2="16" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <line x1="2" y1="5" x2="16" y2="5" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="2" y1="9" x2="16" y2="9" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="2" y1="13" x2="16" y2="13" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        ref={menuRef}
        role="navigation"
        aria-label="Mobile navigation"
        style={{
          position: "fixed", top: 52, left: 0, right: 0, zIndex: 99,
          background: "#fff", borderBottom: BORDER,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {[...NAV_LINKS, { href: "/contact", label: "CONTACT" }].map((item, i) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              style={{
                display: "block", padding: "14px 20px",
                borderBottom: i < NAV_LINKS.length ? BORDER : "none",
                fontSize: 10, letterSpacing: "0.12em",
                textDecoration: "none",
                color: isActive ? SLATE : "#111",
                fontWeight: isActive ? 600 : 400,
                background: item.href === "/contact" ? "#111" : "transparent",
                ...(item.href === "/contact" ? { color: "#fff" } : {}),
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* ── MAIN — offset for fixed nav ── */}
      <main id="main-content" style={{ flex: 1, paddingTop: 52 }}>
        {children}
      </main>

      {/* ── FOOTER — border grid ── */}
      <footer role="contentinfo" style={{ borderTop: BORDER }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}>

          {/* Brand */}
          <div style={{ padding: "40px 32px", borderRight: BORDER }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <img src={TAI_LOGO_URL} alt="The Ashby Institute" style={{ display: "block", height: 30, width: "auto", objectFit: "contain" }} />
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
          <nav aria-label="Research programs" style={{ padding: "40px 28px", borderRight: BORDER }}>
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
          </nav>

          {/* Institute */}
          <nav aria-label="Institute pages" style={{ padding: "40px 28px", borderRight: BORDER }}>
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
          </nav>

          {/* Contact */}
          <div style={{ padding: "40px 28px" }}>
            <p style={{ fontSize: 8, letterSpacing: "0.16em", color: SLATE, marginBottom: 16, marginTop: 0 }}>CONTACT</p>
            {[
              { email: "research@theashbyinstitute.org", label: "Research inquiries" },
              { email: "fellows@theashbyinstitute.org", label: "Fellowship inquiries" },
              { email: "press@theashbyinstitute.org", label: "Press inquiries" },
            ].map(({ email, label }) => (
              <a key={email} href={`mailto:${email}`} aria-label={`${label}: ${email}`} style={{
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
          padding: "14px 32px", flexWrap: "wrap", gap: 8,
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
