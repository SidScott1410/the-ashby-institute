# The Ashby Institute — Design Brainstorm

## Three Stylistic Approaches

### 1. The Ledger
A typographic-first approach drawing from the tradition of academic journals and government white papers. Strict column grids, heavy use of rules and borders, text as the primary visual element. Feels like a document that has been designed, not a website that has been decorated.
**Probability:** 0.04

### 2. The Observatory
Dark, precise, and slightly austere — like a scientific instrument. Deep navy backgrounds, monospace metadata, serif display type. The aesthetic of a place that takes measurement seriously. References the feedback-loop concept through circular motifs and closed-system diagrams.
**Probability:** 0.07

### 3. The Monograph
Warm off-white body sections, deep near-black hero, no ornamentation beyond typography and thin rules. Feels like a well-designed academic book that has been translated to screen. Institutional authority without institutional stuffiness.
**Probability:** 0.03

---

## Selected Approach: **The Monograph** (Probability: 0.03)

### Design Movement
Swiss International Typographic Style adapted for editorial web — strict grids, typographic hierarchy as the sole ornament, negative space as a structural element.

### Core Principles
1. **Typography is the design.** No decorative graphics, no background textures. The serif/mono/sans hierarchy carries all visual weight.
2. **Restraint signals authority.** Every element must justify its presence. If it can be removed without loss, remove it.
3. **Warmth within severity.** The warm off-white body sections prevent the site from feeling cold or corporate. This is a human institution.
4. **The crimson is a scalpel, not a brush.** #A02D24 appears only as a fine accent — borders, label dots, hover underlines — never as a fill.

### Color Philosophy
- **Hero/dark sections:** `#0F1419` — near-black with a very slight warm undertone, not pure black (which reads as digital/tech)
- **Body sections:** `#FAF8F5` — warm off-white, the color of aged paper, signals scholarship
- **Text on dark:** `#F0EDE8` — warm off-white, not pure white
- **Text on light:** `#1A1714` — near-black, warm undertone
- **Accent:** `#A02D24` — deep crimson, used for: section label dots, active nav underlines, CTA button borders, thin horizontal rules in hero
- **Muted text:** `#6B6560` — warm mid-gray for metadata, captions, dates
- **Border:** `#D4CFC9` — warm light gray for card borders and dividers

### Layout Paradigm
Asymmetric editorial grid. The hero uses a left-aligned text block occupying ~55% width with the right side open. Content sections alternate between full-bleed and constrained-width columns. Publication cards use a horizontal list format (label | title | date) rather than a grid of boxes. The nav is a thin horizontal strip — no mega-menus.

### Signature Elements
1. **The thin crimson rule** — a 1px horizontal line in #A02D24 that appears above section labels in the hero and as a decorative element in publication headers
2. **Monospace metadata** — all dates, labels, program codes, and issue numbers render in IBM Plex Mono at 11–12px, creating a data-instrument aesthetic
3. **The feedback loop mark** — the SVG logo mark (two arcs forming a closed cycle) appears in the header at 32px and as a favicon; it is the only non-typographic visual element on the site

### Interaction Philosophy
Interactions are deliberate and minimal. Links underline on hover with a thin crimson line. Buttons have no fill — they are bordered rectangles that invert on hover. Navigation items have no dropdown animations — submenus appear instantly. The site does not animate to entertain; it responds to communicate.

### Animation
- Page transitions: none (institutional sites do not animate between pages)
- Scroll reveals: subtle `opacity: 0 → 1` with `translateY(8px → 0)` over 400ms ease-out, only on first viewport entry
- Nav scroll behavior: header transitions from transparent to `#0F1419/95` with backdrop-blur on scroll past 60px
- Hover states: 150ms ease-out for all color/underline transitions
- No parallax, no floating elements, no entrance carousels

### Typography System
- **Display (H1, H2):** Fraunces — a variable serif with optical size axis; use at 900 weight for H1, 700 for H2. Slightly condensed tracking.
- **Section labels:** IBM Plex Mono — 11px, letter-spacing: 0.12em, text-transform: uppercase, color: #A02D24
- **Body / nav / UI:** Inter — 16px/1.6 for prose, 14px for nav items
- **Metadata / dates / issue numbers:** IBM Plex Mono — 12px, color: #6B6560
- **Blockquotes / pull quotes:** Fraunces italic, 20px, left border in crimson

### Brand Essence
The Ashby Institute is the only institution whose sole purpose is to model the system that is reshaping everything else. For policymakers, researchers, and strategists who need structural clarity, not commentary.
**Personality:** Precise. Austere. Consequential.

### Brand Voice
Headlines read like journal article titles — declarative, specific, no verbs of enthusiasm. CTAs are imperative but not promotional.
- Example headline: "Compute Futures Under Multipolar Constraint: Four Scenarios to 2030"
- Example CTA: "Read the Report" (not "Discover Our Research")
- Banned phrases: "Welcome to", "Explore our", "Get started", "Learn more about our mission"

### Wordmark & Logo
The wordmark is set in Fraunces 700 with tight tracking. The logo mark is a minimal SVG: two thin arcs (stroke, no fill) forming a complete closed cycle with small arrowheads — the visual representation of the Good Regulator Theorem's feedback loop. Rendered in #A02D24 on transparent background.

### Signature Brand Color
`#A02D24` — deep crimson. The color of a wax seal on a policy document.
