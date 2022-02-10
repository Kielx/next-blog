import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '../components/Header'

const About = () => {
  const { t } = useTranslation('about')

  return (
    <>
      <Header />
      <div className="relative h-[20vh] w-full overflow-hidden bg-black xl:h-[30vh]">
        <div className="absolute -bottom-5 left-0 cursor-default bg-gradient-to-b from-black to-gray-800 bg-clip-text text-8xl font-black text-transparent xl:-bottom-20 xl:left-0 xl:text-[400px] ">
          About
        </div>
        <div className="absolute left-4 bottom-6 text-5xl font-bold text-white xl:bottom-24 xl:left-52 xl:text-8xl">
          About me
        </div>
      </div>
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
