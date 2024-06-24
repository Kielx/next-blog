import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import LazyLoad from 'react-lazyload'

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type Props = {
  size: Size
  slug: string
  coverImage: string
  placeholder: string
  title: string
  excerpt: string
  date: string
  keywords: string[]
}

export const PostCard: React.FC<Props> = ({
  slug,
  coverImage,
  placeholder,
  title,
  excerpt,
  date,
  keywords,
  size,
}) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    triggerOnce: true,
    rootMargin: '50px',
  })

  // Check if component is in default view
  const [initialView, setInitialView] = useState(true)

  const linkClasses = {
    small: `${
      inView && !initialView && 'animate__fadeInUp animate__faster'
    } animate__animated Post group relative col-span-12  cursor-pointer rounded-lg bg-white shadow transition-all hover:shadow-md md:col-span-4`,
    medium: `${
      inView && !initialView && 'animate__fadeInUp animate__faster'
    } animate__animated Post group relative col-span-12  cursor-pointer rounded-lg bg-white shadow transition-all hover:shadow-md md:col-span-6`,
    large: `Post group mainCard relative col-span-12  mx-auto  -mt-6 flex w-full cursor-pointer flex-wrap rounded-lg bg-white shadow transition-all hover:shadow-md md:col-span-12 md:flex-nowrap`,
  }

  const cardClasses = {
    small: 'hidden h-40 w-full overflow-hidden  rounded-t-lg md:flex',
    medium:
      'flex h-40 w-full  overflow-hidden rounded-t-lg xs:h-[204px] md:h-[187px] xl:h-[266px]',
    large:
      ' mb-4 flex min-h-[30vh] w-full overflow-hidden rounded-t-lg  md:mb-0 md:h-auto md:min-h-[10vh] md:w-1/2 md:rounded-l-lg md:rounded-r-none',
  }

  useEffect(() => {
    // If component is rendered to DOM and is not in the view, set initialView to false
    if (entry && !inView) {
      setInitialView(false)
    }
  }, [entry, inView])

  // Then in main function we check which posts are in view and toggle fadeIn animation class for that are not
  return (
    <Link href={`/posts/${slug}`} passHref>
      <a href="replace" ref={ref} className={linkClasses[size]} key={slug}>
        <div className={cardClasses[size]}>
          <div className="cardImageContainer animate__animated animate__fadeIn animate__faster relative w-full">
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
                blurDataURL={placeholder}
                placeholder="blur"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                sizes={`${
                  // eslint-disable-next-line no-nested-ternary
                  size === 'small'
                    ? '25vw'
                    : size === 'medium'
                    ? '33vw'
                    : '100vw'
                }`}
              />
            )}
            <div className="overlay" />
          </div>
        </div>

        <div className="flex flex-col rounded-lg p-4 shadow-none">
          <h3
            className={`text-start text-md font-extrabold text-primary transition-all hover:text-[#222] md:text-left ${
              size !== 'small' && 'md:text-xl'
            }`}
          >
            {title}
          </h3>
          <p className="text-xs text-secondary  transition-all group-hover:text-secondary">
            {date.split('-').reverse().join('-')}
          </p>
          {size !== 'small' && (
            <p className="pt-2 text-xs text-secondary transition-all line-clamp-3 group-hover:text-secondary md:text-sm  lg:pt-4">
              {excerpt}
            </p>
          )}

          <div className="flex flex-wrap pt-2">
            {keywords?.map((keyword) => (
              <span
                key={keyword}
                className="mr-1 pt-2 text-xs text-secondary  transition-all group-hover:text-secondary"
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
