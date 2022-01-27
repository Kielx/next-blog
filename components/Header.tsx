import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="w-full h-24 flex bg-[#2C2C2C] pb-4  ">
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
  )
}

export default Header
