import React from 'react'

type Props = {
  link: string
  bgColor: string
  iconSvg: React.SVGProps<SVGSVGElement>
  buttonText?: string | undefined
}

const Button = ({ link, iconSvg, bgColor, buttonText }: Props) => {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={link}
      type="button"
      className={`z-[2] flex h-10 ${
        !buttonText && 'w-10'
      } items-center  justify-center gap-2 rounded-lg bg-[${bgColor}] hover:bg-[${bgColor}]/90 py-2 px-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in focus:outline-none focus:ring-1  focus:ring-[${bgColor}] focus:ring-offset-2 focus:ring-offset-[${bgColor}]`}
    >
      {iconSvg}
      {buttonText}
    </a>
  )
}

Button.defaultProps = {
  buttonText: '',
}

export default Button
