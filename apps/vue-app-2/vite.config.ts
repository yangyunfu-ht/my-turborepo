import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { commonConfig } from '@repo/vite-config'

export default defineConfig(() =>
  mergeConfig(commonConfig(__dirname), {
    plugins: [vue()],
  }),
)
