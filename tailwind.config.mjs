/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070A12',
          900: '#0B1220',
          800: '#111B2E',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
