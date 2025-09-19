/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#FF9FDE',
          purple: '#D2AFE8',
          blue: '#79D0FC',
        },
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(289.93deg, #FF9FDE 8.23%, #D2AFE8 36.18%, #79D0FC 91.27%)',
      },
    },
  },
  plugins: [],
}
