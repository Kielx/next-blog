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
              className="hover:text-gray-400 cursor-pointer transition-all w-full lg:w-auto py-1 lg:py-0 "
            >
              {t(item.name)}
            </a>
          </Link>
        )
      }
      return (
        <a
          className="hover:text-gray-400 cursor-pointer transition-all w-full lg:w-auto py-1 lg:py-0"
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
      <div className="mobileNavbar lg:hidden w-full h-11 flex flex-wrap bg-[#2C2C2C]  ">
        <Link href="/" passHref>
          <a href="replace" className="h-full w-1/2  relative cursor-pointer">
            <Image
              src="/logoDark.svg"
              alt="logo"
              width={156}
              height={40}
              className="cursor-pointer"
            />
          </a>
        </Link>
        <div className="w-1/2 flex items-center justify-items-end">
          <HeaderHamburger open={open} setOpen={setOpen} />
        </div>
        <div
          className={`${
            open ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0 invisible'
          }  mobileMenu  transition-[max-height opacity] duration-[150ms] flex flex-col z-20 divide-y  w-full justify-end items-start px-10 py-4 text-lg font-thin text-[#EEEEEE] bg-[#2C2C2C]`}
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

      <div className="desktopNavbar px-4 lg:px-20 hidden w-full h-11 lg:flex bg-[#2C2C2C] items-center place-content-around ">
        <div className="w-full flex max-w-[1600px] items-center">
          <Link href="/" passHref>
            <a
              href="replace"
              className="h-full  w-1/2 relative  flex justify-items-start"
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
          <div className="desktopMenu h-full w-1/2 flex justify-end items-center gap-8 text-sm font-thin text-[#EEEEEE]">
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
