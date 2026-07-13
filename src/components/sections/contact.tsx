"use client";

import { Clock, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { siteConfig, whatsappHref } from "@/lib/site-config";

const infoItems = [
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    href: whatsappHref,
  },
  {
    icon: Mail,
    label: "Correo",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    label: "Horario",
    value: siteConfig.schedule,
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: siteConfig.location,
  },
];

const socialLinks = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export function Contact() {
  return (
    <section id="contacto" aria-label="Formulario de contacto y cotización" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Cotiza tu página web hoy mismo"
          description="Cuéntanos sobre tu negocio y te responderemos a la brevedad."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal effect="slide-right">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal effect="slide-left">
            <div className="flex h-full flex-col justify-between rounded-3xl brand-gradient p-8 text-white shadow-xl shadow-blue-600/20 sm:p-10">
              <div>
                <h3 className="text-2xl font-bold">Hablemos de tu proyecto</h3>
                <p className="mt-3 text-blue-100">
                  Estamos disponibles para resolver tus dudas y ayudarte a elegir el plan ideal
                  para tu negocio.
                </p>

                <ul className="mt-8 space-y-5">
                  {infoItems.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-blue-100">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                    );
                    return (
                      <li key={item.label}>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block transition-opacity hover:opacity-80"
                          >
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-10 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
