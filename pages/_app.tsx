import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ToastContainer, Slide } from 'react-toastify'

import '@fontsource/montserrat/900.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/100.css'
import 'animate.css'

import '../styles/globals.css'
import '../styles/slug.css'
import 'react-toastify/dist/ReactToastify.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ToastContainer position="top-left" transition={Slide} />
    <Component {...pageProps} />
  </>
)

export default appWithTranslation(MyApp)
