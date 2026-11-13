import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MACHINES, getMachineBySlug, getAllMachineSlugs } from "@/data/machines";
import MachineClientView from "./MachineClientView";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllMachineSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getMachineBySlug(slug);

  if (!machine) {
    return {
      title: "Machine Not Found | LAST WORDS",
    };
  }

  const primaryImage = machine.images[0]?.src || "/images/voyager-1/now.jpg";

  return {
    title: `${machine.name} | LAST WORDS - NASA Space Apps 2026`,
    description: machine.oneLiner,
    openGraph: {
      title: `${machine.name}: Final Words & Scientific Legacy`,
      description: machine.oneLiner,
      images: [
        {
          url: primaryImage,
          alt: machine.images[0]?.alt || machine.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${machine.name} | LAST WORDS`,
      description: machine.oneLiner,
      images: [primaryImage],
    },
  };
}

export default async function MachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getMachineBySlug(slug);

  if (!machine) {
    notFound();
  }

  // Find previous and next machines for circular pager
  const currentIndex = MACHINES.findIndex((m) => m.slug === slug);
  const prevIndex = (currentIndex - 1 + MACHINES.length) % MACHINES.length;
  const nextIndex = (currentIndex + 1) % MACHINES.length;

  const prevMachine = MACHINES[prevIndex];
  const nextMachine = MACHINES[nextIndex];

  return (
    <MachineClientView
      machine={machine}
      prevMachine={prevMachine}
      nextMachine={nextMachine}
    />
  );
}
