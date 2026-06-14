/**
 * Fellows.tsx — TAI Fellows page
 * Ashby Fellowship, Senior Research Fellows, Visiting Fellows, Policy Residency
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

const FELLOWSHIP_TYPES = [
  {
    code: "AF",
    title: "The Ashby Fellowship",
    type: "Flagship Competitive Fellowship",
    duration: "12 months, renewable",
    location: "Washington DC, London, or Singapore",
    description: "TAI's flagship competitive fellowship program. The Ashby Fellowship supports early- and mid-career researchers conducting independent work on the structural dimensions of the compute transition. Fellows are selected through a competitive annual process and receive full research support, including salary, research budget, and access to TAI's data infrastructure and advisory networks.",
    eligibility: "Doctoral candidates (ABD), postdoctoral researchers, and early-career professionals with demonstrated research capacity in relevant fields. Disciplinary backgrounds in economics, political science, computer science, law, and related fields are all appropriate. Interdisciplinary applications are encouraged.",
    benefits: [
      "Full salary and benefits",
      "Dedicated research budget",
      "Access to TAI data infrastructure",
      "Participation in TAI events and symposia",
      "Publication support and peer review",
      "Policy engagement opportunities",
    ],
    cycle: "Annual. Applications open September; decisions announced January.",
    accent: true,
  },
  {
    code: "SRF",
    title: "Senior Research Fellows",
    type: "Appointment",
    duration: "2–3 years, renewable",
    location: "Remote or resident",
    description: "Senior Research Fellows are established scholars and practitioners who contribute to TAI's research programs on a sustained basis. Senior Fellows typically hold primary appointments at universities, government agencies, or other research institutions and affiliate with TAI to pursue collaborative research, contribute to program development, and participate in TAI events.",
    eligibility: "Established researchers with a significant publication record in relevant fields, or senior practitioners with demonstrated analytical expertise in compute policy, AI governance, or related domains.",
    benefits: [
      "Research affiliation and institutional support",
      "Collaborative research opportunities",
      "Publication in TAI series",
      "Participation in TAI Symposium",
      "Policy engagement platform",
    ],
    cycle: "Rolling appointments. Inquiries welcome year-round.",
    accent: false,
  },
  {
    code: "VF",
    title: "Visiting Fellows",
    type: "Short-Term Appointment",
    duration: "3–6 months",
    location: "Washington DC, London, or Singapore",
    description: "Visiting Fellowships support researchers and practitioners who wish to spend a concentrated period in residence at TAI to complete a specific research project. Visiting Fellows have access to TAI's research infrastructure and participate in the intellectual life of the Institute during their residency.",
    eligibility: "Researchers at any career stage with a defined project proposal relevant to TAI's research mandate. Visiting Fellowships are particularly appropriate for sabbatical visits and for practitioners transitioning between government and research roles.",
    benefits: [
      "Office space and research infrastructure",
      "Stipend (for qualifying applicants)",
      "Seminar participation",
      "Publication support",
    ],
    cycle: "Rolling. Applications accepted on a space-available basis.",
    accent: false,
  },
  {
    code: "PR",
    title: "Policy Residency",
    type: "Practitioner Program",
    duration: "6–12 months",
    location: "Washington DC or London",
    description: "The Policy Residency is designed for current or former government officials, legislative staff, and international organization professionals who wish to develop deeper analytical capacity on compute governance and AI policy. Residents work alongside TAI researchers on active projects while developing their own analytical frameworks for application in policy contexts.",
    eligibility: "Current or former government officials, legislative staff, diplomatic personnel, or international organization professionals with direct experience in technology policy, national security, or economic governance.",
    benefits: [
      "Structured research mentorship",
      "Access to TAI research programs",
      "Policy brief development support",
      "Network access across TAI's advisory community",
    ],
    cycle: "Biannual cohorts. Applications open March and September.",
    accent: false,
  },
];

export default function Fellows() {
  return (
    <Layout>
      {/* Page header */}
      <section className="bg-[#0F1419] pt-32 pb-20">
        <div className="container">
          <Reveal>
            <span className="tai-label text-[#A02D24] block mb-4">Fellows</span>
            <div className="w-8 h-px bg-[#A02D24] mb-8" />
            <h1 className="font-['Fraunces'] font-[800] text-[#F0EDE8] leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              The TAI Fellowship Programs
            </h1>
            <p className="font-['Inter'] text-[#9A9490] text-lg mt-6 max-w-xl leading-relaxed">
              TAI supports researchers and practitioners through four fellowship programs. Each program is designed to attract independent thinkers who can contribute to rigorous structural analysis of the compute transition.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fellowship programs */}
      {FELLOWSHIP_TYPES.map((f, i) => (
        <section key={f.code} className={f.accent ? "bg-[#1A1714]" : i % 2 === 0 ? "bg-[#FAF8F5]" : "bg-[#F2EFE9]"}>
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <Reveal className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`font-['IBM_Plex_Mono'] text-xs border px-2 py-1 ${f.accent ? "border-[#A02D24] text-[#A02D24]" : "border-[#A02D24] text-[#A02D24]"}`}>
                      {f.code}
                    </span>
                    {f.accent && (
                      <span className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide">Flagship</span>
                    )}
                  </div>
                  <h2 className={`font-['Fraunces'] font-[700] leading-tight mb-2 ${f.accent ? "text-[#F0EDE8]" : "text-[#1A1714]"}`}
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                    {f.title}
                  </h2>
                  <p className={`font-['IBM_Plex_Mono'] text-xs mb-6 ${f.accent ? "text-[#6B6560]" : "text-[#6B6560]"}`}>
                    {f.type}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div>
                      <p className={`font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide mb-1 ${f.accent ? "text-[#A02D24]" : "text-[#A02D24]"}`}>Duration</p>
                      <p className={`font-['Inter'] text-sm ${f.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>{f.duration}</p>
                    </div>
                    <div>
                      <p className={`font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide mb-1 ${f.accent ? "text-[#A02D24]" : "text-[#A02D24]"}`}>Location</p>
                      <p className={`font-['Inter'] text-sm ${f.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>{f.location}</p>
                    </div>
                    <div>
                      <p className={`font-['IBM_Plex_Mono'] text-xs uppercase tracking-wide mb-1 ${f.accent ? "text-[#A02D24]" : "text-[#A02D24]"}`}>Application Cycle</p>
                      <p className={`font-['Inter'] text-sm ${f.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>{f.cycle}</p>
                    </div>
                  </div>

                  <Link href="/contact" className={f.accent ? "tai-btn-primary" : "tai-btn-primary"}>
                    Inquire
                  </Link>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={100}>
                <p className={`font-['Inter'] text-base leading-relaxed mb-8 ${f.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>
                  {f.description}
                </p>

                <div className="mb-8">
                  <p className={`tai-label mb-3 ${f.accent ? "text-[#A02D24]" : ""}`}>Eligibility</p>
                  <p className={`font-['Inter'] text-sm leading-relaxed ${f.accent ? "text-[#9A9490]" : "text-[#6B6560]"}`}>
                    {f.eligibility}
                  </p>
                </div>

                <div>
                  <p className="tai-label mb-4">Program Benefits</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {f.benefits.map((b) => (
                      <div key={b} className={`flex items-start gap-3 py-2.5 border-b ${f.accent ? "border-[#2A2F36]" : "border-[#D4CFC9]"}`}>
                        <span className="w-1 h-1 rounded-full bg-[#A02D24] mt-2 flex-shrink-0" />
                        <span className={`font-['Inter'] text-sm ${f.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#FAF8F5] py-20 border-t border-[#D4CFC9]">
        <div className="container">
          <div className="max-w-2xl">
            <Reveal>
              <span className="tai-label block mb-4">Applications & Inquiries</span>
              <h2 className="font-['Fraunces'] font-[700] text-[#1A1714] mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Join the TAI Research Community
              </h2>
              <p className="font-['Inter'] text-[#6B6560] text-base mb-8 leading-relaxed">
                For application materials, fellowship inquiries, or questions about TAI's fellowship programs, contact the Institute directly. We welcome inquiries from researchers and practitioners across all relevant disciplines.
              </p>
              <Link href="/contact" className="tai-btn-primary">
                Contact the Institute
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
