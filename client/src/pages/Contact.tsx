/**
 * Contact.tsx — TAI Contact & Newsletter page
 * Design: "Control Surface" — Post-Bauhaus Systems Functionalism
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
      { threshold: 0.06 }
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

const INQUIRY_TYPES = [
  {
    code: "RES",
    title: "Research Inquiries",
    desc: "Questions about TAI research programs, methodology, data, or publications. Requests for advance copies of forthcoming publications for peer review.",
    email: "research@theashbyinstitute.org",
  },
  {
    code: "FEL",
    title: "Fellowship Applications",
    desc: "Inquiries about the Ashby Fellowship, Senior Research Fellows, Visiting Fellows, and Policy Residency programs. Application timelines and eligibility.",
    email: "fellows@theashbyinstitute.org",
  },
  {
    code: "MED",
    title: "Media & Press",
    desc: "Press inquiries, interview requests, background briefings, and media partnerships. TAI researchers are available for comment on matters within their research programs.",
    email: "press@theashbyinstitute.org",
  },
  {
    code: "GEN",
    title: "General Inquiries",
    desc: "Event attendance, institutional partnerships, funding discussions, and all other correspondence. TAI does not accept unsolicited commercial proposals.",
    email: "contact@theashbyinstitute.org",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", org: "", type: "Research Inquiries", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* ── PAGE HEADER ── */}
      <section style={{ background: "#0A0C0F", borderBottom: "1px solid #1E2228", paddingTop: "8rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
              Contact
            </span>
            <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.5rem" }} />
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F0EDE6", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Contact the Institute
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1rem", color: "#5A5550", lineHeight: 1.7, maxWidth: "560px" }}>
              TAI maintains a small permanent staff. Response times vary by inquiry type. All correspondence is handled directly by the relevant research team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INQUIRY TYPES ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "#D8D4CC" }}>
            {INQUIRY_TYPES.map((item, i) => (
              <Reveal key={item.code} delay={i * 60}>
                <div style={{ background: "#FDFBF7", padding: "2rem", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", border: "1px solid rgba(139,26,20,0.35)", padding: "0.2rem 0.5rem" }}>
                      {item.code}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1rem", color: "#1A1410", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#5A5550", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                    {item.desc}
                  </p>
                  <a
                    href={`mailto:${item.email}`}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: "#8B1A14", textDecoration: "none", letterSpacing: "0.04em", borderBottom: "1px solid rgba(139,26,20,0.3)", paddingBottom: "1px" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(139,26,20,0.3)")}
                  >
                    {item.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + SIDEBAR ── */}
      <section style={{ background: "#111318", borderBottom: "1px solid #1E2228" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Form */}
            <Reveal className="lg:col-span-7">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "1rem" }}>
                Send a Message
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "2rem" }} />

              {submitted ? (
                <div style={{ border: "1px solid rgba(139,26,20,0.4)", padding: "2.5rem" }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.25rem", color: "#E8E4DC", marginBottom: "0.75rem" }}>
                    Message received.
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#6A6560", lineHeight: 1.65 }}>
                    We will respond within 5–7 business days. For urgent press inquiries, contact press@theashbyinstitute.org directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", display: "block", marginBottom: "0.5rem" }}>
                        Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        style={{ width: "100%", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#E8E4DC", background: "#0A0C0F", border: "1px solid #1E2228", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#1E2228")}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", display: "block", marginBottom: "0.5rem" }}>
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        style={{ width: "100%", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#E8E4DC", background: "#0A0C0F", border: "1px solid #1E2228", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#1E2228")}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", display: "block", marginBottom: "0.5rem" }}>
                      Organization
                    </label>
                    <input
                      type="text"
                      value={formData.org}
                      onChange={e => setFormData(p => ({ ...p, org: e.target.value }))}
                      style={{ width: "100%", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#E8E4DC", background: "#0A0C0F", border: "1px solid #1E2228", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#1E2228")}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", display: "block", marginBottom: "0.5rem" }}>
                      Inquiry Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                      style={{ width: "100%", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#E8E4DC", background: "#0A0C0F", border: "1px solid #1E2228", padding: "0.75rem 1rem", outline: "none", boxSizing: "border-box" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#1E2228")}
                    >
                      {INQUIRY_TYPES.map(t => (
                        <option key={t.title} value={t.title}>{t.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4540", display: "block", marginBottom: "0.5rem" }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      style={{ width: "100%", fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#E8E4DC", background: "#0A0C0F", border: "1px solid #1E2228", padding: "0.75rem 1rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#1E2228")}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      alignSelf: "flex-start",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#F0EDE6",
                      background: "#8B1A14",
                      border: "1px solid #8B1A14",
                      padding: "0.875rem 2rem",
                      cursor: "pointer",
                      transition: "background 200ms",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>

            {/* Sidebar */}
            <Reveal className="lg:col-span-5" delay={120}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Response times */}
                <div style={{ border: "1px solid #1E2228", padding: "1.75rem" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "1.25rem" }}>
                    Response Times
                  </p>
                  {[
                    { type: "Research Inquiries", time: "5–7 business days" },
                    { type: "Fellowship Applications", time: "2–3 weeks" },
                    { type: "Media & Press", time: "24–48 hours" },
                    { type: "General Inquiries", time: "7–10 business days" },
                  ].map((item, i) => (
                    <div key={item.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "0.75rem", paddingBottom: "0.75rem", borderBottom: i < 3 ? "1px solid #1E2228" : "none" }}>
                      <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560" }}>{item.type}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#4A4540", letterSpacing: "0.04em", whiteSpace: "nowrap", marginLeft: "1rem" }}>{item.time}</span>
                    </div>
                  ))}
                </div>

                {/* Office locations */}
                <div style={{ border: "1px solid #1E2228", padding: "1.75rem" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "1.25rem" }}>
                    Offices
                  </p>
                  {[
                    { city: "Washington, D.C.", note: "Primary office" },
                    { city: "London", note: "European affiliate" },
                    { city: "Singapore", note: "Asia-Pacific affiliate" },
                  ].map((loc, i) => (
                    <div key={loc.city} style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem", borderBottom: i < 2 ? "1px solid #1E2228" : "none" }}>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "0.9375rem", color: "#C8C4BC", marginBottom: "0.15rem" }}>
                        {loc.city}
                      </p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#4A4540", letterSpacing: "0.04em" }}>
                        {loc.note}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Domain note */}
                <div style={{ border: "1px solid rgba(139,26,20,0.2)", padding: "1.25rem" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1A14", marginBottom: "0.5rem" }}>
                    Domain Status
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.8125rem", color: "#5A5550", lineHeight: 1.6 }}>
                    The permanent domain <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>theashbyinstitute.org</span> is being registered. This site is currently accessible at the Manus-assigned domain.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: "#F5F2EC", borderBottom: "1px solid #D8D4CC" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-6">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B1A14", display: "block", marginBottom: "0.75rem" }}>
                TAI Research Updates
              </span>
              <div style={{ width: "2rem", height: "2px", background: "#8B1A14", marginBottom: "1.25rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1A1410", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                Stay Informed
              </h2>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9375rem", color: "#6A6560", lineHeight: 1.7 }}>
                New publications, event announcements, and fellowship opportunities. No promotional content. No third-party sharing. Unsubscribe at any time.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              {newsletterSubmitted ? (
                <div style={{ border: "1px solid rgba(139,26,20,0.3)", padding: "1.5rem" }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1rem", color: "#1A1410", marginBottom: "0.5rem" }}>
                    Subscribed.
                  </p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.875rem", color: "#6A6560" }}>
                    You will receive notifications of new TAI publications and events.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0" }}>
                  <input
                    type="email"
                    placeholder="your@email.edu"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: 1,
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: "0.9rem",
                      color: "#1A1410",
                      background: "#FDFBF7",
                      border: "1px solid #D8D4CC",
                      borderRight: "none",
                      padding: "0.875rem 1.25rem",
                      outline: "none",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#8B1A14")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#D8D4CC")}
                  />
                  <button
                    onClick={() => { if (newsletterEmail) setNewsletterSubmitted(true); }}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#F0EDE6",
                      background: "#8B1A14",
                      border: "1px solid #8B1A14",
                      padding: "0.875rem 1.5rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "background 200ms",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#6E1510")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#8B1A14")}
                  >
                    Subscribe →
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
