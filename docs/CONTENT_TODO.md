# CONTENT_TODO.md — Mission Verifications & Content Audit Log

*Project: LAST WORDS v2 (NASA Space Apps Challenge 2026)*  
*Challenge: "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"*

This document logs historical telemetry audits, primary NASA source citations, and content changes implemented for v2 ("Little Explorers" edition).

---

## 1. Primary Mission Telemetry Verifications (All 8 Core Explorers)

### 1. Surveyor 3 (Moon)
- **Launch:** April 17, 1967 (07:05:01 UTC)
- **Touchdown:** April 20, 1967 inside a 200m crater in Ocean of Storms.
- **Last Signal:** May 4, 1967 (00:04 UTC) as lunar night fell. Went quiet after about two weeks when solar battery power depleted in the -250°F night.
- **Astronaut Visit:** Apollo 12 astronauts Pete Conrad and Alan Bean landed the Lunar Module *Intrepid* ~180 meters (538 ft) away on Nov 19, 1969 (about two and a half years / 30 months later) and retrieved the TV camera and soil scoop.
- **Verification sources:**
  - `https://science.nasa.gov/surveyor-3`
  - `https://www.nasa.gov/humans-in-space/lunar-encore-leads-to-first-precision-extraterrestrial-landing`
  - `https://www.nasa.gov/mission_pages/apollo/missions/apollo12.html`
- **Audit Action (F3):** Removed "14 days vs 14 days" comparison. Replaced with "Worked about two weeks, then waited about two and a half years for visitors." Replaced "cut off" with "removed its camera and scoop".

### 2. Apollo 17 ALSEP (Moon)
- **Deployment:** Dec 12, 1972 by Eugene Cernan and Harrison Schmitt at Taurus-Littrow.
- **Power Source:** SNAP-27 plutonium radioisotope thermoelectric generator (RTG).
- **Commanded Shutdown:** Sept 30, 1977 at 22:14 UTC.
- **Science telemetry:** 4.8 years of continuous seismic, solar wind, and heat flow monitoring (recording >12,000 seismic events).
- **Verification sources:**
  - NASA Technical Reports Server: `https://ntrs.nasa.gov/citations/19790014808` (ALSEP Termination Report)
  - Apollo Lunar Surface Journal: `https://www.nasa.gov/history/alsj-and-afj/`
- **Audit Action (F6b):** Corrected description to clarify that ALSEP stations ran for years until Mission Control switched them off on Sept 30, 1977, while laser retroreflectors continue to operate today.

### 3. Pioneer 10 (Deep Space)
- **Launch:** March 2, 1972 (01:49:04 UTC).
- **Firsts:** First craft to cross Asteroid Belt (July 1972); first Jupiter flyby (Dec 3, 1973).
- **Last Signal:** Jan 23, 2003 (05:07 UTC) detected by Madrid DSN dish at 12.23 billion km (7.6 billion miles / 11h 20m one-way light time).
- **Trajectory:** Coaster heading toward the red giant star Aldebaran in Taurus (arrival estimated in ~2 million years).
- **Verification sources:**
  - `https://science.nasa.gov/mission/pioneer-10`
  - `https://www.nasa.gov/feature/45-years-ago-pioneer-10-first-to-explore-jupiter`
- **Audit Action (F8):** Reordered chronologically by last signal (1967 -> 1977 -> 2003 -> 2018 -> 2022 -> 2024 -> Active).

### 4. Opportunity (MER-B) (Mars)
- **Touchdown:** Jan 24, 2004 in Eagle Crater, Meridiani Planum.
- **Design Baseline:** 90 sols (~3 Earth months).
- **Final Sol:** Sol 5111 (June 10, 2018).
- **Odometer:** 45.16 kilometers (28.06 miles) — first extraterrestrial marathon.
- **Lifespan Multiplier:** 5,111 / 90 = 56.78x (about 57 times design life).
- **Storm Physics:** June 2018 planet-encircling dust storm caused optical depth tau > 10.8, blocking >99% of sunlight over Endeavour Crater.
- **Verification sources:**
  - `https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer/`
  - `https://science.nasa.gov/mission/mer-opportunity/`
  - `https://mars.nasa.gov/mer/`
- **Audit Action (F4, F9):**
  - Updated multiplier everywhere to "about 57 times" (5,111 / 90 = 56.78). Removed "55 times".
  - Updated HiRISE orbital image (PIA22228) alt text to reflect that the photo was captured in September 2018 after the dust storm cleared.
  - Kept "Fact or Poetry?" note on Jacob Margolis's poetic summary of low battery and optical depth tau > 10.8.

### 5. InSight Lander (Mars)
- **Touchdown:** Nov 26, 2018 on Elysium Planitia volcanic plains.
- **Design Baseline:** 708 sols (1 Mars year / ~2 Earth years).
- **Final Transmission:** Dec 15, 2022 (Sol 1445). Official retirement declared Dec 21, 2022 after two missed passes.
- **Science Telemetry:** 1,319 marsquakes recorded with SEIS dome; meteoroid strike excavated pure subsurface ice chunks.
- **Verification sources:**
  - `https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science`
  - `https://mars.nasa.gov/insight/`

### 6. Ingenuity Mars Helicopter (Mars)
- **First Flight:** April 19, 2021 (humanity's first powered flight on another planet).
- **Design Baseline:** 5 technology demonstration flights in 30 days.
- **Final Flight:** Flight 72 on Jan 18, 2024. Total air time: 128.8 minutes; total distance: 17.0 km.
- **Retirement Cause:** Blade tip fracture during emergency landing on bland sand dunes at Airfield Chi.
- **Verification sources:**
  - `https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends`
  - `https://science.nasa.gov/mission/ingenuity/`

### 7. Apollo 11 Laser Retroreflector (Moon) — STILL ANSWERING
- **Placement:** July 21, 1969 by Neil Armstrong and Buzz Aldrin at Tranquility Base.
- **Design Expiration:** Completely passive (100 corner-cube quartz prisms, zero electronics or batteries). Has no designed expiration date and operates indefinitely.
- **Round-Trip Delay:** ~2.56 seconds across ~384,400 km.
- **Scientific Finding:** Proved the Moon spirals away from Earth at 3.8 cm (1.5 in) per year due to tidal friction.
- **Verification sources:**
  - `https://science.nasa.gov/solar-system/moon/laser-reflector/`
  - `https://www.nasa.gov/history/alsj/a11/a11.html`
- **Audit Action (F2):** Removed "Built for 10 years" claim. Represented as active for 57+ years with no planned expiration date.

### 8. Voyager 1 (Deep Space) — STILL TALKING
- **Launch:** Sept 5, 1977.
- **Interstellar Crossing:** Crossed the heliopause on August 25, 2012 at 121 AU.
- **Power & Tools:** Declining RTG wattage; cameras turned off in 1990 ("Pale Blue Dot"); Magnetometer (MAG) and Plasma Wave Subsystem (PWS) remain active.
- **One Light-Day Milestone:** 2026-11-18T10:16:07 UTC at distance 173.3 AU / 25.9 billion km.
- **Verification sources:**
  - `https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/`
  - `https://www.jpl.nasa.gov/missions/voyager-1/`
- **Audit Action:** Integrated date-aware countdown and text for the Nov 18, 2026 light-day horizon.

---

## 2. Policy & Future Artifacts Verification (Fix F5)

1. **PRESERVE — Lunar Heritage Sites:**
   - Sourced: 2011 NASA voluntary recommendations for protecting U.S. lunar artifacts (`https://www.nasa.gov/pdf/617743main_NASA-USG_LUNAR_HISTORIC_SITES_RevA-508.pdf`).
   - Sourced: 2020 U.S. Law *One Small Step to Protect Human Heritage in Space Act* (`https://www.govinfo.gov/content/pkg/PLAW-116publ275/html/PLAW-116publ275.htm`).
   - Deleted: Unverified claims of international buffer zones.

2. **RECYCLE — NASA LunaRecycle Challenge:**
   - Sourced: $3 million NASA prize competition run with the University of Alabama (`https://lunarecyclechallenge.ua.edu` and NASA Centennial Challenges).
   - Deleted: Inaccurate claims of melting rocket descent stages and struts into habitats.

3. **REUSE — PROMISE Lunar Rover:**
   - Sourced: NASA JPL Moon Base Transportation Technology Projects (`https://www.jpl.nasa.gov/news/nasa-awards-moon-base-transportation-technology-science-projects/`).
   - Sourced: Uses test vehicle spare parts from Curiosity and Perseverance rovers, planned for 2028.
