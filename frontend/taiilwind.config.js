// frontend/taiilwind.config.js

module.exports = {
  content: [
    './src/**/*.{ts,html}',
    './src/components/**/*.{ts}',
    './index.html',
  ],
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'bg-white',
    'dark:bg-gray-900',
    'dark:bg-gray-950',
    'text-white',
    'text-black',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        accent: '#f59e0b',
        danger: '#ef4444',
        background: '#f3f4f6',
        darkbg: '#1e293b',
      },
      borderRadius: {
        layout: '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        layout: '1.5rem',
      },
    },
  },
};
