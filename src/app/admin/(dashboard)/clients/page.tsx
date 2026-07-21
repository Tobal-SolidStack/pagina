"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ChevronRight, UserPlus, X } from "lucide-react";

const PLANS = ["lanzamiento", "negocio", "pro"];
const PLAN_AMOUNTS: Record<string, number> = { lanzamiento: 59990, negocio: 49990, pro: 79990 };

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:     { label: "Pendiente",    color: "bg-yellow-500/20 text-yellow-400" },
  in_progress: { label: "En progreso",  color: "bg-blue-500/20 text-blue-400" },
  review:      { label: "En revisión",  color: "bg-purple-500/20 text-purple-400" },
  delivered:   { label: "Entregado",    color: "bg-green-500/20 text-green-400" },
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  amount: number;
  createdAt: string;
  project: { status: string } | null;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", rut: "", plan: "lanzamiento", amount: 59990 });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadClients = useCallback(() => {
    fetch("/api/admin/clients")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Client[]) => setClients(data));
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  async function createClient(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({ name: "", email: "", phone: "", rut: "", plan: "lanzamiento", amount: 59990 });
      loadClients();
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al crear cliente");
    }
    setCreating(false);
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <UserPlus className="h-4 w-4" />
          Agregar cliente
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Nuevo cliente</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={createClient} className="space-y-4">
              {[
                { label: "Nombre completo *", key: "name", type: "text", placeholder: "Juan Pérez" },
                { label: "Email *", key: "email", type: "email", placeholder: "juan@email.com" },
                { label: "Teléfono", key: "phone", type: "tel", placeholder: "+56 9 1234 5678" },
                { label: "RUT", key: "rut", type: "text", placeholder: "12.345.678-9" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block text-xs text-neutral-400">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    required={label.includes("*")}
                    className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs text-neutral-400">Plan *</label>
                <select
                  value={form.plan}
                  onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value, amount: PLAN_AMOUNTS[e.target.value] ?? 0 }))}
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                >
                  {PLANS.map((p) => (
                    <option key={p} value={p} className="capitalize">
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-neutral-400">Monto (CLP)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg border border-white/10 py-2 text-sm text-neutral-400 transition hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
                >
                  {creating ? "Creando…" : "Crear cliente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        {clients.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">Aún no hay clientes registrados.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-neutral-500">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Estado proyecto</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => {
                const st = STATUS_LABELS[c.project?.status ?? "pending"] ?? STATUS_LABELS.pending;
                return (
                  <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                    <td className="px-4 py-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-neutral-500">{c.email}</p>
                    </td>
                    <td className="px-4 py-3 capitalize">{c.plan}</td>
                    <td className="px-4 py-3">${c.amount.toLocaleString("es-CL")}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">
                      {new Date(c.createdAt).toLocaleDateString("es-CL")}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/clients/${c.id}`}>
                        <ChevronRight className="h-4 w-4 text-neutral-500 hover:text-white" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
