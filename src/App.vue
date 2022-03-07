<template>
  <VNavbar></VNavbar>
  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      :css="false"
      @enter="showContent"
      @leave="hideContent"
    >
      <component :is="Component" />
    </transition>
  </router-view>
  <div ref="overlay" class="overlay">
    <LogoSVG class="overlay__img" aria-label="website logo" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";

import VNavbar from "./components/V-Navbar.vue";
import LogoSVG from "./assets/img/logo.svg";

const overlay = ref(null);

function hideContent(_, onComplete) {
  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete });

  tl.fromTo(
    overlay.value,
    { clipPath: "inset(0% 50% 0% 0%)", xPercent: -50 },
    { clipPath: "inset(0% 0% 0% 0%)", xPercent: 0 }
  );
  tl.fromTo(overlay.value.children, { opacity: 0 }, { opacity: 1 }, 0.125);
}

function showContent(_, onComplete) {
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    delay: 0.2,
    onComplete,
  });

  tl.to(".overlay svg", { opacity: 0 });
  tl.to(".overlay", { clipPath: "inset(0% 0% 0% 50%)", xPercent: 50 }, 0.125);
}
</script>

<style lang="scss">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;

  background-color: var(--c-black);

  clip-path: inset(0% 50% 0% 0%);
  transform: translateX(-50%);

  &__img {
    --size: 3rem;

    width: 100%;
    height: 100%;

    max-width: var(--size);
    max-height: var(--size);
  }
}
</style>
