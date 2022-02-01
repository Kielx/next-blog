import React from 'react'

const flatten = (text: string, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
const HeadingRenderer = ({ children, level }) => {
  const childrenArray = React.Children.toArray(children)
  const text = children.reduce(flatten, '')
  const slug = text
    .toLowerCase()
    .replace(/[+?,]/g, '')
    .replace(/[^A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, '-')

  return React.createElement(`h${level}`, { id: slug }, childrenArray)
}

export default HeadingRenderer
