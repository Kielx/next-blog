import React from 'react'
import Link from 'next/link'

type Props = {
  innerLink?: boolean
  ariaLabel: string
  link: string
  bgColor: string
  iconSvg: React.SVGProps<SVGSVGElement>
  buttonText?: string | undefined
}

/**
 * Button component that renders button with icon and optional text. Renders a Next/Link if innerLink is true.
 * @param link - Link to render
 * @param ariaLabel - Aria label for button
 * @param iconSvg - Icon in svg format
 * @param bgColor - Background color of button
 * @param buttonText - Text to render
 * @param innerLink - True if button should render a Next/Link
 * @constructor Button component
 */
const Button = ({
  link,
  iconSvg,
  bgColor,
  buttonText,
  innerLink,
  ariaLabel,
}: Props) => {
  return innerLink ? (
    <Link href={link} passHref>
      <a
        aria-label={ariaLabel}
        href="replace"
        className={`z-[2] flex h-10 ${!buttonText && 'w-10'} items-center
        justify-center gap-2 rounded-lg bg-[${bgColor}] hover:bg-[${bgColor}]/90
        py-2 px-2 text-center text-base font-semibold text-white shadow-md
        transition duration-200 ease-in focus:outline-none focus:ring-1
        focus:ring-[${bgColor}] focus:ring-offset-[$ {bgColor}]
        focus:ring-offset-2`}
      >
        {iconSvg}
        {buttonText}
      </a>
    </Link>
  ) : (
    <a
      aria-label={ariaLabel}
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
  innerLink: false,
}

export default Button
