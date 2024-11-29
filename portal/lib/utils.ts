import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensureDecodedUrl(url: string) {
  const decodedUrl = decodeURIComponent(url);

  if (url !== decodedUrl) {
    console.log("URL was URL-encoded.");
    return decodedUrl;
  } else {
    return url;
  }
}
