/**
 * Publications.tsx — TAI Publications page
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 * Six publication series with expanded mandate: Ashby's Law across all domains
 */
import { useEffect, useRef, useState } from "react";
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

const SERIES = [
  {
    code: "C30",
    name: "Compute 2030",
    tagline: "Annual scenario reports on the global compute landscape",
    desc: "TAI's flagship publication series. Each annual edition produces four structural scenarios for the global compute landscape, examining how the concentration, governance, and allocation of AI-native compute infrastructure reshapes economic power, geopolitical alignment, and institutional capacity.",
    count: 1,
    domain: "Compute Futures",
  },
  {
    code: "CGA",
    name: "Compute Governance Annual",
    tagline: "Comprehensive annual review of compute governance policy",
    desc: "An annual review of developments in compute governance policy, institutional design, and international coordination mechanisms. Covers national regulatory developments, multilateral initiatives, and emerging governance frameworks across all major jurisdictions.",
    count: 0,
    domain: "Compute Governance",
  },
  {
    code: "GRT",
    name: "GRT Lecture Series",
    tagline: "Annual public lecture on the Good Regulator Theorem",
    desc: "TAI's annual public lecture series on the theoretical and applied implications of the Good Regulator Theorem. Each lecture examines a specific domain — AI alignment, financial regulation, democratic governance, autonomous systems — through the lens of Ashby's Law.",
    count: 0,
    domain: "The Good Regulator Project",
  },
  {
    code: "CEI",
    name: "Compute Equity Index",
    tagline: "Composite measure of AI compute distribution",
    desc: "A composite index tracking the distribution of AI-native compute capacity across income levels, geographies, and demographic groups. Includes full methodology documentation, underlying data, and annual trend analysis.",
    count: 0,
    domain: "Compute & Society",
  },
  {
    code: "WP",
    name: "Working Papers",
    tagline: "Research papers on specific analytical questions",
    desc: "Peer-reviewed working papers on specific analytical questions in compute governance, AI alignment, systems theory, and related domains. Working papers are published with full methodology and data. All working papers are freely available without registration.",
    count: 1,
    domain: "All Programs",
  },
  {
    code: "PB",
    name: "Policy Briefs",
    tagline: "Concise policy-oriented analysis for practitioners",
    desc: "Concise policy-oriented analysis for policymakers, regulators, and institutional practitioners. Policy briefs translate TAI's structural research into actionable frameworks. Each brief includes an executive summary, structural diagnosis, and design principles.",
    count: 1,
    domain: "All Programs",
  },
];

type Pub = {
  series: string;
  seriesCode: string;
  type: string;
  title: string;
  subtitle?: string;
  desc: string;
  date: string;
  status: "available" | "forthcoming";
  url?: string;
};

const PUBLICATIONS: Pub[] = [
  {
    series: "Compute 2030",
    seriesCode: "C30",
    type: "Annual Scenario Report",
    title: "Compute 2030: Scenarios for the AI-Native Economy",
    subtitle: "Volume I",
    desc: "TAI's inaugural publication. Four structural scenarios for the global compute landscape through 2030, examining how the concentration, governance, and allocation of AI-native compute infrastructure will reshape economic power, geopolitical alignment, and institutional capacity. Applies Ashby's Law of Requisite Variety to the governance of compute infrastructure.",
    date: "June 2026",
    status: "available",
    url: "https://theashbyinstitute.manus.space",
  },
  {
    series: "Working Papers",
    seriesCode: "WP",
    type: "Working Paper",
    title: "Infrastructure Chokepoints in the Global AI Supply Chain",
    desc: "An analysis of structural chokepoints in the global AI infrastructure supply chain — semiconductor fabrication, rare earth processing, data center construction, and energy systems — and their implications for compute concentration and geopolitical leverage. Applies the Law of Requisite Variety to questions of supply chain governance.",
    date: "Q3 2026",
    status: "forthcoming",
  },
  {
    series: "Working Papers",
    seriesCode: "WP",
    type: "Working Paper",
    title: "Variety Deficits in Financial Regulation: A Post-Crisis Analysis",
    desc: "A structural analysis of regulatory failures in financial systems through the lens of Ashby's Law. Examines the 2008 financial crisis, the 2020 market disruptions, and the emergence of algorithmic trading as successive variety deficit failures — cases where V(regulator) < V(regulated system).",
    date: "Q4 2026",
    status: "forthcoming",
  },
  {
    series: "Working Papers",
    seriesCode: "WP",
    type: "Working Paper",
    title: "The Alignment Problem as a Variety Problem: Formal Foundations",
    desc: "A formal treatment of AI alignment through the mathematical framework of Ashby's Law. Demonstrates that the alignment problem is structurally equivalent to the problem of maintaining V(oversight) ≥ V(AI system) as AI capability scales. Derives formal conditions under which human oversight becomes mathematically impossible.",
    date: "Q1 2027",
    status: "forthcoming",
  },
  {
    series: "Policy Briefs",
    seriesCode: "PB",
    type: "Policy Brief",
    title: "Toward a Multilateral Compute Governance Framework: Design Principles",
    desc: "A concise policy brief outlining design principles for a multilateral compute governance framework, drawing on precedents from nuclear governance, financial regulation, and telecommunications policy. Applies the Good Regulator Theorem to the institutional design of compute oversight bodies.",
    date: "Q4 2026",
    status: "forthcoming",
  },
  {
    series: "Policy Briefs",
    seriesCode: "PB",
    type: "Policy Brief",
    title: "Autonomous Systems Governance: A Requisite Variety Framework",
    desc: "Design principles for governing autonomous systems — self-driving vehicles, autonomous weapons, industrial robotics — derived from the Law of Requisite Variety. Argues that effective governance of autonomous systems requires regulators to maintain internal models of equivalent complexity to the systems they oversee.",
    date: "Q2 2027",
    status: "forthcoming",
  },
  {
    series: "Compute Governance Annual",
    seriesCode: "CGA",
    type: "Annual Review",
    title: "Compute Governance Annual — Volume I",
    desc: "A comprehensive annual review of developments in compute governance policy, institutional design, and international coordination mechanisms. Covers national regulatory developments, multilateral initiatives, and emerging governance frameworks. Volume I covers the period 2024–2026.",
    date: "Q4 2026",
    status: "forthcoming",
  },
  {
    series: "GRT Lecture Series",
    seriesCode: "GRT",
    type: "Lecture Transcript & Commentary",
    title: "The Good Regulator Theorem and the Design of AI Regulatory Institutions",
    subtitle: "Inaugural Lecture",
    desc: "The inaugural lecture in TAI's annual GRT Lecture Series. Examines the formal implications of Ashby and Conant's 1970 theorem for the design of AI regulatory bodies, with particular attention to the question of model adequacy in rapidly evolving technological systems. Includes full transcript and extended commentary.",
    date: "Q1 2026",
    status: "forthcoming",
  },
  {
    series: "Compute Equity Index",
    seriesCode: "CEI",
    type: "Index & Methodology Report",
    title: "Compute Equity Index: Baseline Edition — 2026",
    desc: "The baseline edition of TAI's Compute Equity Index — a composite measure tracking the distribution of AI-native compute capacity across income levels, geographies, and demographic groups. Includes full methodology documentation and underlying data. Establishes the baseline against which future editions will measure change.",
    date: "Late 2026",
    status: "forthcoming",
  },
];

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);

  const filtered = activeFilter === "All"
    ? PUBLICATIONS
    : PUBLICATIONS.filter(p => p.series === activeFilter);

  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Publications
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F0EDE6", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              TAI Publication Series
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "640px" }}>
              TAI publishes across six series. All publications are freely available. All underlying data and methodology are published alongside research outputs. No publication rights are restricted by funders.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SERIES GRID ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#1E2228" }}>
            {SERIES.map((s, i) => {
              const isActive = activeFilter === s.name;
              return (
                <Reveal key={s.code} delay={i * 40}>
                  <div
                    onClick={() => {
                      setActiveFilter(isActive ? "All" : s.name);
                      setExpandedSeries(isActive ? null : s.name);
                      setTimeout(() => document.getElementById("pub-list")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
                    }}
                    style={{
                      background: isActive ? "#0A0C0F" : "#111318",
                      padding: "1.75rem",
                      cursor: "pointer",
                      transition: "background 200ms",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderLeft: isActive ? "3px solid #8B1A14" : "3px solid transparent",
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#141820"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "#111318"; }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#8B1A14",
                        border: `1px solid ${isActive ? "#8B1A14" : "rgba(139,26,20,0.4)"}`,
                        padding: "0.2rem 0.5rem",
                      }}>
                        {s.code}
                      </span>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.55rem",
                        color: s.count > 0 ? "#5A8A5A" : "#3A3830",
                        letterSpacing: "0.04em",
                      }}>
                        {s.count > 0 ? `${s.count} available` : "Forthcoming"}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: isActive ? "#F0EDE6" : "#C8C4BC",
                      lineHeight: 1.25,
                      marginBottom: "0.5rem",
                    }}>
                      {s.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: "0.8125rem",
                      color: "#4A4540",
                      lineHeight: 1.55,
                      marginBottom: "1rem",
                      flex: 1,
                    }}>
                      {s.tagline}
                    </p>
                    <p style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.52rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#2A2820",
                    }}>
                      {s.domain}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Expanded series description */}
          {expandedSeries && (
            <div style={{ background: "#0A0C0F", padding: "2rem", borderTop: "1px solid #1E2228", marginTop: "1px" }}>
              {SERIES.filter(s => s.name === expandedSeries).map(s => (
                <div key={s.code} style={{ maxWidth: "720px" }}>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#7A7570", lineHeight: 1.75 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PUBLICATION LIST ── */}
      <section id="pub-list" style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>

          {/* Filter bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid #D8D4CC" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8580", marginRight: "0.5rem" }}>
              Filter:
            </span>
            {["All", ...SERIES.map(s => s.name)].map(f => (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setExpandedSeries(f === "All" ? null : f);
                }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: activeFilter === f ? "#F0EDE6" : "#6A6560",
                  background: activeFilter === f ? "#8B1A14" : "transparent",
                  border: `1px solid ${activeFilter === f ? "#8B1A14" : "#D8D4CC"}`,
                  padding: "0.3rem 0.65rem",
                  cursor: "pointer",
                  transition: "all 150ms",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = "#8B1A14"; e.currentTarget.style.color = "#8B1A14"; } }}
                onMouseLeave={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = "#D8D4CC"; e.currentTarget.style.color = "#6A6560"; } }}
              >
                {f === "All" ? "All" : SERIES.find(s => s.name === f)?.code ?? f}
              </button>
            ))}
          </div>

          {/* Publication rows */}
          <div>
            {filtered.map((pub, i) => (
              <Reveal key={pub.title} delay={i * 40}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  borderBottom: "1px solid #D8D4CC",
                }}>
                  <div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.35)", padding: "0.15rem 0.45rem" }}>
                        {pub.seriesCode}
                      </span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8580" }}>
                        {pub.type}
                      </span>
                      {pub.status === "available" && (
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A8A5A", border: "1px solid rgba(90,138,90,0.4)", padding: "0.15rem 0.45rem" }}>
                          Available
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "#1A1410", lineHeight: 1.25, marginBottom: "0.75rem" }}>
                      {pub.title}
                      {pub.subtitle && (
                        <em style={{ fontWeight: 400, fontStyle: "italic", color: "#6A6560", fontSize: "0.9em" }}> — {pub.subtitle}</em>
                      )}
                    </h3>
                    <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65, maxWidth: "680px" }}>
                      {pub.desc}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem", minWidth: "110px" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.06em", color: "#8A8580", whiteSpace: "nowrap" }}>
                      {pub.date}
                    </span>
                    {pub.status === "available" && pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.55rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#F0EDE6",
                          background: "#8B1A14",
                          border: "1px solid #8B1A14",
                          padding: "0.45rem 0.9rem",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          transition: "background 200ms",
                          display: "inline-block",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                      >
                        Read ↗
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#B8B4AC", border: "1px solid #D8D4CC", padding: "0.45rem 0.9rem", whiteSpace: "nowrap" }}>
                        Forthcoming
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ACCESS POLICY ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Open-Access Policy
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", color: "#E8E4DC", lineHeight: 1.2 }}>
                No Paywalls.<br />No Registration.<br />No Restrictions.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={120}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#7A7570", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                All TAI publications are freely available without registration or paywall. We do not accept restricted funding that limits publication rights. Underlying data and methodological documentation are published alongside all research outputs.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#7A7570", lineHeight: 1.78, marginBottom: "2rem" }}>
                To receive notification of new publications, subscribe to the TAI newsletter. To request advance copies of forthcoming publications for peer review, contact the research team directly.
              </p>
              <Link href="/contact" style={{
                fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.25)",
                padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
                display: "inline-flex", alignItems: "center",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.25)")}
              >
                Subscribe to Newsletter
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
