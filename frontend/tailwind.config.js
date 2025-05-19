/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-pink': '#ff00ff',
        'neon-purple': '#bf00ff',
        'neon-green': '#00ff66',
        'cyber-black': '#0a0a0f',
        'cyber-dark': '#131321',
        'cyber-gray': '#1c1c2e',
        'cyber-light': '#2a2a47',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f3ff, 0 0 10px #00f3ff, 0 0 15px #00f3ff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
        'neon-green': '0 0 5px #00ff66, 0 0 10px #00ff66, 0 0 15px #00ff66',
        'neon-purple': '0 0 5px #bf00ff, 0 0 10px #bf00ff, 0 0 15px #bf00ff',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
          '100%': { boxShadow: '0 0 10px #00f3ff, 0 0 20px #00f3ff, 0 0 30px #00f3ff' },
        }
      },
    },
  },
  plugins: [],
};