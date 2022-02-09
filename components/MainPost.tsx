import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  slug: string
  coverImage: string
  title: string
  excerpt: string
  date: string
  keywords: string[]
}

const MainPost: React.FC<Props> = ({
  slug,
  coverImage,
  title,
  excerpt,
  date,
  keywords,
}) => (
  <Link href={`/posts/${slug}`} passHref>
    <a
      href="replace"
      className="Post group hover:shadow-sm relative  transition-all  col-span-12 mx-auto md:col-span-12 mainCard w-full flex flex-wrap md:flex-nowrap bg-white rounded-lg cursor-pointer shadow"
      key={slug}
    >
      <div className="mb-4 md:mb-0 flex w-full md:w-8/12 min-h-[30vh]  md:min-h-[10vh] md:h-auto overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
        <div className="w-full relative cardImageContainer">
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="overlay" />
        </div>
      </div>
      <div className=" bg-white rounded-lg px-3 md:py-6 md:px-4 xl:p-8 xl:pb-4 md:w-4/12 flex flex-col ">
        <h3 className="font-bold transition-all text-[#444444] hover:text-[#222] text-md xl:text-2xl text-start md:leading-5 xl:leading-7 pb-1">
          {title}
        </h3>
        <p className="transition-all group-hover:text-gray-400  text-gray-300 text-xs pb-2">
          {date.split('-').reverse().join('-')}
        </p>
        <p className="transition-all group-hover:text-gray-500  m-auto text-[#828282] text-xs md:text-sm xl:text-base xl:leading-[1.65rem]  pt-2 ">
          {excerpt}
        </p>
        <div className="flex gap-4 mt-auto pb-2 md:pb-0">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="text-xs transition-all group-hover:text-gray-400  text-gray-300 pt-2 xl:pt-4"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="w-10/12 z-[-100] h-12 bg-transparent left-1/2 transform -translate-x-1/2 bottom-0 absolute shadow-[0_4px_32px_rgba(0,0,0,0.12)]" />
    </a>
  </Link>
)

export default MainPost
