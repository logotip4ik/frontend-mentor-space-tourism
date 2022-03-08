import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import ViteSvgLoader from "vite-svg-loader";
import Vue from "@vitejs/plugin-vue";

import { breakpoints } from "./src/helpers/constants";

const breakpointsString = Object.entries(breakpoints).reduce(
  (str, [name, value]) =>
    str + `$breakpoint-${name.toLowerCase()}: ${value}px;`,
  ""
);

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [Vue(), Pages(), ViteSvgLoader()],
  ssgOptions: {
    script: "async",
    formatting: process.env.NODE_ENV === "production" ? "minify" : "prettify",
  },
  css: { preprocessorOptions: { scss: { additionalData: breakpointsString } } },
});
