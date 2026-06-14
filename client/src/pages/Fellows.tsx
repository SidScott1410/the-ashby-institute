/*
 * Fellows.tsx — TAI Fellows v4 — Clean Institutional White
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

const PROGRAMS = [
  {
    code: "AF", title: "The Ashby Fellowship", type: "Flagship Competitive Fellowship",
    duration: "12 months", cycle: "Annual — applications open September, decisions December", stipend: "Full stipend + research budget",
    desc: "The Ashby Fellowship is TAI\'s flagship competitive fellowship for early-career researchers working at the intersection of systems theory, governance, and the compute transition. Fellows are selected for their ability to apply rigorous formal methods to consequential governance problems. The fellowship is designed to produce the next generation of researchers capable of applying the Law of Requisite Variety to the defining problems of the compute era.",
    eligibility: ["Doctoral candidates or recent PhDs (within 5 years of degree)", "Demonstrated capacity for formal theoretical work", "Research agenda relevant to TAI\'s eight application domains", "No current affiliation with commercial AI developers or compute infrastructure providers"],
    outputs: ["One major working paper or policy brief per fellowship year", "Participation in TAI\'s annual symposium", "Contribution to at least one cross-domain research project"],
  },
  {
    code: "SRF", title: "Senior Research Fellows", type: "Appointment",
    duration: "3 years, renewable", cycle: "Rolling — by invitation and open application", stipend: "Part-time engagement + research support",
    desc: "Senior Research Fellows are established scholars and practitioners who contribute to TAI\'s research programs on a part-time basis. Fellows bring deep expertise in one or more of TAI\'s eight application domains and contribute to the Institute\'s research agenda through publications, workshops, and advisory engagement. Senior Fellows maintain their primary institutional affiliation.",
    eligibility: ["Established scholars with a significant publication record", "Practitioners with demonstrated policy or technical expertise", "Researchers working in one or more of TAI\'s eight application domains", "Commitment to TAI\'s independence and open access principles"],
    outputs: ["At least one TAI publication per year", "Participation in TAI workshops and events", "Advisory engagement with TAI research programs"],
  },
  {
    code: "VF", title: "Visiting Fellows", type: "Short-term Residency",
    duration: "3–6 months", cycle: "Rolling — applications accepted year-round", stipend: "Modest stipend + office access",
    desc: "The Visiting Fellowship program provides short-term residencies for researchers who wish to spend a concentrated period working on a specific project in residence at TAI. Visiting Fellows have access to TAI\'s research infrastructure, library resources, and intellectual community. The program supports focused research that benefits from TAI\'s analytical framework and network.",
    eligibility: ["Researchers at any career stage", "Clear project proposal relevant to TAI\'s research agenda", "Ability to be in residence for the fellowship period", "Commitment to producing a TAI working paper or policy brief"],
    outputs: ["One working paper or policy brief", "One public seminar or lecture", "Participation in TAI\'s research community"],
  },
  {
    code: "PR", title: "Policy Residency", type: "Practice-Oriented Program",
    duration: "6 months", cycle: "Biannual — applications open January and July", stipend: "Full stipend",
    desc: "The Policy Residency is designed for practitioners — government officials, regulatory staff, legislative analysts, and policy professionals — who wish to develop a deeper analytical foundation for their work on AI governance, compute policy, or related domains. Residents work alongside TAI researchers and produce a policy-relevant output applying TAI\'s analytical framework to a specific governance problem.",
    eligibility: ["Current or recent government officials, regulatory staff, or legislative analysts", "Policy professionals working on AI governance, compute policy, or related domains", "Demonstrated commitment to evidence-based policymaking", "No current affiliation with commercial AI developers"],
    outputs: ["One policy brief or regulatory analysis", "Participation in TAI\'s Constitutional Period Workshop", "Engagement with TAI\'s policy network"],
  },
];

export default function Fellows() {
  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Fellows & Residencies</p>
            <h1 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              Developing the next generation of systems governance researchers.
            </h1>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              TAI\'s fellowship programs support researchers and practitioners who apply rigorous formal methods to the governance of complex systems. All programs are open to candidates who can demonstrate independence from commercial interests.
            </p>
          </Reveal>
        </div>
      </section>

      {PROGRAMS.map((p, i) => (
        <section key={p.code} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">
              <Reveal>
                <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{p.code}</p>
                <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#111111", lineHeight: 1.15, marginBottom: "0.5rem" }}>{p.title}</h2>
                <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#888888", fontStyle: "italic", marginBottom: "1.5rem" }}>{p.type}</p>
                <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#555555", lineHeight: 1.8, marginBottom: "1.5rem" }}>{p.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[{ label: "Duration", value: p.duration }, { label: "Application Cycle", value: p.cycle }, { label: "Support", value: p.stipend }].map(item => (
                    <div key={item.label} style={{ display: "flex", gap: "1rem" }}>
                      <span style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#AAAAAA", minWidth: "130px", paddingTop: "0.15rem" }}>{item.label}</span>
                      <span style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div style={{ border: "1px solid #E5E4E0", padding: "2rem", background: i % 2 === 0 ? "#FAFAF8" : "#FFFFFF", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Eligibility</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {p.eligibility.map(e => (
                      <div key={e} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#A02D24", fontSize: "0.75rem", paddingTop: "0.15rem", flexShrink: 0 }}>→</span>
                        <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555", lineHeight: 1.65 }}>{e}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ border: "1px solid #E5E4E0", padding: "2rem", background: i % 2 === 0 ? "#FAFAF8" : "#FFFFFF" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Expected Outputs</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {p.outputs.map(o => (
                      <div key={o} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#A02D24", fontSize: "0.75rem", paddingTop: "0.15rem", flexShrink: 0 }}>→</span>
                        <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#555555", lineHeight: 1.65 }}>{o}</p>
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
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Apply</p>
              <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1rem" }}>Interested in a fellowship or residency?</h2>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Applications for all programs are reviewed on a rolling basis except where noted. Contact us with a brief statement of interest and a CV to begin the process.
              </p>
              <Link href="/contact" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", textDecoration: "none", display: "inline-block", transition: "background 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
              >Contact Us →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
