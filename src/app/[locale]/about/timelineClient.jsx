"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { EyeOff } from "lucide-react";
import styles from "./line_time.module.css";
import customEyeIcon from "@/../public/logo_1.svg";

export default function TimelineClient({ timeline, seo }) {
  const [showImages, setShowImages] = useState(timeline.map(() => true));
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const connectorRefs = useRef([]);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Efecto para posicionar botones debajo del contenido en móvil
  useEffect(() => {
    if (!isMobile) return;

    const positionButtons = () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        const connectorContainer = connectorRefs.current[index];
        if (!connectorContainer) return;

        // Obtener el último elemento visible (texto o imagen)
        const textContent = card.querySelector(`.${styles.textContent}`);
        const imageContainer = card.querySelector(`.${styles.imageContainer}`);
        
        let lastElement = textContent;
        
        if (imageContainer && showImages[index] && imageContainer.offsetHeight > 0) {
          lastElement = imageContainer;
        }
        
        if (lastElement) {
          // Calcular posición debajo del último elemento
          const cardRect = card.getBoundingClientRect();
          const elementRect = lastElement.getBoundingClientRect();
          
          // Posición relativa dentro del card
          const elementBottomRelative = elementRect.bottom - cardRect.top;
          
          // Posicionar el botón 20px debajo del último elemento
          connectorContainer.style.top = `${elementBottomRelative + 20}px`;
        }
      });
    };

    // Usar requestAnimationFrame para evitar cálculos excesivos
    const rafId = requestAnimationFrame(() => {
      positionButtons();
    });

    window.addEventListener('resize', positionButtons);
    
    return () => {
      window.removeEventListener('resize', positionButtons);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, showImages]);

  // Efecto para scroll horizontal solo en desktop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isMobile) return;
    
    el.scrollLeft = 0;
    const onWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile]);

  const toggleImage = (index) => {
    setShowImages((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  return (
    <>
      <div 
        className={`${styles.timelineWrapper} ${isMobile ? styles.mobile : ''}`} 
        ref={scrollRef}
        data-mobile={isMobile}
      >
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          {timeline.map((item, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`${styles.card} ${
                index % 2 === 0 ? styles.even : styles.odd
              }`}
              data-index={index}
            >
              <div className={styles.connectorUp} aria-hidden="true"></div>
              <div className={styles.connectorDown} aria-hidden="true"></div>
              
              {/* Contenido reorganizado para móvil */}
              <div className={styles.textContent}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text} dangerouslySetInnerHTML={{ __html: item.text }}></p>
              </div>
              
              {showImages[index] && item.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image}
                    alt={`Image for ${item.title}`}
                    width={150}
                    height={150}
                    className={styles.timelineImage}
                    priority={index === 0}
                  />
                </div>
              )}
              
              {/* Contenedor para botón y línea horizontal (POSICIONADO ABSOLUTAMENTE) */}
              <div 
                className={styles.connectorContainer}
                ref={el => connectorRefs.current[index] = el}
              >
                <button
                  className={styles.eyeBtn}
                  onClick={() => toggleImage(index)}
                  aria-label={showImages[index] ? 
                    `Ocultar imagen para ${item.title}` : 
                    `Mostrar imagen para ${item.title}`}
                >
                  {showImages[index] ? (
                    // Cuando la imagen está VISIBLE: muestra tu imagen personalizada
                    <Image
                      src={customEyeIcon}
                      alt={`Ocultar imagen para ${item.title}`}
                      width={18}  // Ajusta según el tamaño de tu imagen
                      height={18} // Ajusta según el tamaño de tu imagen
                      className={styles.customEyeIcon}
                    />
                  ) : (
                    // Cuando la imagen está OCULTA: muestra el ojo cerrado
                    <EyeOff size={16} />
                  )}
                </button>
                <div className={styles.horizontalConnector} aria-hidden="true"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Script
        id="timeline-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seo.jsonLd),
        }}
      />
    </>
  );
}
