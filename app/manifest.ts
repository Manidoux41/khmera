import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KHMERA",
    short_name: "KHMERA",
    description: "International platform for expats, entrepreneurs and travellers in Cambodia.",
    start_url: "/en",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#092b69",
    icons: [
      {
        src: "/khmera-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
