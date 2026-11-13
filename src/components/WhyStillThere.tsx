import { DollarSign, Repeat, Footprints, HelpCircle } from "lucide-react";
import GlossaryTooltip from "@/components/GlossaryTooltip";

export default function WhyStillThere() {
  const cards = [
    {
      icon: DollarSign,
      title: "The Rocket Equation & Return Costs",
      content: (
        <span>
          Every kilogram launched off Earth requires tens of kilograms of propellant. Launching a return rocket capable of lifting off Mars or the Moon would double or triple mission costs. Most probes are one-way scientific scouts designed to give their all on the surface.
        </span>
      ),
    },
    {
      icon: Repeat,
      title: "Left On Purpose to Keep Working",
      content: (
        <span>
          Not all hardware is abandoned junk. Stations like the Apollo 11 <GlossaryTooltip termKey="retroreflector">laser retroreflector</GlossaryTooltip> and Apollo ALSEP packages were deliberately positioned to provide decades of continuous observations, functioning with zero humans required on site.
        </span>
      ),
    },
    {
      icon: Footprints,
      title: "Sometimes Humans Walk Back",
      content: (
        <span>
          In November 1969, Apollo 12 proved pinpoint landing accuracy by setting down 180 meters from Surveyor 3. Conrad and Bean walked up to the silent craft, cut off its camera and scoop, and brought them home to study how space ages metal.
        </span>
      ),
    },
  ];

  return (
    <section className="my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>PLANETARY ECONOMICS & HISTORY</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-3">
        Why Is It Still There?
      </h2>
      <p className="text-base text-[var(--color-muted)] max-w-2xl mb-10 leading-relaxed">
        Why doesn&apos;t NASA pack up its robots and fly them home? Here are the three reasons why human technology rests across the solar system.
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

              <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
                CASE STUDY // REASON #{idx + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
