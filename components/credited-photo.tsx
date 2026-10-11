import Image from "next/image";

import type { Photo } from "@/lib/photos";

type CreditedPhotoProps = {
  photo: Photo;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  children?: React.ReactNode;
};

export function CreditedPhoto({
  photo,
  alt,
  sizes,
  className = "",
  imageClassName = "",
  eager = false,
  children,
}: CreditedPhotoProps) {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <Image
        src={photo.image}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={`object-cover ${imageClassName}`}
      />
      {children}
      <figcaption className="absolute right-2 bottom-2 max-w-[90%] truncate rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] leading-4 text-slate-300 backdrop-blur">
        <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-white">
          {photo.author}
        </a>
        {" · "}
        <a href={photo.licenseUrl} target="_blank" rel="noreferrer license" className="hover:text-white">
          {photo.license}
        </a>
      </figcaption>
    </figure>
  );
}
