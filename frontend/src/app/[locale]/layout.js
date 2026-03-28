import { locales } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import { getCountryConfig } from '@/lib/countryConfig';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FlagStripe from '@/components/FlagStripe';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const config = getCountryConfig();

  const title = config.seoTitle[locale] || config.seoTitle[config.defaultLocale];
  const description = config.seoDescription[locale] || config.seoDescription[config.defaultLocale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://${config.domain}/${locale}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `https://${config.domain}/${loc}`])
      ),
    },
    openGraph: {
      title,
      description,
      locale: locale,
      type: 'website',
      siteName: config.siteName,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : locales[0];
  const t = getTranslation(validLocale);

  return (
    <>
      <FlagStripe />
      <Header locale={validLocale} t={t} />
      <main className="flex-1">{children}</main>
      <Footer locale={validLocale} t={t} />
    </>
  );
}
