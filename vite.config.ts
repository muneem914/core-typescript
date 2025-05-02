import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // This puts Monaco Editor in its own bundle
          'monaco-editor': ['monaco-editor'],
        }
      }
    }
  },
  optimizeDeps: {
    // Add Monaco to the list of dependencies to pre-bundle
    include: ['monaco-editor']
  }
});