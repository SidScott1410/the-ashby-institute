/*
 * Events.tsx — TAI Events v4 — Clean Institutional White
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const EVENTS_DATA = [
  {
    code: "TAS",
    title: "The Ashby Symposium",
    cadence: "Annual",
    locations: "Rotating — Washington DC / London / Singapore",
    next: "Autumn 2026 — Washington DC",
    format: "Two-day convening",
    desc: "The Ashby Symposium is TAI\'s flagship annual convening. It brings together researchers, policymakers, and practitioners working on the governance of complex systems — with a particular focus on the compute transition and its structural implications. The Symposium is organized around TAI\'s four research programs and features keynote lectures, structured workshops, and working sessions on current research.",
    features: [
      "Keynote lecture by a leading researcher in systems governance",
      "Four program workshops — one per TAI research program",
      "Policy roundtable with government and regulatory participants",
      "Ashby Fellowship cohort presentations",
      "Working sessions on current TAI research projects",
    ],
    audience: "By invitation and open application. Approximately 80–120 participants.",
  },
  {
    code: "CPW",
    title: "Constitutional Period Workshop",
    cadence: "Biannual",
    locations: "Washington DC and Brussels (alternating)",
    next: "Spring 2027 — Brussels",
    format: "One-day intensive workshop",
    desc: "The Constitutional Period Workshop is a focused, practitioner-oriented workshop on the governance of AI infrastructure during what TAI calls the \'constitutional period\' — the window in which the institutional frameworks governing AI-native compute are being established. The workshop applies TAI\'s analytical framework directly to current policy and regulatory questions, with a focus on actionable institutional design.",
    features: [
      "Structured analysis of current governance proposals using TAI\'s framework",
      "Working sessions with government and regulatory participants",
      "Presentation of TAI\'s current policy brief series",
      "Closed working dinner for senior participants",
    ],
    audience: "Invitation-only. Approximately 30–40 senior participants from government, regulatory bodies, and research institutions.",
  },
  {
    code: "GRTL",
    title: "GRT Lecture Series",
    cadence: "Annual",
    locations: "Rotating — TAI partner institutions",
    next: "Autumn 2026 — London",
    format: "Public lecture + seminar",
    desc: "The Good Regulator Theorem Lecture Series is an annual public lecture series on the theoretical foundations and contemporary applications of the Good Regulator Theorem. Each year, TAI invites a leading researcher to deliver a lecture on a topic at the intersection of systems theory and governance. The lecture is followed by a closed seminar for TAI fellows and invited researchers.",
    features: [
      "Public lecture by an invited researcher",
      "Published lecture text in TAI\'s GRT Lecture Series",
      "Closed seminar for TAI fellows and invited researchers",
      "Reception for lecture attendees",
    ],
    audience: "Public lecture is open to all. Seminar is by invitation. Approximately 150–200 lecture attendees.",
  },
];

export default function Events() {
  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Events</p>
            <h1 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              Three convenings. One analytical framework.
            </h1>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              TAI\'s events are designed to translate rigorous structural analysis into policy-relevant engagement. Each convening applies TAI\'s analytical framework to current governance problems.
            </p>
          </Reveal>
        </div>
      </section>

      {EVENTS_DATA.map((ev, i) => (
        <section key={ev.code} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
              <Reveal>
                <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{ev.code}</p>
                <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1.5rem" }}>{ev.title}</h2>
                <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.5rem" }}>{ev.desc}</p>
                <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#888888", lineHeight: 1.7 }}><strong style={{ color: "#555555", fontWeight: 500 }}>Audience:</strong> {ev.audience}</p>
              </Reveal>
              <Reveal delay={100}>
                <div style={{ border: "1px solid #E5E4E0", padding: "2rem", background: i % 2 === 0 ? "#FAFAF8" : "#FFFFFF", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Event Details</p>
                  {[{ label: "Cadence", value: ev.cadence }, { label: "Locations", value: ev.locations }, { label: "Next Edition", value: ev.next }, { label: "Format", value: ev.format }].map(item => (
                    <div key={item.label} style={{ display: "flex", gap: "1rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", borderBottom: "1px solid #E5E4E0" }}>
                      <span style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#AAAAAA", minWidth: "90px", paddingTop: "0.1rem" }}>{item.label}</span>
                      <span style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ border: "1px solid #E5E4E0", padding: "2rem", background: i % 2 === 0 ? "#FAFAF8" : "#FFFFFF" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Program Features</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {ev.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#A02D24", fontSize: "0.75rem", paddingTop: "0.15rem", flexShrink: 0 }}>→</span>
                        <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555", lineHeight: 1.65 }}>{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: "#FFFFFF", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "600px" }}>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Stay Informed</p>
              <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1rem" }}>Event announcements and registration.</h2>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Subscribe to TAI\'s newsletter for event announcements, registration information, and updates on upcoming convenings.
              </p>
              <Link href="/contact" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", display: "inline-block", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >Subscribe to Newsletter →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
