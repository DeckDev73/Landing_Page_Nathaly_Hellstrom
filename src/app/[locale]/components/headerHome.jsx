"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo_1.svg";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/app/[locale]/components/LocaleSwitcherSelect";
import styles from "@/app/[locale]/components/headerHome.module.css";

export default function HeaderHome() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      {/* 🔹 Botón hamburguesa */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ""}`}></span>
        <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ""}`}></span>
        <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ""}`}></span>
      </div>

      {/* 🔹 Logo centrado */}
      <div className={styles.logoContainer}>
        <Link href="/" aria-label="Ir al inicio">
          <Image
            src={logo}
            alt="Logo"
            width={90}
            height={90}
            priority
            className={styles.logoImg}
          />
        </Link>
      </div>

      {/* 🔹 Menú principal */}
      <nav className={`${styles.navMenu} ${menuOpen ? styles.showMenu : ""}`}>
        <ul>
          <li><Link href="/">{t("home")}</Link></li>
          <li><Link href="/project/matmilen">{t("project")}</Link></li>
          <li><Link href="/about">{t("about")}</Link></li>
          <li><Link href="/contact">{t("contact")}</Link></li>

          {/* Idioma en escritorio */}
          <li className={styles.desktopLang}>
            <LanguageSwitcher />
          </li>

          {/* Idioma en móvil */}
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
