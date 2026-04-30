/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CC0000',
        accent: '#FF2222',
        dark: '#0A0A0A',
        surface: '#1A1A1A',
        'surface-light': '#242424',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
