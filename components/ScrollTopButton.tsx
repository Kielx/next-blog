import React, { useState, useEffect } from 'react'
// To use this component a fade-in and fade-out extended animation must be added to tailwind.config.js

const ScrollTopButton = () => {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true)
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`${
        showScroll
          ? 'flex animate-fade-in opacity-50 hover:opacity-80'
          : 'pointer-events-none flex animate-fade-out opacity-0 hover:opacity-0'
      } fixed bottom-2 right-2 z-[150] h-10 w-10 cursor-pointer items-center  transition-opacity md:bottom-7 md:right-7`}
      onClick={scrollTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
        />
      </svg>
    </button>
  )
}

export default ScrollTopButton
