/**
 * Fellows.tsx — TAI Fellows Programs
 * Design: GI-clone border grid system
 * White background, 1px solid #111 borders, Chakra Petch, slate blue accent
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";

const PROGRAMS = [
  {
    label: "FLAGSHIP PROGRAM",
    code: "AF",
    title: "The Ashby Fellowship",
    duration: "12 months",
    cycle: "Annual",
    applications: "Open September",
    description: "TAI's flagship competitive fellowship for early-career researchers. Fellows spend twelve months in residence developing original research applying Ashby's Law to a governance domain of their choosing — AI alignment, compute governance, financial regulation, democratic institutions, or any other domain where variety deficits are consequential.",
    eligibility: [
      "Doctoral candidates or recent PhDs (within 5 years of degree)",
      "Demonstrated capacity for formal theoretical work",
      "Research agenda relevant to TAI's eight application domains",
      "No current affiliation with commercial AI developers or compute infrastructure providers",
    ],
    benefits: [
      "Full stipend and research budget",
      "Office space at TAI",
      "Access to TAI's research networks and advisory council",
      "Publication support and policy engagement",
      "Pathway to Senior Research Fellow appointment",
    ],
  },
  {
    label: "SENIOR APPOINTMENT",
    code: "SRF",
    title: "Senior Research Fellows",
    duration: "3 years, renewable",
    cycle: "Rolling",
    applications: "By invitation and open application",
    description: "Established scholars and practitioners who contribute to TAI's research programs on a part-time basis. Senior Fellows bring deep expertise in one or more of TAI's eight application domains and contribute through publications, workshops, and advisory engagement. Senior Fellows maintain their primary institutional affiliation.",
    eligibility: [
      "Established scholars with a significant publication record",
      "Practitioners with demonstrated policy or technical expertise",
      "Researchers working in one or more of TAI's eight application domains",
      "Commitment to TAI's independence and open access principles",
    ],
    benefits: [
      "Part-time engagement and research support",
      "TAI affiliation and publication platform",
      "Access to TAI's research infrastructure",
      "Participation in TAI workshops and events",
    ],
  },
  {
    label: "SHORT-TERM RESIDENCY",
    code: "VF",
    title: "Visiting Fellows",
    duration: "3–6 months",
    cycle: "Rolling",
    applications: "Accepted year-round",
    description: "Short-term residencies for researchers who wish to spend a concentrated period working on a specific project in residence at TAI. Visiting Fellows have access to TAI's research infrastructure, library resources, and intellectual community. The program supports focused research that benefits from TAI's analytical framework and network.",
    eligibility: [
      "Researchers at any career stage",
      "Clear project proposal relevant to TAI's research agenda",
      "Ability to be in residence for the fellowship period",
      "Commitment to producing a TAI working paper or policy brief",
    ],
    benefits: [
      "Modest stipend and office access",
      "Access to TAI's research community",
      "Publication support",
      "One public seminar or lecture",
    ],
  },
  {
    label: "POLICY TRACK",
    code: "PR",
    title: "Policy Residency",
    duration: "6 months",
    cycle: "Biannual",
    applications: "Open January and July",
    description: "Designed for practitioners — government officials, regulatory staff, legislative analysts, and policy professionals — who wish to develop a deeper analytical foundation for their work on AI governance, compute policy, or related domains. Residents work alongside TAI researchers and produce a policy-relevant output applying TAI's analytical framework to a specific governance problem.",
    eligibility: [
      "Current or recent government officials, regulatory staff, or legislative analysts",
      "Policy professionals working on AI governance, compute policy, or related domains",
      "Demonstrated commitment to evidence-based policymaking",
      "No current affiliation with commercial AI developers",
    ],
    benefits: [
      "Full stipend for the residency period",
      "Access to TAI research and networks",
      "Policy output publication support",
      "Participation in TAI's Constitutional Period Workshop",
    ],
  },
];

export default function Fellows() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>
              FELLOWSHIP PROGRAMS
            </p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              Fellows
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: "0 0 32px" }}>
              TAI's fellowship programs bring together researchers, practitioners, and policymakers to develop the analytical capacity required to govern complex systems. Every program is grounded in the same premise: understanding requires modeling, and modeling requires rigor.
            </p>
            <a href="mailto:fellows@theashbyinstitute.org" style={{
              display: "inline-block",
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
              color: "#fff", background: "#111", padding: "14px 24px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
            >INQUIRE ABOUT FELLOWSHIPS →</a>
          </div>
          <div style={{ position: "relative", minHeight: 320 }}>
            <AsciiCanvas sim="boids" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>BOIDS FLOCKING · DISTRIBUTED INTELLIGENCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FELLOWSHIP PROGRAMS ── */}
      {PROGRAMS.map((prog, i) => (
        <section key={prog.code} style={{ borderBottom: B }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {/* Left: main content */}
            <div style={{ padding: "56px 48px", borderRight: B }}>
              <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>{prog.label}</p>
              <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                {prog.title}
              </h2>
              <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
                {prog.description}
              </p>
              <div style={{ display: "flex", gap: 32 }}>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 6, marginTop: 0 }}>DURATION</p>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: "#111", margin: 0, fontWeight: 600 }}>{prog.duration}</p>
                </div>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 6, marginTop: 0 }}>APPLICATIONS</p>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: "#111", margin: 0, fontWeight: 600 }}>{prog.applications}</p>
                </div>
              </div>
            </div>

            {/* Right: eligibility + benefits */}
            <div style={{ padding: "56px 48px" }}>
              <div style={{ marginBottom: 40 }}>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: "#888", marginBottom: 16, marginTop: 0 }}>ELIGIBILITY</p>
                {prog.eligibility.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: j < prog.eligibility.length - 1 ? B : "none" }}>
                    <span style={{ fontFamily: FONT, fontSize: 9, color: SLATE, opacity: 0.5, minWidth: 16 }}>—</span>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: "#555", lineHeight: 1.6, fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: "#888", marginBottom: 16, marginTop: 0 }}>BENEFITS</p>
                {prog.benefits.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 16, padding: "10px 0", borderTop: j === 0 ? B : "none", borderBottom: B }}>
                    <span style={{ fontFamily: FONT, fontSize: 9, color: SLATE, opacity: 0.5, minWidth: 16 }}>+</span>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: "#111", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CURRENT FELLOWS ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ borderBottom: B, padding: "40px 48px" }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>INAUGURAL COHORT · 2026–2027</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{
              padding: "40px 40px",
              borderRight: i % 3 !== 2 ? B : "none",
              borderBottom: i < 3 ? B : "none",
            }}>
              <div style={{ width: 48, height: 48, border: B, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: FONT, fontSize: 9, color: "#888" }}>TBA</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>To Be Announced</p>
              <p style={{ fontFamily: FONT, fontSize: 10, color: SLATE, margin: "0 0 8px" }}>Ashby Fellow 2026–2027</p>
              <p style={{ fontFamily: FONT, fontSize: 11, color: "#888", margin: 0, fontWeight: 300, lineHeight: 1.6 }}>
                TAI is currently recruiting its inaugural cohort. Announcements forthcoming.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ASHBY SYMPOSIUM ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ position: "relative", minHeight: 400, borderRight: B }}>
            <AsciiCanvas sim="network" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>REGULATORY NETWORK · COLLECTIVE INTELLIGENCE</span>
            </div>
          </div>
          <div style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>ANNUAL EVENT</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              The Ashby Symposium
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              The annual gathering of TAI's research community. Fellows present work in progress, receive structured feedback, and engage with invited scholars and practitioners. The Symposium is TAI's primary intellectual event — a working conference, not a showcase.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
              Inaugural Ashby Symposium: Washington D.C., November 2026.
            </p>
            <Link href="/events" style={{
              display: "inline-block",
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
              color: "#111", padding: "14px 24px",
              textDecoration: "none", border: B,
              transition: "background 0.15s, color 0.15s",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#111"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#111"; }}
            >VIEW ALL EVENTS →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "flex" }}>
          <a href="mailto:fellows@theashbyinstitute.org" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#fff", background: "#111", padding: "20px 32px",
            textDecoration: "none", borderRight: B,
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >APPLY FOR A FELLOWSHIP →</a>
          <Link href="/research" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none", borderRight: B,
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >RESEARCH PROGRAMS</Link>
          <Link href="/events" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >EVENTS</Link>
        </div>
      </section>
    </Layout>
  );
}
