/* eslint-disable @typescript-eslint/no-explicit-any */

const ReactMarkdownLineHighlight = (props: any) => {
  const { children, node } = props
  return (
    <pre {...props} data-line={node?.children[0]?.data?.meta || false}>
      {children}
    </pre>
  )
}

export default ReactMarkdownLineHighlight
