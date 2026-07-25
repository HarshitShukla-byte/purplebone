import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import { PawPrint, Heart } from "lucide-react";
import pom from "../assets/breed-pom.jpg";
import shih from "../assets/breed-shihtzu.jpg";
import persian from "../assets/breed-persian.jpg";
import lab from "../assets/breed-lab.jpg";

export const Route = createFileRoute("/prospects")({
  head: () => ({
    meta: [
      { title: "Prospects — Meet Our Pets · Purple Bone" },
      { name: "description", content: "Browse available puppies and kittens at Purple Bone Pet Shop. Breeds, sample prices, and cuteness overload." },
      { property: "og:title", content: "Meet our pets — Purple Bone" },
      { property: "og:description", content: "Puppies, kittens, prices & vibes. Find your match today." },
    ],
  }),
  component: Prospects,
});

const breeds = [
  { img: pom, name: "Pomeranian", tag: "Tiny floof", price: "₹35,000 – ₹55,000", vibe: "Main character energy" },
  { img: shih, name: "Shih Tzu", tag: "Lap royalty", price: "₹30,000 – ₹45,000", vibe: "Sassy but soft" },
  { img: persian, name: "Persian Kitten", tag: "Fluff overload", price: "₹25,000 – ₹40,000", vibe: "Certified diva" },
  { img: lab, name: "Labrador", tag: "Best friend fr", price: "₹20,000 – ₹35,000", vibe: "Golden retriever gf/bf" },
];

function Prospects() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
          <PawPrint className="h-3.5 w-3.5" /> Available now
        </span>
        <h1 className="mt-4 font-display font-bold text-5xl md:text-6xl leading-tight">
          Swipe right on your <span className="text-primary">forever bestie</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Every pet is vet-checked, vaccinated, and ready for their glow-up era with you.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {breeds.map((b, i) => (
            <article key={b.name} className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="relative aspect-square overflow-hidden bg-accent/30">
                <img src={b.img} alt={b.name} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">{b.tag}</span>
                <button className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Favorite">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-xl">{b.name}</h3>
                  <span className="text-xs font-bold text-primary">#{String(i+1).padStart(2,'0')}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">"{b.vibe}"</p>
                <p className="mt-3 font-bold">{b.price}</p>
                <Link to="/contact" className="mt-4 block text-center rounded-full bg-primary text-primary-foreground py-2.5 font-semibold hover:scale-105 transition-transform">
                  Enquire
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prices are indicative and vary based on lineage, age & availability. All pets come with vaccination records. 💜
        </p>
      </section>
    </SiteLayout>
  );
}