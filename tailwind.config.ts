import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient: `linear-gradient(
            0deg,
            rgba(7, 13, 56, 1) 0%,
            rgba(1, 2, 14, 1) 100%
          )`,
      },
    },
  },
  plugins: [],
};
export default config;
