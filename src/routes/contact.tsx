import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site-layout";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, PawPrint, Instagram, CalendarCheck, Scissors, Stethoscope, Heart } from "lucide-react";
import { toast } from "sonner";

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
  const [appt, setAppt] = useState({ name: "", phone: "", service: "Meet & greet", date: "", time: "11:00" });
  const [apptDone, setApptDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent 💌", { description: "We'll reply within a few hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const bookAppt = (e: FormEvent) => {
    e.preventDefault();
    setApptDone(true);
    toast.success("Appointment booked! 🐾", {
      description: `${appt.service} on ${appt.date} at ${appt.time}`,
    });
    setAppt({ name: "", phone: "", service: "Meet & greet", date: "", time: "11:00" });
    setTimeout(() => setApptDone(false), 6000);
  };

  const today = new Date().toISOString().split("T")[0];
  const services = ["Meet & greet", "Grooming spa", "Vet consult", "Home delivery"] as const;
  const serviceIcon = { "Meet & greet": Heart, "Grooming spa": Scissors, "Vet consult": Stethoscope, "Home delivery": PawPrint };

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

        {/* APPOINTMENT BOOKING */}
        <div id="book" className="mt-20 rounded-[2.5rem] bg-card border border-border p-8 md:p-12 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/50 text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <CalendarCheck className="h-3.5 w-3.5" /> Book a visit
              </span>
              <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl leading-tight">
                Reserve your <span className="text-primary">purple hour</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Meet a pet, drop off your bestie for grooming, book a vet, or schedule home delivery. Free cancellation up to 4h before your slot.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {services.map((s) => {
                  const Icon = serviceIcon[s];
                  const active = appt.service === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setAppt({ ...appt, service: s })}
                      className={`flex items-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold text-left transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" /> {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={bookAppt} className="bg-background rounded-3xl p-6 border border-border">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Name</span>
                  <input
                    required
                    value={appt.name}
                    onChange={(e) => setAppt({ ...appt, name: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Phone</span>
                  <input
                    required
                    value={appt.phone}
                    onChange={(e) => setAppt({ ...appt, phone: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="+91 98xxxxxxxx"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Date</span>
                  <input
                    required
                    type="date"
                    min={today}
                    value={appt.date}
                    onChange={(e) => setAppt({ ...appt, date: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Time</span>
                  <select
                    value={appt.time}
                    onChange={(e) => setAppt({ ...appt, time: e.target.value })}
                    className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                  >
                    {["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
              >
                {apptDone ? <><CheckCircle2 className="h-5 w-5" /> Booked!</> : <><CalendarCheck className="h-4 w-4" /> Confirm booking</>}
              </button>
              {apptDone && (
                <p className="mt-3 text-center text-sm text-primary">
                  See you soon! We'll text a confirmation shortly. 💜
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}