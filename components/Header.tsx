import Image from 'next/image'
import { useState } from 'react'
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

const mappedNavItems: JSX.Element[] = navItems.map((item) => {
  if (item.type === 'link') {
    return (
      <Link href={item.href} key={item.name} passHref>
        <div className="hover:text-gray-400 cursor-pointer transition-all">
          {item.name}
        </div>
      </Link>
    )
  }
  return (
    <a
      className="hover:text-gray-400 cursor-pointer transition-all"
      href={item.href}
      key={item.name}
    >
      {item.name}
    </a>
  )
})

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mobileNavbar md:hidden w-full h-16 flex flex-wrap bg-[#2C2C2C] py-2  ">
        <Link href="/" passHref>
          <div className="h-full w-1/2  relative cursor-pointer">
            <Image src="/logoDark.svg" alt="logo" layout="fill" />
          </div>
        </Link>
        <div className="w-1/2 flex items-center justify-items-end">
          <HeaderHamburger open={open} setOpen={setOpen} />
        </div>
        <div
          className={`${
            open ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0 invisible'
          }  z-20 mobileMenu w-full justify-end items-center gap-2 py-4 text-lg font-bold text-[#EEEEEE] bg-[#2C2C2C]`}
        >
          {mappedNavItems}
        </div>
      </div>

      <div className="desktopNavbar px-20 hidden w-full h-24 md:flex bg-[#2C2C2C] py-4 items-center place-content-around ">
        <div className="w-full flex max-w-[1600px] items-center">
          <Link href="/" passHref>
            <div className="h-full  w-1/2 relative  flex justify-items-start">
              <Image
                src="/logoDark.svg"
                alt="logo"
                width={250}
                height={60}
                className="cursor-pointer"
              />
            </div>
          </Link>
          <div className="desktopMenu h-full w-1/2 flex justify-end items-center gap-8 text-lg font-bold text-[#EEEEEE]">
            {mappedNavItems}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
