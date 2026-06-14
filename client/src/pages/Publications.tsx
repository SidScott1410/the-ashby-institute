/*
 * Publications.tsx — TAI Publications v4 — Clean Institutional White
 */
import { useEffect, useRef, useState } from "react";
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

const SERIES = [
  { code: "C2030", label: "Compute 2030", desc: "Annual scenario report series on the global compute landscape", color: "#A02D24" },
  { code: "CGA", label: "Compute Governance Annual", desc: "Annual review of compute governance frameworks and institutional developments", color: "#2D5A8B" },
  { code: "GRT", label: "GRT Lecture Series", desc: "Annual lecture series on the Good Regulator Theorem and its applications", color: "#2D7A3A" },
  { code: "CEI", label: "Compute Equity Index", desc: "Annual index tracking the distributional consequences of the compute transition", color: "#8B6914" },
  { code: "WP", label: "Working Papers", desc: "Pre-publication research papers from TAI fellows and researchers", color: "#555555" },
  { code: "PB", label: "Policy Briefs", desc: "Short-form policy analysis for practitioners and policymakers", color: "#555555" },
];

const PUBLICATIONS = [
  { series: "C2030", code: "C2030-01", title: "Compute 2030: Four Scenarios for the AI-Native Compute Transition", authors: "TAI Research Staff", date: "June 2026", type: "Scenario Report", url: "https://theashbyinstitute.manus.space", open: true },
  { series: "WP", code: "WP-2026-01", title: "Variety Deficits in AI Governance: A Formal Analysis", authors: "TAI Research Staff", date: "Forthcoming 2026", type: "Working Paper", url: null, open: true },
  { series: "PB", code: "PB-2026-01", title: "The Good Regulator Theorem and AI Oversight Architecture", authors: "TAI Research Staff", date: "Forthcoming 2026", type: "Policy Brief", url: null, open: true },
  { series: "GRT", code: "GRT-2026-01", title: "Inaugural GRT Lecture: Ashby\'s Law and the Limits of Democratic Oversight", authors: "TAI", date: "Forthcoming — Autumn 2026", type: "Lecture", url: null, open: true },
  { series: "CEI", code: "CEI-2026", title: "Compute Equity Index 2026: Baseline Edition", authors: "TAI Compute & Society Program", date: "Forthcoming — Q4 2026", type: "Index Report", url: null, open: true },
  { series: "CGA", code: "CGA-2026", title: "Compute Governance Annual 2026", authors: "TAI Compute Governance Program", date: "Forthcoming — Q4 2026", type: "Annual Review", url: null, open: true },
];

export default function Publications() {
  const [active, setActive] = useState("ALL");
  const filtered = active === "ALL" ? PUBLICATIONS : PUBLICATIONS.filter(p => p.series === active);

  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Publications</p>
            <h1 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              All research published open access.
            </h1>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              TAI publishes across six series — from annual scenario reports to working papers and policy briefs. All publications are freely available with no paywalls or embargoes.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.5rem" }}>Publication Series</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", border: "1px solid #E5E4E0" }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {SERIES.map((s, i) => (
              <Reveal key={s.code} delay={i * 40}>
                <button onClick={() => setActive(active === s.code ? "ALL" : s.code)} style={{ display: "block", width: "100%", height: "100%", textAlign: "left", background: active === s.code ? "#F7F6F4" : "#FFFFFF", padding: "1.75rem", border: "none", borderRight: i % 3 !== 2 ? "1px solid #E5E4E0" : "none", borderBottom: i < 3 ? "1px solid #E5E4E0" : "none", cursor: "pointer", transition: "background 150ms", borderLeft: active === s.code ? `3px solid ${s.color}` : "3px solid transparent" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: s.color, marginBottom: "0.5rem" }}>{s.code}</p>
                  <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "1rem", color: "#111111", marginBottom: "0.5rem", lineHeight: 1.25 }}>{s.label}</p>
                  <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.8125rem", color: "#888888", lineHeight: 1.6 }}>{s.desc}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA" }}>
                {active === "ALL" ? "All Publications" : SERIES.find(s => s.code === active)?.label} — {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </p>
              {active !== "ALL" && (
                <button onClick={() => setActive("ALL")} style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A02D24", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Clear filter ×
                </button>
              )}
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((pub, i) => {
              const seriesObj = SERIES.find(s => s.code === pub.series);
              return (
                <Reveal key={pub.code} delay={i * 30}>
                  <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", padding: "1.75rem 2rem", display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{ minWidth: "80px" }}>
                      <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: seriesObj?.color || "#555555" }}>{pub.series}</p>
                    </div>
                    <div style={{ flex: 1, minWidth: "240px" }}>
                      {pub.url ? (
                        <a href={pub.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "1.0625rem", color: "#111111", textDecoration: "none", lineHeight: 1.35, display: "block", marginBottom: "0.5rem", transition: "color 150ms" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#A02D24")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#111111")}
                        >{pub.title} ↗</a>
                      ) : (
                        <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "1.0625rem", color: "#111111", lineHeight: 1.35, marginBottom: "0.5rem" }}>{pub.title}</p>
                      )}
                      <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.8125rem", color: "#888888" }}>{pub.authors}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem", minWidth: "120px" }}>
                      <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.06em", color: "#AAAAAA" }}>{pub.date}</p>
                      <span style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#2D7A3A", border: "1px solid #2D7A3A", padding: "0.2rem 0.5rem" }}>Open Access</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div style={{ marginTop: "2.5rem", padding: "1.5rem 2rem", border: "1px solid #E5E4E0", background: "#FFFFFF" }}>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "0.5rem" }}>Open Access Policy</p>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#666666", lineHeight: 1.7 }}>
                All TAI publications are released under Creative Commons Attribution 4.0 International (CC BY 4.0). You are free to share and adapt the material for any purpose, provided appropriate credit is given. TAI does not charge for access to any of its research outputs.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
