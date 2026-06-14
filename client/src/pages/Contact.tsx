/*
 * Contact.tsx — TAI Contact v5
 * Design: GI-clone — Chakra Petch, white background, black typography, slate blue accent
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";

const font = "'Chakra Petch', 'IBM Plex Mono', monospace";
const slate = "#2C3E6B";
const black = "#111111";
const mid = "#555555";
const light = "#999999";
const border = "#E0E0E0";

const inputStyle: React.CSSProperties = {
  fontFamily: font, fontSize: "0.72rem", color: black,
  background: "#FFFFFF", border: `1px solid ${border}`,
  padding: "0.75rem 1rem", width: "100%", outline: "none",
  transition: "border-color 150ms", boxSizing: "border-box",
};

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "Research", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: `1px solid ${border}`, padding: "5rem 0 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>Contact</p>
          <h1 style={{ fontFamily: font, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: black, margin: "0 0 1.5rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Get in Touch
          </h1>
          <p style={{ fontFamily: font, fontSize: "0.95rem", color: mid, lineHeight: 1.8, maxWidth: "560px", fontWeight: 300, margin: 0 }}>
            For research inquiries, fellowship applications, event invitations, and media requests. TAI does not accept unsolicited commercial proposals.
          </p>
        </div>
      </section>

      {/* CONTACT TYPES — 50/50 SPLIT */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "480px" }}>
          <div style={{ background: "#0A0A0A", position: "relative", minHeight: "480px" }}>
            <AsciiCanvas sim="lorenz" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
              <span style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Lorenz Attractor · Deterministic Chaos</span>
            </div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "4rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1rem", marginTop: 0 }}>Inquiries</p>
            <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Contact by Type
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { type: "Research", email: "research@theashbyinstitute.org", desc: "Research inquiries, collaboration proposals, and academic correspondence." },
                { type: "Fellowship", email: "fellows@theashbyinstitute.org", desc: "Ashby Fellowship applications, visiting fellow inquiries, and policy residency." },
                { type: "Events", email: "events@theashbyinstitute.org", desc: "Symposium invitations, workshop participation, and GRT Lecture inquiries." },
                { type: "Media", email: "media@theashbyinstitute.org", desc: "Press inquiries, interview requests, and publication permissions." },
                { type: "General", email: "info@theashbyinstitute.org", desc: "All other correspondence." },
              ].map((item, i, arr) => (
                <div key={item.type} style={{ padding: "1rem 0", borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <p style={{ fontFamily: font, fontSize: "0.6rem", fontWeight: 600, color: black, margin: 0, letterSpacing: "0.06em" }}>{item.type}</p>
                    <a href={`mailto:${item.email}`} style={{ fontFamily: font, fontSize: "0.55rem", color: slate, textDecoration: "none", letterSpacing: "0.04em" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = "underline"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = "none"}
                    >{item.email}</a>
                  </div>
                  <p style={{ fontFamily: font, fontSize: "0.65rem", color: light, margin: 0, fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM + NEWSLETTER */}
      <section style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
            {/* Contact form */}
            <div>
              <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Message</p>
              <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 2rem", letterSpacing: "-0.02em" }}>
                Send a Message
              </h2>
              {sent ? (
                <div style={{ padding: "2rem", border: `1px solid ${border}` }}>
                  <p style={{ fontFamily: font, fontSize: "0.7rem", fontWeight: 600, color: black, margin: "0 0 0.5rem" }}>Message received.</p>
                  <p style={{ fontFamily: font, fontSize: "0.72rem", color: mid, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>We will respond within five business days. For urgent matters, please email directly.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.4rem" }}>Name</p>
                      <input type="text" required placeholder="Your name" value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = black}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = border}
                      />
                    </div>
                    <div>
                      <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.4rem" }}>Email</p>
                      <input type="email" required placeholder="your@email.com" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = black}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = border}
                      />
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.4rem" }}>Inquiry Type</p>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                      style={{ ...inputStyle, appearance: "none" as const }}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = black}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = border}
                    >
                      {["Research", "Fellowship", "Events", "Media", "General"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.16em", textTransform: "uppercase", color: light, margin: "0 0 0.4rem" }}>Message</p>
                    <textarea required rows={6} placeholder="Your message..." value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" as const }}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = black}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = border}
                    />
                  </div>
                  <button type="submit" style={{
                    fontFamily: font, fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "#fff", background: black, border: `1px solid ${black}`,
                    padding: "0.875rem 1.75rem", cursor: "pointer", transition: "background 150ms, border-color 150ms",
                    width: "fit-content",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slate; el.style.borderColor = slate; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = black; el.style.borderColor = black; }}
                  >Send Message →</button>
                </form>
              )}
            </div>

            {/* Newsletter + locations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
              <div>
                <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "0.75rem", marginTop: 0 }}>Newsletter</p>
                <h2 style={{ fontFamily: font, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", fontWeight: 700, color: black, margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
                  Research Updates
                </h2>
                <p style={{ fontFamily: font, fontSize: "0.78rem", color: mid, lineHeight: 1.75, margin: "0 0 1.5rem", fontWeight: 300 }}>
                  Subscribe to receive new publications, event announcements, and research updates from The Ashby Institute. Published approximately monthly. No promotional content.
                </p>
                {subscribed ? (
                  <div style={{ padding: "1.25rem", border: `1px solid ${border}` }}>
                    <p style={{ fontFamily: font, fontSize: "0.7rem", fontWeight: 600, color: black, margin: "0 0 0.25rem" }}>Subscribed.</p>
                    <p style={{ fontFamily: font, fontSize: "0.65rem", color: mid, margin: 0, fontWeight: 300 }}>You will receive TAI research updates at {email}.</p>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }} style={{ display: "flex" }}>
                    <input type="email" required placeholder="your@email.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ ...inputStyle, flex: 1, borderRight: "none" }}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = black}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = border}
                    />
                    <button type="submit" style={{
                      fontFamily: font, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#fff", background: black, border: `1px solid ${black}`,
                      padding: "0.75rem 1.25rem", cursor: "pointer", whiteSpace: "nowrap",
                      transition: "background 150ms",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = slate}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = black}
                    >Subscribe</button>
                  </form>
                )}
              </div>

              <div>
                <p style={{ fontFamily: font, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: slate, marginBottom: "1.25rem", marginTop: 0 }}>Locations</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    { city: "Washington D.C.", role: "Primary Office", note: "United States" },
                    { city: "London", role: "European Office", note: "United Kingdom" },
                    { city: "Singapore", role: "Asia-Pacific Office", note: "Singapore" },
                  ].map((loc, i) => (
                    <div key={loc.city} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", padding: "0.875rem 0", borderBottom: i < 2 ? `1px solid ${border}` : "none", alignItems: "center" }}>
                      <div>
                        <p style={{ fontFamily: font, fontSize: "0.78rem", fontWeight: 600, color: black, margin: "0 0 0.1rem" }}>{loc.city}</p>
                        <p style={{ fontFamily: font, fontSize: "0.6rem", color: light, margin: 0 }}>{loc.note}</p>
                      </div>
                      <p style={{ fontFamily: font, fontSize: "0.45rem", letterSpacing: "0.12em", textTransform: "uppercase", color: slate, margin: 0 }}>{loc.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
