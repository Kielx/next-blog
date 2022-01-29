/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loremflickr.com'],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'pl'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
}

module.exports = nextConfig
