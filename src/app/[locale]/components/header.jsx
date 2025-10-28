"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing"; 
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/app/[locale]/components/LocaleSwitcherSelect";
import styles from "@/app/[locale]/components/header.module.css";

export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      {/* Nombre / Logo */}
      <Link href="/" aria-label="Ir al inicio" className={styles.name}>
        Nathaly Hellström
      </Link>

      {/* Botón hamburguesa */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ""}`}></span>
        <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ""}`}></span>
        <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ""}`}></span>
      </div>

      {/* Menú de navegación */}
      <nav className={`${styles.navMenu} ${menuOpen ? styles.showMenu : ""}`}>
        <ul>
          <li><Link href="/">{t("home")}</Link></li>
          <li><Link href="/project/matmilen">{t("project")}</Link></li>
          <li><Link href="/about">{t("about")}</Link></li>
          <li><Link href="/contact">{t("contact")}</Link></li>

          {/* 🔹 Versión escritorio: selector normal */}
          <li className={styles.desktopLang}>
            <LanguageSwitcher />
          </li>

          {/* 🔹 Versión móvil: banderas horizontales */}
          {menuOpen && (
            <li className={styles.mobileLang}>
              <LanguageSwitcher isMobileMenu={true} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
