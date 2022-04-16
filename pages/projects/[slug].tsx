import { useEffect, useState } from 'react'
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'querystring'
import LazyLoad from 'react-lazyload'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import NotFoundPL from '../../components/NotFoundPL'
import Head from '../../components/Head'
import HeadingRenderer from '../../components/ReactMarkdownHeadingRenderer'
import VideoOrImageRenderer from '../../components/ReactMarkdownVideoOrImageRenderer'
import Header from '../../components/Header'
import Button from '../../components/Button'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import ReactMarkdownLineHighlight from '../../components/ReactMarkdownLineHighlight'
import ReactMarkdownA from '../../components/ReactMarkdownA'

interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  slug: string
  frontmatter: {
    title: string
    liveLink: string
    githubLink: string
    date: string
    excerpt: string
    coverImage: string
    keywords: string[]
  }
  content: string
  notFound: boolean | undefined
}

const PostPage: NextPage<Props> = ({
  frontmatter,
  content,
  notFound,
  slug,
}) => {
  const router = useRouter()
  const locale = router.locale as string

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && router.isReady) {
      setTimeout(() => {
        Prism.highlightAll()
      }, 500)
    }
  }, [mounted, router.isReady])

  if (notFound) {
    return <NotFoundPL slug={slug} />
  }

  const components = {
    h2: HeadingRenderer,
    h3: HeadingRenderer,
    h4: HeadingRenderer,
    h5: HeadingRenderer,
    img: VideoOrImageRenderer,
    pre: ReactMarkdownLineHighlight,
    a: ReactMarkdownA,
  }

  return (
    <>
      <Header />
      <div className=" bg-white py-6 px-2 xs:px-4 sm:py-20">
        <Head
          title={`${frontmatter.title} - Pan-Media Blog`}
          description={frontmatter.excerpt}
          image={`https://blog.pantak.net${frontmatter.coverImage}`}
          url={`https://blog.pantak.net/posts/${
            locale === 'pl' ? 'pl/' : ''
          }${slug}`}
          imageAltText={`${frontmatter.title} post image`}
          siteName="Pan Media Blog"
        />

        <div className="m-auto flex min-h-screen w-full max-w-[920px] flex-col rounded-md bg-white md:w-3/4 lg:w-8/12">
          <h2 className="py-2 text-center text-xl font-bold text-primary xs:text-2xl  sm:text-3xl">
            {frontmatter.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 pb-2">
            <Button
              bgColor="#24292F"
              link={frontmatter.githubLink}
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
            <Button
              bgColor="#4285F4"
              link={frontmatter.liveLink}
              iconSvg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              }
            />
          </div>
          <div className="markdown-body line-numbers" key="uniqueKey">
            {mounted && (
              <LazyLoad height="200" once>
                <ReactMarkdown components={components}>{content}</ReactMarkdown>
              </LazyLoad>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('projects'))

  const paths = files.flatMap((filename) => [
    {
      params: { slug: filename.replace('.md', '') },
      locale: 'en-US',
    },
    {
      params: { slug: filename.replace('.pl.md', '').replace('.md', '') },
      locale: 'pl',
    },
  ])
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams
  const locale = context.locale as string
  const langPol = locale === 'pl'

  let markdownWithMeta = null
  try {
    markdownWithMeta = fs.readFileSync(
      path.join('projects', `${slug}${langPol ? '.pl' : ''}.md`),
      'utf-8'
    )
  } catch (e) {
    return {
      props: {
        slug,
        notFound: true,
        frontmatter: {
          title: 'Ta strona nie istnieje',
        },
      },
    }
  }

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
      ...(await serverSideTranslations(locale, ['header'])),
    },
  }
}

export default PostPage
