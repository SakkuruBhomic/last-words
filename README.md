# LAST WORDS
### *Every machine NASA left behind said something before it went quiet.*

> **NASA Space Apps Challenge 2026 Submission**  
> **Challenge Title:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*

---

## 🛰️ Project Overview

**LAST WORDS** is an interactive, accessible, and scientifically grounded storytelling experience that introduces students, educators, and space enthusiasts (grades 5–10, ages 10–16) to eight historic NASA machines left on the Moon, Mars, and in deep space.

Rather than treating these probes as forgotten cosmic junk, **LAST WORDS** explores their final transmissions, celebrates the groundbreaking science they unlocked, and follows the hopeful horizon of future space archaeology, recycling, and heritage preservation.

Two machines on the site are **not silent**:
- **Voyager 1** is still transmitting from interstellar space, crossing the one light-day distance threshold in November 2026.
- The **Apollo 11 Laser Retroreflector** still answers laser pulses from Earth observatories today with zero electrical power.

---

## 🌟 Key Features

1. **The Silence Timeline (1967 – Now):**
   - Responsive horizontal (desktop) and vertical (mobile) timeline showing the exact chronology of final signals.
   - Categorized by **Moon** (Moon silver), **Mars** (Mars rust), and **Deep space** (Deep-space violet) with instant filter chips.
2. **Terminal Final Logs:**
   - Monospace typewriter animation dramatizing each probe's final moments based strictly on real flight telemetry.
   - Includes "Skip animation" control, full screen-reader accessibility (`aria-live="off"`, visually hidden complete text in the DOM), and pedagogical disclosure notes.
3. **Hydration-Safe Silence Clock:**
   - Real-time client clock tracking the exact elapsed duration since each machine's final transmission.
   - For active craft, tracks active days and one-way light delay times.
4. **Scroll-Decaying Signal Visualizer:**
   - SVG carrier waveform that flatlines as the user navigates through the log (or continuously pulses for active emissaries), honoring `prefers-reduced-motion`.
5. **Interactive Then & Now Sliders:**
   - Fully keyboard-accessible (`<input type="range">` driving clip-path) comparing operational prime imagery against resting or orbital views from NASA's archives.
6. **Built for X, Lasted Y:**
   - Hand-built custom SVG comparison bars displaying design specifications vs. actual operational lifespans.
7. **The Science It Made Possible & Try It:**
   - Kid-friendly scientific impact cards (Core Idea, Instrument Findings, Modern Significance) plus practical home/classroom mini-experiments.
8. **Mission Debrief Quizzes & Listener Badge:**
   - 3 questions per mission with instant scientific feedback and explanations.
   - Stores progress in `localStorage` to award the gold **Deep Space Listener Badge** on the homepage.
9. **Voyager 1 Light-Day Moment:**
   - Live countdown to the historic moment on **November 18, 2026 at 10:16:07 UTC** when Voyager 1 reaches one light-day from Earth.
10. **Educator Mode (`/teachers`):**
    - 20-minute turnkey lesson plan (Hook, Explore, Discuss, Exit Ticket).
    - 6 guided ethics/science debate prompts.
    - One-page printable student worksheet formatted for standard paper printouts via `@media print`.
11. **Methodology & Rights (`/about`):**
    - Transparent fact-checking protocol, complete image rights registry, and full bibliography.
12. **Subtle Off-by-Default Telemetry Audio:**
    - Zero external sound files: uses native Web Audio API oscillators to generate gentle radio blips and telemetry clicks if explicitly toggled by the user.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router, static generation with `generateStaticParams`)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (Custom mission control palette & CSS starfield)
- **Icons:** `lucide-react`
- **Animation:** CSS keyframes, Framer Motion, canvas-confetti
- **Typography:**
  - Headings: `Space Grotesk`
  - Body: `Atkinson Hyperlegible` (Designed for maximum readability and visual accessibility)
  - Telemetry: `JetBrains Mono`
- **Accessibility:** WCAG 2.2 AA compliant (High-contrast ratios, visible focus indicators, screen reader text, keyboard navigable).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+ (Node 24 supported)
- npm 9+

### Installation & Setup

```bash
# Clone the repository
git clone <repo-url>
cd last-words

# Install dependencies
npm install

# Run data validation test
npm run validate:data

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Validation

The project includes an automated data validator that executes before every production build:

```bash
npm run validate:data
```

The validator verifies:
- Every machine contains $\ge 2$ primary NASA citations.
- All launch and signal timestamps are valid ISO dates.
- Every image has valid descriptive alt text, visible credits, and official source URLs.
- All quiz question answer indices are within valid option bounds.

To build the optimized production build:

```bash
npm run build
```

---

## 🚢 Deployment Guide

**LAST WORDS** requires zero external databases, accounts, or proprietary API keys. It can be deployed in seconds to any modern hosting environment:

### 1. Vercel (Recommended for Next.js)
The easiest way to deploy is through Vercel:
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new).
3. The framework preset will automatically detect Next.js.
4. Click **Deploy**. Vercel will run `npm run validate:data` and `npm run build` automatically.

Alternatively, via the Vercel CLI:
```bash
npx vercel --prod
```

### 2. Docker Container (Self-Hosted / VPS)
A production multi-stage `Dockerfile` and `docker-compose.yml` are provided in the repository root:

```bash
# Build and run the production container in the background
docker compose up -d --build
```
Access the application on port `3000`: `http://localhost:3000` (or behind a reverse proxy like Nginx or Caddy).

### 3. Netlify
1. Link your GitHub repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next`

### 4. Self-Hosted Node.js Server
To run the production server directly on any Linux, macOS, or Windows machine:
```bash
# Build the production bundle
npm run build

# Start the high-performance production server on port 3000
npm run start
```

---

## 📚 Fact-Checking & Primary Sources

All facts on this site are sourced strictly from primary government and educational repositories:
- NASA Science Mission Directorates: [science.nasa.gov](https://science.nasa.gov)
- NASA Jet Propulsion Laboratory (JPL): [jpl.nasa.gov](https://www.jpl.nasa.gov)
- NASA Technical Reports Server (NTRS): [ntrs.nasa.gov](https://ntrs.nasa.gov)
- NASA Image and Video Library: [images-api.nasa.gov](https://images.nasa.gov)

---

## ⚖️ Competition & Legal Disclaimer

*Independent student project made for the NASA Space Apps Challenge 2026. Not affiliated with or endorsed by NASA.*
