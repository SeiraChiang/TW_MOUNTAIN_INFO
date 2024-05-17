import path from "path";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
// https://vitejs.dev/config/

const config = defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));
  return {
    // base: './',
    plugins: [
      vue(),
      visualizer({ open: false }),
      viteCompression({
        disable: !["sit", "uat", "prod"].includes(mode),
        filter: /\.(js|mjs|json|css|html)$/i,
        algorithm: "gzip",
        threshold: 1025,
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 消除warning
      },
    },
    build: {
      sourcemap: ["dev", "sit", "uat"].includes(mode),
      cssCodeSplit: true, // true
      chunkSizeWarningLimit: 10000, // 500
      reportCompressedSize: false, // true
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3001,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8080/ACQBAP",
          rewrite: (path) => path.replace(/^\/api/, ""),
          changeOrigin: true,
          cookiePathRewrite: {
            "/ACQBAP": "/",
          },
        },
      },
    },
  };
});

export default config;
