import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import Header from '../components/Header'

const Contact = () => {
  const { t } = useTranslation('contact')
  const [state, setState] = useState({})

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement
    setState({ ...state, [target.name]: target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = `/api/contact`
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(state),
    })
  }

  return (
    <>
      <Header />
      <h1>{t('h1')}</h1>
      <form
        name="contact"
        method="post"
        action="/contact-us"
        onSubmit={handleSubmit}
      >
        <p hidden>
          <label htmlFor="bot">
            Don’t fill this out: <input name="bot" onChange={handleChange} />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Your Email Address
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="E-Mail address"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="message">
          Message
          <textarea
            id="message"
            name="message"
            required
            placeholder="Your message"
            rows={3}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['contact'])),
  },
})

export default Contact
