import NextHead from 'next/head'

type Props = {
  title: string
  description: string
  image: string
  url: string
  imageAltText: string
  siteName: string
}

const Head = ({
  title,
  description,
  image,
  url,
  imageAltText,
  siteName,
}: Props) => {
  return (
    <NextHead>
      <title>{title}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={description} key="description" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      {/*  Essential META Tags */}
      <meta property="og:title" content={title} key="title" />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      {/*  Non-Essential, But Recommended */}
      <meta property="og:description" key="description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:image:alt" content={imageAltText} />
      {/*  Non-Essential, But Required for Analytics 
      <meta property="fb:app_id" content="your_app_id" />
      <meta name="twitter:site" content="@website-username" />
      */}
    </NextHead>
  )
}

export default Head
