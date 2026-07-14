"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { portfolioItems } from "@/lib/data";

export function Portfolio() {
  return (
    <section id="portafolio" aria-label="Portafolio de proyectos web realizados" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos que ya están generando resultados"
          description="Algunos de los sitios web que hemos creado para nuestros clientes."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioItems.map((project) => (
            <StaggerItem key={project.id}>
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900"
              >
                {/* Área del logo */}
                <div className="relative flex h-48 items-center justify-center bg-neutral-50 p-10 dark:bg-neutral-800">
                  <img
                    src={project.image}
                    alt={`Logo de ${project.name}`}
                    className="max-h-24 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow">
                      Ver sitio
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="border-t border-neutral-100 p-5 dark:border-white/5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {project.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-neutral-900 dark:text-white">
                    {project.name}
                  </h3>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
