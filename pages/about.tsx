import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Header from '../components/Header'

const About = () => {
  const { t } = useTranslation('about')

  return (
    <>
      <Header />
      <div className="relative w-full overflow-hidden bg-[#111312]">
        <div className="font-base cursor-default bg-gradient-to-b from-[#111312] to-gray-800 bg-clip-text text-8xl font-black leading-[80px] text-transparent opacity-70 xs:text-9xl xs:leading-[100px] md:pl-12 md:text-[200px] md:leading-[150px] xl:pl-20  xl:text-[300px] xl:leading-[220px]">
          {t('about')}
        </div>
        <div className="absolute left-4 bottom-4 text-5xl font-bold text-white md:bottom-8 md:left-8 md:text-6xl lg:left-16 xl:bottom-12 xl:left-40 xl:text-8xl">
          {t('about-me')}
        </div>
      </div>
      <div className="m-auto flex w-full max-w-[692px] gap-20 px-4 py-8 xs:px-8 md:px-0 md:py-20 xl:max-w-[980px]">
        <div className="relative h-[250px] w-[250px] flex-shrink-0 flex-grow-0 rounded-md border-4 border-white shadow-lg">
          <Image src="/myPhoto.webp" alt="about" width={250} height={250} />
        </div>
        <div className="w-full">
          <h1 className="pb-6 text-3xl font-extrabold text-gray-800 ">
            {t('h1')}
          </h1>
          <div className="flex flex-col gap-4 ">
            <p>{t('about1')}</p>
            <p>{t('about2')}</p>
            <p>{t('about3')}</p>
            <p>{t('about4')}</p>
            <p>{t('about5')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'about'])),
  },
})

export default About
