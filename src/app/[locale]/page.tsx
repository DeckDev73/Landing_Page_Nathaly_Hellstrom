import Image from "next/image";
import Script from "next/script";
import styles from "./page.module.css";
import foto from "../../../public/foto_home.png";
import { getTranslations } from "next-intl/server";
import Header from "@/app/[locale]/components/headerHome";
import Carousel from "@/app/[locale]/components/swiper";
import Footer from "@/app/[locale]/components/footer";
import DescriptionHome from "@/app/[locale]/components/descriptionHome";

import insta from '@/../public/Icons-14.png';
import linkedin from '@/../public/Icons-22.png';
import gmail from '@/../public/Icons-21.png';

export async function generateMetadata() {
  const t = await getTranslations();
  const seo = t.raw("HomePage.seo");

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.authors,
    robots: seo.robots,
    alternates: {
      canonical: seo.alternates.canonical,
      languages: seo.alternates.languages,
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.openGraph.url,
      siteName: seo.openGraph.siteName,
      images: seo.openGraph.images,
      locale: seo.openGraph.locale,
      type: seo.openGraph.type,
    },
  };
}

export default async function Home() {
  const t = await getTranslations("HomePage.hero");
  const seo = (await getTranslations("HomePage")).raw("seo");

  const shortText = t.rich("description_short", { br: () => <br /> });
  const fullText = t.rich("description_full", { br: () => <br /> });

  return (
    <div>
      <Script
        id="person-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />

      <main>
        <Header />
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <p className={styles.hi}>{t("hi")}</p>
            <p className={styles.im}>{t("im")}</p>
            <h2 className={styles.h2}>{t("subtitle")}</h2>
            <h1 className={styles.h1}>
              {t.rich("title", { br: () => <br /> })}
            </h1>

            {/* 👇 Componente cliente controlando el texto */}
            <DescriptionHome shortText={shortText} fullText={fullText} />
          
            {/* Redes sociales */}
            <div className={styles.social}>
              
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Image src={linkedin} alt="LinkedIn" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image src={insta} alt="Instagram"  />
              </a>

              <a
                href="mailto:correo@ejemplo.com"
                aria-label="Correo electrónico"
              >
                <Image src={gmail} alt="Correo"  />
              </a>



            </div>
          
          </div>

          

          <div className={styles.containerRight}>
            <Image
              src={foto}
              alt="Nathaly Hellström Portrait"
              className={styles.fotoImg}
            />
          </div>
        </div>

        <div className={styles.proyectosSection}>
          <h2 className={styles.proyectosTitulo}>Proyectos</h2>
          <Carousel />
        </div>

        <Footer />
      </main>
    </div>
  );
}
