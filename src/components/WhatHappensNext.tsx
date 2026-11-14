import { ShieldCheck, Recycle, Wrench, Sparkles, ExternalLink } from "lucide-react";

export default function WhatHappensNext() {
  const initiatives = [
    {
      icon: ShieldCheck,
      badge: "PRESERVE",
      title: "Protecting heritage sites",
      description: "In 2011 NASA published voluntary recommendations for protecting U.S. lunar artifacts such as the Apollo landing sites. A 2020 U.S. law, the One Small Step to Protect Human Heritage in Space Act, requires NASA's partners to follow them.",
      links: [
        {
          label: "NASA Lunar Artifacts Recommendations (PDF)",
          url: "https://www.nasa.gov/pdf/617743main_NASA-USG_LUNAR_HISTORIC_SITES_RevA-508.pdf"
        },
        {
          label: "One Small Step Act (PLAW-116publ275)",
          url: "https://www.govinfo.gov/content/pkg/PLAW-116publ275/html/PLAW-116publ275.htm"
        }
      ]
    },
    {
      icon: Recycle,
      badge: "RECYCLE",
      title: "NASA LunaRecycle Challenge",
      description: "A $3 million NASA prize competition, run with the University of Alabama, asks teams to design ways to recycle solid waste on the Moon, such as food packaging, old clothing and even human waste, so less trash is left behind.",
      links: [
        {
          label: "LunaRecycle Challenge Official Site",
          url: "https://lunarecyclechallenge.ua.edu"
        },
        {
          label: "NASA Centennial Challenges",
          url: "https://www.nasa.gov/prizes-challenges-and-crowdsourcing/centennial-challenges/"
        }
      ]
    },
    {
      icon: Wrench,
      badge: "REUSE",
      title: "PROMISE, a Moon rover from Mars-rover parts",
      description: "NASA plans a new rover called PROMISE, built from components and test vehicles that serve the Mars rovers Perseverance and Curiosity, to explore the Moon's south pole. It is planned for 2028.",
      links: [
        {
          label: "JPL News - Moon Base Transportation Projects",
          url: "https://www.jpl.nasa.gov/news/nasa-awards-moon-base-transportation-technology-science-projects/"
        }
      ]
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

              <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
                {item.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[var(--color-signal-amber)] hover:underline flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
