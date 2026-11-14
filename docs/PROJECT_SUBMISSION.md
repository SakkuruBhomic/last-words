# NASA Space Apps Challenge 2026 — Project Submission Form

> **Challenge:** Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars  
> **Project Name:** LAST WORDS: The Final Transmissions of NASA’s Left-Behind Explorers  
> **Live Website:** [https://last-words1.vercel.app/](https://last-words1.vercel.app/)  
> **Source Code Repository:** [https://github.com/SakkuruBhomic/last-words](https://github.com/SakkuruBhomic/last-words)  
> **Demo Video Link:** [https://drive.google.com/drive/folders/1o57N-9qY9NP6Xak63xHxawZ1opYqFhCu?dmr=1&ec=wgc-drive-hero-goto](https://drive.google.com/drive/folders/1o57N-9qY9NP6Xak63xHxawZ1opYqFhCu?dmr=1&ec=wgc-drive-hero-goto)  

---

## 1. High Level Summary

### Project Name
**LAST WORDS: The Final Transmissions of NASA’s Left-Behind Explorers**

### High-Level Summary
Across more than five decades of space exploration, humanity has left dozens of robotic probes and scientific stations resting silently on the Moon, Mars, and in deep space. Often labeled colloquially as "space junk," these artifacts actually represent the high-water marks of human curiosity, engineering grit, and groundbreaking planetary science.

To bring their stories alive for school-age space enthusiasts (ages 10–16, grades 5–10) and educators, we developed **LAST WORDS** ([https://last-words1.vercel.app/](https://last-words1.vercel.app/))—an accessible, scroll-driven storytelling web experience built around eight historic NASA machines (3 Moon, 3 Mars, 2 Deep Space). Each machine's story centers on its final operational transmission, featuring:
1. A dramatized, first-person **"Final Log"** rendered in a mission-control terminal with real-time signal carrier decay.
2. A verified **"What Really Happened"** telemetry timeline mapping every dramatized line to primary NASA flight logs.
3. An interactive **"Then & Now" comparison slider** contrasting prime operational imagery against modern orbital photographs (from LRO and HiRISE).
4. A hydration-safe **"Silence Clock"** measuring the exact elapsed time since final contact.
5. Hand-crafted **"Built for X, Lasted Y"** SVG endurance comparisons illustrating how machines designed for months lasted decades.
6. A **"Science It Made Possible"** module with hands-on "Try It" mini-experiments, plus an interactive 3-question quiz awarding a shareable **"Deep Space Listener Badge."**

Critically, the site ends on a hopeful note: two machines are **not silent**. Voyager 1 is still transmitting from interstellar space (approaching its historic one light-day milestone on November 18, 2026), and Apollo 11’s passive laser retroreflector still answers laser pulses today with zero electrical power. **LAST WORDS** bridges scientific accuracy with emotional resonance, proving that being abandoned is not the same as being forgotten.

---

## 2. Project Details

### What exactly does it do?
**LAST WORDS** transforms cold binary flight telemetry into an emotionally gripping, interactive digital museum. Users explore an interconnected suite of educational storytelling features:
* **The Silence Timeline (1967 – Present):** A responsive chronology (horizontal on desktop, vertical on mobile) tracking the silence timestamps of Surveyor 3, Apollo 17 ALSEP, Pioneer 10, Opportunity, InSight, and Ingenuity, culminating in active pulsing nodes for the Apollo 11 retroreflector and Voyager 1.
* **Terminal Final Logs & Signal Visualizer:** Monospace typewriter logs capturing each robot’s final moments, synchronized with a dynamic SVG carrier wave that flatlines as the user scrolls to signal loss.
* **Ground-Truth Fact Mapping:** Every dramatized line is paired directly with timestamped citations from NASA JPL and NTRS records under "What Really Happened," including the nuanced story of how science journalists paraphrased Opportunity's final data into *"My battery is low and it's getting dark."*
* **Then & Now Slider:** A keyboard-navigable before/after visual slider allowing students to inspect operational hardware in its prime versus modern high-resolution orbital reconnaissance imagery (from the Lunar Reconnaissance Orbiter and Mars Reconnaissance Orbiter).
* **Voyager 1 Light-Day Watch:** A live countdown to November 18, 2026 at 10:16:07 UTC, tracking when humanity’s most distant emissary reaches a distance of one light-day (25.9 billion kilometers) from Earth.
* **Interactive Tooltips for Space Jargon:** Accessible, inline glossary definitions for terms like *sol*, *RTG*, *seismometer*, *light-day*, *heliopause*, and *retroreflector*.
* **Educator Mode (`/teachers`):** A 20-minute turnkey lesson plan (Hook, Explore, Debate, Exit Ticket), 6 guided ethical debate prompts on space preservation vs. recycling, and a print-optimized (`@media print`) one-page black-and-white student worksheet.

### How does it work?
1. **Zero-Backend Static Architecture:** Built using Next.js App Router and TypeScript, compiled into statically generated, lightning-fast HTML pages. It requires no databases, servers, or user tracking.
2. **Telemetry & Content Engine:** All mission data is strictly validated via an automated prebuild test suite (`scripts/validate-data.mjs`), enforcing that all launch and loss timestamps are valid ISO dates, every image carries verified credit and source URLs, and every machine cites $\ge 2$ primary NASA archives.
3. **Hydration-Safe Real-Time Clocks:** React client hooks safely calculate precise elapsed durations (years, months, days, hours, minutes, seconds) since each probe’s final signal without SSR hydration mismatches.
4. **Native Web Audio Synthesizer:** Features an optional, off-by-default radio telemetry sound generator using the browser’s native Web Audio API oscillators (zero external MP3 assets).
5. **Universal Accessibility:** Built to WCAG 2.2 AA standards, utilizing the Atkinson Hyperlegible typeface (designed by the Braille Institute for visual clarity), full keyboard navigation, skip links, and `prefers-reduced-motion` compliance.

### What benefits does it have?
* **Scientific Integrity Over Hollywood Drama:** Discloses pedagogical literary devices openly. Kids learn the difference between raw voltage drops and dramatized stories, building genuine scientific literacy.
* **Empowering Educators:** The 20-minute classroom module lets teachers integrate real NASA telemetry into middle and high school science classes with zero prep time and a printable one-page worksheet.
* **Promoting Space Archaeology & Future Ethics:** Introduces students to emerging space policy: the *One Small Step to Protect Human Heritage in Space Act*, NASA's *LunaRecycle Challenge*, and the *PROMISE* lunar rover built from Mars rover spares.
* **Instant, Frictionless Access:** Zero logins, zero paywalls, mobile-first design (tested from 390px mobile screens to 1440px desktops), and sub-second load times worldwide via Vercel edge CDN.

### What do you hope to achieve?
* **Short-Term:** Captivate NASA Space Apps judges and classrooms worldwide with a working demo that turns forgotten planetary probes into unforgettable heroes of human science.
* **Long-Term:** Expand **LAST WORDS** into a global open-source educational platform by incorporating more candidate missions (such as Spirit MER-A, Cassini, and Dawn) and partnering with science museums, planetariums, and STEM clubs to host live "Final Signal" listening nights.

### What tools, coding languages, hardware, or software did you use?
* **Framework & Languages:** Next.js 16 (App Router), TypeScript (Strict Mode), Node.js, HTML5/CSS3.
* **Styling & UI:** Tailwind CSS, Framer Motion, Lucide Icons, Space Grotesk, Atkinson Hyperlegible, JetBrains Mono.
* **Testing & Build Automation:** Node.js ESM verification scripts (`validate-data.mjs`), ESLint, Turbopack.
* **Media & Synthesis:** Web Audio API (custom oscillator sound synthesizer), `canvas-confetti`.
* **Deployment & Containerization:** Vercel Global Edge Network, Docker multi-stage containerization, Docker Compose, Git & GitHub CLI.

---

## 3. Use of AI

Artificial Intelligence was used responsibly as a programming assistant during development:
* **Code Scaffolding & Optimization:** Used AI for drafting TypeScript data type definitions, CSS grid layouts, and mathematical date difference algorithms.
* **Strict Fact-Checking Guardrail:** **No mission dates, telemetry values, or historical facts were generated by AI.** Every single factual data point published on the site was independently verified against primary NASA, JPL, and NTRS government records.
* **Ethical Branding Compliance:** No NASA logos, insignias, or synthetic voices were generated. All image assets are authentic, unedited NASA public domain photography.

---

## 4. NASA Data

We strictly utilized open government data repositories provided by NASA and affiliated university missions:
1. **NASA Image and Video Library (`images-api.nasa.gov`):** Downloaded and verified all 16 primary historical and resting photographs (e.g., Apollo 12 astronaut Pete Conrad examining Surveyor 3 `AS12-48-7133`, LRO's Apollo 17 site view `PIA13543`, InSight's dust-covered final selfie `PIA25287`, and Ingenuity's Flight 72 shadow damage `PIA26244`).
2. **NASA Jet Propulsion Laboratory Mission Archives (`jpl.nasa.gov`):** Primary telemetry logs, flight milestones, and science findings for Opportunity (MER-B), InSight, and Ingenuity.
3. **NASA Technical Reports Server (NTRS `ntrs.nasa.gov`):** The declassified Apollo Lunar Surface Experiments Package (ALSEP) termination report (`19790014808`) documenting the permanent commanded shutdown on September 30, 1977.
4. **NASA Science Directorate (`science.nasa.gov`):** Real-time interstellar trajectory and instrument status records for Voyager 1 and Pioneer 10, confirming the November 18, 2026 light-day threshold.

*How it inspired us:* Seeing how Apollo 12 intentionally targeted Surveyor 3 just 30 months after it went quiet showed us that humanity's relationship with its discarded technology is not abandonment—it is the opening chapter of planetary archaeology.

---

## 5. Space Agency Partner Data and Other Resources

* **University Instrument Archives:** Lunar Reconnaissance Orbiter Camera (LROC) archives hosted by Arizona State University; High Resolution Imaging Science Experiment (HiRISE) archives hosted by the University of Arizona.
* **Typography:** *Atkinson Hyperlegible* (developed by the Braille Institute of America to maximize character legibility for low-vision readers).
* **Open Source Libraries:** Next.js, React, Tailwind CSS, Lucide React, Canvas-Confetti, Docker.
* **Competition Disclaimer:** *Independent student project created for the NASA Space Apps Challenge 2026. Not affiliated with or endorsed by NASA.* Full citations and credit tables are permanently published on the live site at [/about](https://last-words1.vercel.app/about).

