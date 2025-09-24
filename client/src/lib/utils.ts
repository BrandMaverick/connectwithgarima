import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageURL(name: string | null, location: string = "images"): string {

  if (name === null)
    return "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  if (/^(https?:\/\/|data:|blob:)/.test(name)) {
    return name;
  }
  return new URL(`../assets/${location}/${name}`, import.meta.url).href
  }

export const scrollToContact = () => {
  const element = document.getElementById('contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
 };
