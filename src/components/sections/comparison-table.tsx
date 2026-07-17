"use client";

import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { comparisonRows, plans } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ComparisonTable() {
  return (
    <Reveal effect="slide-up" delay={0.1} className="mt-16">
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900/60">
              <th className="p-5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Características
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={cn(
                    "p-5 text-center text-sm font-semibold",
                    plan.featured
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-neutral-700 dark:text-neutral-300"
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, idx) => (
              <tr
                key={row.label}
                className={cn(
                  "border-t border-neutral-100 dark:border-white/5",
                  idx % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-neutral-50/60 dark:bg-neutral-900/30"
                )}
              >
                <td className="p-5 text-sm text-neutral-700 dark:text-neutral-300">{row.label}</td>
                <td className="p-5 text-center"><CellIcon included={row.lanzamiento} /></td>
                <td className="p-5 text-center"><CellIcon included={row.negocio} /></td>
                <td className="p-5 text-center"><CellIcon included={row.pro} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function CellIcon({ included }: { included: boolean }) {
  return included ? (
    <Check className="mx-auto h-5 w-5 text-blue-600" />
  ) : (
    <Minus className="mx-auto h-5 w-5 text-neutral-300 dark:text-neutral-700" />
  );
}
