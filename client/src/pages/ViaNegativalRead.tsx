/**
 * Via Negativa: Reading Edition
 * Design: Newsreader serif body, IBM Plex Mono computed, teal accent reserved for binding constraint only.
 * This page intentionally bypasses the site Layout wrapper — it is a standalone long-form reading experience.
 * Route: /publications/via-negativa/read
 */

import { useEffect } from "react";
import { Link } from "wouter";

const PDF_URL = "/manus-storage/ViaNegativaarXivv3_58458eb4.pdf";

// Placeholder figure component — renders a labelled grey box until real PNGs are uploaded
function Fig({ src, alt, caption, width = 1200, height = 700 }: {
  src: string; alt: string; caption: React.ReactNode; width?: number; height?: number;
}) {
  const aspect = (height / width) * 100;
  return (
    <figure>
      <div
        className="vn-fig-placeholder"
        style={{ paddingBottom: `${aspect}%`, position: "relative", background: "var(--rule-soft)", border: "1px solid var(--rule)", display: "block" }}
        aria-label={alt}
      >
        <span style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: '"IBM Plex Mono", monospace', fontSize: "11px", color: "var(--muted)",
          textTransform: "uppercase", letterSpacing: ".1em", textAlign: "center", padding: "12px"
        }}>
          {alt}
        </span>
      </div>
      <figcaption dangerouslySetInnerHTML={{ __html: caption as string }} />
    </figure>
  );
}

export default function ViaNegativalRead() {
  useEffect(() => {
    // Inject Google Fonts for this page only
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    // JS tabbed navigation
    const body = document.body;
    body.classList.add("vn-js");
    const pieces = document.querySelectorAll<HTMLElement>(".vn-piece");
    const navs = document.querySelectorAll<HTMLElement>(".vn-navlink");

        const go = (id: string, push: boolean) => {
      const target = document.getElementById(id);
      if (!target) return;
      pieces.forEach(p => {
        if (p.id === id) p.className = "vn-piece vn-on";
        else p.className = "vn-piece";
      });
      navs.forEach(n => {
        const isOn = n.getAttribute("data-go") === id;
        n.className = isOn ? "vn-navlink vn-on" : "vn-navlink";
      });
      window.scrollTo(0, 0);
      if (push && history.replaceState) history.replaceState(null, "", "#" + id);
    }

    const goers = document.querySelectorAll<HTMLElement>("[data-go]");
    const goerHandlers: Array<[HTMLElement, (e: Event) => void]> = [];
    goers.forEach(el => {
      const handler = (e: Event) => {
        const t = el.getAttribute("data-go");
        if (t && document.getElementById(t)) { e.preventDefault(); go(t, true); }
      };
      el.addEventListener("click", handler);
      goerHandlers.push([el, handler]);
    });

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([data-go])');
    const anchorHandlers: Array<[HTMLAnchorElement, (e: Event) => void]> = [];
    anchors.forEach(a => {
      const handler = (e: Event) => {
        const id = a.getAttribute("href")?.slice(1);
        const el = id && document.getElementById(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
      };
      a.addEventListener("click", handler);
      anchorHandlers.push([a, handler]);
    });

    // Elasticity slider
    const slider = document.getElementById("aSlider") as HTMLInputElement | null;
    if (slider) {
      const REV = 110e9, GW = 29.6, PERMIT = 200, EFF = 0.40, YRS = 4, GDP = 154e12;
      const F = [
        { n: "PwC 2017, +$15.7T by 2030", o: 15.7e12, mine: false },
        { n: "Goldman 2023, +7% global GDP", o: 0.07 * GDP, mine: false },
        { n: "McKinsey 2023, $4.4T annual", o: 4.4e12, mine: false },
        { n: "This paper, upper $10.5T", o: 10.5e12, mine: true },
        { n: "This paper, lower $7.0T", o: 7.0e12, mine: true },
        { n: "Acemoglu 2024, 0.66% TFP", o: 0.011 * GDP, mine: false },
      ];
      const list = document.getElementById("fcList");
      const valEl = document.getElementById("aVal");
      const vd = document.getElementById("fcVerdict");

      if (list && valEl && vd) {
        F.forEach(f => {
          const d = document.createElement("div");
          d.className = "vn-fc" + (f.mine ? " vn-mine" : "");
          d.innerHTML = `<span class="vn-nm">${f.n}</span><span class="vn-bar"><i style="width:0"></i></span><span class="vn-sg">0.00</span>`;
          list.appendChild(d);
          (f as any).el = d;
        });

        const sigma = (o: number, a: number) => {
          const k = REV / Math.pow(GW, a);
          const need = Math.pow(o / k, 1 / a) / Math.pow(1 + EFF, YRS);
          return PERMIT / need;
        }
        const label = (a: number) => {
          if (Math.abs(a - 1.70) < 0.02) return "observed, 2023 to 2024";
          if (Math.abs(a - 1.17) < 0.02) return "observed, 2024 to 2025";
          if (Math.abs(a - 1.37) < 0.02) return "observed, 2025 to 2026";
          if (a < 1.0) return "diminishing returns";
          if (a === 1.0) return "constant returns";
          return "increasing returns";
        }
        const render = () => {
          const a = parseFloat(slider!.value);
          let alive = 0, mineAlive = 0;
          valEl!.innerHTML = `&alpha; = ${a.toFixed(2)}<small>${label(a)}</small>`;
          F.forEach(f => {
            const s = sigma(f.o, a), ok = s >= 1;
            if (ok) { alive++; if (f.mine) mineAlive++; }
            const el = (f as any).el as HTMLElement;
            el.className = "vn-fc" + (f.mine ? " vn-mine" : "") + (ok ? " vn-alive" : "");
            (el.querySelector("i") as HTMLElement).style.width = Math.min(100, (s / 3) * 100) + "%";
            (el.querySelector(".vn-sg") as HTMLElement).textContent = s < 0.01 ? "0.00" : s.toFixed(2);
          });
          let msg = "";
          if (alive === 0) msg = "Nothing survives. Every published forecast of AI output, including this one, requires more compute than the grid can deliver by 2030.";
          else if (mineAlive === 0) msg = `This paper\u2019s own GDP band is eliminated. ${alive} of 6 survive, and the survivor is the most conservative estimate in the field.`;
          else if (alive === 6) msg = "Everything survives, including the most bullish forecast ever published on this question.";
          else msg = `${alive} of 6 survive, this paper among them.`;
          vd!.textContent = msg;
        }
        slider.addEventListener("input", render);
        render();
      }
    }

    // Restore hash on load
    const h = location.hash.replace("#", "");
    go((h && document.getElementById(h) && h.charAt(0) === "p") ? h : "p0", false);

    return () => {
      body.classList.remove("vn-js");
      goerHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      anchorHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
    };
  }, []);

  return (
    <>
      <style>{`
        /* ===== Via Negativa Reading Edition — scoped under .vn-wrap ===== */
        .vn-page { margin: 0; padding: 0; background: var(--vn-paper); color: var(--vn-ink);
          font-family: "Newsreader", Charter, "Bitstream Charter", "Iowan Old Style", Georgia, "Times New Roman", serif;
          font-size: 19px; line-height: 1.62; font-variant-numeric: oldstyle-nums; min-height: 100vh; }
        .vn-page *, .vn-page *::before, .vn-page *::after { box-sizing: border-box; }
        :root {
          --vn-paper: #FBFBF9; --vn-ink: #15181C; --vn-muted: #6A7079;
          --vn-rule: #DEDDD6; --vn-rule-soft: #EAE9E3;
          --vn-bind: #0F5257; --vn-bind-tint: #E4EEEE; --vn-strike: #868C94;
          --vn-measure: 69ch;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --vn-paper: #14171A; --vn-ink: #E9E7E1; --vn-muted: #9DA3AB;
            --vn-rule: #2C3036; --vn-rule-soft: #23272C;
            --vn-bind: #5FB8B8; --vn-bind-tint: #1B2A2A; --vn-strike: #71777F;
          }
        }
        .vn-skip { position: absolute; left: -9999px; top: 0; background: var(--vn-ink); color: var(--vn-paper);
          padding: 10px 16px; z-index: 99; font-family: "IBM Plex Mono", monospace; font-size: 13px; border: 0; }
        .vn-skip:focus { left: 0; }
        .vn-wrap { display: flex; flex-direction: row; align-items: flex-start; min-height: 100vh; }
        nav.vn-side {
          width: 262px; min-width: 262px; flex: 0 0 262px;
          border-right: 1px solid var(--vn-rule); padding: 34px 26px 60px;
          position: sticky; top: 0; max-height: 100vh; overflow-y: auto;
        }
        .vn-main { flex: 1 1 auto; min-width: 0; width: 100%; }
        .vn-brand { display: block; border: 0; text-decoration: none; margin-bottom: 4px; color: var(--vn-ink); }
        .vn-brand .vn-t { font-size: 19px; font-weight: 600; letter-spacing: -.01em; line-height: 1.18; display: block; }
        .vn-brand .vn-s { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; letter-spacing: .1em;
          text-transform: uppercase; color: var(--vn-muted); margin-top: 7px; display: block; }
        nav.vn-side ol { list-style: none; margin: 26px 0 0; padding: 0; }
        nav.vn-side li { margin: 0 0 1px; }
        .vn-navlink { display: flex; align-items: baseline; padding: 7px 0; border: 0; font-size: 15px;
          line-height: 1.3; color: var(--vn-muted); text-decoration: none; cursor: pointer; background: none; }
        .vn-navlink .vn-n { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: var(--vn-strike);
          width: 26px; min-width: 26px; flex: 0 0 26px; }
        .vn-navlink:hover { color: var(--vn-ink); }
        .vn-navlink.vn-on { color: var(--vn-ink); font-weight: 500; }
        .vn-navlink.vn-on .vn-n { color: var(--vn-bind); }
        .vn-navfoot { margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--vn-rule-soft);
          font-family: "IBM Plex Mono", monospace; font-size: 11.5px; line-height: 1.9; color: var(--vn-muted); }
        .vn-navfoot a { display: block; border: 0; color: inherit; text-decoration: none; }
        .vn-navfoot a:hover { color: var(--vn-ink); }
        .vn-piece { max-width: var(--vn-measure); margin: 0; padding: 60px 46px 140px;
          border-top: 1px solid var(--vn-rule-soft); }
        .vn-piece:first-child { border-top: 0; }
        body.vn-js .vn-piece { display: none; border-top: 0; }
        body.vn-js .vn-piece.vn-on { display: block; }
        @media (prefers-reduced-motion: no-preference) {
          body.vn-js .vn-piece.vn-on { animation: vn-fade .28s ease; }
          @keyframes vn-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        }
        .vn-eyebrow { font-size: 11px; letter-spacing: .13em; text-transform: uppercase; color: var(--vn-muted);
          display: block; margin-bottom: 16px; font-family: "IBM Plex Mono", monospace; }
        .vn-page h1 { font-size: 41px; line-height: 1.1; font-weight: 600; letter-spacing: -.021em; margin: 0 0 10px; }
        .vn-page h1 .vn-sub { display: block; font-size: 21px; font-weight: 300; color: var(--vn-muted);
          letter-spacing: -.005em; margin-top: 11px; line-height: 1.35; }
        .vn-page h2 { font-size: 25px; font-weight: 600; letter-spacing: -.014em; margin: 52px 0 14px; line-height: 1.2; }
        .vn-page h3 { font-size: 19px; font-weight: 600; margin: 34px 0 10px; letter-spacing: -.005em; }
        .vn-page p { margin: 0 0 19px; }
        .vn-lede { font-size: 20.5px; line-height: 1.55; }
        .vn-page strong { font-weight: 600; }
        .vn-page em { font-style: italic; }
        .vn-page hr { border: 0; border-top: 1px solid var(--vn-rule); margin: 46px 0; }
        .vn-summary { font-size: 19.5px; line-height: 1.5; font-weight: 500; margin: 0 0 30px;
          padding-left: 20px; border-left: 3px solid var(--vn-ink); }
        .vn-mini { margin: 0 0 42px; padding: 16px 0 0; border-top: 1px solid var(--vn-rule); }
        .vn-mini .vn-lbl { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; letter-spacing: .12em;
          text-transform: uppercase; color: var(--vn-muted); display: block; margin-bottom: 9px; }
        .vn-mini ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; }
        .vn-mini li { font-size: 15px; line-height: 1.75; width: 50%; min-width: 210px; }
        .vn-mini a { border: 0; color: var(--vn-muted); text-decoration: none; }
        .vn-mini a:hover { color: var(--vn-ink); border-bottom: 1px solid var(--vn-ink); }
        .vn-contents { margin: 0 0 10px; }
        .vn-entry { display: flex; padding: 20px 0; border-top: 1px solid var(--vn-rule-soft); }
        .vn-entry > div { flex: 1 1 auto; min-width: 0; }
        .vn-entry:first-child { border-top: 1px solid var(--vn-rule); }
        .vn-toc-num { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; color: var(--vn-strike);
          padding-top: 5px; width: 34px; min-width: 34px; flex: 0 0 34px; }
        .vn-entry h4 { margin: 0 0 5px; font-size: 19.5px; font-weight: 600; letter-spacing: -.008em; }
        .vn-entry h4 a { border: 0; text-decoration: none; color: inherit; }
        .vn-entry h4 a:hover { border-bottom: 1px solid var(--vn-ink); }
        .vn-entry p { margin: 0; font-size: 16.5px; line-height: 1.5; color: #3B4048; }
        @media (prefers-color-scheme: dark) { .vn-entry p { color: var(--vn-muted); } }
        .vn-ladder { margin: 34px 0 40px; border-top: 1px solid var(--vn-ink); }
        .vn-rung { display: flex; align-items: baseline; padding: 11px 0; }
        .vn-rung .vn-tier { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: var(--vn-muted);
          letter-spacing: .06em; width: 52px; min-width: 52px; flex: 0 0 52px; }
        .vn-rung .vn-name { font-size: 17px; font-weight: 500; flex: 1 1 auto; padding: 0 14px; }
        .vn-rung .vn-relax { font-family: "IBM Plex Mono", monospace; font-size: 12px; color: var(--vn-muted);
          text-align: right; width: 132px; min-width: 132px; flex: 0 0 132px; }
        .vn-r0 { border-bottom: 4px solid var(--vn-ink); }
        .vn-r1 { border-bottom: 3px solid #3A4046; }
        .vn-r2 { border-bottom: 2px solid #5A6068; }
        .vn-r3 { border-bottom: 1.5px solid #838A92; }
        .vn-r4 { border-bottom: 1px dashed #9AA1A9; }
        .vn-r5 { border-bottom: 1px dotted #B6BCC3; }
        .vn-ladder-key { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; color: var(--vn-muted);
          margin-top: 12px; line-height: 1.65; }
        .vn-explore { border: 1px solid var(--vn-ink); padding: 24px 26px 22px; margin: 34px 0; }
        .vn-explore .vn-sig { font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--vn-bind);
          display: block; margin-bottom: 14px; font-family: "IBM Plex Mono", monospace; }
        .vn-slider-row { display: flex; align-items: center; gap: 16px; margin: 6px 0 20px; flex-wrap: wrap; }
        .vn-slider-row input[type=range] { appearance: none; height: 3px; background: var(--vn-rule);
          flex: 1 1 260px; min-width: 220px; outline: none; border-radius: 2px; }
        .vn-slider-row input[type=range]::-webkit-slider-thumb { appearance: none; width: 17px; height: 17px;
          border-radius: 50%; background: var(--vn-bind); cursor: pointer; border: 2px solid var(--vn-paper); }
        .vn-slider-row input[type=range]::-moz-range-thumb { width: 17px; height: 17px; border-radius: 50%;
          background: var(--vn-bind); cursor: pointer; border: 2px solid var(--vn-paper); }
        .vn-aval { font-family: "IBM Plex Mono", monospace; font-size: 19px; color: var(--vn-bind);
          min-width: 104px; font-weight: 600; }
        .vn-aval small { display: block; font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
          color: var(--vn-muted); font-weight: 400; margin-top: 2px; }
        .vn-fc { display: flex; align-items: center; padding: 7px 0; border-top: 1px solid var(--vn-rule-soft); font-size: 15px; }
        .vn-fc:first-of-type { border-top: 1px solid var(--vn-rule); }
        .vn-nm { flex: 1 1 auto; min-width: 0; color: var(--vn-strike); }
        .vn-bar { width: 130px; height: 7px; background: var(--vn-rule-soft); margin: 0 12px; position: relative; flex: 0 0 130px; }
        .vn-bar i { display: block; height: 100%; background: var(--vn-strike); transition: width .12s linear; }
        .vn-fc.vn-alive .vn-bar i { background: var(--vn-bind); }
        .vn-sg { font-family: "IBM Plex Mono", monospace; font-size: 13px; width: 52px; text-align: right;
          color: var(--vn-strike); flex: 0 0 52px; }
        .vn-fc.vn-alive .vn-sg { color: var(--vn-bind); font-weight: 600; }
        .vn-fc.vn-alive .vn-nm { color: var(--vn-ink); }
        .vn-fc.vn-mine .vn-nm { font-weight: 600; }
        .vn-verdictline { font-family: "IBM Plex Mono", monospace; font-size: 13px; color: var(--vn-ink);
          margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--vn-ink); line-height: 1.6; }
        .vn-obsband { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; color: var(--vn-muted); margin-top: 9px; }
        .vn-tbl { margin: 26px 0 30px; overflow-x: auto; }
        .vn-page table { border-collapse: collapse; width: 100%; font-size: 14.5px;
          font-family: "IBM Plex Mono", monospace; font-variant-numeric: tabular-nums; }
        .vn-page th { text-align: left; font-weight: 500; font-size: 10.5px; letter-spacing: .08em;
          text-transform: uppercase; color: var(--vn-muted); border-bottom: 1px solid var(--vn-ink);
          padding: 0 12px 7px 0; vertical-align: bottom; }
        .vn-page td { padding: 8px 12px 8px 0; border-bottom: 1px solid var(--vn-rule-soft); vertical-align: top; }
        .vn-page td.vn-n { text-align: right; padding-right: 16px; }
        .vn-page tr.vn-survives td { background: var(--vn-bind-tint); }
        .vn-bind { color: var(--vn-bind); font-weight: 600; }
        .vn-gone { color: var(--vn-strike); text-decoration: line-through; text-decoration-thickness: 1px; }
        .vn-page caption { caption-side: bottom; text-align: left; font-family: "Newsreader", Georgia, serif;
          font-size: 15px; line-height: 1.45; color: #3B4048; padding-top: 12px; font-variant-numeric: normal; }
        @media (prefers-color-scheme: dark) { .vn-page caption { color: var(--vn-muted); } }
        .vn-page caption b { font-weight: 600; }
        .vn-page figure { margin: 34px 0 36px; }
        .vn-page figure img { width: 100%; display: block; border: 1px solid var(--vn-rule-soft); }
        .vn-page figcaption { font-size: 15px; line-height: 1.45; color: #3B4048; margin-top: 11px; }
        @media (prefers-color-scheme: dark) { .vn-page figcaption { color: var(--vn-muted); } }
        .vn-page figcaption b { font-weight: 600; }
        .vn-page figcaption .vn-src { font-family: "IBM Plex Mono", monospace; font-size: 11.5px;
          color: var(--vn-muted); display: block; margin-top: 5px; }
        .vn-call { border: 1px solid var(--vn-ink); padding: 22px 24px; margin: 32px 0; }
        .vn-call .vn-sig { font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--vn-bind);
          display: block; margin-bottom: 10px; font-family: "IBM Plex Mono", monospace; }
        .vn-call p:last-child { margin-bottom: 0; }
        .vn-concede { border-left: 3px solid var(--vn-bind); background: var(--vn-bind-tint);
          padding: 18px 22px; margin: 30px 0; }
        .vn-concede p:last-child { margin-bottom: 0; }
        .vn-concede .vn-sig { font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--vn-bind);
          display: block; margin-bottom: 9px; font-family: "IBM Plex Mono", monospace; }
        .vn-verdict { border-top: 1px solid var(--vn-rule); padding: 17px 0; }
        .vn-verdict .vn-q { font-size: 17px; font-weight: 600; margin: 0 0 5px; }
        .vn-verdict .vn-a { font-size: 16.5px; margin: 0 0 7px; color: #3B4048; line-height: 1.5; }
        @media (prefers-color-scheme: dark) { .vn-verdict .vn-a { color: var(--vn-muted); } }
        .vn-verdict .vn-meta { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; color: var(--vn-muted); }
        .vn-verdict .vn-meta b { color: var(--vn-bind); font-weight: 600; }
        .vn-fn { margin-top: 56px; padding-top: 20px; border-top: 1px solid var(--vn-ink);
          font-size: 15px; line-height: 1.5; color: #3B4048; }
        @media (prefers-color-scheme: dark) { .vn-fn { color: var(--vn-muted); } }
        .vn-fn ol { padding-left: 20px; margin: 0; }
        .vn-fn li { margin-bottom: 9px; }
        .vn-page sup a { border: 0; color: var(--vn-bind); font-family: "IBM Plex Mono", monospace;
          font-size: 11px; padding: 0 1px; text-decoration: none; }
        .vn-next { margin-top: 60px; padding-top: 22px; border-top: 1px solid var(--vn-rule); font-size: 16px; }
        .vn-next .vn-lbl { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; letter-spacing: .12em;
          text-transform: uppercase; color: var(--vn-muted); display: block; margin-bottom: 6px; }
        .vn-page a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--vn-rule); }
        .vn-page a:hover { border-bottom-color: var(--vn-ink); }
        .vn-page a:focus-visible { outline: 2px solid var(--vn-bind); outline-offset: 2px; }
        .vn-reg td.vn-hit { color: var(--vn-muted); }
        .vn-reg td.vn-miss { color: var(--vn-bind); font-weight: 600; }
        .vn-reg tr.vn-own td { background: var(--vn-bind-tint); }
        .vn-mono { font-family: "IBM Plex Mono", monospace; font-variant-numeric: tabular-nums; }
        /* params table highlight */
        .vn-page tr.vn-survives td { background: var(--vn-bind-tint); }
        /* back link bar */
        .vn-backbar { display: flex; align-items: center; gap: 14px; padding: 14px 26px;
          border-bottom: 1px solid var(--vn-rule); font-family: "IBM Plex Mono", monospace;
          font-size: 11.5px; color: var(--vn-muted); background: var(--vn-paper); }
        .vn-backbar a { border: 0; color: var(--vn-muted); text-decoration: none; }
        .vn-backbar a:hover { color: var(--vn-ink); }
        @media (max-width: 1180px) and (min-width: 901px) {
          nav.vn-side { width: 216px; min-width: 216px; flex: 0 0 216px; padding: 30px 18px; }
          .vn-piece { padding: 52px 32px 120px; }
          :root { --vn-measure: 64ch; }
        }
        @media (max-width: 900px) {
          .vn-wrap { flex-direction: column; }
          nav.vn-side { position: static; max-height: none; width: auto; min-width: 0;
            flex: 0 0 auto; border-right: 0; border-bottom: 1px solid var(--vn-rule); padding: 22px 22px 18px; }
          nav.vn-side ol { margin-top: 16px; }
          .vn-piece { padding: 34px 22px 100px; }
          .vn-page h1 { font-size: 32px; }
          .vn-mini li { width: 100%; }
          .vn-rung { flex-wrap: wrap; }
          .vn-rung .vn-relax { text-align: left; width: auto; flex: 1 1 100%; padding-left: 52px; margin-top: 2px; }
          .vn-page { font-size: 18px; }
        }
        @media print {
          nav.vn-side, .vn-skip, .vn-explore, .vn-backbar { display: none; }
          .vn-wrap { display: block; }
          .vn-piece { display: block !important; max-width: none; padding: 0 0 28pt; page-break-after: always; border: 0; }
          .vn-page { font-size: 10.5pt; background: #fff; color: #000; }
          .vn-page h1 { font-size: 20pt; }
          .vn-page h2 { font-size: 14pt; }
          .vn-page h3 { font-size: 11.5pt; }
          figure, table, .vn-call, .vn-concede, .vn-verdict { page-break-inside: avoid; }
          .vn-next { display: none; }
        }
      `}</style>

      <div className="vn-page">
        <a className="vn-skip" href="#p0">Skip to content</a>

        {/* Back bar — links back to the publication page */}
        <div className="vn-backbar">
          <Link href="/publications/via-negativa">← Back to publication page</Link>
          <span style={{ marginLeft: "auto" }}>
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer">Download PDF ↗</a>
          </span>
        </div>

        <div className="vn-wrap">
          {/* ===== LEFT NAV ===== */}
          <nav className="vn-side" aria-label="Reading edition navigation">
            <a className="vn-brand" href="#p0" data-go="p0">
              <span className="vn-t">Via Negativa</span>
              <span className="vn-s">The AI Economy<br />by Elimination</span>
            </a>
            <ol>
              <li><a className="vn-navlink vn-on" data-go="p0" href="#p0"><span className="vn-n">00</span><span>Introduction</span></a></li>
              <li><a className="vn-navlink" data-go="p1" href="#p1"><span className="vn-n">I</span><span>The Method</span></a></li>
              <li><a className="vn-navlink" data-go="p2" href="#p2"><span className="vn-n">II</span><span>The Elasticity Gap</span></a></li>
              <li><a className="vn-navlink" data-go="p3" href="#p3"><span className="vn-n">III</span><span>The Roots and the Economy</span></a></li>
              <li><a className="vn-navlink" data-go="p4" href="#p4"><span className="vn-n">IV</span><span>The Binding Constraints</span></a></li>
              <li><a className="vn-navlink" data-go="p5" href="#p5"><span className="vn-n">V</span><span>The Call and the Record</span></a></li>
            </ol>
            <div className="vn-navfoot">
              <a href={PDF_URL} target="_blank" rel="noopener noreferrer">Full paper as PDF</a>
              <a href="https://www.theashbyinstitute.org">The Ashby Institute</a>
              <a href="https://mindmeetsmatter.com">Mind Meets Matter</a>
            </div>
          </nav>

          {/* ===== MAIN CONTENT ===== */}
          <main className="vn-main">

            {/* ===== 0. INTRODUCTION ===== */}
            <section className="vn-piece vn-on" id="p0">
              <span className="vn-eyebrow">Sidney Scott · The Ashby Institute · July 2026</span>
              <h1>Via Negativa: The AI Economy by Elimination
                <span className="vn-sub">What the constraints permit, 2026 to 2030</span>
              </h1>

              <p className="vn-lede">Every serious forecast of the AI economy is built the same way. Take a trend, project it forward. Those projections now disagree by two orders of magnitude, because a method that chains assumptions inherits the uncertainty of all of them.</p>

              <p>This one is built by subtraction. Enumerate the candidate answers. Compute how long the binding constraint needs to deliver what each candidate requires. Compare against the time remaining. Remove what cannot be delivered. What remains is the forecast.</p>

              <p>The constraints are not a checklist. They are derived from a single question that never mentions artificial intelligence: <em>what does it take to obtain one more unit of a limiting input?</em> The answers partition exhaustively into six mechanisms, ordered by how fast each one can supply that unit.</p>

              <div className="vn-ladder">
                <div className="vn-rung vn-r0"><span className="vn-tier">TIER 0</span><span className="vn-name">Thermodynamics</span><span className="vn-relax">never</span></div>
                <div className="vn-rung vn-r1"><span className="vn-tier">TIER 1</span><span className="vn-name">Talent and Absorption</span><span className="vn-relax">10 to 40 years</span></div>
                <div className="vn-rung vn-r2"><span className="vn-tier">TIER 2</span><span className="vn-name">Data</span><span className="vn-relax">not replenished</span></div>
                <div className="vn-rung vn-r3"><span className="vn-tier">TIER 3</span><span className="vn-name">Matter</span><span className="vn-relax">2 to 7 years</span></div>
                <div className="vn-rung vn-r4"><span className="vn-tier">TIER 4</span><span className="vn-name">Law and Legitimacy</span><span className="vn-relax">3 to 24 months</span></div>
                <div className="vn-rung vn-r5"><span className="vn-tier">TIER 5</span><span className="vn-name">Capital</span><span className="vn-relax">days to weeks</span></div>
                <div className="vn-ladder-key">Rule weight encodes mutability. Only Tier 0 makes a candidate impossible; the rest make it late, expensive, or contingent.</div>
              </div>

              <p>That ordering does the work, and it produces the first uncomfortable result. Almost all public argument about AI concerns capital. Capital relaxes in weeks. It therefore cannot bind on a multi-year horizon, and an argument about a non-binding constraint cannot change an answer.</p>
              <p><strong>The constraint that binds the buildout in 2026 is a transformer.</strong> Lead time <a href="https://www.datacenterknowledge.com/build-design/ai-data-center-boom-rewires-us-power-supply-chain" target="_blank" rel="noopener noreferrer">128 weeks in 2025, past 160 by 2026</a>, three to five years for the largest units. Not a chip. Not a dollar.</p>

              <Fig
                src="figs/vn_verdicts.png"
                alt="All thirty verdicts by binding constraint, tier and probability"
                width={1458} height={1513}
                caption="<b>Every verdict, its binding constraint, and its tier.</b> Absorption and Matter bind two thirds of the thirty. Eight are computed against an observable rate; the rest are disciplined judgment, marked as such. The probabilities cluster between 0.60 and 0.80, which is itself a finding: a forecaster whose every answer is <em>probably</em> is barely forecasting."
              />

              <h2>Contents</h2>
              <p style={{ fontSize: "16.5px", color: "var(--vn-muted)", marginBottom: "22px" }}>Each piece stands on its own. The full arithmetic, all thirty verdicts and the reference list are in the <a href={PDF_URL} target="_blank" rel="noopener noreferrer">PDF</a>.</p>

              <div className="vn-contents">
                <div className="vn-entry"><span className="vn-toc-num">I</span><div>
                  <h4><a href="#p1" data-go="p1">The Method</a></h4>
                  <p>Constraints do not eliminate candidates. They reprice them, and only physical law bars outright. The framework is stratified: a deductive floor at Tier 0, an inductive middle across Tiers 1 to 5, and an abductive top across whatever survives. That is why every verdict carries a probability instead of a proof.</p>
                </div></div>
                <div className="vn-entry"><span className="vn-toc-num">II</span><div>
                  <h4><a href="#p2" data-go="p2">The Elasticity Gap</a></h4>
                  <p>Every forecast of AI's contribution to output is a bet on the elasticity between deployed compute and attributable output. Nobody names it, nobody has measured it, and its observed values ran 1.70, then 1.17, then 1.37 across 2023 to 2026. At the low end of that range this paper's own GDP band is eliminated and the sole survivor is the field's most conservative estimate. At the high end even the most bullish survives. The central quantitative dispute in AI economics is a disagreement about one unmeasured number.</p>
                </div></div>
                <div className="vn-entry"><span className="vn-toc-num">III</span><div>
                  <h4><a href="#p3" data-go="p3">The Roots and the Economy</a></h4>
                  <p>AI adds roughly 1.0 to 1.5 percentage points of annual growth, not a majority of GDP: the majority claim fails by about ninefold. Realized gains are running at 0.1 to 0.2 points against a 1.5 point electricity precedent. The binding constraint on all of it is organizational absorption, which relaxes on a twenty to forty year clock.</p>
                </div></div>
                <div className="vn-entry"><span className="vn-toc-num">IV</span><div>
                  <h4><a href="#p4" data-go="p4">The Binding Constraints</a></h4>
                  <p>Compute, data, models, labor, agents, software and the physical world, fifteen questions, one binding constraint each. Models commoditize and the moat moves to everything around them. The data wall is weaker than the field believes. Grid equipment is stronger.</p>
                </div></div>
                <div className="vn-entry"><span className="vn-toc-num">V</span><div>
                  <h4><a href="#p5" data-go="p5">The Call and the Record</a></h4>
                  <p>One dated bet with five adjudication rules: the 80 percent reliability horizon stays under eight hours on 31 December 2027, at P = 0.85. Plus the backtest, including a prediction this framework got wrong at maximum confidence, on the exact constraint tier it had already flagged as vulnerable.</p>
                </div></div>
              </div>

              <h2>What the engine can decide, and what nothing can</h2>
              <p>The engine converts a shortfall into a time requirement and a survival likelihood. It decides <strong>eight of the thirty questions here.</strong> That ratio is reported as a finding, not conceded as a limitation.</p>
              <p>It needs two things: a requirement expressible as an expansion factor, and a constraint with an observable rate. Both exist for <strong>forward capacity questions</strong> and for neither structural questions (does control concentrate, who bears liability) nor current-state ones (are agents reliable today). So this is not a machine for answering everything. <strong>It is a test for which questions have physically determinate answers at all.</strong> Eight here do. Twenty-two do not, and confident disagreement about those is evidence about the forecasters rather than about the world.</p>

              <div className="vn-concede">
                <span className="vn-sig">A harder audit, and it cost one of the eight</span>
                <p>Asking whether the engine <em>applies</em> is weaker than asking whether it <em>changes anything</em>. Measured against each verdict's own prior, <strong>the arithmetic moves eight verdicts by less than 0.12 and is not earning its place.</strong> Q8 moves by 0.01. Q14, the data-wall verdict on the tier carrying our recorded miss, moves by 0.07. And <strong>Q25 is among them while remaining in the computed set, and both labels are correct.</strong> Computed describes its inputs, which are sourced. Decorative describes its output, which does not discriminate. Independent properties.</p>
                <p>For those eight the stated probability is substantially a prior wearing arithmetic, and a number that looks computed while being judgment is worse than judgment stated plainly. They are flagged in the repository with the measured shift recorded, so the claim is checkable.</p>
              </div>

              <h2>What could be measured, and what could not</h2>
              <p>This paper set out to measure the migration with a single ratio: value captured by the complements over value captured by intelligence. <strong>The intelligence side rebuilt cleanly. The complement side could not be built at all</strong>, and reporting that is the more useful result.</p>
              <p><strong>Intelligence commoditizes, and faster than we thought.</strong> Rebuilt from <a href="https://epoch.ai/data-insights/llm-inference-price-trends" target="_blank" rel="noopener noreferrer">Epoch AI's replication repository</a>, cloned and re-run rather than quoted: the cheapest model matching GPT-3-class capability fell from $60.00 to $0.07, <strong>a fall of 857-fold at 11.8x per year, R² = 0.96</strong>. Frontier price fell far less, at 1.34x to 2.25x per year depending on whether reasoning models are allowed to set the frontier. <strong>Fixed-capability price falls 4 to 56 times faster than frontier price.</strong> That divergence is the commoditization claim, and it needs no index of complements to state.</p>

              <Fig src="figs/vn_rates_of_decline.png" alt="Frontier and fixed-capability price series and their rates of decline" width={1341} height={823}
                caption="<b>What the corrected series show.</b> Frontier price falls at 1.34 to 2.25x per year; fixed-capability price falls at 11.8 to 75.3x. The divergence is the commoditization claim, and unlike the withdrawn ratio it needs no index of complements. <span class='vn-src'>Epoch AI replication repository, re-run</span>" />

              <div className="vn-concede">
                <span className="vn-sig">Withdrawn</span>
                <p>An earlier version of this paper claimed frontier price was essentially flat at 1.05x per year, and quoted a <strong>Residual Ratio of 990-fold</strong>. Both are wrong. The frontier figure was off by up to 114 percent. The ratio had no numerator: <strong>none of its four complement components is constructible from disclosed sources.</strong> No vendor reports HBM average selling price, no published definition of a data-centre megawatt price exists, TSMC does not break out packaging, and NVIDIA discloses revenue but not units.</p>
                <p>Three independent attempts failed for three unrelated reasons, which locates the fault in the construct rather than the instrument. <strong>Value capture means rent, rent means price minus cost, and cost is undisclosed at every layer of this stack.</strong></p>
                <p><strong>Complement value capture is not measurable from public sources.</strong> That is a via negativa finding about the field's own evidence base, arrived at by the method this paper uses on everything else, and it is a more useful contribution than a fourth reconstructed index would have been.</p>
              </div>

              <h2>The supply-response test</h2>
              <p style={{ fontSize: "16.5px", color: "var(--vn-muted)", marginBottom: "18px" }}>Every dated claim on this page is tracked in, sixteen entries with six resolved, this paper's own listed first and scored on the same basis as everyone else's. Every citation checked against source is recorded in <a href="#c-corrections" data-go="p5">the verification log</a>, including the sixteen corrections that checking produced.</p>
              <p>If capture cannot be measured, the question can be asked another way, and the answer tests the framework's own structure rather than a correlate of it.</p>
              <p className="vn-lede"><strong>A binding constraint attracts no supply response. A cycle does.</strong></p>
              <p><strong>Memory is responding.</strong> Micron has committed roughly $250bn through 2035 and SK hynix is expanding. High margins are pulling in capital, which is what a cycle looks like, and memory has run this pattern since the 1980s. On this framework's terms that is Tier 5 behaviour: capital converts into capacity.</p>
              <p><strong>Power is not.</strong> The 2028/29 <a href="https://www.pjm.com/markets-and-operations/rpm" target="_blank" rel="noopener noreferrer">PJM capacity auction</a> procured <strong>525 MW</strong> of new resources, fell <strong>6.8 GW short</strong> of the reserve margin target, and cleared with the margin down to 14.7 percent. Four consecutive years of extraordinary prices have induced almost nothing. That is Tier 3 behaviour: capital does not convert inside the horizon.</p>
              <p>Same test, opposite answers, both from disclosed sources. <strong>This is the first empirical validation of the tier ordering itself.</strong> It carries a falsification condition, tracked as signpost S20: if a subsequent auction clears with substantial new entry at or below the cap, the Tier 3 classification of delivered power is wrong.</p>

              <div className="vn-concede">
                <span className="vn-sig">Published because it cuts against us</span>
                <p>NVIDIA's gross margin fell to <strong>71.07 percent in FY2026</strong> from 75.0 percent, consistent with rising memory input costs compressing the designer's margin. That is the opposite of what a simple complement-capture story predicts for the accelerator layer.</p>
                <p>The intelligence price series and the chip component-cost work both originate with Epoch AI. That is real single-source concentration in the evidence base, and any methodology revision they publish is a revision to this paper.</p>
              </div>

              <h2>The Capture Ratio</h2>
              <p>A second measure asks how much value is captured at all. Against measured US consumer surplus of roughly $172B annually, producers capture about 0.31 of the value created.<sup><a href="#f0-1" id="r0-1">1</a></sup> <strong>Roughly seventy percent of measured AI value is captured by nobody</strong>, accruing to users as surplus on goods priced at zero.</p>
              <p><strong>One sourcing note that must travel with this number.</strong> Attributable AI revenue, the numerator, rests on three points covering NVIDIA data-centre revenue alone, one of them unverified, with lab run-rates reported rather than filed. The level is indicative; the second decimal is not real.</p>

              <Fig src="figs/vn_capture.png" alt="Value created against value captured, 2025 and 2026" width={1195} height={711}
                caption="<b>Value created against value captured.</b> Roughly seventy percent of measured AI value accrues to users as surplus on goods priced at or near zero. The hypothesis that capture is collapsing is wrong and withdrawn: K rose from 0.27 to 0.31. The level survives; the trend does not. <span class='vn-src'>Brynjolfsson et al. 2026, via the Stanford AI Index 2026</span>" />

              <div className="vn-concede">
                <span className="vn-sig">Withdrawn</span>
                <p>The hypothesis behind the second unit was that capture is <em>collapsing</em>, competed away faster than any layer can hold it. That is wrong: the ratio rose from 0.27 to 0.31 between 2025 and 2026. The trend claim is withdrawn. Only the level survives.</p>
              </div>

              <h2>The evidence, linked</h2>
              <p style={{ fontSize: "16.5px", color: "var(--vn-muted)", marginBottom: "20px" }}>Every load-bearing figure in this paper resolves to a source you can open. Where the evidence is a filing, a price list, a live tracker or something an executive said on a podcast, that is what is linked, rather than a secondary write-up of it.</p>
              <div className="vn-tbl"><table>
                <thead><tr><th>Claim</th><th>Evidence</th></tr></thead>
                <tbody>
                  <tr><td>Interconnection median above 5 years</td><td><a href="https://emp.lbl.gov/queues" target="_blank" rel="noopener noreferrer">LBNL, <em>Queued Up</em> 2026</a></td></tr>
                  <tr><td>80% horizon flat at 27 to 32 min</td><td><a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer">METR, live time-horizon page</a></td></tr>
                  <tr><td>29.6 GW AI data-center capacity, Q4 2025</td><td><a href="https://epoch.ai/data/ai-supercomputers" target="_blank" rel="noopener noreferrer">Epoch AI database</a></td></tr>
                  <tr><td>~300T token public-text stock</td><td><a href="https://arxiv.org/abs/2211.04325" target="_blank" rel="noopener noreferrer">Villalobos et al., arXiv:2211.04325</a></td></tr>
                  <tr><td>Practical CMOS efficiency ceiling</td><td><a href="https://arxiv.org/abs/2312.08595" target="_blank" rel="noopener noreferrer">Ho, Erdil, Besiroglu, arXiv:2312.08595</a></td></tr>
                  <tr><td>Power is the constraint, not compute</td><td><a href="https://www.youtube.com/watch?v=9NtsnzRFJ_o" target="_blank" rel="noopener noreferrer">Nadella, Bg2 Pod, late 2025</a></td></tr>
                  <tr><td>Adoption 88%, agents in single digits</td><td><a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">Stanford AI Index 2026</a></td></tr>
                  <tr><td>Model economics look like commodities</td><td><a href="https://www.bondcap.com/report/pdf/Trends_Artificial_Intelligence.pdf" target="_blank" rel="noopener noreferrer">BOND, <em>Trends: AI</em></a></td></tr>
                  <tr><td>EU AI Act text and deferral</td><td><a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener noreferrer">Regulation (EU) 2024/1689</a></td></tr>
                  <tr><td>US preemption litigation directive</td><td><a href="https://www.federalregister.gov/" target="_blank" rel="noopener noreferrer">Executive Order 14365</a></td></tr>
                  <tr><td>+78M net jobs, 22% churn</td><td><a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer">WEF <em>Future of Jobs</em> 2025</a></td></tr>
                  <tr><td>5% of pilots P&amp;L-positive</td><td><a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" target="_blank" rel="noopener noreferrer">MIT NANDA, <em>GenAI Divide</em></a></td></tr>
                </tbody>
                <caption><b>Verification should cost one click.</b> A paper that asks you to accept a lead time or a price without showing you where it came from is asking for trust it has not earned.</caption>
              </table></div>

              <div className="vn-fn">
                <ol>
                  <li id="f0-1">Consumer surplus from Brynjolfsson et al. (2026), longitudinal willingness-to-accept estimates, reported in the <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">Stanford AI Index 2026</a>: $112B rising to $172B annually, median value per user tripling from $3.40 to $11.40. Captured value is attributable AI revenue. Because the surplus figure covers US consumers only and excludes enterprise surplus entirely, the true capture ratio is lower than stated. <a href="#r0-1">↩</a></li>
                </ol>
              </div>

              <div className="vn-next"><span className="vn-lbl">Next</span>
                <a href="#p1" data-go="p1"><em>I. The Method</em></a></div>
            </section>

            {/* ===== I. THE METHOD ===== */}
            <section className="vn-piece" id="p1">
              <span className="vn-eyebrow">Piece I</span>
              <h1>The Method</h1>
              <p className="vn-summary">Constraints do not eliminate candidates. They reprice them, and only physical law bars outright. The framework is stratified: a deductive floor at Tier 0, an inductive middle across Tiers 1 to 5, and an abductive top across whatever survives. That is why every verdict carries a probability instead of a proof.</p>

              <div className="vn-mini"><span className="vn-lbl">In this piece</span>
                <ul>
                  <li><a href="#m-maxim">What the maxim licenses</a></li>
                  <li><a href="#m-derive">Deriving the six</a></li>
                  <li><a href="#m-engine">The engine</a></li>
                  <li><a href="#m-time">Where time enters</a></li>
                  <li><a href="#m-do">Find the binding constraint</a></li>
                </ul>
              </div>

              <h2 id="m-maxim">What the maxim licenses</h2>
              <blockquote style={{ margin: "0 0 22px", paddingLeft: "20px", borderLeft: "1px solid var(--vn-rule)", fontStyle: "italic", color: "#3B4048" }}>
                <a href="https://www.gutenberg.org/files/1661/1661-h/1661-h.htm" target="_blank" rel="noopener noreferrer">When you have eliminated the impossible</a>, whatever remains, however improbable, must be the truth.
              </blockquote>
              <p>The maxim is deductive, and it is valid only where the candidate set is exhaustive and each elimination is a genuine impossibility. Neither condition holds for most questions about the AI economy. Candidate sets over markets are not provably exhaustive, and almost nothing in economics is impossible.</p>
              <p>A framework claiming uniform deductive force will fail the way every constraint-based forecast has failed, by treating an improbability as an impossibility. <a href="https://www.econlib.org/library/Malthus/malPop.html" target="_blank" rel="noopener noreferrer">Malthus did it</a>. The Ehrlich side of the <a href="https://yalebooks.yale.edu/book/9780300212648/the-bet/" target="_blank" rel="noopener noreferrer">Simon-Ehrlich wager</a> did it. So this framework is stratified by inferential type.</p>

              <div className="vn-tbl"><table>
                <thead><tr><th>Layer</th><th>Operation</th><th>Applies at</th><th>Verdict</th></tr></thead>
                <tbody>
                  <tr><td>Deductive floor</td><td>Elimination of the impossible</td><td>Tier 0 only</td><td className="vn-bind">Barred</td></tr>
                  <tr><td>Inductive middle</td><td>Repricing against <a href="https://epoch.ai/data/machine-learning-hardware" target="_blank" rel="noopener noreferrer">observed rates</a></td><td>Tiers 1 to 5</td><td>Repriced</td></tr>
                  <tr><td>Abductive top</td><td>Inference to the best remainder</td><td>Across survivors</td><td>Isolated</td></tr>
                </tbody>
              </table></div>

              <p>The probabilities were always the tell. A framework that declares candidates eliminated and then attaches survivor probabilities of 0.55 to 0.78 is describing itself wrongly: a survivor at 0.60 leaves forty percent of the mass with candidates it called eliminated. That is incoherent under a deductive reading and coherent under a stratified one.</p>

              <Fig src="figs/vn_layers.png" alt="Three inferential layers: deductive floor, inductive middle, abductive top" width={1200} height={506}
                caption="<b>Only the floor licenses deduction.</b> Constraints do not eliminate candidates; they reprice them. A survivor at 0.60 leaves forty percent of the mass with candidates the framework called eliminated." />

              <h2 id="m-derive">Deriving the six</h2>
              <p>The constraint set is open to a circularity charge if it is chosen with the conclusion in view. So it is derived from a question that never mentions AI: <strong>what does it take to obtain one more unit of a limiting input?</strong></p>

              <div className="vn-tbl"><table>
                <thead><tr><th>Source of one more unit</th><th>Constraint</th><th>Accessible in</th></tr></thead>
                <tbody>
                  <tr><td>Nothing. Physical law forbids it</td><td className="vn-bind">Thermodynamics</td><td>never</td></tr>
                  <tr><td>Generational time: humans raised, trained, organized</td><td>Talent and Absorption</td><td>10 to 40 years</td></tr>
                  <tr><td>Nothing, but a finite accumulated stock is drawn down</td><td>Data</td><td>not replenished</td></tr>
                  <tr><td>Industrial production, given capital and lead time</td><td>Matter</td><td>2 to 7 years</td></tr>
                  <tr><td>A collective decision by people with authority</td><td>Law and Legitimacy</td><td>3 to 24 months</td></tr>
                  <tr><td>A price</td><td>Capital</td><td>days to weeks</td></tr>
                </tbody>
                <caption><b>The partition is over replenishment mechanisms, not subject matter, and it is complete.</b> An input is either forbidden, biological, fossil, manufactured, permitted, or purchased. The tier ordering falls out of the derivation rather than being asserted beside it.</caption>
              </table></div>

              <p>Three placements follow from the derivation rather than from preference. <strong>Data is a fossil resource</strong>, an accumulated stock with no meaningful replenishment, which places it above Matter despite being informational. <strong>Absorption is Tier 1 because it is biological</strong>: the capacity of firms to reorganize work turns over with people and management generations. And <strong>energy is not a primitive</strong>; it is an output of Matter and Law, floored by Thermodynamics.</p>
              <p>That last one matters. Treating energy as one constraint conflated a physical invariant with <a href="https://arxiv.org/abs/2312.08595" target="_blank" rel="noopener noreferrer">two orders of magnitude of headroom</a>, an industrial stock with none, and a permitting regime that moves in months. On this horizon delivered electricity binds through <a href="https://emp.lbl.gov/queues" target="_blank" rel="noopener noreferrer">transformer lead times and interconnection queues</a>, never through physics.</p>

              <h2 id="m-engine">The engine</h2>
              <p>Every test reduces to one comparison: time required against time available. For candidate <em>a</em> and constraint <em>c</em>, the slack ratio is the quantity permitted over the quantity required, <span className="vn-mono">σ = Permitted / Required</span>, and the shortfall is <span className="vn-mono">g = 1/σ</span>. The time the constraint needs to deliver that expansion at its observed rate <span className="vn-mono">r</span> is</p>
              <p style={{ textAlign: "center", fontFamily: '"IBM Plex Mono", monospace', fontSize: "16px", margin: "26px 0" }}>
                T<sub>req</sub> &nbsp;=&nbsp; ln(g) / ln(1 + r)
              </p>
              <p>and survival is a logistic in the difference between time available and time required, with <span className="vn-mono">S = 0</span> whenever the constraint is Tier 0. That zero is the deductive floor, and it is the only place a zero appears.<sup><a href="#f1-1" id="r1-1">1</a></sup></p>

              <Fig src="figs/vn_engine.png" alt="Required time as a function of shortfall, and the survival logistic" width={1237} height={860}
                caption="<b>The engine.</b> Left: how long a constraint needs to close a shortfall at its observed expansion rate, against the horizon remaining. Right: survival as a logistic in the difference. The only zero in the system sits at Tier 0." />

              <p>The parameters are observable rather than chosen, which is the substantive improvement over a penalty-coefficient approach. Matter is decomposed by sub-constraint because its expansion rates differ by an order of magnitude: <a href="https://www.trendforce.com/" target="_blank" rel="noopener noreferrer">advanced packaging has expanded at 60 to 110 percent annually</a> while <a href="https://www.datacenterknowledge.com/build-design/ai-data-center-boom-rewires-us-power-supply-chain" target="_blank" rel="noopener noreferrer">grid equipment has expanded at 10 to 20</a>. <strong>That ratio alone explains why the binding constraint migrated from packaging in 2024 to grid equipment in 2025 and 2026</strong>, with no additional assumption required.</p>

              <Fig src="figs/vn_rates.png" alt="Observed annual expansion rates by constraint and tier" width={1787} height={721}
                caption="<b>Why the binding constraint migrates.</b> Sub-constraint expansion rates differ by an order of magnitude, so advanced packaging absorbs shortfalls that grid equipment cannot. The ratio between those two rates is the entire content of the migration argument." />

              <div className="vn-concede">
                <span className="vn-sig">Where this does not apply</span>
                <p>The engine needs a candidate whose requirement expresses as an expansion factor and a constraint with an observable rate. Both exist for forward capacity questions. Neither exists for structural questions (does control concentrate, who bears liability) nor current-state ones (are cash flows sufficient today). <strong>Eight of thirty verdicts are computed. The rest are disciplined judgment, and each one says which it is.</strong></p>
                <Fig src="figs/vn_scope.png" alt="Eight of thirty verdicts computed, fourteen structural, eight current-state" width={1137} height={599}
                  caption="<b>Where the engine applies.</b> It needs an expansion factor and an observable rate. Both exist for forward capacity questions and for neither of the other classes." />
              </div>

              <h2 id="m-time">Where time enters</h2>
              <p>Time is not a constraint. It has no independent permitted quantity, and one cannot compute time permitted over time required without first naming the process being timed. But three genuine time-dimension mechanisms exist, and none is captured by a single slack ratio.</p>
              <p><strong>Allocation is not stock.</strong> Every constraint has two clocks that differ by one to two orders of magnitude. A firm reserving more than half of a foundry's packaging expansion shortens no lag; it establishes queue position. An allocation mechanism never relaxes a constraint at the system level, only at the actor level, so system questions and firm questions are tested against different denominators.</p>
              <p><strong>Synchronization.</strong> Electricity is not storable, so a site needs power at the coincident peak rather than on average. The relaxation direction is the interesting one: a candidate that accepts interruption converts a synchronization requirement into an energy requirement, and <a href="https://www.energy.gov/gdo/grid-deployment-office" target="_blank" rel="noopener noreferrer">curtailable interconnection clears in months</a> where firm service clears in years. Flexible load is the single largest available relaxation lever on the buildout.</p>
              <p><strong>Serial path.</strong> A candidate can fail with every individual slack ratio above one, because the chain of conversions it requires is longer than the horizon. A greenfield site with <a href="https://emp.lbl.gov/queues" target="_blank" rel="noopener noreferrer">no interconnection agreement needs six to seven years</a> of serialized conversions against 4.4 remaining to 2030. That is a timing verdict, not a possibility verdict, and it must say so. Conflating the two is how constraint forecasting earns its reputation for crying impossible when it meant late.</p>

              <Fig src="figs/vn_lags.png" alt="Conversion lags from capital to each constraint against the horizon" width={1519} height={820}
                caption="<b>Money becomes megawatts, but only after the lag.</b> Everything to the right of the line cannot be bought into existence before 2030 at any price." />

              <h2 id="m-params">The parameters, in full</h2>
              <p>These are the numbers every verdict runs on. <strong>Change one and the verdicts change</strong>, which is the sense in which this forecast is auditable rather than merely sourced.</p>
              <div className="vn-tbl"><table>
                <thead><tr><th>Tier</th><th>Constraint</th><th className="vn-n">r<sub>c</sub></th><th>Governing datum, mid-2026</th></tr></thead>
                <tbody>
                  <tr><td className="vn-bind">0</td><td className="vn-bind">Thermodynamics</td><td className="vn-n vn-bind">0 exactly</td><td>Landauer bound ~3e-21 J/bit at 300K. Max CMOS ~4.7e15 FP4/J, roughly 200x current accelerators</td></tr>
                  <tr><td>1</td><td>Talent</td><td className="vn-n">0.05 to 0.10</td><td>Inbound AI researchers to the US <b>down 89% since 2017, 80% in the last year alone</b></td></tr>
                  <tr><td>1</td><td>Absorption</td><td className="vn-n">0.02 to 0.05</td><td>Electric motors under 5% of factory drive in 1900, gains in the 1920s. ~5% of AI pilots P&amp;L-positive</td></tr>
                  <tr><td>2</td><td>Data</td><td className="vn-n">0.30 to 0.60</td><td>~300T tokens effective public text, median exhaustion 2028. <b>Revised upward by an order of magnitude after the backtest miss</b></td></tr>
                  <tr><td>3a</td><td>Matter: packaging</td><td className="vn-n">0.60 to 1.10</td><td>CoWoS from ~13k wafers/month end-2023 toward a 120 to 130k target end-2026</td></tr>
                  <tr><td>3b</td><td>Matter: logic fabs</td><td className="vn-n">0.15 to 0.25</td><td>TSMC Arizona announced 2020, high-volume production late 2024 to 2025</td></tr>
                  <tr className="vn-survives"><td>3c</td><td><b>Matter: grid equipment</b></td><td className="vn-n">0.10 to 0.20</td><td><b>Transformers 128 weeks in 2025, past 160 by 2026.</b> ~80% imported. Switchgear sold out through 2028</td></tr>
                  <tr><td>3d</td><td>Matter: interconnection</td><td className="vn-n">0.15 to 0.25</td><td>LBNL median request to operation above 5 years for 2025 projects; ~2,061 GW in queues</td></tr>
                  <tr><td>4</td><td>Law and Legitimacy</td><td className="vn-n">step</td><td>EU high-risk duties deferred 16 months by the Digital Omnibus, Council approval 29 June 2026</td></tr>
                  <tr><td>5</td><td>Capital</td><td className="vn-n">0.36</td><td>2026 hyperscaler guidance ~$690B to $725B. The $1.5T is a <b>funding gap, not a debt requirement</b></td></tr>
                </tbody>
                <caption><b>The slowest rate on a candidate's path is the one that decides it.</b> Grid equipment expands at roughly a tenth the rate of advanced packaging, which is the whole content of the migration argument and requires no further assumption.</caption>
              </table></div>

              <h2 id="m-do">Find the binding constraint</h2>
              <p>The operational instruction is not "check all six." It is three steps, and it is portable to any claim you encounter.</p>
              <p><strong>Screen.</strong> Order-of-magnitude every constraint. Most resolve in one line. <strong>Compute.</strong> Take the two or three lowest and do them properly, with sourced numerators and denominators, as intervals rather than points. <strong>Attribute.</strong> Name the binding constraint, state its tier, state the gap, and state the discontinuity that would move it.</p>
              <p>A verdict that does not name a single binding constraint has not been resolved. The reason this matters beyond bookkeeping is <a href="https://web.mit.edu/15.053/www/AMP-Chapter-04.pdf" target="_blank" rel="noopener noreferrer">a result from linear programming</a>: a non-binding constraint has a shadow price of zero. <strong>An argument about a non-binding constraint cannot change the answer.</strong> Most public forecasting of the AI economy argues about capital, which on this horizon almost never binds.</p>

              <div className="vn-fn"><ol>
                <li id="f1-1">Full form, parameters, conversion lags and the treatment of uncomputable cells are in the <a href={PDF_URL} target="_blank" rel="noopener noreferrer">PDF</a>, Section 1. An uncomputable cell does not receive a free pass: it takes a base-rate-bounded interval, and the verdict reports the posterior at both ends. Simulation showed the earlier free-pass treatment was carrying two thirds of an unmeasurable candidate's posterior mass. <a href="#r1-1">↩</a></li>
              </ol></div>

              <div className="vn-next"><span className="vn-lbl">Next</span>
                <a href="#p2" data-go="p2"><em>II. The Elasticity Gap</em></a></div>
            </section>

            {/* ===== II. THE ELASTICITY GAP ===== */}
            <section className="vn-piece" id="p2">
              <span className="vn-eyebrow">Piece II</span>
              <h1>The Elasticity Gap
                <span className="vn-sub">The parameter the whole field is betting on</span>
              </h1>
              <p className="vn-summary">Every forecast of AI's contribution to output is a bet on the elasticity between deployed compute and attributable output. Nobody names it, nobody has measured it, and its observed values ran 1.70, then 1.17, then 1.37 across 2023 to 2026. At the low end of that range this paper's own GDP band is eliminated and the sole survivor is the field's most conservative estimate. At the high end even the most bullish survives.</p>

              <div className="vn-mini"><span className="vn-lbl">In this piece</span>
                <ul>
                  <li><a href="#e-param">The parameter nobody names</a></li>
                  <li><a href="#e-table">Every forecast, run through the engine</a></li>
                  <li><a href="#e-says">What the table says</a></li>
                  <li><a href="#e-cost">What it costs this paper</a></li>
                  <li><a href="#e-fix">What would settle it</a></li>
                </ul>
              </div>

              <h2 id="e-param">The parameter nobody names</h2>
              <p>Every forecast of AI's contribution to output implicitly assumes a relationship between deployed compute and attributable output. Write it down:</p>
              <p style={{ textAlign: "center", fontFamily: '"IBM Plex Mono", monospace', fontSize: "17px", margin: "26px 0" }}>
                O &nbsp;=&nbsp; k · C<sup>α</sup>
              </p>
              <p>where <span className="vn-mono">O</span> is AI-attributable output, <span className="vn-mono">C</span> is deployed compute, and <span className="vn-mono">α</span> is the elasticity of the first with respect to the second. At <span className="vn-mono">α = 1</span> output scales proportionally with compute. Below one, each additional gigawatt yields less than the last. Above one, deployed compute yields increasing returns, as it would if a model trained once serves many users or if value accrues through channels consuming little marginal inference.</p>
              <p><strong>No published forecast of the AI economy states its α.</strong> None reports it, none defends it, and it has never been measured. Yet every such forecast is a bet on its value, because the forecast asserts an output figure, the constraints permit a quantity of compute, and only α connects them.</p>

              <Fig src="figs/vn_elasticity.png" alt="Published forecasts against the Tier 3 constraint as a function of alpha" width={1545} height={890}
                caption="<b>Every published forecast, run through the constraint engine.</b> At α = 1.0 this paper's own band is eliminated and only Acemoglu survives; at α = 1.4 both survive. The shaded band is the range actually observed. <span class='vn-src'>Drag the slider below, or reproduce from the repository</span>" />

              <div className="vn-explore">
                <span className="vn-sig">Drag it yourself</span>
                <p style={{ fontSize: "16px", marginBottom: "4px" }}>Every forecast below is a bet on this one number. Nobody has measured it. Move the slider and watch which survive.</p>
                <div className="vn-slider-row">
                  <input type="range" id="aSlider" min="0.55" max="1.85" step="0.01" defaultValue="1.37" aria-label="elasticity alpha" />
                  <span className="vn-aval" id="aVal">α = 1.37<small>observed, 2025 to 2026</small></span>
                </div>
                <div id="fcList"></div>
                <div className="vn-verdictline" id="fcVerdict"></div>
                <div className="vn-obsband">Observed values: 1.70 (2023 to 2024) · 1.17 (2024 to 2025) · 1.37 (2025 to 2026). Anchors: $110B attributable output on 29.6 GW in 2026; 200 GW permitted to 2030; 40% annual efficiency gain.</div>
              </div>

              <h2 id="e-table">Every forecast, run through the engine</h2>
              <p>Anchoring on 2026 at roughly $110B of attributable output on <a href="https://epoch.ai/data/ai-supercomputers" target="_blank" rel="noopener noreferrer">29.6 GW of AI data-center capacity</a>, taking <a href="https://www.bain.com/insights/topics/technology-report/" target="_blank" rel="noopener noreferrer">permitted incremental capacity to 2030 as roughly 200 GW</a>, and applying the standard <a href="https://epoch.ai/data/machine-learning-hardware" target="_blank" rel="noopener noreferrer">efficiency correction of about 40 percent per year</a>, the slack ratio for each published forecast is a function of α alone.<sup><a href="#f2-1" id="r2-1">1</a></sup></p>

              <div className="vn-tbl"><table>
                <thead><tr><th>Forecast</th><th className="vn-n">α=0.5</th><th className="vn-n">0.7</th><th className="vn-n">1.0</th><th className="vn-n">1.2</th><th className="vn-n">1.4</th><th className="vn-n">1.7</th></tr></thead>
                <tbody>
                  <tr><td>PwC 2017, +$15.7T by 2030</td><td className="vn-n vn-gone">0.00</td><td className="vn-n vn-gone">0.02</td><td className="vn-n vn-gone">0.18</td><td className="vn-n vn-gone">0.42</td><td className="vn-n vn-gone">0.75</td><td className="vn-n vn-bind">1.40</td></tr>
                  <tr><td>Goldman 2023, +7% global GDP</td><td className="vn-n vn-gone">0.00</td><td className="vn-n vn-gone">0.04</td><td className="vn-n vn-gone">0.26</td><td className="vn-n vn-gone">0.57</td><td className="vn-n vn-gone">0.98</td><td className="vn-n vn-bind">1.75</td></tr>
                  <tr><td>McKinsey 2023, $4.4T annual</td><td className="vn-n vn-gone">0.02</td><td className="vn-n vn-gone">0.13</td><td className="vn-n vn-gone">0.65</td><td className="vn-n vn-bind">1.20</td><td className="vn-n vn-bind">1.86</td><td className="vn-n vn-bind">2.96</td></tr>
                  <tr><td><strong>This paper, upper $10.5T</strong></td><td className="vn-n vn-gone">0.00</td><td className="vn-n vn-gone">0.04</td><td className="vn-n vn-gone">0.27</td><td className="vn-n vn-gone">0.58</td><td className="vn-n vn-bind">1.00</td><td className="vn-n vn-bind">1.78</td></tr>
                  <tr><td><strong>This paper, lower $7.0T</strong></td><td className="vn-n vn-gone">0.01</td><td className="vn-n vn-gone">0.07</td><td className="vn-n vn-gone">0.41</td><td className="vn-n vn-gone">0.82</td><td className="vn-n vn-bind">1.34</td><td className="vn-n vn-bind">2.26</td></tr>
                  <tr><td>Acemoglu 2024, 0.66% TFP over 10 yr</td><td className="vn-n vn-gone">0.11</td><td className="vn-n vn-gone">0.52</td><td className="vn-n vn-bind">1.69</td><td className="vn-n vn-bind">2.66</td><td className="vn-n vn-bind">3.68</td><td className="vn-n vn-bind">5.20</td></tr>
                </tbody>
                <caption><b>Cells give σ, permitted over required. A forecast survives at σ ≥ 1</b>, shown in teal; struck values are eliminated by the Tier 3 constraint.</caption>
              </table></div>

              <p>The observed values of α, computed from the attributable-output and capacity series, are unstable and sit in the increasing-returns region:</p>
              <div className="vn-tbl"><table>
                <thead><tr><th>Period</th><th className="vn-n">Output</th><th className="vn-n">Capacity</th><th className="vn-n">Implied α</th></tr></thead>
                <tbody>
                  <tr><td>2023 to 2024</td><td className="vn-n">5.00x</td><td className="vn-n">2.57x</td><td className="vn-n vn-bind">1.70</td></tr>
                  <tr><td>2024 to 2025</td><td className="vn-n">2.40x</td><td className="vn-n">2.11x</td><td className="vn-n vn-bind">1.17</td></tr>
                  <tr><td>2025 to 2026</td><td className="vn-n">1.83x</td><td className="vn-n">1.56x</td><td className="vn-n vn-bind">1.37</td></tr>
                </tbody>
              </table></div>

              <h2 id="e-says">What the table says</h2>
              <p><strong>At α = 1.0, this paper's own GDP band is eliminated.</strong> Both bounds fail, at σ = 0.27 and σ = 0.41, alongside Goldman and PwC. The single survivor is <a href="https://www.nber.org/papers/w32487" target="_blank" rel="noopener noreferrer">Acemoglu, the most conservative published estimate</a> in the field.</p>
              <p><strong>At α = 1.4, the midpoint of the observed range, this paper survives and so does Goldman.</strong> At α = 1.7, the value observed across 2023 to 2024, even PwC survives.</p>
              <p>So the central quantitative dispute in this field is a disagreement about α that no participant has named. <a href="https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf" target="_blank" rel="noopener noreferrer">PwC's $15.7T is a bet that α ≥ 1.7</a>. <a href="https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent" target="_blank" rel="noopener noreferrer">Goldman's 7 percent is a bet on roughly 1.4</a>. <a href="https://www.nber.org/papers/w32487" target="_blank" rel="noopener noreferrer">Acemoglu's 0.66 percent is a bet that α ≤ 1.0</a>. The verdicts in this paper are a bet on roughly 1.3 to 1.4. <strong>None of them has stated the wager it is making.</strong></p>

              <Fig src="figs/vn_alpha_observed.png" alt="Implied elasticity 2023 to 2026: 1.70, 1.17, 1.37" width={1262} height={655}
                caption="<b>The elasticity is not a stable parameter.</b> It ran 1.70, then 1.17, then 1.37. That range is wide enough to reverse every forecast in the table above, and no participant in the debate reports it." />

              <p>The observed range spans values that reverse every forecast in the table. That is not a narrow uncertainty around a central estimate. It is the difference between a technology that adds one percent of output and one that adds ten.</p>

              <h2 id="e-cost">What it costs this paper</h2>
              <div className="vn-concede">
                <span className="vn-sig">Conceded</span>
                <p>The GDP verdict cannot be resolved at the confidence a single-point analysis suggests. Its probability falls from 0.62 to roughly 0.55 and is marked α-dependent and provisional. Under α = 1.0 it is not resolved at all.</p>
                <p>The temptation is to select the α that preserves the band and proceed. That would be the characteristic failure this framework was built to avoid, committed on the framework's own numbers: holding a parameter fixed at a convenient value while the evidence says it is unstable.</p>
              </div>
              <p>The exposure is concentrated rather than general. Verdicts about output magnitude are bets on α. Verdicts about physical delivery, lead times, market structure, liability and reliability are not, because they never require the compute-to-output conversion. Each is marked where it applies.</p>

              <h2 id="e-fix">What would settle it</h2>
              <p>A panel of AI-attributable output against deployed compute at firm or sector level, with output measured as realized revenue plus estimated surplus rather than as capital expenditure. That series does not exist. Building it is the <a href="https://www.bea.gov/" target="_blank" rel="noopener noreferrer">single most valuable unbuilt dataset</a> in the economics of AI, and it would settle a dispute currently conducted entirely through unstated assumptions.</p>

              <div className="vn-call">
                <span className="vn-sig">The point of this piece</span>
                <p>This paper does not add the forty-seventh forecast. It eliminates the claim that the question is currently answerable, and names what would answer it. That the result costs the author a headline number is the strongest available evidence that the method is doing work rather than decorating a conclusion.</p>
              </div>

              <div className="vn-fn"><ol>
                <li id="f2-1">Anchors: attributable revenue and capacity series in the <a href={PDF_URL} target="_blank" rel="noopener noreferrer">PDF</a>, Section 2; 29.6 GW of AI data-center power capacity at Q4 2025 from Epoch AI via the <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">Stanford AI Index 2026</a>; permitted incremental capacity to 2030 from <a href="https://www.bain.com/insights/topics/technology-report/" target="_blank" rel="noopener noreferrer">Bain's 6th Global Technology Report</a>; efficiency gains from <a href="https://epoch.ai/" target="_blank" rel="noopener noreferrer">Epoch AI</a>. <a href="#r2-1">↩</a></li>
              </ol></div>

              <div className="vn-next"><span className="vn-lbl">Next</span>
                <a href="#p3" data-go="p3"><em>III. The Roots and the Economy</em></a></div>
            </section>

            {/* ===== III. ROOTS AND ECONOMY ===== */}
            <section className="vn-piece" id="p3">
              <span className="vn-eyebrow">Piece III</span>
              <h1>The Roots and the Economy</h1>
              <p className="vn-summary">The majority-of-GDP claim is dead: it needs $77T of new output by 2030 and the most bullish credible estimate permits $16T. What survives is 1.0 to 1.5 points of annual growth. Realized gains today are 0.1 to 0.2 points against a 1.5 point electricity precedent. Absorption binds, and it relaxes on a twenty to forty year clock.</p>

              <div className="vn-mini"><span className="vn-lbl">In this piece</span>
                <ul>
                  <li><a href="#r-five">The five roots</a></li>
                  <li><a href="#r-gdp">How much GDP</a></li>
                  <li><a href="#r-slow">Why it arrives slowly</a></li>
                  <li><a href="#r-contra">The strongest contrary datum</a></li>
                  <li><a href="#r-rest">The rest of the domain</a></li>
                </ul>
              </div>

              <h2 id="r-five">The five roots</h2>
              <p>Beneath the hundred questions lie five root uncertainties. Every branch question inherits its verdict from one or more of them.</p>

              <div className="vn-verdict"><p className="vn-q">R1. Will AI create more value than it destroys?</p>
                <p className="vn-a">Aggregate value destruction is eliminated at the sign level: every prior general-purpose technology delivered a positive contribution once diffused. What survives is a J-curve. Destruction front-loads, creation lags, and the capital gap dates the lag rather than the destination: <a href="https://www.sec.gov/edgar/search/" target="_blank" rel="noopener noreferrer">$725B of 2026 capex against $110B</a> of attributable revenue.</p>
                <p className="vn-meta">binding: <b>Absorption, Tier 1</b> · P ≈ 0.73 · tails: distributional rejection 0.15, financing cascade 0.07</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">R2. How fast do organizations become AI-native?</p>
                <p className="vn-a">Overnight transformation requires broad P&amp;L-positive deployment now. <a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" target="_blank" rel="noopener noreferrer">Five percent of integrated pilots are P&amp;L-positive</a>. That is a twentyfold gap on the success base, and no mechanism closes it in three years. A decade-long uneven grind survives. This is also where Absorption was discovered: the bottleneck is organizational, and a constraint set without it would find that and have nowhere to put it.</p>
                <p className="vn-meta">binding: <b>Absorption, Tier 1</b> · P ≈ 0.70</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">R3. Who controls compute, energy, data and models?</p>
                <p className="vn-a">Monopoly is barred on structure: no actor owns accelerators, foundry, cloud and models. Decentralization is barred on delivered power. What survives is a US-led layered oligopoly beside a walled Chinese stack. Concentration is real and split across layers, and <strong>nobody owns the floor</strong>, which is <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">one foundry in Taiwan</a> and the public grid.</p>
                <p className="vn-meta">binding: <b>Matter, Tier 3</b> · P ≈ 0.75</p>
              </div>

              <Fig src="figs/vn_concentration.png" alt="Market shares by layer: packaging, accelerators, foundry, cloud" width={1458} height={664}
                caption="<b>Concentration is real and split across layers.</b> Each layer is concentrated and owned by a different firm, which bars the monopoly candidate on structure. Nobody owns the floor." />

              <div className="vn-verdict"><p className="vn-q">R4. Can institutions adapt without stifling innovation?</p>
                <p className="vn-a">Fragmented, lagging, sectoral governance. The operative risk is divergence and arbitrage rather than stringency.</p>
                <p className="vn-meta">binding: <b>Law and Legitimacy, Tier 4</b> · P ≈ 0.78</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">R5. What are the real limits of intelligence?</p>
                <p className="vn-a">Scale-to-AGI-soon is eliminated, but not for the reason the field gives. The pre-training data wall is no longer load-bearing here. Another hundredfold of training compute requires fab and grid expansion that Tier 3 cannot deliver by 2030. Capability keeps rising through <a href="https://arxiv.org/abs/2408.03314" target="_blank" rel="noopener noreferrer">test-time and post-training compute</a>. The lever moved; it did not break.</p>
                <p className="vn-meta">binding: <b>Matter, Tier 3</b> · P ≈ 0.65 · jagged plateau as near-term texture, 0.30</p>
              </div>

              <div className="vn-concede" style={{ marginTop: "34px" }}>
                <span className="vn-sig">A demonstration of Tier 4</span>
                <p>The <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener noreferrer">EU AI Act's high-risk obligations</a>, treated as fixed at 2 August 2026 for over a year, were deferred to 2 December 2027 and 2 August 2028 by the <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener noreferrer">Digital Omnibus</a>, with <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener noreferrer">final Council approval on 29 June 2026</a>. <strong>A flagship compliance deadline moved sixteen months in seven months of legislative process.</strong> No Tier 3 constraint can move like that and no Tier 0 constraint can move at all.</p>
              </div>

              <h2 id="r-gdp">How much GDP</h2>
              <p>The majority-of-GDP claim requires AI-attributable output above half of a $154T 2030 economy. That is $77T of new output in four years. The most bullish credible estimate in the field, <a href="https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf" target="_blank" rel="noopener noreferrer">PwC's $15.7T cumulative</a>, permits $16T. <strong>A ninefold gap, and no constraint in the set closes it in four years.</strong></p>

              <Fig src="figs/vn_gdp.png" alt="Majority-of-GDP claim against the feasible band" width={1270} height={776}
                caption="<b>The majority claim against the feasible band.</b> The survivor sits inside the electricity and information-technology precedents rather than above them." />

              <p>What survives is 1.0 to 1.5 points per year, $7 to $10.5T cumulative by 2030. That is inside the electricity and information-technology precedents, not above them. The bulls are not wrong about the technology. They are wrong about the denominator.</p>
              <p>Two qualifications, both of which narrow the claim. It is <a href="#p2" data-go="p2">α-dependent</a> and provisional. And it forecasts <em>measured</em> GDP: value delivered as consumer surplus on goods priced at zero sits outside that quantity by construction, and <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">US consumer surplus alone is running at roughly $172B</a> annually and growing 54 percent. A reader concluding that AI creates little value from a modest GDP verdict has misread it. The verdict is about capture and measurement, not welfare.</p>

              <h2 id="r-slow">Why it arrives slowly</h2>
              <p>An instant productivity surge is not a live option. It requires 69.9 years of absorption expansion against 4.4 available. Internet-speed diffusion is not one either: the binding constraint is deployment rather than distribution, and the precedent is two to four decades. <a href="https://www.jstor.org/stable/2006600" target="_blank" rel="noopener noreferrer">Electric motors were under five percent of factory mechanical drive in 1900</a>. The productivity gains landed in the 1920s.</p>
              <p>The distinction that matters, and that headline adoption figures obscure: <strong>consumer uptake and organizational absorption run on different clocks.</strong> Generative AI reached <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">53 percent population adoption in three years</a>, faster than the PC or the internet. Over the same period AI agent deployment stayed in single digits across nearly all business functions. Both facts are from the same report.<sup><a href="#f3-1" id="r3-1">1</a></sup></p>

              <h2 id="r-contra">The strongest contrary datum</h2>
              <div className="vn-call">
                <span className="vn-sig">This could falsify the verdict</span>
                <p>US labor productivity growth reached <strong><a href="https://www.bls.gov/productivity/" target="_blank" rel="noopener noreferrer">2.7 percent in 2025</a></strong>, nearly double the 1.4 percent average of the preceding decade, which Brynjolfsson reads as the early phase of a J-curve. If that is AI-attributable and sustained, the electricity-slow verdict is wrong.</p>
                <p>Three considerations bear on it and none is decisive: aggregate productivity growth is not AI-attributable by default; the J-curve reading is this paper's own thesis, since its early phase is absorption cost preceding measured gain; and one year against a decade average is within the historical variance of the series.</p>
                <p><strong>Falsification threshold, stated in advance: US productivity growth holding above 2.5 percent for three consecutive years with a credible AI attribution falsifies this verdict.</strong> Tracked as signpost S18.</p>
              </div>

              <h2 id="r-rest">The rest of the domain</h2>
              <div className="vn-verdict"><p className="vn-q">Q4. How much new wealth, and to whom?</p>
                <p className="vn-a">Trillions, concentrated, accruing to the complements rather than to intelligence itself. Carry the full Acemoglu-to-McKinsey order-of-magnitude range rather than a point.</p>
                <p className="vn-meta">binding: <b>Capital, Tier 5</b> · P ≈ 0.80</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q5. Which industries gain most?</p>
                <p className="vn-a">Digital, measurable, verification-cheap sectors first. Micro evidence tracks the gradient precisely: <a href="https://www.nber.org/papers/w31161" target="_blank" rel="noopener noreferrer">+14 to 15 percent for support agents</a>, <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566" target="_blank" rel="noopener noreferrer">+26.08 percent (SE 10.3) for developers using Copilot</a>, and <strong><a href="https://arxiv.org/abs/2507.09089" target="_blank" rel="noopener noreferrer">-19 percent for experienced open-source developers</a></strong>, who became slower while believing they had been sped up.</p>
                <p className="vn-meta">binding: <b>Data, Tier 2</b> · P ≈ 0.80</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q6. Which industries become obsolete?</p>
                <p className="vn-a">None this horizon. The routine middle compresses: <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer">commodity outsourcing, generic content, tier-1 support</a>, basic data processing.</p>
                <p className="vn-meta">binding: <b>Law, Tier 4</b>, with Absorption · P ≈ 0.80</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q7. Inequality?</p>
                <p className="vn-a">Rises through the transition absent deliberate redistribution. Cheap intelligence does not democratize the scarce complements.</p>
                <p className="vn-meta">binding: <b>Capital, Tier 5</b>, with Law · P ≈ 0.75</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q8. Jobs?</p>
                <p className="vn-a">Roughly flat-to-positive by count, <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/" target="_blank" rel="noopener noreferrer">+78M net by 2030</a>, with 22 percent churn. The pain is in the transition: the destroyed jobs are not the created ones. <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">Employment for software developers aged 22 to 25</a> has already fallen nearly 20 percent from 2024.</p>
                <p className="vn-meta">binding: <b>Capital, Tier 5</b> · P ≈ 0.70</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q9. How long does the transition take?</p>
                <p className="vn-a">A decade and more, clocked by deployment friction and grid interconnection rather than model capability. Only an agent-reliability inflection resets it.</p>
                <p className="vn-meta">binding: <b>Matter 3d and Absorption</b> · P ≈ 0.72 · computed: 46.5 years required against 2.0 available</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q10. Growth or reallocation?</p>
                <p className="vn-a">Reallocation and margin first, real growth later, with a live <a href="https://www.sequoiacap.com/article/ais-600b-question/" target="_blank" rel="noopener noreferrer">investment-incineration tail</a> if GPU infrastructure pricing competes to marginal cost.</p>
                <p className="vn-meta">binding: <b>Capital, Tier 5</b> · P ≈ 0.65 · incineration tail 0.25</p>
              </div>

              <div className="vn-fn"><ol>
                <li id="f3-1">Adoption and agent deployment both from the <a href="https://hai.stanford.edu/ai-index/2026-ai-index-report" target="_blank" rel="noopener noreferrer">Stanford AI Index 2026</a>, which also supplies the micro-study gradient in Q5 and the entry-level employment figure in Q8. Productivity figures and the Brynjolfsson J-curve reading are from the same source. <a href="#r3-1">↩</a></li>
              </ol></div>

              <div className="vn-next"><span className="vn-lbl">Next</span>
                <a href="#p4" data-go="p4"><em>IV. The Binding Constraints</em></a></div>
            </section>

            {/* ===== IV. BINDING CONSTRAINTS ===== */}
            <section className="vn-piece" id="p4">
              <span className="vn-eyebrow">Piece IV</span>
              <h1>The Binding Constraints
                <span className="vn-sub">Compute, data, models, labor, agents, software, the physical world</span>
              </h1>
              <p className="vn-summary">Fifteen questions, one binding constraint each. Models commoditize and the moat moves to everything around them. The data wall is weaker than the field believes. Grid equipment is stronger. The chokepoint on the buildout is a transformer with a 128-week lead time, not a chip and not a dollar.</p>

              <div className="vn-mini"><span className="vn-lbl">In this piece</span>
                <ul>
                  <li><a href="#b-compute">Compute and its financing</a></li>
                  <li><a href="#b-data">Data</a></li>
                  <li><a href="#b-models">Models and scale</a></li>
                  <li><a href="#b-labor">Labor and value</a></li>
                  <li><a href="#b-agents">Agents</a></li>
                  <li><a href="#b-phys">Software and the physical world</a></li>
                </ul>
              </div>

              <h2 id="b-compute">Compute and its financing</h2>
              <div className="vn-call">
                <span className="vn-sig">The chokepoint, dated</span>
                <p>US large-power transformer lead times average <strong>128 weeks</strong> and reach three to five years for the largest units. <a href="https://www.woodmac.com/" target="_blank" rel="noopener noreferrer">Medium-voltage switchgear is effectively sold out through 2028</a>. <a href="https://www.gevernova.com/investors" target="_blank" rel="noopener noreferrer">The gas-turbine order book reached 100 GW</a> with roughly 10 GW of delivery slots remaining across 2029 and 2030 combined. The <a href="https://emp.lbl.gov/queues" target="_blank" rel="noopener noreferrer">LBNL median from interconnection request to commercial operation exceeded five years</a> for projects built in 2025.</p>
                <p>Of 12 to 16 GW of US data-center capacity announced for 2026, roughly 5 GW is under construction. Closing that gap requires 5.2 years of expansion at the observed rate against 1.4 years available.</p>
              </div>

              <Fig src="figs/vn_grid.png" alt="Announced US 2026 data-center capacity against capacity under construction" width={1341} height={759}
                caption="<b>The binding constraint, dated to the week.</b> Of announced US capacity for 2026 delivery, roughly a third is under construction. Closing the gap needs 5.2 years of expansion at the observed rate against 1.4 available. <span class='vn-src'>LBNL, Wood Mackenzie, GE Vernova</span>" />

              <div className="vn-verdict"><p className="vn-q">Q11. Who controls compute?</p>
                <p className="vn-a">A layered US-led oligopoly with a live custom-silicon erosion tail. <a href="https://investor.tsmc.com/english" target="_blank" rel="noopener noreferrer">One foundry fabricates nearly every leading AI chip</a>, which is the concentration that matters.</p>
                <p className="vn-meta">binding: <b>Matter, Tier 3</b> · P ≈ 0.75</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q12. How much compute will AI need?</p>
                <p className="vn-a">Unlimited is eliminated at Tier 3, and the mechanism is dated to the week. The ceiling is grid equipment and interconnection. It is not appetite, not capital, and emphatically not physics: accelerators sit <a href="https://arxiv.org/abs/2312.08595" target="_blank" rel="noopener noreferrer">two orders of magnitude below the practical CMOS ceiling</a>. Anyone claiming AI faces a near-term physics wall is making a Tier 3 claim and mislabelling it.</p>
                <p className="vn-meta">binding: <b>Matter 3c, Tier 3</b> · P ≈ 0.75 · T<sub>req</sub> 5.2 yr vs 4.4 available</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q13. Who finances the next trillion?</p>
                <p className="vn-a">Debt and private credit, not cash flow. But the widely cited <a href="https://www.morganstanley.com/insights/articles/ai-data-center-financing" target="_blank" rel="noopener noreferrer">$1.5T is a <em>funding gap</em></a>, not a debt requirement, and reading it otherwise overstates the capital constraint roughly sevenfold. Stress is idiosyncratic before it is systemic.</p>
                <p className="vn-meta">eliminated by <b>observation</b>, not constraint · P ≈ 0.78 · cascade tail 0.10</p>
              </div>

              <h2 id="b-data">Data</h2>
              <div className="vn-verdict"><p className="vn-q">Q14. Does AI run out of data?</p>
                <p className="vn-a"><a href="https://arxiv.org/abs/2211.04325" target="_blank" rel="noopener noreferrer">Public text exhausts around 2028</a> on the median and scaling migrates to <a href="https://www.nature.com/articles/s41586-024-07566-y" target="_blank" rel="noopener noreferrer">verified synthetic, multimodal and private sources</a>. The scarce complement moves from raw data to verification apparatus rather than disappearing.</p>
                <p className="vn-meta">binding: <b>Data, Tier 2</b> · P ≈ 0.60, reduced · confidence bounded by the <a href="#p5" data-go="p5">backtest miss</a></p>
              </div>
              <p style={{ fontSize: "16.5px", color: "#3B4048" }}>This is the verdict the paper is least confident about, and the reason is in <a href="#p5" data-go="p5">Piece V</a>: the framework predicted the data wall would bind by 2026, at maximum confidence, and was wrong. Tier 2 is where substitution defeats stock-based reasoning.</p>

              <h2 id="b-models">Models and scale</h2>
              <div className="vn-verdict"><p className="vn-q">Q15. Do models commoditize?</p>
                <p className="vn-a">One model winning is eliminated: no frontier lead has held for more than months. Zero margin everywhere is eliminated: the newest model always commands a premium. What survives is that the floor commoditizes fast and the frontier holds a brief, eroding lead. <strong>The model is a commodity and the moat is everything around it.</strong> BOND reaches the same premise and calls the consequence <a href="https://www.bondcap.com/report/pdf/Trends_Artificial_Intelligence.pdf" target="_blank" rel="noopener noreferrer">a riddle</a>. It is not a riddle. The floor falls 11.8x to 75.3x per year while the frontier falls 1.34x to 2.25x, and that divergence is the whole answer.</p>

                <Fig src="figs/vn_rates_of_decline.png" alt="Frontier and fixed-capability price series and their annual rates of decline" width={1341} height={823}
                  caption="<b>The two prices, measured.</b> Frontier price falls 1.34x to 2.25x per year depending on whether reasoning models set the frontier. The price of a fixed capability falls 11.8x to 75.3x. <span class='vn-src'>Epoch AI replication repository, re-run</span>" />

                <p className="vn-meta">binding: <b>Capital, Tier 5</b> · P ≈ 0.75</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q16. Does scale still work?</p>
                <p className="vn-a">Yes, but the lever moved, and it moved because of fabrication and power rather than tokens. The question flips from how big to pre-train to how much thinking to buy at inference.</p>
                <p className="vn-meta">binding: <b>Matter 3b, Tier 3</b> · P ≈ 0.68</p>
              </div>

              <div className="vn-concede">
                <span className="vn-sig">Two denominators, and they are not interchangeable</span>
                <p>Fixed-capability inference price falls roughly tenfold per year; <a href="https://hai.stanford.edu/ai-index/2025-ai-index-report" target="_blank" rel="noopener noreferrer">Stanford HAI measures a 99.7 percent fall in cost per token</a> between November 2022 and December 2024, about 15.9x annually. The <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer"><em>frontier</em> price, the best model at launch</a>, falls at roughly 2.9x. The Residual Ratio uses the frontier denominator. Under the fixed-capability denominator it is larger by orders of magnitude. Both are legitimate; using them interchangeably is not.</p>
              </div>

              <h2 id="b-labor">Labor and value</h2>
              <div className="vn-verdict"><p className="vn-q">Q17. How much knowledge work is automatable?</p>
                <p className="vn-a">Task-level, not job-level. Exposure is broad but cost-effective automation is partial and rising. Note the attribution: the 23 percent figure is a cost line, which is Tier 5 and relaxes in weeks, so this elimination is weak.</p>
                <p className="vn-meta">binding: <b>Capital, Tier 5</b> · P ≈ 0.75</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q18. What gains value when intelligence is cheap?</p>
                <p className="vn-a">The complements intelligence cannot make abundant: energy, verified data, fabrication capacity, trust, distribution, and human accountability for consequential decisions. The thesis in its purest form.</p>
                <p className="vn-meta">no binding constraint on the survivor · P ≈ 0.80</p>
              </div>

              <h2 id="b-agents">Agents</h2>
              <div className="vn-verdict"><p className="vn-q">Q19. Can agents be trusted to act reliably?</p>
                <p className="vn-a">Already-reliable is eliminated by measurement: production single-task success clusters near 56 percent and <a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" target="_blank" rel="noopener noreferrer">roughly 88 percent of pilots never reach production</a>. Never is eliminated by the trend. Agents are trustworthy inside bounded, verifiable, short-horizon tasks and nowhere else. <strong>Trust scales with verifiability, not with raw capability.</strong></p>
                <p className="vn-meta">empirical, not constraint · P ≈ 0.70 · sub-threshold plateau 0.25</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q20. Can agents run whole workflows unsupervised?</p>
                <p className="vn-a">No, and the limit is arithmetic rather than sentiment. Success compounds multiplicatively. At 95 percent per step, a twenty-step workflow succeeds 36 percent of the time. Long unsupervised chains need 99 percent-plus per step. Production is at 56.</p>

                <Fig src="figs/vn_compounding.png" alt="Whole-task success against workflow length at several per-step rates" width={1282} height={730}
                  caption="<b>Why long unsupervised chains fail.</b> The limit is arithmetic rather than sentiment, which is why this verdict is labelled empirical and not constraint-based." />

                <p className="vn-meta">empirical, not constraint · P ≈ 0.72</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q21. Who is liable for an agent's decisions?</p>
                <p className="vn-a"><a href="https://eur-lex.europa.eu/eli/dir/2024/2853/oj" target="_blank" rel="noopener noreferrer">The deploying principal, by default</a>. The residual responsibility gap for genuinely autonomous acts makes accountable human oversight a scarce, valuable complement: the Residual Ratio appearing in law.</p>
                <p className="vn-meta">binding: <b>Law, Tier 4</b> · P ≈ 0.75</p>
              </div>

              <h2 id="b-phys">Software and the physical world</h2>
              <div className="vn-verdict"><p className="vn-q">Q22. Does SaaS survive?</p>
                <p className="vn-a">It survives but reprices, from seats to outcomes and data, with margins bifurcating.</p>
                <p className="vn-meta">binding: <b>Capital, Tier 5</b> · P ≈ 0.70</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q23. When are humanoid robots viable?</p>
                <p className="vn-a">In structured, high-wage, multi-shift niches first. The last-ten-percent dexterity gap that keeps general deployment out is <strong>task horizon and scope, not simulation-to-reality</strong>. On <a href="https://behavior.stanford.edu/" target="_blank" rel="noopener noreferrer">BEHAVIOR-1K</a>, a benchmark of long-horizon mobile manipulation in simulated homes, the top team reached <strong>12.4 percent full-task success</strong>; on the short-horizon 18-task <a href="https://arxiv.org/abs/1909.12271" target="_blank" rel="noopener noreferrer">RLBench</a> subset, results reach the high eighties. <strong>Both are simulation.</strong> Performance collapses with horizon and scope, and a household is exactly that.</p>
                <p className="vn-meta">binding: <b>Matter, Tier 3</b> · P ≈ 0.60, computed · mass deployment retains 0.23</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q24. When do autonomous vehicles go mainstream?</p>
                <p className="vn-a">City by city, gated by <a href="https://waymo.com/blog/" target="_blank" rel="noopener noreferrer">per-jurisdiction permission and validation</a>. Mainstream-everywhere is a decade-plus away.</p>
                <p className="vn-meta">binding: <b>Law, Tier 4</b> · P ≈ 0.72</p>
              </div>
              <div className="vn-verdict"><p className="vn-q">Q25. Does intelligence become an abundant utility?</p>
                <p className="vn-a">Free and infinite is eliminated: unbounded supply needs eleven years of Tier 3 expansion against 4.4 available. Stays-scarce is eliminated by the price collapse. Both survivors say the same thing. Tokens become utility-cheap and <strong>the scarce utility is the layer beneath</strong>: power, compute, fabrication. The Residual Ratio reaches its maximum here.</p>
                <p className="vn-meta">binding: <b>Matter, Tier 3</b> · P ≈ 0.78</p>
              </div>

              <div className="vn-next"><span className="vn-lbl">Next</span>
                <a href="#p5" data-go="p5"><em>V. The Call and the Record</em></a></div>
            </section>

            {/* ===== V. THE CALL AND THE RECORD ===== */}
            <section className="vn-piece" id="p5">
              <span className="vn-eyebrow">Piece V</span>
              <h1>The Call and the Record</h1>
              <p className="vn-summary">One dated bet with five adjudication rules: the 80 percent reliability horizon stays under eight hours on 31 December 2027, at P = 0.85. Plus the backtest, including a prediction this framework got wrong at maximum confidence, on the exact constraint tier it had already flagged as vulnerable.</p>

              <div className="vn-mini"><span className="vn-lbl">In this piece</span>
                <ul>
                  <li><a href="#c-call">The Call</a></li>
                  <li><a href="#c-rules">Adjudication rules</a></li>
                  <li><a href="#c-back">The backtest</a></li>
                  <li><a href="#c-miss">The miss</a></li>
                  <li><a href="#c-register">The register, in full</a></li>
                  <li><a href="#c-corrections">What checking changed</a></li>
                  <li><a href="#c-obj">The objection that is granted</a></li>
                  <li><a href="#c-limits">Limits</a></li>
                </ul>
              </div>

              <h2 id="c-call">The Call</h2>
              <div className="vn-call">
                <span className="vn-sig">The headline call</span>
                <p style={{ fontSize: "20px", lineHeight: "1.45" }}><strong>Reliability, not capability, remains the binding constraint on AI agents through 2027. On 31 December 2027, the best generally available model's <a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer">METR 80 percent-reliability task-completion time horizon</a> is under eight hours.</strong></p>
                <p className="vn-mono" style={{ fontSize: "13px", color: "var(--vn-muted)", marginTop: "14px" }}>P = 0.85 · adjudicated 31 March 2028 · signpost S13</p>
              </div>

              <p>The widely cited METR figure is the 50 percent horizon, and it has risen several-fold since late 2025. <strong>The 80 percent horizon, the level at which work can actually be delegated, has been approximately flat at 27 to 32 minutes across two frontier release cycles.</strong><sup><a href="#f5-1" id="r5-1">1</a></sup></p>
              <p>Falsification therefore requires roughly a sixteen-fold rise, four doublings, in under two years, in a series that has not moved. The mechanism is the argument rather than the extrapolation: <strong><a href="https://arxiv.org/abs/2503.14499" target="_blank" rel="noopener noreferrer">capability gains are arriving as intercept rather than slope</a>.</strong> Models are becoming better at succeeding sometimes on long tasks without becoming better at succeeding reliably.</p>

              <Fig src="figs/vn_horizons.png" alt="50 percent horizon rising while the 80 percent horizon stays flat" width={1384} height={736}
                caption="<b>The divergence the Call is staked on.</b> The cited 50 percent horizon has risen several-fold. The 80 percent horizon, the level at which work can be delegated, has been flat at 27 to 32 minutes across two frontier release cycles. <span class='vn-src'>METR</span>" />

              <h2 id="c-rules">Adjudication rules</h2>
              <p>A bet that cannot be settled is not a bet.</p>
              <ol style={{ paddingLeft: "22px" }}>
                <li style={{ marginBottom: "9px" }}><strong>Series.</strong> METR Time Horizon 1.1 or its successor, as published at <a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer">metr.org/time-horizons</a>.</li>
                <li style={{ marginBottom: "9px" }}><strong>Methodology change.</strong> If METR replaces the series, the Call adjudicates on the successor. If the successor reports no 80 percent horizon, the Call resolves <em>void</em> rather than in either party's favour.</li>
                <li style={{ marginBottom: "9px" }}><strong>Generally available.</strong> Any member of the public can obtain access by payment, without individual negotiation, waitlist approval or preview enrollment.</li>
                <li style={{ marginBottom: "9px" }}><strong>Unmeasured models.</strong> Adjudicated on the highest published 80 percent horizon among generally available models. If the strongest has no published horizon, the Call resolves on those that do and the omission is recorded.</li>
                <li><strong>Adjudication date.</strong> 31 March 2028, to allow for publication lag.</li>
              </ol>
              <p style={{ marginTop: "20px" }}>Two hazards acknowledged: METR has noted that <a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer">measurements above 16 hours are unreliable</a> with the current task suite, and its coverage is explicitly not comprehensive. Both make the Call harder to settle rather than easier to win.</p>

              <h2 id="c-back">The backtest</h2>
              <p>A framework that has never been scored is falsifiable in principle and not in practice. Five questions were pre-registered with parameters fixed at their historical as-of dates, before outcomes were consulted. One was chosen because the framework predicts its own failure there.</p>

              <div className="vn-tbl"><table>
                <thead><tr><th>Question</th><th>As-of</th><th className="vn-n">P(yes)</th><th>Actual</th><th className="vn-n">Brier</th></tr></thead>
                <tbody>
                  <tr><td>CoWoS packaging meets 2024 demand</td><td>end-2023</td><td className="vn-n">36.4%</td><td>NO · hit</td><td className="vn-n">0.132</td></tr>
                  <tr><td>Capital is binding on 2025 buildout</td><td>end-2023</td><td className="vn-n">0.0%</td><td>NO · hit</td><td className="vn-n">0.000</td></tr>
                  <tr><td><strong>Data wall binds scaling by 2026</strong></td><td>end-2022</td><td className="vn-n">100.0%</td><td className="vn-bind">NO · MISS</td><td className="vn-n vn-bind">1.000</td></tr>
                  <tr><td>US capacity meets 2025 announcements</td><td>end-2023</td><td className="vn-n">8.7%</td><td>NO · hit</td><td className="vn-n">0.008</td></tr>
                  <tr><td>Grid equipment binding on 2026 buildout</td><td>end-2024</td><td className="vn-n">97.8%</td><td>YES · hit</td><td className="vn-n">0.001</td></tr>
                </tbody>
                <caption><b>Four of five correct, <a href="https://en.wikipedia.org/wiki/Brier_score" target="_blank" rel="noopener noreferrer">mean Brier 0.228</a> against 0.25 for a coin flip.</b> The aggregate is dragged there entirely by one catastrophic miss; removing it gives 0.035.</caption>
              </table></div>

              <h2 id="c-miss">The miss</h2>
              <div className="vn-concede">
                <span className="vn-sig">Wrong at maximum confidence</span>
                <p>The framework predicted, at 100 percent confidence, that the public-text data wall would bind frontier scaling by 2026. It did not. <a href="https://arxiv.org/abs/2211.04325" target="_blank" rel="noopener noreferrer">Epoch's own median exhaustion estimate moved from 2024 to 2028</a>, and multimodal corpora and verified synthetic generation substituted for the stock the model had treated as fixed.</p>
                <p><strong>This is the classical failure of resource-limit forecasting, reproduced inside our own model, on the tier we had already flagged as exposed to it.</strong> Malthus, the Ehrlich side of the Simon-Ehrlich wager, and <a href="https://www.jstor.org/stable/2230846" target="_blank" rel="noopener noreferrer"><em>The Limits to Growth</em> against the Nordhaus critique</a> all failed identically: the analyst held Permitted fixed while the world held it variable. We named the mechanism and then failed to parameterize it.</p>
              </div>

              <Fig src="figs/vn_backtest.png" alt="Backtest of five pre-registered questions, four hits and one miss" width={1386} height={750}
                caption="<b>The record, including the miss.</b> The vertical bar is the outcome. The single miss came at maximum confidence on Tier 2, the tier this framework had already named as most exposed to substitution." />

              <p>Three corrections followed. The Tier 2 expansion rate was revised by an order of magnitude, from 0.02 to 0.05 up to 0.30 to 0.60, because the parameter must be the rate at which the <em>effective</em> stock expands including substitution. Three verdicts moved. And the Brier score is now reported by tier rather than in aggregate: the framework is excellent on Tiers 3 and 5, where constraints are industrial and rates are observable, and it was worthless on Tier 2.</p>
              <p><strong>What the backtest does not establish:</strong> five questions is not a validation set, and four of five are physical-infrastructure questions, the domain where the method should perform best. It is untested on institutional, labor and behavioural questions, which is most of the economic domain, and is probably weaker there.</p>

              <h2 id="c-obj">The objection that is granted</h2>
              <p>Six objections are answered in full in the paper. One is granted outright.</p>
              <div className="vn-call">
                <span className="vn-sig">Granted</span>
                <p>Every historical analogue this paper invokes has the same structure: the <em>final</em> binding constraint was organizational, not physical. <a href="https://www.jstor.org/stable/2006600" target="_blank" rel="noopener noreferrer">In electrification, generation and distribution were solved decades before</a> the productivity gains arrived. In the 1990s telecom buildout the constraint moved from capital to demand, with <a href="https://archive.seattletimes.com/archive/?date=20020113&slug=darkfiber130" target="_blank" rel="noopener noreferrer">roughly 5 percent of installed fiber lit by 2001</a>.</p>
                <p>If the same holds here, the residual accrues to whoever solves organizational adoption rather than to owners of physical complements, and the investment conclusion inverts. <strong>The thesis is therefore narrowed: it holds on the 2026 to 2030 horizon, where physical constraints dominate and absorption has not had time to bind. Beyond that horizon this paper does not make the claim.</strong></p>
              </div>

              <h2 id="c-register">The register, in full</h2>
              <p>No participant in this field maintains a track record. Forecasts are published, cited, and quietly superseded. <strong>This is the scoreboard, and this paper's own entries are listed first and scored on the same basis as everyone else's.</strong></p>

              <h3>Resolved: the pre-registered backtest</h3>
              <div className="vn-tbl"><table className="vn-reg">
                <thead><tr><th>Question</th><th>As of</th><th className="vn-n">P(yes)</th><th>Outcome</th><th className="vn-n">Brier</th></tr></thead>
                <tbody>
                  <tr className="vn-own"><td>CoWoS meets 2024 demand</td><td>end-2023</td><td className="vn-n">36.4%</td><td className="vn-hit">NO, hit</td><td className="vn-n">0.132</td></tr>
                  <tr className="vn-own"><td>Capital binds the 2025 buildout</td><td>end-2023</td><td className="vn-n">0.0%</td><td className="vn-hit">NO, hit</td><td className="vn-n">0.000</td></tr>
                  <tr className="vn-own"><td><b>Data wall binds scaling by 2026</b></td><td>end-2022</td><td className="vn-n">100.0%</td><td className="vn-miss">NO, MISS</td><td className="vn-n vn-miss">1.000</td></tr>
                  <tr className="vn-own"><td>US capacity meets 2025 announcements</td><td>end-2023</td><td className="vn-n">8.7%</td><td className="vn-hit">NO, hit</td><td className="vn-n">0.008</td></tr>
                  <tr className="vn-own"><td>Grid binds the 2026 buildout</td><td>end-2024</td><td className="vn-n">97.8%</td><td className="vn-hit">YES, hit</td><td className="vn-n">0.001</td></tr>
                </tbody>
                <caption><b>Four of five correct, mean Brier 0.228 against 0.25 for a coin flip.</b> The aggregate is dragged there entirely by one maximum-confidence miss. By tier: <b>0.035 on Tiers 3 and 5, 1.000 on Tier 2.</b> The framework is good where constraints are industrial and their rates observable, and was worthless where substitution dominates.</caption>
              </table></div>

              <h3>Open: this paper's dated forecasts</h3>
              <div className="vn-tbl"><table className="vn-reg">
                <thead><tr><th>Claim</th><th>Adjudicated on</th><th>Resolves</th></tr></thead>
                <tbody>
                  <tr className="vn-own"><td>METR 80% horizon under 8 hours on 31 Dec 2027. <b>P = 0.85</b></td><td>METR Time Horizon 1.1 or successor</td><td>31 Mar 2028</td></tr>
                  <tr className="vn-own"><td>Combined HBM revenue exceeds the two leading labs' revenue, FY2027. <b>P = 0.55</b></td><td>Company disclosure</td><td>31 Mar 2028</td></tr>
                  <tr className="vn-own"><td>Delivered US capacity lands 12+ months behind announcement. <b>P = 0.64</b></td><td>LBNL, filings</td><td>30 Jun 2028</td></tr>
                  <tr className="vn-own"><td>AI adds 1.0 to 1.5pp of annual growth. <b>P = 0.55, provisional</b></td><td>National accounts</td><td>31 Dec 2030</td></tr>
                </tbody>
              </table></div>

              <h3>Open: the field's forecasts, scored on the same basis</h3>
              <div className="vn-tbl"><table className="vn-reg">
                <thead><tr><th>Forecaster</th><th>Claim</th><th>Resolves</th></tr></thead>
                <tbody>
                  <tr><td>PwC, 2017</td><td>+$15.7T to global GDP</td><td>31 Dec 2030</td></tr>
                  <tr><td>Goldman Sachs, 2023</td><td>+7% global GDP, +1.5pp productivity over ten years</td><td>31 Dec 2033</td></tr>
                  <tr><td>Acemoglu, 2024</td><td>TFP effects no more than 0.66% in total</td><td>31 Dec 2034</td></tr>
                  <tr><td>Gartner, 2025</td><td>Over 40% of agentic projects cancelled</td><td>31 Dec 2027</td></tr>
                  <tr><td>Aschenbrenner, 2024</td><td>AGI "strikingly plausible"; drop-in remote worker</td><td>31 Dec 2027</td></tr>
                  <tr><td>Bain, 2025</td><td>~$2T annual revenue required, ~$800B shortfall</td><td>31 Dec 2030</td></tr>
                  <tr className="vn-survives"><td>Epoch AI</td><td>Public text exhaustion. <b>Median revised 2024 to 2028</b></td><td><b>RESOLVED by revision</b></td></tr>
                  <tr className="vn-survives"><td>AI Futures Project</td><td>Superhuman coder early 2027. <b>Timeline revised outward Dec 2025</b></td><td><b>Partly resolved</b></td></tr>
                </tbody>
                <caption>Two entries resolved by <b>revision rather than outcome</b>, and both are recorded as resolutions because revising a public forecast when evidence changes is the behaviour this register exists to reward. Epoch's is the most important line here: <b>the backtest miss above is the same claim, made by us, without the revision.</b> We were wrong exactly where Epoch corrected itself.</caption>
              </table></div>

              <div className="vn-concede">
                <span className="vn-sig">What this register does not have</span>
                <p>Sixteen entries with six resolved is enough to establish the practice, not calibration. Four of five resolved entries are physical-infrastructure questions, so the method is untested where it is probably weakest: institutional, labour and behavioural questions. And <strong>no entry has been contested by anyone else.</strong> Anyone wishing to stake an opposing position on an open entry, with a date and a probability, will be added and scored identically.</p>
              </div>

              <h2 id="c-corrections">What checking the citations changed</h2>
              <p>Twenty sources checked against source, sixteen corrections. <strong>Every substantive figure held up. What failed was the pointer.</strong> Four of these changed a conclusion rather than a reference.</p>
              <div className="vn-tbl"><table>
                <thead><tr><th>Found</th><th>Consequence</th></tr></thead>
                <tbody>
                  <tr><td>Frontier price is not flat at 1.05x/yr; it is 1.34x to 2.25x</td><td>Wrong by up to 114%. The mechanism survives and is stronger</td></tr>
                  <tr><td>Fixed-capability price falls 11.8x to 75.3x/yr, not 3.5 to 6x</td><td>Low by an order of magnitude</td></tr>
                  <tr className="vn-survives"><td><b>No vendor discloses HBM average selling price</b></td><td><b>The Residual Ratio has no numerator. Withdrawn</b></td></tr>
                  <tr><td>Transformer lead times were a year stale at 128 weeks</td><td>Now past 160. Strengthens the Tier 3 argument</td></tr>
                  <tr><td>The Copilot citation pointed at the wrong paper entirely</td><td>Real figure 26.08%, SE 10.3, large enough to need a caveat</td></tr>
                  <tr><td>The support-agent study's peer-reviewed version revises 14% to 15% <b>and adds a caveat</b></td><td>The highest-skilled see quality <em>declines</em>. Q5's reasoning changed</td></tr>
                  <tr><td>Four JSTOR identifiers were suspect; checking each gave three different answers</td><td>One correct, one wrong by a near-miss, two fabricated. Withdrawing the class was itself an over-correction</td></tr>
                </tbody>
                <caption><b>An identifier is a claim like any other, and one that was not looked up must not be asserted.</b> The failures reduce to two mechanisms: citing a secondary summary rather than the origin paper, and citing a living benchmark by identifier while its figures move underneath.</caption>
              </table></div>

              <h2 id="c-limits">Limits</h2>
              <p><strong>The closed-world problem is the binding constraint on the method itself.</strong> In the worked verdict it cost a factor of two in the leading posterior before the completeness check caught it. Enumerate until two consecutive additions leave the leader unchanged, and report how many were required.</p>
              <p><strong>The constraint set and the conclusion overlap.</strong> The six are derived from replenishment mechanisms without reference to AI, which answers the charge structurally. What it does not do is produce a counterexample: in a hundred applications there is no question where the binding constraint is one of the six and value nonetheless accrues to the intelligence layer. Until such a case is found and published, the circularity charge is not fully answered, and this is recorded as open rather than closed.</p>
              <p><strong>The parameters are estimates from thin evidence.</strong> They are better than chosen coefficients because they are in principle measurable, but they are not yet well measured. Signpost S16 exists to detect when they are wrong.</p>

              <div className="vn-call">
                <span className="vn-sig">The standard this holds itself to</span>
                <p>A forecast that cannot fail is not a forecast but a mood. This one has failed once already, in public, on the tier it warned about, and it has told you what it changed as a result.</p>
              </div>

              <div className="vn-fn"><ol>
                <li id="f5-1">Claude Opus 4.5 measured approximately 27 minutes on the 80 percent horizon in December 2025, and the series had been approximately flat at 27 to 32 minutes across the preceding frontier releases, while 50 percent horizons rose several-fold. The ratio between the two has widened from roughly 5x toward 10x to 25x. Source: <a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer">METR</a>. <a href="#r5-1">↩</a></li>
              </ol></div>

              <div className="vn-next"><span className="vn-lbl">Read next</span>
                <a href={PDF_URL} target="_blank" rel="noopener noreferrer">The full paper, with all thirty verdicts and the arithmetic</a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
