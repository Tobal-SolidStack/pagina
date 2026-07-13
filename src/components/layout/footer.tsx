import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { navLinks, siteConfig } from "@/lib/site-config";

const socialLinks = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900/40" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="#inicio" className="flex items-center gap-2 font-bold text-lg text-neutral-900 dark:text-white">
              <Logo className="h-9 w-9" />
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Creamos páginas web modernas, rápidas y profesionales para negocios y emprendedores
              en Chile.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/10 dark:text-neutral-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Enlaces rápidos</h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Planes</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#planes" className="text-sm text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
                  Plan Básico
                </Link>
              </li>
              <li>
                <Link href="#planes" className="text-sm text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
                  Plan Intermedio
                </Link>
              </li>
              <li>
                <Link href="#planes" className="text-sm text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
                  Plan Pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>{siteConfig.phoneDisplay}</li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con dedicación en Chile.</p>
        </div>
      </div>
    </footer>
  );
}
