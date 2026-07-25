import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import { Star, Quote, PawPrint } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Purple Bone Pet Shop" },
      { name: "description", content: "Real reviews from real pet parents in South Delhi. See why 2,000+ families choose Purple Bone." },
      { property: "og:title", content: "Reviews · Purple Bone" },
      { property: "og:description", content: "Tail-wagging testimonials from our pet parent community." },
    ],
  }),
  component: Reviews,
});

const reviews = [
  { name: "Ananya S.", pet: "Mocha the Pom", text: "Best decision of my life. Purple Bone treated Mocha like their own — vaccinated, groomed, and SO well-loved. 10/10.", rating: 5, color: "bg-primary text-primary-foreground" },
  { name: "Rohan K.", pet: "Simba the Persian", text: "The team actually cares. They followed up for a month after adoption to check on Simba. Iconic behavior.", rating: 5, color: "bg-accent text-accent-foreground" },
  { name: "Meher & Aarav", pet: "Biscuit the Lab", text: "Grooming spa is a whole vibe. Biscuit walks out looking like a runway model every time.", rating: 5, color: "bg-card text-card-foreground" },
  { name: "Priya D.", pet: "Nimbu the Shih Tzu", text: "Ethical, transparent, adorable. The purple aesthetic is just a bonus 💜", rating: 5, color: "bg-primary text-primary-foreground" },
  { name: "Kabir M.", pet: "Cloud the kitten", text: "Went in for food, left with a kitten. No regrets. Cloud is the CEO of my apartment now.", rating: 5, color: "bg-accent text-accent-foreground" },
  { name: "Ishita R.", pet: "Toffee the Lab", text: "South Delhi's finest, no debate. Real vets, real care, real love.", rating: 5, color: "bg-card text-card-foreground" },
];

function Reviews() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
          <PawPrint className="h-3.5 w-3.5" /> The receipts
        </span>
        <h1 className="mt-4 font-display font-bold text-5xl md:text-6xl leading-tight">
          Loved by <span className="text-primary">2,000+</span> pet parents.
        </h1>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex text-primary">{[0,1,2,3,4].map(i=><Star key={i} className="h-5 w-5 fill-primary" />)}</div>
          <span className="font-bold">4.9 / 5 · Google Reviews</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={i} className={`${r.color} rounded-3xl p-6 border border-border/60 shadow-sm hover:-translate-y-2 transition-transform relative`}>
              <Quote className="absolute top-4 right-4 h-8 w-8 opacity-20" />
              <div className="flex gap-1 mb-3">
                {Array.from({length:r.rating}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-base leading-relaxed">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-current/20">
                <p className="font-display font-bold">{r.name}</p>
                <p className="text-sm opacity-80">Parent to {r.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}