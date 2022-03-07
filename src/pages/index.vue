<template>
  <main class="main">
    <picture>
      <source
        media="(max-width: 430px)"
        srcset="/home/background-home-mobile.jpg"
      />
      <source
        media="(max-width: 768px)"
        srcset="/home/background-home-tablet.jpg"
      />
      <img
        src="/home/background-home-desktop.jpg"
        alt="earth"
        class="main__background-image"
      />
    </picture>
    <!-- So, you want to travel to Space Let’s face it; if you want to go to space,
    you might as well genuinely go to outer space and not hover kind of on the
    edge of it. Well sit back, and relax because we’ll give you a truly out of
    this world experience! Explore -->
  </main>
</template>

<script setup>
import { useHead } from "@vueuse/head";

useHead({ title: "Home | Space tourism website" });
</script>

<style scoped lang="scss">
.main {
  position: relative;
  z-index: 0;

  height: 100%;

  background-color: var(--c-black);

  &__background-image {
    display: block;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center center;
  }
}
</style>
