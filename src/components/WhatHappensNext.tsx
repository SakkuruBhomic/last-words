import { ShieldCheck, Recycle, Wrench, Sparkles, ExternalLink } from "lucide-react";

export default function WhatHappensNext() {
  const initiatives = [
    {
      icon: ShieldCheck,
      badge: "PRESERVE",
      title: "Lunar Historic Heritage Sites",
      description: "Under the 'One Small Step to Protect Human Heritage in Space Act', NASA and international partners established protective buffer zones around Tranquility Base, Surveyor 3, and Apollo landing sites to prevent rocket exhaust from sandblasting human history.",
      sourceLabel: "NASA Heritage Recommendations",
      sourceUrl: "https://www.nasa.gov/news-release/nasa-releases-guidelines-for-lunar-artifacts/"
    },
    {
      icon: Recycle,
      badge: "RECYCLE",
      title: "NASA LunaRecycle Challenge",
      description: "NASA's LunaRecycle Challenge awards millions in prizes to develop innovative manufacturing technologies that melt discarded descent stages, heat shields, and aluminum struts into lunar habitats and solar array structures.",
      sourceLabel: "NASA LunaRecycle Prize",
      sourceUrl: "https://www.nasa.gov/prizes-challenges-and-crowdsourcing/lunarecycle-challenge/"
    },
    {
      icon: Wrench,
      badge: "REUSE",
      title: "PROMISE Lunar Rover from Rover Spares",
      description: "Engineers are repurposing flight-qualified spare wheels, avionics, and sensors originally built for Mars exploration to construct PROMISE, an economical lunar surface explorer that proves old hardware never dies.",
      sourceLabel: "NASA Hardware Repurposing",
      sourceUrl: "https://science.nasa.gov"
    }
  ];

  return (
    <section className="my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
        <Sparkles className="w-4 h-4" />
        <span>THE FUTURE OF EXTRA-TERRESTRIAL ARTIFACTS</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-3">
        What Happens Next?
      </h2>
      <p className="text-base text-[var(--color-muted)] max-w-2xl mb-10 leading-relaxed">
        As the Artemis generation returns humans to the Moon and prepares for Mars, how will we treat the hardware left behind?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initiatives.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-glow)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-alive-cyan)]/15 text-[var(--color-alive-cyan)] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-signal-amber)] hover:underline inline-flex items-center"
                >
                  <span>{item.sourceLabel}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

