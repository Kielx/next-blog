import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

import Header from '../components/Header'
import Sending from '../components/Sending'
import SendIcon from '../public/icons/send.svg'

const Contact = () => {
  const router = useRouter()
  const { t } = useTranslation('contact')
  const [state, setState] = useState({})
  const [messageSending, setMessageSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement
    setState({ ...state, [target.name]: target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessageSending(true)
    const url = `/api/contact`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(state),
    })
    if (response.ok) {
      setMessageSending(false)
      router.push('/')
      toast.success(t('success'))
    } else {
      setMessageSending(false)
      toast.error(t('error'))
    }
  }

  return (
    <>
      <Header />

      <div className="h-[calc(100%-44px)] w-full flex-col items-center justify-center bg-black bg-[url('/images/contact-bg.webp')] bg-cover bg-no-repeat p-2 md:flex">
        <h1 className="py-8 text-center text-2xl font-bold tracking-widest text-white transition-all md:text-5xl 2xl:absolute 2xl:bottom-24 2xl:left-24">
          {messageSending ? t('sending') : t('h1')}
        </h1>
        {messageSending && <Sending />}
        <form
          name="contact"
          method="post"
          action="/contact-us"
          onSubmit={handleSubmit}
          className={`${
            messageSending && 'invisible'
          } row grid w-full max-w-lg auto-rows-auto grid-cols-2 gap-4 rounded-lg bg-white px-4 py-8 text-gray-800 shadow`}
        >
          <p hidden>
            <label htmlFor="bot">
              Don’t fill this out: <input name="bot" onChange={handleChange} />
            </label>
          </p>

          <label htmlFor="name" className="col-span-2 row-span-1 md:col-span-1">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t('name')}
              onChange={handleChange}
              className="w-full border-b border-b-gray-300 bg-white px-4 pt-3 text-base text-gray-700 placeholder-gray-400 transition-all  hover:border-b-black focus:border-b-black focus:outline-none"
            />
          </label>
          <label
            htmlFor="email"
            className="col-span-2 row-span-1 md:col-span-1"
          >
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('email')}
              onChange={handleChange}
              className="w-full border-b border-b-gray-300 bg-white px-4 pt-3 text-base text-gray-700 placeholder-gray-400 transition-all  hover:border-b-black focus:border-b-black focus:outline-none"
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
              className="w-full resize-none appearance-none rounded-sm border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm transition-all hover:ring-1 hover:ring-black focus:border-transparent focus:outline-none focus:ring-1 focus:ring-black"
            />
          </label>
          <button
            type="submit"
            className="col-span-2 row-span-1 flex w-full justify-center gap-2 rounded-lg  bg-black py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2  focus:ring-offset-gray-800"
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
