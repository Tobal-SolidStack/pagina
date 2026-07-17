export const siteConfig = {
  name: "SolidStack",
  tagline: "Agencia de desarrollo web",
  url: "https://www.solidstack.cl",
  description:
    "Páginas web profesionales para negocios en Chile desde $49.990/mes con todo incluido: hosting, dominio, correo y actualizaciones. O pago único desde $59.990. Entrega garantizada en 48 horas.",
  whatsappNumber: "56985193115",
  whatsappMessage: "Hola! Quiero saber más sobre los planes de SolidStack.",
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
