export default {
  content: [
    "./app/_app.tsx",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "#002B5B",
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#ff7d52",
        secondary: "#FFD700",
        accent: "#D9D9D9",
        background: "#F8F9FA",
        black: "#343A40",
        text: "#343A40",
        "orange-100": "#fdf7ef",
      },
    },
  },
};
