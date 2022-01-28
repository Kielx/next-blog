import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

type Props = {
  slug: string
  coverImage: string
  title: string
  excerpt: string
  date: string
  keywords: string[]
}

const Post: React.FC<Props> = ({
  slug,
  coverImage,
  title,
  excerpt,
  date,
  keywords,
}) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    rootMargin: '50px',
  })

  // Check if component is in default view
  const [initialView, setInitialView] = useState(true)

  useEffect(() => {
    // If component is rendered to DOM and is not in the view, set initialView to false
    if (entry && !inView) {
      setInitialView(false)
    }
  }, [entry, inView])

  // Then in main function we check which posts are in view and toggle fadeIn animation class for that are not
  return (
    <Link href={`/posts/${slug}`} passHref>
      <div
        ref={ref}
        className={`${
          inView && !initialView && 'animate__fadeInUp'
        } animate__animated  Post group col-span-12 md:col-span-4 hover:shadow-md shadow-sm p-3 lg:p-8 bg-white rounded-lg transition-all cursor-pointer relative border border-opacity-5 border-black`}
        key={slug}
      >
        <div className="flex w-full h-40 md:h-40 overflow-hidden rounded-lg">
          <div className="w-full relative cardImageContainer">
            <Image
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
            <div className="overlay" />
          </div>
        </div>

        <div className="shadow-none rounded-lg pb-2 flex flex-col">
          <h3 className="pt-4 transition-all text-[#444444] hover:text-[#222] text-start md:text-left text-md md:text-xl font-extrabold">
            {title}
          </h3>
          <p className="transition-all group-hover:text-gray-400  text-gray-300 text-xs lg:text-sm ">
            {date}
          </p>

          <p className="line-clamp-4 transition-all group-hover:text-gray-600 text-gray-500 text-xs md:text-sm  pt-2">
            {excerpt}
          </p>

          <div className="flex pt-2 flex-wrap">
            {keywords?.map((keyword) => (
              <span
                key={keyword}
                className="transition-all group-hover:text-gray-400 text-gray-300 text-xs md:text-sm pt-1 mr-1"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
