/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-black': '#323338',
        'light-grey': '#D0D4E4',
        'primary-color': '#6160FF',
        'dark-grey': '#656577',
        'background-color': '#ECEFF8',
        'grey-color': '#F6F7FB'
      }
    }
  },
  plugins: []
}
