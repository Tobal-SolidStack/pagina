export const siteConfig = {
  name: "WebCraft",
  tagline: "Agencia de desarrollo web",
  url: "https://www.webcraft.cl",
  description:
    "Creamos páginas web modernas, rápidas y profesionales para negocios y emprendedores en Chile, desde $80.000. Diseño, SEO y soporte incluidos.",
  whatsappNumber: "56912345678",
  whatsappMessage: "Hola! Quiero cotizar una página web para mi negocio.",
  email: "contacto@webcraft.cl",
  phoneDisplay: "+56 9 1234 5678",
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
