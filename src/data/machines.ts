import type { Machine } from "./types.ts";

export const MACHINES: Machine[] = [
  {
    slug: "surveyor-3",
    name: "Surveyor 3",
    destination: "Moon",
    status: "silent",
    launchISO: "1967-04-17T07:05:01Z",
    lastSignalISO: "1967-05-04T00:04:00Z",
    lastSignalLabel: "First lunar nightfall",
    designed: { label: "Planned prime operations", value: 14, unit: "days" },
    actual: { label: "Operational until nightfall; visited 30 months later", value: 14, unit: "days" },
    oneLiner: "Soft-landed in a lunar crater, scooped lunar soil, and was visited by Apollo 12 astronauts 30 months later.",
    finalLog: {
      stamp: "LUNAR NIGHTFALL | 04 MAY 1967",
      lines: [
        "Touchdown confirmed inside Ocean of Storms crater.",
        "Surface sampler arm extended; scooped 7 inches into regolith.",
        "Television camera returned 6,315 frames across two weeks.",
        "The sun is dropping behind the crater rim. Battery voltage falling.",
        "Cold of the first lunar night is setting in (-250°F).",
        "Silence for 945 days until human footsteps arrive."
      ],
      endTag: "[ CONTACT TERMINATED | VISITED BY APOLLO 12 ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "20 APR 1967",
        text: "Surveyor 3 executed a soft touchdown inside a gentle crater in the Ocean of Storms after two small bounces caused by radar reflections.",
        sourceUrl: "https://science.nasa.gov/surveyor-3"
      },
      {
        dateLabel: "22 APR 1967",
        text: "The mechanical scoop made the first trenches in extraterrestrial soil, bearing down with 0.7 kg/cm² to test if Apollo astronauts would sink.",
        sourceUrl: "https://science.nasa.gov/surveyor-3"
      },
      {
        dateLabel: "04 MAY 1967",
        text: "As the lunar sun set for a two-week night of -250°F (-157°C), solar power vanished. The lander went silent as planned after returning 6,315 images.",
        sourceUrl: "https://science.nasa.gov/surveyor-3"
      },
      {
        dateLabel: "19-20 NOV 1969",
        text: "Apollo 12 astronauts Pete Conrad and Alan Bean executed a pinpoint landing ~180 meters away, walked to Surveyor 3, and recovered its TV camera and scoop.",
        sourceUrl: "https://www.nasa.gov/mission_pages/apollo/missions/apollo12.html"
      }
    ],
    science: [
      {
        idea: "Testing Soil Bearing Strength",
        result: "Proved lunar soil has compressive strength of 0.7 kg/cm², settling debates that landers would disappear into quicksand-like dust.",
        whyItMatters: "Gave NASA the confidence to build the Apollo Lunar Module landing gear without oversized snowshoes."
      },
      {
        idea: "Examining Hardware Returned from Space",
        result: "Analyzing the retrieved camera back on Earth revealed solar radiation discoloration, micrometeorite pits, and dormant Earth bacteria (Streptococcus mitis).",
        whyItMatters: "Established modern planetary protection protocols and taught engineers how cosmic rays and temperature extremes age aluminum."
      },
      {
        idea: "First Color Television from the Moon",
        result: "Using red, green, and blue color wheel filters, Surveyor sent back hundreds of reconstructed color photographs of lunar rocks.",
        whyItMatters: "Allowed geologists to study mineral composition and rock texture long before sample return missions."
      }
    ],
    tryIt: "Press the back of a spoon into loose dry flour versus damp sand. Notice how compaction changes how much weight the surface can hold!",
    images: [
      {
        src: "/images/surveyor-3/then.jpg",
        alt: "Surveyor 3 camera view of the lunar surface in Ocean of Storms, 1967",
        credit: "NASA / JPL",
        sourceUrl: "https://images.nasa.gov/details/PIA00327",
        kind: "then"
      },
      {
        src: "/images/surveyor-3/now.jpg",
        alt: "Apollo 12 astronaut Pete Conrad inspects Surveyor 3 with the Lunar Module Intrepid in the distance, November 1969",
        credit: "NASA / Apollo 12",
        sourceUrl: "https://images.nasa.gov/details/AS12-48-7133",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "What unique historic event happened to Surveyor 3 thirty months after it landed?",
        options: [
          "It unexpectedly woke up and flew back to Earth",
          "Apollo 12 astronauts walked to it and brought parts back home",
          "A meteorite completely vaporized the lander",
          "It was hit by a solar flare that restarted its radio"
        ],
        correctAnswer: 1,
        explanation: "Apollo 12 astronauts Pete Conrad and Alan Bean landed within walking distance and removed its TV camera to bring it back to Earth for analysis."
      },
      {
        q: "Why did Surveyor 3 stop transmitting on May 4, 1967?",
        options: [
          "A mechanical scoop arm snapped",
          "The first two-week-long lunar night began, cutting off solar power",
          "Mission Control accidentally lost its radio frequency",
          "It ran out of rocket propellant"
        ],
        correctAnswer: 1,
        explanation: "Without radioactive heating units, the extreme -250°F cold and lack of sunlight during the two-week lunar night drained its battery."
      },
      {
        q: "How many television images did Surveyor 3 beam back to Earth?",
        options: ["About 6,315 images", "Only 12 images", "Over 1,000,000 images", "Zero images"],
        correctAnswer: 0,
        explanation: "Surveyor 3 returned 6,315 television pictures between April 20 and May 3, 1967, providing critical reconnaissance for Apollo."
      }
    ],
    sources: [
      { label: "NASA Science - Surveyor 3 Mission", url: "https://science.nasa.gov/surveyor-3" },
      { label: "NASA Apollo 12 Lunar Encore", url: "https://www.nasa.gov/humans-in-space/lunar-encore-leads-to-first-precision-extraterrestrial-landing" },
      { label: "NASA Mission Pages - Apollo 12", url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo12.html" }
    ],
    footnotes: [
      "Soft-landed Apr 20, 1967 UTC (Apr 19 US local time). Apollo 12 LM Intrepid landed 180 m away; LRO measurements refine distance to 538 ft.",
      "Described by NASA historians as the first human-made hardware retrieved and returned to Earth from another planetary body."
    ]
  },
  {
    slug: "apollo-17-alsep",
    name: "Apollo 17 ALSEP",
    destination: "Moon",
    status: "silent",
    launchISO: "1972-12-07T05:33:00Z",
    lastSignalISO: "1977-09-30T22:14:00Z",
    lastSignalLabel: "Commanded shutdown by Mission Control",
    designed: { label: "Apollo 17 station designed life", value: 2, unit: "years" },
    actual: { label: "Continuous science telemetry", value: 4.8, unit: "years" },
    oneLiner: "Nuclear-powered science station that listened to moonquakes until Houston sent the command to turn it off.",
    finalLog: {
      stamp: "GROUND TRANSMISSION | 30 SEP 1977",
      lines: [
        "Radioisotope generator stable at Taurus-Littrow for 1,753 days.",
        "Seismometer array recording lunar thermal expansion cracks.",
        "Telemetry stream processing continuous solar wind data.",
        "Incoming transmission from Houston Mission Control:",
        "'All stations: Execute final engineering termination command.'",
        "Transmitters de-energized. The Moon's first seismic network rests."
      ],
      endTag: "[ COMMAND RECEIVED: PERMANENT SHUTDOWN ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "12 DEC 1972",
        text: "Astronauts Eugene Cernan and Harrison Schmitt deployed the Apollo 17 ALSEP package in Taurus-Littrow, powered by a SNAP-27 plutonium RTG.",
        sourceUrl: "https://ntrs.nasa.gov/citations/19790014808"
      },
      {
        dateLabel: "1972-1977",
        text: "The network of five stations (Apollo 12, 14, 15, 16, 17) operated simultaneously, triangulating moonquakes, solar wind ion fluxes, and lunar heat flow.",
        sourceUrl: "https://ntrs.nasa.gov/citations/19790014808"
      },
      {
        dateLabel: "30 SEP 1977",
        text: "Due to Congressional budget cutbacks and shifting priorities, Mission Control sent a radio command instructing all stations to deactivate transmitters.",
        sourceUrl: "https://www.nasa.gov/history/alsj-and-afj/"
      }
    ],
    science: [
      {
        idea: "Listening for Moonquakes",
        result: "Recorded over 12,000 seismic events, proving the Moon is not geologically dead and experiences deep tidal quakes caused by Earth's gravity.",
        whyItMatters: "Revealed that the Moon has a rigid lithosphere ~1,000 km thick and a partially molten interior core."
      },
      {
        idea: "Measuring Lunar Heat Flow",
        result: "Probes drilled into the lunar surface measured heat escaping from the interior, calculating radioactive decay levels inside the crust.",
        whyItMatters: "Provided the thermal constraints necessary to reconstruct how the Moon crystallized after the Giant Impact."
      },
      {
        idea: "Direct Solar Wind Monitoring",
        result: "Captured unshielded solar wind particles striking the lunar surface with zero atmospheric attenuation.",
        whyItMatters: "Helped space physicists understand solar flare cycles and the space weathering of regolith grains."
      }
    ],
    tryIt: "Tap a sturdy table with a fingernail while resting your ear against the table. Notice how vibrations travel far more clearly through solid material than through air!",
    images: [
      {
        src: "/images/apollo-17-alsep/then.jpg",
        alt: "Apollo 17 astronaut deploys the ALSEP science station at Taurus-Littrow, December 1972",
        credit: "NASA / Apollo 17",
        sourceUrl: "https://images.nasa.gov/details/as17-147-22548",
        kind: "then"
      },
      {
        src: "/images/apollo-17-alsep/now.jpg",
        alt: "LRO high-resolution orbital view of the Apollo 17 landing site showing ALSEP package and astronaut tracks",
        credit: "NASA / GSFC / Arizona State University",
        sourceUrl: "https://images.nasa.gov/details/PIA13543",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "Why did the Apollo 17 ALSEP station stop sending data on September 30, 1977?",
        options: [
          "It was hit by a large meteoroid",
          "Mission Control sent a shutdown command due to budget cuts",
          "Its nuclear fuel completely vanished",
          "Astronauts remotely reclaimed it"
        ],
        correctAnswer: 1,
        explanation: "The ALSEP stations were still operating and returning valuable scientific telemetry when NASA had to send a shutdown command due to funding cuts."
      },
      {
        q: "What source of energy kept the Apollo 12-17 ALSEP stations alive through freezing two-week lunar nights?",
        options: [
          "Large chemical alkaline batteries",
          "Plutonium-fueled SNAP-27 radioisotope generators (RTGs)",
          "Solar panels with glass covers",
          "Geothermal steam vents"
        ],
        correctAnswer: 1,
        explanation: "SNAP-27 RTGs used the decay heat of plutonium-238 to generate steady electrical power regardless of sunlight or lunar night."
      },
      {
        q: "What major discovery did ALSEP seismometers make about the Moon?",
        options: [
          "The Moon has rushing underground rivers",
          "The Moon is not geologically dead and has thousands of moonquakes",
          "The Moon is completely hollow inside",
          "The Moon is expanding by 10 kilometers a year"
        ],
        correctAnswer: 1,
        explanation: "ALSEP recorded over 12,000 seismic events, proving the Moon experiences tidal moonquakes and shallow tectonic tremors."
      }
    ],
    sources: [
      { label: "NASA Technical Reports - ALSEP Termination Report", url: "https://ntrs.nasa.gov/citations/19790014808" },
      { label: "Apollo Lunar Surface Journal - ALSEP", url: "https://www.nasa.gov/history/alsj-and-afj/" }
    ],
    footnotes: [
      "Shutdown command was issued at 22:14 UTC on Sept 30, 1977. Several instruments could have continued operating for years if operations funding continued."
    ]
  },
  {
    slug: "apollo-11-laser-reflector",
    name: "Apollo 11 Laser Retroreflector",
    destination: "Moon",
    status: "still-answering",
    launchISO: "1969-07-16T13:32:00Z",
    lastSignalLabel: "Continuously answering laser pulses from Earth",
    designed: { label: "Nominal operational lifetime", value: 10, unit: "years" },
    actual: { label: "Still operational today (Passive reflection)", value: 57, unit: "years" },
    oneLiner: "A zero-power mirror array left on the Sea of Tranquility that bounces pulses from Earth to measure the Moon's drift.",
    finalLog: {
      stamp: "TRANQUILITY BASE | STILL ACTIVE",
      lines: [
        "Placed by Armstrong and Aldrin on Mare Tranquillitatis regolith.",
        "One hundred corner-cube quartz prisms facing the sky.",
        "No batteries. No electronics. No moving parts.",
        "Telescopes in Texas, France, and Hawaii fire green photons.",
        "Two and a half seconds later, solitary photons return home.",
        "I never speak. I only answer."
      ],
      endTag: "[ ECHO CONFIRMED | CONTINUOUS RETROREFLECTION ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "21 JUL 1969",
        text: "Buzz Aldrin leveled and oriented the Laser Ranging Retroreflector (LRRR) array about 14 meters south of the Eagle Lunar Module.",
        sourceUrl: "https://science.nasa.gov/solar-system/moon/laser-reflector/"
      },
      {
        dateLabel: "01 AUG 1969",
        text: "Lick Observatory in California scored the first successful return pulses, timing round-trip laser echoes to calculate distance to within meters.",
        sourceUrl: "https://science.nasa.gov/solar-system/moon/laser-reflector/"
      },
      {
        dateLabel: "1969-PRESENT",
        text: "Ground observatories continue firing laser pulses weekly. Modern timing achieves millimeter precision, monitoring lunar orbit variations across decades.",
        sourceUrl: "https://www.nasa.gov/history/alsj/a11/a11.html"
      }
    ],
    science: [
      {
        idea: "Measuring the Earth-Moon Distance",
        result: "Calculates the average 384,400 km Earth-Moon distance down to a few millimeters by timing round-trip photons traveling at 300,000 km/s.",
        whyItMatters: "Discovered that tidal friction causes the Moon to spiral outward away from Earth by 3.8 centimeters (1.5 inches) every year."
      },
      {
        idea: "Testing Einstein's General Relativity",
        result: "Verified the Equivalence Principle (that Earth and the Moon fall toward the Sun at identical accelerations regardless of composition) to 1 part in 10^13.",
        whyItMatters: "Provides one of the most stringent experimental confirmations of Einstein's gravitational theory in the solar system."
      },
      {
        idea: "Zero-Power Longevity",
        result: "Operates 57+ years with zero power consumption using passive corner-cube prisms that bounce light back at exactly the incidence angle.",
        whyItMatters: "Proves that passive physical design can outlast active mechanical electronics by generations."
      }
    ],
    tryIt: "Hold a bicycle reflector up in a dark room and shine a small flashlight from next to your nose. Notice how bright it appears because the corner cubes reflect directly back to the source!",
    images: [
      {
        src: "/images/apollo-11-laser-reflector/then.jpg",
        alt: "Buzz Aldrin sets up the Early Apollo Scientific Experiments Package containing the Laser Ranging Retroreflector, July 1969",
        credit: "NASA / Neil Armstrong",
        sourceUrl: "https://images.nasa.gov/details/as11-40-5952",
        kind: "then"
      },
      {
        src: "/images/apollo-11-laser-reflector/now.jpg",
        alt: "Green laser pulses directed from Earth observatory toward the Moon retroreflectors",
        credit: "NASA / Goddard Space Flight Center",
        sourceUrl: "https://images.nasa.gov/details/PIA13915",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "How does the Apollo 11 Laser Retroreflector send signals back to Earth?",
        options: [
          "A nuclear radio transmitter sends high-frequency microwave bursts",
          "It does not transmit; it passively bounces laser beams shot from Earth back to their source",
          "Solar panels power flashing LED beacons visible from Earth",
          "It uses a satellite uplink through the Lunar Reconnaissance Orbiter"
        ],
        correctAnswer: 1,
        explanation: "The retroreflector has no electronics or power supply; it consists of 100 quartz corner-cubes that bounce incoming lasers directly back to Earth."
      },
      {
        q: "What startling discovery did laser ranging make about the Moon's orbit?",
        options: [
          "The Moon is falling towards Earth and will collide in 100 years",
          "The Moon is spiraling away from Earth at about 3.8 cm (1.5 in) per year",
          "The Moon stops orbiting during solar eclipses",
          "The Moon is completely stationary in space"
        ],
        correctAnswer: 1,
        explanation: "Tidal friction transfers rotational energy from Earth to the Moon, pushing its orbit outward by about 3.8 centimeters annually."
      },
      {
        q: "Which other Apollo missions also left working laser retroreflectors on the Moon?",
        options: [
          "Apollo 14 and Apollo 15",
          "Apollo 7 and Apollo 8",
          "Apollo 13 only",
          "None, Apollo 11 was the only one"
        ],
        correctAnswer: 0,
        explanation: "Apollo 14 and Apollo 15 also deployed laser retroreflectors. The Apollo 15 array is three times larger and is the most frequently targeted."
      }
    ],
    sources: [
      { label: "NASA Science - Apollo Lunar Laser Ranging", url: "https://science.nasa.gov/solar-system/moon/laser-reflector/" },
      { label: "Apollo Lunar Surface Journal - Apollo 11", url: "https://www.nasa.gov/history/alsj/a11/a11.html" }
    ],
    footnotes: [
      "Apollo 11, 14, and 15 retroreflectors, along with Soviet Lunokhod 1 and 2 reflectors, comprise the international Lunar Laser Ranging network."
    ]
  },
  {
    slug: "opportunity",
    name: "Opportunity (MER-B)",
    destination: "Mars",
    status: "silent",
    launchISO: "2003-07-07T03:18:15Z",
    lastSignalISO: "2018-06-10T12:00:00Z",
    lastSignalLabel: "Sol 5111 planet-wide dust storm",
    designed: { label: "Nominal prime mission", value: 90, unit: "sols" },
    actual: { label: "Total sols driven across Mars", value: 5111, unit: "sols" },
    oneLiner: "The marathon rover that found definitive evidence of ancient Martian water and lasted 55 times its design life.",
    finalLog: {
      stamp: "SOL 5111 | 10 JUN 2018",
      lines: [
        "The sky is going dark at noon across Perseverance Valley.",
        "Atmospheric opacity tau exceeding 10.8 — daylight blocked.",
        "Solar array output drops below critical survival threshold.",
        "Transmitting final sub-frame image: pitch black sky.",
        "Planned: 90 sols. Completed: 5,111 sols and 45.16 km.",
        "Entering deep sleep mode to conserve remaining battery."
      ],
      endTag: "[ SIGNAL LOST | OPY RESTS IN PERSEVERANCE VALLEY ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "24 JAN 2004",
        text: "Opportunity landed inside Eagle Crater at Meridiani Planum, scoring an interplanetary 'hole-in-one' into exposed layered bedrock.",
        sourceUrl: "https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer/"
      },
      {
        dateLabel: "10 JUN 2018",
        text: "A planet-encircling dust storm blocked over 99% of sunlight over Endeavour Crater. Opportunity sent its final telemetry reading on Sol 5111.",
        sourceUrl: "https://science.nasa.gov/mission/mer-opportunity/"
      },
      {
        dateLabel: "12-13 FEB 2019",
        text: "Engineers transmitted over 1,000 recovery commands over 8 months. After a final wake-up song played in Mission Control, NASA declared the mission complete.",
        sourceUrl: "https://mars.nasa.gov/mer/"
      }
    ],
    science: [
      {
        idea: "Hunting for Ancient Liquid Water",
        result: "Discovered microscopic hematite spherules ('blueberries') and sulfate-rich mineral veins that could only form in persistent, acidic liquid groundwater.",
        whyItMatters: "Proved beyond doubt that ancient Mars had liquid surface water and was once hospitable to microbial life."
      },
      {
        idea: "Interplanetary Off-Road Driving",
        result: "Drove 45.16 kilometers (28.06 miles), completing the first extraterrestrial marathon and climbing treacherous 32-degree crater slopes.",
        whyItMatters: "Established navigation algorithms, hazard avoidance, and autonomous driving techniques used by Curiosity and Perseverance."
      },
      {
        idea: "Surviving Beyond Design Limits",
        result: "Operated 14.5 Earth years on a 90-sol design, aided by lucky 'cleaning events' where Martian wind gusts blew dust off solar panels.",
        whyItMatters: "Taught NASA engineers the dynamics of Martian dust devils and seasonal wind patterns."
      }
    ],
    tryIt: "Take a magnifying glass to coarse beach sand or soil to look for rounded pebbles shaped by ancient water currents!",
    images: [
      {
        src: "/images/opportunity/then.jpg",
        alt: "Opportunity rover clean panoramic view on the rim of Endeavour Crater",
        credit: "NASA / JPL-Caltech / Cornell / ASU",
        sourceUrl: "https://images.nasa.gov/details/PIA18596",
        kind: "then"
      },
      {
        src: "/images/opportunity/now.jpg",
        alt: "Mars Reconnaissance Orbiter HiRISE image spotting Opportunity in Perseverance Valley during the 2018 dust storm",
        credit: "NASA / JPL-Caltech / Univ. of Arizona",
        sourceUrl: "https://images.nasa.gov/details/PIA22228",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "What geological feature did Opportunity discover in Eagle Crater that proved water once flowed on Mars?",
        options: [
          "Glacial ice sheets under the sand",
          "Tiny iron-rich hematite spherules nicknamed 'blueberries'",
          "Fossilized sea shells",
          "Active hot water geysers"
        ],
        correctAnswer: 1,
        explanation: "The hematite 'blueberries' were concretions that formed when groundwater soaked through porous rock billions of years ago."
      },
      {
        q: "How many sols was Opportunity originally designed to operate on Mars?",
        options: ["10,000 sols", "90 sols", "5,111 sols", "1 sol"],
        correctAnswer: 1,
        explanation: "Opportunity was planned for a 90-sol prime mission (~3 months), but survived for 5,111 sols (over 14.5 Earth years)."
      },
      {
        q: "What caused Opportunity's final transmission on Sol 5111?",
        options: [
          "A catastrophic wheel motor explosion",
          "A massive, planet-encircling Martian dust storm that starved its solar panels",
          "It drove off a sheer cliff into Victoria Crater",
          "A software bug erased its operating system"
        ],
        correctAnswer: 1,
        explanation: "The June 2018 dust storm was one of the thickest ever recorded, blocking sunlight and depleting its batteries."
      }
    ],
    sources: [
      { label: "JPL Mission Page - Opportunity MER", url: "https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer/" },
      { label: "NASA Science - Opportunity Mission Overview", url: "https://science.nasa.gov/mission/mer-opportunity/" },
      { label: "NASA Mars Exploration - MER Opportunity", url: "https://mars.nasa.gov/mer/" }
    ],
    footnotes: [
      "The widely circulated phrase 'My battery is low and it's getting dark' was a poetic journalist summary by Jacob Margolis translating two engineering data points: battery state of charge dropping below survival and optical depth (tau) exceeding 10.8.",
      "Final transmission received June 10, 2018. Official mission conclusion declared Feb 13, 2019 after 1,000+ recovery attempts."
    ]
  },
  {
    slug: "insight",
    name: "InSight Lander",
    destination: "Mars",
    status: "silent",
    launchISO: "2018-05-05T11:05:00Z",
    lastSignalISO: "2022-12-15T15:30:00Z",
    lastSignalLabel: "Solar array dust starvation",
    designed: { label: "Nominal prime science mission", value: 708, unit: "sols" },
    actual: { label: "Total sols operating on Mars", value: 1445, unit: "sols" },
    oneLiner: "Mars's planetary physician that placed the first seismometer to listen to the planet's heartbeat and internal layers.",
    finalLog: {
      stamp: "SOL 1445 | 15 DEC 2022",
      lines: [
        "Martian dust blankets both circular solar arrays.",
        "Power output drops from 5,000 watt-hours to under 300.",
        "SEIS seismometer powered down after detecting 1,319 marsquakes.",
        "Final engineering frames uploaded to Odyssey orbiter relay.",
        "Two consecutive passes missed. Transmitter shuts down safely.",
        "Elysium Planitia winds blow softly across the dome."
      ],
      endTag: "[ POWER EXHAUSTED | IN SILENT DRIFT ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "26 NOV 2018",
        text: "InSight touched down smoothly on the flat volcanic plains of Elysium Planitia and deployed its robotic arm to set SEIS on the ground.",
        sourceUrl: "https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science"
      },
      {
        dateLabel: "24 APR 2022",
        text: "InSight took its final complete selfie on Sol 1211, showing its circular solar arrays nearly obscured under a thick blanket of reddish dust.",
        sourceUrl: "https://mars.nasa.gov/insight/"
      },
      {
        dateLabel: "15-21 DEC 2022",
        text: "After sending its final data packet on Dec 15, InSight missed two scheduled communications with the Mars Reconnaissance Orbiter. NASA retired the mission Dec 21.",
        sourceUrl: "https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science"
      }
    ],
    science: [
      {
        idea: "Taking Mars's Pulse (Seismology)",
        result: "Detected 1,319 marsquakes, including a magnitude 5 monster on May 4, 2022, proving Mars is seismically active.",
        whyItMatters: "Allowed scientists to map the crust thickness (24–72 km), mantle, and large molten liquid iron-nickel core (~1,830 km radius)."
      },
      {
        idea: "Tracking Meteoroid Impacts",
        result: "Recorded seismic vibrations from a meteoroid strike on Dec 24, 2021; orbital images showed the impact crater excavated boulder-sized chunks of pure water ice.",
        whyItMatters: "Discovered subsurface water ice much closer to the warm Martian equator than previously thought possible."
      },
      {
        idea: "Atmospheric Weather Station",
        result: "Continuous pressure, temperature, and wind sensors recorded thousands of passing dust devils whistling across the sensor dome.",
        whyItMatters: "Provided high-fidelity atmospheric data to model dust storm genesis across Mars."
      }
    ],
    tryIt: "Use a voice memo app on a phone placed flat on a table while gently tapping your finger a few feet away. Watch the waveform jump from the acoustic vibration through the solid wood!",
    images: [
      {
        src: "/images/insight/then.jpg",
        alt: "InSight lander fresh on Mars in December 2018 with clean solar panels",
        credit: "NASA / JPL-Caltech",
        sourceUrl: "https://images.nasa.gov/details/PIA22874",
        kind: "then"
      },
      {
        src: "/images/insight/now.jpg",
        alt: "InSight lander covered in thick reddish Martian dust in its final April 2022 selfie (Sol 1211)",
        credit: "NASA / JPL-Caltech",
        sourceUrl: "https://images.nasa.gov/details/PIA25287",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "What main science instrument did InSight place directly onto the ground with its robotic arm?",
        options: [
          "A laser rock vaporizer",
          "An ultra-sensitive dome-shielded seismometer (SEIS)",
          "A miniature helicopter launch pad",
          "A drill to look for Martian fossils"
        ],
        correctAnswer: 1,
        explanation: "InSight used its arm to place the SEIS seismometer on the ground and covered it with a wind and thermal shield to listen for interior quakes."
      },
      {
        q: "What ultimately caused InSight's power to drop to zero?",
        options: [
          "A software crash in the radio transmitter",
          "Martian dust slowly accumulating on its solar panels over 4 years",
          "A boulder rolled over the lander",
          "A solar flare burned out the computer"
        ],
        correctAnswer: 1,
        explanation: "Without cleaning winds, dust gradually reduced its power generation from 5,000 watt-hours per sol to under 300 watt-hours."
      },
      {
        q: "What did a meteoroid impact detected by InSight's seismometer uncover on the Martian surface?",
        options: [
          "A river of molten lava",
          "Boulder-sized chunks of pure subsurface water ice",
          "A cache of meteorite diamonds",
          "Alien machine parts"
        ],
        correctAnswer: 1,
        explanation: "Seismic waves led orbital cameras to a fresh crater that excavated pure water ice near the equator."
      }
    ],
    sources: [
      { label: "NASA JPL - InSight Mission Retirement", url: "https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science" },
      { label: "NASA Science - InSight Overview", url: "https://mars.nasa.gov/insight/" }
    ],
    footnotes: [
      "Last communication occurred on Dec 15, 2022. NASA officially concluded operations on Dec 21, 2022 after two missed communication cycles."
    ]
  },
  {
    slug: "ingenuity",
    name: "Ingenuity (Mars Helicopter)",
    destination: "Mars",
    status: "silent",
    launchISO: "2020-07-30T11:50:00Z",
    lastSignalISO: "2024-01-18T16:00:00Z",
    lastSignalLabel: "Flight 72 rotor tip fracture",
    designed: { label: "Planned technology demo flights", value: 5, unit: "flights" },
    actual: { label: "Total successful aerial flights", value: 72, unit: "flights" },
    oneLiner: "The 4-pound rotorcraft that made humanity's first powered flight on another planet and flew 14 times further than planned.",
    finalLog: {
      stamp: "FLIGHT 72 | 18 JAN 2024",
      lines: [
        "Ascended 12 meters into the thin carbon dioxide air.",
        "Hovering over featureless sand ripples in Jezero Crater.",
        "Telemetry drops during descent; emergency landing executed.",
        "Shadow from shadow-cam reveals fractured carbon-fiber blade tip.",
        "Planned: 5 short flights. Achieved: 72 flights, 129 minutes aloft.",
        "Upright and stable on Valinor Hills airfield."
      ],
      endTag: "[ ROTOR SAFE | FINAL AIRFIELD CHI ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "19 APR 2021",
        text: "Ingenuity made aviation history by taking off, hovering at 3 meters, and landing in Jezero Crater — humanity's first powered flight on another planet.",
        sourceUrl: "https://science.nasa.gov/mission/ingenuity/"
      },
      {
        dateLabel: "18 JAN 2024",
        text: "During Flight 72, a quick pop-up test to 12 meters, navigation cameras lost track over bland sand dunes. Communications dropped before touchdown.",
        sourceUrl: "https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends"
      },
      {
        dateLabel: "25 JAN 2024",
        text: "Perseverance relayed a shadow-camera image confirming one rotor tip had fractured. NASA announced the conclusion of its flight mission.",
        sourceUrl: "https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends"
      }
    ],
    science: [
      {
        idea: "Aerodynamic Flight in Ultra-Thin Air",
        result: "Spun counter-rotating carbon-fiber blades at 2,400–2,900 RPM to generate lift in an atmosphere less than 1% as dense as Earth's.",
        whyItMatters: "Proved that aerodynamic exploration of other worlds with atmospheres (like Mars and Saturn's moon Titan) is completely feasible."
      },
      {
        idea: "Aerial Scouting for Rovers",
        result: "Acted as an advance scout for Perseverance, mapping traversable sand channels and rocky hazards from 40 feet in the air.",
        whyItMatters: "Doubled the driving pace of Perseverance by ruling out dead-end rocky outcrops in advance."
      },
      {
        idea: "Extreme Thermal Resilience",
        result: "Survived over 1,000 sub-zero Martian nights (-130°F / -90°C) using small onboard foil heaters and a solar-charged lithium-ion battery.",
        whyItMatters: "Proved off-the-shelf consumer electronic chips (Snapdragon processor) can survive space radiation."
      }
    ],
    tryIt: "Wave a wide piece of cardboard through the air. You can feel the air resistance. In Mars's thin atmosphere, you would need to wave it ten times faster to feel that same resistance!",
    images: [
      {
        src: "/images/ingenuity/then.jpg",
        alt: "Ingenuity Mars Helicopter standing on its landing legs in Jezero Crater before its historic first flight",
        credit: "NASA / JPL-Caltech",
        sourceUrl: "https://images.nasa.gov/details/PIA24495",
        kind: "then"
      },
      {
        src: "/images/ingenuity/now.jpg",
        alt: "Ingenuity navigation camera view after Flight 72 showing the broken shadow tip of a damaged rotor blade",
        credit: "NASA / JPL-Caltech",
        sourceUrl: "https://images.nasa.gov/details/PIA26244",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "What historic artifact did Ingenuity carry beneath its solar panel?",
        options: [
          "A tiny swatch of muslin fabric from the Wright Brothers' 1903 Flyer",
          "A small moon rock from Apollo 11",
          "A miniature golden phonograph record",
          "An original drawing by Leonardo da Vinci"
        ],
        correctAnswer: 0,
        explanation: "NASA engineers affixed a postage-stamp-sized piece of fabric from the Wright Brothers' 1903 Flyer wing to honor aviation history."
      },
      {
        q: "How many flights was Ingenuity originally planned to attempt in its 30-day technology demonstration?",
        options: ["72 flights", "5 flights", "1 flight", "100 flights"],
        correctAnswer: 1,
        explanation: "Ingenuity was built as a high-risk technology demo planned for just 5 flights, but succeeded in completing 72 flights over nearly 3 years."
      },
      {
        q: "Why did Ingenuity's rotor blades have to spin at nearly 2,900 revolutions per minute?",
        options: [
          "To escape Mars's gravitational pull",
          "Because Mars's atmosphere is less than 1% as dense as Earth's, requiring immense blade speed to create lift",
          "To drill into Martian rocks from the air",
          "To blow dust away from Perseverance"
        ],
        correctAnswer: 1,
        explanation: "Mars's atmospheric pressure at the surface is equivalent to Earth at 100,000 feet altitude; fast-spinning blades are required to generate lift."
      }
    ],
    sources: [
      { label: "NASA JPL - Ingenuity Mission Conclusion", url: "https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends" },
      { label: "NASA Science - Mars Helicopter Overview", url: "https://science.nasa.gov/mission/ingenuity/" }
    ],
    footnotes: [
      "Weighed approximately 1.8 kilograms (4.0 pounds) on Earth, and only 0.68 kilograms (1.5 pounds) in Mars's gravity.",
      "Flight 72 occurred Jan 18, 2024; mission retirement officially announced Jan 25, 2024. The helicopter remains upright at Airfield Chi."
    ]
  },
  {
    slug: "pioneer-10",
    name: "Pioneer 10",
    destination: "Deep space",
    status: "silent",
    launchISO: "1972-03-02T01:49:04Z",
    lastSignalISO: "2003-01-23T05:07:00Z",
    lastSignalLabel: "RTG nuclear decay threshold",
    designed: { label: "Jupiter flyby prime mission", value: 21, unit: "months" },
    actual: { label: "Deep space transmission lifetime", value: 370, unit: "months" },
    oneLiner: "First explorer through the Asteroid Belt and first to Jupiter, now coasting silently toward the star Aldebaran.",
    finalLog: {
      stamp: "7.6 BILLION MILES | 23 JAN 2003",
      lines: [
        "Distance from Sun: 12.2 billion km. One-way light time: 11h 20m.",
        "Radioisotope generators fading below transmitter voltage threshold.",
        "Madrid 70-meter dish detects a very faint carrier signal.",
        "Last telemetry received without sufficient power to modulate data.",
        "Pioneer Plaque facing interstellar vacuum.",
        "Course steady toward Aldebaran in the constellation Taurus."
      ],
      endTag: "[ CARRIER FADED | SILENT INTERSTELLAR VOYAGE ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "15 JUL 1972",
        text: "Pioneer 10 entered the Asteroid Belt between Mars and Jupiter, proving that debris density was far lower than feared and spacecraft could pass safely.",
        sourceUrl: "https://science.nasa.gov/mission/pioneer-10"
      },
      {
        dateLabel: "03 DEC 1973",
        text: "Passed within 130,000 km of Jupiter's cloud tops, taking the first close-up pictures of the Great Red Spot and mapping radiation belts.",
        sourceUrl: "https://www.nasa.gov/feature/45-years-ago-pioneer-10-first-to-explore-jupiter"
      },
      {
        dateLabel: "23 JAN 2003",
        text: "NASA's Deep Space Network in Madrid detected the final whisper from Pioneer 10 at a distance of 12.23 billion km (7.6 billion miles).",
        sourceUrl: "https://science.nasa.gov/mission/pioneer-10"
      }
    ],
    science: [
      {
        idea: "Asteroid Belt Navigation Feasibility",
        result: "Proved that the asteroid belt is mostly empty space and does not contain impenetrable curtains of dust.",
        whyItMatters: "Cleared the path for every subsequent outer solar system mission, including Voyager 1 and 2, Galileo, Cassini, and New Horizons."
      },
      {
        idea: "First In-Situ Jupiter Radiation Mapping",
        result: "Discovered Jupiter's magnetic field is millions of times stronger than Earth's and has intense trapped radiation belts.",
        whyItMatters: "Forced engineers to heavily radiation-harden all future Jupiter orbiters like Galileo and Juno."
      },
      {
        idea: "Deep Space Nuclear Longevity",
        result: "Operated on four SNAP-19 radioisotope thermoelectric generators for over 30 years past its 21-month planned lifetime.",
        whyItMatters: "Demonstrated the viability of nuclear decay power for interstellar probe missions."
      }
    ],
    tryIt: "Calculate how long it takes a radio message to travel across your room vs across the solar system (at the speed of light, 300,000 km/s)!",
    images: [
      {
        src: "/images/pioneer-10/then.jpg",
        alt: "Pioneer 10 with the iconic gold-anodized aluminum message plaque attached prior to launch, 1972",
        credit: "NASA Ames Research Center",
        sourceUrl: "https://images.nasa.gov/details/AC72-1542",
        kind: "then"
      },
      {
        src: "/images/pioneer-10/now.jpg",
        alt: "Historic close-up view of Jupiter taken by Pioneer 10 in December 1973",
        credit: "NASA / Ames Research Center",
        sourceUrl: "https://images.nasa.gov/details/PIA01403",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "What message for potential extraterrestrial finders does Pioneer 10 carry on its chassis?",
        options: [
          "A gold-anodized aluminum pictorial plaque designed by Carl Sagan and Frank Drake",
          "A digital flash drive with Wikipedia",
          "A brass key to the United Nations headquarters",
          "A paper encyclopedia"
        ],
        correctAnswer: 0,
        explanation: "Pioneer 10 carries a gold-anodized plaque depicting human figures, the hydrogen atom transition, and our solar system's location relative to 14 pulsars."
      },
      {
        q: "Which major celestial landmark did Pioneer 10 become the first human-made object to cross in 1972?",
        options: [
          "The Asteroid Belt between Mars and Jupiter",
          "The Oort Cloud",
          "The rings of Saturn",
          "The Kuiper Belt"
        ],
        correctAnswer: 0,
        explanation: "Pioneer 10 proved spacecraft could safely navigate through the asteroid belt without colliding with debris."
      },
      {
        q: "Toward which bright red giant star is Pioneer 10 currently coasting in the constellation Taurus?",
        options: ["Aldebaran", "Polaris (North Star)", "Betelgeuse", "Sirius"],
        correctAnswer: 0,
        explanation: "Pioneer 10 will take more than two million years to reach the vicinity of the red giant star Aldebaran."
      }
    ],
    sources: [
      { label: "NASA Science - Pioneer 10 Overview", url: "https://science.nasa.gov/mission/pioneer-10" },
      { label: "NASA Features - 45 Years Ago: Pioneer 10", url: "https://www.nasa.gov/feature/45-years-ago-pioneer-10-first-to-explore-jupiter" }
    ],
    footnotes: [
      "Last signal received Jan 23, 2003 UTC. Some local station logs recorded Jan 22 due to US local time difference.",
      "The final signal required 11 hours and 20 minutes to cross the 12.23 billion kilometer expanse to Earth."
    ]
  },
  {
    slug: "voyager-1",
    name: "Voyager 1",
    destination: "Deep space",
    status: "still-talking",
    launchISO: "1977-09-05T12:56:00Z",
    lastSignalLabel: "Active interstellar transmission (2-way delay > 46 hours)",
    designed: { label: "Jupiter and Saturn flyby mission", value: 4, unit: "years" },
    actual: { label: "Continuous interstellar flight", value: 49, unit: "years" },
    oneLiner: "Humanity's most distant emissary, now cruising interstellar space beyond the sun and reaching one light-day from Earth in 2026.",
    finalLog: {
      stamp: "INTERSTELLAR SPACE | STILL TRANSMITTING",
      lines: [
        "Over 25 billion kilometers from Earth and accelerating outward.",
        "Crossed heliopause into pristine interstellar medium in 2012.",
        "Cosmic ray and charged particle instruments retired to save watts.",
        "Magnetometer and plasma wave antennas remain awake.",
        "22-watt radio whisper crossing 23 hours of light time.",
        "Reaching one light-day from home on November 18, 2026."
      ],
      endTag: "[ SIGNAL ACTIVE | ONE LIGHT-DAY HORIZON ]"
    },
    whatReallyHappened: [
      {
        dateLabel: "25 AUG 2012",
        text: "Voyager 1 crossed the heliopause at 121 astronomical units from the Sun, becoming the first human craft to enter true interstellar space.",
        sourceUrl: "https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/"
      },
      {
        dateLabel: "NOV 2023 - APR 2024",
        text: "A corrupt chip in the flight data system caused Voyager 1 to send repeating gibberish. Engineers relocated 256 words of memory remotely, restoring science data.",
        sourceUrl: "https://www.jpl.nasa.gov/missions/voyager-1/"
      },
      {
        dateLabel: "18 NOV 2026",
        text: "Voyager 1 reaches exactly one light-day (25.9 billion km / 173.3 AU) from Earth at 10:16:07 UTC — a radio command will take 24 hours just to reach it.",
        sourceUrl: "https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/"
      }
    ],
    science: [
      {
        idea: "First In-Situ Sampling of Interstellar Space",
        result: "Directly measured the density and magnetic orientation of interstellar gas outside the Sun's heliosphere.",
        whyItMatters: "Proved galactic cosmic rays are deflected by our Sun's magnetic shield, protecting inner planetary atmospheres."
      },
      {
        idea: "The Pale Blue Dot Perspective",
        result: "Turned cameras back on Feb 14, 1990 to capture the iconic 'Family Portrait' of planets, showing Earth as a solitary speck in a sunbeam.",
        whyItMatters: "Changed humanity's philosophical perspective on our fragile oasis in the cosmic ocean."
      },
      {
        idea: "Extreme Radio Communications at Millowatt Levels",
        result: "Transmits across 25+ billion kilometers on just 22 watts (less than a refrigerator light bulb), received by Earth's 70-meter dishes.",
        whyItMatters: "Developed ultra-deep-space error correction coding, low-noise maser amplifiers, and arrayed tracking antennas."
      }
    ],
    tryIt: "Drop a pebble in a moving creek. Watch the boundary where the ripples fight the flowing current. That boundary is like the heliopause where Voyager 1 crossed into interstellar space!",
    images: [
      {
        src: "/images/voyager-1/then.jpg",
        alt: "Full-scale model of the Voyager spacecraft showing high-gain dish antenna and RTG power boom",
        credit: "NASA / JPL-Caltech",
        sourceUrl: "https://images.nasa.gov/details/PIA01391",
        kind: "then"
      },
      {
        src: "/images/voyager-1/now.jpg",
        alt: "Artist concept of Voyager 1 crossing into interstellar space beyond the solar heliosphere",
        credit: "NASA / JPL-Caltech",
        sourceUrl: "https://images.nasa.gov/details/PIA17001",
        kind: "now"
      }
    ],
    quiz: [
      {
        q: "What milestone will Voyager 1 achieve on November 18, 2026?",
        options: [
          "It will reach one light-day (25.9 billion km) from Earth",
          "It will land on Pluto",
          "Its nuclear generator will explode",
          "It will return to Earth's orbit"
        ],
        correctAnswer: 0,
        explanation: "Voyager 1 will become the first human-made object at a distance of one light-day, meaning a radio signal will take a full 24 hours to reach it."
      },
      {
        q: "Which two scientific instruments remain powered and operating on Voyager 1 today?",
        options: [
          "The color television cameras and radar altimeter",
          "The Magnetometer (MAG) and Plasma Wave Subsystem (PWS)",
          "The X-ray telescope and infrared spectrometer",
          "The robotic arm and laser drill"
        ],
        correctAnswer: 1,
        explanation: "To preserve declining electrical power from its decaying RTGs, cameras were turned off in 1990; MAG and PWS remain actively measuring interstellar magnetic fields."
      },
      {
        q: "What artifact does Voyager 1 carry for any extraterrestrial civilization that might intercept it?",
        options: [
          "The Golden Record with sounds, music, and images of Earth",
          "A solar-powered television",
          "A specimen of Earth soil and water",
          "A library of microfiche encyclopedias"
        ],
        correctAnswer: 0,
        explanation: "Voyager 1 carries the famous 12-inch gold-plated copper phonograph record curated by Carl Sagan, containing greetings in 55 languages and music from around the world."
      }
    ],
    sources: [
      { label: "NASA Science - Where Are Voyager 1 and 2 Now?", url: "https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/" },
      { label: "NASA JPL - Voyager 1 Mission Overview", url: "https://www.jpl.nasa.gov/missions/voyager-1/" }
    ],
    footnotes: [
      "Voyager 1 reaches exactly one light-day distance from Earth at 10:16:07 UTC on 2026-11-18.",
      "The spacecraft's cameras were permanently commanded off on Feb 14, 1990 after capturing the iconic 'Pale Blue Dot' portrait."
    ]
  }
];

export function getMachineBySlug(slug: string): Machine | undefined {
  return MACHINES.find(m => m.slug === slug);
}

export function getAllMachineSlugs(): string[] {
  return MACHINES.map(m => m.slug);
}
