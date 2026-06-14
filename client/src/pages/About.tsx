/*
 * About.tsx — TAI About v4
 * Design: GI-clone — Chakra Petch, white background, black typography, slate blue accent
 */
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";

const font = "'Chakra Petch', 'IBM Plex Mono', monospace";
const slate = "#2C3E6B";
const black = "#111111";
const mid = "#555555";
const light = "#999999";
const border = "#E0E0E0";

export default function About() {
  return (
    <Layout>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>About</p>
          <h1 style={{ fontFamily: font, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            The Ashby Institute
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.95rem", color: mid, lineHeight: 1.8, maxWidth: "640px", fontWeight: 300, margin: 0 }}>
            An independent nonprofit research organization applying Ashby's Law of Requisite Variety to the most consequential governance challenges of the compute transition and beyond.
          </p>
        </div>
      </section>

      {/* FOUNDING STORY — 50/50 SPLIT */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px" }}>
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "560px" }}>
            <AsciiCanvas sim="reaction-diffusion" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Reaction-Diffusion · Turing Patterns</span>
            </div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Founding</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Why TAI Exists
            </h2>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.9, margin: "0 0 1.25rem", fontWeight: 300 }}>
              W. Ross Ashby's Law of Requisite Variety — formalized in 1956 — states that only variety can absorb variety. A regulator can only control a system if its internal model is at least as complex as the system it governs. This is not a policy preference. It is a mathematical constraint.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.9, margin: "0 0 1.25rem", fontWeight: 300 }}>
              The compute transition — the period in which AI-native compute orchestration reshapes the global economy, governance, and strategic balance — is generating variety at a rate that existing regulatory institutions were not designed to absorb. The variety gap is widening. The consequences are structural, not incidental.
            </p>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.9, margin: 0, fontWeight: 300 }}>
              TAI was founded to produce rigorous, independent structural analysis of this gap — and to develop the institutional frameworks required to close it. We apply Ashby's Law not as a metaphor but as a formal analytical tool, across every domain where the compute transition is generating governance failures.
            </p>
          </div>
        </div>
      </section>

      {/* MANDATE SCOPE — full-width grid */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Mandate</p>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: black, margin: "0 0 3rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Eight Domains of Application
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: border }}>
            {[
              { n: "01", domain: "AI Alignment & Superintelligence", note: "V(C) ≫ V(H)" },
              { n: "02", domain: "Cybersecurity & Adversarial Systems", note: "Attacker variety" },
              { n: "03", domain: "Autonomous Systems & Robotics", note: "Edge deployment" },
              { n: "04", domain: "Critical Infrastructure", note: "Grid, water, transport" },
              { n: "05", domain: "Financial Systems", note: "Systemic risk" },
              { n: "06", domain: "Healthcare & Biological Systems", note: "Diagnostic AI" },
              { n: "07", domain: "Democratic Governance", note: "Institutional design" },
              { n: "08", domain: "Climate & Earth Systems", note: "Planetary boundaries" },
            ].map(d => (
              <div key={d.n} style={{ background: "#FFFFFF", padding: "1.75rem 1.5rem", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#F8F8F8"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#FFFFFF"}
              >
                <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: slate, margin: "0 0 0.5rem" }}>{d.n}</p>
                <p style={{ fontFamily: font, fontSize: "0.8rem", fontWeight: 600, color: black, margin: "0 0 0.375rem", lineHeight: 1.3 }}>{d.domain}</p>
                <p style={{ fontFamily: font, fontSize: "0.55rem", color: light, margin: 0, letterSpacing: "0.06em" }}>{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDEPENDENCE POLICY — 50/50 SPLIT */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "500px" }}>
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: `1px solid ${border}` }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Independence</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Structural Independence
            </h2>
            <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.9, margin: "0 0 1.5rem", fontWeight: 300 }}>
              TAI's independence is structural, not aspirational. Our funding model, governance structure, and publication policies are designed to make capture — by commercial interests, governments, or ideological movements — structurally difficult rather than merely discouraged.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { title: "No commercial funding", desc: "TAI does not accept funding from commercial AI developers, compute infrastructure providers, or any entity with a direct financial interest in the compute transition." },
                { title: "No government contracts", desc: "TAI does not accept government contracts or classified research. All research is published openly and without restriction." },
                { title: "Board independence", desc: "Board members serve fixed terms and are subject to conflict-of-interest policies that prohibit financial relationships with entities in TAI's research domains." },
                { title: "Open access", desc: "All TAI research is published under Creative Commons Attribution 4.0. We do not charge for access to any research output." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "1rem 0", borderBottom: i < 3 ? `1px solid ${border}` : "none" }}>
                  <p style={{ fontFamily: font, fontSize: "0.7rem", fontWeight: 600, color: black, margin: "0 0 0.25rem" }}>{item.title}</p>
                  <p style={{ fontFamily: font, fontSize: "0.72rem", color: mid, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "500px" }}>
            <AsciiCanvas sim="boids" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Boids Flocking · Distributed Control</span>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Governance</p>
              <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em" }}>
                Board of Directors
              </h2>
              <p style={{ fontFamily: font, fontSize: "0.78rem", color: mid, lineHeight: 1.75, margin: "0 0 2rem", fontWeight: 300 }}>
                TAI's Board of Directors is responsible for organizational governance, financial oversight, and ensuring adherence to TAI's independence policy. Board members serve three-year terms and are subject to strict conflict-of-interest policies.
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { role: "Chair", name: "To Be Announced", affil: "TAI Board" },
                  { role: "Vice Chair", name: "To Be Announced", affil: "TAI Board" },
                  { role: "Treasurer", name: "To Be Announced", affil: "TAI Board" },
                  { role: "Director", name: "To Be Announced", affil: "TAI Board" },
                  { role: "Director", name: "To Be Announced", affil: "TAI Board" },
                ].map((m, i, arr) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1rem", padding: "1rem 0", borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none" }}>
                    <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.14em", textTransform: "uppercase", color: light, margin: 0, paddingTop: "0.15rem" }}>{m.role}</p>
                    <div>
                      <p style={{ fontFamily: font, fontSize: "0.78rem", fontWeight: 600, color: black, margin: "0 0 0.1rem" }}>{m.name}</p>
                      <p style={{ fontFamily: font, fontSize: "0.6rem", color: light, margin: 0 }}>{m.affil}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Advisory</p>
              <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em" }}>
                Scientific Advisory Council
              </h2>
              <p style={{ fontFamily: font, fontSize: "0.78rem", color: mid, lineHeight: 1.75, margin: "0 0 2rem", fontWeight: 300 }}>
                The Scientific Advisory Council provides guidance on TAI's research agenda, methodology, and quality standards. Members are selected for their expertise in systems theory, AI governance, and related disciplines.
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { role: "Chair", field: "Systems Theory & Cybernetics" },
                  { role: "Member", field: "AI Governance & Policy" },
                  { role: "Member", field: "Compute Infrastructure" },
                  { role: "Member", field: "Financial Regulation" },
                  { role: "Member", field: "Democratic Theory" },
                  { role: "Member", field: "Cybersecurity" },
                ].map((m, i, arr) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1rem", padding: "1rem 0", borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none" }}>
                    <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.14em", textTransform: "uppercase", color: light, margin: 0, paddingTop: "0.15rem" }}>{m.role}</p>
                    <div>
                      <p style={{ fontFamily: font, fontSize: "0.78rem", fontWeight: 600, color: black, margin: "0 0 0.1rem" }}>To Be Announced</p>
                      <p style={{ fontFamily: font, fontSize: "0.6rem", color: light, margin: 0 }}>{m.field}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAFFING MODEL */}
      <section style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Organization</p>
          <h2 style={{ fontFamily: font, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Staffing Model
          </h2>
          <p style={{ fontFamily: font, fontSize: "0.85rem", color: mid, lineHeight: 1.9, maxWidth: "680px", margin: "0 0 3rem", fontWeight: 300 }}>
            TAI operates with a lean permanent staff and a larger network of fellows, visiting researchers, and policy residents. This model is intentional: it maximizes intellectual diversity while maintaining the institutional coherence required for rigorous, sustained research programs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: border }}>
            {[
              { title: "Permanent Staff", desc: "A small core team responsible for research coordination, publications, and institutional operations." },
              { title: "Ashby Fellows", desc: "Competitive annual fellowship for early-career researchers. Two-year terms with full research support." },
              { title: "Senior Research Fellows", desc: "Established researchers affiliated with TAI on a part-time basis. Contribute to specific research programs." },
              { title: "Policy Residents", desc: "Mid-career policymakers and practitioners in residence for six to twelve months. Bridge research and policy." },
            ].map(s => (
              <div key={s.title} style={{ background: "#FFFFFF", padding: "2rem 1.75rem" }}>
                <p style={{ fontFamily: font, fontSize: "0.7rem", fontWeight: 600, color: black, margin: "0 0 0.75rem", lineHeight: 1.3 }}>{s.title}</p>
                <p style={{ fontFamily: font, fontSize: "0.72rem", color: mid, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
