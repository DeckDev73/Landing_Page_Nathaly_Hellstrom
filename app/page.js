// import Image from "next/image";
// import styles from "./page.module.css";
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
        <h1>HELLO</h1>
        <Link href="/line_time">
          Ir a Línea de Tiemp
        </Link>
      </main>
    </div>
  );
}
