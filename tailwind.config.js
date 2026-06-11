/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#0D0D0D',
        paper:  '#F5F3EE',
        mid:    '#E8E4DC',
        muted:  '#9A9489',
        city:   '#1A3A6B',
        land:   '#1D6B4A',
        danger: '#B53A2F',
        warn:   '#C47A1A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono:  ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: { DEFAULT: '2px', sm: '2px', md: '2px', lg: '2px', xl: '4px' },
    },
  },
  plugins: [],
}