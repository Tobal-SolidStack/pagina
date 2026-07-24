"use client";

import { useEffect, useState } from "react";
import { Settings, CheckCircle, XCircle, AlertCircle } from "lucide-react";

type FlowMode = "sandbox" | "production" | "not_set";

type Config = {
  prices: Record<string, string>;
  flow: {
    mode: FlowMode;
    url: string;
    configured: {
      apiKey: boolean;
      secretKey: boolean;
      planNegocioId: boolean;
      planProId: boolean;
    };
  };
  notifications: {
    smtp: boolean;
    whatsapp: boolean;
  };
};

function StatusDot({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle className="h-4 w-4 text-green-400" />
      ) : (
        <XCircle className="h-4 w-4 text-red-400" />
      )}
      <span className={ok ? "text-neutral-300" : "text-neutral-500"}>{label}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-neutral-400">{title}</h2>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [prices, setPrices] = useState({ lanzamiento: "59990", negocio: "49990", pro: "79990" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: Config) => {
        setConfig(data);
        setPrices({
          lanzamiento: data.prices.price_lanzamiento ?? "59990",
          negocio: data.prices.price_negocio ?? "49990",
          pro: data.prices.price_pro ?? "79990",
        });
      });
  }, []);

  async function handleSavePrices() {
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price_lanzamiento: prices.lanzamiento,
        price_negocio: prices.negocio,
        price_pro: prices.pro,
      }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al guardar");
    }
    setSaving(false);
  }

  const flowMode = config?.flow.mode;
  const flowBadge =
    flowMode === "production"
      ? { label: "Producción", cls: "bg-green-500/15 text-green-400 border-green-500/20" }
      : flowMode === "sandbox"
      ? { label: "Sandbox (pruebas)", cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" }
      : { label: "No configurado", cls: "bg-red-500/15 text-red-400 border-red-500/20" };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Settings className="h-5 w-5 text-neutral-400" />
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Ajustes técnicos</h1>
          <p className="text-sm text-neutral-400">Configuración de precios, FLOW e integraciones.</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* ── Precios ── */}
        <Section title="Precios de planes">
          <p className="mb-4 text-xs text-neutral-500">
            Estos valores son los que se cobran realmente a través de FLOW. Si cambias un precio acá, actualiza
            también el texto visible en la landing (src/lib/data.ts).
          </p>
          <div className="space-y-4">
            {[
              { key: "lanzamiento", label: "Plan Lanzamiento", billing: "pago único" },
              { key: "negocio", label: "Plan Negocio", billing: "/mes" },
              { key: "pro", label: "Plan Pro", billing: "/mes" },
            ].map(({ key, label, billing }) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-40">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-neutral-500">{billing}</p>
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">$</span>
                  <input
                    type="number"
                    min={1000}
                    value={prices[key as keyof typeof prices]}
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, [key]: e.target.value }))
                    }
                    className="w-full rounded-lg border border-white/10 bg-neutral-800 py-2.5 pl-7 pr-12 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500">CLP</span>
                </div>
              </div>
            ))}
          </div>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          {saved && (
            <p className="mt-3 text-sm text-green-400">✓ Precios guardados correctamente</p>
          )}

          <button
            onClick={handleSavePrices}
            disabled={saving}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? "Guardando…" : "Guardar precios"}
          </button>
        </Section>

        {/* ── FLOW ── */}
        <Section title="Integración FLOW">
          {config ? (
            <>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-sm text-neutral-400">Modo actual:</span>
                <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${flowBadge.cls}`}>
                  {flowBadge.label}
                </span>
              </div>

              <div className="mb-5 space-y-2">
                <StatusDot ok={config.flow.configured.apiKey} label="FLOW_API_KEY" />
                <StatusDot ok={config.flow.configured.secretKey} label="FLOW_SECRET_KEY" />
                <StatusDot ok={config.flow.configured.planNegocioId} label="FLOW_PLAN_NEGOCIO_ID" />
                <StatusDot ok={config.flow.configured.planProId} label="FLOW_PLAN_PRO_ID" />
              </div>

              {flowMode !== "production" && (
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-yellow-400">
                    <AlertCircle className="h-4 w-4" />
                    Para activar producción en Vercel
                  </div>
                  <ol className="space-y-1 text-xs text-neutral-400">
                    <li>1. En tu cuenta de FLOW, cambia a modo producción y obtén nuevas API keys.</li>
                    <li>2. En Vercel → Settings → Environment Variables, actualiza:</li>
                    <li className="ml-4 font-mono text-neutral-300">FLOW_API_URL = https://www.flow.cl/api</li>
                    <li className="ml-4 font-mono text-neutral-300">FLOW_API_KEY = (key de producción)</li>
                    <li className="ml-4 font-mono text-neutral-300">FLOW_SECRET_KEY = (secret de producción)</li>
                    <li className="ml-4 font-mono text-neutral-300">FLOW_PLAN_NEGOCIO_ID = (id del plan en FLOW prod)</li>
                    <li className="ml-4 font-mono text-neutral-300">FLOW_PLAN_PRO_ID = (id del plan en FLOW prod)</li>
                    <li>3. Redeploy desde Vercel.</li>
                  </ol>
                </div>
              )}

              {flowMode === "production" && (
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                  ✓ FLOW está en modo producción. Los pagos son reales.
                </div>
              )}
            </>
          ) : (
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-40 rounded bg-white/5" />
              <div className="h-4 w-32 rounded bg-white/5" />
            </div>
          )}
        </Section>

        {/* ── Notificaciones ── */}
        <Section title="Notificaciones">
          {config ? (
            <div className="space-y-2">
              <StatusDot ok={config.notifications.smtp} label="Email (SMTP) — confirmaciones de compra y emails de admin" />
              <StatusDot ok={config.notifications.whatsapp} label="WhatsApp (CallMeBot) — alertas de nuevas compras" />
            </div>
          ) : (
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-48 rounded bg-white/5" />
              <div className="h-4 w-40 rounded bg-white/5" />
            </div>
          )}
          <p className="mt-4 text-xs text-neutral-600">
            Configura SMTP_HOST, SMTP_USER, SMTP_PASS y CALLMEBOT_API_KEY en Vercel → Environment Variables.
          </p>
        </Section>
      </div>
    </div>
  );
}
