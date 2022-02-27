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
      className="Post group mainCard relative col-span-12  mx-auto  -mt-6 flex w-full cursor-pointer flex-wrap rounded-lg bg-white shadow transition-all hover:shadow-md md:col-span-12 md:flex-nowrap"
      key={slug}
    >
      <div className=" mb-4 flex min-h-[30vh] w-full overflow-hidden rounded-t-lg  md:mb-0 md:h-auto md:min-h-[10vh] md:w-1/2 md:rounded-l-lg md:rounded-r-none">
        <div className="animate__animated animate__fadeIn cardImageContainer relative w-full">
          {coverImage.match(/.webm/) ? (
            <video
              src={coverImage}
              playsInline
              autoPlay
              muted
              loop
              className="h-auto w-full max-w-full"
            />
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
      <div className=" flex flex-col rounded-lg bg-white px-3 md:w-1/2 md:py-6 md:px-4 xl:p-8 xl:pb-4 ">
        <h3 className="text-md text-start pb-1 font-extrabold text-primary transition-all hover:text-[#222] md:leading-5 xl:text-2xl xl:leading-7">
          {title}
        </h3>
        <p className="pb-2 text-xs  text-secondary transition-all group-hover:text-secondary">
          {date.split('-').reverse().join('-')}
        </p>
        <p className="m-auto pt-2  text-xs text-secondary transition-all group-hover:text-secondary md:text-sm xl:text-base  xl:leading-[1.65rem] ">
          {excerpt}
        </p>
        <div className="mt-auto flex gap-4 pb-2 md:pb-0">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="pt-2 text-xs text-secondary  transition-all group-hover:text-secondary xl:pt-4"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 bottom-0 z-[-100] h-12 w-10/12 -translate-x-1/2 transform bg-transparent shadow-[0_4px_32px_rgba(0,0,0,0.12)]" />
    </a>
  </Link>
)

export default MainPost
