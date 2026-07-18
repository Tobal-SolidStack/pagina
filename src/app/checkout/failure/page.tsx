import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, MessageCircle, RotateCcw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { plans } from "@/lib/data";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pago no procesado",
  robots: { index: false, follow: false },
};

const FAILURE_REASONS = [
  "Fondos insuficientes en la tarjeta.",
  "Tarjeta bloqueada o vencida.",
  "Error de comunicación con el banco.",
  "El pago fue cancelado.",
];

type Props = {
  searchParams: Promise<{ plan?: string; order?: string }>;
};

export default async function FailurePage({ searchParams }: Props) {
  const { plan, order } = await searchParams;
  const retryHref = plan ? `/checkout?plan=${plan}` : "/checkout";
  const purchased = plans.find((p) => p.id === plan);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <Link href={siteConfig.url}>
            <Logo className="h-7 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">
          {/* Icono error */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              El pago no se completó
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              No se realizó ningún cargo a tu tarjeta.
            </p>
          </div>

          {/* Card con detalles */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
            {/* Plan que intentó comprar */}
            {purchased && (
              <div className="border-b border-neutral-100 bg-red-50 px-6 py-5 dark:border-white/10 dark:bg-red-950/20">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Pago fallido
                </p>
                <p className="mt-1 text-xl font-bold text-neutral-900 dark:text-white">
                  {purchased.name}
                </p>
                <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {purchased.price} + IVA {purchased.billing}
                </p>
              </div>
            )}

            {/* Nº de orden si existe */}
            {order && (
              <div className="border-b border-neutral-100 px-6 py-4 dark:border-white/10">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Referencia: <span className="font-mono">{order}</span>
                </p>
              </div>
            )}

            {/* Posibles causas */}
            <div className="px-6 py-5">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="mb-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    Posibles causas
                  </p>
                  <ul className="space-y-1">
                    {FAILURE_REASONS.map((r) => (
                      <li key={r} className="text-sm text-neutral-600 dark:text-neutral-400">
                        · {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Nota: sin cargo */}
            <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-4 dark:border-white/10 dark:bg-neutral-800/50">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Si el problema persiste, contáctanos por WhatsApp y te ayudamos a completar la compra.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={retryHref}>
                <RotateCcw className="h-4 w-4" />
                Intentar de nuevo
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Ayuda por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-white/10">
        © {new Date().getFullYear()} {siteConfig.name} · Pago procesado por FLOW
      </footer>
    </div>
  );
}
