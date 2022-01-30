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
      <link rel="icon" href="/favicon.ico" />
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
