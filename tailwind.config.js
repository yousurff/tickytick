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
          50: '#FBF9F6',
          100: '#EEEBE1', // Ana Arkaplan
          200: '#DDDACC', // İkincil
          300: '#D2CFC2', // Çizgiler/Kenarlar
          400: '#C0BBB0', // Koyu Vurgular
          900: '#2C2C2C', // Metin Rengi
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}