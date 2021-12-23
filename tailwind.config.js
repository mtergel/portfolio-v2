module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["Circular Std Book"],
      },
      transitionTimingFunction: {
        "nav-backdrop": "cubic-bezier(.83,0,.17,1)",
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
