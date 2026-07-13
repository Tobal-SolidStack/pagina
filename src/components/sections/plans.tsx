"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { plans } from "@/lib/data";
import { whatsappHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <section id="planes" aria-label="Planes y precios de diseño web" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Planes"
          title="Elige el plan ideal para tu negocio"
          description="Precios claros y sin sorpresas. Todos los planes incluyen diseño profesional y responsive."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => (
            <StaggerItem key={plan.id} effect="zoom">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8",
                  plan.featured
                    ? "border-blue-600 bg-white shadow-2xl shadow-blue-600/20 lg:scale-105 dark:bg-neutral-900"
                    : "border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900"
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="solid" className="flex items-center gap-1 shadow-lg">
                      <Sparkles className="h-3.5 w-3.5" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-neutral-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">/ pago único</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={plan.featured ? "default" : "outline"}
                  className="mt-8 w-full"
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Contratar
                  </a>
                </Button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ComparisonTable />
      </div>
    </section>
  );
}
