/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const flatten: any = (text: string, child: any) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
const HeadingRenderer = ({ children, level }: any) => {
  const childrenArray = React.Children.toArray(children)
  const text = children.reduce(flatten, '')
  const slug = text
    .toLowerCase()
    .replace(/[+?,]/g, '')
    .replace(/[^A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, '-')

  return React.createElement(`h${level}`, { id: slug }, childrenArray)
}

export default HeadingRenderer
