/**
 * Events.tsx — TAI Events page
 * The Ashby Symposium, Constitutional Period Workshop, GRT Lecture Series
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

const EVENTS = [
  {
    code: "AS",
    title: "The Ashby Symposium",
    subtitle: "Annual Conference",
    cadence: "Annual",
    locations: ["Washington DC", "London", "Singapore"],
    locationNote: "Rotating annually across three host cities",
    nextEdition: "2027 — Location TBA",
    description: "The Ashby Symposium is TAI's flagship annual convening. The Symposium brings together researchers, policymakers, technologists, and civil society representatives to examine the structural dimensions of the compute transition. Each edition is organized around a central analytical question drawn from TAI's current research programs.",
    format: "The Symposium runs over two days and combines plenary sessions, working group discussions, and structured policy dialogues. Attendance is by invitation. A subset of sessions are open to the public. All plenary sessions are recorded and transcripts are published.",
    inaugural: "The inaugural Ashby Symposium is planned for 2027.",
    accent: true,
  },
  {
    code: "CPW",
    title: "Constitutional Period Workshop",
    subtitle: "Biannual Working Conference",
    cadence: "Biannual",
    locations: ["Washington DC", "London"],
    locationNote: "Alternating between Washington DC and London",
    nextEdition: "Spring 2027 — Washington DC",
    description: "The Constitutional Period Workshop is a smaller, more intensive working conference focused on the institutional design challenges of the compute transition. The workshop takes its name from the observation that we are in a 'constitutional period' for AI governance — a moment when foundational institutional choices are being made that will shape the governance landscape for decades.",
    format: "The Workshop convenes 30–40 researchers, practitioners, and policymakers for a day-and-a-half of structured working sessions. The format emphasizes collaborative problem-solving over presentation. Working papers are circulated in advance. A summary document is published following each workshop.",
    inaugural: "The inaugural Constitutional Period Workshop is planned for Spring 2027.",
    accent: false,
  },
  {
    code: "GRT",
    title: "GRT Lecture Series",
    subtitle: "Annual Public Lecture",
    cadence: "Annual",
    locations: ["Washington DC", "London", "Singapore"],
    locationNote: "Rotating location, livestreamed globally",
    nextEdition: "Q3 2026 — Inaugural Lecture",
    description: "The GRT Lecture Series is TAI's annual public lecture program. Each year, a distinguished scholar or practitioner delivers a lecture examining the implications of Ashby's Good Regulator Theorem for a specific domain of AI governance or policy. The lecture series is designed to make TAI's foundational research accessible to a broad audience.",
    format: "Each lecture is approximately 45 minutes, followed by a structured Q&A. Lectures are held in person and livestreamed. Full transcripts and video recordings are published on the TAI website.",
    inaugural: "The inaugural GRT Lecture is planned for Q3 2026.",
    accent: false,
  },
];

export default function Events() {
  return (
    <Layout>
      {/* Page header */}
      <section className="bg-[#0F1419] pt-32 pb-20">
        <div className="container">
          <Reveal>
            <span className="tai-label text-[#A02D24] block mb-4">Events</span>
            <div className="w-8 h-px bg-[#A02D24] mb-8" />
            <h1 className="font-['Fraunces'] font-[800] text-[#F0EDE8] leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              TAI Convening Programs
            </h1>
            <p className="font-['Inter'] text-[#9A9490] text-lg mt-6 max-w-xl leading-relaxed">
              TAI convenes researchers, policymakers, and practitioners through three event programs. All events are organized around analytical questions, not advocacy objectives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Event programs */}
      {EVENTS.map((event, i) => (
        <section key={event.code} className={event.accent ? "bg-[#1A1714]" : i % 2 === 0 ? "bg-[#FAF8F5]" : "bg-[#F2EFE9]"}>
          <div className="container py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <Reveal className="lg:col-span-4">
                <div className="sticky top-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-['IBM_Plex_Mono'] text-xs border border-[#A02D24] text-[#A02D24] px-2 py-1">
                      {event.code}
                    </span>
                  </div>
                  <h2 className={`font-['Fraunces'] font-[700] leading-tight mb-2 ${event.accent ? "text-[#F0EDE8]" : "text-[#1A1714]"}`}
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                    {event.title}
                  </h2>
                  <p className={`font-['IBM_Plex_Mono'] text-xs mb-6 ${event.accent ? "text-[#6B6560]" : "text-[#6B6560]"}`}>
                    {event.subtitle}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide mb-1">Cadence</p>
                      <p className={`font-['Inter'] text-sm ${event.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>{event.cadence}</p>
                    </div>
                    <div>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide mb-1">Locations</p>
                      <p className={`font-['Inter'] text-sm ${event.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>{event.locationNote}</p>
                    </div>
                    <div>
                      <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide mb-1">Next Edition</p>
                      <p className={`font-['Inter'] text-sm font-medium ${event.accent ? "text-[#F0EDE8]" : "text-[#1A1714]"}`}>{event.nextEdition}</p>
                    </div>
                  </div>

                  <Link href="/contact" className={event.accent ? "tai-btn-primary" : "tai-btn-primary"}>
                    Register Interest
                  </Link>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={100}>
                <p className={`font-['Inter'] text-base leading-relaxed mb-8 ${event.accent ? "text-[#9A9490]" : "text-[#3D3A37]"}`}>
                  {event.description}
                </p>

                <div className="mb-8">
                  <p className="tai-label mb-3">Format</p>
                  <p className={`font-['Inter'] text-sm leading-relaxed ${event.accent ? "text-[#9A9490]" : "text-[#6B6560]"}`}>
                    {event.format}
                  </p>
                </div>

                <div className={`border-l-2 border-[#A02D24] pl-4`}>
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] uppercase tracking-wide mb-1">Status</p>
                  <p className={`font-['Inter'] text-sm ${event.accent ? "text-[#9A9490]" : "text-[#6B6560]"}`}>{event.inaugural}</p>
                </div>

                {/* Location tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {event.locations.map((loc) => (
                    <span key={loc} className={`font-['IBM_Plex_Mono'] text-xs px-3 py-1 border ${event.accent ? "border-[#2A2F36] text-[#6B6560]" : "border-[#D4CFC9] text-[#6B6560]"}`}>
                      {loc}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Mailing list */}
      <section className="bg-[#FAF8F5] py-20 border-t border-[#D4CFC9]">
        <div className="container">
          <div className="max-w-2xl">
            <Reveal>
              <span className="tai-label block mb-4">Event Notifications</span>
              <h2 className="font-['Fraunces'] font-[700] text-[#1A1714] mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Stay Informed of TAI Events
              </h2>
              <p className="font-['Inter'] text-[#6B6560] text-base mb-8 leading-relaxed">
                To receive event announcements, registration information, and published transcripts, subscribe to the TAI newsletter or contact the Institute directly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="tai-btn-primary">
                  Subscribe to Updates
                </Link>
                <Link href="/contact" className="tai-btn-primary" style={{ borderColor: "#D4CFC9", color: "#6B6560" }}>
                  Contact the Institute
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
