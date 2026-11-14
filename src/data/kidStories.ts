export interface KidPanel {
  panelIndex: number;
  cue: string;
  text: string;
  factRef: string; // Links to WhatReallyHappened
  sceneVariant?: "day" | "night" | "storm";
}

export interface KidQuizQuestion {
  question: string;
  options: {
    label: string;
    icon: string;
  }[];
  correctAnswer: number;
  funFact: string;
}

export interface KidStory {
  slug: string;
  title: string;
  destination: "Moon" | "Mars" | "Deep space";
  initialMood: "awake" | "curious" | "glow";
  finalMood: "quiet" | "sleepy" | "glow";
  isActive: boolean;
  wowFact: string;
  goodnightLine: string;
  panels: KidPanel[];
  quiz: KidQuizQuestion[];
}

export const KID_STORIES: Record<string, KidStory> = {
  "surveyor-3": {
    slug: "surveyor-3",
    title: "Surveyor 3",
    destination: "Moon",
    initialMood: "curious",
    finalMood: "quiet",
    isActive: false,
    wowFact: "Astronaut Pete Conrad walked right up to me and gave me a gentle pat in 1969!",
    goodnightLine: "Goodnight, Surveyor 3! You showed us how to land safely on the Moon.",
    panels: [
      {
        panelIndex: 1,
        cue: "float-down",
        text: "Hi! I'm Surveyor 3. I landed on the Moon in 1967.",
        factRef: "20 APR 1967",
        sceneVariant: "day",
      },
      {
        panelIndex: 2,
        cue: "photo-burst",
        text: "My camera took thousands of pictures and sent them home.",
        factRef: "20 APR 1967",
        sceneVariant: "day",
      },
      {
        panelIndex: 3,
        cue: "dig",
        text: "My little scoop dug into the Moon dust to see how strong it is.",
        factRef: "22 APR 1967",
        sceneVariant: "day",
      },
      {
        panelIndex: 4,
        cue: "sunset",
        text: "After about two weeks, I stopped talking to Earth. I stayed very still.",
        factRef: "04 MAY 1967",
        sceneVariant: "night",
      },
      {
        panelIndex: 5,
        cue: "footprints",
        text: "Two and a half years later, two astronauts walked right up to me!",
        factRef: "19-20 NOV 1969",
        sceneVariant: "day",
      },
      {
        panelIndex: 6,
        cue: "carry-home",
        text: "They took my camera and scoop home to see how the Moon changes things left outside.",
        factRef: "19-20 NOV 1969",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "Who walked up to visit Surveyor 3 on the Moon?",
        options: [
          { label: "Two Apollo astronauts", icon: "👨‍🚀" },
          { label: "A friendly alien dog", icon: "🐶" },
          { label: "A space dinosaur", icon: "🦖" },
        ],
        correctAnswer: 0,
        funFact: "Apollo 12 astronauts Pete Conrad and Alan Bean landed nearby and walked over to say hello!",
      },
      {
        question: "What did Surveyor 3 use to test the Moon's soil?",
        options: [
          { label: "A little digging scoop", icon: "🥄" },
          { label: "A giant blender", icon: "🥣" },
          { label: "A magic paintbrush", icon: "🖌️" },
        ],
        correctAnswer: 0,
        funFact: "Its mechanical arm dug trenches to see if astronauts' boots would sink in the dust.",
      },
      {
        question: "Where did Surveyor 3's camera travel after its Moon visit?",
        options: [
          { label: "Back home to Earth", icon: "🌍" },
          { label: "To the Sun", icon: "☀️" },
          { label: "Deep into a crater", icon: "🕳️" },
        ],
        correctAnswer: 0,
        funFact: "Scientists studied the camera back on Earth to learn how space radiation affects metals.",
      },
    ],
  },

  "apollo-17-alsep": {
    slug: "apollo-17-alsep",
    title: "Apollo 17 Science Station",
    destination: "Moon",
    initialMood: "curious",
    finalMood: "quiet",
    isActive: false,
    wowFact: "I listened to more than 12,000 tiny tremors deep inside the Moon!",
    goodnightLine: "Goodnight, little station! You listened to the Moon's heartbeat.",
    panels: [
      {
        panelIndex: 1,
        cue: "station-setup",
        text: "I'm a science station. Astronauts set me up on the Moon in 1972.",
        factRef: "12 DEC 1972",
        sceneVariant: "day",
      },
      {
        panelIndex: 2,
        cue: "seismic-ripple",
        text: "I listened for moonquakes and tiny space rocks hitting the Moon.",
        factRef: "1972-1977",
        sceneVariant: "night",
      },
      {
        panelIndex: 3,
        cue: "battery-glow",
        text: "A small nuclear battery gave me power.",
        factRef: "12 DEC 1972",
        sceneVariant: "night",
      },
      {
        panelIndex: 4,
        cue: "message-rings",
        text: "I sent my news to Earth for almost five years.",
        factRef: "1972-1977",
        sceneVariant: "day",
      },
      {
        panelIndex: 5,
        cue: "switch-off",
        text: "In 1977, Mission Control sent one last message: time to switch off.",
        factRef: "30 SEP 1977",
        sceneVariant: "night",
      },
      {
        panelIndex: 6,
        cue: "happy-sparkle",
        text: "Thanks to me and my friends from other Apollo trips, we learned the Moon has quakes!",
        factRef: "30 SEP 1977",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "What did the Apollo 17 station listen for on the Moon?",
        options: [
          { label: "Moonquakes and space rocks", icon: "〰️" },
          { label: "Radio pop music", icon: "🎵" },
          { label: "Whistling wind storms", icon: "🌬️" },
        ],
        correctAnswer: 0,
        funFact: "Its shake sensor felt vibrations traveling right through solid rock!",
      },
      {
        question: "What special power unit kept it warm in the dark lunar night?",
        options: [
          { label: "A small nuclear battery", icon: "🔋" },
          { label: "A campfire of Moon wood", icon: "🪵" },
          { label: "A box of AA batteries", icon: "⚡" },
        ],
        correctAnswer: 0,
        funFact: "A SNAP-27 power generator used gentle atomic heat to make electricity day and night.",
      },
      {
        question: "Why did the station stop transmitting in 1977?",
        options: [
          { label: "Mission Control told it to rest", icon: "🛑" },
          { label: "A crater swallowed it", icon: "🌋" },
          { label: "It got tired of science", icon: "😴" },
        ],
        correctAnswer: 0,
        funFact: "After nearly five years of great science, engineers sent a commanded shutdown signal from Earth.",
      },
    ],
  },

  "pioneer-10": {
    slug: "pioneer-10",
    title: "Pioneer 10",
    destination: "Deep space",
    initialMood: "awake",
    finalMood: "quiet",
    isActive: false,
    wowFact: "I am flying toward a giant red star called Aldebaran across millions of years!",
    goodnightLine: "Goodnight, Pioneer 10! Keep flying peacefully through the stars.",
    panels: [
      {
        panelIndex: 1,
        cue: "launch",
        text: "I'm Pioneer 10. I blasted off in 1972.",
        factRef: "15 JUL 1972",
        sceneVariant: "night",
      },
      {
        panelIndex: 2,
        cue: "asteroids",
        text: "I was the first spacecraft to cross the asteroid belt safely.",
        factRef: "15 JUL 1972",
        sceneVariant: "night",
      },
      {
        panelIndex: 3,
        cue: "jupiter-bands",
        text: "In 1973 I zoomed past Jupiter and took close-up pictures.",
        factRef: "03 DEC 1973",
        sceneVariant: "night",
      },
      {
        panelIndex: 4,
        cue: "plaque-shine",
        text: "I carry a metal plaque with a hello from Earth.",
        factRef: "15 JUL 1972",
        sceneVariant: "night",
      },
      {
        panelIndex: 5,
        cue: "fade-to-dot",
        text: "My signal got fainter and fainter. In 2003, I sent my last hello.",
        factRef: "23 JAN 2003",
        sceneVariant: "night",
      },
      {
        panelIndex: 6,
        cue: "star-ahead",
        text: "I'm still flying toward a star called Aldebaran. It will take a very, very long time!",
        factRef: "23 JAN 2003",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "Which giant striped planet did Pioneer 10 photograph up close?",
        options: [
          { label: "Jupiter", icon: "🪐" },
          { label: "Pluto", icon: "❄️" },
          { label: "The Moon", icon: "🌕" },
        ],
        correctAnswer: 0,
        funFact: "Pioneer 10 flew right past Jupiter's Great Red Spot in December 1973!",
      },
      {
        question: "What friendly message does Pioneer 10 carry for anyone it meets?",
        options: [
          { label: "A golden hello plaque", icon: "📜" },
          { label: "A bag of Earth candy", icon: "🍬" },
          { label: "A paper map of roads", icon: "🗺️" },
        ],
        correctAnswer: 0,
        funFact: "Carl Sagan helped design the golden plaque showing where Earth is in the galaxy.",
      },
      {
        question: "What was Pioneer 10 the first explorer to fly through safely?",
        options: [
          { label: "The rocky Asteroid Belt", icon: "☄️" },
          { label: "A cloud of laser beams", icon: "⚡" },
          { label: "A black hole", icon: "🕳️" },
        ],
        correctAnswer: 0,
        funFact: "It proved the Asteroid Belt has plenty of room to fly through without hitting rocks!",
      },
    ],
  },

  "opportunity": {
    slug: "opportunity",
    title: "Opportunity",
    destination: "Mars",
    initialMood: "awake",
    finalMood: "quiet",
    isActive: false,
    wowFact: "I rolled 45 kilometers on Mars — more than a whole human running marathon!",
    goodnightLine: "Goodnight, brave rover Oppy! You showed us Mars once had lakes.",
    panels: [
      {
        panelIndex: 1,
        cue: "roll-in",
        text: "I'm Opportunity, a Mars rover. I landed in 2004.",
        factRef: "24 JAN 2004",
        sceneVariant: "day",
      },
      {
        panelIndex: 2,
        cue: "counter",
        text: "I was built to work for about three months. I kept going for years!",
        factRef: "24 JAN 2004",
        sceneVariant: "day",
      },
      {
        panelIndex: 3,
        cue: "blueberries",
        text: "I found tiny round rocks called \"blueberries\". They formed in water!",
        factRef: "24 JAN 2004",
        sceneVariant: "day",
      },
      {
        panelIndex: 4,
        cue: "odometer",
        text: "I rolled more than a marathon, about 45 kilometers!",
        factRef: "10 JUN 2018",
        sceneVariant: "day",
      },
      {
        panelIndex: 5,
        cue: "dust-storm",
        text: "In 2018, a giant dust storm hid the Sun. My solar panels went dark.",
        factRef: "10 JUN 2018",
        sceneVariant: "storm",
      },
      {
        panelIndex: 6,
        cue: "goodnight",
        text: "I sent one last picture. Then I went quiet. Goodnight, Oppy!",
        factRef: "12-13 FEB 2019",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "What tiny round rocks did Opportunity discover that proved ancient water existed?",
        options: [
          { label: "Martian 'blueberries'", icon: "🫐" },
          { label: "Glass marbles", icon: "🔮" },
          { label: "Chocolate chips", icon: "🍪" },
        ],
        correctAnswer: 0,
        funFact: "These hematite mineral spheres only form when water soaks through porous ground!",
      },
      {
        question: "How long was Opportunity planned to drive versus how long it actually drove?",
        options: [
          { label: "Planned 3 months, drove 14+ years!", icon: "⏳" },
          { label: "Planned 1 hour, drove 2 hours", icon: "⏱️" },
          { label: "Planned 100 years, drove 1 day", icon: "🗓️" },
        ],
        correctAnswer: 0,
        funFact: "Opportunity lasted about 57 times longer than its engineers expected!",
      },
      {
        question: "What caused Opportunity's solar panels to go dark in 2018?",
        options: [
          { label: "A giant dust storm blocked the Sun", icon: "🌪️" },
          { label: "An alien turned off the lights", icon: "💡" },
          { label: "It got buried under snow", icon: "❄️" },
        ],
        correctAnswer: 0,
        funFact: "A planet-wide dust storm covered the sky for months until its batteries ran down.",
      },
    ],
  },

  "insight": {
    slug: "insight",
    title: "InSight Lander",
    destination: "Mars",
    initialMood: "curious",
    finalMood: "quiet",
    isActive: false,
    wowFact: "I detected 1,319 marsquakes and heard a meteor crash that exposed pure water ice!",
    goodnightLine: "Goodnight, InSight! You were the best listener on Mars.",
    panels: [
      {
        panelIndex: 1,
        cue: "land",
        text: "I'm InSight. I landed on Mars in 2018 and stayed in one spot.",
        factRef: "26 NOV 2018",
        sceneVariant: "day",
      },
      {
        panelIndex: 2,
        cue: "arm-place",
        text: "My robot arm placed a super-sensitive \"ear\" on the ground.",
        factRef: "26 NOV 2018",
        sceneVariant: "day",
      },
      {
        panelIndex: 3,
        cue: "seismic-ripple",
        text: "I listened to Mars. Mars has quakes, just like Earth!",
        factRef: "26 NOV 2018",
        sceneVariant: "night",
      },
      {
        panelIndex: 4,
        cue: "meteor-hit",
        text: "I heard space rocks crash into Mars. One crash uncovered chunks of ice!",
        factRef: "24 APR 2022",
        sceneVariant: "day",
      },
      {
        panelIndex: 5,
        cue: "dust-pile",
        text: "Dust piled up on my solar panels, a little more each day.",
        factRef: "24 APR 2022",
        sceneVariant: "storm",
      },
      {
        panelIndex: 6,
        cue: "last-selfie",
        text: "In 2022 I sent one last picture. Thank you for listening to Mars with me!",
        factRef: "15-21 DEC 2022",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "What instrument did InSight place on the ground with its robot arm?",
        options: [
          { label: "A super-sensitive 'ear' (seismometer)", icon: "👂" },
          { label: "A telescope to look at birds", icon: "🔭" },
          { label: "A microwave oven", icon: "🍿" },
        ],
        correctAnswer: 0,
        funFact: "Its dome-shielded SEIS sensor felt ripples smaller than the width of a single atom!",
      },
      {
        question: "What did a space rock crash heard by InSight reveal?",
        options: [
          { label: "Chunks of pure water ice under the dust", icon: "🧊" },
          { label: "A gold treasure chest", icon: "💎" },
          { label: "A puddle of orange juice", icon: "🍊" },
        ],
        correctAnswer: 0,
        funFact: "Cameras flying above Mars saw bright white ice blasted out of the new crater!",
      },
      {
        question: "Why did InSight's solar panels slowly lose power?",
        options: [
          { label: "Red Martian dust gradually covered them", icon: "🏜️" },
          { label: "The Sun got turned off", icon: "🌑" },
          { label: "The panels fell off the rover", icon: "🔧" },
        ],
        correctAnswer: 0,
        funFact: "Over four years on Mars, a thick blanket of reddish dust dimmed the sunlight.",
      },
    ],
  },

  "ingenuity": {
    slug: "ingenuity",
    title: "Ingenuity Helicopter",
    destination: "Mars",
    initialMood: "awake",
    finalMood: "quiet",
    isActive: false,
    wowFact: "I made the very first powered flight on another planet and flew 72 times!",
    goodnightLine: "Goodnight, little flyer! You showed us skies can be explored anywhere.",
    panels: [
      {
        panelIndex: 1,
        cue: "drop-belly",
        text: "I'm Ingenuity, a tiny helicopter. I rode to Mars under a rover.",
        factRef: "19 APR 2021",
        sceneVariant: "day",
      },
      {
        panelIndex: 2,
        cue: "rotor-spin",
        text: "In 2021, I flew! It was the first helicopter flight on another planet.",
        factRef: "19 APR 2021",
        sceneVariant: "day",
      },
      {
        panelIndex: 3,
        cue: "counter-72",
        text: "I was only supposed to fly five times. I flew 72 times!",
        factRef: "18 JAN 2024",
        sceneVariant: "day",
      },
      {
        panelIndex: 4,
        cue: "flight-path",
        text: "I flew about 17 kilometers and scouted ahead for the rover.",
        factRef: "18 JAN 2024",
        sceneVariant: "day",
      },
      {
        panelIndex: 5,
        cue: "rotor-chip",
        text: "On flight 72, my rotor blade got damaged when I landed. No more flying.",
        factRef: "18 JAN 2024",
        sceneVariant: "day",
      },
      {
        panelIndex: 6,
        cue: "sunset-wave",
        text: "I'm resting on Mars now. I showed the world that flying there is possible!",
        factRef: "25 JAN 2024",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "How did Ingenuity travel to Mars?",
        options: [
          { label: "Tucked under the Perseverance rover's belly", icon: "🤖" },
          { label: "It flew through space by itself", icon: "🚁" },
          { label: "In an astronaut's pocket", icon: "👨‍🚀" },
        ],
        correctAnswer: 0,
        funFact: "Perseverance protected Ingenuity during landing and dropped it onto the surface!",
      },
      {
        question: "How many times was Ingenuity supposed to fly versus how many it completed?",
        options: [
          { label: "Planned 5 times, flew 72 times!", icon: "📈" },
          { label: "Planned 1,000 times, flew once", icon: "📉" },
          { label: "Planned zero times", icon: "0️⃣" },
        ],
        correctAnswer: 0,
        funFact: "Ingenuity was an experimental technology demo that far out-performed all expectations!",
      },
      {
        question: "What historic piece of fabric did Ingenuity carry under its solar panel?",
        options: [
          { label: "A piece of the Wright Brothers' first airplane", icon: "✈️" },
          { label: "A slice of pirate flag", icon: "🏴‍☠️" },
          { label: "A baby blanket", icon: "🧸" },
        ],
        correctAnswer: 0,
        funFact: "It carried a tiny swatch of muslin from the 1903 Wright Flyer to celebrate human aviation!",
      },
    ],
  },

  "apollo-11-laser-reflector": {
    slug: "apollo-11-laser-reflector",
    title: "Apollo 11 Laser Mirror",
    destination: "Moon",
    initialMood: "glow",
    finalMood: "glow",
    isActive: true,
    wowFact: "I am still answering lasers from Earth right now — more than 55 years after Apollo 11!",
    goodnightLine: "Hello, Laser Mirror! Keep bouncing green light back to our telescopes!",
    panels: [
      {
        panelIndex: 1,
        cue: "mirror-settle",
        text: "I'm a mirror on the Moon. Astronauts put me here in 1969.",
        factRef: "21 JUL 1969",
        sceneVariant: "day",
      },
      {
        panelIndex: 2,
        cue: "laser-fire",
        text: "I can't talk, but I can answer! Scientists on Earth aim lasers at me.",
        factRef: "01 AUG 1969",
        sceneVariant: "night",
      },
      {
        panelIndex: 3,
        cue: "laser-bounce",
        text: "My mirror bounces the light straight back to Earth.",
        factRef: "01 AUG 1969",
        sceneVariant: "night",
      },
      {
        panelIndex: 4,
        cue: "stopwatch-25",
        text: "The trip there and back takes about two and a half seconds.",
        factRef: "1969-PRESENT",
        sceneVariant: "night",
      },
      {
        panelIndex: 5,
        cue: "fingernail-drift",
        text: "Thanks to me, we know the Moon drifts away about as fast as fingernails grow.",
        factRef: "1969-PRESENT",
        sceneVariant: "night",
      },
      {
        panelIndex: 6,
        cue: "badge-answering",
        text: `I'm still answering after more than fifty years!`,
        factRef: "1969-PRESENT",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "How does the Apollo 11 mirror send messages back to Earth?",
        options: [
          { label: "It bounces green lasers shot from telescopes", icon: "⚡" },
          { label: "It sends loud text messages", icon: "📱" },
          { label: "It shouts through a megaphone", icon: "📢" },
        ],
        correctAnswer: 0,
        funFact: "Telescopes in Texas, France, and Hawaii fire pulses of light that bounce straight back!",
      },
      {
        question: "How long does a laser beam take to fly from Earth to the Moon and back?",
        options: [
          { label: "About two and a half seconds", icon: "⏱️" },
          { label: "Ten whole years", icon: "🗓️" },
          { label: "One blink of an eye", icon: "👁️" },
        ],
        correctAnswer: 0,
        funFact: "Light travels 300,000 kilometers every second, making the round trip in ~2.5 seconds!",
      },
      {
        question: "How fast is the Moon slowly drifting away from Earth?",
        options: [
          { label: "About as fast as fingernails grow (3.8 cm / year)", icon: "💅" },
          { label: "As fast as a cheetah sprints", icon: "🐆" },
          { label: "It isn't moving at all", icon: "🛑" },
        ],
        correctAnswer: 0,
        funFact: "Tidal friction pushes the Moon outward about 3.8 centimeters (1.5 inches) every year.",
      },
    ],
  },

  "voyager-1": {
    slug: "voyager-1",
    title: "Voyager 1",
    destination: "Deep space",
    initialMood: "glow",
    finalMood: "glow",
    isActive: true,
    wowFact: "I am humanity's farthest traveler, cruising through space between the stars!",
    goodnightLine: "Keep flying, Voyager 1! We are always listening for your hello.",
    panels: [
      {
        panelIndex: 1,
        cue: "glide-space",
        text: "I'm Voyager 1. I launched in 1977 to visit Jupiter and Saturn.",
        factRef: "25 AUG 2012",
        sceneVariant: "night",
      },
      {
        panelIndex: 2,
        cue: "counter-voyager",
        text: "That trip was planned for four years. I'm still going!",
        factRef: "25 AUG 2012",
        sceneVariant: "night",
      },
      {
        panelIndex: 3,
        cue: "bubble-exit",
        text: "In 2012, I left the Sun's bubble and flew into space between the stars.",
        factRef: "25 AUG 2012",
        sceneVariant: "night",
      },
      {
        panelIndex: 4,
        cue: "tools-off",
        text: "To save power, engineers switch off my tools one at a time. Two still work.",
        factRef: "NOV 2023 - APR 2024",
        sceneVariant: "night",
      },
      {
        panelIndex: 5,
        cue: "light-day-clock",
        // DATE-AWARE: before 2026-11-18T10:16:07Z vs after
        text:
          new Date().getTime() < new Date("2026-11-18T10:16:07Z").getTime()
            ? "On November 18, 2026, my messages will take a whole day to reach Earth!"
            : "Now my messages take more than a whole day to reach Earth!",
        factRef: "18 NOV 2026",
        sceneVariant: "night",
      },
      {
        panelIndex: 6,
        cue: "still-talking",
        text: "I'm still talking. I'll keep saying hello for as long as I can!",
        factRef: "18 NOV 2026",
        sceneVariant: "night",
      },
    ],
    quiz: [
      {
        question: "What golden treasure does Voyager 1 carry for any interstellar friends?",
        options: [
          { label: "The Golden Record with sounds and music of Earth", icon: "📀" },
          { label: "A solid gold chocolate bar", icon: "🍫" },
          { label: "A shiny bicycle horn", icon: "🎺" },
        ],
        correctAnswer: 0,
        funFact: "It carries greetings in 55 human languages, whale songs, and Chuck Berry's rock & roll!",
      },
      {
        question: "Where is Voyager 1 flying right now?",
        options: [
          { label: "In true interstellar space between the stars", icon: "✨" },
          { label: "Right next to the Moon", icon: "🌙" },
          { label: "In Earth's clouds", icon: "☁️" },
        ],
        correctAnswer: 0,
        funFact: "In 2012, Voyager 1 crossed out of the Sun's magnetic bubble into the space between stars.",
      },
      {
        question: "How long does a radio signal take to reach Voyager 1 from Earth in late 2026?",
        options: [
          { label: "A whole day (24 hours!)", icon: "☀️" },
          { label: "One second", icon: "⚡" },
          { label: "One hundred years", icon: "⏳" },
        ],
        correctAnswer: 0,
        funFact: "On November 18, 2026, it reaches exactly one light-day distance: 25.9 billion kilometers!",
      },
    ],
  },
};
