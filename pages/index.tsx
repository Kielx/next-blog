import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MainPost from '../components/MainPost'
import Post from '../components/Post'

type Props = {
  posts: {
    slug: string
    frontmatter: {
      title: string
      date: string
      excerpt: string
      coverImage: string
      keywords: string[]
    }
  }[]
}

const Home: NextPage<Props> = ({ posts }) => (
  <div className="font-body flex flex-wrap w-full">
    <Head>
      <title>Chris Pantak Blog</title>
      <meta name="description" content="Chris Pantak tech blog" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="grid grid-cols-12 gap-3 w-full cardsContainer sm:px-6 px-2 py-4 md:py-8 max-w-screen-xl m-auto justify-center gap-y-10 box-border">
      {posts.map((post, index) =>
        index < 1 ? (
          <MainPost key={post.slug} slug={post.slug} {...post.frontmatter} />
        ) : (
          <Post
            index={index}
            key={post.slug}
            slug={post.slug}
            {...post.frontmatter}
          />
        )
      )}
    </div>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  // Get files from the posts directory
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts,
    },
  }
}

export default Home
