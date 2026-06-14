/*
 * About.tsx — TAI About v4 — Clean Institutional White
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

const INDEPENDENCE = [
  { label: "Funding Independence", desc: "TAI accepts no funding from commercial AI developers, semiconductor manufacturers, cloud infrastructure providers, or any entity with a direct financial interest in the systems TAI analyzes. TAI is funded exclusively through philanthropic grants, foundation support, and individual donations from sources with no commercial interest in AI or compute infrastructure." },
  { label: "Governance Independence", desc: "TAI\'s Board of Directors is composed entirely of individuals with no current employment or financial interest in commercial AI development or compute infrastructure. Board members are required to disclose and recuse from any matter in which they have a potential conflict of interest." },
  { label: "Research Independence", desc: "TAI\'s research agenda is set by its research staff and fellows, subject to Board oversight. No funder, donor, or external party has any influence over TAI\'s research agenda, methodology, findings, or publication decisions. TAI does not accept commissioned research." },
  { label: "Publication Independence", desc: "All TAI publications are released open access under Creative Commons Attribution 4.0 International. TAI does not embargo publications, accept prepublication review by external parties, or restrict access to its research outputs in any way." },
];

const BOARD = [
  { name: "TBA", role: "Chair", affiliation: "To be announced" },
  { name: "TBA", role: "Vice Chair", affiliation: "To be announced" },
  { name: "TBA", role: "Treasurer", affiliation: "To be announced" },
  { name: "TBA", role: "Director", affiliation: "To be announced" },
  { name: "TBA", role: "Director", affiliation: "To be announced" },
];

const SAC = [
  { name: "TBA", field: "Systems Theory & Cybernetics", affiliation: "To be announced" },
  { name: "TBA", field: "AI Governance & Policy", affiliation: "To be announced" },
  { name: "TBA", field: "Compute Infrastructure", affiliation: "To be announced" },
  { name: "TBA", field: "Financial Regulation", affiliation: "To be announced" },
  { name: "TBA", field: "Democratic Theory", affiliation: "To be announced" },
  { name: "TBA", field: "Cybersecurity", affiliation: "To be announced" },
];

export default function About() {
  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>About</p>
            <h1 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              The Ashby Institute
            </h1>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              Independent nonprofit research organization. Applying Ashby\'s Law of Requisite Variety to the governance of complex systems.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Founding Story</p>
              <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                Why Ashby. Why Now.
              </h2>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                The Ashby Institute was founded on a simple observation: the most consequential governance failures of our era — from financial crises to AI safety to democratic breakdown — share a common structural cause. The institutions attempting to govern complex systems do not have sufficient internal variety to model those systems. They are, in Ashby\'s terms, inadequate regulators.
              </p>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                W. Ross Ashby proved this in 1956. His Law of Requisite Variety is a mathematical theorem about the limits of control. The Good Regulator Theorem, proved by Conant and Ashby in 1970, extends this to a formal requirement: any system that successfully regulates another must model it. These are not metaphors. They are mathematical constraints.
              </p>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8 }}>
                TAI exists to apply these constraints rigorously to the governance problems that matter most — beginning with the compute transition, and extending to every domain where variety deficits are consequential. We are named for Ashby because we aspire to be what he described: a good regulator of the systems we study.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E4E0" }}>
                {[
                  { label: "Founded", value: "2026" },
                  { label: "Structure", value: "Independent nonprofit research organization" },
                  { label: "Funding", value: "Philanthropic grants and individual donations. No commercial funding." },
                  { label: "Research Model", value: "Fellowship-based. Rotating cohort of independent researchers." },
                  { label: "Publication Policy", value: "All research open access. CC BY 4.0." },
                  { label: "Independence Policy", value: "No funding from commercial AI developers or compute infrastructure providers." },
                ].map(item => (
                  <div key={item.label} style={{ background: "#FFFFFF", padding: "1.25rem 1.75rem" }}>
                    <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "0.375rem" }}>{item.label}</p>
                    <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555", lineHeight: 1.6 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }} id="governance">
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Governance</p>
            <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "0.75rem" }}>Board & Scientific Advisory Council</h2>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, maxWidth: "560px", marginBottom: "3rem" }}>
              TAI is governed by an independent Board of Directors and advised by a Scientific Advisory Council. Board and SAC appointments will be announced as the Institute is formally constituted.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Board of Directors</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {BOARD.map(m => (
                  <div key={m.name + m.role} style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem", borderBottom: "1px solid #E5E4E0", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "0.9375rem", color: "#111111", marginBottom: "0.25rem" }}>{m.name}</p>
                      <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.8125rem", color: "#888888" }}>{m.affiliation}</p>
                    </div>
                    <span style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#AAAAAA", whiteSpace: "nowrap", paddingTop: "0.2rem" }}>{m.role}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Scientific Advisory Council</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {SAC.map(m => (
                  <div key={m.name + m.field} style={{ background: "#FFFFFF", padding: "1.25rem 1.5rem", borderBottom: "1px solid #E5E4E0", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "0.9375rem", color: "#111111", marginBottom: "0.25rem" }}>{m.name}</p>
                      <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.8125rem", color: "#888888" }}>{m.affiliation}</p>
                    </div>
                    <span style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#AAAAAA", whiteSpace: "nowrap", paddingTop: "0.2rem", textAlign: "right", maxWidth: "120px" }}>{m.field}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }} id="independence">
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Independence Policy</p>
            <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "0.75rem" }}>Structural Independence</h2>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, maxWidth: "560px", marginBottom: "3rem" }}>
              TAI\'s independence is structural, not merely stated. The following policies are binding on all TAI staff, fellows, and Board members.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#E5E4E0" }}>
            {INDEPENDENCE.map((item, i) => (
              <Reveal key={item.label} delay={i * 40}>
                <div style={{ background: "#FFFFFF", padding: "2rem 2.5rem", display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", alignItems: "start" }} className="grid-cols-1 sm:grid-cols-[220px_1fr]">
                  <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "1rem", color: "#111111", lineHeight: 1.3 }}>{item.label}</p>
                  <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.9375rem", color: "#555555", lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/research" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >Research Programs →</Link>
              <Link href="/contact" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555", border: "1px solid #CCCCCC", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "border-color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#555555")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#CCCCCC")}
              >Contact</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
