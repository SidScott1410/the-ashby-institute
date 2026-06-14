/*
 * Fellows.tsx — TAI Fellows v4
 * Design: GI-clone — Chakra Petch, white background, black typography, slate blue accent
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const font = "'Chakra Petch', 'IBM Plex Mono', monospace";
const slate = "#2C3E6B";
const black = "#111111";
const mid = "#555555";
const light = "#999999";
const border = "#E0E0E0";

const PROGRAMS = [
  {
    label: "Flagship Program",
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
    label: "Senior Appointment",
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
    label: "Short-Term Residency",
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
    label: "Policy Track",
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
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>Fellowship Programs</p>
          <h1 style={{ fontFamily: font, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Fellows
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.95rem", color: mid, lineHeight: 1.8, maxWidth: "600px", fontWeight: 300, margin: 0 }}>
            TAI's fellowship programs bring together researchers, practitioners, and policymakers to develop the analytical capacity required to govern complex systems. Every program is grounded in the same premise: understanding requires modeling, and modeling requires rigor.
          </p>
        </div>
      </section>

      {/* ── ASHBY FELLOWSHIP: 50/50 SPLIT ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "640px" }}>
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "640px" }}>
            <AsciiCanvas sim="boids" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Boids · Distributed Control Without Central Regulator</span>
            </div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Flagship · Annual</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              The Ashby Fellowship
            </h2>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 2rem", fontWeight: 300 }}>
              TAI's flagship competitive fellowship for early-career researchers. Fellows spend twelve months in residence developing original research applying Ashby's Law to a governance domain of their choosing — AI alignment, compute governance, financial regulation, democratic institutions, or any other domain where variety deficits are consequential.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: border, marginBottom: "2rem" }}>
              {[
                { label: "Duration", value: "12 months" },
                { label: "Cycle", value: "Annual" },
                { label: "Format", value: "Full residency" },
                { label: "Applications", value: "Open September" },
              ].map(item => (
                <div key={item.label} style={{ background: "#FFFFFF", padding: "1rem 1.25rem" }}>
                  <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.25rem" }}>{item.label}</p>
                  <p style={{ fontFamily: font, fontSize: "0.8rem", fontWeight: 600, color: black, margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#fff", background: black, padding: "0.75rem 1.5rem", textDecoration: "none",
              border: `1px solid ${black}`, transition: "background 150ms, border-color 150ms", width: "fit-content",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slate; el.style.borderColor = slate; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = black; el.style.borderColor = black; }}
            >Express Interest →</Link>
          </div>
        </div>
      </section>

      {/* ── OTHER PROGRAMS ── */}
      {PROGRAMS.slice(1).map((prog) => (
        <section key={prog.code} style={{ borderBottom: `1px solid ${border}` }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "400px" }}>
              <div style={{ padding: "4rem 3rem 4rem 0", borderRight: `1px solid ${border}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>{prog.label}</p>
                  <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                    {prog.title}
                  </h2>
                  <p style={{ fontFamily: font, fontSize: "0.82rem", color: mid, lineHeight: 1.85, margin: "0 0 1.75rem", fontWeight: 300 }}>
                    {prog.description}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: border }}>
                    {[
                      { label: "Duration", value: prog.duration },
                      { label: "Applications", value: prog.applications },
                    ].map(item => (
                      <div key={item.label} style={{ background: "#FFFFFF", padding: "0.875rem 1rem" }}>
                        <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.2rem" }}>{item.label}</p>
                        <p style={{ fontFamily: font, fontSize: "0.75rem", fontWeight: 600, color: black, margin: 0 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: "4rem 0 4rem 3rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: light, marginBottom: "1rem", marginTop: 0 }}>Eligibility</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {prog.eligibility.map((e, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.875rem", padding: "0.75rem 0", borderBottom: j < prog.eligibility.length - 1 ? `1px solid ${border}` : "none" }}>
                        <span style={{ fontFamily: font, fontSize: "0.5rem", color: slate, paddingTop: "0.15rem", flexShrink: 0 }}>—</span>
                        <p style={{ fontFamily: font, fontSize: "0.75rem", color: mid, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{e}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: light, marginBottom: "1rem", marginTop: 0 }}>Benefits</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {prog.benefits.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.875rem", padding: "0.75rem 0", borderBottom: j < prog.benefits.length - 1 ? `1px solid ${border}` : "none" }}>
                        <span style={{ fontFamily: font, fontSize: "0.5rem", color: slate, paddingTop: "0.15rem", flexShrink: 0 }}>+</span>
                        <p style={{ fontFamily: font, fontSize: "0.75rem", color: mid, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Inquiries</p>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: black, margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
            Interested in a Fellowship?
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.8, maxWidth: "520px", margin: "0 0 2rem", fontWeight: 300 }}>
            Fellowship inquiries and expressions of interest are welcome year-round. Formal applications open on the cycles listed above.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#fff", background: black, padding: "0.75rem 1.5rem", textDecoration: "none",
              border: `1px solid ${black}`, transition: "background 150ms, border-color 150ms",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slate; el.style.borderColor = slate; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = black; el.style.borderColor = black; }}
            >Contact TAI →</Link>
            <Link href="/research" style={{
              fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: black, background: "transparent", padding: "0.75rem 1.5rem", textDecoration: "none",
              border: `1px solid ${border}`, transition: "border-color 150ms",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = black}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = border}
            >Research Programs</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
