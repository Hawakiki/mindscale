import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 프로젝트 경로(/<repo>/)에서도 동작하도록 상대 경로로 빌드
export default defineConfig({
  base: './',
  plugins: [react()],
})
