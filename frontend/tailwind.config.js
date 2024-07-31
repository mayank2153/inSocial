/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shimmerAnimation: {
          '0%': {
            backgroundPosition: '-500px 0',
          },
          '100%': {
            backgroundPosition: '500px 0',
          },
        },
      },
      animation: {
        shimmerAnimation: 'shimmerAnimation 2s linear infinite',
      },
    },
  },
  plugins: [],
};
