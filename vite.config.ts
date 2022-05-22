import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import mix, { vercelAdapter } from "vite-plugin-mix";

export default defineConfig({
  plugins: [
    mix({
      handler:  resolve(__dirname, "src/api/index.ts"),
      adapter: vercelAdapter()
    }),
    
    solidPlugin()
  ],
  
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
   },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
