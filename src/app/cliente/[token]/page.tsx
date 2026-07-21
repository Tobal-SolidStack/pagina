import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Wrench, Eye, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import { Logo } from "@/components/icons/logo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Estado de tu proyecto — SolidStack",
  robots: { index: false, follow: false },
};

const STEPS = [
  { key: "pending",     label: "Pago recibido",    icon: CheckCircle2, desc: "Tu compra fue procesada exitosamente." },
  { key: "in_progress", label: "En desarrollo",     icon: Wrench,       desc: "Estamos construyendo tu sitio web." },
  { key: "review",      label: "En revisión",       icon: Eye,          desc: "Tu sitio está listo para que lo revises." },
  { key: "delivered",   label: "Entregado",         icon: CheckCircle2, desc: "¡Tu sitio web está publicado!" },
];

const PLAN_LABELS: Record<string, string> = {
  lanzamiento: "Plan Lanzamiento",
  negocio: "Plan Negocio",
  pro: "Plan Pro",
};

function stepIndex(status: string) {
  const idx = STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
}

type Props = { params: Promise<{ token: string }> };

export default async function ClientPortalPage({ params }: Props) {
  const { token } = await params;

  const client = await db.client.findUnique({
    where: { accessToken: token },
    include: { project: true },
  });

  if (!client) return notFound();

  const projectStatus = client.project?.status ?? "pending";
  const currentStep = stepIndex(projectStatus);
  const deliveryDate = client.project?.deliveryDate
    ? new Date(client.project.deliveryDate).toLocaleDateString("es-CL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const waLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola! Soy ${client.name}, quiero consultar sobre mi proyecto (orden: ${client.commerceOrder ?? ""}).`)}`;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/">
            <Logo className="h-7 w-auto" />
          </Link>
          <span className="text-xs text-neutral-500">Portal del cliente</span>
        </div>
      </header>

      <main className="flex-1 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Saludo */}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
              Hola, {client.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              {PLAN_LABELS[client.plan] ?? client.plan} · {client.email}
            </p>
          </div>

          {/* Progress tracker */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <div className="border-b border-neutral-100 px-6 py-5 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Estado del proyecto
              </p>
              <p className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">
                {STEPS[currentStep].label}
              </p>
              <p className="mt-0.5 text-sm text-neutral-500">{STEPS[currentStep].desc}</p>
            </div>

            {/* Steps */}
            <div className="px-6 py-6">
              <div className="relative">
                {/* Connector line */}
                <div
                  className="absolute left-5 top-5 h-[calc(100%-40px)] w-0.5 bg-neutral-200 dark:bg-white/10"
                  aria-hidden="true"
                />
                <ol className="space-y-6">
                  {STEPS.map((step, idx) => {
                    const done = idx <= currentStep;
                    const active = idx === currentStep;
                    const Icon = step.icon;
                    return (
                      <li key={step.key} className="relative flex gap-4">
                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
                            done
                              ? active
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-green-500 bg-green-500 text-white"
                              : "border-neutral-200 bg-white text-neutral-400 dark:border-white/10 dark:bg-neutral-900"
                          }`}
                        >
                          {done && !active ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex min-h-[40px] flex-col justify-center">
                          <p
                            className={`text-sm font-semibold ${
                              done
                                ? "text-neutral-900 dark:text-white"
                                : "text-neutral-400"
                            }`}
                          >
                            {step.label}
                            {active && (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-blue-600/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                                <Clock className="h-3 w-3" />
                                Actual
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-neutral-500">{step.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* Fecha de entrega */}
            {deliveryDate && (
              <div className="border-t border-neutral-100 bg-blue-50 px-6 py-4 dark:border-white/10 dark:bg-blue-950/20">
                <p className="text-xs text-neutral-500">Fecha estimada de entrega</p>
                <p className="mt-0.5 text-sm font-semibold text-blue-700 dark:text-blue-400">
                  {deliveryDate}
                </p>
              </div>
            )}
          </div>

          {/* Resumen compra */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <div className="px-6 py-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Tu compra
              </p>
              <dl className="space-y-3 text-sm">
                {[
                  ["Plan", PLAN_LABELS[client.plan] ?? client.plan],
                  ["Monto", `$${client.amount.toLocaleString("es-CL")} CLP`],
                  client.commerceOrder ? ["Nº de orden", client.commerceOrder] : null,
                  ["Fecha de compra", new Date(client.createdAt).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })],
                ]
                  .filter(Boolean)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-neutral-500">{k}</dt>
                      <dd className="text-right font-medium text-neutral-900 dark:text-white">{v}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>

          {/* CTA WhatsApp */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/40 dark:bg-green-950/20">
            <p className="font-semibold text-neutral-900 dark:text-white">¿Tienes alguna consulta?</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Escríbenos por WhatsApp y te respondemos en minutos.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-400 dark:border-white/10">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.email}
      </footer>
    </div>
  );
}
