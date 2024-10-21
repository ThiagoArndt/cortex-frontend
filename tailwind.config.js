/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(25deg, #ECEFF8 35.22%, #FFF 90.68%)'
      },
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
