//estilos 
//import styles from "./linea.module.css"; 

//metadatos para el SEO
export const metadata = {
  title: "Línea de Tiempo | Mi Proyecto",
  description: "Visualiza los hitos y la evolución de nuestro proyecto.",
  keywords: ["línea de tiempo", "hitos", "proyecto", "cronología"],
  authors: [{ name: "Tu Nombre", url: "https://tu-sitio.com" }],
  robots: "index, follow",
};

export default function LineTimePage() {
  return (
    //<main className={styles.main}></main>
    <main >
      <h1 >Línea de Tiempo</h1>
      <p >
        Aquí mostramos los eventos más importantes de nuestro proyecto.
      </p>

      <section>
        <div>
          <h3>Evento 1</h3>
          <p>Descripción del primer hito.</p>
        </div>
        <div>
          <h3>Evento 2</h3>
          <p>Descripción del segundo hito.</p>
        </div>
       
      </section>
    </main>
  );
}