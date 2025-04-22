import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  // server:{
  //       fs: { strict: true },
  //       // Pas de fallback automatique
  //       middlewareMode: 'html', // ou 'ssr' si tu utilises SSR
  // },
  plugins: [
    tailwindcss(),
  ],
})

