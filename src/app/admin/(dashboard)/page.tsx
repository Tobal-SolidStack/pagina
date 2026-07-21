import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Users, DollarSign, FolderOpen, CheckCircle } from "lucide-react";

const PLAN_PRICES: Record<string, number> = { lanzamiento: 59990, negocio: 49990, pro: 79990 };

export default async function AdminDashboard() {
  const session = await getSession();
  const [clients, projects] = await Promise.all([
    db.client.findMany({ select: { plan: true, amount: true, createdAt: true } }),
    db.project.groupBy({ by: ["status"], _count: true }),
  ]);

  const totalClients = clients.length;
  const mrr = clients
    .filter((c: { plan: string; amount: number }) => c.plan !== "lanzamiento")
    .reduce((sum: number, c: { plan: string; amount: number }) => sum + (PLAN_PRICES[c.plan] ?? c.amount), 0);
  const oneTime = clients
    .filter((c: { plan: string; amount: number }) => c.plan === "lanzamiento")
    .reduce((sum: number, c: { plan: string; amount: number }) => sum + c.amount, 0);

  const statusCount = Object.fromEntries(projects.map((p: { status: string; _count: number }) => [p.status, p._count]));

  const stats = [
    { label: "Clientes totales", value: totalClients, icon: Users, color: "text-blue-400" },
    { label: "MRR (suscripciones)", value: `$${mrr.toLocaleString("es-CL")}`, icon: DollarSign, color: "text-green-400" },
    { label: "Ingresos únicos", value: `$${oneTime.toLocaleString("es-CL")}`, icon: DollarSign, color: "text-purple-400" },
    { label: "Proyectos activos", value: (statusCount["in_progress"] ?? 0) + (statusCount["pending"] ?? 0), icon: FolderOpen, color: "text-amber-400" },
    { label: "Proyectos entregados", value: statusCount["delivered"] ?? 0, icon: CheckCircle, color: "text-emerald-400" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Bienvenido, {session?.name} 👋</h1>
        <p className="mt-1 text-sm text-neutral-400">Resumen general de SolidStack</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
            <p className="mt-2 text-xl font-bold sm:mt-3 sm:text-2xl">{value}</p>
            <p className="mt-1 text-xs text-neutral-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:mb-4">Últimos clientes</h2>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
          {clients.length === 0 ? (
            <p className="p-6 text-sm text-neutral-500">Aún no hay clientes registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-neutral-500">
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {[...clients].reverse().slice(0, 5).map((c: { plan: string; createdAt: Date; amount: number }, i: number) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 capitalize">{c.plan}</td>
                      <td className="px-4 py-3 text-neutral-400">{new Date(c.createdAt).toLocaleDateString("es-CL")}</td>
                      <td className="px-4 py-3">${c.amount.toLocaleString("es-CL")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
