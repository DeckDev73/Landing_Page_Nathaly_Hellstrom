"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/app/[locale]/components/LocaleSwitcherSelect";
import styles from "@/app/[locale]/components/header.module.css";
import Image from "next/image";
import logo from "@/../public/logo_1.svg";


export default function Header() {
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // ej: /es/sobre-mi o /en-gb/about

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // 🔹 Quitamos el prefijo de idioma (ej: /es, /en-gb)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?:-[a-z]{2})?/, "") || "/";

  // 🔹 Definimos equivalencias por sección (sin importar el idioma)
  const routeGroups = {
    home: ["/", ""],
    project: ["/project/matmilen", "/proyecto/matmilen"],
    about: ["/about", "/sobre-mi"],
    contact: ["/contact", "/contacto"],
  };

  // 🔹 Detectamos en qué sección está el usuario
  const currentSection = Object.keys(routeGroups).find(section =>
    routeGroups[section].some(route => pathWithoutLocale === route)
  );

  // 🔹 Lista de links del header
  const links = [
    { id: "home", href: "/", label: t("home") },
    { id: "project", href: "/project/matmilen", label: t("project") },
    { id: "about", href: "/about", label: t("about") },
    { id: "contact", href: "/contact", label: t("contact") },
  ];

  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Ir al inicio" className={styles.name}>
        Nathaly Hellström
      </Link>

    
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ""}`}></span>
        <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ""}`}></span>
        <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ""}`}></span>
      </div>

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

      <nav className={`${styles.navMenu} ${menuOpen ? styles.showMenu : ""}`}>
        <ul>
          {links
            // 🔹 Ocultamos el link si pertenece a la sección actual
            .filter(link => link.id !== currentSection)
            .map(link => (
              <li key={link.id}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}

          <li className={styles.desktopLang}>
            <LanguageSwitcher />
          </li>

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
