/**
 * Publications.tsx — TAI Publications
 * Design: GI-clone border grid system
 * White background, 1px solid #111 borders, Chakra Petch, slate blue accent
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";

const SERIES = [
  { id: "all", label: "ALL" },
  { id: "compute-2030", label: "COMPUTE 2030" },
  { id: "governance-annual", label: "GOVERNANCE ANNUAL" },
  { id: "grt-lectures", label: "GRT LECTURES" },
  { id: "equity-index", label: "EQUITY INDEX" },
  { id: "working-papers", label: "WORKING PAPERS" },
  { id: "policy-briefs", label: "POLICY BRIEFS" },
];

const PUBLICATIONS = [
  {
    series: "compute-2030",
    seriesLabel: "COMPUTE 2030",
    date: "JUNE 2026",
    title: "Compute 2030: Four Scenarios for the Compute Transition",
    authors: "TAI Research Staff",
    abstract: "Four structural scenarios for the compute transition through 2030, analyzed through the lens of Ashby's Law of Requisite Variety.",
    href: "https://theashbyinstitute.manus.space",
    external: true,
    featured: true,
  },
  {
    series: "grt-lectures",
    seriesLabel: "GRT LECTURE SERIES",
    date: "FORTHCOMING 2026",
    title: "The Good Regulator Theorem: Mathematical Foundations and Governance Implications",
    authors: "Inaugural GRT Lecture",
    abstract: "A rigorous exposition of Conant and Ashby's 1970 theorem and its implications for the design of regulatory institutions in the age of AI.",
    href: "/publications",
    external: false,
    featured: false,
  },
  {
    series: "working-papers",
    seriesLabel: "WORKING PAPER",
    date: "FORTHCOMING 2026",
    title: "Variety Deficits in AI Governance: A Structural Analysis",
    authors: "TAI Research Staff",
    abstract: "An application of Ashby's Law to current AI governance frameworks, identifying structural variety deficits in existing regulatory architectures.",
    href: "/publications",
    external: false,
    featured: false,
  },
  {
    series: "policy-briefs",
    seriesLabel: "POLICY BRIEF",
    date: "FORTHCOMING 2026",
    title: "Compute Export Controls and the Good Regulator Theorem",
    authors: "TAI Research Staff",
    abstract: "Applies the GRT to the design of compute export control regimes, arguing that effective controls require regulatory bodies to model the full variety of compute applications.",
    href: "/publications",
    external: false,
    featured: false,
  },
  {
    series: "equity-index",
    seriesLabel: "COMPUTE EQUITY INDEX",
    date: "FORTHCOMING Q4 2026",
    title: "Compute Equity Index 2026: Inaugural Edition",
    authors: "TAI Research Staff",
    abstract: "The inaugural edition of TAI's annual index measuring the distributional effects of the compute transition across geographies, sectors, and demographic groups.",
    href: "/publications",
    external: false,
    featured: false,
  },
  {
    series: "governance-annual",
    seriesLabel: "GOVERNANCE ANNUAL",
    date: "FORTHCOMING 2027",
    title: "Compute Governance Annual 2026",
    authors: "TAI Research Staff",
    abstract: "Annual review of developments in compute governance, analyzing regulatory actions, international agreements, and institutional developments through the lens of Ashby's Law.",
    href: "/publications",
    external: false,
    featured: false,
  },
];

export default function Publications() {
  const [activeSeries, setActiveSeries] = useState("all");

  const filtered = activeSeries === "all"
    ? PUBLICATIONS
    : PUBLICATIONS.filter(p => p.series === activeSeries);

  return (
    <Layout>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>PUBLICATIONS</p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              Publications
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: 0 }}>
              TAI publishes across six series: annual scenario reports, governance reviews, lecture transcripts, equity indices, working papers, and policy briefs. All publications are open access. No paywalls. No embargoes.
            </p>
          </div>
          <div style={{ position: "relative", minHeight: 280 }}>
            <AsciiCanvas sim="reaction-diffusion" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>REACTION-DIFFUSION · PATTERN FORMATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: COMPUTE 2030 */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "56px 48px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>FEATURED · COMPUTE 2030 · JUNE 2026</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.0 }}>
              Compute 2030
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              TAI's inaugural annual scenario report. Four structural scenarios for the compute transition through 2030, each analyzed through the lens of Ashby's Law.
            </p>
            <blockquote style={{ borderLeft: "3px solid #2C3E6B", paddingLeft: 20, margin: "0 0 32px", fontStyle: "italic" }}>
              <p style={{ fontFamily: FONT, fontSize: 12, color: "#555", lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
                "The question is not whether compute will reshape the world. The question is whether our regulatory institutions will have sufficient variety to absorb the disturbances it introduces."
              </p>
            </blockquote>
            <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#fff", background: "#111", padding: "14px 24px", textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#2C3E6B"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
            >READ THE FULL REPORT →</a>
          </div>
          <div style={{ padding: "56px 48px" }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: "#888", marginBottom: 20, marginTop: 0 }}>FOUR SCENARIOS</p>
            {[
              { n: "I", title: "Concentrated Dominance", desc: "State tension increasing on frontier compute." },
              { n: "II", title: "Multilateral Fragmentation", desc: "Competing national compute blocs." },
              { n: "III", title: "Governed Transition", desc: "International coordination succeeds." },
              { n: "IV", title: "Diffuse Proliferation", desc: "Democratized compute; distributed power." },
            ].map((s, i) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 16, padding: "16px 0", borderBottom: i < 3 ? B : "none" }}>
                <span style={{ fontFamily: FONT, fontSize: 9, color: "rgba(44,62,107,0.4)" }}>{s.n}</span>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{s.title}</p>
                  <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", margin: 0, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERIES FILTER */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {SERIES.map((s, i) => (
            <button key={s.id} onClick={() => setActiveSeries(s.id)} style={{
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em",
              padding: "16px 24px",
              background: activeSeries === s.id ? "#111" : "#fff",
              color: activeSeries === s.id ? "#fff" : "#555",
              border: "none",
              borderRight: i < SERIES.length - 1 ? B : "none",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { if (activeSeries !== s.id) (e.currentTarget as HTMLElement).style.color = "#111"; }}
              onMouseLeave={e => { if (activeSeries !== s.id) (e.currentTarget as HTMLElement).style.color = "#555"; }}
            >{s.label}</button>
          ))}
        </div>
      </section>

      {/* PUBLICATION LIST */}
      <section style={{ borderBottom: B }}>
        {filtered.map((pub, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: i < filtered.length - 1 ? B : "none" }}>
            <div style={{ padding: "32px 32px", borderRight: B }}>
              <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: SLATE, margin: "0 0 8px" }}>{pub.seriesLabel}</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0 }}>{pub.date}</p>
            </div>
            <div style={{ padding: "32px 40px", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#F9F9F9"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}
            >
              <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#111", margin: "0 0 8px", lineHeight: 1.4 }}>
                {pub.external ? (
                  <a href={pub.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
                  >{pub.title}</a>
                ) : pub.title}
              </h3>
              <p style={{ fontFamily: FONT, fontSize: 10, color: "#888", margin: "0 0 12px" }}>{pub.authors}</p>
              <p style={{ fontFamily: FONT, fontSize: 12, color: "#555", lineHeight: 1.7, margin: "0 0 16px", fontWeight: 300 }}>{pub.abstract}</p>
              {pub.external && (
                <a href={pub.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: SLATE, textDecoration: "none", borderBottom: "1px solid #2C3E6B" }}>READ →</a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* OPEN ACCESS POLICY */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "56px 48px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>OPEN ACCESS POLICY</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              No Paywalls.<br />No Embargoes.
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              All TAI publications are released under open access terms. Research that is publicly relevant should be publicly available. TAI does not accept publication fees, embargo agreements, or any arrangement that restricts access to its research outputs.
            </p>
          </div>
          <div style={{ padding: "56px 48px" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>PUBLICATION SERIES</p>
            {[
              { title: "Compute 2030", desc: "Annual scenario report on the compute transition" },
              { title: "Compute Governance Annual", desc: "Annual review of compute governance developments" },
              { title: "GRT Lecture Series", desc: "Transcripts and papers from the lecture series" },
              { title: "Compute Equity Index", desc: "Annual distributional analysis" },
              { title: "Working Papers", desc: "Research in progress and preliminary findings" },
              { title: "Policy Briefs", desc: "Concise policy-relevant analysis" },
            ].map((s, i) => (
              <div key={s.title} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: i < 5 ? B : "none" }}>
                <span style={{ fontFamily: FONT, fontSize: 9, color: "rgba(44,62,107,0.4)", minWidth: 24 }}>0{i + 1}</span>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: "#111", margin: "0 0 2px" }}>{s.title}</p>
                  <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", margin: 0, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "flex" }}>
          <a href="https://theashbyinstitute.manus.space" target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#fff", background: "#111", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#2C3E6B"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >READ COMPUTE 2030 →</a>
          <Link href="/research" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#2C3E6B"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >RESEARCH PROGRAMS</Link>
          <Link href="/fellows" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#2C3E6B"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >FELLOWS</Link>
        </div>
      </section>
    </Layout>
  );
}
