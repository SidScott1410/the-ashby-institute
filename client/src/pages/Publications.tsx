/**
 * Publications.tsx — TAI Publications page
 * Series: Compute 2030, Compute Governance Annual, GRT Lectures, Compute Equity Index,
 * Working Papers, Policy Briefs
 * Design: The Monograph — editorial list format, filter by series
 */
import { useEffect, useRef, useState } from "react";
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

type Pub = {
  series: string;
  title: string;
  subtitle?: string;
  date: string;
  status: "available" | "forthcoming";
  type: string;
  link?: string;
  description: string;
};

const PUBLICATIONS: Pub[] = [
  {
    series: "Compute 2030",
    title: "Compute 2030: Scenarios for the AI-Native Economy",
    subtitle: "Volume I",
    date: "June 2026",
    status: "available",
    type: "Annual Scenario Report",
    link: "https://theashbyinstitute.manus.space",
    description: "TAI's inaugural publication. Four structural scenarios for the global compute landscape through 2030, examining how the concentration, governance, and allocation of AI-native compute infrastructure will reshape economic power, geopolitical alignment, and institutional capacity.",
  },
  {
    series: "Compute Governance Annual",
    title: "Compute Governance Annual",
    subtitle: "Volume I",
    date: "Q4 2026",
    status: "forthcoming",
    type: "Annual Review",
    description: "A comprehensive annual review of developments in compute governance policy, institutional design, and international coordination mechanisms. Covers national regulatory developments, multilateral initiatives, and emerging governance frameworks.",
  },
  {
    series: "GRT Lecture Series",
    title: "The Good Regulator Theorem and the Design of AI Regulatory Institutions",
    subtitle: "Inaugural Lecture",
    date: "Q3 2026",
    status: "forthcoming",
    type: "Lecture Transcript & Commentary",
    description: "The inaugural lecture in TAI's annual GRT Lecture Series. Examines the formal implications of Ashby and Conant's 1970 theorem for the design of AI regulatory bodies, with particular attention to the question of model adequacy in rapidly evolving technological systems.",
  },
  {
    series: "Compute Equity Index",
    title: "Compute Equity Index: Baseline Edition",
    subtitle: "2026",
    date: "Late 2026",
    status: "forthcoming",
    type: "Index & Methodology Report",
    description: "The baseline edition of TAI's Compute Equity Index — a composite measure tracking the distribution of AI-native compute capacity across income levels, geographies, and demographic groups. Includes full methodology documentation and underlying data.",
  },
  {
    series: "Working Papers",
    title: "Infrastructure Chokepoints in the Global AI Supply Chain",
    date: "Q3 2026",
    status: "forthcoming",
    type: "Working Paper",
    description: "An analysis of structural chokepoints in the global AI infrastructure supply chain — semiconductor fabrication, rare earth processing, data center construction, and energy systems — and their implications for compute concentration and geopolitical leverage.",
  },
  {
    series: "Policy Briefs",
    title: "Toward a Multilateral Compute Governance Framework: Design Principles",
    date: "Q4 2026",
    status: "forthcoming",
    type: "Policy Brief",
    description: "A concise policy brief outlining design principles for a multilateral compute governance framework, drawing on precedents from nuclear governance, financial regulation, and telecommunications policy.",
  },
];

const SERIES_META = [
  { name: "Compute 2030", code: "C30", desc: "Annual scenario reports on the global compute landscape" },
  { name: "Compute Governance Annual", code: "CGA", desc: "Annual review of compute governance policy developments" },
  { name: "GRT Lecture Series", code: "GRT", desc: "Annual public lecture on the Good Regulator Theorem" },
  { name: "Compute Equity Index", code: "CEI", desc: "Composite measure of AI compute distribution" },
  { name: "Working Papers", code: "WP", desc: "Research papers on specific analytical questions" },
  { name: "Policy Briefs", code: "PB", desc: "Concise policy-oriented analysis" },
];

const ALL_FILTERS = ["All", ...SERIES_META.map(s => s.name)];

export default function Publications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? PUBLICATIONS : PUBLICATIONS.filter(p => p.series === activeFilter);

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-[#0F1419] pt-32 pb-20">
        <div className="container">
          <Reveal>
            <span className="tai-label text-[#A02D24] block mb-4">Publications</span>
            <div className="w-8 h-px bg-[#A02D24] mb-8" />
            <h1 className="font-['Fraunces'] font-[800] text-[#F0EDE8] leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              TAI Publication Series
            </h1>
            <p className="font-['Inter'] text-[#9A9490] text-lg mt-6 max-w-xl leading-relaxed">
              TAI publishes across six series. All publications are freely available. All underlying data and methodology are published alongside research outputs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Series overview grid */}
      <section className="bg-[#FAF8F5] py-16 border-b border-[#D4CFC9]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#D4CFC9]">
            {SERIES_META.map((s, i) => {
              const pubCount = PUBLICATIONS.filter(p => p.series === s.name).length;
              const available = PUBLICATIONS.filter(p => p.series === s.name && p.status === "available").length;
              const isActive = activeFilter === s.name;
              return (
                <Reveal key={s.name} delay={i * 50}>
                  <button
                    onClick={() => setActiveFilter(isActive ? "All" : s.name)}
                    className={`text-left p-6 w-full h-full transition-all duration-150 border-b border-r border-[#D4CFC9] ${
                      isActive
                        ? "bg-[#A02D24]/5 border-l-2 border-l-[#A02D24]"
                        : "hover:bg-[#F2EFE9]"
                    } ${i % 3 === 2 ? "lg:border-r-0" : ""} ${i >= 3 ? "sm:border-b-0" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`font-['IBM_Plex_Mono'] text-xs border px-2 py-0.5 ${isActive ? "border-[#A02D24] text-[#A02D24]" : "border-[#D4CFC9] text-[#6B6560]"}`}>
                        {s.code}
                      </span>
                      <span className={`font-['IBM_Plex_Mono'] text-xs ${available > 0 ? "text-[#2D7A2D]" : "text-[#6B6560]"}`}>
                        {available > 0 ? `${available} available` : "Forthcoming"}
                      </span>
                    </div>
                    <h3 className={`font-['Fraunces'] font-[600] text-base leading-tight mb-2 ${isActive ? "text-[#1A1714]" : "text-[#1A1714]"}`}>
                      {s.name}
                    </h3>
                    <p className="font-['Inter'] text-xs text-[#6B6560] leading-relaxed">{s.desc}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications list */}
      <section className="bg-[#FAF8F5] py-16">
        <div className="container">
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            <span className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] mr-2">Filter:</span>
            {ALL_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-['IBM_Plex_Mono'] text-xs px-3 py-1.5 border transition-all duration-150 ${
                  activeFilter === f
                    ? "border-[#A02D24] text-[#A02D24] bg-[#A02D24]/5"
                    : "border-[#D4CFC9] text-[#6B6560] hover:border-[#A02D24]/40 hover:text-[#A02D24]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Publication rows */}
          <div className="border border-[#D4CFC9]">
            {filtered.map((pub, i) => (
              <Reveal key={pub.title} delay={i * 60}>
                <div className={`p-8 group hover:bg-[#F2EFE9] transition-colors duration-150 ${i < filtered.length - 1 ? "border-b border-[#D4CFC9]" : ""}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-9">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="tai-label">{pub.series}</span>
                        <span className="font-['IBM_Plex_Mono'] text-xs text-[#D4CFC9]">·</span>
                        <span className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide">{pub.type}</span>
                        {pub.status === "available" && (
                          <>
                            <span className="font-['IBM_Plex_Mono'] text-xs text-[#D4CFC9]">·</span>
                            <span className="font-['IBM_Plex_Mono'] text-xs text-[#2D7A2D] uppercase tracking-wide border border-[#2D7A2D]/30 px-2 py-0.5">Available</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-['Fraunces'] font-[700] text-[#1A1714] leading-tight mb-1"
                        style={{ fontSize: "clamp(1.1rem, 2vw, 1.375rem)" }}>
                        {pub.title}
                        {pub.subtitle && (
                          <span className="font-['Fraunces'] font-[400] italic text-[#6B6560] ml-2 text-base">— {pub.subtitle}</span>
                        )}
                      </h3>
                      <p className="font-['Inter'] text-[#6B6560] text-sm leading-relaxed mt-3 max-w-2xl">
                        {pub.description}
                      </p>
                    </div>
                    <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between gap-4 lg:pt-1">
                      <div className="lg:text-right">
                        <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560]">{pub.date}</p>
                        <p className={`font-['IBM_Plex_Mono'] text-xs mt-1 ${pub.status === "available" ? "text-[#2D7A2D]" : "text-[#A02D24]"}`}>
                          {pub.status === "available" ? "Available now" : "Forthcoming"}
                        </p>
                      </div>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target={pub.link.startsWith("http") ? "_blank" : undefined}
                          rel={pub.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="tai-btn-primary text-xs"
                        >
                          Read →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-['Inter'] text-[#6B6560]">No publications in this series yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Open access statement */}
      <section className="bg-[#0F1419] py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <span className="tai-label text-[#A02D24] block mb-4">Open Access Policy</span>
              <div className="w-8 h-px bg-[#A02D24]" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed mb-4">
                All TAI publications are freely available without registration or paywall. We do not accept restricted funding that limits publication rights. Underlying data and methodological documentation are published alongside all research outputs.
              </p>
              <p className="font-['Inter'] text-[#9A9490] text-base leading-relaxed mb-8">
                To receive notification of new publications, subscribe to the TAI newsletter.
              </p>
              <Link href="/contact" className="tai-btn-ghost-light">
                Subscribe to Updates
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
