/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      "box-background": "var(--color-box-background)",
      background: "var(--color-background)",
      border: "var(--color-border)",
      main: {
        DEFAULT: "#72675a",
        50: "#f4f4f2",
        100: "#e4e2dd",
        200: "#cbc7bd",
        300: "#ada797",
        400: "#968c79",
        500: "#877c6b",
        600: "#72675a",
        700: "#5d544b",
        800: "#514842",
        900: "#47403c",
        950: "#282320",
      },
      black: "rgb(0 0 0)",
      white: "#fefefe",
      gray: colors.gray,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      orange: colors.orange,
      purple: colors.purple,
    },
    extend: {
      backgroundImage: {
        "help-police": "url('./images/police.png')",
        "help-fire": "url('./images/fire.png')",
        "help-star": "url('./images/star.png')",
        "help-support": "url('./images/support.png')",
      },
    },
  },
  plugins: [],
};
