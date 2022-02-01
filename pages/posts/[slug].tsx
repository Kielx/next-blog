import { useEffect } from 'react'
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'querystring'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import NotFoundPL from '../../components/NotFoundPL'
import Head from '../../components/Head'
import HeadingRenderer from '../../components/ReactMarkdownHeadingRenderer'

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(Prism.highlightAll, 0)
    }
  }, [])

  if (notFound) {
    return <NotFoundPL slug={slug} />
  }

  const components = {
    h2: HeadingRenderer,
    h3: HeadingRenderer,
    h4: HeadingRenderer,
    h5: HeadingRenderer,
    h6: HeadingRenderer,
  }

  return (
    <div className="py-6 px-2 xs:px-4 sm:py-20 bg-white">
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

      <div className="w-full md:w-3/4 lg:w-8/12 flex flex-col max-w-[920px] m-auto min-h-screen bg-white rounded-md">
        <h2 className="text-[#444444] font-bold text-xl xs:text-2xl sm:text-3xl  text-center">
          {frontmatter.title}
        </h2>
        <p className="pt-1 pb-4 text-gray-300 text-center">
          {frontmatter.date}
        </p>
        <section className="markdown-body">
          <ReactMarkdown components={components}>{content}</ReactMarkdown>
        </section>
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
