import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Solanaの公式カラーを参考に定義
        "solana-green": "#9945FF",
        "solana-purple": "#14F195",
      },
      backgroundImage: {
        // グラデーションを定義
        "solana-gradient": "linear-gradient(to right, #9945FF, #14F195)",
      },
    },
  },
  plugins: [],
};
export default config;