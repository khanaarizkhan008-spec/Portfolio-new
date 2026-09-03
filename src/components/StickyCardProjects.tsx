"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { ArrowUpRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  description?: string;
  tags?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface StickyCard002Props {
  cards: ProjectCardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top+=100",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i;
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.85,
            rotation: position % 2 === 0 ? 3 : -3,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative h-full w-full min-h-[70vh]", className)} ref={container}>
      <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden py-6">
        <div
          className={cn(
            "relative h-[480px] w-full max-w-2xl overflow-hidden rounded-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90 shadow-2xl backdrop-blur-xl group"
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            >
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.alt || card.title || ""}
                  className={cn(
                    "h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60",
                    imageClassName,
                  )}
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 flex items-center justify-center">
                  <Layers className="text-amber-500/40" size={64} />
                </div>
              )}

              {card.title && (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      )}
                      {card.tags && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {card.tags.split(",").slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-white/10 backdrop-blur-md"
                            >
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {(card.liveUrl || card.githubUrl) && (
                      <a
                        href={card.liveUrl || card.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-lg shadow-amber-500/20"
                      >
                        <ArrowUpRight size={22} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { StickyCard002 };
