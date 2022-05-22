import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import mix_raw, { vercelAdapter } from "vite-plugin-mix";

const mix = mix_raw as typeof mix_raw & { default: typeof mix_raw };

export default defineConfig({
  plugins: [
    mix.default({
      handler:  resolve(__dirname, "src/api/index.ts"),
      adapter: vercelAdapter()
    }),
    
    solidPlugin()
  ],
  
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
     rollupOptions: {
       output: {
         format: "es"
       }
     }
   },


  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
