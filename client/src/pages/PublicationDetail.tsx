/**
 * PublicationDetail.tsx — TAI Individual Publication Page
 * Design: GI border-grid system
 * Layout synthesis:
 *   - RAND: structured metadata sidebar, abstract, key findings, citation block, PDF CTA
 *   - Substack: clean long-form article body, author card, reading time, table of contents, related posts
 *   - TAI: 1px black borders, Chakra Petch, white bg, slate blue #2C3E6B accent, ASCII canvas header band
 *
 * Route: /publications/:slug
 * Data: imported from @/lib/publications
 */

import { useRoute, Link } from "wouter";
import Layout from "@/components/Layout";
import AsciiCanvas from "@/components/AsciiCanvas";
import { useState, useEffect, useRef } from "react";
import { PUBLICATIONS_DATA, type Publication, type Author, type Section } from "@/lib/publications";

const B = "1px solid #111";
const SLATE = "#2C3E6B";
const FONT = "'Chakra Petch', 'IBM Plex Mono', monospace";
const BODY_FONT = "'IBM Plex Mono', monospace";

// ─── Table of Contents ────────────────────────────────────────────────────────
function TableOfContents({ sections, activeId }: { sections: Section[]; activeId: string }) {
  return (
    <nav aria-label="Table of contents" style={{ position: "sticky", top: 72 }}>
      <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, marginBottom: 16, marginTop: 0 }}>CONTENTS</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          style={{
            display: "block",
            fontFamily: FONT,
            fontSize: 10,
            color: activeId === s.id ? "#111" : "#888",
            textDecoration: "none",
            padding: "6px 0",
            borderLeft: activeId === s.id ? `2px solid ${SLATE}` : "2px solid transparent",
            paddingLeft: 12,
            transition: "color 0.15s, border-color 0.15s",
            lineHeight: 1.4,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#111"; }}
          onMouseLeave={e => { if (activeId !== s.id) (e.currentTarget as HTMLElement).style.color = "#888"; }}
        >
          {s.heading}
        </a>
      ))}
    </nav>
  );
}

// ─── Author Card ──────────────────────────────────────────────────────────────
function AuthorCard({ author }: { author: Author }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 36, height: 36, background: "#111", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: FONT, fontSize: 9, letterSpacing: "0.08em", flexShrink: 0,
      }}>
        {author.initials}
      </div>
      <div>
        <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#111", margin: 0 }}>{author.name}</p>
        <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: 0, letterSpacing: "0.06em" }}>{author.role}</p>
      </div>
    </div>
  );
}

// ─── Related Publication Card ─────────────────────────────────────────────────
function RelatedCard({ pub }: { pub: Publication }) {
  return (
    <Link href={`/publications/${pub.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{ padding: "28px 32px", transition: "background 0.15s", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#F8F8F8"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}
      >
        <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: SLATE, margin: "0 0 10px" }}>{pub.seriesLabel} · {pub.date}</p>
        <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#111", margin: "0 0 8px", lineHeight: 1.4 }}>{pub.title}</p>
        <p style={{ fontFamily: FONT, fontSize: 11, color: "#555", margin: "0 0 14px", lineHeight: 1.6, fontWeight: 300 }}>{pub.abstract.slice(0, 120)}…</p>
        <span style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: SLATE, borderBottom: `1px solid ${SLATE}` }}>READ →</span>
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PublicationDetail() {
  const [, params] = useRoute("/publications/:slug");
  const slug = params?.slug;

  const pub = PUBLICATIONS_DATA.find(p => p.slug === slug);
  const related = pub
    ? PUBLICATIONS_DATA.filter(p => pub.related.includes(p.slug))
    : [];

  const [activeSection, setActiveSection] = useState(pub?.body[0]?.id ?? "");
  const bodyRef = useRef<HTMLDivElement>(null);

  // Intersection observer for active TOC section highlight
  useEffect(() => {
    if (!pub) return;
    const observers: IntersectionObserver[] = [];
    pub.body.forEach(section => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section.id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach(io => io.disconnect());
  }, [pub]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // 404 state
  if (!pub) {
    return (
      <Layout>
        <div style={{ padding: "120px 48px", textAlign: "center" }}>
          <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.16em", color: SLATE, marginBottom: 16 }}>PUBLICATION NOT FOUND</p>
          <h1 style={{ fontFamily: FONT, fontSize: "2rem", fontWeight: 700, color: "#111", marginBottom: 24 }}>404</h1>
          <Link href="/publications" style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: "#fff", background: "#111", padding: "12px 24px", textDecoration: "none" }}>
            ← ALL PUBLICATIONS
          </Link>
        </div>
      </Layout>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const isForthcoming = pub.dateISO > today;

  return (
    <Layout>
      {/* ── BREADCRUMB ── */}
      <nav aria-label="Breadcrumb" style={{ borderBottom: B, display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/publications" style={{
          fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: "#888",
          textDecoration: "none", padding: "14px 24px", borderRight: B,
          transition: "color 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#888"}
        >← PUBLICATIONS</Link>
        <span style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: "#888", padding: "14px 24px", borderRight: B }}>{pub.seriesLabel}</span>
        <span style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em", color: "#555", padding: "14px 24px" }}>{pub.type.toUpperCase()}</span>
      </nav>

      {/* ── HERO BAND — title + ASCII canvas ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px" }}>

          {/* Title block */}
          <div style={{ padding: "56px 48px 48px", borderRight: B }}>
            {/* Type badge + meta row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <span style={{
                fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em",
                color: "#fff", background: SLATE, padding: "4px 10px",
              }}>
                {pub.type.toUpperCase()}
              </span>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: SLATE }}>{pub.seriesLabel}</span>
              <span style={{ fontFamily: FONT, fontSize: 8, color: "#bbb" }}>·</span>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.1em", color: "#888" }}>{pub.date.toUpperCase()}</span>
              {!isForthcoming && (
                <>
                  <span style={{ fontFamily: FONT, fontSize: 8, color: "#bbb" }}>·</span>
                  <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.1em", color: "#888" }}>{pub.readingTime} MIN READ</span>
                </>
              )}
            </div>

            <h1 style={{
              fontFamily: FONT,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 700, color: "#111",
              margin: "0 0 16px",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}>
              {pub.title}
            </h1>

            {pub.subtitle && (
              <p style={{
                fontFamily: FONT, fontSize: 14, color: "#555",
                lineHeight: 1.7, margin: "0 0 32px",
                fontWeight: 300, maxWidth: 620,
              }}>
                {pub.subtitle}
              </p>
            )}

            {/* Authors */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              {pub.authors.map(a => <AuthorCard key={a.name} author={a} />)}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pub.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: FONT, fontSize: 8, letterSpacing: "0.1em",
                  color: "#555", border: B, padding: "4px 10px",
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ASCII canvas panel */}
          <div className="pd-canvas-panel" style={{ position: "relative", minHeight: 320 }}>
            <AsciiCanvas
              sim={pub.sim}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
            <div style={{ position: "absolute", bottom: 16, left: 20 }}>
              <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", color: "#888" }}>
                {pub.sim.replace(/-/g, " ").toUpperCase()} · {pub.program.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── METADATA STRIP ── */}
      <section style={{ borderBottom: B }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {[
            { label: "PROGRAM", value: pub.program },
            { label: "TYPE", value: pub.type },
            ...(pub.pages ? [{ label: "PAGES", value: String(pub.pages) }] : []),
            ...(pub.docNumber ? [{ label: "DOC NO.", value: pub.docNumber }] : []),
            { label: "ACCESS", value: "OPEN ACCESS" },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              padding: "16px 28px",
              borderRight: i < arr.length - 1 ? B : "none",
              flexShrink: 0,
            }}>
              <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: "#888", margin: "0 0 4px" }}>{item.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#111", margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT: 3-column grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 280px" }}>

        {/* Left: Table of Contents */}
        <aside style={{ borderRight: B, padding: "40px 28px" }}>
          <TableOfContents sections={pub.body} activeId={activeSection} />
        </aside>

        {/* Center: Article body */}
        <article
          ref={bodyRef}
          aria-label="Publication content"
          style={{ padding: "48px 56px", borderRight: B }}
        >
          {/* Abstract */}
          <div style={{
            padding: "28px 32px",
            background: "#F8F8F8",
            borderLeft: `3px solid ${SLATE}`,
            marginBottom: 48,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 12px" }}>ABSTRACT</p>
            <p style={{ fontFamily: BODY_FONT, fontSize: 13, color: "#333", lineHeight: 1.85, margin: 0 }}>
              {pub.abstract}
            </p>
          </div>

          {/* Key Findings */}
          {pub.keyFindings && pub.keyFindings.length > 0 && (
            <div style={{ marginBottom: 48, borderTop: B, borderBottom: B, padding: "28px 0" }}>
              <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 20px" }}>KEY FINDINGS</p>
              {pub.keyFindings.map((finding, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 12, marginBottom: i < (pub.keyFindings?.length ?? 0) - 1 ? 16 : 0 }}>
                  <span style={{ fontFamily: FONT, fontSize: 9, color: "rgba(44,62,107,0.4)", paddingTop: 2 }}>0{i + 1}</span>
                  <p style={{ fontFamily: BODY_FONT, fontSize: 13, color: "#333", lineHeight: 1.75, margin: 0 }}>{finding}</p>
                </div>
              ))}
            </div>
          )}

          {/* Forthcoming notice */}
          {isForthcoming && (
            <div style={{ padding: "24px 28px", border: B, marginBottom: 48, background: "#FAFAFA" }}>
              <p style={{ fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em", color: SLATE, margin: "0 0 8px" }}>FORTHCOMING</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: 13, color: "#555", margin: 0, lineHeight: 1.7 }}>
                This publication is forthcoming. The abstract and key findings above are from the working draft.
                Subscribe to TAI's newsletter to be notified when the full text is released.
              </p>
            </div>
          )}

          {/* Article sections */}
          {pub.body.map((section) => {
            // Special render: The Call box
            if (section.id === "the-call") {
              const [label, headline, test, facts, bet] = section.content;
              return (
                <section key={section.id} id={section.id} style={{ marginBottom: 48 }}>
                  <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", letterSpacing: "-0.01em", paddingBottom: 12, borderBottom: B }}>
                    {section.heading}
                  </h2>
                  <div style={{ border: `2px solid ${SLATE}`, padding: "32px", background: "#F4F6FB" }}>
                    <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.18em", color: SLATE, margin: "0 0 16px" }}>{label}</p>
                    <p style={{ fontFamily: FONT, fontSize: "clamp(1rem, 1.8vw, 1.2rem)", fontWeight: 700, color: "#111", lineHeight: 1.5, margin: "0 0 20px" }}>{headline}</p>
                    <p style={{ fontFamily: BODY_FONT, fontSize: 13, color: "#444", lineHeight: 1.85, margin: "0 0 20px" }}>{test}</p>
                    <div style={{ borderTop: `1px solid ${SLATE}`, paddingTop: 16, margin: "0 0 20px" }}>
                      <p style={{ fontFamily: BODY_FONT, fontSize: 11, color: SLATE, margin: 0, letterSpacing: "0.04em" }}>{facts}</p>
                    </div>
                    {bet && (
                      <div style={{ borderLeft: `3px solid ${SLATE}`, paddingLeft: 16 }}>
                        <p style={{ fontFamily: BODY_FONT, fontSize: 12, color: "#555", margin: 0, fontStyle: "italic", lineHeight: 1.75 }}>{bet}</p>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // Special render: Signpost Register table
            if (section.id === "signpost-register") {
              const signposts = [
                { id: "S1",  signpost: "Data wall",              what: "Frontier dataset size vs. Epoch stock; AI-content share of web",  triggers: "Datasets exceed ~100T tokens, or contamination passes ~90% of new pages",  source: "Epoch; Ahrefs",          cadence: "Semiannual" },
                { id: "S2",  signpost: "Agent reliability",       what: "METR 80% horizon; production single-task success",                 triggers: "80% horizon reaches multi-hour AND production success above 90%",           source: "METR; enterprise data",  cadence: "Quarterly" },
                { id: "S3",  signpost: "Financing cascade",       what: "AI-linked credit spread; correlated defaults",                    triggers: "Forced refinancing failure at a top-5 buildout, or spread above 150bp",     source: "BIS; issuer filings",    cadence: "Monthly" },
                { id: "S4",  signpost: "Compute control",         what: "Incumbent accelerator revenue share",                             triggers: "Share falls below ~70% as custom silicon scales",                          source: "Earnings; analysts",     cadence: "Quarterly" },
                { id: "S5",  signpost: "Model commoditization",   what: "Open-weight vs closed frontier gap; price per token",             triggers: "Open-weight reaches frontier parity, or price decline halts",             source: "Epoch; API price sheets", cadence: "Quarterly" },
                { id: "S6",  signpost: "Liability regime",        what: "AI-agent liability doctrine and statute",                        triggers: "A bespoke AI-agent liability statute, or ruling shifting liability to developers", source: "Official Journal; case law", cadence: "Semiannual" },
                { id: "S7",  signpost: "SaaS repricing",          what: "Seat counts; outcome-pricing share; AI-native ARR",               triggers: "Incumbent seats fall >15% YoY, or AI-native ARR growth stalls >50%",       source: "Earnings; private-market", cadence: "Quarterly" },
                { id: "S8",  signpost: "Humanoid economics",      what: "Unit cost; deployed unit count",                                  triggers: "Build cost below ~$30k AND deployed base above ~100k units",               source: "Manufacturer disclosures", cadence: "Semiannual" },
                { id: "S9",  signpost: "AV mainstreaming",        what: "Paid rides/week; number of open metros",                         triggers: "Above ~2M weekly rides across 30+ metros, or vision-only unsupervised launch at scale", source: "Operator disclosures", cadence: "Quarterly" },
                { id: "S10", signpost: "Capital gap",             what: "Attributable AI revenue run-rate vs. Bain path",                  triggers: "Annual AI revenue run-rate above $400B by 2027",                         source: "Earnings; Bain",         cadence: "Quarterly" },
                { id: "S11", signpost: "Power ceiling",           what: "US interconnection median wait",                                  triggers: "Median wait falls below 3 years",                                        source: "LBNL Queued Up",         cadence: "Annual" },
                { id: "S12", signpost: "Distributional backlash", what: "Policy: displacement tax, moratoria",                            triggers: "Any G7 AI-displacement tax or deployment moratorium enacted",             source: "Legislative trackers",  cadence: "Quarterly" },
                { id: "S13", signpost: "The Call",                what: "METR 80%-reliability time horizon",                               triggers: "80% horizon reaches 8 hours by 31 Dec 2027 (falsifies the call)",         source: "METR",                   cadence: "Quarterly" },
              ];
              return (
                <section key={section.id} id={section.id} style={{ marginBottom: 48 }}>
                  <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", letterSpacing: "-0.01em", paddingBottom: 12, borderBottom: B }}>
                    {section.heading}
                  </h2>
                  {section.content.map((para, pi) => (
                    <p key={pi} style={{ fontFamily: BODY_FONT, fontSize: 14, color: "#444", lineHeight: 1.85, margin: "0 0 20px" }}>{para}</p>
                  ))}
                  <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }} className="signpost-swipe-hint">
                    <span style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.14em", color: SLATE, opacity: 0.7 }}>SWIPE TO SEE FULL TABLE</span>
                    <span style={{ fontSize: 14, color: SLATE, opacity: 0.7 }}>→</span>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: BODY_FONT, fontSize: 11 }}>
                      <thead>
                        <tr style={{ background: "#111", color: "#fff" }}>
                          <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>ID</th>
                          <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>Signpost</th>
                          <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>What is measured</th>
                          <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>Triggers when</th>
                          <th className="sp-col-hide" style={{ padding: "10px 14px", textAlign: "left", fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>Source</th>
                          <th className="sp-col-hide" style={{ padding: "10px 14px", textAlign: "left", fontFamily: FONT, fontSize: 8, letterSpacing: "0.12em", fontWeight: 600, whiteSpace: "nowrap" }}>Cadence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {signposts.map((row, ri) => (
                          <tr key={row.id} style={{ background: ri % 2 === 0 ? "#F8F9FC" : "#fff", borderBottom: "1px solid #E5E7EB" }}>
                            <td style={{ padding: "10px 14px", color: SLATE, fontWeight: 600, whiteSpace: "nowrap" }}>{row.id}</td>
                            <td style={{ padding: "10px 14px", fontWeight: 600, color: "#111", whiteSpace: "nowrap" }}>{row.signpost}</td>
                            <td style={{ padding: "10px 14px", color: "#444", lineHeight: 1.5 }}>{row.what}</td>
                            <td style={{ padding: "10px 14px", color: "#444", lineHeight: 1.5 }}>{row.triggers}</td>
                            <td className="sp-col-hide" style={{ padding: "10px 14px", color: "#666", whiteSpace: "nowrap" }}>{row.source}</td>
                            <td className="sp-col-hide" style={{ padding: "10px 14px", color: "#666", whiteSpace: "nowrap" }}>{row.cadence}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            }

            // Default render
            return (
              <section key={section.id} id={section.id} style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 700, color: "#111", margin: "0 0 24px", letterSpacing: "-0.01em", paddingBottom: 12, borderBottom: B }}>
                  {section.heading}
                </h2>
                {section.content.map((para, pi) => (
                  <p key={pi} style={{ fontFamily: BODY_FONT, fontSize: 14, color: "#222", lineHeight: 1.9, margin: "0 0 20px" }}>
                    {para}
                  </p>
                ))}
                {section.blockquote && (
                  <blockquote style={{ borderLeft: `3px solid ${SLATE}`, paddingLeft: 24, margin: "28px 0", fontStyle: "italic" }}>
                    <p style={{ fontFamily: BODY_FONT, fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 }}>
                      {section.blockquote}
                    </p>
                  </blockquote>
                )}
              </section>
            );
          })}

          {/* Citation block */}
          {(pub.doi || pub.docNumber) && (
            <div style={{ borderTop: B, paddingTop: 32, marginTop: 16 }}>
              <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 16px" }}>CITATION</p>
              <div style={{ background: "#F8F8F8", padding: "20px 24px", border: B }}>
                <p style={{ fontFamily: BODY_FONT, fontSize: 11, color: "#444", lineHeight: 1.8, margin: "0 0 8px" }}>
                  {pub.authors.map(a => a.name).join(", ")},{" "}
                  <em>{pub.title}</em>.{" "}
                  The Ashby Institute, {pub.date}.
                  {pub.docNumber && <> {pub.docNumber}.</>}
                  {pub.doi && <> DOI: <a href={pub.doi} style={{ color: SLATE }}>{pub.doi}</a></>}
                  {!pub.doi && pub.slug === "via-negativa" && <> arXiv:XXXX.XXXXX (preprint).</>}
                </p>
              </div>
            </div>
          )}
        </article>

        {/* Right: Sidebar */}
        <aside style={{ padding: "40px 28px" }}>

          {/* Download / Access CTA */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 16px" }}>ACCESS</p>
            {isForthcoming ? (
              <div style={{ border: B, padding: "16px 20px" }}>
                <p style={{ fontFamily: FONT, fontSize: 9, color: "#888", margin: "0 0 12px", lineHeight: 1.6 }}>
                  Full text forthcoming {pub.date}.
                </p>
                <Link href="/contact" style={{
                  display: "block", fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em",
                  color: "#fff", background: "#111", padding: "12px 16px",
                  textDecoration: "none", textAlign: "center", transition: "background 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
                >NOTIFY ME →</Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href={pub.pdfUrl ?? "#"} target={pub.pdfUrl ? "_blank" : undefined} rel="noopener noreferrer" style={{
                  display: "block", fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em",
                  color: "#fff", background: "#111", padding: "12px 16px",
                  textDecoration: "none", textAlign: "center", transition: "background 0.15s",
                  opacity: pub.pdfUrl ? 1 : 0.4, cursor: pub.pdfUrl ? "pointer" : "default",
                }}
                  onMouseEnter={e => { if (pub.pdfUrl) (e.currentTarget as HTMLElement).style.background = SLATE; }}
                  onMouseLeave={e => { if (pub.pdfUrl) (e.currentTarget as HTMLElement).style.background = "#111"; }}
                >{pub.pdfUrl ? "DOWNLOAD PDF →" : "PDF FORTHCOMING"}</a>
                <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)} style={{
                  display: "block", fontFamily: FONT, fontSize: 9, letterSpacing: "0.12em",
                  color: "#111", background: "#fff", padding: "12px 16px", border: B,
                  textDecoration: "none", textAlign: "center", cursor: "pointer",
                  transition: "color 0.15s", width: "100%",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
                >COPY LINK →</button>
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ borderTop: B, paddingTop: 24, marginBottom: 32 }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 16px" }}>DETAILS</p>
            {[
              { label: "Series", value: pub.seriesLabel },
              { label: "Program", value: pub.program },
              { label: "Published", value: pub.date },
              ...(pub.pages ? [{ label: "Pages", value: String(pub.pages) }] : []),
              ...(pub.docNumber ? [{ label: "Document No.", value: pub.docNumber }] : []),
              { label: "Access", value: "Open Access" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                <span style={{ fontFamily: FONT, fontSize: 9, color: "#888" }}>{label}</span>
                <span style={{ fontFamily: FONT, fontSize: 9, color: "#111", fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* DOI */}
          {pub.doi && (
            <div style={{ borderTop: B, paddingTop: 24, marginBottom: 32 }}>
              <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 8px" }}>DOI</p>
              <a href={pub.doi} style={{ fontFamily: BODY_FONT, fontSize: 9, color: SLATE, wordBreak: "break-all", lineHeight: 1.6 }}>
                {pub.doi}
              </a>
            </div>
          )}

          {/* Share */}
          <div style={{ borderTop: B, paddingTop: 24 }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: "0 0 12px" }}>SHARE</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "X / TWITTER", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pub.title)}` },
                { label: "LINKEDIN", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: FONT, fontSize: 7, letterSpacing: "0.1em",
                  color: "#555", border: B, padding: "7px 10px",
                  textDecoration: "none", transition: "color 0.15s, background 0.15s",
                  flexGrow: 1, textAlign: "center",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#111"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#555"; }}
                >{label}</a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── RELATED PUBLICATIONS ── */}
      {related.length > 0 && (
        <section style={{ borderTop: B }}>
          <div style={{ padding: "20px 32px", borderBottom: B }}>
            <p style={{ fontFamily: FONT, fontSize: 8, letterSpacing: "0.16em", color: SLATE, margin: 0 }}>RELATED PUBLICATIONS</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${related.length}, 1fr)` }}>
            {related.map((rel, i) => (
              <div key={rel.slug} style={{ borderRight: i < related.length - 1 ? B : "none" }}>
                <RelatedCard pub={rel} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER CTA ── */}
      <section style={{ borderTop: B }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Link href="/publications" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#111", background: "#fff", padding: "20px 32px",
            textDecoration: "none", borderRight: B, transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#111"}
          >← ALL PUBLICATIONS</Link>
          <Link href="/contact" style={{
            fontFamily: FONT, fontSize: 9, letterSpacing: "0.14em",
            color: "#fff", background: "#111", padding: "20px 32px",
            textDecoration: "none", borderRight: B, transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SLATE}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
          >SUBSCRIBE TO NEWSLETTER →</Link>
        </div>
      </section>

      {/* Sticky PDF CTA — mobile only */}
      {pub.pdfUrl && (
        <a
          href={pub.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-pdf-cta"
          style={{
            display: "none", // shown via CSS on mobile
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "#111",
            color: "#fff",
            fontFamily: FONT,
            fontSize: 10,
            letterSpacing: "0.14em",
            padding: "16px 24px",
            textDecoration: "none",
            textAlign: "center" as const,
            borderTop: `2px solid ${SLATE}`,
          }}
        >
          DOWNLOAD PDF →
        </a>
      )}

      {/* Responsive overrides */}
      <style>{`
        /* Hide swipe hint on desktop, show on mobile via media query */
        .signpost-swipe-hint {
          display: none;
        }
        @media (max-width: 1100px) {
          article[aria-label="Publication content"] {
            padding: 40px 36px !important;
          }
        }
        @media (max-width: 900px) {
          /* Collapse to 2-col: hide left TOC, keep sidebar */
          aside:first-of-type { display: none !important; }
          div[style*="grid-template-columns: 220px"] {
            grid-template-columns: 1fr 260px !important;
          }
        }
        @media (max-width: 640px) {
          /* Prevent ALL horizontal overflow on the page */
          body, #root, .publication-detail-root {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }
          /* Single column */
          div[style*="grid-template-columns: 220px"],
          div[style*="grid-template-columns: 1fr 360px"],
          div[style*="grid-template-columns: 1fr 260px"] {
            grid-template-columns: 1fr !important;
          }
          aside { display: none !important; }
          /* Hide ASCII canvas panel in hero on mobile */
          .pd-canvas-panel { display: none !important; }
          /* Hero title block: full width, reduced padding */
          div[style*="padding: 56px 48px 48px"] {
            padding: 32px 20px 28px !important;
            border-right: none !important;
            box-sizing: border-box !important;
            max-width: 100vw !important;
          }
          article[aria-label="Publication content"] {
            padding: 28px 16px !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
            max-width: 100vw !important;
            word-break: break-word !important;
          }
          /* Abstract and all content boxes: constrain width */
          article[aria-label="Publication content"] > div,
          article[aria-label="Publication content"] section {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          /* The Call box: reduce padding, prevent overflow */
          article[aria-label="Publication content"] section div[style*="border: 2px solid"] {
            padding: 20px 16px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          /* Blockquotes: constrain */
          article[aria-label="Publication content"] blockquote {
            margin: 20px 0 !important;
            padding-left: 16px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          /* Abstract box: reduce padding */
          article[aria-label="Publication content"] > div:first-child {
            padding: 20px 16px !important;
          }
          /* Signpost table: horizontal scroll container */
          article[aria-label="Publication content"] div[style*="overflowX"] {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            max-width: calc(100vw - 32px) !important;
          }
          /* Show swipe hint only on mobile */
          .signpost-swipe-hint {
            display: flex !important;
          }
          /* Metadata strip: allow wrapping, reduce padding */
          div[style*="flexShrink: 0"] {
            padding: 12px 16px !important;
          }
          /* Breadcrumb: reduce padding */
          nav[aria-label="Breadcrumb"] a,
          nav[aria-label="Breadcrumb"] span {
            padding: 10px 14px !important;
          }
          /* Related publications: single column */
          div[style*="repeat("] {
            grid-template-columns: 1fr !important;
          }
          /* Hide Source and Cadence columns on mobile */
          .sp-col-hide { display: none !important; }
          /* Show sticky PDF download CTA on mobile */
          .sticky-pdf-cta { display: block !important; }
        }
      `}</style>
    </Layout>
  );
}
