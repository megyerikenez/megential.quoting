import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Expose the dev server on the local network (e.g. for iPhone testing).
  server: {
    host: true,
  },
})
