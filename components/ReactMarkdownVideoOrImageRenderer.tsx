/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @next/next/no-img-element */
const ReactMarkdownVideoOrImageRenderer = (props: any) => {
  const { src } = props
  return src.match(/#postVideo/) ? (
    <video
      {...props}
      playsInline
      autoPlay
      muted
      loop
      className="m-auto max-h-[500px] w-full max-w-[500px] rounded-md"
    />
  ) : (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} />
  )
}

export default ReactMarkdownVideoOrImageRenderer
