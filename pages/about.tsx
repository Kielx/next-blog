import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Header from '../components/Header'

const About = () => {
  const { t } = useTranslation('about')

  return (
    <div className="min-h-full bg-white">
      <Header />
      <div className="m-auto w-full max-w-[692px] flex-col items-center justify-items-center gap-20 px-4 py-8 xs:px-8 md:px-0 md:py-20 lg:flex lg:flex-row xl:max-w-[980px]">
        <div className="relative m-auto h-[250px] w-[250px] flex-shrink-0 flex-grow-0 rounded-md border-4 border-white shadow-md">
          <Image
            src="/myPhoto.webp"
            alt="about"
            width={250}
            height={250}
            className="rounded-md"
          />
        </div>
        <div className="w-full pt-8">
          <h1 className="pb-6 text-2xl font-extrabold text-[#2c2c2c] transition-all md:gap-3 md:text-3xl ">
            {`${t('h1')}   `}
            <Image
              width={30}
              height={30}
              alt="waving hand"
              src="https://raw.githubusercontent.com/Kielx/Kielx/main/wave.gif"
            />
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
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'about'])),
  },
})

export default About
