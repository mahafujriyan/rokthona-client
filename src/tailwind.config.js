import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        secondary: '#fef2f2',
        accent: '#991b1b',
        neutral: '#1f2937',
        textMain: '#111827',
        gradientStart: '#f87171',
        gradientMid: '#b91c1c',
        gradientEnd: '#450a0a',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
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
