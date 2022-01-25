import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Props = {
  posts: {
    slug: string,
    frontmatter: {
      title: string,
      date: string,
      excerpt: string,
      coverImage: string,
    },
  }[]
}

const Home: NextPage<Props> = ({posts} : Props) => (
    <div>
      <Head>
        <title>Chris Pantak Blog</title>
        <meta name="description" content="Chris Pantak tech blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="bg-red-500 text-bold text-gray-100">Hello</h2>

      <div className="flex flex-wrap">
      {posts.map(post => (
        <div key={post.slug}>
          <Image src={post.frontmatter.coverImage} width={200} height={200} alt="blog mini"/>
          <h3>{post.frontmatter.title}</h3>
          <p>{post.frontmatter.date}</p>
          <p>{post.frontmatter.excerpt}</p>
        </div>
      ))}
      </div>
      

    </div>)

export const getStaticProps: GetStaticProps = async () => {
    // Get files from the posts directory
    const files = fs.readdirSync(path.join('posts'));

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

      return (
        {
          props: {
            posts
          }
        }
      )
}

export default Home
