/* eslint-disable @typescript-eslint/no-explicit-any */

const ReactMarkdownA = (props: any) => {
  const { href, children } = props
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

export default ReactMarkdownA
