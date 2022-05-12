import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import heroImage from '../public/myPhoto.webp'

const Hero = () => {
  const { t } = useTranslation('hero')

  return (
    <div className="bg-white">
      <div className="relative m-auto w-full max-w-[692px] flex-col items-center justify-items-center  px-4 py-8 xs:px-8 md:px-0 md:py-10 lg:flex lg:flex-row xl:max-w-[980px]">
        <div className="animate__animated animate__fadeIn relative m-auto flex h-[250px]  w-[250px] flex-shrink-0 flex-grow-0 rounded-md   lg:order-2">
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
        <div className="pt-8 lg:order-1 lg:w-2/3">
          <h1 className="pb-6 text-2xl font-extrabold text-primary transition-all duration-150 md:gap-3 md:text-3xl ">
            {`${t(`h1`)} 👋`}
          </h1>
          <p className="pb-2">{t(`p1`)}</p>
          <p className="">{t(`p2`)}</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
