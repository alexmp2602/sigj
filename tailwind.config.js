/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import tailwindScrollbarPlugin from "tailwind-scrollbar";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrollbar: {
          thumb: "#909090", // Neutral para modo claro
          thumbHover: "#707070",
          track: "#c0c0c0", // Gris oscuro para track en modo claro
          trackDark: "#151515", // Fondo oscuro en modo oscuro
          thumbDark: "#2a2a2a", // Pulgar en modo oscuro
          thumbHoverDark: "#444", // Pulgar hover en modo oscuro
        },
      },
    },
  },
  plugins: [
    tailwindScrollbarPlugin({ nocompatible: true }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-custom": {
          "::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#909090",
            borderRadius: "6px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#707070",
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "#c0c0c0",
            borderRadius: "6px",
            boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.1)",
          },
        },
        ".dark .scrollbar-custom": {
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#2a2a2a",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#444",
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "#151515",
          },
        },
      });
    }),
  ],
  daisyui: {
    themes: ["light", "dark", "corporate"],
  },
};

export default config;
