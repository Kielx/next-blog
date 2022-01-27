import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="md:hidden w-full h-24 flex flex-wrap bg-[#2C2C2C] py-4  ">
        <Link href="/" passHref>
          <div className="h-full w-1/2 relative cursor-pointer">
            <Image src="/logoDark.svg" alt="logo" layout="fill" />
          </div>
        </Link>
        <div className="w-1/2 flex items-center justify-items-end">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="hamburger ml-auto text-right cursor-pointer font-bold text-white text-2xl pr-6"
          >
            <div id="nav-icon1" className={`${open ? 'open' : ''}`}>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
        <div
          className={`${
            open ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0 invisible'
          }  z-20 mobileMenu w-full justify-end items-center gap-2 py-4 text-lg font-bold text-[#EEEEEE] bg-[#2C2C2C]`}
        >
          <Link href="/" passHref>
            <div className="hover:text-gray-400 cursor-pointer transition-all">
              Home
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className="hover:text-gray-400 cursor-pointer transition-all">
              About
            </div>
          </Link>
          <Link href="/contact" passHref>
            <div className="hover:text-gray-400 cursor-pointer transition-all">
              Contact
            </div>
          </Link>
          <a
            className="hover:text-gray-400 cursor-pointer transition-all"
            href="https://pantak.net"
          >
            Portfolio
          </a>
        </div>
      </div>

      <div className="hidden w-full h-24 md:flex bg-[#2C2C2C] py-4  ">
        <Link href="/" passHref>
          <div className="h-full w-1/3 relative cursor-pointer">
            <Image src="/logoDark.svg" alt="logo" layout="fill" />
          </div>
        </Link>
        <div className="h-full w-1/2 flex justify-end items-center gap-8 text-lg font-bold text-[#EEEEEE]">
          <Link href="/" passHref>
            <div className="hover:text-gray-400 cursor-pointer transition-all">
              Home
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className="hover:text-gray-400 cursor-pointer transition-all">
              About
            </div>
          </Link>
          <Link href="/contact" passHref>
            <div className="hover:text-gray-400 cursor-pointer transition-all">
              Contact
            </div>
          </Link>
          <a
            className="hover:text-gray-400 cursor-pointer transition-all"
            href="https://pantak.net"
          >
            Portfolio
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
