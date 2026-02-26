import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? `/${(process.env.GITHUB_REPOSITORY || 'user/Portfolio').split('/')[1]}/`
    : '/',
  plugins: [
    tailwindcss(),
  ],
})
