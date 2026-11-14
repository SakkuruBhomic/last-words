export interface KidWord {
  word: string;
  definition: string;
  icon: string;
  pronunciation?: string;
}

export const KID_GLOSSARY: Record<string, KidWord> = {
  rover: {
    word: "Rover",
    definition: "A robot with wheels that rolls and explores another world!",
    icon: "🚜",
    pronunciation: "ROH-ver",
  },
  lander: {
    word: "Lander",
    definition: "A robot that touches down in one spot and does science right there.",
    icon: "🛬",
    pronunciation: "LAN-der",
  },
  "dust storm": {
    word: "Dust storm",
    definition: "A giant Martian wind that swirls red dust across the sky.",
    icon: "🌪️",
  },
  "solar panel": {
    word: "Solar panel",
    definition: "Dark shiny wings that catch sunlight to make electric power!",
    icon: "☀️",
  },
  laser: {
    word: "Laser",
    definition: "A super-straight beam of light that can travel all the way to the Moon!",
    icon: "⚡",
    pronunciation: "LAY-zer",
  },
  "Mars day": {
    word: "Mars day (Sol)",
    definition: "One spin of Mars. It is about 24 hours and 39 minutes long!",
    icon: "🪐",
  },
  "nuclear battery": {
    word: "Nuclear battery",
    definition: "A warm power unit that makes electricity without needing sunshine.",
    icon: "🔋",
  },
  "shake sensor": {
    word: "Shake sensor (Seismometer)",
    definition: "A super-sensitive robot 'ear' that feels tiny quakes deep inside the ground.",
    icon: "👂",
  },
  "laser mirror": {
    word: "Laser mirror",
    definition: "Special glass cubes that bounce light straight back to Earth like a bicycle reflector!",
    icon: "✨",
  },
  moonquake: {
    word: "Moonquake",
    definition: "A gentle shake inside the Moon caused by Earth's gravity pulling on it.",
    icon: "🌕",
  },
  "Sun's bubble": {
    word: "Sun's bubble (Heliosphere)",
    definition: "A giant magnetic shield made by our Sun that protects all the planets from cosmic space.",
    icon: "🫧",
  },
};
