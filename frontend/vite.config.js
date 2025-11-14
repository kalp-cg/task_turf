import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true,        // Allows external access (important for ngrok)
    port: 5173,        // Specify a port for ngrok
    strictPort: true,  // Ensures Vite sticks to the specified port
    https: false       // Use true if needed for HTTPS
  }
})
