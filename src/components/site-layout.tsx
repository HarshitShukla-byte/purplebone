import { Link, useRouterState } from "@tanstack/react-router";
import { PawPrint, Menu, X, Instagram, Phone, ShoppingBag, Heart } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useShop } from "../lib/shop-store";
import { CartDrawer, WishlistDrawer } from "./shop-drawers";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/prospects", label: "Prospects" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { cartCount, state } = useShop();
  const wishCount = state.wishlist.length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* decorative blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 bg-primary/25 animate-blob blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] bg-accent/30 animate-blob blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 bg-primary/20 animate-blob blur-3xl [animation-delay:4s]" />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md group-hover:animate-wiggle">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">
              Purple<span className="text-primary">Bone</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setWishOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition"
              aria-label="Open wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold px-1">
                  {wishCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform ml-1"
            >
              <Phone className="h-4 w-4" /> Book
            </Link>
            <button
              className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl font-semibold hover:bg-primary/10 hover:text-primary"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 font-semibold"
              >
                <Phone className="h-4 w-4" /> Book a Call
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} onOpenCart={() => setCartOpen(true)} />

      <footer className="mt-24 border-t border-border/60 bg-background/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <PawPrint className="h-5 w-5" />
              </span>
              <span className="font-display font-bold text-lg">Purple<span className="text-primary">Bone</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              South Delhi's cutest pet family. Ethical. Playful. 100% tail-wag approved.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-display font-bold mb-2">Visit us</p>
            <p className="text-muted-foreground">GK-II Market, South Delhi</p>
            <p className="text-muted-foreground">Open daily · 10 AM – 9 PM</p>
          </div>
          <div className="text-sm">
            <p className="font-display font-bold mb-2">Say hi</p>
            <p className="text-muted-foreground">hello@purplebone.pet</p>
            <p className="text-muted-foreground">+91 98100 00000</p>
            <a href="#" className="mt-2 inline-flex items-center gap-1 text-primary font-semibold hover:underline">
              <Instagram className="h-4 w-4" /> @purplebone.pet
            </a>
          </div>
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Purple Bone Pet Shop · Made with 💜 in Delhi
        </div>
      </footer>
    </div>
  );
}