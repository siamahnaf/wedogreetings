/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-custom-datepicker-tailwind/dist/esm/index.js",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "0px",
        xs: "360px",
        sm: "480px",
        msm: "540px",
        lsm: "640px",
        md: "720px",
        lg: "960px",
        "lg-max": "992px",
        xl: "1140px",
        "2xl": "1320px",
        "3xl": "1536px",
        "4xl": "1920px"
      },
      boxShadow: {
        "3xl": "0px 1px 8px rgba(197, 198, 201, 0.4)"
      },
      colors: {
        "c-novel": "#999999",
        "c-deep-sky": "#0AC2FF",
        "c-light-slate": "#8980F5",
        "c-hollywood": "#F4009D",
        "c-neon": "#FFA033",
        "c-sorbus": "#EC6A32",
        "c-gainsboro": "#D9D9D9",
        "c-white-smoke": "#F2F2F2"
      },
      fontFamily: {
        sans: ['var(--font-poppins)']
      }
    }
  },
  plugins: [],
})

