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
    },
  },
  plugins: [],
};
