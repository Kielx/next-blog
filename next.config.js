/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    imageSizes: [],
    deviceSizes: [
      16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920,
      2048, 3840,
    ],
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
