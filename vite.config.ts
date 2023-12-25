import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.FACTORY_CONTRACT": JSON.stringify(process.env.VITE_FACTORY_CONTRACT),
      "process.env.INFURA_KEY": JSON.stringify(process.env.VITE_INFURA_KEY),
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
