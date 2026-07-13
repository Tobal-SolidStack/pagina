export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="ss-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* Stack de 3 capas — de abajo hacia arriba, cada una más angosta */}
      <rect x="0" y="24" width="36" height="8" rx="4" fill="url(#ss-grad)" />
      <rect x="4" y="14" width="28" height="8" rx="4" fill="url(#ss-grad)" opacity="0.78" />
      <rect x="9" y="4"  width="18" height="8" rx="4" fill="url(#ss-grad)" opacity="0.55" />
    </svg>
  );
}
