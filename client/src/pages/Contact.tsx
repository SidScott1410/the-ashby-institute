/**
 * Contact.tsx — Contact TAI
 * Design: GI-clone border grid system
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { Link } from "wouter";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";

const INQUIRY_TYPES = [
  { id: "research", label: "RESEARCH INQUIRY", desc: "Questions about TAI's research programs, publications, or theoretical framework." },
  { id: "fellowship", label: "FELLOWSHIP", desc: "Expressions of interest in TAI's fellowship programs — Ashby, Senior, Visiting, or Policy Residency." },
  { id: "media", label: "MEDIA & PRESS", desc: "Press inquiries, interview requests, and media access." },
  { id: "events", label: "EVENTS", desc: "Event attendance, speaker inquiries, and partnership proposals." },
];

export default function Contact() {
  const [selectedType, setSelectedType] = useState("research");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
  };

  return (
    <Layout>
      {/* PAGE HEADER */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "64px 48px 56px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>CONTACT</p>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              Contact
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 520, fontWeight: 300, margin: 0 }}>
              TAI welcomes inquiries from researchers, policymakers, journalists, and members of the public. We respond to all substantive inquiries, typically within five business days.
            </p>
          </div>
          <div style={{ position: "relative", minHeight: 280 }}>
            <AsciiCanvas sim="cellular" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>CELLULAR AUTOMATON · EMERGENT ORDER</span>
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY TYPE SELECTOR */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "flex" }}>
          {INQUIRY_TYPES.map((type, i) => (
            <button key={type.id} onClick={() => setSelectedType(type.id)} style={{
              flex: 1,
              fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em",
              padding: "16px 20px",
              background: selectedType === type.id ? "#111" : "#fff",
              color: selectedType === type.id ? "#fff" : "#555",
              border: "none",
              borderRight: i < INQUIRY_TYPES.length - 1 ? B : "none",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
              textAlign: "left",
            }}
              onMouseEnter={e => { if (selectedType !== type.id) (e.currentTarget as HTMLElement).style.color = "#111"; }}
              onMouseLeave={e => { if (selectedType !== type.id) (e.currentTarget as HTMLElement).style.color = "#555"; }}
            >{type.label}</button>
          ))}
        </div>
      </section>

      {/* CONTACT FORM + DIRECT CONTACTS */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Form */}
          <div style={{ padding: "56px 48px", borderRight: B }}>
            {submitted ? (
              <div>
                <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>MESSAGE RECEIVED</p>
                <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em" }}>
                  Thank you.
                </h2>
                <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 24px", fontWeight: 300 }}>
                  We have received your inquiry and will respond within five business days.
                </p>
                <button onClick={() => setSubmitted(false)} style={{
                  fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
                  color: "#111", background: "#fff", padding: "12px 20px",
                  border: B, cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#111"; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#fff"; el.style.color = "#111"; }}
                >SEND ANOTHER MESSAGE</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 20, marginTop: 0 }}>
                  {INQUIRY_TYPES.find(t => t.id === selectedType)?.label}
                </p>
                <p style={{ fontFamily: FONT, fontSize: 12, color: "#555", lineHeight: 1.7, margin: "0 0 32px", fontWeight: 300 }}>
                  {INQUIRY_TYPES.find(t => t.id === selectedType)?.desc}
                </p>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 8 }}>EMAIL ADDRESS</label>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{ width: "100%", fontFamily: FONT, fontSize: 12, color: "#111", background: "#fff", border: B, padding: "12px 16px", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => (e.currentTarget.style.borderColor = SLATE)}
                    onBlur={e => (e.currentTarget.style.borderColor = "#111")}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", marginBottom: 8 }}>MESSAGE</label>
                  <textarea
                    required value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Your inquiry..."
                    rows={6}
                    style={{ width: "100%", fontFamily: FONT, fontSize: 12, color: "#111", background: "#fff", border: B, padding: "12px 16px", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                    onFocus={e => (e.currentTarget.style.borderColor = SLATE)}
                    onBlur={e => (e.currentTarget.style.borderColor = "#111")}
                  />
                </div>
                <button type="submit" style={{
                  fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
                  color: "#fff", background: "#111", padding: "14px 28px",
                  border: B, cursor: "pointer",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
                >SEND MESSAGE →</button>
              </form>
            )}
          </div>

          {/* Direct contacts */}
          <div style={{ padding: "56px 48px" }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 24, marginTop: 0 }}>DIRECT CONTACTS</p>
            {[
              { label: "RESEARCH INQUIRIES", email: "research@theashbyinstitute.org", desc: "Questions about research programs, publications, and theoretical framework." },
              { label: "FELLOWSHIP INQUIRIES", email: "fellows@theashbyinstitute.org", desc: "Expressions of interest in fellowship programs." },
              { label: "PRESS & MEDIA", email: "press@theashbyinstitute.org", desc: "Interview requests, press access, and media inquiries." },
            ].map((contact, i) => (
              <div key={contact.label} style={{ padding: "20px 0", borderBottom: i < 2 ? B : "none" }}>
                <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", margin: "0 0 6px" }}>{contact.label}</p>
                <a href={`mailto:${contact.email}`} style={{ fontFamily: FONT, fontSize: 12, color: SLATE, textDecoration: "none", display: "block", marginBottom: 6 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = "underline"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = "none"}
                >{contact.email}</a>
                <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", margin: 0, fontWeight: 300 }}>{contact.desc}</p>
              </div>
            ))}

            <div style={{ marginTop: 40 }}>
              <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>OFFICES</p>
              {[
                { city: "Washington, D.C.", status: "Primary" },
                { city: "London", status: "Forthcoming" },
                { city: "Singapore", status: "Forthcoming" },
              ].map((loc, i) => (
                <div key={loc.city} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? B : "none" }}>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: "#111" }}>{loc.city}</span>
                  <span style={{ fontFamily: FONT, fontSize: 9, color: "#888", letterSpacing: "0.1em" }}>{loc.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "56px 48px", borderRight: B }}>
            <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.18em", color: SLATE, marginBottom: 16, marginTop: 0 }}>NEWSLETTER</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Research updates and working papers.
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 13, color: "#555", lineHeight: 1.85, margin: "0 0 32px", fontWeight: 300 }}>
              Receive new publications, event announcements, and occasional commentary on the compute transition. No promotional content. Unsubscribe at any time.
            </p>
            {newsletterSubmitted ? (
              <p style={{ fontFamily: FONT, fontSize: 12, color: SLATE }}>Subscribed. Thank you.</p>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: "flex", gap: 0 }}>
                <input
                  type="email" required value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="your@institution.edu"
                  style={{ flex: 1, fontFamily: FONT, fontSize: 12, color: "#111", background: "#fff", border: B, borderRight: "none", padding: "12px 16px", outline: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = SLATE)}
                  onBlur={e => (e.currentTarget.style.borderColor = "#111")}
                />
                <button type="submit" style={{
                  fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em",
                  color: "#fff", background: "#111", padding: "12px 20px",
                  border: B, cursor: "pointer",
                  transition: "background 0.15s",
                  whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
                >SUBSCRIBE</button>
              </form>
            )}
          </div>
          <div style={{ position: "relative", minHeight: 300 }}>
            <AsciiCanvas sim="boids" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 20, left: 24 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888" }}>BOIDS FLOCKING · DISTRIBUTED CONTROL</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "flex" }}>
          <Link href="/research" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#fff", background: "#111", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >RESEARCH →</Link>
          <Link href="/fellows" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", borderRight: B, transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >FELLOWS</Link>
          <Link href="/about" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: "#111", background: "#fff", padding: "20px 32px", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >ABOUT TAI</Link>
        </div>
      </section>
    </Layout>
  );
}
