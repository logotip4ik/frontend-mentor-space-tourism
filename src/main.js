import "swiper/css";
import "normalize.css/normalize.css";
import "./assets/styles/global.css";
import "./assets/styles/transitions.css";

import { ViteSSG } from "vite-ssg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import App from "./App.vue";
import pages from "virtual:generated-pages";

gsap.registerPlugin(ScrollTrigger);

export const createApp = ViteSSG(App, { routes: pages });
