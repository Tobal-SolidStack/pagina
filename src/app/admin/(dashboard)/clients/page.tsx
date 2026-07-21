import Link from "next/link";
import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:     { label: "Pendiente",    color: "bg-yellow-500/20 text-yellow-400" },
  in_progress: { label: "En progreso",  color: "bg-blue-500/20 text-blue-400" },
  review:      { label: "En revisión",  color: "bg-purple-500/20 text-purple-400" },
  delivered:   { label: "Entregado",    color: "bg-green-500/20 text-green-400" },
};

export default async function ClientsPage() {
  const clients = await db.client.findMany({
    include: { project: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Clientes</h1>
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
              {clients.map((c: typeof clients[number]) => {
                const st = STATUS_LABELS[c.project?.status ?? "pending"];
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
