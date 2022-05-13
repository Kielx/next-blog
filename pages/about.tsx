import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Header from '../components/Header'
import heroImage from '../public/myPhoto.webp'

const About = () => {
  const { t } = useTranslation('about')

  return (
    <div className="min-h-full bg-white">
      <Header />
      <div className="m-auto w-full max-w-[692px] flex-col items-center justify-items-center  px-4 py-8 xs:px-8 md:px-0 md:py-10 lg:flex lg:flex-row xl:max-w-[980px]">
        <div className="w-full pt-8">
          <h1 className="pb-6 text-2xl font-extrabold text-primary transition-all md:gap-3 md:text-3xl ">
            {`${t('h1')} 👋  `}
          </h1>
          <div className="flex flex-col gap-4 ">
            <p>{t('about1')}</p>
            <p>{t('about2')}</p>
            <p>{t('about3')}</p>
          </div>
        </div>
        <div className="animate__animated animate__fadeIn animate__faster relative m-auto flex h-[250px]  w-[250px] flex-shrink-0 flex-grow-0 rounded-md   lg:order-2">
          <Image
            src={heroImage}
            placeholder="blur"
            layout="fixed"
            alt="about"
            width={250}
            height={250}
            className="rounded-md"
            priority
          />
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
