/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0D151A',
        'blue-gray': '#46718A',
        'cream': '#F0EAE1',
        'beige': '#EEE1CB',
        'gray-text': '#C5C9CC',
        'gold': '#E9BD72',
        'card-bg': '#F8F5F0',
      },
      fontFamily: {
        'eagle': ['Eagle Lake', 'cursive'],
        'calligraphy': ['Lucida Calligraphy', 'Lucida Unicode Calligraphy', 'cursive'],
        'noto': ['Noto Sans', 'sans-serif'],
        'serif': ['Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'logo': '28px',
        'title': '42px',
        'card-title': '20px',
        'breadcrumb': '14px',
      },
      spacing: {
        'header': '64px',
        'card': '400px',
        'card-width': '320px',
      },
      boxShadow: {
        'card': '0px 4px 16px rgba(0,0,0,0.25)',
        'card-hover': '0px 6px 20px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}