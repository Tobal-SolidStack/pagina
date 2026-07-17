import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsappFloatingButton } from "@/components/layout/whatsapp-floating-button";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Diseño y Creación de Páginas Web Profesionales en Chile`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "diseño de páginas web",
    "creación de sitios web Chile",
    "páginas web para negocios",
    "desarrollo web profesional",
    "páginas web económicas",
    "diseño web responsive",
    "páginas web para emprendedores",
    "diseño web Santiago Chile",
    "crear página web negocio",
    "páginas web baratas Chile",
    "agencia de diseño web Chile",
    "landing page profesional",
    "sitio web para pymes",
    "página web con WhatsApp",
    "cotizar página web Chile",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteConfig.url,
    title: `${siteConfig.name} | Diseño y Creación de Páginas Web Profesionales en Chile`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Creación de páginas web profesionales para negocios en Chile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Diseño y Creación de Páginas Web Profesionales en Chile`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/og-image.png`,
    image: `${siteConfig.url}/og-image.png`,
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    priceRange: "$49.990 - $79.990 CLP + IVA/mes",
    currenciesAccepted: "CLP",
    paymentAccepted: "Transferencia bancaria",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.4489,
      longitude: -70.6693,
    },
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planes de diseño web",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Plan Lanzamiento",
          description: "Tu presencia online lista en 48 horas. Pago único. Diseño profesional hasta 4 secciones, responsive, botón WhatsApp, formulario de contacto y SEO básico.",
          price: "59990",
          priceCurrency: "CLP",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Plan Negocio",
          description: "Todo incluido sin riesgo desde $49.990/mes. Hosting, dominio .cl, correo corporativo, SEO intermedio, 2 actualizaciones mensuales y soporte prioritario. Sin costo de entrada.",
          price: "49990",
          priceCurrency: "CLP",
          priceSpecification: { "@type": "RecurringCharge", billingIncrement: 1, unitCode: "MON" },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Plan Pro",
          description: "Resultados medibles desde $79.990/mes. Todo el Plan Negocio más Google Analytics, Search Console, reporte mensual, actualizaciones ilimitadas y landing page trimestral.",
          price: "79990",
          priceCurrency: "CLP",
          priceSpecification: { "@type": "RecurringCharge", billingIncrement: 1, unitCode: "MON" },
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "es-CL",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: `${siteConfig.name} | Diseño y Creación de Páginas Web Profesionales en Chile`,
    description: siteConfig.description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "es-CL",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto demora la entrega de mi página web?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El tiempo promedio de entrega es de 3 días hábiles una vez que tenemos todo el contenido y la información de tu negocio. Proyectos más grandes pueden tomar un poco más.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo se realiza el pago?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos con un 50% de anticipo para comenzar el proyecto y el 50% restante contra la entrega final de tu sitio web funcionando.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo pedir cambios durante el proceso?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, durante el desarrollo puedes solicitar ajustes de diseño y contenido para que el resultado final sea exactamente lo que necesitas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los planes incluyen dominio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Plan Pro incluye un dominio .cl. En los planes Básico e Intermedio podemos asesorarte en la compra de tu dominio preferido.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los planes incluyen hosting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, te ayudamos con la configuración y publicación de tu sitio en un hosting confiable para que esté disponible las 24 horas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Tendré soporte después de la entrega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Todos los planes incluyen soporte posterior a la entrega, con niveles prioritarios y premium en los planes Intermedio y Pro.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url,
      },
    ],
  };

  return (
    <html lang="es-CL" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Preconnect to speed up external resource loading */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sagamedia.net" />
        <link rel="dns-prefetch" href="https://desintegra.com" />
        <link rel="dns-prefetch" href="https://adconchile.cl" />
        <link rel="dns-prefetch" href="https://eventoskm.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-2 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
          >
            Saltar al contenido principal
          </a>
          {children}
          <WhatsappFloatingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
