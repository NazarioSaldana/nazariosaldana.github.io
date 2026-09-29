import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so the build works at a domain root (username.github.io)
  // or under a sub-path (username.github.io/portfolio-website) without changes.
  base: './',
})
