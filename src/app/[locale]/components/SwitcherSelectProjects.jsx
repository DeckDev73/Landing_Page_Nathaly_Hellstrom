"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "@/app/[locale]/project/project.module.css";

export default function LanguageButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale) => {
    // Guardar cookie por 1 año; Secure solo en producción
    const secureFlag = process.env.NODE_ENV === "production" ? "Secure; " : "";
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; ${secureFlag}SameSite=Lax`;

    // Cambia idioma en la URL (manteniendo el resto de la ruta)
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    // replace evita acumular mucho historial
    router.replace(newPath);
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
