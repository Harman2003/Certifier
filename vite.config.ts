import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {
      FACTORY_CONTRACT: process.env.VITE_FACTORY_CONTRACT,
      INFURA_KEY: process.env.VITE_INFURA_KEY,
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
      svgr(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
