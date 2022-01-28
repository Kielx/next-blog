import React from 'react'
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'querystring'
import Link from 'next/link'
import MainPost from '../../components/MainPost'

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

const PostPage: NextPage<Props> = ({ frontmatter, slug, content }) => (
  <div>
    {slug}
    <Link href="/" passHref>
      Go back
    </Link>
    <MainPost slug={slug} {...frontmatter} />
    <div className="w-full max-w-[980px] m-auto min-h-screen bg-white rounded-lg shadow-sm border border-opacity-5 border-black">
      {content}
    </div>
  </div>
)

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
