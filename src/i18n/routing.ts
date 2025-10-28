import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Definimos los idiomas y sus rutas traducidas
export const routing = defineRouting({
  locales: ['en-gb', 'es'],
  defaultLocale: 'en-gb',

  // Aquí defines cómo se traducen las rutas entre idiomas
  pathnames: {
    '/about': {
      'en-gb': '/about',
      es: '/sobre'
    },
    '/contact': {
      'en-gb': '/contact',
      es: '/contacto'
    },
    '/project/[slug]': {
      'en-gb': '/project/[slug]',
      es: '/proyecto/[slug]'
    }
  }
});

// Exportamos helpers listos para usar en todo el proyecto
export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname
} = createNavigation(routing);
