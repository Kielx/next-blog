import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/100.css'
import 'animate.css'

import '../styles/header.css'
import '../styles/globals.css'
import '../styles/slug.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)
