import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ToastContainer, Slide } from 'react-toastify'

import '@fontsource/poppins/900.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/200.css'
import '@fontsource/poppins/100.css'
import 'animate.css'

import '../styles/globals.css'
import '../styles/slug.css'
import 'react-toastify/dist/ReactToastify.css'
import ScrollTopButton from '../components/ScrollTopButton'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ToastContainer position="top-left" transition={Slide} />
    <ScrollTopButton />
    <Component {...pageProps} />
  </>
)

export default appWithTranslation(MyApp)
