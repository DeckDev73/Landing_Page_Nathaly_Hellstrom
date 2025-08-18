import Image from "next/image";
import styles from "./page.module.css";
import foto from "../public/foto_1.jpg";
import Link from "next/link";
//metadatos para el SEO
export const metadata = {
  title: "Línea de Tiempo | Mi Proyecto",
  description: "Visualiza los hitos y la evolución de nuestro proyecto.",
  keywords: ["línea de tiempo", "hitos", "proyecto", "cronología"],
  authors: [{ name: "Tu Nombre", url: "https://tu-sitio.com" }],
  robots: "index, follow",
};


export default function Home() {
  return (
    <div>
      <main>
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <h1>Nathaly Hells</h1>
            <p>orem Ipsum es simplemente el texto de relleno de las imprentas y archivos 
              de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias 
              desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la 
              imprenta) desconocido usó una galería de textos y los mezcló de tal manera que 
              logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que 
              tambien ingresó como texto de relleno en documentos electrónicos, quedando 
              esencialmente igual al original. Fue popularizado en los 60s con la creación 
              de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más 
              recientemente con software de autoedición, como por ejemplo Aldus PageMaker,
               el cual incluye versiones de Lorem Ipsum.</p>
          </div>
          <div className={styles.containerRight}>
            <Image
              src={foto} 
              alt="Logo"
              width={580}  
              height={919}  
              className={styles.fotoImg}
            />

          </div>
        </div>
      </main>
    </div>
  );
}
