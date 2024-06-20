import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light:'#ffffff',
          dark:'#1a202c',
        },
        text:{
          light:'#1a202c',
          dark:'#ffffff'
        },
        'dark-bg':'#1a202c',
        "green":"#47B99B",
        "orange":"#FD884B",
        "yellow":"#FEBD37",
        "green-dark":"#3D646Ff",
        "blue":"#5EBEEA"
      }
    },
  },
  plugins: [],
};
export default config;
