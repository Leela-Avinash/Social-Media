/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx, html}"],
  theme: {
    extend: {
      colors: {
        deepBlue: "#0b3d91",
        navy: "#1a202c",
        deepPurple: "#4c1d95",
        darkMagenta: "#6b2e53",
        slateGray: "#2d3748",
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-out",
        "fade-in": "fadeIn 2s ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" }, // Starts from transparent
          "100%": { opacity: "1" }, // Fades to fully visible
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, e }) {
      addUtilities({
        // Custom gradient border utility
        ".border-gradient": {
          border: "4px solid transparent", // Use the same thickness defined in extend
          backgroundImage: "linear-gradient(to right, #1e40af, #3b82f6)", // Same gradient as above
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          transition: "background-size 0.3s ease", // Smooth transition effect
          backgroundSize: "0% 0%", // Initial state
          backgroundPosition: "0 100%", // Initial position
        },
        ".border-gradient-hover:hover": {
          backgroundSize: "100% 0%", // Expand gradient on hover
          backgroundPosition: "0 100%", // Hover position
        },
      });
    },
  ],
};
