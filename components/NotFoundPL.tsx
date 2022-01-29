import React from 'react'
import Link from 'next/link'

type Props = {
  slug: string
}

const NotFoundPL = ({ slug }: Props) => {
  return (
    <div className="w-full md:w-3/4 lg:w-8/12 flex flex-col max-w-[920px] m-auto rounded-md translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
      <h2 className="text-[#444444] font-bold text-xl xs:text-2xl sm:text-3xl  text-center">
        Ups... Ten post nie istnieje w tym tłumaczeniu
      </h2>
      <div className="text-[#444444] text-center pt-3">
        Spróbuj w{' '}
        <Link href={slug} locale="en-US" passHref>
          <button type="button" className="text-blue-500 hover:text-blue-700">
            wersji angielskiej
          </button>
        </Link>{' '}
        lub{' '}
        <Link href="/" passHref>
          <button type="button" className="text-blue-500 hover:text-blue-700">
            wróć do strony głównej
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPL
