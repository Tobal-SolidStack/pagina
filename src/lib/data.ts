export type Benefit = {
  icon: "palette" | "smartphone" | "search" | "rocket" | "headset" | "shield";
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: "palette",
    title: "Diseño Profesional",
    description: "Interfaces modernas y a medida que reflejan la identidad de tu marca.",
  },
  {
    icon: "smartphone",
    title: "Adaptado a Celulares",
    description: "100% responsive: se ve perfecto en celulares, tablets y computadores.",
  },
  {
    icon: "search",
    title: "Optimización SEO",
    description: "Estructura y contenido pensados para posicionar tu sitio en Google.",
  },
  {
    icon: "rocket",
    title: "Entrega Rápida",
    description: "Tu página web lista en pocos días, sin perder calidad ni detalle.",
  },
  {
    icon: "headset",
    title: "Soporte Personalizado",
    description: "Te acompañamos antes, durante y después de la entrega de tu sitio.",
  },
  {
    icon: "shield",
    title: "Seguridad HTTPS",
    description: "Certificado SSL incluido para proteger a tus visitantes y tu marca.",
  },
];

export type PlanFeature = { label: string; included: boolean };

export type Plan = {
  id: "basico" | "intermedio" | "pro";
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "basico",
    name: "Plan Básico",
    price: "$79.990",
    description: "Ideal para emprendedores que están comenzando su presencia online.",
    features: [
      "Diseño Profesional",
      "Hasta 5 secciones",
      "Responsive",
      "Botón WhatsApp",
      "Formulario de contacto",
      "SEO básico",
    ],
  },
  {
    id: "intermedio",
    name: "Plan Intermedio",
    price: "$119.990",
    description: "La opción preferida por negocios que quieren una imagen más completa.",
    featured: true,
    badge: "MÁS VENDIDO",
    features: [
      "Todo lo del Plan Básico",
      "Correo Corporativo",
      "Configuración del correo",
      "Optimización adicional",
      "Soporte prioritario",
    ],
  },
  {
    id: "pro",
    name: "Plan Pro",
    price: "$149.990",
    description: "Solución completa para empresas que buscan máximo rendimiento y alcance.",
    features: [
      "Todo lo del Plan Intermedio",
      "Dominio .cl",
      "Configuración completa",
      "Correo Corporativo",
      "SEO avanzado",
      "Google Analytics",
      "Google Search Console",
      "Soporte Premium",
    ],
  },
];

export type ComparisonRow = {
  label: string;
  basico: boolean;
  intermedio: boolean;
  pro: boolean;
};

export const comparisonRows: ComparisonRow[] = [
  { label: "Diseño profesional responsive", basico: true, intermedio: true, pro: true },
  { label: "Botón de WhatsApp", basico: true, intermedio: true, pro: true },
  { label: "Formulario de contacto", basico: true, intermedio: true, pro: true },
  { label: "SEO básico", basico: true, intermedio: true, pro: true },
  { label: "Correo corporativo", basico: false, intermedio: true, pro: true },
  { label: "Soporte prioritario", basico: false, intermedio: true, pro: true },
  { label: "Dominio .cl incluido", basico: false, intermedio: false, pro: true },
  { label: "SEO avanzado", basico: false, intermedio: false, pro: true },
  { label: "Google Analytics", basico: false, intermedio: false, pro: true },
  { label: "Google Search Console", basico: false, intermedio: false, pro: true },
  { label: "Soporte Premium", basico: false, intermedio: false, pro: true },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Clientes satisfechos" },
  { value: 3, suffix: " días", label: "Entrega promedio" },
  { value: 99, suffix: "%", label: "Clientes que nos recomiendan" },
  { value: 100, suffix: "%", label: "Diseño responsive" },
];

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { step: 1, title: "Nos escribes", description: "Nos cuentas la idea de tu negocio por WhatsApp o el formulario de contacto." },
  { step: 2, title: "Conversamos sobre tu proyecto", description: "Definimos juntos objetivos, estilo y contenido de tu página web." },
  { step: 3, title: "Diseñamos la página", description: "Creamos un diseño moderno y a medida, adaptado a tu marca." },
  { step: 4, title: "Publicamos tu sitio", description: "Dejamos tu página en línea, funcionando y lista para recibir visitas." },
  { step: 5, title: "Comienzas a recibir clientes", description: "Tu negocio ya tiene presencia profesional las 24 horas del día." },
];

export type PortfolioItem = {
  id: string;
  name: string;
  category: string;
  image: string;
};

export const portfolioItems: PortfolioItem[] = [
  { id: "p1", name: "Café Aroma", category: "Cafetería", image: "/portfolio/project-1.svg" },
  { id: "p2", name: "Estudio Lumen", category: "Fotografía", image: "/portfolio/project-2.svg" },
  { id: "p3", name: "FitZone", category: "Gimnasio", image: "/portfolio/project-3.svg" },
  { id: "p4", name: "Dental Sonrisa", category: "Salud", image: "/portfolio/project-4.svg" },
  { id: "p5", name: "Ferretería Central", category: "Retail", image: "/portfolio/project-5.svg" },
  { id: "p6", name: "Bufete Legal Andes", category: "Servicios Legales", image: "/portfolio/project-6.svg" },
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
    comment:
      "El equipo entendió exactamente lo que necesitábamos. Nuestra página quedó hermosa y ya nos ha traído nuevos clientes.",
    avatar: "/testimonials/avatar-1.svg",
    rating: 5,
  },
  {
    id: "t2",
    name: "Rodrigo Fuentes",
    company: "FitZone",
    comment:
      "Rápidos, profesionales y con mucha paciencia para explicarnos cada detalle. Recomendados al 100%.",
    avatar: "/testimonials/avatar-2.svg",
    rating: 5,
  },
  {
    id: "t3",
    name: "Camila Rojas",
    company: "Estudio Lumen",
    comment:
      "La página se ve espectacular en el celular y el computador. El soporte post-entrega ha sido excelente.",
    avatar: "/testimonials/avatar-3.svg",
    rating: 5,
  },
  {
    id: "t4",
    name: "Matías Soto",
    company: "Ferretería Central",
    comment:
      "Antes no teníamos presencia online y ahora recibimos consultas todas las semanas gracias a nuestro sitio.",
    avatar: "/testimonials/avatar-4.svg",
    rating: 5,
  },
  {
    id: "t5",
    name: "Valentina Reyes",
    company: "Bufete Legal Andes",
    comment:
      "Un trabajo serio y prolijo. Cumplieron los plazos y la página transmite mucha confianza a nuestros clientes.",
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
    answer:
      "El tiempo promedio de entrega es de 3 días hábiles una vez que tenemos todo el contenido y la información de tu negocio. Proyectos más grandes pueden tomar un poco más.",
  },
  {
    question: "¿Cómo se realiza el pago?",
    answer:
      "Trabajamos con un 50% de anticipo para comenzar el proyecto y el 50% restante contra la entrega final de tu sitio web funcionando.",
  },
  {
    question: "¿Puedo pedir cambios durante el proceso?",
    answer:
      "Sí, durante el desarrollo puedes solicitar ajustes de diseño y contenido para que el resultado final sea exactamente lo que necesitas.",
  },
  {
    question: "¿Los planes incluyen dominio?",
    answer:
      "El Plan Pro incluye un dominio .cl. En los planes Básico e Intermedio podemos asesorarte en la compra de tu dominio preferido.",
  },
  {
    question: "¿Los planes incluyen hosting?",
    answer:
      "Sí, te ayudamos con la configuración y publicación de tu sitio en un hosting confiable para que esté disponible las 24 horas.",
  },
  {
    question: "¿Tendré soporte después de la entrega?",
    answer:
      "Todos los planes incluyen soporte posterior a la entrega, con niveles prioritarios y premium en los planes Intermedio y Pro.",
  },
];
