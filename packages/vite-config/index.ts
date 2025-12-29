import { type UserConfig } from 'vite'
import { resolve } from 'node:path'

export const commonConfig = (cwd: string): UserConfig => ({
  resolve: {
    alias: {
      '@': resolve(cwd, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
})
