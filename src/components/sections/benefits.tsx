"use client";

import { motion } from "framer-motion";
import { Clock, RefreshCw, ShieldCheck, TrendingUp, Headset, Zap, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { benefits, type Benefit } from "@/lib/data";

const icons: Record<Benefit["icon"], LucideIcon> = {
  clock: Clock,
  refresh: RefreshCw,
  shield: ShieldCheck,
  "trending-up": TrendingUp,
  headset: Headset,
  zap: Zap,
};

export function Benefits() {
  return (
    <section id="beneficios" aria-label="Por qué elegir SolidStack" className="bg-neutral-50 py-24 dark:bg-neutral-900/40 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Lo que nos hace diferentes"
          description="No somos uno más. Estos son los compromisos concretos que nos diferencian de cualquier otro freelancer o agencia."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = icons[benefit.icon];
            return (
              <StaggerItem key={benefit.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-600/10 dark:border-white/10 dark:bg-neutral-900"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-600/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl brand-gradient text-white shadow-lg shadow-blue-600/25">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold text-neutral-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {benefit.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
