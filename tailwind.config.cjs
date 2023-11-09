/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'Nimbus Sans L', 'Arimo', 'Liberation Sans', 'TeX Gyre Heros', 'FreeSans', 'sans-serif'],
        serif: ['Georgia', 'ui-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
        display: ['space-grotesk']
      },
      colors: {
        // Configure your color palette here
        noop: 'rgba(23, 142, 252, 1)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
