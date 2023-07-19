/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: '2rem'
    },
    fontFamily: {
      'serif': 'var(--font-archivo)'
    },
    extend: {
      aspectRatio: {
        'quarter': '4 / 3'
      },
      transitionProperty: {
        'slide-down': 'max-height, opacity, filter'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': {
          DEFAULT: '#2948ff',
          50: '#eaedff',
          100: '#d4daff',
          200: '#a9b6ff',
          300: '#7f91ff',
          400: '#546dff',
          500: '#213acc',
          600: '#192b99',
          700: '#101d66',
          800: '#080e33',
          900: '#02040d',
        },
      },
    },
  },
  plugins: [
    require('tailwind-clip-path'),
  ],
}
