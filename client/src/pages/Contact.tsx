/**
 * Contact.tsx — TAI Contact & Newsletter page
 */
import { useEffect, useRef, useState } from "react";
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

const CONTACT_TYPES = [
  {
    code: "RES",
    title: "Research Inquiries",
    description: "Questions about TAI research programs, methodology, data access, or collaboration opportunities.",
    email: "research@theashbyinstitute.org",
  },
  {
    code: "FEL",
    title: "Fellowship Applications",
    description: "Inquiries about the Ashby Fellowship, Senior Research Fellow appointments, Visiting Fellowships, and the Policy Residency.",
    email: "fellows@theashbyinstitute.org",
  },
  {
    code: "MED",
    title: "Media & Press",
    description: "Press inquiries, interview requests, and requests for expert comment on compute governance and AI policy.",
    email: "press@theashbyinstitute.org",
  },
  {
    code: "GEN",
    title: "General Inquiries",
    description: "All other inquiries, including partnership discussions, event registration, and institutional matters.",
    email: "info@theashbyinstitute.org",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "General Inquiries", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to a backend
    setSubmitted(true);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
  };

  return (
    <Layout>
      {/* Page header */}
      <section className="bg-[#0F1419] pt-32 pb-20">
        <div className="container">
          <Reveal>
            <span className="tai-label text-[#A02D24] block mb-4">Contact</span>
            <div className="w-8 h-px bg-[#A02D24] mb-8" />
            <h1 className="font-['Fraunces'] font-[800] text-[#F0EDE8] leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Contact the Institute
            </h1>
            <p className="font-['Inter'] text-[#9A9490] text-lg mt-6 max-w-xl leading-relaxed">
              For research inquiries, fellowship applications, media requests, and general correspondence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact types */}
      <section className="bg-[#FAF8F5] py-16 border-b border-[#D4CFC9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#D4CFC9]">
            {CONTACT_TYPES.map((ct, i) => (
              <Reveal key={ct.code} delay={i * 60}>
                <div className={`p-6 h-full ${i < 3 ? "border-b md:border-b-0 md:border-r border-[#D4CFC9]" : ""} ${i === 1 ? "lg:border-r" : ""} ${i === 2 ? "md:border-r-0 lg:border-r" : ""}`}>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] border border-[#A02D24] px-2 py-0.5 inline-block mb-4">
                    {ct.code}
                  </span>
                  <h3 className="font-['Fraunces'] font-[600] text-[#1A1714] text-lg mb-3">{ct.title}</h3>
                  <p className="font-['Inter'] text-[#6B6560] text-sm leading-relaxed mb-4">{ct.description}</p>
                  <a href={`mailto:${ct.email}`} className="font-['IBM_Plex_Mono'] text-xs text-[#A02D24] hover:underline">
                    {ct.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + Newsletter */}
      <section className="bg-[#FAF8F5] py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact form */}
            <Reveal className="lg:col-span-7">
              <span className="tai-label block mb-4">Send a Message</span>
              <div className="w-8 h-px bg-[#A02D24] mb-8" />

              {submitted ? (
                <div className="border border-[#D4CFC9] p-8">
                  <p className="font-['Fraunces'] font-[600] text-[#1A1714] text-xl mb-3">Message received.</p>
                  <p className="font-['Inter'] text-[#6B6560] text-base">
                    Thank you for your inquiry. A member of the TAI team will respond within 3–5 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-[#D4CFC9] bg-white px-4 py-3 font-['Inter'] text-sm text-[#1A1714] focus:outline-none focus:border-[#A02D24] transition-colors duration-150"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-[#D4CFC9] bg-white px-4 py-3 font-['Inter'] text-sm text-[#1A1714] focus:outline-none focus:border-[#A02D24] transition-colors duration-150"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide block mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full border border-[#D4CFC9] bg-white px-4 py-3 font-['Inter'] text-sm text-[#1A1714] focus:outline-none focus:border-[#A02D24] transition-colors duration-150"
                    >
                      <option>Research Inquiry</option>
                      <option>Fellowship Application</option>
                      <option>Media / Press</option>
                      <option>Event Registration</option>
                      <option>Partnership Discussion</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560] uppercase tracking-wide block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-[#D4CFC9] bg-white px-4 py-3 font-['Inter'] text-sm text-[#1A1714] focus:outline-none focus:border-[#A02D24] transition-colors duration-150 resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button type="submit" className="tai-btn-primary">
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>

            {/* Newsletter + Info */}
            <Reveal className="lg:col-span-5" delay={100}>
              {/* Newsletter */}
              <div className="bg-[#0F1419] p-8 mb-8">
                <span className="tai-label text-[#A02D24] block mb-4">Newsletter</span>
                <h3 className="font-['Fraunces'] font-[700] text-[#F0EDE8] text-xl mb-3">
                  TAI Research Updates
                </h3>
                <p className="font-['Inter'] text-[#9A9490] text-sm leading-relaxed mb-6">
                  New publications, event announcements, and fellowship opportunities. Sent when there is something worth saying — not on a fixed schedule.
                </p>

                {newsletterSubmitted ? (
                  <div className="border border-[#2A2F36] p-4">
                    <p className="font-['Inter'] text-[#9A9490] text-sm">
                      Subscribed. You will receive TAI updates at the address provided.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full border border-[#2A2F36] bg-transparent px-4 py-3 font-['Inter'] text-sm text-[#F0EDE8] placeholder-[#6B6560] focus:outline-none focus:border-[#A02D24] transition-colors duration-150"
                      placeholder="your@email.com"
                    />
                    <button type="submit" className="tai-btn-ghost-light w-full justify-center">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>

              {/* Location info */}
              <div className="space-y-6">
                <div>
                  <p className="tai-label mb-2">Primary Office</p>
                  <p className="font-['Inter'] text-[#3D3A37] text-sm leading-relaxed">
                    Washington, DC<br />
                    United States
                  </p>
                </div>
                <div className="border-t border-[#D4CFC9] pt-6">
                  <p className="tai-label mb-2">Affiliated Offices</p>
                  <p className="font-['Inter'] text-[#3D3A37] text-sm leading-relaxed">
                    London, United Kingdom<br />
                    Singapore
                  </p>
                </div>
                <div className="border-t border-[#D4CFC9] pt-6">
                  <p className="tai-label mb-2">Response Time</p>
                  <p className="font-['Inter'] text-[#6B6560] text-sm">
                    3–5 business days for all inquiries.
                  </p>
                </div>
                <div className="border-t border-[#D4CFC9] pt-6">
                  <p className="tai-label mb-2">Domain</p>
                  <p className="font-['IBM_Plex_Mono'] text-xs text-[#6B6560]">
                    theashbyinstitute.org<br />
                    <span className="text-[#A02D24]">(registration pending)</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
