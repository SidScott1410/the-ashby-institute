/**
 * Research.tsx — TAI Research Programs page
 * Four programs: Compute Futures, Compute Governance, GRT Project, Compute & Society
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
      { threshold: 0.1 }
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

const PROGRAMS = [
  {
    code: "CF",
    title: "Compute Futures",
    lead: "Structural forecasting and scenario analysis of the AI-native compute landscape.",
    description: "The Compute Futures program produces TAI's flagship scenario analysis work. The program examines how the physical infrastructure of AI — data centers, chip supply chains, energy systems, and network topology — will evolve through 2030 and what structural consequences follow for economic and geopolitical order. The program's primary output is the Compute 2030 annual report series, which models four structural scenarios for the global compute landscape. The program also produces working papers on specific infrastructure chokepoints, supply chain dependencies, and the strategic implications of compute concentration.",
    outputs: ["Compute 2030 Annual Report Series", "Infrastructure Chokepoint Analysis", "Compute Concentration Index", "Scenario Working Papers"],
    current: "Compute 2030, Volume I (June 2026) — now available",
    link: "https://theashbyinstitute.manus.space",
  },
  {
    code: "CG",
    title: "Compute Governance",
    lead: "Institutional design and policy analysis for governing strategic compute at national and multilateral levels.",
    description: "The Compute Governance program examines how existing and emerging institutions can govern the allocation, oversight, and security of AI-native compute infrastructure. The program analyzes the adequacy of current regulatory frameworks, identifies structural gaps in international coordination mechanisms, and develops institutional design proposals for compute governance bodies. Work in this program draws on comparative analysis of precedents from nuclear governance, financial regulation, and telecommunications policy — domains where the international community has previously confronted the governance of dual-use strategic technologies.",
    outputs: ["Compute Governance Annual", "Policy Brief Series", "Institutional Design Papers", "Treaty Framework Analysis"],
    current: "Compute Governance Annual, Vol. I — forthcoming Q4 2026",
    link: "/publications",
  },
  {
    code: "GRT",
    title: "The Good Regulator Project",
    lead: "Foundational research applying Ashby's Good Regulator Theorem to the design of AI regulatory institutions.",
    description: "The Good Regulator Project is TAI's foundational research program. It applies the mathematical results of Ashby and Conant's 1970 theorem — that any effective regulator must maintain an internal model of the system it regulates — to the challenge of AI governance. The program examines what it means, concretely, for a regulatory body to maintain an adequate model of a rapidly evolving AI system. It develops formal criteria for regulatory model adequacy, analyzes the institutional conditions under which such models can be maintained, and produces prescriptive guidance for the design of AI regulatory bodies. The program hosts the annual GRT Lecture Series.",
    outputs: ["GRT Lecture Series", "Regulatory Model Adequacy Framework", "Institutional Design Criteria", "Foundational Working Papers"],
    current: "GRT Lecture Series, inaugural lecture — Q3 2026",
    link: "/events",
  },
  {
    code: "CS",
    title: "Compute & Society",
    lead: "Distributional analysis of the compute transition — labor, geography, equity, and political economy.",
    description: "The Compute & Society program examines who bears the costs and captures the benefits of the compute transition. The program produces distributional analysis of AI infrastructure investment, labor market modeling for compute-intensive industries, geographic analysis of data center concentration, and equity assessments of differential access to AI-native services. The program also maintains the Compute Equity Index — a composite measure tracking the distribution of AI-native compute capacity across income levels, geographies, and demographic groups. The program engages directly with civil society organizations and policymakers focused on the social dimensions of technological transition.",
    outputs: ["Compute Equity Index", "Labor Market Analysis Series", "Geographic Concentration Reports", "Policy Briefs for Civil Society"],
    current: "Compute Equity Index, baseline edition — forthcoming 2026",
    link: "/publications",
  },
];

export default function Research() {
  return (
    <Layout>
      {/* Page header */}
      <section className="bg-[#0F1419] pt-32 pb-20">
        <div className="container">
          <Reveal>
            <span className="tai-label text-[#A02D24] block mb-4">Research</span>
            <div className="w-8 h-px bg-[#A02D24] mb-8" />
            <h1 className="font-['Fraunces'] font-[800] text-[#F0EDE8] leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Four Programs. One Mandate.
            </h1>
            <p className="font-['Inter'] text-[#9A9490] text-lg mt-6 max-w-xl leading-relaxed">
              TAI's research is organized into four programs, each addressing a distinct dimension of the compute transition. All programs share a commitment to structural analysis over commentary, and to independence over advocacy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      {PROGRAMS.map((prog, i) => (
        <section key={prog.code} className={i % 2 === 0 ? "bg-[#FAF8F5]" : "bg-[#F2EFE9]"}>
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <Reveal className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] border border-[#A02D24] px-2 py-1">
                      {prog.code}
                    </span>
                  </div>
                  <h2 className="font-['Fraunces'] font-[700] text-[#1A1714] leading-tight mb-4"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                    {prog.title}
                  </h2>
                  <p className="font-['Inter'] text-[#6B6560] text-sm leading-relaxed mb-8 italic">
                    {prog.lead}
                  </p>

                  {/* Current work */}
                  <div className="border-l-2 border-[#A02D24] pl-4 mb-8">
                    <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide mb-1">Current</p>
                    <p className="font-['Inter'] text-sm text-[#3D3A37]">{prog.current}</p>
                  </div>

                  {prog.code === "CF" ? (
                    <a href={prog.link} target="_blank" rel="noopener noreferrer" className="tai-btn-primary">
                      Read Report →
                    </a>
                  ) : (
                    <Link href={prog.link} className="tai-btn-primary">
                      View Outputs
                    </Link>
                  )}
                </div>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={100}>
                <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed mb-10">
                  {prog.description}
                </p>

                <div>
                  <p className="tai-label mb-4">Program Outputs</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prog.outputs.map((output) => (
                      <div key={output} className="flex items-start gap-3 py-3 border-b border-[#D4CFC9]">
                        <span className="w-1 h-1 rounded-full bg-[#A02D24] mt-2 flex-shrink-0" />
                        <span className="font-['Inter'] text-sm text-[#3D3A37]">{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Research approach */}
      <section className="bg-[#0F1419] py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="tai-label text-[#A02D24] block mb-4">Research Approach</span>
              <h2 className="font-['Fraunces'] font-[700] text-[#F0EDE8] mb-8"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Structural Analysis, Not Commentary
              </h2>
              <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed mb-6">
                TAI's research methodology is explicitly structural. We do not produce commentary on current events, advocacy for specific policy positions, or analysis commissioned by interested parties. We produce models — formal and informal — of the systems that policymakers and institutions must regulate.
              </p>
              <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed mb-10">
                All TAI research is subject to independent peer review before publication. All data, code, and methodological documentation are published alongside research outputs. We do not accept restricted funding that limits publication rights.
              </p>
              <Link href="/about" className="tai-btn-ghost-light mx-auto">
                Independence Policy
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
