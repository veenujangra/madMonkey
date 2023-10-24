import { defineConfig } from 'vite'

export default defineConfig({
  devServer: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
})
