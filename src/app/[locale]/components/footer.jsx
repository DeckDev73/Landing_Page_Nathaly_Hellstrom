"use client";
import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

// Importar imágenes desde public
import logo from '@/../public/logo_nombre_1.png';
import insta from '@/../public/Icons-14.png';
import linkedin from '@/../public/Icons-21.png';
import gmail from '@/../public/Icons-22.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Logo y nombre */}
      <div className={styles.logo}>
        <Image src={logo} alt="Nathaly Hellström" />
      </div>

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
    </footer>
  );
}
