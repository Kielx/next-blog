import { useEffect } from 'react'
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'querystring'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import NotFoundPL from '../../components/NotFoundPL'

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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(Prism.highlightAll, 0)
    }
  }, [])

  if (notFound) {
    return <NotFoundPL slug={slug} />
  }
  return (
    <div className="py-6 px-2 xs:px-4 sm:pt-8 bg-white">
      <div className="w-full md:w-3/4 lg:w-8/12 flex flex-col max-w-[920px] m-auto min-h-screen bg-white rounded-md">
        <h2 className="text-[#444444] font-bold text-xl xs:text-2xl sm:text-3xl  text-center">
          {frontmatter.title}
        </h2>
        <p className="pt-1 pb-4 text-gray-300 text-center">
          {frontmatter.date}
        </p>
        <span className="text-md">
          <ReactMarkdown>{content}</ReactMarkdown>
        </span>
      </div>
    </div>
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
    },
  }
}

export default PostPage
