import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MainPost from '../components/MainPost'
import Post from '../components/Post'
import Head from '../components/Head'
import Header from '../components/Header'
import Hero from '../components/Hero'

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
  title: 'Krzysztof Pantak Blog Main Page',
  description:
    'Blog provides insightful articles about programming with topics ranging from JavaScript and Frontend to C++ and Computer Science basics.',
  image: 'https://blog.pantak.net/logo.png',
  url: 'https://blog.pantak.net',
  imageAltText: 'Pantak Logo',
  siteName: 'Pantak Blog',
}

const metaTagsPL = {
  title: 'Krzysztof Pantak Blog Strona Główna',
  description:
    'Blog dostarcza interesujące artykuły dotyczące programowania z tematami z zakresu JavaScript i Frontend aż po C++ i ogólną informatykę',
  image: 'https://blog.pantak.net/logo.png',
  url: 'https://blog.pantak.net',
  imageAltText: 'Pantak Logo',
  siteName: 'Pantak Blog',
}

const Home: NextPage<Props> = ({ posts }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const locale = router.locale as string
  return (
    <>
      <Header />
      <Hero imageLink="/myPhoto.webp" />
      <div className="flex w-full flex-wrap font-body ">
        <Head {...(locale === 'pl' ? metaTagsPL : metaTags)} />

        <div className="cardsContainer m-auto box-border grid w-full max-w-[692px] grid-cols-12 justify-center gap-6 gap-y-10 px-4 py-8 xs:px-8 md:px-0 md:py-12 xl:max-w-[980px]">
          <h2 className="col-span-12 -mt-4 text-xl font-semibold text-[#2c2c2c]">
            {t('latestPosts')}
          </h2>
          {posts.map((post, index) =>
            index < 1 ? (
              <MainPost
                key={post.slug}
                slug={post.slug}
                {...post.frontmatter}
              />
            ) : (
              <Post key={post.slug} slug={post.slug} {...post.frontmatter} />
            )
          )}
        </div>
      </div>
    </>
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
      ...(await serverSideTranslations(locale, ['header', 'hero', 'common'])),
    },
  }
}

export default Home
