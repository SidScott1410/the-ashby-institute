/**
 * Layout.tsx — TAI Site Layout
 * Design: The Monograph — Swiss typographic editorial
 * Header: transparent → #0F1419/95 on scroll (dark hero pages), or always opaque warm-white (light pages)
 * Footer: dark #0F1419 with warm off-white text
 * Logo: inline SVG feedback-loop mark in crimson
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const NAV_LINKS = [
  { href: "/research", label: "Research" },
  { href: "/fellows", label: "Fellows" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Inline SVG: two arcs forming a closed feedback cycle, crimson stroke
function LogoMark({ color = "#A02D24", size = 32 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top arc: left to right, clockwise */}
      <path
        d="M 8 20 A 12 12 0 0 1 32 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead at end of top arc (right side) */}
      <polyline
        points="28,14 32,20 26,21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom arc: right to left, clockwise */}
      <path
        d="M 32 20 A 12 12 0 0 1 8 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead at end of bottom arc (left side) */}
      <polyline
        points="12,26 8,20 14,19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export { LogoMark };

export default function Layout({ children, darkHero = false }: { children: React.ReactNode; darkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isTransparent = darkHero && !scrolled;

  const headerBg = darkHero
    ? scrolled
      ? "bg-[#0F1419]/95 backdrop-blur-sm border-b border-[#2A2F36]"
      : "bg-transparent"
    : "bg-[#FAF8F5] border-b border-[#D4CFC9]";

  const textColor = isTransparent ? "text-[#F0EDE8]" : "text-[#1A1714]";
  const logoColor = isTransparent ? "#F0EDE8" : "#A02D24";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <LogoMark color={logoColor} size={28} />
              <span
                className={`font-['Fraunces'] font-bold text-lg tracking-tight transition-colors duration-300 ${textColor}`}
              >
                The Ashby Institute
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-['Inter'] text-sm font-medium transition-colors duration-150 hover:text-[#A02D24] relative group ${
                    location === link.href ? "text-[#A02D24]" : textColor
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#A02D24] transition-all duration-150 ${
                      location === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden flex flex-col gap-1.5 p-1 ${textColor}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`block w-5 h-px bg-current transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0F1419] border-t border-[#2A2F36]">
            <nav className="container py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-['Inter'] text-sm font-medium text-[#F0EDE8] hover:text-[#A02D24] transition-colors duration-150 ${
                    location === link.href ? "text-[#A02D24]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0F1419] text-[#F0EDE8]">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <LogoMark color="#A02D24" size={24} />
                <span className="font-['Fraunces'] font-bold text-base text-[#F0EDE8]">
                  The Ashby Institute
                </span>
              </div>
              <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] leading-relaxed italic">
                "Every good regulator of a system must be a model of that system."
              </p>
              <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] mt-1">
                — W. Ross Ashby, 1970
              </p>
            </div>

            {/* Research */}
            <div>
              <p className="tai-label text-[#A02D24] mb-4">Research</p>
              <ul className="space-y-2">
                {["Compute Futures", "Compute Governance", "The Good Regulator Project", "Compute & Society"].map((item) => (
                  <li key={item}>
                    <Link href="/research" className="font-['Inter'] text-sm text-[#9A9490] hover:text-[#F0EDE8] transition-colors duration-150">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institute */}
            <div>
              <p className="tai-label text-[#A02D24] mb-4">Institute</p>
              <ul className="space-y-2">
                {[
                  { label: "Fellows", href: "/fellows" },
                  { label: "Publications", href: "/publications" },
                  { label: "Events", href: "/events" },
                  { label: "About", href: "/about" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="font-['Inter'] text-sm text-[#9A9490] hover:text-[#F0EDE8] transition-colors duration-150">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="tai-label text-[#A02D24] mb-4">Newsletter</p>
              <p className="font-['Inter'] text-sm text-[#9A9490] mb-4 leading-relaxed">
                Receive TAI research updates, event notices, and new publications.
              </p>
              <Link href="/contact" className="tai-btn-ghost-light text-xs">
                Subscribe
              </Link>
            </div>
          </div>

          <div className="border-t border-[#2A2F36] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560]">
              © {new Date().getFullYear()} The Ashby Institute. Independent nonprofit research organization.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] hover:text-[#9A9490] transition-colors">
                Independence Policy
              </Link>
              <Link href="/contact" className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] hover:text-[#9A9490] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
