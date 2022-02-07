import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '../components/Header'

const About = () => {
  const { t } = useTranslation('about')

  return (
    <>
      <Header />
      <h1>{t('h1')}</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'about'])),
  },
})

export default About
