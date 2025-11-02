// request.ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { cookies } from 'next/headers';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 🟢 Esperamos a que se resuelva cookies()
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

  // Si no hay cookie, usamos el idioma detectado por Next
  const requested = cookieLocale || (await requestLocale);

  // Validamos idioma
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Retornamos el idioma con sus mensajes
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
