"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappHref } from "@/lib/site-config";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Fondo con formas geométricas sutiles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950" />
        <div className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.35] dark:opacity-[0.08]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <motion.div
          className="absolute right-[8%] top-[20%] h-16 w-16 rounded-2xl border border-blue-600/20 bg-blue-600/5"
          animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[6%] bottom-[15%] h-10 w-10 rounded-full border border-sky-500/25 bg-sky-500/5"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Diseño web profesional en Chile
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Creamos la página web que{" "}
            <span className="text-gradient">tu negocio necesita</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-400"
          >
            Diseño y desarrollo de sitios web modernos, rápidos y profesionales para emprendedores y empresas en Chile, desde solo{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">$79.990 + IVA</span>.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <a href="#planes">
                Ver Planes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400"
          >
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">+100</p>
              <p>Clientes felices</p>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">3 días</p>
              <p>Entrega promedio</p>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">99%</p>
              <p>Recomiendan</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/hero-mockup.svg"
              alt="Mockup de una página web moderna diseñada para negocios"
              width={560}
              height={480}
              priority
              className="h-auto w-full drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
