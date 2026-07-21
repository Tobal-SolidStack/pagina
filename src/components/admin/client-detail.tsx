"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Trash2 } from "lucide-react";

const STATUSES = [
  { value: "pending",     label: "Pendiente" },
  { value: "in_progress", label: "En progreso" },
  { value: "review",      label: "En revisión" },
  { value: "delivered",   label: "Entregado" },
];

type Props = {
  client: {
    id: string; name: string; email: string; phone: string; rut: string;
    plan: string; amount: number; commerceOrder: string | null; createdAt: Date;
    project: { status: string; notes: string | null; deliveryDate: Date | null } | null;
    messages: { id: string; content: string; author: string; createdAt: Date }[];
  };
  sessionName: string;
};

export function ClientDetail({ client, sessionName }: Props) {
  const [messages, setMessages] = useState(client.messages);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(client.project?.status ?? "pending");
  const [notes, setNotes] = useState(client.project?.notes ?? "");
  const [deliveryDate, setDeliveryDate] = useState(
    client.project?.deliveryDate ? new Date(client.project.deliveryDate).toISOString().split("T")[0] : ""
  );
  const [savingProject, setSavingProject] = useState(false);
  const [saved, setSaved] = useState(false);

  async function sendMessage() {
    if (!newMsg.trim()) return;
    setSending(true);
    const res = await fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: client.id, content: newMsg }),
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setNewMsg("");
    }
    setSending(false);
  }

  async function deleteMessage(id: string) {
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  async function saveProject() {
    setSavingProject(true);
    await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: client.id, status, notes, deliveryDate: deliveryDate || null }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSavingProject(false);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Link href="/admin/clients" className="mb-6 flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Volver a clientes
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 sm:mb-8">
        <div>
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <p className="mt-1 text-sm text-neutral-400">{client.email} · {client.phone}</p>
        </div>
        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm font-medium capitalize text-blue-400">
          Plan {client.plan}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Info cliente */}
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Datos del cliente</h2>
          <dl className="space-y-3 text-sm">
            {[
              ["RUT", client.rut],
              ["Email", client.email],
              ["Teléfono", client.phone],
              ["Plan", client.plan],
              ["Monto", `$${client.amount.toLocaleString("es-CL")} CLP`],
              ["Orden", client.commerceOrder ?? "—"],
              ["Fecha compra", new Date(client.createdAt).toLocaleDateString("es-CL")],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-neutral-500">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Estado del proyecto */}
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Estado del proyecto</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-neutral-400">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-neutral-400">Fecha de entrega</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-neutral-400">Notas internas</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                placeholder="Notas del proyecto..."
              />
            </div>
            <button
              onClick={saveProject}
              disabled={savingProject}
              className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {saved ? "✓ Guardado" : savingProject ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>

        {/* Mensajes internos */}
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Mensajes internos ({messages.length})
          </h2>
          <div className="mb-4 max-h-72 space-y-3 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-sm text-neutral-500">Sin mensajes aún.</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="group flex gap-3">
                  <div className="flex-1 rounded-lg bg-neutral-800 px-4 py-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400">{m.author}</span>
                      <span className="text-xs text-neutral-500">
                        {new Date(m.createdAt).toLocaleString("es-CL")}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-300">{m.content}</p>
                  </div>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-neutral-500 hover:text-red-400" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-3">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Escribe una nota interna…"
              className="flex-1 rounded-lg border border-white/10 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !newMsg.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
