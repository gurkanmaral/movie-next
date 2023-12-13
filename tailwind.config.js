/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    fontFamily: {
      'heavitas': ['Heavitas', 'sans'],
      'thebold': ['The Bold Font', 'sans'],
      'graphikThin': ['GraphikThin', 'sans-serif'],
      'graphikRegular': ['GraphikRegular', 'sans-serif'],
      'graphikBold': ['GraphikBold', 'sans-serif'],
    },
    colors: {
      "dark-1": "#000000",
      "dark-2": "#121417",
      "dark-3": "#101012",
      "dark-4": "#1F1F22",
    },
  },
  plugins: [require("tailwindcss-animate")],
}