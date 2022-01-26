import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MainPost from '../components/MainPost'

type Props = {
  posts: {
    slug: string
    frontmatter: {
      title: string
      date: string
      excerpt: string
      coverImage: string
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

    <div className="grid grid-cols-12 cardsContainer py-32 w-[980px] gap-x-[2rem] m-auto justify-center gap-y-10 box-border">
      {posts.map((post, index) =>
        index < 1 ? (
          <MainPost slug={post.slug} {...post.frontmatter} />
        ) : (
          <div
            className="col-span-6 bg-white rounded-xl shadow-sm cursor-pointer relative"
            key={post.slug}
          >
            <div className="flex w-full h-64 overflow-hidden rounded-t-xl">
              <div className="w-full relative cardImageContainer">
                <Image
                  src={post.frontmatter.coverImage}
                  alt={post.frontmatter.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="overlay" />
              </div>
            </div>

            <div className="bg-white shadow-none rounded-xl p-8 pb-10 flex flex-col">
              <h3 className="text-2xl font-extrabold indent-2">
                {post.frontmatter.title}
              </h3>

              <p className="text-gray-500 text-lg  pt-4">
                {post.frontmatter.excerpt}
              </p>
              <p className="text-gray-500 text-sm absolute right-6 bottom-4">
                {post.frontmatter.date}
              </p>
            </div>
          </div>
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
