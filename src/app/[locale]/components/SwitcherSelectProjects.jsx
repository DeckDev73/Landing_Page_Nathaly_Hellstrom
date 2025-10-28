"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "@/app/[locale]/project/project.module.css"; // usa los mismos estilos que tu header

export default function LanguageButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // cambia el idioma en la URL
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className={styles.languageSwitch}>
      <span
        onClick={() => switchLocale("en-gb")}
        className={`${styles.languageCircle} ${
          currentLocale === "en-gb" ? styles.active : ""
        }`}
      >
        EN
      </span>
      <span
        onClick={() => switchLocale("es")}
        className={`${styles.languageCircle} ${
          currentLocale === "es" ? styles.active : ""
        }`}
      >
        ES
      </span>
    </div>
  );
}
