"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { Eye } from "lucide-react";
import styles from "./line_time.module.css";

export default function TimelineClient({ timeline, seo }) {
  const [showImages, setShowImages] = useState(timeline.map(() => false));
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;

    const onWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const toggleImage = (index) => {
    setShowImages((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  return (
    <>
      <div className={styles.timelineWrapper} ref={scrollRef}>
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                index % 2 === 0 ? styles.even : styles.odd
              } ${item.text.length > 100 && index % 2 === 0 ? styles.longTextEven : ""}`}
            >
              <div className={styles.connectorUp} aria-hidden="true"></div>
              <div className={styles.connectorDown} aria-hidden="true"></div>
              <button
                className={styles.eyeBtn}
                onClick={() => toggleImage(index)}
                aria-label={`Toggle image for ${item.title} from ${item.year}`}
              >
                <Eye size={16} />
              </button>
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
                  />
                </div>
              )}
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
