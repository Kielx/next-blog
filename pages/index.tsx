import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MainPost from '../components/MainPost'
import Post from '../components/Post'
import Head from '../components/Head'

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

const metaTags = {
  title: 'Pan-Media Blog Main Page',
  description:
    'Pan-Media provides insightful articles about programming with topics ranging from JavaScript and Frontend to C++ and Computer Science basics.',
  image: '/logoDark.svg',
  url: 'https://blog.pantak.net',
  imageAltText: 'Pan-Media Logo',
  siteName: 'Pan-Media Blog',
}

const metaTagsPL = {
  title: 'Pan-Media Blog Strona Główna',
  description:
    'Pan-Media dostarcza interesujące artykuły dotyczące programowania z tematami z zakresu JavaScript i Frontend aż po C++ i ogólną informatykę',
  image: '/logoDark.svg',
  url: 'https://blog.pantak.net',
  imageAltText: 'Logo Pan-Media',
  siteName: 'Pan-Media Blog',
}

const Home: NextPage<Props> = ({ posts }) => {
  const router = useRouter()
  const locale = router.locale as string
  return (
    <div className="font-body flex flex-wrap w-full ">
      <Head {...(locale === 'pl' ? metaTagsPL : metaTags)} />

      <div className="grid grid-cols-12 gap-6 w-full cardsContainer xs:px-8 px-4 md:px-0 py-8 md:py-12 max-w-[692px] xl:max-w-[980px] m-auto justify-center gap-y-10 box-border">
        {posts.map((post, index) =>
          index < 1 ? (
            <MainPost key={post.slug} slug={post.slug} {...post.frontmatter} />
          ) : (
            <Post key={post.slug} slug={post.slug} {...post.frontmatter} />
          )
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Get files from the posts directory
  const { locale } = context
  let files = fs.readdirSync(path.join('posts'))
  if (locale === 'pl') {
    files = files.filter((file) => file.endsWith('.pl.md'))
  } else {
    files = files.filter((file) => !file.endsWith('pl.md'))
  }

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.pl.md', '').replace('.md', '')

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

  posts.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    )
  })
  return {
    props: {
      posts,
    },
  }
}

export default Home
