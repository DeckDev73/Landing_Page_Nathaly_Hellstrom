"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Header from "@/app/[locale]/components/header";
import styles from "./contact.module.css";

export default function FormContact() {
  const t = useTranslations("ContactPage.hero");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

    script.onload = () => {
      if (window.emailjs) {
        // ✅ Inicializamos EmailJS con la variable de entorno
        window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

        const form = document.getElementById("contact-form");

        // 🔹 Evita duplicar listeners en modo desarrollo
        if (form) {
          const newForm = form.cloneNode(true);
          form.parentNode.replaceChild(newForm, form);

          const newBtn = document.getElementById("button");

          newForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            newBtn.value = "Sending...";

            try {
              await window.emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                newForm
              );

              alert("✅ Email sent successfully!");
              newForm.reset();
            } catch (err) {
              console.error(err);
              alert("❌ Failed to send email. Please try again later.");
            } finally {
              newBtn.value = "Send Email";
            }
          });
        }
      }
    };

    document.body.appendChild(script);

    // 🔹 Limpieza al desmontar el componente
    return () => {
      const form = document.getElementById("contact-form");
      if (form) {
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
      }
    };
  }, []);

  return (
    <section className={styles.contactSection}>
      <div>
        <Header />
      </div>
      <div className={styles.form}>
        <div className={styles.contactContainerLeft}>
          <h1 className={styles.contactTitle}>{t("title")}</h1>
          <h2 className={styles.contactSubtitle}>{t("subtitle")}</h2>
          <p className={styles.contactParrafo}>
            {t.rich("description", { br: () => <br /> })}
          </p>
        </div>

        <div className={styles.contactContainerRight}>
          <form id="contact-form" className={styles.contactForm}>
            <h3 className={styles.formTitle}>{t("form.title")}</h3>

            <input
              type="text"
              name="user_name"
              placeholder={t("form.name")}
              required
              className={styles.formInput}
            />

            <input
              type="email"
              name="user_email"
              placeholder="Email"
              required
              className={styles.formInput}
            />

            <h4 className={styles.formSubtitle}>{t("form.interested")}</h4>
            <div className={styles.formOptions}>
              <label className={styles.formLabel}>
                <input
                  type="radio"
                  name="user_interest"
                  value="UX Design"
                  required
                  className={styles.formRadio}
                />
                {t("form.option1")}
              </label>
              <label className={styles.formLabel}>
                <input
                  type="radio"
                  name="user_interest"
                  value="Content Creation"
                  required
                  className={styles.formRadio}
                />
                {t("form.option2")}
              </label>
              <label className={styles.formLabel}>
                <input
                  type="radio"
                  name="user_interest"
                  value="Digital Marketing"
                  required
                  className={styles.formRadio}
                />
                {t("form.option3")}
              </label>
            </div>

            <textarea
              name="user_message"
              placeholder={t("form.message")}
              rows="5"
              required
              className={styles.formTextarea}
            ></textarea>

            <input
              type="submit"
              id="button"
              value="Send Email"
              className={styles.formButton}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
