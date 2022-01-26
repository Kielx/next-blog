import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  slug: string
  coverImage: string
  title: string
  excerpt: string
  date: string
}

const Post: React.FC<Props> = ({ slug, coverImage, title, excerpt, date }) => (
  <Link href={`/posts/${slug}`} passHref>
    <div
      className="Post group col-span-6 bg-white rounded-xl shadow-sm cursor-pointer relative border border-opacity-5 border-black"
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

        <p className="transition-all group-hover:text-gray-600 text-gray-500 text-lg  pt-4">
          {excerpt}
        </p>
        <p className="transition-all group-hover:text-gray-600  text-gray-500 text-sm absolute right-6 bottom-4">
          {date}
        </p>
      </div>
    </div>
  </Link>
)

export default Post
