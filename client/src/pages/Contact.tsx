/*
 * Contact.tsx — TAI Contact v4 — Clean Institutional White
 */
import { useEffect, useRef, useState } from "react";
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

const INQUIRY_TYPES = [
  { code: "RES", label: "Research Inquiries", email: "research@theashbyinstitute.org", desc: "Questions about TAI\'s research programs, publications, or methodology." },
  { code: "FELL", label: "Fellowship & Residency", email: "fellows@theashbyinstitute.org", desc: "Applications and inquiries about TAI\'s fellowship and residency programs." },
  { code: "EVNT", label: "Events & Convenings", email: "events@theashbyinstitute.org", desc: "Registration, speaking invitations, and event partnership inquiries." },
  { code: "PRESS", label: "Press & Media", email: "press@theashbyinstitute.org", desc: "Media inquiries, interview requests, and press accreditation." },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const [newsletter, setNewsletter] = useState({ email: "", done: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <Layout>
      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Contact</p>
            <h1 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#111111", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "680px" }}>
              Get in touch.
            </h1>
            <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.75, maxWidth: "600px" }}>
              TAI welcomes inquiries from researchers, policymakers, journalists, and members of the public. Please direct your inquiry to the appropriate address below.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E4E0", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <Reveal>
            <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.5rem" }}>Inquiry Types</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "#E5E4E0" }} className="grid-cols-1 sm:grid-cols-2">
            {INQUIRY_TYPES.map((t, i) => (
              <Reveal key={t.code} delay={i * 40}>
                <div style={{ background: "#FFFFFF", padding: "2rem" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "0.5rem" }}>{t.code}</p>
                  <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "1rem", color: "#111111", marginBottom: "0.5rem" }}>{t.label}</p>
                  <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", color: "#888888", lineHeight: 1.6, marginBottom: "1rem" }}>{t.desc}</p>
                  <a href={"mailto:" + t.email} style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.65rem", letterSpacing: "0.06em", color: "#A02D24", textDecoration: "none", borderBottom: "1px solid rgba(160,45,36,0.3)", paddingBottom: "1px", transition: "border-color 150ms" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#A02D24")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(160,45,36,0.3)")}
                  >{t.email}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F6F4", borderBottom: "1px solid #E5E4E0", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }} className="grid-cols-1 lg:grid-cols-2">
            <Reveal>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>General Inquiry</p>
              <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1.5rem" }}>Send a message</h2>
              {sent ? (
                <div style={{ border: "1px solid #2D7A3A", padding: "2rem", background: "#FFFFFF" }}>
                  <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2D7A3A", marginBottom: "0.5rem" }}>Message Received</p>
                  <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.9375rem", color: "#555555", lineHeight: 1.7 }}>Thank you for your message. We will respond within 3–5 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[{ id: "name", label: "Name", type: "text", placeholder: "Your name" }, { id: "email", label: "Email", type: "email", placeholder: "your@email.com" }].map(field => (
                    <div key={field.id}>
                      <label style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", display: "block", marginBottom: "0.5rem" }}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} required value={(form as any)[field.id]} onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                        style={{ width: "100%", fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.9375rem", color: "#111111", background: "#FFFFFF", border: "1px solid #CCCCCC", padding: "0.75rem 1rem", outline: "none" }}
                        onFocus={e => (e.target.style.borderColor = "#A02D24")}
                        onBlur={e => (e.target.style.borderColor = "#CCCCCC")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", display: "block", marginBottom: "0.5rem" }}>Inquiry Type</label>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      style={{ width: "100%", fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.9375rem", color: "#111111", background: "#FFFFFF", border: "1px solid #CCCCCC", padding: "0.75rem 1rem", outline: "none", appearance: "none" }}
                    >
                      <option value="">Select an inquiry type</option>
                      {INQUIRY_TYPES.map(t => <option key={t.code} value={t.code}>{t.label}</option>)}
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", display: "block", marginBottom: "0.5rem" }}>Message</label>
                    <textarea rows={5} placeholder="Your message" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ width: "100%", fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.9375rem", color: "#111111", background: "#FFFFFF", border: "1px solid #CCCCCC", padding: "0.75rem 1rem", outline: "none", resize: "vertical" }}
                      onFocus={e => (e.target.style.borderColor = "#A02D24")}
                      onBlur={e => (e.target.style.borderColor = "#CCCCCC")}
                    />
                  </div>
                  <button type="submit" style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 150ms", alignSelf: "flex-start" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
                  >Send Message</button>
                </form>
              )}
            </Reveal>

            <Reveal delay={100}>
              <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#A02D24", marginBottom: "1rem" }}>Newsletter</p>
              <h2 style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", color: "#111111", lineHeight: 1.15, marginBottom: "1rem" }}>Research updates and new publications.</h2>
              <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "1rem", color: "#666666", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Occasional dispatches on new research, events, and publications. No promotional content. Unsubscribe at any time.
              </p>
              {newsletter.done ? (
                <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.7rem", letterSpacing: "0.08em", color: "#2D7A3A" }}>Subscribed. Thank you.</p>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (newsletter.email) setNewsletter(n => ({ ...n, done: true })); }} style={{ display: "flex", gap: "0" }}>
                  <input type="email" value={newsletter.email} onChange={e => setNewsletter(n => ({ ...n, email: e.target.value }))} required placeholder="your@email.com"
                    style={{ flex: 1, fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.9375rem", color: "#111111", background: "#FFFFFF", border: "1px solid #CCCCCC", borderRight: "none", padding: "0.75rem 1rem", outline: "none" }}
                    onFocus={e => (e.target.style.borderColor = "#A02D24")}
                    onBlur={e => (e.target.style.borderColor = "#CCCCCC")}
                  />
                  <button type="submit" style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF", background: "#A02D24", border: "1px solid #A02D24", padding: "0.75rem 1.25rem", cursor: "pointer", transition: "background 150ms", whiteSpace: "nowrap" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#8B2520")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#A02D24")}
                  >Subscribe</button>
                </form>
              )}

              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #E5E4E0" }}>
                <p style={{ fontFamily: "\'IBM Plex Mono\', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "1.25rem" }}>Locations</p>
                {[{ city: "Washington DC", desc: "Primary research office" }, { city: "London", desc: "European research office" }, { city: "Singapore", desc: "Asia-Pacific research office" }].map(loc => (
                  <div key={loc.city} style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem", borderBottom: "1px solid #E5E4E0" }}>
                    <p style={{ fontFamily: "\'DM Serif Display\', Georgia, serif", fontSize: "0.9375rem", color: "#111111", marginBottom: "0.25rem" }}>{loc.city}</p>
                    <p style={{ fontFamily: "\'DM Sans\', sans-serif", fontSize: "0.8125rem", color: "#888888" }}>{loc.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
