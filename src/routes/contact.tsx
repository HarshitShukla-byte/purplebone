import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, PawPrint, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Purple Bone Pet Shop" },
      { name: "description", content: "Book a call, visit our South Delhi shop, or send us a note. Purple Bone is here for you and your pet." },
      { property: "og:title", content: "Contact Purple Bone" },
      { property: "og:description", content: "Book a call or drop us a line — we love pet chats." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <PawPrint className="h-3.5 w-3.5" /> Get in touch
          </span>
          <h1 className="mt-4 font-display font-bold text-5xl md:text-6xl leading-tight">
            Slide into our <span className="text-primary">DMs</span> 💌
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question about a pet, grooming, or a home visit? We reply faster than a puppy zoomie.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Info card */}
          <aside className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground p-8 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-bold text-3xl">Visit our shop</h2>
              <p className="mt-2 opacity-90">South Delhi's coziest pet corner.</p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">GK-II Market, South Delhi</p>
                    <p className="text-sm opacity-80">Open daily · 10 AM – 9 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                  <a href="tel:+919810000000" className="font-semibold hover:underline">+91 98100 00000</a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                  <a href="mailto:hello@purplebone.pet" className="font-semibold hover:underline">hello@purplebone.pet</a>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 mt-0.5 shrink-0" />
                  <a href="#" className="font-semibold hover:underline">@purplebone.pet</a>
                </div>
              </div>
            </div>

            <a
              href="tel:+919810000000"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground px-6 py-4 font-bold hover:scale-105 transition-transform"
            >
              <Phone className="h-4 w-4" /> Book a Call now
            </a>
          </aside>

          {/* Form */}
          <form onSubmit={submit} className="lg:col-span-3 bg-card rounded-3xl p-8 border border-border shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">Your name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e)=>setForm({...form, name: e.target.value})}
                  className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="Ananya S."
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Phone</span>
                <input
                  value={form.phone}
                  onChange={(e)=>setForm({...form, phone: e.target.value})}
                  className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="+91 98xxxxxxxx"
                />
              </label>
            </div>
            <label className="block mt-4">
              <span className="text-sm font-semibold">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e)=>setForm({...form, email: e.target.value})}
                className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                placeholder="you@email.com"
              />
            </label>
            <label className="block mt-4">
              <span className="text-sm font-semibold">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e)=>setForm({...form, message: e.target.value})}
                className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition resize-none"
                placeholder="Tell us about the pet you're looking for..."
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
            >
              {sent ? <><CheckCircle2 className="h-5 w-5" /> Message sent!</> : <><Send className="h-4 w-4" /> Send message</>}
            </button>
            {sent && <p className="mt-3 text-center text-sm text-primary">We'll get back to you within a few hours. 💜</p>}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}