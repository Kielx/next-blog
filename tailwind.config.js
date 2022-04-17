const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // used to safelist button component colors that will be purged without those
    'bg-[#24292F]',
    'hover:bg-[#24292F]/90',
    'focus:ring-[#24292F]',
    'focus:ring-offset-[#24292F]',
    'bg-[#4285F4]',
    'hover:bg-[#4285F4]/90',
    'focus:ring-[#4285F4]',
    'focus:ring-offset-[#4285F4]',
  ],
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#333333',
        navLink: '#f5f5f7',
        secondary: '#6e6e73',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 0.5,
          },
        },
        'fade-out': {
          '0%': {
            opacity: 0.5,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
