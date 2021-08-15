// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from "less-vars-to-js";
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import vitePluginImp from "vite-plugin-imp";
import { ViteAliases } from "vite-aliases";
import reactJsx from "vite-react-jsx";
import path, { resolve } from "path";
import fs from "fs";

const pathResolver = (path: string) => resolve(__dirname, path);

const themeVariables = lessToJS(
  fs.readFileSync(pathResolver("./config/variables.less"), "utf8")
);

export default defineConfig({
  plugins: [
    ViteAliases({}),
    reactJsx(),
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
});
