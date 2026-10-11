import type { StaticImageData } from "next/image";

import angkorWatSunrise from "@/public/images/photos/angkor-wat-sunrise.jpg";
import centralMarket from "@/public/images/photos/central-market.jpg";
import phnomPenhSkyline from "@/public/images/photos/phnom-penh-skyline.jpg";
import pubStreet from "@/public/images/photos/pub-street.jpg";
import riceFields from "@/public/images/photos/rice-fields.jpg";
import riverside from "@/public/images/photos/riverside.jpg";
import royalPalace from "@/public/images/photos/royal-palace.jpg";
import streetFood from "@/public/images/photos/street-food.jpg";
import tonleSap from "@/public/images/photos/tonle-sap.jpg";
import tukTuk from "@/public/images/photos/tuk-tuk.jpg";

export const photoIds = [
  "angkor-wat-sunrise",
  "phnom-penh-skyline",
  "royal-palace",
  "pub-street",
  "riverside",
  "tonle-sap",
  "central-market",
  "rice-fields",
  "tuk-tuk",
  "street-food",
] as const;

export type PhotoId = (typeof photoIds)[number];

export type Photo = {
  id: PhotoId;
  image: StaticImageData;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const BY2 = "https://creativecommons.org/licenses/by/2.0/";
const BY_SA2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const BY_SA3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const BY_SA4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

// Royalty-free photos from Wikimedia Commons, resized to 1600px. CC BY / BY-SA require attribution.
export const photos: Record<PhotoId, Photo> = {
  "angkor-wat-sunrise": {
    id: "angkor-wat-sunrise",
    image: angkorWatSunrise,
    author: "Vladimir Pankratov",
    license: "CC BY-SA 2.0",
    licenseUrl: BY_SA2,
    sourceUrl: commons("Sunrise_at_Angkor_Wat_Cambodia.jpg"),
  },
  "phnom-penh-skyline": {
    id: "phnom-penh-skyline",
    image: phnomPenhSkyline,
    author: "Mao Piseth",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA4,
    sourceUrl: commons("Skyline_of_Phnom_Penh.jpg"),
  },
  "royal-palace": {
    id: "royal-palace",
    image: royalPalace,
    author: "Hanay",
    license: "CC BY-SA 3.0",
    licenseUrl: BY_SA3,
    sourceUrl: commons("Royal_Palace,_Phnom_Penh_Cambodia_1.jpg"),
  },
  "pub-street": {
    id: "pub-street",
    image: pubStreet,
    author: "Marcin Konsek",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA4,
    sourceUrl: commons("2016_Siem_Reab,_Pub_Street_noc%C4%85.jpg"),
  },
  riverside: {
    id: "riverside",
    image: riverside,
    author: "Christophe95",
    license: "CC BY-SA 4.0",
    licenseUrl: BY_SA4,
    sourceUrl: commons("Riverside_Park,_Phnom_Penh_2.jpg"),
  },
  "tonle-sap": {
    id: "tonle-sap",
    image: tonleSap,
    author: "David Sim",
    license: "CC BY 2.0",
    licenseUrl: BY2,
    sourceUrl: commons("The_floating_village-Tonle_Sap_lake.jpg"),
  },
  "central-market": {
    id: "central-market",
    image: centralMarket,
    author: "Mx. Granger",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: commons("Phnom_Penh_Central_Market_-_January_2020_-_3.jpg"),
  },
  "rice-fields": {
    id: "rice-fields",
    image: riceFields,
    author: "Gary Todd",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: commons("Cambodia_Rice_Fields_(9728044881).jpg"),
  },
  "tuk-tuk": {
    id: "tuk-tuk",
    image: tukTuk,
    author: "Mx. Granger",
    license: "CC0",
    licenseUrl: CC0,
    sourceUrl: commons("Tuk-tuk_in_Phnom_Penh.jpg"),
  },
  "street-food": {
    id: "street-food",
    image: streetFood,
    author: "Luca Nebuloni",
    license: "CC BY 2.0",
    licenseUrl: BY2,
    sourceUrl: commons("Cambodian_skewers_(23687297234).jpg"),
  },
};

export const galleryPhotoIds: PhotoId[] = [
  "pub-street",
  "royal-palace",
  "tonle-sap",
  "riverside",
  "central-market",
  "rice-fields",
];

// Indexed like listingSlugs in lib/i18n.ts.
export const listingPhotoIds: PhotoId[] = [
  "phnom-penh-skyline",
  "central-market",
  "riverside",
  "tuk-tuk",
];
