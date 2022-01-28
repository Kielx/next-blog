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
    <div
      className="Post group hover:shadow-sm relative p-3 lg:p-8 transition-all  col-span-12 mx-auto md:col-span-12 mainCard w-full min-h-[40vh] flex flex-wrap md:flex-nowrap bg-white rounded-lg cursor-pointer"
      key={slug}
    >
      <div className="order-2 md:order-1 bg-white rounded-lg px-3 md:w-1/2 flex flex-col ">
        <h3 className="font-bold transition-all text-[#444444] hover:text-[#222] text-xl md:text-3xl text-start">
          {title}
        </h3>
        <p className="transition-all group-hover:text-gray-400  text-gray-300 text-sm pt-1">
          {date}
        </p>
        <p className="transition-all group-hover:text-gray-500  text-[#828282] text-base md:text-lg  py-4 ">
          {excerpt}
        </p>
        <div className="flex gap-4 mt-auto">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="transition-all group-hover:text-gray-400  text-gray-300 text-sm pt-1"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>
      <div className="order-1 mb-4 md:mb-0 md:order-2 flex w-full md:w-1/2 h-52 md:h-auto overflow-hidden rounded-lg ">
        <div className="w-full relative cardImageContainer">
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="fill"
            objectPosition="bottom"
            className="md:rounded-l-xl"
          />
          <div className="overlay" />
        </div>
      </div>
      <div className="w-10/12 z-[-100] h-12 bg-transparent left-1/2 transform -translate-x-1/2 bottom-0 absolute shadow-[0_4px_32px_rgba(0,0,0,0.12)]" />
    </div>
  </Link>
)

export default MainPost
