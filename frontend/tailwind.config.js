/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // 改為 class 模式
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}