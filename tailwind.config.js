/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F4F4F', // Maroon green (Dark slate gray)
        secondary: '#87CEEB', // Light blue
      },
    },
  },
  plugins: [],
};