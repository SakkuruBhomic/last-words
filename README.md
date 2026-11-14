# LAST WORDS (v2: "Little Explorers" Edition)
### *Every machine NASA left behind said something before it went quiet.*

> **NASA Space Apps Challenge 2026 Submission**  
> **Challenge Title:** *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*  
> **Live Website:** [https://last-words1.vercel.app/](https://last-words1.vercel.app/)  
> **Source Code:** [https://github.com/SakkuruBhomic/last-words](https://github.com/SakkuruBhomic/last-words)  

---

## 🛰️ Project Overview

**LAST WORDS** is an interactive, accessible, and scientifically grounded storytelling experience. Upgraded for v2 with the **"Little Explorers"** edition, it now welcomes both young children (ages 5–8 and pre-readers) and older students, educators, and science enthusiasts (grades 5–10) to discover eight historic NASA machines left on the Moon, Mars, and deep space.

Rather than treating these probes as forgotten cosmic junk, **LAST WORDS** explores their final transmissions, celebrates the groundbreaking science they unlocked, and follows the hopeful horizon of future space archaeology, recycling, and heritage preservation.

Two machines on the site are **not silent**:
- **Voyager 1** is still transmitting from interstellar space, crossing the one light-day distance threshold on November 18, 2026.
- The **Apollo 11 Laser Retroreflector** still answers laser pulses from Earth observatories today with zero electrical power.

---

## 🚀 Two Exploration Modes

1. **🚀 Little Explorers (Default for First-Time Visitors):**
   - **Storybook aesthetic:** Deep indigo celestial gradients, soft glowing stars, chunky rounded shapes (24-32px radii), and warm friendly outlines.
   - **Typography:** `Fredoka` (playful headings and buttons) and `Atkinson Hyperlegible` (body). Base font size 20-24px.
   - **Original Mascot "Ping":** A friendly teal companion with radio-wave ears and a pulsing antenna who introduces each friend and shares bedtime-story reflections.
   - **Interactive Picture Books:** 6-panel stages per machine with custom animations, picture-first storytelling, and 1-2 sentence child-friendly copy.
   - **Read-Aloud Narration:** Powered by the browser Web Speech API (`speechSynthesis`) with warm pitch, gentle pace, and word tracking.
   - **Interactive WordBubbles:** Tap highlighted vocabulary (*rover, lander, dust storm, solar panel, laser, Mars day, shake sensor, nuclear battery*) for instant explanations.
   - **Instant-Feedback Picture Quizzes:** Big pillow buttons, gentle wiggles for retries, cheerful dings, and stars for correct answers. Never a failing score.
   - **Sticker Book & Confetti:** Collect 8 machine badges and 4 game medals stored in `localStorage`.
   - **Interactive Mini-Games:**
     - *Wipe the Dust* (Opportunity & InSight solar array cleaning)
     - *Fly Ingenuity* (hover inside target band to complete flights)
     - *Catch the Signal* (antenna dish radio wave collector)
     - *Moon Echo* (real-time 2.56-second round-trip laser timer)

2. **📡 Mission Control Mode (Detailed Scientific Experience):**
   - Retains 100% of the deep technical telemetry, transmission logs, Then & Now interactive sliders, scientific impact breakdowns, primary NASA citations, and educator lesson plans.
   - Upgraded with hardware illustrations (faces off), layered parallax backdrops, plain-English executive summaries, and chronological reordering.
   - Fully toggleable from the header switch or via URL demo parameters:
     - `https://last-words1.vercel.app/?mode=kids`
     - `https://last-words1.vercel.app/?mode=control`

---

## 🌟 Accessibility & Safety Features

- **Calm Mode:** A visible toggle in the header stops all non-essential animations, keyframe drifts, and sound effects; automatically activated when `prefers-reduced-motion` is detected.
- **Text Scaler (A A A):** One-click toggle between Normal (20px), Large (22px), and Extra Large (24px) base typography.
- **Privacy & Kid Safety:** Zero trackers, zero ads, zero external third-party scripts, and zero network calls. All progress is stored strictly in client-side `localStorage` wrapped in protective `try/catch` blocks.
- **Screen Reader Support:** Full story text is preserved in the DOM using `sr-only` accessibility classes. Speeches use `aria-live="off"` so screen readers are never interrupted.
- **Touch-Friendly Pillow Targets:** Minimum 64px tap targets in kid mode and 44px in Mission Control mode.

---

## 🛠️ Architecture & Component Structure

```text
src/
├── app/
│   ├── layout.tsx              # Root layout, Google Fonts (Fredoka, Atkinson, Space Grotesk, JetBrains Mono)
│   ├── page.tsx                # Dual-mode dynamic home switcher
│   ├── globals.css             # Tailwind 4, cosmic background, custom keyframe physics
│   ├── machines/[slug]/        # Dynamic route for all 8 machines
│   ├── teachers/               # Lesson plan, discussion guide & printable coloring sheets
│   └── about/                  # Methodology, source citations, image rights registry
├── components/
│   ├── Navbar.tsx              # Mode switcher, sound toggle, sticker count, skip link
│   ├── ModeSwitch.tsx          # Little Explorers / Mission Control / Calm mode / Text scaler
│   ├── ModeGate.tsx            # First-visit welcome modal
│   ├── SilenceTimeline.tsx     # Chronological (1967 - Present) signal timeline
│   ├── BuiltForLastedBar.tsx   # Engineering endurance comparison bars
│   ├── ThenNowSlider.tsx       # Interactive image comparison slider
│   ├── Quiz.tsx                # Instant-feedback mission debrief quiz
│   └── kids/
│       ├── Ping.tsx            # Animated original mascot (idle, blink, listen, cheer, wave)
│       ├── MachineIllustration.tsx # Custom inline SVGs for all 8 machines
│       ├── SceneBackdrop.tsx   # Layered parallax Moon, Mars, and Deep Space backdrops
│       ├── StoryStage.tsx      # 6-panel picture book stage
│       ├── WordBubble.tsx      # Child-friendly interactive glossary tooltips
│       ├── KidQuiz.tsx         # Picture-based 3-question quiz with instant feedback
│       ├── StickerBookModal.tsx# Explorer badge collection modal
│       └── games/
│           ├── GameModal.tsx   # Unified mini-game modal container
│           ├── WipeDustGame.tsx    # Martian solar panel wiper game
│           ├── FlyIngenuityGame.tsx# Mars rotorcraft altitude controller
│           ├── CatchSignalGame.tsx # Deep space dish signal receiver
│           └── MoonEchoGame.tsx    # 2.56-second real-time laser echo timer
├── context/
│   ├── ModeContext.tsx         # Kids vs Control mode state & URL sync
│   ├── SoundContext.tsx        # Web Audio API sound synthesis
│   ├── NarrationContext.tsx    # Web Speech API speech synthesis
│   └── StickerContext.tsx      # LocalStorage sticker management
└── data/
    ├── machines.ts             # Primary mission data & citations (8 machines)
    ├── kidStories.ts           # 6-panel seed copy, animation cues, fact references
    ├── glossaryKids.ts         # Kid vocabulary explanations
    └── types.ts                # TypeScript interfaces
```

---

## 📝 How to Add a New Machine

To add a new spacecraft or rover without breaking data validation:

1. **Add Mission Telemetry to `src/data/machines.ts`:**
   - Define a unique `slug` (e.g., `spirit`).
   - Add verified `launchISO` and `lastSignalISO` (ISO 8601 strings).
   - Provide at least 2 primary NASA source URLs starting with `http`.
   - Add `images` (`then` and `now`) with alt text, visible credit, and NASA source URL.
   - Add 3 `quiz` questions with options, 0-indexed `correctAnswer`, and scientific explanations.
   - Maintain chronological sorting by `lastSignalISO` (silent machines) followed by active machines (`still-talking` / `still-answering`).

2. **Add Kid Story to `src/data/kidStories.ts`:**
   - Add an entry keyed by `slug`.
   - Write 6 concise panels (1-2 short sentences, <= 12 words per sentence, first person).
   - Specify animation cues (`float-down`, `roll-in`, `dig`, `dust-storm`, `laser-bounce`, etc.).
   - Add a `factRef` linking to the matching entry in `whatReallyHappened`.
   - Add 3 picture-based quiz questions with fun icons.

3. **Add Illustration in `src/components/kids/MachineIllustration.tsx`:**
   - Add a branch for the machine's slug inside the SVG renderer.
   - Model the accurate hardware components (landing pads, antenna dish, solar panels, RTG booms).
   - Support `face={true}` (kids mode) and `outline={true}` (printable coloring sheets).

4. **Verify and Build:**
   ```bash
   npm run validate:data
   npm run build
   ```

---

## 🧪 Testing & Validation

```bash
# 1. Run strict fact and data validation guardrails
npm run validate:data

# 2. Compile Next.js production build & typecheck
npm run build

# 3. Capture mobile (390x844) and desktop (1440x900) test screenshots
node scripts/take-screenshots.mjs
```

---

## ⚖️ Competition & Attribution Disclaimer

*Independent student project created for the NASA Space Apps Challenge 2026. Not affiliated with or endorsed by NASA.* All imagery, data logs, and mission parameters originate from public domain NASA, JPL, and NTRS scientific archives. Full citations and rights registries are published on [/about](https://last-words1.vercel.app/about).
