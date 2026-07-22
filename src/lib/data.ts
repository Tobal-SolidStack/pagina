export type Benefit = {
  icon: "clock" | "refresh" | "shield" | "trending-up" | "headset" | "zap";
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: "clock",
    title: "Entrega garantizada en 48 horas",
    description: "Tu página publicada y funcionando en dos días hábiles. Si no cumplimos, te devolvemos el dinero.",
  },
  {
    icon: "refresh",
    title: "Siempre actualizado, nunca obsoleto",
    description: "Con nuestros planes de suscripción, tu sitio se mantiene al día mes a mes. Tú pides los cambios, nosotros los hacemos.",
  },
  {
    icon: "shield",
    title: "Sin riesgo: cancela cuando quieras",
    description: "Sin contrato largo, sin costo de entrada. Empieza desde $49.990/mes y cancela si no estás conforme.",
  },
  {
    icon: "trending-up",
    title: "Resultados medibles",
    description: "Google Analytics y Search Console configurados para que veas exactamente cuántas visitas y consultas genera tu sitio.",
  },
  {
    icon: "headset",
    title: "Soporte real, no un chatbot",
    description: "Respuesta garantizada en 24–48 horas. Directamente con quien diseñó tu página, no con un intermediario.",
  },
  {
    icon: "zap",
    title: "Veloz y seguro desde el día uno",
    description: "Hosting incluido, HTTPS activado y velocidad optimizada para que Google y tus clientes te encuentren.",
  },
];

export type Plan = {
  id: "lanzamiento" | "negocio" | "pro";
  name: string;
  price: string;
  billing: string;
  description: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "lanzamiento",
    name: "Plan Lanzamiento",
    price: "$59.990",
    billing: "pago único",
    description: "Tu presencia online lista en 48 horas. Pago único, sin mensualidades.",
    badge: "MÁS RÁPIDO",
    cta: "Lanzar mi web",
    features: [
      "Diseño profesional (hasta 4 secciones)",
      "Responsive (celular y tablet)",
      "Botón WhatsApp integrado",
      "Formulario de contacto",
      "SEO básico",
      "Entrega en 48 horas",
    ],
  },
  {
    id: "negocio",
    name: "Plan Negocio",
    price: "$49.990",
    billing: "/mes",
    description: "Todo incluido sin riesgo. Sin costo de entrada. Cancela cuando quieras.",
    featured: true,
    badge: "MÁS POPULAR",
    cta: "Comenzar sin riesgo",
    features: [
      "Diseño profesional (hasta 6 secciones)",
      "Dominio .cl incluido",
      "Hosting incluido",
      "Correo corporativo",
      "SEO intermedio",
      "2 actualizaciones de contenido al mes",
      "Soporte prioritario",
      "Sin costo de entrada",
    ],
  },
  {
    id: "pro",
    name: "Plan Pro",
    price: "$79.990",
    billing: "/mes",
    description: "Para empresas que quieren resultados medibles y crecimiento constante.",
    cta: "Quiero el Plan Pro",
    features: [
      "Todo lo del Plan Negocio",
      "Hasta 10 secciones",
      "Google Analytics configurado",
      "Google Search Console",
      "Reporte mensual de visitas",
      "Actualizaciones ilimitadas",
      "Respuesta garantizada 24 horas",
      "1 landing page adicional por trimestre",
    ],
  },
];

export type ComparisonRow = {
  label: string;
  lanzamiento: boolean;
  negocio: boolean;
  pro: boolean;
};

export const comparisonRows: ComparisonRow[] = [
  { label: "Diseño profesional responsive", lanzamiento: true, negocio: true, pro: true },
  { label: "Botón de WhatsApp", lanzamiento: true, negocio: true, pro: true },
  { label: "Formulario de contacto", lanzamiento: true, negocio: true, pro: true },
  { label: "SEO básico", lanzamiento: true, negocio: true, pro: true },
  { label: "Entrega en 48 horas", lanzamiento: true, negocio: true, pro: true },
  { label: "Dominio .cl incluido", lanzamiento: false, negocio: true, pro: true },
  { label: "Hosting incluido", lanzamiento: false, negocio: true, pro: true },
  { label: "Correo corporativo", lanzamiento: false, negocio: true, pro: true },
  { label: "Actualizaciones de contenido", lanzamiento: false, negocio: true, pro: true },
  { label: "Soporte prioritario", lanzamiento: false, negocio: true, pro: true },
  { label: "Google Analytics", lanzamiento: false, negocio: false, pro: true },
  { label: "Reporte mensual de visitas", lanzamiento: false, negocio: false, pro: true },
  { label: "Actualizaciones ilimitadas", lanzamiento: false, negocio: false, pro: true },
  { label: "Respuesta garantizada 24 horas", lanzamiento: false, negocio: false, pro: true },
  { label: "Landing page adicional por trimestre", lanzamiento: false, negocio: false, pro: true },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 48, suffix: " hrs", label: "Tiempo de entrega" },
  { value: 99, suffix: "%", label: "Clientes que nos recomiendan" },
  { value: 100, suffix: "%", label: "Diseño responsive" },
];

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  timing: string;
  icon: "credit-card" | "message-circle" | "layout" | "rocket";
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Elige tu plan y paga",
    description: "Selecciona el plan que más te acomoda y completa el pago en línea en minutos con tarjeta o WebPay. Recibes confirmación inmediata por email.",
    timing: "5 minutos",
    icon: "credit-card",
  },
  {
    step: 2,
    title: "Nos cuentas de tu negocio",
    description: "Te contactamos por WhatsApp el mismo día. Te pedimos logo, colores, texto y fotos. Si no tienes todo, igual comenzamos — te ayudamos.",
    timing: "Mismo día",
    icon: "message-circle",
  },
  {
    step: 3,
    title: "Tu sitio listo en 48 horas",
    description: "Diseñamos y construimos tu web completa. Te enviamos el link para que la revises. Pedimos los ajustes que necesites, sin costo adicional.",
    timing: "48 horas",
    icon: "layout",
  },
  {
    step: 4,
    title: "Publicamos y nos quedamos",
    description: "Tu sitio va en línea con dominio, SSL y hosting. Y no te dejamos solo: soporte, actualizaciones y seguimiento incluidos en tu plan.",
    timing: "Día 3",
    icon: "rocket",
  },
];

export type PortfolioItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  url: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    name: "Saga Media",
    category: "Sello Urbano / Música",
    image: "https://sagamedia.net/favicon.svg",
    url: "https://sagamedia.net/",
  },
  {
    id: "p2",
    name: "Desintegra",
    category: "Desarrollo de Software",
    image: "https://desintegra.com/images/200/18446542/logo-desintegra-6quk0oPAjJzLpVLxUSgOww.png",
    url: "https://desintegra.com/",
  },
  {
    id: "p3",
    name: "Adcon Chile",
    category: "Administración de Condominios",
    image: "https://adconchile.cl/adcon-chile.jpg",
    url: "https://adconchile.cl/",
  },
  {
    id: "p4",
    name: "KM Eventos",
    category: "Eventos / Producción Audiovisual",
    image: "https://eventoskm.com/assets/logo.png",
    url: "https://eventoskm.com/",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  comment: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Javiera Muñoz",
    company: "Café Aroma",
    comment: "El equipo entendió exactamente lo que necesitábamos. Nuestra página quedó hermosa y ya nos ha traído nuevos clientes.",
    avatar: "/testimonials/avatar-1.svg",
    rating: 5,
  },
  {
    id: "t2",
    name: "Rodrigo Fuentes",
    company: "FitZone",
    comment: "Rápidos, profesionales y con mucha paciencia para explicarnos cada detalle. Recomendados al 100%.",
    avatar: "/testimonials/avatar-2.svg",
    rating: 5,
  },
  {
    id: "t3",
    name: "Camila Rojas",
    company: "Estudio Lumen",
    comment: "La página se ve espectacular en el celular y el computador. El soporte post-entrega ha sido excelente.",
    avatar: "/testimonials/avatar-3.svg",
    rating: 5,
  },
  {
    id: "t4",
    name: "Matías Soto",
    company: "Ferretería Central",
    comment: "Antes no teníamos presencia online y ahora recibimos consultas todas las semanas gracias a nuestro sitio.",
    avatar: "/testimonials/avatar-4.svg",
    rating: 5,
  },
  {
    id: "t5",
    name: "Valentina Reyes",
    company: "Bufete Legal Andes",
    comment: "Un trabajo serio y prolijo. Cumplieron los plazos y la página transmite mucha confianza a nuestros clientes.",
    avatar: "/testimonials/avatar-5.svg",
    rating: 5,
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "¿Cuánto demora la entrega de mi página web?",
    answer: "48 horas hábiles desde que tenemos todo el contenido de tu negocio. Si no cumplimos ese plazo, te devolvemos el dinero.",
  },
  {
    question: "¿Qué diferencia hay entre el pago único y la suscripción mensual?",
    answer: "Con el Plan Lanzamiento pagas una sola vez ($59.990) y la página queda entregada. Con los planes Negocio y Pro pagas una mensualidad que incluye hosting, dominio, correo corporativo y actualizaciones de contenido. No necesitas pagar nada por adelantado para comenzar.",
  },
  {
    question: "¿Puedo cancelar el plan mensual cuando quiera?",
    answer: "Sí, en cualquier momento y sin penalidad. Los planes de suscripción no tienen contrato de permanencia mínima. Si cancelas, tu sitio sigue activo hasta el fin del mes pagado.",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer: "Para el Plan Lanzamiento trabajamos con un 50% de anticipo al comenzar y el 50% restante contra la entrega. Los planes de suscripción se cobran mensualmente por transferencia bancaria.",
  },
  {
    question: "¿Los planes incluyen dominio y hosting?",
    answer: "El Plan Lanzamiento no incluye dominio ni hosting (te asesoramos en la compra). Los Planes Negocio y Pro sí incluyen dominio .cl y hosting en servidores rápidos y seguros, sin costo adicional.",
  },
  {
    question: "¿Tendré soporte después de la entrega?",
    answer: "Siempre. Con los planes de suscripción tienes soporte continuo y actualizaciones incluidas. Con el Plan Lanzamiento tienes soporte post-entrega para resolver dudas iniciales.",
  },
];
