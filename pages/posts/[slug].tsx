import { useEffect } from 'react'
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'querystring'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'

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
}

const PostPage: NextPage<Props> = ({ frontmatter, content }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(Prism.highlightAll, 0)
    }
  }, [])
  return (
    <div className="p-12 bg-white">
      <div className="w-full flex flex-col p-16 max-w-[1200px] m-auto min-h-screen bg-white rounded-md">
        <h2 className="text-[#444444] font-bold text-4xl text-center">
          {frontmatter.title}
        </h2>
        <p className="pt-1 text-gray-300 text-center">{frontmatter.date}</p>
        <span className="">
          <ReactMarkdown>{content}</ReactMarkdown>
        </span>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', `${slug}.md`),
    'utf-8'
  )

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
