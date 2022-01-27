import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/400.css'
import 'animate.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
