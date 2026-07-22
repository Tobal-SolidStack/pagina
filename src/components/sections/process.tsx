"use client";

import Link from "next/link";
import { CreditCard, MessageCircle, LayoutTemplate, Rocket, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { processSteps, type ProcessStep } from "@/lib/data";

const stepIcons: Record<ProcessStep["icon"], LucideIcon> = {
  "credit-card": CreditCard,
  "message-circle": MessageCircle,
  "layout": LayoutTemplate,
  "rocket": Rocket,
};

export function Process() {
  return (
    <section id="proceso" className="bg-neutral-50 py-24 dark:bg-neutral-900/40 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="¿Cómo funciona?"
          title="De la compra a tu web en 3 días"
          description="Un proceso simple y sin sorpresas. Nosotros nos encargamos de todo."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {processSteps.map((step) => {
            const Icon = stepIcons[step.icon];
            return (
              <StaggerItem key={step.step}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-blue-600/5 dark:border-white/10 dark:bg-neutral-900">
                  {/* Big background number */}
                  <span className="absolute -right-2 -top-4 select-none text-[88px] font-black leading-none text-neutral-100 dark:text-white/5">
                    {String(step.step).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl brand-gradient text-white shadow-md shadow-blue-600/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Timing badge */}
                    <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400">
                      {step.timing}
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            ¿Listo para tener tu sitio web?
          </p>
          <Link
            href="#planes"
            className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Ver planes y precios →
          </Link>
        </div>
      </div>
    </section>
  );
}
