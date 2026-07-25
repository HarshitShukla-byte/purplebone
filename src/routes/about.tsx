import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import { Heart, ShieldCheck, Sparkles, PawPrint } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Purple Bone Pet Shop" },
      { name: "description", content: "Meet the humans behind Purple Bone — South Delhi's ethical, Gen-Z pet family." },
      { property: "og:title", content: "About Purple Bone" },
      { property: "og:description", content: "Ethics-first, cuddle-forward. Our story, our values, our floofs." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Love-first", desc: "Every pet is family long before they leave with you." },
  { icon: ShieldCheck, title: "Ethical sourcing", desc: "Vet-verified breeders and rescues only. No puppy mills. Ever." },
  { icon: Sparkles, title: "Gen-Z glow", desc: "Vibes, aesthetics and joy — for you and your bestie." },
];

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
          <PawPrint className="h-3.5 w-3.5" /> Our story
        </span>
        <h1 className="mt-4 font-display font-bold text-5xl md:text-6xl leading-tight">
          We're just <span className="text-primary">pet-obsessed</span> humans building a happier planet, one paw at a time.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Founded in 2019 in South Delhi, Purple Bone started as a tiny room full of rescues and a very loud dream. Today, we're a full-service pet family — adoption, grooming, food, care, and unmatched cuddles.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-3xl p-8 border border-border hover:-translate-y-1 transition-transform shadow-sm">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/50 text-primary">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display font-bold text-xl">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          {[
            { n: "2,000+", l: "Happy adoptions" },
            { n: "7 yrs", l: "Serving South Delhi" },
            { n: "100%", l: "Vet-verified" },
          ].map((s) => (
            <div key={s.l} className="rounded-3xl bg-primary text-primary-foreground p-8">
              <p className="font-display font-bold text-5xl">{s.n}</p>
              <p className="mt-1 opacity-90">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}