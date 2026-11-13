import { GlossaryTerm } from "./types";

export const GLOSSARY: Record<string, GlossaryTerm> = {
  sol: {
    term: "Sol",
    definition: "One Martian day, which lasts 24 hours, 39 minutes, and 35 seconds.",
    example: "Opportunity was designed to survive 90 sols, but worked for over 5,111 sols."
  },
  "light-day": {
    term: "Light-Day",
    definition: "The vast distance light or radio signals travel in one Earth day: about 25.9 billion kilometers (16.1 billion miles).",
    example: "Voyager 1 will reach one light-day from Earth in November 2026."
  },
  rtg: {
    term: "RTG (Radioisotope Thermoelectric Generator)",
    definition: "A space battery that turns heat from decaying plutonium-238 into electricity, powering probes where sunlight is too weak.",
    example: "Pioneer 10 and Voyager 1 rely on RTGs to explore beyond the reach of solar panels."
  },
  seismometer: {
    term: "Seismometer",
    definition: "An ultra-sensitive instrument that listens for ground vibrations, quakes, and meteoroid impacts.",
    example: "InSight's dome-covered seismometer detected more than 1,300 marsquakes."
  },
  heliopause: {
    term: "Heliopause",
    definition: "The boundary where the solar wind from our Sun is pushed back by the interstellar wind of deep space.",
    example: "Voyager 1 crossed the heliopause in 2012, entering true interstellar space."
  },
  retroreflector: {
    term: "Retroreflector",
    definition: "A specialized array of corner mirrors that reflects incoming light directly back to its source, regardless of the angle.",
    example: "Apollo 11's retroreflector still bounces laser pulses back to Earth today with zero electrical power."
  }
};
