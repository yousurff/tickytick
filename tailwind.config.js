/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF9F6',  // En açık
          100: '#EEEBE1', // Ana Arkaplan (Senin verdiğin kod)
          200: '#DDDACC', // İkincil (Senin verdiğin kod)
          300: '#D2CFC2', // Üçüncül (Senin verdiğin kod)
          400: '#C0BBB0', // Koyu (Senin verdiğin kod)
          900: '#2C2C2C', // Metin Rengi (Okunabilirlik için koyu gri)
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Varsayılan font yaptık
      }
    },
  },
  plugins: [],
}