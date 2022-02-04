import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '../components/Header'

const About = () => {
  const { t } = useTranslation('about')

  return (
    <>
      <Header />
      <p>{t('name')}</p>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['about'])),
  },
})

export default About
