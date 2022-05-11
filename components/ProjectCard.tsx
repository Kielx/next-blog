import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import LazyLoad from 'react-lazyload'
import Button from './Button'
import Ribbon from './Ribbon'

type Props = {
  placeholder: string
  slug: string
  coverImage: string
  title: string
  liveLink: string
  githubLink: string
  excerpt: string
  techUsed: string[]
  ribbonIcon: string
  ribbonColor: string
  writeup?: boolean
  displayCardImageContain?: boolean
}

const ProjectCard: React.FC<Props> = ({
  placeholder,
  slug,
  coverImage,
  title,
  liveLink,
  githubLink,
  excerpt,
  techUsed,
  ribbonIcon,
  ribbonColor,
  writeup,
  displayCardImageContain,
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

  // Then in main function we check which projects are in view and toggle fadeIn animation class for that are not
  return (
    <div
      className={`${
        inView && !initialView && 'animate__fadeInUp animate__fast'
      } animate__animated Post group relative col-span-12  cursor-pointer rounded-lg bg-white shadow transition-all hover:shadow-md md:col-span-6`}
      key={slug}
    >
      <a
        aria-label="Project live page  link"
        rel="noopener noreferrer"
        target="_blank"
        href={liveLink}
        ref={ref}
        className="absolute inset-0 z-[1]"
      >
        <span className="hidden">{`${title} Project - Read More`}</span>
      </a>

      <div className="flex h-40 w-full  overflow-hidden rounded-t-lg xs:h-[204px] md:h-[187px] xl:h-[266px]">
        <div className="cardImageContainer animate__animated animate__fadeIn relative w-full">
          {coverImage.match(/.webm|.mp4/) ? (
            <LazyLoad height="266" offset={100} once>
              <video
                src={coverImage}
                playsInline
                autoPlay
                muted
                loop
                className="h-full w-full max-w-full"
              />
            </LazyLoad>
          ) : (
            <Image
              blurDataURL={placeholder}
              quality={100}
              placeholder="blur"
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit={displayCardImageContain ? 'contain' : 'cover'}
              objectPosition="center"
              sizes="33vw"
            />
          )}
          <div className="overlay" />
        </div>
      </div>
      <Ribbon ribbonColor={ribbonColor} ribbonIcon={ribbonIcon} />
      <div className="flex flex-col rounded-lg p-4 shadow-none">
        <h3 className=" text-start text-md font-extrabold text-primary transition-all hover:text-[#222] md:text-left md:text-xl">
          {title}
        </h3>
        <p className="py-1 text-xs text-secondary transition-all line-clamp-3 group-hover:text-secondary md:text-sm  lg:pt-2">
          {excerpt}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            bgColor="#24292F"
            link={githubLink}
            iconSvg={
              <svg
                className="h-8 w-8"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
            }
          />
          {writeup && (
            <Button
              bgColor="#333333"
              innerLink
              link={`/projects/${slug}`}
              buttonText="Write-up"
              iconSvg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              }
            />
          )}
        </div>

        <div className="flex flex-wrap pt-2">
          {techUsed?.map((keyword) => (
            <span
              key={keyword}
              className="mr-1 pt-2 text-xs text-secondary  opacity-80 transition-all group-hover:text-secondary"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

ProjectCard.defaultProps = {
  writeup: false,
  displayCardImageContain: false,
}

export default ProjectCard
