<template>
  <main class="main">
    <picture>
      <source
        media="(max-width: 430px)"
        srcset="/destination/background-destination-mobile.jpg"
      />
      <source
        media="(max-width: 768px)"
        srcset="/destination/background-destination-tablet.jpg"
      />
      <img
        ref="backgroundImage"
        src="/destination/background-destination-desktop.jpg"
        alt="night sky"
        class="main__background-image"
      />
    </picture>

    <p class="main__subheading">
      <span class="main__subheading__dark">01</span>&nbsp; Pick your destination
    </p>

    <Transition mode="out-in" name="fade">
      <picture :key="currentDestinationIdx">
        <source :srcset="destination.images.webp" type="image/webp" />
        <img
          :src="destination.images.png"
          :aria-label="destination.name"
          class="main__planet-image"
          decoding="async"
        />
      </picture>
    </Transition>

    <ul class="main__planet-selector">
      <li
        v-for="(planet, key) in destinations"
        :key="planet.name"
        :class="{
          'main__planet-selector__item': true,
          'main__planet-selector__item--active':
            destination.name === planet.name,
        }"
        @click="currentDestinationIdx = key"
      >
        {{ planet.name }}
      </li>
    </ul>

    <Transition mode="out-in" name="fade">
      <h1 class="main__heading d-25" :key="currentDestinationIdx">
        {{ destination.name }}
      </h1>
    </Transition>

    <Transition mode="out-in" name="fade">
      <p class="main__description d-50" :key="currentDestinationIdx">
        {{ destination.description }}
      </p>
    </Transition>

    <hr class="main__hr" />

    <ul class="main__info-list">
      <Transition mode="out-in" name="fade">
        <li class="main__info-list__item d-75" :key="currentDestinationIdx">
          <p class="main__info-list__item__heading">Avg. distance</p>
          <p class="main__info-list__item__info">{{ destination.distance }}</p>
        </li>
      </Transition>
      <Transition mode="out-in" name="fade">
        <li class="main__info-list__item d-100" :key="currentDestinationIdx">
          <p class="main__info-list__item__heading">Est. travel time</p>
          <p class="main__info-list__item__info">{{ destination.travel }}</p>
        </li>
      </Transition>
    </ul>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import { gsap } from "gsap";

import { destinations } from "../assets/data.json";

const route = useRoute();
const router = useRouter();
const backgroundImage = ref(null);
const currentDestinationIdx = ref(route.query.planet || 0);

const destination = computed(() => destinations[currentDestinationIdx.value]);

watch(currentDestinationIdx, (val) =>
  router.replace({ path: "destination", query: { planet: val } })
);

onMounted(() => {
  gsap.fromTo(
    backgroundImage.value,
    { y: -25 },
    {
      y: 25,
      ease: "none",
      scrollTrigger: { start: "top top", end: "max bottom", scrub: true },
    }
  );
});

const viewport = ["mobile", "tablet", "desktop"];
useHead({
  title: computed(() => `${destination.value.name} | Space tourism website`),
  description: computed(() => destination.value.description),
  link: [
    // preloading background image
    ...viewport.reduce(
      (acc, size) => [
        ...acc,
        {
          rel: "preload",
          as: "image",
          href: `/destination/background-destination-${size}.jpg`,
        },
      ],
      []
    ),
    // preloading planets images
    ...destinations.reduce(
      (acc, item) => [
        ...acc,
        { rel: "preload", as: "image", href: item.images.webp },
      ],
      []
    ),
  ],
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  position: relative;
  z-index: 0;

  min-height: 100%;

  text-align: center;
  color: var(--c-white);

  padding: 4rem 1.55rem 1rem;
  background-color: #090f1b;

  &__background-image {
    --max-y-offset: 25px;

    display: block;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  &__subheading {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.9rem;
    letter-spacing: 2.7px;
    text-transform: uppercase;
    color: var(--c-white);

    margin-bottom: 1.8rem;

    &__dark {
      font-weight: 700;
      opacity: 0.25;
    }
  }

  &__planet-image {
    --size: 170px;
    display: block;

    width: 100%;
    height: 100vh;

    max-width: var(--size);
    max-height: var(--size);

    margin-bottom: 0.5rem;
  }

  &__planet-selector {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;
    margin-bottom: 2rem;
    list-style-type: none;

    &__item {
      position: relative;

      font-family: "Barlow Condensed", sans-serif;
      font-size: 0.75rem;
      letter-spacing: 2.3px;
      text-transform: uppercase;
      line-height: 1;

      margin: 0 0.75rem;

      cursor: pointer;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }

      &::after {
        --y-offset: 0.5rem;
        content: "";

        position: absolute;
        top: calc(100% + var(--y-offset));
        left: 0;

        width: 100%;
        height: 3px;

        opacity: 0;
        pointer-events: none;
        background-color: var(--c-white);

        transition: opacity 300ms;
      }

      &:is(:focus, :hover)::after {
        opacity: 0.5;
      }

      &--active::after {
        opacity: 1;
      }
    }
  }

  &__heading {
    text-transform: uppercase;
    font-family: "Bellefair", serif;
    font-size: 3.1rem;

    margin: 0;
  }

  &__description {
    font-family: "Barlow", sans-serif;
    font-size: 0.82rem;
    line-height: 1.67;
    color: var(--c-pink);

    margin-top: 0;
    margin-bottom: 1.25rem;
  }

  &__hr {
    width: 100%;

    margin-bottom: 1rem;
    border-color: #383b4b;
  }

  &__info-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    padding: 0;
    margin: 0;
    list-style-type: none;

    &__item {
      margin-bottom: 1rem;

      &__heading {
        font-family: "Barlow Condensed", sans-serif;
        font-size: 0.77rem;
        text-align: center;
        letter-spacing: 2.4px;
        text-transform: uppercase;
      }

      &__info {
        font-family: "Bellefair", serif;
        font-size: 1.5rem;
        text-align: center;
        text-transform: uppercase;

        margin: 0;
      }
    }
  }
}
</style>