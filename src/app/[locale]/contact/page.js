// src/app/[locale]/contact/page.js → SERVER COMPONENT
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import FormContact from "./formContact";

// ✅ Genera metadata dinámica desde los mensajes (i18n)
export async function generateMetadata() {
  const t = await getTranslations();
  const seo = t.raw("ContactPage.seo");

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.authors,
    robots: seo.robots,
    alternates: {
      canonical: seo.alternates?.canonical,
      languages: seo.alternates?.languages
    },
    openGraph: {
      title: seo.openGraph?.title,
      description: seo.openGraph?.description,
      url: seo.openGraph?.url,
      siteName: seo.openGraph?.siteName,
      images: seo.openGraph?.images,
      locale: seo.openGraph?.locale,
      type: seo.openGraph?.type
    }
  };
}

export default async function ContactPage() {
  const t = await getTranslations();
  const seo = t.raw("ContactPage.seo");

  return (
    <div>
      {/* ✅ Inyección de datos estructurados (JSON-LD) */}
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seo.jsonLd)
        }}
      />

      {/* ✅ Contenido principal */}
      <main>
        <FormContact />
      </main>
    </div>
  );
}
