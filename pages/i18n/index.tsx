import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router'
import Head from 'next/head'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function i18nTest() {
    const { t } = useTranslation();
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{t('title',{value:'i18next'})}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>
                <button onClick={() => router.push('/i18n','/i18n', { locale: 'tw' })}>
                設定中文
                </button>
                <button onClick={() => router.push('/i18n','/i18n', { locale: 'en' })}>
                設定英文
                </button>
            </main>
            <footer>
                <p>{t('footer.description')}</p>
                <p>{t('title',{value:'i18next'})}</p>
                <p>{t('test',{msg:'1000'})}</p>
            </footer>
        </div>
    )
}