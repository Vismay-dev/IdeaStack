module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        gold: "#f59e0b",
      },
      screens: {
        custombp: { raw: "(max-height: 540px)" },

        xs: "530px",
        xs2: "480px",
        xs3: "425px",
        xs4: "380px",
      },
    },
  },
};
