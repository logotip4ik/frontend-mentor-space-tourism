<template>
  <main class="main">
    <VBackground name="technology" alt="night sky"></VBackground>

    <p class="main__subheading">
      <span class="main__subheading__dark">03</span>&nbsp; Space launch 101
    </p>

    <Swiper
      class="main__gallery"
      @swiper="swiper = $event"
      @slide-change="currentTechIdx = $event.activeIndex"
    >
      <SwiperSlide
        v-for="(tech, key) in technology"
        :key="key"
        class="main__gallery__item"
      >
        <picture class="main__gallery__item__image__wrapper">
          <source media="(max-width: 768px)" :srcset="tech.images.landscape" />
          <img
            :src="tech.images.portrait"
            :aria-label="tech.name"
            class="main__gallery__item__image"
            decoding="async"
            alt="night sky"
          />
        </picture>
      </SwiperSlide>
    </Swiper>

    <ul class="main__tech-selector">
      <li
        v-for="(tech, key) in technology"
        :key="key"
        :class="{
          'main__tech-selector__item': true,
          'main__tech-selector__item--active': tech.name === currentTech.name,
        }"
        @click="currentTechIdx = key"
      >
        {{ `${key + 1}` }}
      </li>
    </ul>

    <p class="main__terminology">The terminology...</p>

    <Transition mode="out-in" name="fade">
      <h1 class="main__name" :key="currentTechIdx">
        {{ currentTech.name }}
      </h1>
    </Transition>

    <Transition mode="out-in" name="fade">
      <p class="main__description d-25" :key="currentTechIdx">
        {{ currentTech.description }}
      </p>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

import { Swiper, SwiperSlide } from "swiper/vue";

import { technology } from "../assets/data.json";

import VBackground from "../components/V-Background.vue";

const route = useRoute();
const router = useRouter();

const swiper = ref();
const currentTechIdx = ref(route.query.tech || 0);

const currentTech = computed(() => technology[currentTechIdx.value]);

watch(currentTechIdx, (val) => {
  router.replace({ path: "technology", query: { tech: val } });
  swiper.value.slideTo(val);
});

onMounted(() => {
  swiper.value.slideTo(currentTechIdx.value, 0);
});

useHead({
  title: computed(() => `${currentTech.value.name} | Space tourism website`),
  description: computed(() => currentTech.value.description),
  link: technology.reduce(
    (acc, item) => [
      ...acc,
      { rel: "preload", as: "image", href: item.images.portrait },
      { rel: "preload", as: "image", href: item.images.landscape },
    ],
    []
  ),
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

  padding: 4rem 0 1rem;
  background-color: #090f1b;

  &__subheading {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.9rem;
    letter-spacing: 2.7px;
    text-transform: uppercase;
    text-align: center;
    color: var(--c-white);

    width: 100%;

    margin-bottom: 1.75rem;

    &__dark {
      font-weight: 700;
      opacity: 0.25;
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      font-size: 1.1rem;
      text-align: left;
      letter-spacing: 3.5px;

      padding: 0 2.125rem;
      margin-top: 0.5rem;
      margin-bottom: 3.5rem;
    }
  }

  &__gallery {
    width: 100%;
    margin: 0;

    &__item {
      &__image {
        display: block;

        width: 101%;
        height: auto;
      }
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      margin-bottom: 1.4rem;
    }
  }

  &__tech-selector {
    --spacing: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;
    margin: var(--spacing) 0 var(--spacing);
    list-style-type: none;

    &__item {
      --size: 2.25rem;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;
      z-index: 0;

      font-family: "Bellefair", serif;
      font-size: 0.9rem;
      text-align: center;

      width: var(--size);
      height: var(--size);

      margin: 0 0.45rem;

      cursor: pointer;
      transition: color 300ms;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }

      &::after {
        content: "";

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;

        opacity: 0.25;
        background-color: transparent;
        border: 1px solid var(--c-white);
        border-radius: 50%;

        transition: opacity 300ms, background-color 300ms;
      }

      &:is(:focus, :hover)::after {
        opacity: 1;
      }

      &--active {
        color: var(--c-black);
        &::after {
          opacity: 1;
          background-color: var(--c-white);
        }
      }

      @supports (aspect-ratio: 1/1) {
        height: unset;
        aspect-ratio: 1/1;
      }

      @media screen and (min-width: #{$breakpoint-tablet}) {
        --size: 3.3rem;

        font-size: 1.125rem;
      }
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      margin-bottom: 2.45rem;
    }
  }

  &__terminology {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.8rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2.4px;

    color: var(--c-pink);

    margin: 0 0 0.75rem;

    @media screen and (min-width: #{$breakpoint-tablet}) {
      font-size: 0.9rem;
      letter-spacing: 2.7px;
    }
  }

  &__name {
    font-family: "Bellefair", serif;
    font-size: 1.3rem;
    text-transform: uppercase;

    margin: 0 0 1rem;

    @media screen and (min-width: #{$breakpoint-tablet}) {
      font-size: 2.2rem;

      margin-top: 0.2rem;
      margin-bottom: 0.9rem;
    }
  }

  &__description {
    font-family: "Barlow", sans-serif;
    font-size: 0.82rem;
    line-height: 1.67;
    color: var(--c-pink);

    margin: 0;
    padding: 0 1rem;

    @media screen and (min-width: #{$breakpoint-tablet}) {
      font-size: 0.89rem;
      line-height: 1.75;

      max-width: 62%;
    }
  }

  @media screen and (min-width: #{$breakpoint-tablet}) {
    padding: 7rem 0 5.5rem;
  }
}
</style>
