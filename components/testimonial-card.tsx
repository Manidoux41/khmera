import { CreditedPhoto } from "@/components/credited-photo";
import type { Messages } from "@/lib/i18n";
import { photos } from "@/lib/photos";
import { testimonials, type TestimonialId } from "@/lib/testimonials";

type TestimonialCardProps = {
  id: TestimonialId;
  messages: Messages;
};

export function TestimonialCard({ id, messages }: TestimonialCardProps) {
  const testimonial = testimonials[id];
  const item = messages.testimonials.items[id];
  const photoId = testimonial.photoId;

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
      <CreditedPhoto
        photo={photos[photoId]}
        alt={messages.photos.alt[photoId]}
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="h-52"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <p className="absolute top-4 left-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {item.service}
        </p>
      </CreditedPhoto>

      <div className="flex flex-1 flex-col p-7">
        <blockquote className="relative flex-1 text-[15px] leading-7 text-slate-200">
          <span aria-hidden="true" className="absolute -top-3 -left-1 text-5xl leading-none text-emerald-400/40">“</span>
          <p className="relative pl-5">{item.quote}</p>
        </blockquote>

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">{messages.testimonials.resultLabel}</p>
          <p className="mt-1 text-sm font-medium text-white">{item.result}</p>
        </div>

        <footer className="mt-6 flex items-center gap-4 border-t border-slate-800 pt-5">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-semibold text-white"
          >
            {testimonial.initials}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-white">{testimonial.name}</p>
            <p className="text-sm text-slate-400">
              {item.role} · {item.place}
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
}
