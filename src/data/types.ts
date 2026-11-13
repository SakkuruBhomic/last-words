export type Destination = "Moon" | "Mars" | "Deep space";
export type MachineStatus = "silent" | "still-talking" | "still-answering";

export interface DesignedLife {
  label: string;
  value: number;
  unit: string;
}

export interface ActualLife {
  label: string;
  value: number;
  unit: string;
}

export interface FinalLog {
  stamp: string;
  lines: string[];
  endTag: string;
}

export interface WhatReallyHappened {
  dateLabel: string;
  text: string;
  sourceUrl: string;
}

export interface ScienceImpact {
  idea: string;
  result: string;
  whyItMatters: string;
}

export interface MachineImage {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  kind: "then" | "now" | "single";
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface Machine {
  slug: string;
  name: string;
  destination: Destination;
  status: MachineStatus;
  launchISO: string;
  lastSignalISO?: string;
  lastSignalLabel: string;
  designed: DesignedLife;
  actual: ActualLife;
  oneLiner: string;
  finalLog: FinalLog;
  whatReallyHappened: WhatReallyHappened[];
  science: ScienceImpact[];
  tryIt: string;
  images: MachineImage[];
  quiz: QuizQuestion[];
  sources: Source[];
  footnotes?: string[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
}

