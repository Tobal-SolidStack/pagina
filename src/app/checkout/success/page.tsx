import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowLeft, Receipt, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { plans } from "@/lib/data";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pago exitoso",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{
    plan?: string;
    order?: string;
    amount?: string;
    email?: string;
    flowOrder?: string;
    customerId?: string;
    cardType?: string;
    last4?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const plan = plans.find((p) => p.id === params.plan);
  const isSubscription = plan?.billing === "/mes";

  const amount = params.amount
    ? `$${Number(params.amount).toLocaleString("es-CL")} CLP + IVA`
    : null;

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
          {/* Icono éxito */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/50">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              {isSubscription ? "¡Suscripción activa!" : "¡Pago confirmado!"}
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              {isSubscription
                ? "Tu tarjeta fue registrada y tu suscripción está activa."
                : "Tu pago fue procesado exitosamente por FLOW."}
            </p>
          </div>

          {/* Card con detalles */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
            {/* Servicio contratado */}
            {plan && (
              <div className="border-b border-neutral-100 bg-blue-50 px-6 py-5 dark:border-white/10 dark:bg-blue-950/30">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Servicio contratado
                </p>
                <p className="mt-1 text-xl font-bold text-neutral-900 dark:text-white">
                  {plan.name}
                </p>
                <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {plan.description}
                </p>
              </div>
            )}

            {/* Detalles del pago */}
            <div className="divide-y divide-neutral-100 px-6 dark:divide-white/10">
              {amount && (
                <Row icon={<Receipt className="h-4 w-4 text-neutral-400" />} label="Monto cobrado">
                  <span className="font-semibold">{amount}</span>
                  {isSubscription && (
                    <span className="ml-1 text-xs text-neutral-500">/ mes</span>
                  )}
                </Row>
              )}

              {params.email && (
                <Row icon={<CreditCard className="h-4 w-4 text-neutral-400" />} label="Correo">
                  {params.email}
                </Row>
              )}

              {params.last4 && (
                <Row icon={<CreditCard className="h-4 w-4 text-neutral-400" />} label="Tarjeta">
                  {params.cardType ? `${params.cardType} ` : ""}
                  terminada en <span className="ml-1 font-semibold">{params.last4}</span>
                </Row>
              )}

              {isSubscription && (
                <Row icon={<Calendar className="h-4 w-4 text-neutral-400" />} label="Próximo cobro">
                  Se cobrará automáticamente cada mes
                </Row>
              )}

              {params.order && (
                <Row icon={<Receipt className="h-4 w-4 text-neutral-400" />} label="Nº de orden">
                  <span className="font-mono text-xs">{params.order}</span>
                </Row>
              )}

              {params.flowOrder && (
                <Row icon={<Receipt className="h-4 w-4 text-neutral-400" />} label="Nº FLOW">
                  <span className="font-mono text-xs">{params.flowOrder}</span>
                </Row>
              )}

              {params.customerId && (
                <Row icon={<Receipt className="h-4 w-4 text-neutral-400" />} label="ID cliente FLOW">
                  <span className="font-mono text-xs">{params.customerId}</span>
                </Row>
              )}
            </div>

            {/* Próximos pasos */}
            <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-5 dark:border-white/10 dark:bg-neutral-800/50">
              <p className="mb-3 text-sm font-semibold text-neutral-900 dark:text-white">
                ¿Qué sigue?
              </p>
              <ol className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                <li>1. Recibirás una confirmación en tu correo.</li>
                <li>2. Te contactaremos por WhatsApp en las próximas horas.</li>
                <li>3. Coordinamos el inicio de tu proyecto en 48 horas.</li>
              </ol>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
        © {new Date().getFullYear()} {siteConfig.name} · Pago procesado por FLOW
      </footer>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="shrink-0">{icon}</span>
      <span className="w-36 shrink-0 text-sm text-neutral-500 dark:text-neutral-400">{label}</span>
      <span className="text-sm text-neutral-900 dark:text-white">{children}</span>
    </div>
  );
}
