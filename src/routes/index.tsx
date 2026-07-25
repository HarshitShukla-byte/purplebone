import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import heroPets from "../assets/hero-pets.jpg";
import { Sparkles, Scissors, Stethoscope, Heart, ShoppingBag, ArrowRight, Star, PawPrint } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Purple Bone Pet Shop — South Delhi's Cutest Pet Family" },
      { name: "description", content: "Meet your new best friend at Purple Bone — puppies, kittens, grooming, food & love in South Delhi." },
      { property: "og:title", content: "Purple Bone Pet Shop — South Delhi's Cutest Pet Family" },
      { property: "og:description", content: "Meet your new best friend at Purple Bone — puppies, kittens, grooming, food & love in South Delhi." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Heart, title: "Adoption & Sale", desc: "Ethically sourced, vet-checked, cuddle-certified." },
  { icon: Scissors, title: "Grooming Spa", desc: "Fluff, bath, blowout. Your bestie leaves iconic." },
  { icon: Stethoscope, title: "Vet Consults", desc: "On-call vets for check-ups and vaccinations." },
  { icon: ShoppingBag, title: "Food & Toys", desc: "Curated treats, chew toys and cozy beds." },
];

const quotes = [
  "Until one has loved an animal, a part of one's soul remains unawakened. 💜",
  "Dogs do speak, but only to those who know how to listen. 🐾",
  "Time spent with cats is never wasted. 🐱",
  "Happiness is a warm puppy. 🐶",
  "Adopt. Don't shop… unless it's Purple Bone. 😉",
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 md:pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> South Delhi · Since 2019
            </span>
            <h1 className="mt-4 font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
              Your next{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">best friend</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-accent/60 -z-0 rounded-full" />
              </span>{" "}
              is waiting.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Purple Bone is a Gen-Z pet family in the heart of South Delhi — puppies, kittens, glow-ups & love, served with a side of glitter. ✨
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/prospects" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                Meet the babies <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 font-semibold hover:bg-foreground hover:text-background transition-colors">
                Book a Call
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm">
              <div className="flex -space-x-2">
                {[0,1,2,3].map(i => (
                  <span key={i} className="grid h-9 w-9 place-items-center rounded-full bg-accent border-2 border-background text-accent-foreground">
                    <PawPrint className="h-4 w-4" />
                  </span>
                ))}
              </div>
              <div>
                <div className="flex text-primary">{[0,1,2,3,4].map(i=><Star key={i} className="h-4 w-4 fill-primary" />)}</div>
                <p className="text-muted-foreground">2,000+ happy pet parents</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/40 to-accent/40 rounded-[3rem] blur-2xl" />
            <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl animate-float">
              <img src={heroPets} alt="Puppy and kitten best friends" width={1024} height={1024} className="w-full h-auto object-cover" />
            </div>
            <span className="absolute -top-4 -right-4 rotate-12 bg-primary text-primary-foreground px-4 py-2 rounded-2xl font-display font-bold shadow-lg">
              Adopt me! 🥺
            </span>
            <span className="absolute -bottom-3 -left-3 -rotate-6 bg-accent text-accent-foreground px-4 py-2 rounded-2xl font-display font-bold shadow-lg">
              100% floof
            </span>
          </div>
        </div>
      </section>

      {/* MARQUEE QUOTES */}
      <section className="py-6 bg-primary text-primary-foreground overflow-hidden -rotate-1">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...quotes, ...quotes].map((q, i) => (
            <span key={i} className="font-display font-semibold text-lg flex items-center gap-3">
              <PawPrint className="h-5 w-5" /> {q}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-primary font-bold uppercase tracking-wider text-sm">What we do</p>
          <h2 className="mt-2 font-display font-bold text-4xl sm:text-5xl">Everything your pet needs, under one purple roof.</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group relative bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display font-bold text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-accent p-10 md:p-16 text-primary-foreground">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 animate-bounce-slow" />
          <div className="absolute bottom-6 right-16 h-16 w-16 rounded-full bg-white/10 animate-bounce-slow [animation-delay:1s]" />
          <h2 className="font-display font-bold text-4xl md:text-5xl max-w-2xl">Ready to meet your soulmate (the four-legged kind)?</h2>
          <p className="mt-4 max-w-xl opacity-90">Book a visit, DM us on Insta, or come say hi at our shop in GK-II.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-background text-foreground px-6 py-3 font-semibold hover:scale-105 transition-transform">Book a Call</Link>
            <Link to="/prospects" className="rounded-full border-2 border-white/60 px-6 py-3 font-semibold hover:bg-white/10 transition-colors">Browse pets</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
