import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import SendIcon from '../public/icons/send.svg'

const Contact = () => {
  const router = useRouter()
  const { t } = useTranslation('contact')
  const [state, setState] = useState({})

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement
    setState({ ...state, [target.name]: target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = `/api/contact`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(state),
    })
    if (response.ok) {
      router.push('/')
      toast.success(t('success'))
    } else {
      toast.error(t('error'))
    }
  }

  return (
    <>
      <Header />
      <div className="p-2 bg-black bg-[url('/images/contact-bg.webp')] bg-no-repeat bg-cover w-full h-[calc(100%-44px)] flex-col md:flex items-center justify-center">
        <h1 className="py-8 2xl:absolute 2xl:bottom-24 2xl:left-24 text-center text-2xl text-white md:text-5xl font-bold tracking-widest">
          {t('h1')}
        </h1>
        <form
          name="contact"
          method="post"
          action="/contact-us"
          onSubmit={handleSubmit}
          className="w-full max-w-lg grid grid-cols-2 auto-rows-auto row rounded-lg shadow bg-white text-gray-800 gap-4 px-4 py-8 "
        >
          <p hidden>
            <label htmlFor="bot">
              Don’t fill this out: <input name="bot" onChange={handleChange} />
            </label>
          </p>

          <label htmlFor="name" className="col-span-2 md:col-span-1 row-span-1">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t('name')}
              onChange={handleChange}
              className="border-b border-b-gray-300 w-full pt-3 px-4 bg-white text-gray-700 placeholder-gray-400  text-base focus:outline-none focus:border-b-black transition-colors"
            />
          </label>
          <label
            htmlFor="email"
            className="col-span-2 md:col-span-1 row-span-1"
          >
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('email')}
              onChange={handleChange}
              className="border-b border-b-gray-300 w-full pt-3 px-4 bg-white text-gray-700 placeholder-gray-400  text-base focus:outline-none focus:border-b-black transition-colors"
            />
          </label>
          <label htmlFor="message" className="col-span-2 row-span-2">
            <textarea
              id="message"
              name="message"
              required
              placeholder={t('message')}
              rows={5}
              onChange={handleChange}
              className="resize-none rounded-sm border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
            />
          </label>
          <button
            type="submit"
            className="col-span-2 row-span-1 py-2 px-4 flex justify-center gap-2  bg-black hover:bg-gray-800 focus:ring-gray-800 focus:ring-offset-gray-800 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          >
            {t('send')}
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'contact'])),
  },
})

export default Contact
