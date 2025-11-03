"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { useTranslations } from "next-intl";


export default function DescriptionHome({ shortText, fullText }) {
  const t = useTranslations("HomePage.hero");

  const [verMas, setVerMas] = useState(false);

  return (
    <div>
      <div className={styles.scrollFade}>
        <p className={styles.parrafo}>{verMas ? fullText : shortText}</p>
      </div>

      <button
        className={styles.verMasBtn}
        onClick={() => setVerMas(!verMas)}
      >
        {verMas ? t("seeLess") : t("seeMore")}
      </button>
    </div>
  );
}
