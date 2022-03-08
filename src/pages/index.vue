<template>
  <main class="main">
    <picture>
      <source
        :media="`(min-width: ${breakpoints.DESKTOP}px)`"
        srcset="/home/background-home-desktop.jpg"
      />
      <source
        :media="`(min-width: ${breakpoints.TABLET}px)`"
        srcset="/home/background-home-tablet.jpg"
      />
      <img
        ref="backgroundImage"
        src="/home/background-home-mobile.jpg"
        alt="earth"
        decoding="async"
        class="main__background-image"
      />
    </picture>

    <div class="main__content">
      <p class="main__content__subheading">So, you want to travel to</p>
      <h1 class="main__content__heading">Space</h1>
      <p class="main__content__info">
        Let’s face it; if you want to go to space, you might as well genuinely
        go to outer space and not hover kind of on the edge of it. Well sit
        back, and relax because we’ll give you a truly out of this world
        experience!
      </p>

      <RouterLink class="main__content__action" to="/destination">
        <span class="main__content__action__text">Explore</span>
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";
import { gsap } from "gsap";

import { breakpoints } from "../helpers/constants";

const backgroundImage = ref(null);

onMounted(() => {
  gsap.to(backgroundImage.value, {
    y: 50,
    scrollTrigger: { scrub: true, start: "top top", end: "max bottom" },
  });
});

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

  &__content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;

    min-height: 100%;

    color: white;
    text-align: center;

    padding: 0 1.55rem 3rem;

    &__subheading {
      font-family: "Barlow Condensed", sans-serif;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2.7px;

      margin-bottom: 1.5rem;
    }

    &__heading {
      font-size: 4.25rem;

      text-transform: uppercase;
      margin: 0 0 0.25rem;
    }

    &__info {
      font-family: "Barlow", sans-serif;

      color: var(--c-pink);
      font-size: 0.84rem;
      line-height: 1.65;

      margin-bottom: 4.5rem;
    }

    &__action {
      --size: 150px;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      font-family: "Bellefair", serif;
      font-size: 1.125rem;
      letter-spacing: 1.25px;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--c-black);

      appearance: none;
      border: none;
      border-radius: 50%;

      width: 100%;
      height: 100vh;

      max-width: var(--size);
      max-height: var(--size);

      background-color: var(--c-white);
    }
  }
}
</style>
