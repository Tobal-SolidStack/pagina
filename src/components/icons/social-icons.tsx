import * as React from "react";

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.19h-3.16V7.6c0-.92.26-1.55 1.58-1.55h1.69V3.19C16.47 3.13 15.5 3 14.36 3c-2.4 0-4.04 1.46-4.04 4.15v2.46H7.56v3.19h2.76V21h3.18Z" />
    </svg>
  );
}

export function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5C4.15 3.5 3.25 4.4 3.25 5.5C3.25 6.6 4.15 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.4 6.35 3.5 5.25 3.5ZM20.5 20.5V13.9C20.5 10.7 19.16 9.1 16.98 9.1C15.34 9.1 14.42 10.06 14 10.99V8.5H10.63C10.68 9.35 10.63 20.5 10.63 20.5H14V13.94C14 13.6 14.02 13.26 14.12 13.02C14.4 12.34 15.02 11.64 16.06 11.64C17.42 11.64 17.98 12.68 17.98 14.2V20.5H20.5Z" />
    </svg>
  );
}
