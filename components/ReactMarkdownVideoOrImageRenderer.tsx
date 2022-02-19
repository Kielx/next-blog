/* eslint-disable @typescript-eslint/no-explicit-any */
import LazyLoad from 'react-lazyload'

/* eslint-disable @next/next/no-img-element */
const ReactMarkdownVideoOrImageRenderer = (props: any) => {
  const { src } = props
  return src.match(/#postVideo/) ? (
    <LazyLoad height="200">
      <video
        {...props}
        playsInline
        autoPlay
        muted
        loop
        className="m-auto max-h-[500px] w-full max-w-[500px] rounded-md"
      />
    </LazyLoad>
  ) : (
    <LazyLoad height="200">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...props} />
    </LazyLoad>
  )
}

export default ReactMarkdownVideoOrImageRenderer
