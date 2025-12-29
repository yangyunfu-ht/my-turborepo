import { defineConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { commonConfig } from '@repo/vite-config'

export default defineConfig(() =>
  mergeConfig(commonConfig(__dirname), {
    plugins: [react()],
    // 这里可以覆盖或添加 React 特有的配置
  }),
)
