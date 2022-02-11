import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import HeaderHamburger from './HeaderHamburger'

type NavItems = {
  name: string
  href: string
  type: string
}[]

const navItems: NavItems = [
  {
    name: 'Home',
    href: '/',
    type: 'link',
  },
  {
    name: 'About',
    href: '/about',
    type: 'link',
  },
  {
    name: 'Contact',
    href: '/contact',
    type: 'link',
  },
  {
    name: 'Portfolio',
    href: 'https://pantak.net',
    type: 'a',
  },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { asPath } = router
  const { t } = useTranslation('header')

  const mapNavItems = (items: NavItems): JSX.Element[] => {
    return items.map((item) => {
      if (item.type === 'link') {
        return (
          <Link href={item.href} key={item.name} passHref>
            <a
              href="replace"
              className="w-full cursor-pointer py-1 transition-all hover:text-gray-400 lg:w-auto lg:py-0 "
            >
              {t(item.name)}
            </a>
          </Link>
        )
      }
      return (
        <a
          className="w-full cursor-pointer py-1 transition-all hover:text-gray-400 lg:w-auto lg:py-0"
          href={item.href}
          key={item.name}
        >
          {t(item.name)}
        </a>
      )
    })
  }

  return (
    <>
      <div className="mobileNavbar flex h-11 w-full flex-wrap bg-[#111312] lg:hidden">
        <Link href="/" passHref>
          <a href="replace" className="relative flex h-full w-1/2 py-[2px]">
            <Image
              src="/logoDark.svg"
              alt="logo"
              width={156}
              height={40}
              className="cursor-pointer"
            />
          </a>
        </Link>
        <div className="flex w-1/2 items-center justify-items-end">
          <HeaderHamburger open={open} setOpen={setOpen} />
        </div>
        <div
          className={`${
            open ? 'max-h-[100vh] opacity-100' : 'invisible max-h-0 opacity-0'
          }  mobileMenu  transition-[max-height opacity] z-20 flex w-full flex-col items-start  justify-end divide-y bg-[#111312] px-10 py-4 text-lg font-extralight text-[#EEEEEE] duration-[150ms]`}
        >
          {mapNavItems(navItems)}
          {/* This button is used to push the page to the next language
          It is necessary to remove the elements from the DOM, because the PrismJS
          library woud throw an error if the elements are not removed
          Therefore it is necessary to refresh the whole page via Anchor tag
          So it checks what locale we have and then pushes the page to the next language
          Ternary operator checks if path is different than "/" because it needs to append pl to the path */}
          <a
            className="w-full pt-1"
            href={`${router.locale === 'en-US' ? '/pl' : ''}${
              asPath !== '/' ? asPath.replace(/^\/$/, '') : asPath
            }`}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${
                router.locale === 'en-US' ? 'pl' : 'en-US'
              }; expires=Fri, 31 Dec 9999 23:59:59 GMT`
            }}
          >
            {router.locale === 'en-US' ? '🇺🇸' : '🇵🇱'}
          </a>
        </div>
      </div>

      <div className="desktopNavbar hidden h-11 w-full place-content-around items-center bg-[#111312] px-4 lg:flex lg:px-20 ">
        <div className="flex w-full max-w-[1600px] items-center">
          <Link href="/" passHref>
            <a
              href="replace"
              className="relative  flex h-full  w-1/2 justify-items-start"
            >
              <Image
                src="/logoDark.svg"
                alt="logo"
                width={156}
                height={40}
                className="cursor-pointer"
              />
            </a>
          </Link>
          <div className="desktopMenu flex h-full w-1/2 items-center justify-end gap-8 text-sm font-extralight text-[#EEEEEE]">
            {mapNavItems(navItems)}
          </div>

          {/* This button is used to push the page to the next language
          It is necessary to remove the elements from the DOM, because the PrismJS
          library woud throw an error if the elements are not removed
          Therefore it is necessary to refresh the whole page via Anchor tag
          So it checks what locale we have and then pushes the page to the next language
          Ternary operator checks if path is different than "/" because it needs to append pl to the path */}
          <a
            className="pl-8 text-lg"
            href={`${router.locale === 'en-US' ? '/pl' : ''}${
              asPath !== '/' ? asPath.replace(/^\/$/, '') : asPath
            }`}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${
                router.locale === 'en-US' ? 'pl' : 'en-US'
              }; expires=Fri, 31 Dec 9999 23:59:59 GMT`
            }}
          >
            {router.locale === 'en-US' ? '🇺🇸' : '🇵🇱'}
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
