/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monda: ['"Monda"', 'sans-serif'],
        montez: ['"Montez"', 'cursive'],
        montserratSubrayada: ['"Montserrat Subrayada"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        tektur: ['"Tektur"', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      "light",     // Default theme
      "dark",      // Dark theme
      "cupcake",   // Additional themes
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    base: true,
    darkTheme: "black", // Define the dark theme here
  },
  plugins: [daisyui],
}
