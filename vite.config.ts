import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// markdown转换插件
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mdPlugin({
      mode: [Mode.HTML],
    }),
  ],
  // 开 gh-pages 需要这玩意儿
  base: "/toc-creator/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { open: true },
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "src/export.ts"),
  //     name: "TocCreator",
  //     fileName: (format) => `TocCreator.${format}.ts`,
  //   },
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖
  //     external: ["vue"],
  //     output: {
  //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //       globals: {
  //         vue: "Vue",
  //       },
  //     },
  //   },
  // },
});
