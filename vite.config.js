import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build'
    },
    plugins: [react()],
    server: {
      port: 8301,
      allowedHosts: [
        '.ngrok.io',
        '.ngrok-free.app',
        '23ecbe6ee5ef.ngrok-free.app',
        '.apps-tunnel.nextplus.app'
      ]
    }
  }
})
