import { Rocket, Repeat, Footprints, HelpCircle } from "lucide-react";
import GlossaryTooltip from "@/components/GlossaryTooltip";

export default function WhyStillThere() {
  const cards = [
    {
      icon: Rocket,
      title: "The Rocket Equation & Return Trips",
      content: (
        <span>
          Rockets burn most of their fuel just lifting fuel. A return trip would need extra rockets, so most robots are built for one-way trips to give their all exploring distant worlds.
        </span>
      ),
    },
    {
      icon: Repeat,
      title: "Left On Purpose to Keep Working",
      content: (
        <span>
          Not all hardware is abandoned junk. Stations like the Apollo 17 ALSEP package operated for years until Mission Control sent a shutdown command in 1977, and Apollo <GlossaryTooltip termKey="retroreflector">laser retroreflectors</GlossaryTooltip> still bounce laser signals back to Earth today.
        </span>
      ),
    },
    {
      icon: Footprints,
      title: "Sometimes Humans Walk Back",
      content: (
        <span>
          In November 1969, Apollo 12 proved pinpoint landing accuracy by setting down ~180 meters from Surveyor 3. Conrad and Bean walked up to the silent craft, removed its camera and scoop, and brought them home to study how space ages materials.
        </span>
      ),
    },
  ];

  return (
    <section className="my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>Big questions</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-3">
        Why Is It Still There?
      </h2>
      <p className="text-base text-[var(--color-muted)] max-w-2xl mb-10 leading-relaxed">
        Why doesn&apos;t NASA pack up its robots and fly them home? Here are three reasons why human technology rests across the solar system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-glow)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-signal-amber)]/10 border border-[var(--color-signal-amber)]/30 flex items-center justify-center text-[var(--color-signal-amber)] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {card.title}
                </h3>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {card.content}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)]">
                NASA History & Physics
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
