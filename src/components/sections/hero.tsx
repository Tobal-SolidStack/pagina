import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappHref } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Fondo */}
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
        <div className="animate-float absolute right-[8%] top-[20%] h-16 w-16 rounded-2xl border border-blue-600/20 bg-blue-600/5" />
        <div className="animate-float-sm absolute left-[6%] bottom-[15%] h-10 w-10 rounded-full border border-sky-500/25 bg-sky-500/5" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span
            className="animate-fade-up glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Diseño web profesional en Chile
          </span>

          <h1
            className="animate-fade-up text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white"
            style={{ animationDelay: "0.17s" }}
          >
            Tu página web lista en{" "}
            <span className="text-gradient">48 horas</span>{" "}
            — o con todo incluido desde{" "}
            <span className="text-gradient">$49.990/mes</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-400"
            style={{ animationDelay: "0.29s" }}
          >
            No más páginas que quedan obsoletas. Con SolidStack tu sitio siempre está actualizado, siempre funcionando y con soporte incluido.{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              Sin contrato largo. Cancelas cuando quieras.
            </span>
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.41s" }}
          >
            <Button asChild size="lg" className="group">
              <a href="#planes">
                Ver Planes y Precios
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>

          <div
            className="animate-fade-up mt-12 flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400"
            style={{ animationDelay: "0.53s" }}
          >
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">48 hrs</p>
              <p>Tiempo de entrega</p>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">$0</p>
              <p>Costo de entrada</p>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">99%</p>
              <p>Clientes satisfechos</p>
            </div>
          </div>
        </div>

        <div
          className="animate-fade-scale relative mx-auto w-full max-w-lg"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="animate-float-img">
            <Image
              src="/hero-mockup.svg"
              alt="Mockup de una página web moderna diseñada para negocios en Chile"
              width={560}
              height={480}
              priority
              className="h-auto w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
