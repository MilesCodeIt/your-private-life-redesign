module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{tsx,jsx}"
  ],

  theme: {
    extend: {}
  },

  plugins: [
    require("tailwind-dracula")()
  ]
};
