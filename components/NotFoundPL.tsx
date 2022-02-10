import React from 'react'
import Link from 'next/link'

type Props = {
  slug: string
}

const NotFoundPL = ({ slug }: Props) => {
  return (
    <div className="absolute top-[50%] left-[50%] m-auto flex w-full max-w-[920px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-md md:w-3/4 lg:w-8/12">
      <h2 className="text-center text-xl font-bold text-[#444444] xs:text-2xl  sm:text-3xl">
        Ups... Ten post nie istnieje w tym tłumaczeniu
      </h2>
      <div className="pt-3 text-center text-[#444444]">
        Spróbuj w{' '}
        <Link href={slug} locale="en-US" passHref>
          <a
            href="replace"
            type="button"
            className="text-blue-500 hover:text-blue-700"
          >
            wersji angielskiej
          </a>
        </Link>{' '}
        lub{' '}
        <Link href="/" passHref>
          <a
            href="replace"
            type="button"
            className="text-blue-500 hover:text-blue-700"
          >
            wróć do strony głównej
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPL
