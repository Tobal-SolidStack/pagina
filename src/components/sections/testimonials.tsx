"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const goTo = React.useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index]
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonios" className="bg-neutral-50 py-24 dark:bg-neutral-900/40 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
          description="Negocios reales que ya confían en nuestro trabajo."
        />

        <div className="relative mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900 sm:p-12">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-blue-600/10" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                  &ldquo;{current.comment}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">{current.name}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{current.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Testimonio anterior"
              onClick={() => goTo(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/10 dark:text-neutral-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-blue-600" : "w-2 bg-neutral-300 dark:bg-neutral-700"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Siguiente testimonio"
              onClick={() => goTo(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/10 dark:text-neutral-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
