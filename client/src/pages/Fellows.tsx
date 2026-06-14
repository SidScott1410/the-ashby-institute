/**
 * Fellows.tsx — TAI Fellowship Programs page
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

const FELLOWSHIPS = [
  {
    code: "AF",
    title: "The Ashby Fellowship",
    subtitle: "Flagship Competitive Fellowship",
    duration: "12 months, renewable once",
    stipend: "Full stipend + research budget",
    cohort: "4–6 fellows per annual cohort",
    deadline: "Applications open annually in Q4",
    description: "The Ashby Fellowship is TAI's flagship competitive fellowship program. It is designed for early-career researchers who have demonstrated exceptional analytical ability and who are working on questions at the intersection of complex systems theory, AI governance, compute infrastructure, or related domains. Fellows are full-time, resident researchers at TAI for the duration of their appointment.",
    eligibility: [
      "Doctoral degree or equivalent research experience in a relevant field",
      "Demonstrated research output (publications, working papers, or equivalent)",
      "Research agenda aligned with TAI's core mandate — applying Ashby's Law to governance design",
      "Commitment to independent, non-advocacy research",
      "No current employment by a commercial AI company, semiconductor manufacturer, or cloud infrastructure provider",
    ],
    benefits: [
      "Full stipend at competitive academic rates",
      "Dedicated research budget for data, travel, and computing resources",
      "Access to TAI's research network and advisory council",
      "Publication support and editorial assistance",
      "Participation in all TAI convenings and events",
      "TAI affiliation for the duration of the fellowship",
    ],
    bg: "#0A0C0F",
    textColor: "#E8E4DC",
    mutedColor: "#5A5550",
    borderColor: "#1E2228",
  },
  {
    code: "SRF",
    title: "Senior Research Fellows",
    subtitle: "Established Scholar Appointments",
    duration: "1–3 years, non-residential",
    stipend: "Research grant + honorarium",
    cohort: "Up to 8 concurrent appointments",
    deadline: "Rolling applications; reviewed quarterly",
    description: "Senior Research Fellows are established scholars and practitioners who affiliate with TAI on a non-residential basis. They contribute to TAI's research programs through publications, participation in TAI events, and advisory engagement with the Ashby Fellowship cohort. Senior Research Fellows maintain their primary institutional affiliations.",
    eligibility: [
      "Senior academic, government, or civil society position",
      "Established publication record in a relevant field",
      "Research agenda that complements TAI's core programs",
      "No current employment by a commercial AI company, semiconductor manufacturer, or cloud infrastructure provider",
      "Commitment to TAI's independence policy for the duration of the appointment",
    ],
    benefits: [
      "TAI affiliation and use of TAI institutional identity in publications",
      "Research grant for TAI-affiliated projects",
      "Participation in TAI convenings and events",
      "Access to TAI's research network and data resources",
      "Co-publication opportunities with TAI research staff",
    ],
    bg: "#F5F2EC",
    textColor: "#1A1410",
    mutedColor: "#6A6560",
    borderColor: "#D8D4CC",
  },
  {
    code: "VF",
    title: "Visiting Fellows",
    subtitle: "Short-Term Research Appointments",
    duration: "3–6 months",
    stipend: "Project-based research grant",
    cohort: "Rolling appointments throughout the year",
    deadline: "Applications accepted on a rolling basis",
    description: "Visiting Fellowships are short-term appointments for researchers completing a specific project at TAI. They are designed for scholars who have a well-defined research question that fits within TAI's mandate and who would benefit from TAI's research environment, network, and resources for a defined period.",
    eligibility: [
      "Doctoral degree or equivalent research experience",
      "Well-defined research project with clear deliverables",
      "Project aligned with TAI's research mandate",
      "No current employment by a commercial AI company, semiconductor manufacturer, or cloud infrastructure provider",
    ],
    benefits: [
      "TAI affiliation for the duration of the visit",
      "Project-based research grant",
      "Access to TAI's research network and data resources",
      "Participation in TAI events during the visit period",
      "Publication support for project outputs",
    ],
    bg: "#111318",
    textColor: "#E8E4DC",
    mutedColor: "#5A5550",
    borderColor: "#1E2228",
  },
  {
    code: "PR",
    title: "Policy Residency",
    subtitle: "Government & Policy Practitioner Program",
    duration: "6–12 months",
    stipend: "Structured residency stipend",
    cohort: "2–3 residents per cohort",
    deadline: "Annual cohort; applications open in Q1",
    description: "The Policy Residency is designed for government officials, regulatory staff, and policy practitioners who want to engage with TAI's research in a structured way. Residents bring practitioner knowledge into TAI's research environment and contribute to the translation of TAI's structural analysis into actionable policy frameworks.",
    eligibility: [
      "Current or recent government, regulatory, or policy practitioner position",
      "Demonstrated expertise in a policy domain relevant to TAI's mandate",
      "Institutional support from the resident's home organization (where applicable)",
      "Commitment to TAI's independence policy for the duration of the residency",
    ],
    benefits: [
      "Structured research engagement with TAI's research programs",
      "Access to TAI's academic and policy network",
      "Co-authorship opportunities on TAI policy briefs",
      "Participation in all TAI convenings and events",
      "Residency stipend",
    ],
    bg: "#F5F2EC",
    textColor: "#1A1410",
    mutedColor: "#6A6560",
    borderColor: "#D8D4CC",
  },
];

export default function Fellows() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Fellows
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F0EDE6", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Fellowship Programs
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "640px" }}>
              TAI builds its research capacity primarily through fellowship programs. Four programs bring researchers, scholars, and practitioners into the Institute on fixed-term appointments, maintaining a rotating cohort of independent researchers working on the structural governance of complex systems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROGRAM OVERVIEW STRIP ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "#D8D4CC" }}>
            {FELLOWSHIPS.map((f, i) => (
              <Reveal key={f.code} delay={i * 50}>
                <div style={{ background: "#FDFBF7", padding: "1.25rem 1.5rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.35)", padding: "0.2rem 0.5rem", display: "inline-block", marginBottom: "0.75rem" }}>
                    {f.code}
                  </span>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "0.9375rem", color: "#1A1410", lineHeight: 1.3, marginBottom: "0.35rem" }}>
                    {f.title}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", color: "#8A8580", letterSpacing: "0.06em" }}>
                    {f.duration}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FELLOWSHIP DETAIL SECTIONS ── */}
      {FELLOWSHIPS.map((f) => (
        <section key={f.code} style={{ background: f.bg, borderBottom: `1px solid ${f.borderColor}` }}>
          <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left metadata rail */}
              <Reveal className="lg:col-span-4">
                <div style={{ position: "sticky", top: "7rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.35)", padding: "0.2rem 0.5rem", display: "inline-block", marginBottom: "1.5rem" }}>
                    {f.code}
                  </span>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)", color: f.textColor, lineHeight: 1.2, marginBottom: "0.5rem" }}>
                    {f.title}
                  </h2>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "#8B1A14", textTransform: "uppercase", marginBottom: "2rem" }}>
                    {f.subtitle}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[
                      { label: "Duration", value: f.duration },
                      { label: "Support", value: f.stipend },
                      { label: "Cohort Size", value: f.cohort },
                      { label: "Applications", value: f.deadline },
                    ].map(item => (
                      <div key={item.label}>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.35rem" }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: f.mutedColor, lineHeight: 1.5 }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <a
                      href="mailto:fellows@theashbyinstitute.org"
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
                      Inquire about this program →
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right content */}
              <Reveal className="lg:col-span-8" delay={120}>
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: f.textColor, lineHeight: 1.78, marginBottom: "2.5rem", opacity: 0.85 }}>
                  {f.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "1.25rem" }}>
                      Eligibility
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {f.eligibility.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: "1rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", borderTop: `1px solid ${f.borderColor}`, alignItems: "flex-start" }}>
                          <div style={{ width: "0.25rem", height: "0.25rem", background: "#8B1A14", borderRadius: "50%", flexShrink: 0, marginTop: "0.5rem" }} />
                          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: f.mutedColor, lineHeight: 1.6 }}>
                            {item}
                          </p>
                        </div>
                      ))}
                      <div style={{ borderTop: `1px solid ${f.borderColor}` }} />
                    </div>
                  </div>

                  <div>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "1.25rem" }}>
                      Benefits
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {f.benefits.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: "1rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", borderTop: `1px solid ${f.borderColor}`, alignItems: "flex-start" }}>
                          <div style={{ width: "0.25rem", height: "0.25rem", background: "#8B1A14", borderRadius: "50%", flexShrink: 0, marginTop: "0.5rem" }} />
                          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: f.mutedColor, lineHeight: 1.6 }}>
                            {item}
                          </p>
                        </div>
                      ))}
                      <div style={{ borderTop: `1px solid ${f.borderColor}` }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── APPLICATION CTA ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Applications
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "1rem" }}>
                Apply to a TAI Fellowship Program
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, marginBottom: "2rem" }}>
                TAI is committed to building a diverse, intellectually rigorous research community. We actively seek applications from researchers working on underrepresented aspects of the compute transition — particularly those examining distributional, democratic, and non-Western governance dimensions.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="mailto:fellows@theashbyinstitute.org" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F0EDE6", background: "#8B1A14", border: "1px solid #8B1A14",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms",
                  display: "inline-flex", alignItems: "center",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                >
                  fellows@theashbyinstitute.org
                </a>
                <Link href="/contact" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.25)",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
                  display: "inline-flex", alignItems: "center",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.25)")}
                >
                  Contact the Institute
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
