export const siteConfig = {
  name: "SolidStack",
  tagline: "Agencia de desarrollo web",
  url: "https://www.solidstack.cl",
  description:
    "Diseño y creación de páginas web profesionales para negocios y emprendedores en Chile desde $79.990 + IVA. Sitios modernos, rápidos y responsive con SEO, WhatsApp y soporte incluidos.",
  whatsappNumber: "56985193115",
  whatsappMessage: "Hola! Quiero cotizar una página web para mi negocio.",
  email: "contacto@solidstack.cl",
  phoneDisplay: "+56 9 8519 3115",
  location: "Santiago, Chile",
  schedule: "Lunes a Viernes · 09:00 - 19:00",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
};

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappMessage
)}`;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Planes", href: "#planes" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Preguntas Frecuentes", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];
