import "normalize.css/normalize.css";
import "./assets/styles/global.css";
import "./assets/styles/transitions.css";

import { ViteSSG } from "vite-ssg";

import App from "./App.vue";
import pages from "virtual:generated-pages";

export const createApp = ViteSSG(App, { routes: pages });
