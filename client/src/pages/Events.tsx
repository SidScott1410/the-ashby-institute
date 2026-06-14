/*
 * Events.tsx — TAI Events v4
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

export default function Events() {
  return (
    <Layout>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>Events</p>
          <h1 style={{ fontFamily: font, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Events & Convenings
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.95rem", color: mid, lineHeight: 1.8, maxWidth: "600px", fontWeight: 300, margin: 0 }}>
            TAI convenes researchers, policymakers, and practitioners to develop shared analytical frameworks for governing complex systems. Our events are designed to produce intellectual output, not networking.
          </p>
        </div>
      </section>

      {/* THE ASHBY SYMPOSIUM — 50/50 SPLIT (content left, canvas right) */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}>
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: `1px solid ${border}` }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Annual · Flagship Event</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: black, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              The Ashby Symposium
            </h2>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 1.5rem", fontWeight: 300 }}>
              TAI's annual flagship convening. The Ashby Symposium brings together researchers, policymakers, and practitioners to examine the structural governance challenges of the compute transition through the lens of Ashby's Law. Each edition focuses on a specific domain or cross-cutting governance problem.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.85, margin: "0 0 2rem", fontWeight: 300 }}>
              The Symposium rotates annually between Washington D.C., London, and Singapore — the three primary nodes of the emerging compute governance architecture. Attendance is by invitation, with a limited number of open registrations available.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: border, marginBottom: "2rem" }}>
              {[
                { label: "Frequency", value: "Annual" },
                { label: "Format", value: "2-day convening" },
                { label: "Locations", value: "DC · London · Singapore" },
                { label: "Next Edition", value: "2027" },
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
            >Request Invitation →</Link>
          </div>
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "600px" }}>
            <AsciiCanvas sim="network" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Regulatory Network · Feedback Propagation</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONSTITUTIONAL PERIOD WORKSHOP — full-width two-column */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "420px" }}>
            <div style={{ padding: "4rem 3rem 4rem 0", borderRight: `1px solid ${border}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Biannual · Closed Workshop</p>
              <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Constitutional Period Workshop
              </h2>
              <p style={{ fontFamily: font, fontSize: "0.82rem", color: mid, lineHeight: 1.85, margin: "0 0 1.5rem", fontWeight: 300 }}>
                A closed working group convened twice yearly to examine the governance architecture of the current "constitutional period" of AI development — the window in which foundational regulatory structures are being established. The Workshop brings together a small group of researchers, legal scholars, and senior policymakers to develop concrete governance proposals.
              </p>
              <p style={{ fontFamily: font, fontSize: "0.82rem", color: mid, lineHeight: 1.85, margin: "0 0 1.75rem", fontWeight: 300 }}>
                Decisions made now will constrain the option space for decades. The Workshop applies Ashby's Law to evaluate whether proposed governance architectures have sufficient variety to regulate the systems they are designed to govern.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: border }}>
                {[
                  { label: "Frequency", value: "Biannual" },
                  { label: "Format", value: "Closed working group" },
                  { label: "Participants", value: "~20 invited" },
                  { label: "Output", value: "Working paper" },
                ].map(item => (
                  <div key={item.label} style={{ background: "#FFFFFF", padding: "0.875rem 1rem" }}>
                    <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.2rem" }}>{item.label}</p>
                    <p style={{ fontFamily: font, fontSize: "0.75rem", fontWeight: 600, color: black, margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "4rem 0 4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", color: light, marginBottom: "1.25rem", marginTop: 0 }}>Workshop Themes</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  "Minimum variety requirements for AI regulatory bodies",
                  "Treaty architecture for compute governance",
                  "Institutional design for cross-border AI oversight",
                  "The Good Regulator Theorem and democratic accountability",
                  "Compute access governance and antitrust frameworks",
                  "International standards bodies and variety adequacy",
                ].map((theme, j) => (
                  <div key={j} style={{ display: "flex", gap: "0.875rem", padding: "0.875rem 0", borderBottom: j < 5 ? `1px solid ${border}` : "none" }}>
                    <span style={{ fontFamily: font, fontSize: "0.5rem", color: slate, paddingTop: "0.15rem", flexShrink: 0 }}>—</span>
                    <p style={{ fontFamily: font, fontSize: "0.78rem", color: mid, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{theme}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRT LECTURE SERIES — 50/50 SPLIT (canvas left, content right) */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "480px" }}>
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "480px" }}>
            <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Cellular Automaton · Emergent Complexity</span>
            </div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Annual · Public Lecture</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              GRT Lecture Series
            </h2>
            <p style={{ fontFamily: font, fontSize: "0.82rem", color: mid, lineHeight: 1.85, margin: "0 0 1.75rem", fontWeight: 300 }}>
              An annual public lecture developing the formal implications of the Good Regulator Theorem for a contemporary governance problem. The GRT Lecture is TAI's primary public intellectual event — a rigorous, accessible treatment of a specific governance challenge through the lens of Ashby's formal framework.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.82rem", color: mid, lineHeight: 1.85, margin: "0 0 2rem", fontWeight: 300 }}>
              Lectures are recorded and published as part of TAI's GRT Lecture Series. The inaugural lecture will address the structural adequacy of democratic oversight mechanisms for advanced AI systems.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: border }}>
              {[
                { label: "Frequency", value: "Annual" },
                { label: "Format", value: "Public lecture" },
                { label: "Publication", value: "GRT Lecture Series" },
                { label: "Next Lecture", value: "Autumn 2026" },
              ].map(item => (
                <div key={item.label} style={{ background: "#FFFFFF", padding: "0.875rem 1rem" }}>
                  <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.2rem" }}>{item.label}</p>
                  <p style={{ fontFamily: font, fontSize: "0.75rem", fontWeight: 600, color: black, margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Stay Informed</p>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: black, margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
            Event Announcements
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.8, maxWidth: "520px", margin: "0 0 2rem", fontWeight: 300 }}>
            TAI events are announced through our research newsletter. Subscribe to receive event announcements, new publications, and research updates.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#fff", background: black, padding: "0.75rem 1.5rem", textDecoration: "none",
              border: `1px solid ${black}`, transition: "background 150ms, border-color 150ms",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slate; el.style.borderColor = slate; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = black; el.style.borderColor = black; }}
            >Subscribe to Newsletter →</Link>
            <Link href="/contact" style={{
              fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: black, background: "transparent", padding: "0.75rem 1.5rem", textDecoration: "none",
              border: `1px solid ${border}`, transition: "border-color 150ms",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = black}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = border}
            >Contact TAI</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
