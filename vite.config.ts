import react from '@vitejs/plugin-react-swc'
import dns from 'dns'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  esbuild: {
    pure: ['console.log']
  }
})
