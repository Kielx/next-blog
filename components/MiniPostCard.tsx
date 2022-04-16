import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import LazyLoad from 'react-lazyload'

type Props = {
  slug: string
  coverImage: string
  title: string
  date: string
  keywords: string[]
}

const MiniPostCard: React.FC<Props> = ({
  slug,
  coverImage,
  title,
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
      <a
        href="replace"
        ref={ref}
        className={`${
          inView && !initialView && 'animate__fadeInUp'
        } animate__animated Post group relative col-span-12  cursor-pointer rounded-lg bg-white shadow transition-all hover:shadow-md md:col-span-4`}
        key={slug}
      >
        <div className="hidden h-40 w-full overflow-hidden  rounded-t-lg md:flex ">
          <div className="cardImageContainer animate__animated animate__fadeIn relative w-full">
            {coverImage.match(/.webm/) ? (
              <LazyLoad height="200">
                <video
                  src={coverImage}
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="h-auto w-full max-w-full"
                />
              </LazyLoad>
            ) : (
              <Image
                src={coverImage}
                alt={title}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            )}
            <div className="overlay" />
          </div>
        </div>

        <div className="flex flex-col rounded-lg p-4 shadow-none">
          <h3 className=" text-start text-md font-extrabold text-primary transition-all hover:text-[#222] md:text-left ">
            {title}
          </h3>
          <p className="hidden text-xs text-secondary opacity-80  transition-all group-hover:text-secondary md:block">
            {date.split('-').reverse().join('-')}
          </p>

          <div className="flex flex-wrap pt-2">
            {keywords?.map((keyword) => (
              <span
                key={keyword}
                className="mr-1 pt-2 text-xs text-secondary  opacity-80 transition-all group-hover:text-secondary"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default MiniPostCard
