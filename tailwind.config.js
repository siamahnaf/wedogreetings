/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    }
  },
  plugins: [],
}

