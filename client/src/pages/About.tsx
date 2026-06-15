/**
 * About.tsx — About TAI
 * Design: GI-clone border grid system
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";

const BOARD = [
  { name: "To Be Announced", role: "Board Chair", affiliation: "TBA" },
  { name: "To Be Announced", role: "Board Member", affiliation: "TBA" },
  { name: "To Be Announced", role: "Board Member", affiliation: "TBA" },
  { name: "To Be Announced", role: "Board Member", affiliation: "TBA" },
  { name: "To Be Announced", role: "Board Member", affiliation: "TBA" },
];

const SAC = [
  { name: "To Be Announced", role: "SAC Member", domain: "AI Alignment" },
  { name: "To Be Announced", role: "SAC Member", domain: "Compute Governance" },
  { name: "To Be Announced", role: "SAC Member", domain: "Financial Systems" },
  { name: "To Be Announced", role: "SAC Member", domain: "Democratic Governance" },
  { name: "To Be Announced", role: "SAC Member", domain: "Critical Infrastructure" },
  { name: "To Be Announced", role: "SAC Member", domain: "Systems Theory" },
];

export default function About() {
  return (
    <Layout>
      <style>{`
        @media (max-width: 640px) {
          .ab-2col { grid-template-columns: 1fr !important; }
          .ab-canvas { display: none !important; }
          .ab-text { padding: 32px 20px !important; border-right: none !important; }
          .ab-header-pad { padding: 40px 20px 32px !important; border-right: none !important; }
          .ab-board { grid-template-columns: 1fr 1fr !important; }
          .ab-board > div:nth-child(2n) { border-right: none !important; }
          .ab-sac { grid-template-columns: 1fr 1fr !important; }
          .ab-sac > div:nth-child(2n) { border-right: none !important; }
          .ab-policy-grid { grid-template-columns: 1fr !important; }
          .ab-policy-grid > div { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; }
          .ab-header-row { padding: 24px 20px !important; }
          .ab-cta { flex-direction: column !important; }
          .ab-cta a { border-right: none !important; border-bottom: 1px solid #111 !important; }
          /* Partner section */
          .ab-partner-tiers { grid-template-columns: 1fr !important; }
          .ab-partner-tiers > div { border-right: none !important; border-bottom: 1px solid #222; }
          .ab-partner-tiers > div:last-child { border-bottom: none !important; }
        }
      `}</style>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: B }}>
        <div className="ab-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="ab-header-pad" style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>ABOUT TAI</p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              About
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: 0 }}>
              The Ashby Institute is an independent nonprofit research organization applying Ashby's Law of Requisite Variety to the defining governance problems of the compute era. Our independence is structural: no funder influences our research, and all funding is publicly disclosed.
            </p>
          </div>
          <div className="ab-canvas" style={{ position: "relative", minHeight: 280 }}>
            <AsciiCanvas sim="network" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>REGULATORY NETWORK · FEEDBACK DYNAMICS</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section style={{ borderBottom: B }}>
        <div className="ab-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="ab-text" style={{ padding: "56px 48px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>FOUNDING</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Why TAI Exists
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              The compute transition is the most consequential structural shift of our era. Within a decade, AI-native compute systems will reshape every sector of the global economy — and the governance institutions designed to manage that transition will either have sufficient variety to do so, or they will not.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              TAI was founded on a simple premise: W. Ross Ashby's Law of Requisite Variety — and its corollary, the Good Regulator Theorem — are the most important analytical tools available for understanding governance in complex systems. They are not metaphors. They are mathematical results.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              The Institute exists to apply these tools rigorously, to produce research that is structurally grounded rather than politically convenient, and to do so with full independence — enforced through structural firewalls, not categorical exclusions.
            </p>
          </div>
          <div className="ab-text" style={{ padding: "56px 48px" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>THE THEOREM</p>
            <div style={{ border: B, padding: "32px", marginBottom: 24, background: "#F9F9F9" }}>
              <p style={{ fontFamily: FONT, fontSize: "2rem", fontWeight: 700, color: SLATE, margin: "0 0 8px", letterSpacing: "-0.01em" }}>V(R) ≥ V(D)</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: "0 0 20px", letterSpacing: "0.1em" }}>ASHBY'S LAW OF REQUISITE VARIETY · 1956</p>
              <p style={{ fontFamily: FONT, fontSize: 12, color: "#555", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                The variety of a regulator must be at least as great as the variety of the disturbances it is designed to control. This is not a design principle — it is a mathematical constraint.
              </p>
            </div>
            <Link href="/theory" style={{
              display: "inline-block",
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
              color: "#111", padding: "12px 20px",
              textDecoration: "none", border: B,
              transition: "background 0.15s, color 0.15s",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#111"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#111"; }}
            >READ THE FULL THEORY →</Link>
          </div>
        </div>
      </section>

      {/* INDEPENDENCE POLICY */}
      <section style={{ borderBottom: B }}>
        <div className="ab-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="ab-canvas" style={{ position: "relative", minHeight: 400, borderRight: B }}>
            <AsciiCanvas sim="boids" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>BOIDS FLOCKING · DISTRIBUTED CONTROL</span>
            </div>
          </div>
          <div className="ab-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>INDEPENDENCE POLICY</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Independence by<br />Conduct, Not Exclusion.
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              TAI accepts funding from a broad range of sources — including technology companies, governments, and foundations — subject to strict structural conditions. No funder, regardless of origin, may influence our research agenda, review findings before publication, or condition outputs on any commercial or policy outcome.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 24px", fontWeight: 300 }}>
              TAI's Research Council has sole authority over what the institute publishes. All funders and funding amounts are disclosed publicly. No funder holds a governance role.
            </p>
            <div className="ab-policy-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {[
                "Unrestricted grants only",
                "Full public disclosure",
                "No pre-publication review",
                "No governance roles for funders",
                "Open access publications",
                "Research Council authority",
              ].map((item, i) => (
                <div key={item} style={{ padding: "10px 0", borderBottom: i < 4 ? B : "none", borderRight: i % 2 === 0 ? B : "none", paddingRight: i % 2 === 0 ? 20 : 0, paddingLeft: i % 2 !== 0 ? 20 : 0 }}>
                  <span style={{ fontFamily: FONT, fontSize: 9, color: SLATE, marginRight: 8 }}>—</span>
                  <span style={{ fontFamily: FONT, fontSize: 11, color: "#555", fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section style={{ borderBottom: B, background: "#111" }}>
        {/* Section header */}
        <div style={{ borderBottom: "1px solid #333", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>PARTNER WITH US</p>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: "#555", margin: 0 }}>FUNDING ENQUIRIES · research@ashbyinstitute.org</p>
        </div>

        {/* Hero statement */}
        <div className="ab-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #333" }}>
          <div className="ab-text" style={{ padding: "56px 48px", borderRight: "1px solid #333" }}>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", margin: "0 0 24px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Fund the research<br />the field needs.
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#aaa", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              The governance of advanced compute systems is one of the most consequential and least-funded research problems of our era. TAI exists to close that gap — with rigorous, structurally grounded work that no commercially entangled institution can produce.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#aaa", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
              We welcome support from foundations, technology companies, governments, and individuals who share that priority — under a single, non-negotiable condition: your funding does not purchase influence over our findings.
            </p>
            <Link href="/contact" style={{
              display: "inline-block",
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
              color: "#111", background: "#fff",
              padding: "14px 28px",
              textDecoration: "none",
              transition: "background 0.15s, color 0.15s",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = SLATE; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#fff"; el.style.color = "#111"; }}
            >DISCUSS FUNDING →</Link>
          </div>
          {/* Three structural commitments */}
          <div className="ab-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.16em", color: "#555", marginBottom: 28, marginTop: 0 }}>WHAT EVERY FUNDER RECEIVES</p>
            {[
              {
                num: "01",
                title: "Unrestricted Grant Agreement",
                body: "A formal grant agreement confirming that TAI's Research Council retains sole authority over all research outputs. No deliverable tied to a policy outcome.",
              },
              {
                num: "02",
                title: "Annual Transparency Report",
                body: "Public disclosure of your organisation's name and funding range in TAI's annual report, published on this website. No exceptions, no anonymity.",
              },
              {
                num: "03",
                title: "Funder Briefings",
                body: "Annual private briefings on TAI's research agenda and findings — the same briefings available to all funders, with no preferential access to unpublished work.",
              },
            ].map((item, i) => (
              <div key={item.num} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 16, paddingBottom: i < 2 ? 24 : 0, marginBottom: i < 2 ? 24 : 0, borderBottom: i < 2 ? "1px solid #222" : "none" }}>
                <span style={{ fontFamily: FONT, fontSize: 9, color: SLATE, paddingTop: 2 }}>{item.num}</span>
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>{item.title}</p>
                  <p style={{ fontFamily: FONT, fontSize: 11, color: "#888", margin: 0, lineHeight: 1.7, fontWeight: 300 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funding tiers */}
        <div className="ab-partner-tiers" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            {
              tier: "INSTITUTIONAL PARTNER",
              range: "$250,000+",
              period: "per year",
              description: "Lead support for a named TAI research program. Acknowledged in all program publications and in TAI's annual report.",
              items: ["Named program acknowledgement", "Annual research briefing", "Invitation to TAI symposia", "Early access to published reports"],
              highlight: false,
            },
            {
              tier: "RESEARCH SUPPORTER",
              range: "$50,000 – $249,999",
              period: "per year",
              description: "General operating support for TAI's research agenda. Acknowledged in TAI's annual report and on this website.",
              items: ["Annual report acknowledgement", "Annual research briefing", "Invitation to TAI symposia", "Newsletter and publications"],
              highlight: true,
            },
            {
              tier: "INDIVIDUAL DONOR",
              range: "Any amount",
              period: "one-time or recurring",
              description: "Support TAI's mission as an individual. All donors acknowledged in the annual report unless anonymity is requested.",
              items: ["Annual report acknowledgement", "TAI newsletter", "Open access to all publications", "Invitation to public events"],
              highlight: false,
            },
          ].map((tier, i) => (
            <div key={tier.tier} style={{
              padding: "40px 36px",
              borderRight: i < 2 ? "1px solid #222" : "none",
              background: tier.highlight ? "#1a1a1a" : "transparent",
              position: "relative",
            }}>
              {tier.highlight && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: SLATE }} />
              )}
              <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: tier.highlight ? SLATE : "#555", margin: "0 0 12px" }}>{tier.tier}</p>
              <p style={{ fontFamily: FONT, fontSize: "clamp(1.25rem, 2vw, 1.6rem)", fontWeight: 700, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{tier.range}</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#555", margin: "0 0 20px", letterSpacing: "0.08em" }}>{tier.period}</p>
              <p style={{ fontFamily: FONT, fontSize: 11, color: "#888", lineHeight: 1.7, margin: "0 0 24px", fontWeight: 300 }}>{tier.description}</p>
              <div style={{ borderTop: "1px solid #222", paddingTop: 20 }}>
                {tier.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: FONT, fontSize: 9, color: SLATE, flexShrink: 0, marginTop: 1 }}>—</span>
                    <span style={{ fontFamily: FONT, fontSize: 10, color: "#777", fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ borderTop: "1px solid #222", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 10, color: "#555", margin: 0, fontWeight: 300, maxWidth: 600, lineHeight: 1.7 }}>
            All funding arrangements are subject to TAI's Independence Policy. No funder receives preferential access to unpublished findings, influence over research conclusions, or governance rights. Funding amounts are disclosed publicly in TAI's annual report.
          </p>
          <Link href="/contact" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#fff", textDecoration: "none",
            borderBottom: "1px solid #555",
            paddingBottom: 2,
            transition: "border-color 0.15s",
            flexShrink: 0,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#fff"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#555"}
          >ENQUIRE ABOUT FUNDING →</Link>
        </div>
      </section>

      {/* GOVERNANCE: BOARD */}
      <section style={{ borderBottom: B }}>
        <div className="ab-header-row" style={{ borderBottom: B, padding: "40px 48px" }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>GOVERNANCE · BOARD OF DIRECTORS</p>
        </div>
        <div className="ab-board" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
          {BOARD.map((member, i) => (
            <div key={i} style={{ padding: "32px 28px", borderRight: i < 4 ? B : "none" }}>
              <div style={{ width: 40, height: 40, border: B, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: FONT, fontSize: 8, color: "#888" }}>TBA</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{member.name}</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: SLATE, margin: "0 0 4px" }}>{member.role}</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0, fontWeight: 300 }}>{member.affiliation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GOVERNANCE: SAC */}
      <section style={{ borderBottom: B }}>
        <div className="ab-header-row" style={{ borderBottom: B, padding: "40px 48px" }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, margin: 0 }}>GOVERNANCE · SCIENTIFIC ADVISORY COUNCIL</p>
        </div>
        <div className="ab-sac" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {SAC.map((member, i) => (
            <div key={i} style={{ padding: "32px 36px", borderRight: i % 3 !== 2 ? B : "none", borderBottom: i < 3 ? B : "none" }}>
              <div style={{ width: 40, height: 40, border: B, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: FONT, fontSize: 8, color: "#888" }}>TBA</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{member.name}</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: SLATE, margin: "0 0 4px" }}>{member.role}</p>
              <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0, fontWeight: 300 }}>{member.domain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STAFFING MODEL */}
      <section style={{ borderBottom: B }}>
        <div className="ab-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="ab-text" style={{ padding: "56px 48px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>STAFFING MODEL</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Small. Rigorous. Independent.
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 16px", fontWeight: 300 }}>
              TAI operates with a deliberately small permanent staff. Research is conducted primarily by fellows — Ashby Fellows, Senior Research Fellows, Visiting Fellows, and Policy Residents — supported by a lean operational team.
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
              This model keeps overhead low, maintains intellectual flexibility, and ensures that TAI's research agenda is driven by the questions that matter, not by the institutional imperatives of a large organization.
            </p>
          </div>
          <div className="ab-text" style={{ padding: "56px 48px" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>LOCATIONS</p>
            {[
              { city: "Washington, D.C.", role: "Primary Office · Policy Engagement", status: "ACTIVE" },
              { city: "London", role: "European Research Hub", status: "FORTHCOMING" },
              { city: "Singapore", role: "Asia-Pacific Research Hub", status: "FORTHCOMING" },
            ].map((loc, i) => (
              <div key={loc.city} style={{ padding: "20px 0", borderBottom: i < 2 ? B : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#111", margin: 0 }}>{loc.city}</p>
                  <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.1em", color: loc.status === "ACTIVE" ? SLATE : "#888" }}>{loc.status}</span>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", margin: 0, fontWeight: 300 }}>{loc.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: B }}>
        <div className="ab-cta" style={{ display: "flex" }}>
          <Link href="/contact" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#fff", background: "#111", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >CONTACT TAI →</Link>
          <Link href="/research" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >RESEARCH</Link>
          <Link href="/fellows" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >FELLOWS</Link>
        </div>
      </section>
    </Layout>
  );
}
