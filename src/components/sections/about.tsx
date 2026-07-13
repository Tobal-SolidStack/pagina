"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const highlights = [
  "Más de 100 proyectos entregados a emprendedores y empresas",
  "Atención personalizada en cada etapa del proyecto",
  "Diseños a medida, sin plantillas genéricas",
  "Acompañamiento incluso después de la entrega",
];

export function About() {
  return (
    <section id="nosotros" aria-label="Sobre nosotros - Equipo de desarrollo web" className="bg-neutral-50 py-24 dark:bg-neutral-900/40 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal effect="slide-right">
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/about-illustration.svg"
              alt="Equipo de especialistas en desarrollo web"
              width={480}
              height={440}
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <Reveal effect="slide-left">
          <span className="mb-3 inline-block rounded-full bg-blue-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            Nosotros
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Somos especialistas en desarrollo web
          </h2>
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
            Ayudamos a emprendedores y empresas a dar el salto al mundo digital con páginas web
            modernas, rápidas y pensadas para generar confianza. Combinamos diseño profesional,
            buenas prácticas técnicas y atención cercana para que tu negocio tenga la presencia
            online que se merece.
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
