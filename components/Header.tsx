import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
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

const navItemsPL: NavItems = [
  {
    name: 'Strona główna',
    href: '/',
    type: 'link',
  },
  {
    name: 'O mnie',
    href: '/about',
    type: 'link',
  },
  {
    name: 'Kontakt',
    href: '/contact',
    type: 'link',
  },
  {
    name: 'Portfolio',
    href: 'https://pantak.net',
    type: 'a',
  },
]

const mapNavItems = (items: NavItems): JSX.Element[] => {
  return items.map((item) => {
    if (item.type === 'link') {
      return (
        <Link href={item.href} key={item.name} passHref>
          <a
            href="replace"
            className="hover:text-gray-400 cursor-pointer transition-all w-full lg:w-auto py-1 lg:py-0 "
          >
            {item.name}
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
        {item.name}
      </a>
    )
  })
}

const Header = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { pathname, asPath, query } = router
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
          }  z-20 divide-y mobileMenu w-full justify-end items-start px-10 py-4 text-lg font-thin text-[#EEEEEE] bg-[#2C2C2C]`}
        >
          {router.locale === 'pl'
            ? mapNavItems(navItemsPL)
            : mapNavItems(navItems)}
          <button
            type="button"
            className="w-full text-left pt-2"
            onClick={() => {
              router.push({ pathname, query }, asPath, {
                locale: router.locale === 'en-US' ? 'pl' : 'en-US',
              })
            }}
          >
            {router.locale === 'en-US' ? '🇺🇸' : '🇵🇱'}
          </button>
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
            {router.locale === 'pl'
              ? mapNavItems(navItemsPL)
              : mapNavItems(navItems)}
          </div>

          <button
            type="button"
            className="pl-8 text-sm "
            onClick={() => {
              router.push({ pathname, query }, asPath, {
                locale: router.locale === 'en-US' ? 'pl' : 'en-US',
              })
            }}
          >
            {router.locale === 'en-US' ? '🇺🇸' : '🇵🇱'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
