import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Short navy hero over sheer navy handloom silk with a gold zari border: the line
 * and actions on the left, the SAAJ emblem (figure + typeset wordmark) on the right.
 * Background: original artwork generated for SAAJ (public/hero/), not a product photo.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0f1530] text-ivory-50">
      <Image
        src="/hero/sheer-navy-zari.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 animate-fade-in object-cover object-[22%_50%] md:object-center"
      />
      {/* quiet the silk so it frames the content instead of competing with it */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#0f1530]/45" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_70%_75%_at_50%_50%,rgba(15,21,48,0.9)_0%,rgba(15,21,48,0.55)_55%,rgba(15,21,48,0)_100%)]" />

      {/* fine double gold frame, inset like a saree's border */}
      <div aria-hidden className="pointer-events-none absolute inset-3 -z-10 border border-gold-500/45 md:inset-5" />
      <div aria-hidden className="pointer-events-none absolute inset-[18px] -z-10 border border-gold-500/20 md:inset-[26px]" />

      <div className="container-saaj px-9 py-12 sm:px-8 md:px-14 md:py-16">
        <div className="flex flex-col items-center gap-9 md:flex-row md:justify-center md:gap-20 lg:gap-32">
          {/* words */}
          <div className="flex w-full flex-col items-center text-center md:w-auto md:items-start md:text-left">
            <h1 className="animate-fade-up text-[2.1rem] leading-[1.1] !text-ivory-50 [animation-delay:100ms] sm:text-[2.6rem] lg:text-[3.3rem]">
              Threads of Tradition, <span className="block italic text-gold-300">Woven with Love.</span>
            </h1>
            <Ornament className="mt-5 animate-fade-up [animation-delay:160ms]" />
            <p className="mt-4 animate-fade-up font-display text-lg text-ivory-100/80 italic [animation-delay:220ms]">{site.bioLine}</p>
            <div className="mt-8 flex w-full animate-fade-up flex-col gap-3 [animation-delay:280ms] sm:w-auto sm:flex-row">
              <Link href="/shop" className="btn-gold">
                Explore sarees
              </Link>
              <Link href="/our-story" className="btn-outline-light">
                Our story
              </Link>
            </div>
          </div>

          {/* emblem: the figure from the logo, with the wordmark set in type so it stays crisp */}
          <div className="relative order-first flex shrink-0 animate-fade-in flex-col items-center md:order-none">
            <span aria-hidden className="absolute top-1/3 left-1/2 -z-10 size-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(230,211,166,0.14),rgba(15,21,48,0.85)_55%,rgba(15,21,48,0)_100%)]" />
            <Image
              src="/brand/saaj-figure.png"
              alt="SAAJ – Threads of Tradition"
              width={440}
              height={720}
              priority
              sizes="(min-width: 1024px) 9rem, (min-width: 768px) 7.5rem, 5rem"
              className="h-32 w-auto opacity-70 drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] md:h-48 lg:h-56"
            />
            <p className="mt-4 pl-[0.4em] font-display text-xl leading-none tracking-[0.4em] text-gold-300/80 md:mt-4 md:text-2xl">SAAJ</p>
            <span aria-hidden className="mt-2 h-px w-24 bg-gold-400/45 md:w-28" />
            <p className="mt-2 pl-[0.3em] text-[0.5rem] tracking-[0.3em] text-gold-300/65 uppercase md:text-[0.56rem]">Threads of Tradition</p>
          </div>
        </div>
      </div>
    </section>
  );
}
