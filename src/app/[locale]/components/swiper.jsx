"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import Image from "next/image";
import styles from "../components/swiper.module.css";

export default function Carousel() {
  const slides = [
    {
      img: "/foto_1.jpg",
      title: "Matmilen",
      subtitle: "SUECIA",
      desc: "TEXTO",
      url: "https://es.wikipedia.org/wiki/Machu_Picchu"
    },
    {
      img: "/foto_1.jpg",
      title: "Spökvandring ",
      subtitle: "COLOMBIA",
      desc: "TEXTO",
      url: "https://es.wikipedia.org/wiki/Himalaya"
    },
    {
      img: "/foto_1.jpg",
      title: "GUGO",
      subtitle: "SUECIA",
      desc: "TEXTO",
      url: "https://es.wikipedia.org/wiki/Amazonia"
    },
    {
      img: "/foto_1.jpg",
      title: "Sin frenos",
      subtitle: "COLOMBIA",
      desc: "TEXTO",
      url: "https://es.wikipedia.org/wiki/Amazonia"
    }
  ];

  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={2}
        slidesPerGroup={1}  
        spaceBetween={50}    
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link href={slide.url} target="_blank">
              <div className={styles.slideContent}>
                <Image
                  src={slide.img}
                  alt={slide.title}
                  width={400}
                  height={500}
                  className={styles.slideImage}
                />
                <div className={styles.slideText}>
                  <h2>{slide.title}</h2>
                  <h3>{slide.subtitle}</h3>
                  <p>{slide.desc}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
