import React from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const HeaderHamburger: React.FC<Props> = ({ open, setOpen }) => {
  return (
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
  )
}

export default HeaderHamburger
