"use client";
import espana from '@/../public/espana.png';
import inglaterra from '@/../public/bandera.png';
import styles from '@/app/[locale]/components/lenguaje.module.css';
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function LanguageSwitcher({ isMobileMenu = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
    setOpen(false);
  };

  const options = [
    { locale: "es", flag: espana, alt: "Español" },
    { locale: "en-gb", flag: inglaterra, alt: "English" },
  ];

  const currentFlag = options.find(opt => opt.locale === currentLocale);

  // 🔹 Vista móvil (hamburguesa)
  if (isMobileMenu) {
    return (
      <div className={styles.mobileLangContainer}>
        {options.map(opt => (
          <button
            key={opt.locale}
            className={`${styles.dropdownItem} ${opt.locale === currentLocale ? styles.active : ""}`}
            onClick={() => switchLocale(opt.locale)}
          >
            <Image src={opt.flag} alt={opt.alt} width={32} height={32} />
          </button>
        ))}
      </div>
    );
  }

  // 🔹 Vista escritorio (dropdown normal)
  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setOpen(!open)}
      >
        <Image src={currentFlag.flag} alt={currentFlag.alt} width={32} height={32} />
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          {options
            .filter(opt => opt.locale !== currentLocale)
            .map(opt => (
              <button
                key={opt.locale}
                className={styles.dropdownItem}
                onClick={() => switchLocale(opt.locale)}
              >
                <Image src={opt.flag} alt={opt.alt} width={32} height={32} />
              </button>
          ))}
        </div>
      )}
    </div>
  );
}
