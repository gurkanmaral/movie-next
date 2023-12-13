import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },

    },
  },

};

export default config;