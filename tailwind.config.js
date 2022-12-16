module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        150: "600px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
