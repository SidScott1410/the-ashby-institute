/**
 * About.tsx — TAI About page
 * Founding story, governance (Board, Scientific Advisory Council),
 * independence policy, staffing model
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
      { threshold: 0.08 }
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
  { role: "Board Chair", note: "Independent, non-executive" },
  { role: "Treasurer", note: "Independent, non-executive" },
  { role: "Secretary", note: "Independent, non-executive" },
  { role: "Board Member", note: "Research community representative" },
  { role: "Board Member", note: "Policy community representative" },
];

const SAC_ROLES = [
  { role: "Chair, Scientific Advisory Council", note: "Senior academic appointment" },
  { role: "SAC Member", note: "Economics / political economy" },
  { role: "SAC Member", note: "Computer science / AI systems" },
  { role: "SAC Member", note: "International law / governance" },
  { role: "SAC Member", note: "Science and technology studies" },
  { role: "SAC Member", note: "National security / strategic studies" },
];

export default function About() {
  return (
    <Layout>
      {/* Page header */}
      <section className="bg-[#0F1419] pt-32 pb-20">
        <div className="container">
          <Reveal>
            <span className="tai-label text-[#A02D24] block mb-4">About</span>
            <div className="w-8 h-px bg-[#A02D24] mb-8" />
            <h1 className="font-['Fraunces'] font-[800] text-[#F0EDE8] leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              The Ashby Institute
            </h1>
            <p className="font-['Inter'] text-[#9A9490] text-lg mt-6 max-w-xl leading-relaxed">
              An independent nonprofit research organization. No commercial affiliations. No government contracts. No industry funding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founding story */}
      <section className="bg-[#FAF8F5] py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <span className="tai-label block mb-4">Founding Story</span>
              <div className="w-8 h-px bg-[#A02D24] mb-6" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed mb-6">
                The Ashby Institute was founded on the observation that the institutions responsible for governing AI systems are structurally underprepared for the task. Not because they lack expertise or resources, but because they lack adequate models of the systems they are attempting to regulate.
              </p>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed mb-6">
                This is precisely the problem that W. Ross Ashby and Roger Conant identified in 1970: a regulator cannot effectively govern a system it does not model. The theorem is mathematical, but its implications are institutional. If regulatory bodies do not maintain adequate internal models of the systems they oversee, their interventions will be systematically inadequate — not because of bad faith or insufficient effort, but because of a structural mismatch between the complexity of the regulated system and the complexity of the regulatory model.
              </p>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed mb-6">
                TAI was founded to address this structural gap. Our mandate is to produce the kind of rigorous, independent structural analysis that good regulation requires — analysis that models the compute transition at the level of complexity it actually exhibits, and that is available to policymakers, researchers, and civil society without restriction.
              </p>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed">
                The Institute is organized as an independent nonprofit. It has no commercial affiliations, accepts no industry funding, and holds no government contracts. Its independence is structural, not aspirational — encoded in its governance documents and enforced by its Board.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="bg-[#FAF8F5] py-24 md:py-32 border-t border-[#D4CFC9]">
        <div className="container">
          <Reveal>
            <span className="tai-label block mb-4">Governance</span>
            <div className="w-8 h-px bg-[#A02D24] mb-12" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Board */}
            <Reveal delay={100}>
              <h2 className="font-['Fraunces'] font-[700] text-[#1A1714] text-2xl mb-2">Board of Directors</h2>
              <p className="font-['Inter'] text-[#6B6560] text-sm mb-8 leading-relaxed">
                The Board of Directors holds fiduciary responsibility for the Institute and enforces the independence policy. All Board members are independent of commercial AI interests.
              </p>
              <div className="space-y-0 border border-[#D4CFC9]">
                {BOARD_ROLES.map((item, i) => (
                  <div key={i} className={`flex items-start justify-between p-4 bg-white ${i < BOARD_ROLES.length - 1 ? "border-b border-[#D4CFC9]" : ""}`}>
                    <div>
                      <p className="font-['Fraunces'] font-[500] text-[#1A1714] text-base">{item.role}</p>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#9A9490] mt-0.5">{item.note}</p>
                    </div>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] border border-[#A02D24]/30 px-2 py-0.5 flex-shrink-0 ml-4">
                      TBA
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-['IBM_Plex_Mono'] text-xs text-[#9A9490] mt-4">
                Board appointments will be announced at launch. Nominations are under review.
              </p>
            </Reveal>

            {/* SAC */}
            <Reveal delay={200}>
              <h2 className="font-['Fraunces'] font-[700] text-[#1A1714] text-2xl mb-2">Scientific Advisory Council</h2>
              <p className="font-['Inter'] text-[#6B6560] text-sm mb-8 leading-relaxed">
                The Scientific Advisory Council provides methodological oversight and peer review for TAI's research programs. SAC members are drawn from academia and research institutions.
              </p>
              <div className="space-y-0 border border-[#D4CFC9]">
                {SAC_ROLES.map((item, i) => (
                  <div key={i} className={`flex items-start justify-between p-4 bg-white ${i < SAC_ROLES.length - 1 ? "border-b border-[#D4CFC9]" : ""}`}>
                    <div>
                      <p className="font-['Fraunces'] font-[500] text-[#1A1714] text-base">{item.role}</p>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#9A9490] mt-0.5">{item.note}</p>
                    </div>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] border border-[#A02D24]/30 px-2 py-0.5 flex-shrink-0 ml-4">
                      TBA
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-['IBM_Plex_Mono'] text-xs text-[#9A9490] mt-4">
                SAC appointments will be announced at launch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Independence policy */}
      <section className="bg-[#FAF8F5] py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <span className="tai-label block mb-4">Independence Policy</span>
              <div className="w-8 h-px bg-[#A02D24] mb-6" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <div className="space-y-6">
                <div className="border-l-2 border-[#A02D24] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide mb-2">Funding Independence</p>
                  <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed">
                    TAI does not accept funding from commercial AI companies, semiconductor manufacturers, cloud infrastructure providers, or any entity with a direct financial interest in the compute transition. Funding is accepted from foundations, governments (subject to publication independence conditions), and individual donors. All funding sources are disclosed publicly.
                  </p>
                </div>
                <div className="border-l-2 border-[#D4CFC9] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide mb-2">Publication Independence</p>
                  <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed">
                    No funder has the right to review, delay, or modify TAI publications before release. All research is subject to independent peer review. TAI does not accept restricted funding that limits publication rights or requires pre-publication review by funders.
                  </p>
                </div>
                <div className="border-l-2 border-[#D4CFC9] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide mb-2">Advocacy Independence</p>
                  <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed">
                    TAI does not advocate for specific policy outcomes, commercial interests, or political positions. Our mandate is structural analysis, not advocacy. We produce models; we do not lobby.
                  </p>
                </div>
                <div className="border-l-2 border-[#D4CFC9] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide mb-2">Governance Independence</p>
                  <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed">
                    All Board members are independent of commercial AI interests. Board members with relevant financial interests are required to disclose and recuse. The independence policy is reviewed annually by the Board and published on the TAI website.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Staffing model */}
      <section className="bg-[#F2EFE9] py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <span className="tai-label block mb-4">Staffing Model</span>
              <div className="w-8 h-px bg-[#A02D24] mb-6" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed mb-6">
                TAI operates with a deliberately lean permanent staff. The Institute's research capacity is built primarily through its fellowship programs, which bring in a rotating cohort of researchers and practitioners on fixed-term appointments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {[
                  { title: "Permanent Staff", desc: "A small core team responsible for research program management, operations, and institutional continuity." },
                  { title: "Ashby Fellows", desc: "Annual competitive fellowship cohort. Full-time research appointments for 12 months, renewable." },
                  { title: "Senior Research Fellows", desc: "Established scholars and practitioners on 2–3 year affiliate appointments." },
                  { title: "Visiting Fellows", desc: "Short-term resident researchers completing specific projects, typically 3–6 months." },
                  { title: "Policy Residents", desc: "Government and policy practitioners on 6–12 month structured residencies." },
                  { title: "Scientific Advisory Council", desc: "External methodological oversight and peer review, non-resident." },
                ].map((item) => (
                  <div key={item.title} className="border border-[#D4CFC9] p-5 bg-[#FAF8F5]">
                    <p className="font-['Fraunces'] font-[600] text-[#1A1714] text-base mb-2">{item.title}</p>
                    <p className="font-['Inter'] text-[#6B6560] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#0F1419] py-20">
        <div className="container">
          <div className="max-w-2xl">
            <Reveal>
              <span className="tai-label text-[#A02D24] block mb-4">Contact</span>
              <h2 className="font-['Fraunces'] font-[700] text-[#F0EDE8] mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Engage with the Institute
              </h2>
              <p className="font-['Inter'] text-[#9A9490] text-base mb-8 leading-relaxed">
                For research inquiries, fellowship applications, media requests, or partnership discussions, contact the Institute directly.
              </p>
              <Link href="/contact" className="tai-btn-ghost-light">
                Contact the Institute
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
