import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

const Home: NextPage<Props> = ({ posts }: Props) => (
  <div className="w-[90%] bg-white my-10 m-auto rounded-xl px-40 py-20">
    <Head>
      <title>Chris Pantak Blog</title>
      <meta name="description" content="Chris Pantak tech blog" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="flex flex-wrap gap-x-32 justify-center">
      {posts.map((post, index) =>
        index < 1 ? (
          <div className="w-full flex gap-12 pb-28" key={post.slug}>
            <div className="w-1/2 h-[20rem] relative ">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                layout="fill"
                objectFit="cover"
                objectPosition="80% 50%"
                className="rounded-xl"
              />
            </div>

            <div className="bg-white shadow-none rounded-lg p-8 w-1/2">
              <h3 className="text-5xl tracking-widest font-extrabold">
                {post.frontmatter.title}
              </h3>
              <p className="text-gray-700 text-sm">{post.frontmatter.date}</p>
              <p className="text-gray-700 text-sm">
                {post.frontmatter.excerpt}
              </p>
              <a className="text-blue-500" href={`/posts/${post.slug}`}>
                Read more
              </a>
            </div>
          </div>
        ) : (
          <div key={post.slug} className="w-80 h-80">
            <div className="w-full h-full relative ">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <h3>{post.frontmatter.title}</h3>
            <p>{post.frontmatter.date}</p>
            <p>{post.frontmatter.excerpt}</p>
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
