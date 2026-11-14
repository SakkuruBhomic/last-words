"use client";

import { useState } from "react";
import { Printer, BookOpen, Clock, MessageSquare, PenTool, Palette, Sparkles } from "lucide-react";
import MachineIllustration from "@/components/kids/MachineIllustration";
import { MACHINES } from "@/data/machines";

export default function TeacherView() {
  const [selectedColoringSlug, setSelectedColoringSlug] = useState<string | null>(null);

  const handlePrintWorksheet = () => {
    setSelectedColoringSlug(null);
    window.print();
  };

  const handlePrintColoring = (slug: string) => {
    setSelectedColoringSlug(slug);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const discussionQuestions = [
    "Should historic space sites (like Tranquility Base or Surveyor 3) be protected as international parks, or should future colonists recycle them for metal?",
    "Why did NASA shut down the Apollo 17 ALSEP station in 1977 even though its instruments were still sending data?",
    "Opportunity was designed for 90 days but survived 14 years. What does this tell us about NASA engineering and safety margins?",
    "The Apollo 11 retroreflector uses zero electricity, while Voyager 1 uses nuclear RTGs. What are the advantages and limits of each approach?",
    "Why do you think humans feel strong emotional connections to robotic machines like Opportunity and Ingenuity?",
    "If you were designing a spacecraft to last for 100 years in deep space, what power source and communication system would you choose?"
  ];

  const selectedMachine = MACHINES.find((m) => m.slug === selectedColoringSlug);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Screen-Only Educator Header */}
      <div className="no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--color-border)] gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-1">
              <BookOpen className="w-4 h-4" />
              <span>EDUCATOR CURRICULUM &amp; COLORING // ALL AGES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              LAST WORDS: Teacher Guide &amp; Coloring Pages
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1 max-w-2xl">
              Turnkey science communication lesson plans for older students (Grades 5-10) and printable outline coloring sheets for young explorers (Grades K-3).
            </p>
          </div>

          <button
            onClick={handlePrintWorksheet}
            type="button"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[var(--color-signal-amber)] text-black font-mono font-bold text-xs hover:opacity-90 shadow-xl transition-all self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Student Worksheet</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* NEW: Printable Coloring Pages for Little Children (K-3)  */}
        {/* ======================================================== */}
        <section className="my-10 p-6 sm:p-8 rounded-3xl border-2 border-[#5BE3C0]/40 bg-[#0B1033] shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-display font-bold text-[#5BE3C0] mb-2">
            <Palette className="w-4 h-4" />
            <span>EARLY CHILDHOOD ART &amp; SCIENCE // GRADES K - 3</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Printable Explorer Coloring Pages
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mb-6">
            Tap &ldquo;Print Coloring Sheet&rdquo; on any explorer to print a full-page clean outline version ready for crayons and markers!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MACHINES.map((m) => (
              <div
                key={m.slug}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-between text-center"
              >
                <div className="w-full h-32 flex items-center justify-center bg-white rounded-xl mb-3 p-1">
                  <MachineIllustration
                    slug={m.slug}
                    mood="awake"
                    size={130}
                    outline={true}
                    face={true}
                    showPhotoToggle={false}
                  />
                </div>
                <h3 className="font-display font-bold text-sm text-white line-clamp-1 mb-2">
                  {m.name}
                </h3>
                <button
                  onClick={() => handlePrintColoring(m.slug)}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#5BE3C0] text-black font-display font-bold text-xs hover:opacity-90 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 20-Minute Turnkey Lesson Plan Breakdown */}
        <section className="my-10 p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
            <Clock className="w-4 h-4" />
            <span>FAST-PACED CLASSROOM MODULE</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            The 20-Minute Lesson Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-white/10 bg-[var(--color-surface-elevated)] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--color-signal-amber)] block mb-1">
                  MINUTES 0 - 3
                </span>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  1. The Dramatic Hook
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Dim the classroom lights. Read Opportunity&apos;s or InSight&apos;s Final Log aloud to the class without revealing what machine it is until the final line.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-mono text-white/50">WHOLE CLASS</div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-white/10 bg-[var(--color-surface-elevated)] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--color-signal-amber)] block mb-1">
                  MINUTES 3 - 13
                </span>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  2. Exploration in Pairs
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Students partner up on computers or tablets, select two machines on the Silence Timeline, test the Then &amp; Now sliders, and complete the worksheet.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-mono text-white/50">STUDENT PAIRS</div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-white/10 bg-[var(--color-surface-elevated)] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--color-signal-amber)] block mb-1">
                  MINUTES 13 - 18
                </span>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  3. Structured Debate
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Discuss: <em>&ldquo;Should Artemis astronauts recycle Apollo hardware for metal, or preserve it forever as an open-air museum?&rdquo;</em>
                </p>
              </div>
              <div className="mt-3 text-[11px] font-mono text-white/50">CLASS DISCUSSION</div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl border border-white/10 bg-[var(--color-surface-elevated)] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--color-signal-amber)] block mb-1">
                  MINUTES 18 - 20
                </span>
                <h3 className="font-display font-bold text-base text-white mb-2">
                  4. Exit Ticket
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Students submit the bottom prompt on their worksheet: drafting a 3-line mission-end message for a futuristic robot explorer.
                </p>
              </div>
              <div className="mt-3 text-[11px] font-mono text-white/50">INDIVIDUAL</div>
            </div>
          </div>
        </section>

        {/* 6 Guided Discussion Questions */}
        <section className="my-10 p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>CRITICAL THINKING &amp; ETHICS</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            6 Guided Discussion Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discussionQuestions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/10 bg-[var(--color-surface-elevated)]">
                <span className="font-mono text-xs text-[var(--color-signal-amber)] font-bold block mb-1">
                  QUESTION #{idx + 1}
                </span>
                <p className="text-sm text-gray-200 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Creative Writing Activity */}
        <section className="my-10 p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
            <PenTool className="w-4 h-4" />
            <span>CREATIVE WRITING &amp; SCIENCE COMMUNICATION ACTIVITY</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Activity: &ldquo;Write a Mission-End Message&rdquo;
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Challenge students to invent a machine destined for an extreme environment (Europa&apos;s ice ocean, Venus&apos;s acid atmosphere, or a Kuiper Belt comet) and write its final 5-line transmission log.
          </p>
          <div className="p-4 rounded-xl border border-[var(--color-signal-amber)]/30 bg-black/40 font-mono text-xs text-amber-200 space-y-1">
            <div>RULES FOR STUDENTS:</div>
            <div>1. Ground every line in real physics (temperature, power, pressure, distance).</div>
            <div>2. Use one technical vocabulary word (sol, RTG, seismometer, telemetry).</div>
            <div>3. Conclude with an uppercase status tag in brackets (e.g. [ TRANSMITTER TERMINATED ]).</div>
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* PRINT-ONLY VIEW: EITHER COLORING PAGE OR WORKSHEET       */}
      {/* ======================================================== */}
      {selectedColoringSlug && selectedMachine ? (
        // Print-only Full Page Coloring Sheet
        <div className="print-only p-8 bg-white text-black text-center min-h-[95vh] flex flex-col justify-between items-center border-4 border-black">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">
              {selectedMachine.name} ({selectedMachine.destination})
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              NASA Space Apps Challenge 2026 // Explorer Coloring Page
            </p>
          </div>

          <div className="w-full max-w-lg my-auto py-8">
            <MachineIllustration
              slug={selectedMachine.slug}
              mood="awake"
              size={480}
              outline={true}
              face={true}
              showPhotoToggle={false}
            />
          </div>

          <div className="w-full text-left pt-6 border-t-2 border-black flex justify-between items-end text-xs">
            <div>
              <p className="font-bold">{selectedMachine.oneLiner}</p>
              <p className="text-gray-500 mt-1">Color with crayons, colored pencils, or markers!</p>
            </div>
            <div className="text-right">
              <span className="font-mono">LAST WORDS (last-words1.vercel.app)</span>
            </div>
          </div>
        </div>
      ) : (
        // Print-only Student Worksheet
        <div className="print-only mt-8 p-6 bg-white text-black border-2 border-black rounded-lg">
          <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                LAST WORDS: NASA Mission Telemetry Worksheet
              </h2>
              <p className="text-xs text-gray-700">
                NASA Space Apps Challenge 2026 Student Investigation (Grades 5-10)
              </p>
            </div>
            <div className="text-xs space-y-1 text-right">
              <div><strong>Student Name:</strong> _______________________</div>
              <div><strong>Date:</strong> ___________ <strong>Period:</strong> ______</div>
            </div>
          </div>

          <div className="text-xs mb-4 p-2 bg-gray-100 border border-gray-300">
            <strong>Instructions:</strong> Open <em>LAST WORDS</em> on your device. Choose two machines from different destinations (Moon, Mars, or Deep Space) to investigate and compare below.
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs mb-4">
            <div className="border border-black p-3">
              <div className="font-bold border-b border-black pb-1 mb-2">
                MACHINE #1: ___________________________
              </div>
              <div className="space-y-2">
                <div>Destination (Moon/Mars/Deep space): ______________</div>
                <div>Planned Life: _____________ Actual Life: _____________</div>
                <div>Why did it stop transmitting (or why is it still talking)?</div>
                <div className="h-10 border-b border-dotted border-gray-400"></div>
                <div>One major scientific discovery it made:</div>
                <div className="h-10 border-b border-dotted border-gray-400"></div>
              </div>
            </div>

            <div className="border border-black p-3">
              <div className="font-bold border-b border-black pb-1 mb-2">
                MACHINE #2: ___________________________
              </div>
              <div className="space-y-2">
                <div>Destination (Moon/Mars/Deep space): ______________</div>
                <div>Planned Life: _____________ Actual Life: _____________</div>
                <div>Why did it stop transmitting (or why is it still talking)?</div>
                <div className="h-10 border-b border-dotted border-gray-400"></div>
                <div>One major scientific discovery it made:</div>
                <div className="h-10 border-b border-dotted border-gray-400"></div>
              </div>
            </div>
          </div>

          <div className="text-xs mb-4 border border-black p-3">
            <div className="font-bold mb-1">
              CRITICAL THINKING: Preserve, Recycle, or Reuse?
            </div>
            <p className="text-gray-700 mb-2">
              Should future human astronauts on the Moon protect historic probes like Surveyor 3 as heritage parks, or recycle their metal to build shelters? Give one reason for your choice:
            </p>
            <div className="h-12 border-b border-dotted border-gray-400"></div>
          </div>

          <div className="text-xs border border-black p-3">
            <div className="font-bold mb-1">
              EXIT TICKET: Write a 3-Line Mission-End Message for a Machine of Your Own Design
            </div>
            <div className="text-gray-600 mb-2">
              Machine Name: _____________________ Destination: _____________________
            </div>
            <div className="space-y-2">
              <div className="border-b border-gray-300 pb-1">Line 1: ____________________________________________________________________</div>
              <div className="border-b border-gray-300 pb-1">Line 2: ____________________________________________________________________</div>
              <div className="border-b border-gray-300 pb-1">Line 3: ____________________________________________________________________</div>
              <div className="text-right text-gray-700">[ FINAL STATUS TAG: _______________________ ]</div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-gray-400 text-[10px] text-gray-500 text-center">
            LAST WORDS // NASA Space Apps Challenge 2026 Educational Worksheet. Not affiliated with or endorsed by NASA.
          </div>
        </div>
      )}
    </div>
  );
}
