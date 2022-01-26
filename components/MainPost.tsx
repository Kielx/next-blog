import React from 'react'
import Image from 'next/image'

type Props = {
  slug: string
  coverImage: string
  title: string
  excerpt: string
  date: string
}

const MainPost: React.FC<Props> = ({
  slug,
  coverImage,
  title,
  excerpt,
  date,
}) => (
  <div
    className="col-span-12 mainCard w-full min-h-[40vh] flex bg-white rounded-xl shadow-sm cursor-pointer"
    key={slug}
  >
    <div className="flex w-1/2 overflow-hidden rounded-xl">
      <div className="w-full relative cardImageContainer">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          className="rounded-l-xl"
        />
        <div className="overlay" />
      </div>
    </div>

    <div className="bg-white shadow-none rounded-xl p-8 w-1/2 flex flex-col">
      <h3 className="text-3xl font-extrabold text-center">{title}</h3>

      <p className="text-gray-500 text-xl  pt-8">{excerpt}</p>
      <p className="text-gray-500 text-sm mt-auto text-right">{date}</p>
    </div>
  </div>
)

export default MainPost
