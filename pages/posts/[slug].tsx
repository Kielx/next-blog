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
          <h2 className="text-center text-xl font-bold text-[#2c2c2c] xs:text-2xl  sm:text-3xl">
            {frontmatter.title}
          </h2>
          <p className="pt-1 pb-4 text-center text-gray-300">
            {frontmatter.date}
          </p>
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
  const files = fs.readdirSync(path.join('posts'))

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
      path.join('posts', `${slug}${langPol ? '.pl' : ''}.md`),
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
