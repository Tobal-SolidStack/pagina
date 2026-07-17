"use client";

import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { SectionHeading } from "@/components/section-heading";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section id="resultados" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 brand-gradient opacity-95" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="¿Por qué elegirnos?"
          title="Resultados que hablan por nosotros"
          description="La confianza de nuestros clientes es nuestro mejor respaldo."
          className="[&_h2]:text-white [&_p]:text-blue-100 [&_span]:text-blue-100"
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:max-w-2xl sm:mx-auto">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} effect="zoom">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-white sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-blue-100 sm:text-base">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
