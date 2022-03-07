import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import ViteSvgLoader from "vite-svg-loader";
import Vue from "@vitejs/plugin-vue";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [Vue(), Pages(), ViteSvgLoader()],
  ssgOptions: {
    script: "async",
    formatting: process.env.NODE_ENV === "production" ? "minify" : "prettify",
  },
});
