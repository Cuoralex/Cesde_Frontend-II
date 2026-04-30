import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind evitando conflictos de especificidad.
 * @param {...import("clsx").ClassValue[]} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}