import { useState } from "react";
import { X, Trash2, Minus, Plus, ShoppingBag, Heart, PawPrint } from "lucide-react";
import { useShop, formatINR } from "../lib/shop-store";
import { toast } from "sonner";

function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-display font-bold text-xl">{title}</h3>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, setQty, removeFromCart, clearCart, cartTotal } = useShop();

  const checkout = () => {
    toast.success("Order placed! 💜", { description: "We'll call to confirm within an hour." });
    clearCart();
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} title={`Your Cart (${state.cart.length})`}>
      {state.cart.length === 0 ? (
        <div className="p-10 text-center text-muted-foreground">
          <ShoppingBag className="h-12 w-12 mx-auto text-primary/40" />
          <p className="mt-4 font-semibold">Your cart is empty</p>
          <p className="mt-1 text-sm">Add a floof or two to get started 🐾</p>
        </div>
      ) : (
        <>
          <ul className="p-5 space-y-4">
            {state.cart.map((c) => (
              <li key={c.id} className="flex gap-3 bg-card rounded-2xl p-3 border border-border">
                <img src={c.img} alt={c.name} className="h-20 w-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-display font-bold truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.category} · {c.tag}</p>
                    </div>
                    <button onClick={() => removeFromCart(c.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(c.id, c.qty - 1)} className="grid h-8 w-8 place-items-center hover:bg-muted rounded-l-full" aria-label="Decrease">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{c.qty}</span>
                      <button onClick={() => setQty(c.id, c.qty + 1)} className="grid h-8 w-8 place-items-center hover:bg-muted rounded-r-full" aria-label="Increase">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="font-bold text-primary">{formatINR(c.price * c.qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 bg-background border-t border-border p-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display font-bold text-2xl">{formatINR(cartTotal)}</span>
            </div>
            <button
              onClick={checkout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
            >
              Checkout · Pay at store
            </button>
            <p className="text-center text-xs text-muted-foreground">Reserve now, pay when you meet your bestie 💜</p>
          </div>
        </>
      )}
    </Drawer>
  );
}

export function WishlistDrawer({
  open,
  onClose,
  onOpenCart,
}: {
  open: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}) {
  const { state, toggleWish, addToCart } = useShop();

  return (
    <Drawer open={open} onClose={onClose} title={`Wishlist (${state.wishlist.length})`}>
      {state.wishlist.length === 0 ? (
        <div className="p-10 text-center text-muted-foreground">
          <Heart className="h-12 w-12 mx-auto text-primary/40" />
          <p className="mt-4 font-semibold">Nothing saved yet</p>
          <p className="mt-1 text-sm">Tap the heart on any pet you love 🥺</p>
        </div>
      ) : (
        <ul className="p-5 space-y-4">
          {state.wishlist.map((p) => (
            <li key={p.id} className="flex gap-3 bg-card rounded-2xl p-3 border border-border">
              <img src={p.img} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category} · {formatINR(p.price)}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(p);
                      toggleWish(p);
                      onClose();
                      onOpenCart();
                      toast.success(`${p.name} added to cart`);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold hover:scale-105 transition-transform"
                  >
                    <PawPrint className="h-3 w-3" /> Add to cart
                  </button>
                  <button
                    onClick={() => toggleWish(p)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}

export function useShopDrawers() {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  return { cartOpen, setCartOpen, wishOpen, setWishOpen };
}