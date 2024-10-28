/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito', 'serif']
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(25deg, #ECEFF8 35.22%, #FFF 90.68%)'
      },
      colors: {
        'dark-black': '#323338',
        'light-grey': '#D0D4E4',
        'primary-color': '#6160FF',
        'dark-grey': '#656577',
        'background-color': '#ECEFF8',
        'grey-color': '#F6F7FB',
        grey: '#F0F0F1',
        'green-color': '#00c875',
        'yellow-color': '#FDBC64',
        'red-color': '#E8697D'
      }
    }
  },
  plugins: []
}
