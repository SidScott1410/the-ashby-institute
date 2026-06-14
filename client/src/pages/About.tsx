/**
 * About.tsx — TAI About page
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
 * Founding story, expanded mandate, governance, independence policy, staffing model
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

const BOARD_ROLES = [
  { role: "Board Chair", affiliation: "Independent, non-executive" },
  { role: "Treasurer", affiliation: "Independent, non-executive" },
  { role: "Secretary", affiliation: "Independent, non-executive" },
  { role: "Board Member", affiliation: "Research community representative" },
  { role: "Board Member", affiliation: "Policy community representative" },
];

const SAC_ROLES = [
  { role: "Chair, Scientific Advisory Council", affiliation: "Senior academic appointment" },
  { role: "SAC Member", affiliation: "Economics / political economy" },
  { role: "SAC Member", affiliation: "Computer science / AI systems" },
  { role: "SAC Member", affiliation: "International law / governance" },
  { role: "SAC Member", affiliation: "Science and technology studies" },
  { role: "SAC Member", affiliation: "National security / strategic studies" },
];

const DOMAINS = [
  { domain: "AI Alignment", formula: "V(H) < V(AI) → Oversight fails", desc: "The alignment problem is a variety problem. Human oversight of superintelligent AI hits a mathematical limit derived directly from Ashby's Law." },
  { domain: "Compute Governance", formula: "V(regulator) ≥ V(compute system)", desc: "Regulatory bodies that do not maintain adequate internal models of compute infrastructure will be systematically inadequate." },
  { domain: "Financial Systems", formula: "V(oversight) < V(market) → Crisis", desc: "Every major financial crisis follows the same structural pattern: a variety deficit between regulator and regulated system." },
  { domain: "Democratic Governance", formula: "V(government) ≥ V(society)", desc: "Populism, polarization, and institutional breakdown are symptoms of variety deficits in governing models." },
  { domain: "Cybersecurity", formula: "V(defense) ≥ V(attack surface)", desc: "Any fixed detection signature set will eventually be defeated. Security requires variety matching the threat landscape." },
  { domain: "Autonomous Systems", formula: "V(controller) ≥ V(environment)", desc: "The GRT is the mathematical foundation of sensor fusion and autonomous navigation. Controllers must model their full environment." },
  { domain: "Critical Infrastructure", formula: "V(grid model) ≥ V(load variation)", desc: "Smart grid operators, avionics systems, and supply chain managers all face the same variety constraint." },
  { domain: "Healthcare & Biology", formula: "Homeostasis = variety matching", desc: "Homeostasis is the original regulator. Antibiotic resistance, cancer immunotherapy, and precision medicine are all variety problems." },
];

const INDEPENDENCE_PRINCIPLES = [
  {
    title: "Funding Independence",
    body: "TAI does not accept funding from commercial AI companies, semiconductor manufacturers, cloud infrastructure providers, or any entity with a direct financial interest in the compute transition. Funding is accepted from foundations, governments (subject to publication independence conditions), and individual donors. All funding sources are disclosed publicly.",
  },
  {
    title: "Publication Independence",
    body: "No funder has the right to review, delay, or modify TAI publications before release. All research is subject to independent peer review. TAI does not accept restricted funding that limits publication rights or requires pre-publication review by funders.",
  },
  {
    title: "Advocacy Independence",
    body: "TAI does not advocate for specific policy outcomes, commercial interests, or political positions. Our mandate is structural analysis, not advocacy. We produce models; we do not lobby. TAI researchers may publish personal views in their own names, clearly distinguished from TAI institutional research.",
  },
  {
    title: "Governance Independence",
    body: "All Board members are independent of commercial AI interests. Board members with relevant financial interests are required to disclose and recuse. The independence policy is reviewed annually by the Board and published on the TAI website. Any departure requires a supermajority Board vote and public disclosure.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              About
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F0EDE6", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              The Ashby Institute
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "640px" }}>
              An independent nonprofit research organization. No commercial affiliations. No government contracts. No industry funding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOUNDING STORY ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Founding Story
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1A1410", lineHeight: 1.2 }}>
                Why TAI Exists
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <div style={{ borderLeft: "3px solid #8B1A14", paddingLeft: "2rem", marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.125rem, 2vw, 1.375rem)", color: "#1A1410", lineHeight: 1.45, marginBottom: "0.5rem" }}>
                  "Every good regulator of a system must be a model of that system."
                </p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: "#8A8580", textTransform: "uppercase" }}>
                  — Conant & Ashby, 1970
                </p>
              </div>

              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The Ashby Institute was founded on a single observation: the institutions responsible for governing the most consequential systems of our era are structurally underequipped for the task. Not because they lack expertise or resources, but because they lack adequate models of the systems they are attempting to regulate.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                This is precisely the problem that W. Ross Ashby and Roger Conant identified in 1970: a regulator cannot effectively govern a system it does not model. The theorem is mathematical, but its implications are institutional. If regulatory bodies do not maintain adequate internal models of the systems they oversee, their interventions will be systematically inadequate — not because of bad faith or insufficient effort, but because of a structural mismatch between the complexity of the regulated system and the complexity of the regulatory model.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78, marginBottom: "1.5rem" }}>
                The Law of Requisite Variety — Ashby's foundational theorem from 1956 — makes this precise: <strong style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.875rem", color: "#8B1A14" }}>V(R) ≥ V(D)</strong>. A regulator can only effectively control an environment if its internal variety is greater than or equal to the variety of the disturbances it must absorb. This is not a metaphor. It is a mathematical constraint that applies to any system attempting to govern any other system — from AI alignment to financial regulation, from cybersecurity to democratic governance, from autonomous vehicles to smart grids.
              </p>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.0625rem", color: "#3A3530", lineHeight: 1.78 }}>
                TAI was founded to address this structural gap. Our mandate is to produce rigorous, independent structural analysis that models complex systems at the level of complexity they actually exhibit, and that is available to policymakers, researchers, and civil society without restriction. The Institute is organized as an independent nonprofit — no commercial affiliations, no industry funding, no government contracts. Its independence is structural, not aspirational.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MANDATE SCOPE ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Research Mandate
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "0.75rem" }}>
              One Law. Every System.
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "680px", marginBottom: "3rem" }}>
              Ashby's Law applies wherever a regulator must govern a complex system. TAI's research mandate spans every domain where the variety constraint is structurally binding.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#1E2228" }}>
            {DOMAINS.map((item, i) => (
              <Reveal key={item.domain} delay={i * 40}>
                <div style={{ background: "#111318", padding: "1.75rem", height: "100%" }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "0.9375rem", color: "#C8C4BC", lineHeight: 1.3, marginBottom: "0.5rem" }}>
                    {item.domain}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", color: "#8B1A14", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
                    {item.formula}
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.8125rem", color: "#4A4540", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Governance
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "3rem" }} />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Reveal>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1A1410", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                Board of Directors
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560", lineHeight: 1.65, marginBottom: "2rem" }}>
                The Board of Directors holds fiduciary responsibility for the Institute and enforces the independence policy. All Board members are independent of commercial AI interests.
              </p>
              <div style={{ border: "1px solid #D8D4CC" }}>
                {BOARD_ROLES.map((member, i) => (
                  <div key={member.role + i} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    borderBottom: i < BOARD_ROLES.length - 1 ? "1px solid #D8D4CC" : "none",
                    background: i % 2 === 0 ? "#FDFBF7" : "#F5F2EC",
                  }}>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "0.9375rem", color: "#1A1410", marginBottom: "0.15rem" }}>
                        {member.role}
                      </p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#8A8580", letterSpacing: "0.04em" }}>
                        {member.affiliation}
                      </p>
                    </div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.3)", padding: "0.2rem 0.5rem", flexShrink: 0, marginLeft: "1rem" }}>
                      TBA
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.06em", color: "#8A8580", marginTop: "0.75rem" }}>
                Board appointments will be announced at launch. Nominations are under review.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1A1410", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                Scientific Advisory Council
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560", lineHeight: 1.65, marginBottom: "2rem" }}>
                The Scientific Advisory Council provides methodological oversight and peer review for TAI's research programs. SAC members are drawn from academia and research institutions.
              </p>
              <div style={{ border: "1px solid #D8D4CC" }}>
                {SAC_ROLES.map((member, i) => (
                  <div key={member.role + i} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    borderBottom: i < SAC_ROLES.length - 1 ? "1px solid #D8D4CC" : "none",
                    background: i % 2 === 0 ? "#FDFBF7" : "#F5F2EC",
                  }}>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "0.9375rem", color: "#1A1410", marginBottom: "0.15rem" }}>
                        {member.role}
                      </p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#8A8580", letterSpacing: "0.04em" }}>
                        {member.affiliation}
                      </p>
                    </div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.3)", padding: "0.2rem 0.5rem", flexShrink: 0, marginLeft: "1rem" }}>
                      TBA
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.06em", color: "#8A8580", marginTop: "0.75rem" }}>
                SAC appointments will be announced at launch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── INDEPENDENCE POLICY ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Independence Policy
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "0.75rem" }}>
              Structural Independence,{" "}
              <em style={{ fontStyle: "italic" }}>Not Aspirational Independence.</em>
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "640px", marginBottom: "3.5rem" }}>
              TAI's independence is encoded in its governance documents and enforced by its Board. It is not a statement of intent — it is a structural constraint.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "#1E2228" }}>
            {INDEPENDENCE_PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 60}>
                <div style={{ background: "#0A0C0F", padding: "2.5rem", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: "0.25rem", height: "2rem", background: "#8B1A14", flexShrink: 0, marginTop: "0.125rem" }} />
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.0625rem", color: "#E8E4DC", lineHeight: 1.25 }}>
                      {principle.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#6A6560", lineHeight: 1.75 }}>
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAFFING MODEL ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Staffing Model
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", color: "#1A1410", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Lean Permanent Staff.{" "}
                <em style={{ fontStyle: "italic" }}>Rotating Research Cohort.</em>
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#6A6560", lineHeight: 1.7 }}>
                TAI operates with a deliberately lean permanent staff. Research capacity is built primarily through fellowship programs, which bring in a rotating cohort of researchers and practitioners on fixed-term appointments.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={120}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "#D8D4CC" }}>
                {[
                  { title: "Permanent Staff", desc: "A small core team responsible for research program management, operations, and institutional continuity." },
                  { title: "Ashby Fellows", desc: "The flagship fellowship cohort. Full-time research appointments for 12 months, renewable. Competitive selection." },
                  { title: "Senior Research Fellows", desc: "Established scholars and practitioners on 1–3 year affiliate appointments. Non-residential." },
                  { title: "Visiting Fellows", desc: "Short-term visiting researchers completing specific projects, typically 3–6 months." },
                  { title: "Policy Residents", desc: "Government and policy practitioners on 6–12 month structured residencies. Brings practitioner knowledge into research." },
                  { title: "Scientific Advisory Council", desc: "External methodological oversight and peer review, non-residential. Reviews all research before publication." },
                ].map((item) => (
                  <div key={item.title} style={{ background: "#FDFBF7", padding: "1.5rem" }}>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "0.9375rem", color: "#1A1410", marginBottom: "0.5rem" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.8125rem", color: "#6A6560", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <Reveal>
            <div style={{ maxWidth: "640px" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Engage with the Institute
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#E8E4DC", lineHeight: 1.2, marginBottom: "1rem" }}>
                Research Inquiries, Fellowship Applications, Media Requests
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, marginBottom: "2rem" }}>
                For research inquiries, fellowship applications, media requests, or partnership discussions, contact the Institute directly.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F0EDE6", background: "#8B1A14", border: "1px solid #8B1A14",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 200ms",
                  display: "inline-flex", alignItems: "center",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                >
                  Contact the Institute
                </Link>
                <Link href="/fellows" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#E8E4DC", background: "transparent", border: "1px solid rgba(232,228,220,0.25)",
                  padding: "0.875rem 1.75rem", textDecoration: "none", transition: "border-color 200ms",
                  display: "inline-flex", alignItems: "center",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.6)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,228,220,0.25)")}
                >
                  Fellowship Programs
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
