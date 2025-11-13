import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "components/features"),
      "@shared": path.resolve(__dirname, "components/shared"),
      "@components": path.resolve(__dirname, "components"),
      "@lib": path.resolve(__dirname, "lib"),
      "@hooks": path.resolve(__dirname, "hooks"),
      "@stores": path.resolve(__dirname, "store"),
      "@styles": path.resolve(__dirname, "styles"),
    },
  },

})
