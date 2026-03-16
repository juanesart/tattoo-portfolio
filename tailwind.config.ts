import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        surface: "#16161C",

        primary: "#A855F7",
        primaryLight: "#C084FC",
        primaryDark: "#7E22CE",
      },
    },
  },
  plugins: [],
}

export default config