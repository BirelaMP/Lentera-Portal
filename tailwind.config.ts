import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Lentera palette — available as e.g. text-cs-primary, bg-cs-pink
      colors: {
        cs: {
          bg: "#FCFBFF",
          bgDark: "#0B0F19",
          primary: "#8B5CF6",
          primaryDeep: "#7C3AED",
          primaryHover: "#6D28D9",
          primarySoft: "#EDE9FE",
          pink: "#F472B6",
          pinkSoft: "#FCE7F3",
          blue: "#38BDF8",
          blueDeep: "#0284C7",
          blueSoft: "#E0F2FE",
          green: "#34D399",
          greenDeep: "#10B981",
          greenSoft: "#DCFCE7",
          yellow: "#FDE68A",
          yellowDeep: "#D97706",
          yellowSoft: "#FEF9C3",
          text: "#1E1B4B",
          textSoft: "#6B7280",
          cardBg: "rgba(255, 255, 255, 0.8)",
          cardBorder: "rgba(255, 255, 255, 0.9)",
          glass: "rgba(255, 255, 255, 0.72)",
        },
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
