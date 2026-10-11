import type { PhotoId } from "./photos";

export const testimonialIds = [
  "remote-developer",
  "consulting-founder",
  "textile-brand",
  "rice-export",
  "kep-retirees",
  "siem-reap-family",
] as const;

export type TestimonialId = (typeof testimonialIds)[number];

export type Testimonial = {
  id: TestimonialId;
  // Fictional personas: names are illustrative and photos never show identifiable faces.
  name: string;
  initials: string;
  photoId: PhotoId;
};

export const testimonials: Record<TestimonialId, Testimonial> = {
  "remote-developer": { id: "remote-developer", name: "Léa M.", initials: "LM", photoId: "nomad-laptop" },
  "consulting-founder": { id: "consulting-founder", name: "Daniel W.", initials: "DW", photoId: "founder-meeting" },
  "textile-brand": { id: "textile-brand", name: "Sokha L.", initials: "SL", photoId: "ikat-weaving" },
  "rice-export": { id: "rice-export", name: "Carlos R.", initials: "CR", photoId: "rice-planting" },
  "kep-retirees": { id: "kep-retirees", name: "Margaret & John E.", initials: "ME", photoId: "kep-sunset" },
  "siem-reap-family": { id: "siem-reap-family", name: "Anna & Tomáš N.", initials: "AN", photoId: "siem-reap-fisherman" },
};

export const featuredTestimonialIds: TestimonialId[] = ["consulting-founder", "textile-brand", "kep-retirees"];
