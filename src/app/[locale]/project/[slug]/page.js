import fs from "fs";
import path from "path";
import Link from "next/link"; // 👈 Importación añadida
import LanguageButtons from "@/app/[locale]/components/SwitcherSelectProjects";
import styles from "../project.module.css";

export async function generateStaticParams() {


  const projectsDir = path.join(process.cwd(), "src", "data", "projects");
  const files = fs.readdirSync(projectsDir);
  const locales = ["es", "en-gb"]; // Agrega más si tienes

  const paths = [];

  files.forEach((file) => {
    const slug = file.replace(".json", "");
    locales.forEach((locale) => {
      paths.push({ slug, locale });
    });
  });

  return paths;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const filePath = path.join(process.cwd(), "src", "data", "projects", `${slug}.json`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent)[locale];

  return {
    title: `${data.title} | Proyecto`,
    description: data.intro,
    keywords: ["proyecto", "cronología", data.title],
  };
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;

  const filePath = path.join(process.cwd(), "src", "data", "projects", `${slug}.json`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const projectData = JSON.parse(fileContent)[locale];

  if (!projectData) return <div>Proyecto no encontrado</div>;

  const { title, intro, challenge, strategy, footer, imageSection, images } = projectData;

  return (
    <div className={styles.fullScreen}>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Menú de navegación */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/about" className={styles.navLink}>
                  About
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className={styles.languageSwitch}>
              <LanguageButtons />
            </div>
          </nav>

          {/* Header */}
          <section className={styles.headerSection}>
            <div className={styles.headerTitle}>{title}</div>
            <div className={styles.headerText}>{intro}</div>
          </section>

          {/* Contenido principal */}
          <section className={styles.contentWrapper}>
            <section className={styles.content}>
              <div className={styles.leftColumn}>
                <div className={styles.textBox}>
                  <h2>{challenge.title}</h2>
                  <p>{challenge.text}</p>
                </div>

                <div className={styles.imageRow}>
                  {images.row.map((src, i) => (
                    <img key={i} src={src} alt={`Imagen ${i + 1}`} className={styles.imageTop} />
                  ))}
                </div>

                <div className={styles.imageStack}>
                  {images.stack.map((src, i) => (
                    <img key={i} src={src} alt={`Imagen stack ${i + 1}`} className={styles.imageBottom} />
                  ))}
                </div>
              </div>

              <div className={styles.rightColumn}>
                <div className={styles.textBox}>
                  <h2>{strategy.title}</h2>
                  <p>{strategy.text}</p>
                </div>

                <div className={styles.imageContainer}>
                  <img src={images.right} alt="Imagen lateral" className={styles.imageRight} />
                </div>
              </div>
            </section>
          </section>

          {/* Footer */}
          <section className={styles.footerSection}>
            <div className={styles.footerLeft}>
              <div className={styles.footerTitle}>{footer.subtitle}</div>
              <div className={styles.footerDescription}>{footer.leftText}</div>
            </div>
            <div className={styles.footerRight}>{footer.rightText}</div>
          </section>

          {/* Imagen final */}
          <section className={styles.imageSection}>
            <img src={imageSection.image} alt="Imagen final" className={styles.imageBox} />
            <div className={styles.imageTitle}>{imageSection.title}</div>
            <a href="#" className={styles.arrowLink}>
              <span className={styles.arrow}>&rarr;</span>
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}
