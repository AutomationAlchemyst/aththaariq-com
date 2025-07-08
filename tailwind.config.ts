import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        display: ["Space Grotesk", ...fontFamily.sans],
      },
      colors: {
        'cyan-accent': '#22d3ee',
        'cyan-accent-dark': '#16a3b8',
        'rose-accent': '#f43f5e',
        'rose-accent-dark': '#be123c',
      },
    },
  },
  // Add the typography plugin here
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
