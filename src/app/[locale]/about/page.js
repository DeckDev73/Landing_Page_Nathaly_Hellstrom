import { getTranslations } from "next-intl/server";
import Header from "@/app/[locale]/components/header";
import TimelineClient from "./timelineClient.jsx";


// ✅ Genera metadata dinámica desde los mensajes (i18n)
export async function generateMetadata() {
  const t = await getTranslations();
  const seo = t.raw("About.seo");

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



export default async function TimelinePage() {
  const t = await getTranslations();
  const seo = t.raw("About.seo");
  const timeline = t.raw("About.timeline");

  return (
    <>
      <Header />
      <TimelineClient timeline={timeline} seo={seo} />
    </>
  );
}
