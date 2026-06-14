/**
 * Events.tsx — TAI Events page
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const EVENTS = [
  {
    code: "SYM",
    title: "The Ashby Symposium",
    subtitle: "Annual Flagship Conference",
    cadence: "Annual — rotating DC / London / Singapore",
    nextEdition: "2027 (inaugural)",
    audience: "Invitation-only for symposium sessions. GRT Lecture is open to the public.",
    description: "The Ashby Symposium is TAI's flagship annual convening. It brings together researchers, policymakers, and practitioners working on the structural governance of complex systems — with particular emphasis on compute infrastructure, AI alignment, and the institutional design challenges posed by the compute transition.",
    sessions: [
      "Plenary: State of the Variety Constraint — annual structural assessment across TAI's research domains",
      "Working Group I: Compute Governance — regulatory architecture for AI-native infrastructure",
      "Working Group II: Alignment & Control — technical and institutional approaches to the control problem",
      "Working Group III: Compute & Society — distributional and democratic implications of compute concentration",
      "Public Evening Lecture: The GRT Lecture (open to all)",
    ],
    format: "Two-day closed symposium with invited participants. Plenary sessions, working groups, and a public evening lecture. Proceedings published as a TAI working paper series.",
    bg: "#0A0C0F",
    textColor: "#E8E4DC",
    mutedColor: "#5A5550",
    borderColor: "#1E2228",
  },
  {
    code: "CPW",
    title: "Constitutional Period Workshop",
    subtitle: "Biannual Working Workshop",
    cadence: "Biannual — Washington, DC and London",
    nextEdition: "Spring 2027 (inaugural)",
    audience: "Invitation-only. Government, regulatory bodies, standards organizations, civil society. No commercial AI company representatives.",
    description: "The Constitutional Period Workshop takes its name from the concept of a 'constitutional moment' — a period in which the foundational rules of a system are being written and can still be shaped. TAI convenes this workshop at the inflection points of the compute transition, bringing together the practitioners who are actually writing the rules: regulators, standards bodies, procurement officials, and senior technical staff.",
    sessions: [
      "Morning: Current state of compute governance — regulatory gaps, emerging frameworks, and enforcement challenges",
      "Afternoon: Scenario stress-testing — how do current governance frameworks perform under each Compute 2030 scenario?",
      "Closing: Structural recommendations — what changes to regulatory architecture would most improve variety matching?",
    ],
    format: "One-day closed working workshop. Small group (15–25 participants). Chatham House rules apply. Designed for frank discussion among practitioners.",
    bg: "#F5F2EC",
    textColor: "#1A1410",
    mutedColor: "#6A6560",
    borderColor: "#D8D4CC",
  },
  {
    code: "GRT",
    title: "GRT Lecture Series",
    subtitle: "Public Lecture Series",
    cadence: "Quarterly — DC (primary); London and Singapore annually",
    nextEdition: "Autumn 2026 (inaugural)",
    audience: "Open to the public. Free admission. Registration required for capacity management.",
    description: "The Good Regulator Theorem Lecture Series is TAI's primary public engagement program. Each lecture applies Ashby's Law and the Good Regulator Theorem to a specific domain — from AI alignment to financial regulation, from democratic governance to autonomous systems. Lectures are designed to be accessible to a broad audience while maintaining intellectual rigor.",
    sessions: [
      "Inaugural Lecture: 'The Variety Deficit: Why Every Regulatory Failure Has the Same Root Cause'",
      "Lecture II: 'The Alignment Problem as a Variety Problem: What Ashby Tells Us About Superintelligence'",
      "Lecture III: 'The 2008 Financial Crisis as a Regulatory Variety Failure'",
      "Lecture IV: 'Democratic Governance in the Age of Compute Concentration'",
    ],
    format: "Single public lecture followed by moderated Q&A. Lectures are recorded and published on the TAI website. Transcripts published as TAI lecture notes.",
    bg: "#111318",
    textColor: "#E8E4DC",
    mutedColor: "#5A5550",
    borderColor: "#1E2228",
  },
];

export default function Events() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Events
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F0EDE6", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Convenings & Lectures
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "600px" }}>
              TAI convenes three programs: an annual flagship symposium, a biannual practitioner workshop, and a quarterly public lecture series. All events are organized around the structural application of Ashby's Law to governance design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── EVENT OVERVIEW STRIP ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "#D8D4CC" }}>
            {EVENTS.map((ev, i) => (
              <Reveal key={ev.code} delay={i * 60}>
                <div style={{ background: "#FDFBF7", padding: "1.5rem 1.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.35)", padding: "0.2rem 0.5rem" }}>
                      {ev.code}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1rem", color: "#1A1410", marginBottom: "0.35rem" }}>
                    {ev.title}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#8A8580", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                    {ev.cadence}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#8B1A14", letterSpacing: "0.06em" }}>
                    Next: {ev.nextEdition}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS DETAIL ── */}
      {EVENTS.map((ev) => (
        <section key={ev.code} style={{ background: ev.bg, borderBottom: `1px solid ${ev.borderColor}` }}>
          <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left metadata rail */}
              <Reveal className="lg:col-span-4">
                <div style={{ position: "sticky", top: "7rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.35)", padding: "0.2rem 0.5rem", display: "inline-block", marginBottom: "1.5rem" }}>
                    {ev.code}
                  </span>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)", color: ev.textColor, lineHeight: 1.2, marginBottom: "0.5rem" }}>
                    {ev.title}
                  </h2>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#8B1A14", textTransform: "uppercase", marginBottom: "2rem" }}>
                    {ev.subtitle}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[
                      { label: "Cadence", value: ev.cadence },
                      { label: "Next Edition", value: ev.nextEdition },
                      { label: "Audience", value: ev.audience },
                    ].map(item => (
                      <div key={item.label}>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.35rem" }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: ev.mutedColor, lineHeight: 1.6 }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <a
                      href="mailto:events@theashbyinstitute.org"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8B1A14",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(139,26,20,0.4)",
                        paddingBottom: "1px",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(139,26,20,0.4)")}
                    >
                      Inquire about attendance →
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right content */}
              <Reveal className="lg:col-span-8" delay={120}>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: ev.textColor, lineHeight: 1.78, marginBottom: "2.5rem", opacity: 0.85 }}>
                  {ev.description}
                </p>

                <div style={{ marginBottom: "2rem" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "1.25rem" }}>
                    Program Structure
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {ev.sessions.map((session, i) => (
                      <div key={i} style={{ display: "flex", gap: "1.25rem", paddingTop: "0.875rem", paddingBottom: "0.875rem", borderTop: `1px solid ${ev.borderColor}`, alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#8B1A14", minWidth: "1.25rem", flexShrink: 0, marginTop: "0.2rem" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: ev.mutedColor, lineHeight: 1.6 }}>
                          {session}
                        </p>
                      </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${ev.borderColor}` }} />
                  </div>
                </div>

                <div style={{ borderLeft: "3px solid rgba(139,26,20,0.4)", paddingLeft: "1.5rem" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.5rem" }}>
                    Format
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: ev.mutedColor, lineHeight: 1.65 }}>
                    {ev.format}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Stay Informed
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1A1410", lineHeight: 1.2, marginBottom: "1rem" }}>
                Event Announcements & Registration
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#6A6560", lineHeight: 1.7, marginBottom: "2rem" }}>
                Subscribe to receive event announcements, registration information, and published lecture recordings. For invitation-only events, inquiries are handled through the contact page.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F0EDE6", background: "#8B1A14", border: "1px solid #8B1A14",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms",
                  display: "inline-flex", alignItems: "center",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                >
                  Subscribe to Updates
                </Link>
                <a href="mailto:events@theashbyinstitute.org" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#2A2620", background: "transparent", border: "1px solid #2A2620",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms, color 200ms",
                  display: "inline-flex", alignItems: "center",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#2A2620"; e.currentTarget.style.color = "#F5F2EC"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2A2620"; }}
                >
                  Event Inquiries
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
