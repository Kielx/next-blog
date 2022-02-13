import Image from 'next/image'
import { useTranslation } from 'next-i18next'

type Props = {
  imageLink: string
}

const Hero = ({ imageLink }: Props) => {
  const { t } = useTranslation('hero')

  return (
    <div className="bg-white">
      <div className="m-auto w-full max-w-[692px] flex-col items-center justify-items-center  px-4 py-8 xs:px-8 md:px-0 md:py-10 lg:flex lg:flex-row xl:max-w-[980px]">
        <div className="relative m-auto flex h-[250px]  w-[250px] flex-shrink-0 flex-grow-0 rounded-md border-4 border-white shadow-md lg:order-2">
          <Image
            src={imageLink}
            alt="about"
            width={250}
            height={250}
            className="rounded-md"
          />
        </div>
        <div className="pt-8 lg:order-1 lg:w-2/3">
          <h1 className="pb-6 text-2xl font-extrabold text-[#2c2c2c] transition-all md:gap-3 md:text-3xl ">
            {t(`h1`)}
            <Image
              width={30}
              height={30}
              alt="waving hand"
              src="https://raw.githubusercontent.com/Kielx/Kielx/main/wave.gif"
            />
          </h1>
          <p className="pb-2">{t(`p1`)}</p>
          <p>{t(`p2`)}</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
