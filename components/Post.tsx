import React from 'react'
import Image from 'next/image'

type Props = {
  slug: string
  coverImage: string
  title: string
  excerpt: string
  date: string
}

const Post: React.FC<Props> = ({ slug, coverImage, title, excerpt, date }) => (
  <div
    className="col-span-6 bg-white rounded-xl shadow-sm cursor-pointer relative"
    key={slug}
  >
    <div className="flex w-full h-64 overflow-hidden rounded-t-xl">
      <div className="w-full relative cardImageContainer">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
        <div className="overlay" />
      </div>
    </div>

    <div className="bg-white shadow-none rounded-xl p-8 pb-10 flex flex-col">
      <h3 className="text-2xl font-extrabold indent-2">{title}</h3>

      <p className="text-gray-500 text-lg  pt-4">{excerpt}</p>
      <p className="text-gray-500 text-sm absolute right-6 bottom-4">{date}</p>
    </div>
  </div>
)

export default Post
