/**
 * Events.tsx — TAI Events
 * Design: GI-clone border grid system
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";

const EVENTS = [
  {
    type: "ANNUAL SYMPOSIUM",
    title: "The Ashby Symposium",
    date: "NOVEMBER 2026",
    location: "Washington, D.C.",
    description: "TAI's annual research symposium. Fellows present work in progress, receive structured feedback, and engage with invited scholars and practitioners. The Symposium is TAI's primary intellectual event: a working conference, not a showcase. Attendance by invitation.",
    format: "Two-day working conference",
    audience: "TAI fellows, invited scholars, policy professionals",
    status: "UPCOMING",
  },
  {
    type: "WORKSHOP SERIES",
    title: "Constitutional Period Workshop",
    date: "QUARTERLY 2026–2027",
    location: "Washington, D.C. / London",
    description: "A series of closed workshops examining the governance challenges of the 'constitutional period,' the window in which foundational decisions about AI compute governance are being made. Each workshop focuses on a specific governance domain: compute access, export controls, international coordination, or institutional design.",
    format: "Half-day closed workshop",
    audience: "Policy professionals, regulatory staff, invited researchers",
    status: "SERIES ONGOING",
  },
  {
    type: "LECTURE SERIES",
    title: "GRT Lecture Series",
    date: "ANNUAL",
    location: "Washington, D.C. / Online",
    description: "The annual Good Regulator Theorem Lecture, delivered by a distinguished scholar or practitioner. The lecture develops the formal implications of the GRT for a specific contemporary governance problem. Lectures are recorded and published as part of TAI's GRT Lecture Series.",
    format: "Public lecture + Q&A",
    audience: "Open to the public",
    status: "INAUGURAL 2026",
  },
];

export default function Events() {
  return (
    <Layout>
      <style>{`
        @media (max-width: 640px) {
          .ev-2col { grid-template-columns: 1fr !important; }
          .ev-canvas { display: none !important; }
          .ev-text { padding: 32px 20px !important; border-right: none !important; }
          .ev-header-pad { padding: 40px 20px 32px !important; border-right: none !important; }
          .ev-cta { flex-direction: column !important; }
          .ev-cta a { border-right: none !important; border-bottom: 1px solid #111 !important; }
        }
      `}</style>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: B }}>
        <div className="ev-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="ev-header-pad" style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>EVENTS</p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              Events
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: 0 }}>
              TAI convenes three types of events: an annual symposium for the research community, a quarterly workshop series for policy professionals, and an annual public lecture. All events are designed to advance rigorous structural analysis, not to showcase or promote.
            </p>
          </div>
          <div className="ev-canvas" style={{ position: "relative", minHeight: 280 }}>
            <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>CELLULAR AUTOMATON · EMERGENT COORDINATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      {EVENTS.map((event, i) => (
        <section key={event.title} style={{ borderBottom: B }}>
          <div className="ev-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div className="ev-text" style={{ padding: "56px 48px", borderRight: B }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>{event.type}</p>
                <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", color: "#fff", background: event.status === "UPCOMING" ? "#111" : SLATE, padding: "3px 8px" }}>{event.status}</span>
              </div>
              <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                {event.title}
              </h2>
              <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
                {event.description}
              </p>
              <a href="mailto:research@theashbyinstitute.org" style={{
                display: "inline-block",
                fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
                color: "#111", padding: "12px 20px",
                textDecoration: "none", border: B,
                transition: "background 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#111"; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#111"; }}
              >INQUIRE →</a>
            </div>
            <div className="ev-text" style={{ padding: "56px 48px" }}>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 8, marginTop: 0 }}>DATE</p>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "#111", margin: 0, fontWeight: 600 }}>{event.date}</p>
              </div>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 8, marginTop: 0 }}>LOCATION</p>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "#111", margin: 0, fontWeight: 600 }}>{event.location}</p>
              </div>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 8, marginTop: 0 }}>FORMAT</p>
                <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", margin: 0, fontWeight: 300 }}>{event.format}</p>
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 8, marginTop: 0 }}>AUDIENCE</p>
                <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", margin: 0, fontWeight: 300 }}>{event.audience}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* MAILING LIST */}
      <section style={{ borderBottom: B }}>
        <div className="ev-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="ev-canvas" style={{ position: "relative", minHeight: 360, borderRight: B }}>
            <AsciiCanvas sim="lorenz" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>LORENZ ATTRACTOR · DETERMINISTIC CHAOS</span>
            </div>
          </div>
          <div className="ev-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>EVENT NOTIFICATIONS</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Stay Informed
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
              TAI's mailing list provides advance notice of events, new publications, and research updates. No promotional content. Infrequent. Unsubscribe at any time.
            </p>
            <Link href="/contact" style={{
              display: "inline-block",
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
              color: "#fff", background: "#111", padding: "14px 24px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
            >SUBSCRIBE TO UPDATES →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: B }}>
        <div className="ev-cta" style={{ display: "flex" }}>
          <Link href="/fellows" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#fff", background: "#111", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >FELLOWS →</Link>
          <Link href="/publications" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >PUBLICATIONS</Link>
          <Link href="/contact" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >CONTACT</Link>
        </div>
      </section>
    </Layout>
  );
}
