/**
 * Home.tsx — TAI Homepage
 * Sections: Hero, Mission/GRT framing, Featured Research (Compute 2030),
 * Research Programs, Who We Are, Newsletter CTA
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029926944/TLXgUMFr75EaJR9nBJmBKv/tai_logo_mark-PP4vVDsCzFnmzYakfJD2qA.webp";

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

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const PROGRAMS = [
  {
    code: "CF",
    title: "Compute Futures",
    description: "Scenario analysis and structural forecasting of AI-native compute infrastructure through 2030 and beyond. The home of the Compute 2030 annual report series.",
  },
  {
    code: "CG",
    title: "Compute Governance",
    description: "Institutional design, treaty frameworks, and policy analysis for governing the allocation and oversight of strategic compute resources at national and multilateral levels.",
  },
  {
    code: "GRT",
    title: "The Good Regulator Project",
    description: "Foundational research applying Ashby's Good Regulator Theorem to AI governance: what it means for regulatory bodies to maintain adequate models of the systems they regulate.",
  },
  {
    code: "CS",
    title: "Compute & Society",
    description: "Distributional analysis of the compute transition — labor market effects, geographic concentration, equity implications, and the political economy of AI infrastructure.",
  },
];

export default function Home() {
  return (
    <Layout darkHero>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#0F1419] min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#F0EDE8 1px, transparent 1px), linear-gradient(90deg, #F0EDE8 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-[#A02D24]" />
              <span className="tai-label text-[#A02D24]">The Ashby Institute</span>
            </div>

            {/* Main tagline */}
            <h1 className="font-['Fraunces'] font-[900] text-[#F0EDE8] leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Every good regulator must be a model of its system.
            </h1>

            {/* Sub-statement */}
            <p className="font-['Inter'] text-[#9A9490] text-lg leading-relaxed max-w-xl mb-12">
              An independent nonprofit research organization producing rigorous structural analysis of the compute transition — the period in which AI-native compute orchestration reshapes the global economy, governance, and strategic balance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/research" className="tai-btn-ghost-light">
                Our Research
              </Link>
              <a
                href="https://theashbyinstitute.manus.space"
                target="_blank"
                rel="noopener noreferrer"
                className="tai-btn-primary"
                style={{ borderColor: "#A02D24", color: "#A02D24" }}
              >
                Compute 2030 Report
              </a>
            </div>
          </div>

          {/* Decorative mark — large, faint, right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden lg:block">
            <img src={LOGO_URL} alt="" className="w-96 h-96 object-contain" style={{ filter: "invert(1)" }} />
          </div>
        </div>

        {/* Bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#2A2F36]" />
      </section>

      {/* ── GRT FRAMING ──────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <RevealSection className="lg:col-span-4">
              <span className="tai-label block mb-4">The Good Regulator Theorem</span>
              <div className="w-12 h-px bg-[#A02D24] mb-6" />
            </RevealSection>
            <RevealSection className="lg:col-span-8" delay={100}>
              <blockquote className="font-['Fraunces'] font-[400] italic text-[#1A1714] leading-relaxed mb-6"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)" }}>
                "Every good regulator of a system must be a model of that system."
              </blockquote>
              <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] mb-8">
                — W. Ross Ashby & Roger Conant, 1970
              </p>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed mb-6">
                The Ashby Institute takes its name and its mandate from this theorem. In 1970, W. Ross Ashby and Roger Conant proved that any system capable of regulating another must maintain an internal model of the regulated system. The theorem is not a metaphor — it is a mathematical result with direct implications for governance design.
              </p>
              <p className="font-['Inter'] text-[#3D3A37] text-base leading-relaxed">
                As AI systems assume increasing roles in economic coordination, infrastructure management, and strategic decision-making, the institutions responsible for governing them face a structural challenge: they must model systems of unprecedented complexity and speed. TAI exists to support that modeling effort — producing the structural analysis that good regulation requires.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── FEATURED RESEARCH: COMPUTE 2030 ──────────────────── */}
      <section className="bg-[#0F1419] py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(#F0EDE8 1px, transparent 1px), linear-gradient(90deg, #F0EDE8 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container relative z-10">
          <RevealSection>
            <span className="tai-label text-[#A02D24] block mb-2">Featured Research</span>
            <div className="w-8 h-px bg-[#A02D24] mb-10" />
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <RevealSection className="lg:col-span-7" delay={100}>
              <div className="border border-[#2A2F36] p-8 md:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="tai-label text-[#A02D24] block mb-3">Compute Futures Program</span>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560]">Annual Scenario Report · June 2026 · Vol. I</span>
                  </div>
                </div>
                <h2 className="font-['Fraunces'] font-[700] text-[#F0EDE8] leading-tight mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
                  Compute 2030: Scenarios for the AI-Native Economy
                </h2>
                <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed mb-8">
                  TAI's inaugural publication. Four structural scenarios for the global compute landscape through 2030, examining how the concentration, governance, and allocation of AI-native compute infrastructure will reshape economic power, geopolitical alignment, and institutional capacity. The first edition in an annual series.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://theashbyinstitute.manus.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tai-btn-primary"
                  >
                    Read the Report →
                  </a>
                  <Link href="/publications" className="tai-btn-ghost-light">
                    All Publications
                  </Link>
                </div>
              </div>
            </RevealSection>

            <RevealSection className="lg:col-span-5" delay={200}>
              <div className="space-y-6">
                <div className="border-l-2 border-[#A02D24] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] mb-2 uppercase tracking-widest">Scenario I</p>
                  <p className="font-['Fraunces'] text-[#F0EDE8] font-[500] text-lg">Concentrated Dominance</p>
                  <p className="font-['Inter'] text-[#6B6560] text-sm mt-1">A single national actor achieves decisive compute advantage, restructuring global dependencies.</p>
                </div>
                <div className="border-l-2 border-[#2A2F36] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] mb-2 uppercase tracking-widest">Scenario II</p>
                  <p className="font-['Fraunces'] text-[#F0EDE8] font-[500] text-lg">Multipolar Fragmentation</p>
                  <p className="font-['Inter'] text-[#6B6560] text-sm mt-1">Competing compute blocs emerge, with governance frameworks diverging across jurisdictions.</p>
                </div>
                <div className="border-l-2 border-[#2A2F36] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] mb-2 uppercase tracking-widest">Scenario III</p>
                  <p className="font-['Fraunces'] text-[#F0EDE8] font-[500] text-lg">Governed Transition</p>
                  <p className="font-['Inter'] text-[#6B6560] text-sm mt-1">Multilateral frameworks successfully coordinate compute governance, preserving institutional balance.</p>
                </div>
                <div className="border-l-2 border-[#2A2F36] pl-6">
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] mb-2 uppercase tracking-widest">Scenario IV</p>
                  <p className="font-['Fraunces'] text-[#F0EDE8] font-[500] text-lg">Diffuse Proliferation</p>
                  <p className="font-['Inter'] text-[#6B6560] text-sm mt-1">Compute capacity distributes broadly, with governance lagging behind technological diffusion.</p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── RESEARCH PROGRAMS ────────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-24 md:py-32">
        <div className="container">
          <RevealSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="tai-label block mb-3">Research Programs</span>
                <h2 className="font-['Fraunces'] font-[700] text-[#1A1714]"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                  Four Programs. One Mandate.
                </h2>
              </div>
              <Link href="/research" className="tai-btn-primary hidden md:inline-flex">
                View All Research
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#D4CFC9]">
            {PROGRAMS.map((prog, i) => (
              <RevealSection key={prog.code} delay={i * 80}>
                <div className={`p-8 border-[#D4CFC9] h-full ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] border border-[#A02D24] px-2 py-0.5 flex-shrink-0">
                      {prog.code}
                    </span>
                    <h3 className="font-['Fraunces'] font-[600] text-[#1A1714] text-xl leading-tight">
                      {prog.title}
                    </h3>
                  </div>
                  <p className="font-['Inter'] text-[#6B6560] text-sm leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          <div className="mt-6 md:hidden">
            <Link href="/research" className="tai-btn-primary w-full text-center justify-center">
              View All Research
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────── */}
      <section className="bg-[#1A1714] py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <RevealSection className="lg:col-span-5">
              <span className="tai-label text-[#A02D24] block mb-4">Who We Are</span>
              <div className="w-8 h-px bg-[#A02D24] mb-8" />
              <h2 className="font-['Fraunces'] font-[700] text-[#F0EDE8] leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                Independent. Rigorous. Structurally focused.
              </h2>
              <Link href="/about" className="tai-btn-ghost-light">
                About the Institute
              </Link>
            </RevealSection>

            <RevealSection className="lg:col-span-7" delay={100}>
              <div className="space-y-6">
                <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed">
                  The Ashby Institute is a nonprofit research organization with no commercial affiliations, no government contracts, and no industry funding. Our independence is structural, not aspirational — it is encoded in our governance documents and enforced by our Board.
                </p>
                <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed">
                  We operate through four research programs, a competitive fellowship program, and an annual symposium series. Our staffing model combines a small permanent research staff with a rotating cohort of Senior Research Fellows, Visiting Fellows, and Policy Residents drawn from academia, government, and civil society.
                </p>
                <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed">
                  TAI does not advocate for specific policy outcomes. We produce structural analysis — the kind of modeling that Ashby's theorem identifies as the precondition for effective regulation.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#2A2F36]">
                  {[
                    { num: "4", label: "Research Programs" },
                    { num: "3", label: "Annual Events" },
                    { num: "2026", label: "Founded" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-['Fraunces'] font-[700] text-[#F0EDE8] text-3xl mb-1">{stat.num}</p>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-20 border-t border-[#D4CFC9]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <RevealSection>
              <span className="tai-label block mb-4">Stay Informed</span>
              <h2 className="font-['Fraunces'] font-[700] text-[#1A1714] mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Receive TAI Research Updates
              </h2>
              <p className="font-['Inter'] text-[#6B6560] text-base mb-8">
                New publications, event announcements, and fellowship opportunities. No promotional content.
              </p>
              <Link href="/contact" className="tai-btn-primary mx-auto">
                Subscribe to the Newsletter
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
