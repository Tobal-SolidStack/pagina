import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left mx-0",
        className
      )}
    >
      {eyebrow && (
        <Reveal effect="fade">
          <span className="mb-3 inline-block rounded-full bg-blue-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal effect="slide-up" delay={0.05}>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal effect="slide-up" delay={0.1}>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
