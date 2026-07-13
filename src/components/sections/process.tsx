"use client";

import { MessageSquare, Users, PenTool, Globe, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/lib/data";

const stepIcons: LucideIcon[] = [MessageSquare, Users, PenTool, Globe, TrendingUp];

export function Process() {
  return (
    <section id="proceso" className="bg-neutral-50 py-24 dark:bg-neutral-900/40 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso simple, claro y sin complicaciones"
          description="Desde el primer mensaje hasta tu página web publicada."
        />

        <div className="relative mt-20 pl-10 sm:pl-14">
          <div className="absolute left-[1.55rem] top-2 bottom-2 w-px bg-gradient-to-b from-blue-600 via-blue-400 to-transparent sm:left-[1.9rem]" />

          <div className="space-y-12">
            {processSteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              return (
                <Reveal key={step.step} effect="slide-up" delay={idx * 0.05} className="relative">
                  <span className="absolute -left-10 top-0 flex h-11 w-11 items-center justify-center rounded-full brand-gradient text-white shadow-lg shadow-blue-600/25 sm:-left-14 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Paso {step.step}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
