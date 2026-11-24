/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wonder: {
          purple: '#4B2DB8',
          deepNavy: '#14102A',
          inkNavy: '#221A5C',
          coral: '#FF6B4A',
          lavender: '#FAF7FE',
          darkBg: '#0D0924',
          darkCard: '#1A1438',
          darkBorder: '#2D235C',
          teal: '#2EC4B6',
          yellow: '#FFD23F',
          pink: '#FF9BD0',
          lime: '#C6F24E',
        }
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 50px rgba(75, 45, 184, 0.45)',
        'glow-coral': '0 0 50px rgba(255, 107, 74, 0.45)',
        'card-soft': '0 20px 50px rgba(20, 16, 42, 0.08)',
        'card-dark': '0 20px 50px rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        '24': '24px',
        '32': '32px',
        '40': '40px',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out -2.5s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
