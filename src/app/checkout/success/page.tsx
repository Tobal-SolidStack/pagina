import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { plans } from "@/lib/data";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pago exitoso",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { plan } = await searchParams;
  const purchased = plans.find((p) => p.id === plan);
  const isSubscription = purchased?.billing === "/mes";

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <Link href={siteConfig.url}>
            <Logo className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/50">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            {isSubscription ? "¡Suscripción activa!" : "¡Pago confirmado!"}
          </h1>

          {purchased ? (
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              {isSubscription
                ? `Tu ${purchased.name} está activo. FLOW cobrará ${purchased.price} + IVA automáticamente cada mes.`
                : `Tu ${purchased.name} fue pagado exitosamente. Nos pondremos en contacto contigo pronto.`}
            </p>
          ) : (
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              Tu pago fue procesado correctamente. Nos pondremos en contacto pronto.
            </p>
          )}

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 text-left dark:border-blue-900/50 dark:bg-blue-950/30">
            <p className="font-semibold text-blue-900 dark:text-blue-200">¿Qué sigue?</p>
            <ul className="mt-3 space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li>1. Recibirás una confirmación en tu correo.</li>
              <li>2. Te contactaremos por WhatsApp en las próximas horas.</li>
              <li>3. Coordinamos el inicio de tu proyecto en 48 horas.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Escribirnos por WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-white/10">
        © {new Date().getFullYear()} {siteConfig.name}
      </footer>
    </div>
  );
}
