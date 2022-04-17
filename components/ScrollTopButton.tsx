import React, { useState, useEffect } from 'react'
// To use this component a fade-in and fade-out extended animation must be added to tailwind.config.js

const ScrollTopButton = () => {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
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
    <div
      className={`${
        showScroll
          ? 'flex animate-fade-in opacity-50'
          : 'pointer-events-none flex animate-fade-out opacity-0'
      } fixed bottom-5 right-5 z-[150] h-5 w-5  cursor-pointer items-center transition-opacity hover:opacity-100`}
      onClick={scrollTop}
    >
      TOP
    </div>
  )
}

export default ScrollTopButton
