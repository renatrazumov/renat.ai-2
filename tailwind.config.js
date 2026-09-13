/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        renat: {
          bg: '#0B0F17',
          accent: '#00FFB2',
        },
      },
      keyframes: {
        'brain-pulse': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glitch1: {
          '0%, 100%': { transform: 'none' },
          '41%': { transform: 'translate(-5px, -5px)' },
          '42%': { transform: 'translate(5px, 5px)', filter: 'hue-rotate(90deg)' },
          '43%': { transform: 'none', filter: 'none' },
          '45%': { transform: 'none', opacity: '1', filter: 'none' },
          '46%': { transform: 'none', opacity: '0', filter: 'hue-rotate(-90deg)' },
          '48%': { transform: 'none', opacity: '1', filter: 'none' },
        },
        glitch2: {
          '0%, 100%': { transform: 'none' },
          '41%': { transform: 'translate(5px, 5px)' },
          '42%': { transform: 'translate(-5px, -5px)', filter: 'hue-rotate(-90deg)' },
          '43%': { transform: 'none', filter: 'none' },
          '45%': { transform: 'none', opacity: '1', filter: 'none' },
          '46%': { transform: 'none', opacity: '0', filter: 'hue-rotate(90deg)' },
          '48%': { transform: 'none', opacity: '1', filter: 'none' },
        },
        glitch3: {
          '0%, 100%': { transform: 'none', opacity: '0' },
          '40%': { transform: 'none', opacity: '0' },
          '41%': { transform: 'translateY(3px)', opacity: '0.75' },
          '42%': { transform: 'translateY(-3px)', opacity: '0.5', filter: 'hue-rotate(180deg)' },
          '43%': { transform: 'none', opacity: '0' },
        },
        'sacred-fade': {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.15' },
        },
        'space-move': {
          '0%': { transform: 'translateZ(0) scale(1)' },
          '100%': { transform: 'translate3d(50px, 30px, 100px) scale(1.1)' },
        },
      },
      animation: {
        'brain-pulse': 'brain-pulse 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        glitch1: 'glitch1 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glitch2: 'glitch2 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glitch3: 'glitch3 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sacred-fade': 'sacred-fade 8s ease-in-out infinite',
        'space-move': 'space-move 20s linear infinite',
      },
    },
  },
  plugins: [],
};
