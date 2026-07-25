import type { Pet } from "./shop-store";
import pom from "../assets/breed-pom.jpg";
import shih from "../assets/breed-shihtzu.jpg";
import persian from "../assets/breed-persian.jpg";
import lab from "../assets/breed-lab.jpg";
import rabbit from "../assets/breed-rabbit.jpg";
import fish from "../assets/breed-fish.jpg";

export const PETS: Pet[] = [
  { id: "pom", name: "Pomeranian", category: "Dog", tag: "Tiny floof", vibe: "Main character energy", price: 45000, img: pom },
  { id: "shih", name: "Shih Tzu", category: "Dog", tag: "Lap royalty", vibe: "Sassy but soft", price: 38000, img: shih },
  { id: "lab", name: "Labrador", category: "Dog", tag: "Best friend fr", price: 28000, vibe: "Golden bestie", img: lab },
  { id: "persian", name: "Persian Kitten", category: "Cat", tag: "Fluff overload", vibe: "Certified diva", price: 32000, img: persian },
  { id: "maine", name: "Maine Coon", category: "Cat", tag: "Gentle giant", vibe: "King behavior", price: 55000, img: persian },
  { id: "bunny", name: "Holland Lop Bunny", category: "Rabbit", tag: "Hop hop", vibe: "Salad enjoyer", price: 4500, img: rabbit },
  { id: "angora", name: "Angora Rabbit", category: "Rabbit", tag: "Cloud puff", vibe: "Pure serotonin", price: 6000, img: rabbit },
  { id: "goldfish", name: "Fancy Goldfish", category: "Fish", tag: "Tank icon", vibe: "Zen vibes", price: 800, img: fish },
  { id: "betta", name: "Betta Fish", category: "Fish", tag: "Rainbow fins", vibe: "Runway walk", price: 1200, img: fish },
];

export const CATEGORIES = ["All", "Dog", "Cat", "Fish", "Rabbit"] as const;
export type Category = (typeof CATEGORIES)[number];