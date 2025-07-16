const plugin = require('daisyui');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        secondary: '#fef2f2',
        accent: '#991b1b',
        textMain: '#1f2937',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [plugin],
  daisyui: {
    themes: [
      {
        rokthona: {
          primary: "#dc2626",
          secondary: "#fef2f2",
          accent: "#991b1b",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          info: "#93c5fd",
          success: "#16a34a",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
    ],
  },
};
