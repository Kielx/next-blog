import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Size, PostCard } from '../components/PostCard'
import Head from '../components/Head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'

type Props = {
  postsCardsList: {
    slug: string
    frontmatter: {
      placeholder: string
      title: string
      date: string
      excerpt: string
      coverImage: string
      keywords: string[]
    }
  }[]
  projectsCardsList: {
    slug: string
    frontmatter: {
      placeholder: string
      title: string
      liveLink: string
      githubLink: string
      date: string
      excerpt: string
      coverImage: string
      techUsed: string[]
      ribbonIcon: string
      ribbonColor: string
      writeup: boolean
      displayCardImageContain: boolean
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

const Home: NextPage<Props> = ({ postsCardsList, projectsCardsList }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const locale = router.locale as string
  return (
    <>
      <Header />
      <Hero />
      <div className="flex w-full flex-col flex-wrap font-body ">
        <Head {...(locale === 'pl' ? metaTagsPL : metaTags)} />

        <div className="cardsContainer m-auto box-border grid w-full max-w-[692px] grid-cols-12 justify-center gap-6 gap-y-4 px-4 py-8 xs:px-8 md:gap-y-10 md:px-0 md:py-12 xl:max-w-[980px]">
          <h2 className="col-span-12 mb-8 text-xl font-semibold text-primary md:mb-4 md:-mt-4">
            {t('latestPosts')}
          </h2>
          {postsCardsList.map((post, index) => {
            if (index < 1) {
              return (
                <PostCard
                  size={Size.large}
                  key={post.slug}
                  slug={post.slug}
                  {...post.frontmatter}
                />
              )
            }
            if (index < 3) {
              return (
                <PostCard
                  size={Size.medium}
                  key={post.slug}
                  slug={post.slug}
                  {...post.frontmatter}
                />
              )
            }
            if (index < 6) {
              return (
                <PostCard
                  size={Size.small}
                  key={post.slug}
                  slug={post.slug}
                  {...post.frontmatter}
                />
              )
            }
            return null
          })}
        </div>

        <div className="cardsContainer m-auto box-border grid w-full max-w-[692px] grid-cols-12 justify-center gap-6 gap-y-10 px-4 py-8 xs:px-8 md:px-0 md:py-12 xl:max-w-[980px]">
          <h2 className="col-span-12 -mt-4 text-xl font-semibold text-primary">
            {t('projects')}
          </h2>
          {projectsCardsList.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              {...project.frontmatter}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context

  const createCardsList = (cardItemsFolderName: string) => {
    // Get files from the posts directory

    let files = fs.readdirSync(path.join(cardItemsFolderName))
    if (locale === 'pl') {
      files = files.filter((file) => file.endsWith('.pl.md'))
    } else {
      files = files.filter((file) => !file.endsWith('pl.md'))
    }

    // Get slug and frontmatter from posts
    const cards = files.map((filename) => {
      // Create slug
      const slug = filename.replace('.pl.md', '').replace('.md', '')

      // Get frontmatter
      const markdownWithMeta = fs.readFileSync(
        path.join(cardItemsFolderName, filename),
        'utf-8'
      )

      const { data: frontmatter } = matter(markdownWithMeta)
      return {
        slug,
        frontmatter,
      }
    })

    cards.sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      )
    })

    return cards
  }

  let postsCardsList = createCardsList('posts')
  let projectsCardsList = createCardsList('projects')

  // Map cards with blur image placeholders
  projectsCardsList = await Promise.all(
    projectsCardsList.map(async (project) => {
      return {
        ...project,
        frontmatter: {
          ...project.frontmatter,
          placeholder:
            project.frontmatter.placeholder !== false &&
            (await getPlaiceholder(project.frontmatter.coverImage)).base64,
        },
      }
    })
  )

  postsCardsList = await Promise.all(
    postsCardsList.map(async (project) => {
      return {
        ...project,
        frontmatter: {
          ...project.frontmatter,
          placeholder:
            project.frontmatter.placeholder !== false &&
            (await getPlaiceholder(project.frontmatter.coverImage)).base64,
        },
      }
    })
  )

  return {
    props: {
      postsCardsList,
      projectsCardsList,
      ...(await serverSideTranslations(locale, ['header', 'hero', 'common'])),
    },
  }
}

export default Home
