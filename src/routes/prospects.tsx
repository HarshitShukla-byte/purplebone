import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import { PawPrint, Heart, ShoppingBag, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { PETS, CATEGORIES, type Category } from "../lib/pets-data";
import { useShop, formatINR } from "../lib/shop-store";
import { toast } from "sonner";

export const Route = createFileRoute("/prospects")({
  head: () => ({
    meta: [
      { title: "Prospects — Meet Our Pets · Purple Bone" },
      { name: "description", content: "Browse dogs, cats, fish and rabbits at Purple Bone. Add to wishlist or cart and reserve your new best friend." },
      { property: "og:title", content: "Meet our pets — Purple Bone" },
      { property: "og:description", content: "Puppies, kittens, bunnies & fish. Find your match today." },
    ],
  }),
  component: Prospects,
});

function Prospects() {
  const [cat, setCat] = useState<Category>("All");
  const { addToCart, toggleWish, isWished } = useShop();

  const pets = useMemo(
    () => (cat === "All" ? PETS : PETS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-8 text-center">
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

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                    : "bg-card border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {c === "All" ? "✨ All" : c === "Dog" ? "🐶 Dogs" : c === "Cat" ? "🐱 Cats" : c === "Fish" ? "🐠 Fish" : "🐰 Rabbits"}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((b, i) => {
            const wished = isWished(b.id);
            return (
              <article
                key={b.id}
                className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all animate-fade-in"
              >
                <div className="relative aspect-square overflow-hidden bg-accent/30">
                  <img
                    src={b.img}
                    alt={b.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                    {b.tag}
                  </span>
                  <button
                    onClick={() => {
                      toggleWish(b);
                      toast.success(wished ? `Removed ${b.name} from wishlist` : `Saved ${b.name} 💜`);
                    }}
                    className={`absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full transition-all ${
                      wished
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-background/90 text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display font-bold text-xl">{b.name}</h3>
                    <span className="text-xs font-bold text-primary">#{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{b.vibe}"</p>
                  <p className="mt-3 font-display font-bold text-2xl text-primary">{formatINR(b.price)}</p>
                  <button
                    onClick={() => {
                      addToCart(b);
                      toast.success(`${b.name} added to cart`, {
                        icon: <Check className="h-4 w-4" />,
                      });
                    }}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3 font-bold hover:scale-105 transition-transform"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {pets.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No pets in this category right now — check back soon! 🐾</p>
        )}

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prices are indicative and vary based on lineage, age & availability. All pets come with vaccination records. 💜
        </p>
      </section>
    </SiteLayout>
  );
}