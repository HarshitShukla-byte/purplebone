import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";

export type Pet = {
  id: string;
  name: string;
  category: "Dog" | "Cat" | "Fish" | "Rabbit";
  tag: string;
  vibe: string;
  price: number;
  img: string;
};

export type CartItem = Pet & { qty: number };

type State = { cart: CartItem[]; wishlist: Pet[] };
type Action =
  | { type: "add_cart"; pet: Pet }
  | { type: "remove_cart"; id: string }
  | { type: "set_qty"; id: string; qty: number }
  | { type: "toggle_wish"; pet: Pet }
  | { type: "clear_cart" }
  | { type: "hydrate"; state: State };

const STORAGE_KEY = "purplebone.shop.v1";
const initial: State = { cart: [], wishlist: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add_cart": {
      const existing = state.cart.find((c) => c.id === action.pet.id);
      const cart = existing
        ? state.cart.map((c) => (c.id === action.pet.id ? { ...c, qty: c.qty + 1 } : c))
        : [...state.cart, { ...action.pet, qty: 1 }];
      return { ...state, cart };
    }
    case "remove_cart":
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };
    case "set_qty":
      return {
        ...state,
        cart: state.cart
          .map((c) => (c.id === action.id ? { ...c, qty: Math.max(0, action.qty) } : c))
          .filter((c) => c.qty > 0),
      };
    case "toggle_wish": {
      const exists = state.wishlist.some((w) => w.id === action.pet.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((w) => w.id !== action.pet.id)
          : [...state.wishlist, action.pet],
      };
    }
    case "clear_cart":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  addToCart: (pet: Pet) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWish: (pet: Pet) => void;
  clearCart: () => void;
  isWished: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
};

const ShopContext = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<Ctx>(() => {
    const cartCount = state.cart.reduce((s, c) => s + c.qty, 0);
    const cartTotal = state.cart.reduce((s, c) => s + c.qty * c.price, 0);
    return {
      state,
      addToCart: (pet) => dispatch({ type: "add_cart", pet }),
      removeFromCart: (id) => dispatch({ type: "remove_cart", id }),
      setQty: (id, qty) => dispatch({ type: "set_qty", id, qty }),
      toggleWish: (pet) => dispatch({ type: "toggle_wish", pet }),
      clearCart: () => dispatch({ type: "clear_cart" }),
      isWished: (id) => state.wishlist.some((w) => w.id === id),
      cartCount,
      cartTotal,
    };
  }, [state]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}