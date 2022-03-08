<template>
  <main class="main">
    <VBackground name="crew" alt="earth"></VBackground>

    <p class="main__subheading">
      <span class="main__subheading__dark">02</span>&nbsp; Meet your crew
    </p>

    <Swiper
      class="main__gallery"
      @swiper="swiper = $event"
      @slide-change="currentPersonIdx = $event.activeIndex"
    >
      <SwiperSlide
        v-for="(person, key) in crew"
        :key="key"
        class="main__gallery__item"
      >
        <picture class="main__gallery__item__image__wrapper">
          <source :srcset="person.images.webp" type="image/webp" />
          <img
            :src="person.images.png"
            :aria-label="person.name"
            class="main__gallery__item__image"
            decoding="async"
          />
        </picture>
      </SwiperSlide>
    </Swiper>

    <hr class="main__hr" />

    <ul class="main__crew-selector">
      <li
        v-for="(person, key) in crew"
        :key="key"
        :class="{
          'main__crew-selector__item': true,
          'main__crew-selector__item--active':
            person.name === currentPerson.name,
        }"
        @click="currentPersonIdx = key"
      ></li>
    </ul>

    <Transition mode="out-in" name="fade">
      <p class="main__role d-50" :key="currentPersonIdx">
        {{ currentPerson.role }}
      </p>
    </Transition>

    <Transition mode="out-in" name="fade">
      <h1 class="main__name d-25" :key="currentPersonIdx">
        {{ currentPerson.name }}
      </h1>
    </Transition>

    <Transition mode="out-in" name="fade">
      <p class="main__bio d-50" :key="currentPersonIdx">
        {{ currentPerson.bio }}
      </p>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";

import { Swiper, SwiperSlide } from "swiper/vue";

import { crew } from "../assets/data.json";

import VBackground from "../components/V-Background.vue";

const route = useRoute();
const router = useRouter();
const swiper = ref();
const currentPersonIdx = ref(route.query.person || 0);

const currentPerson = computed(() => crew[currentPersonIdx.value]);

watch(currentPersonIdx, (val) => {
  router.replace({ path: "crew", query: { person: val } });
  swiper.value.slideTo(val);
});

onMounted(() => {
  swiper.value.slideTo(currentPersonIdx.value, 0);
});

useHead({
  title: computed(() => `${currentPerson.value.name} | Space tourism website`),
  description: computed(() => currentPerson.value.description),
  // preloading planets images
  link: crew.reduce(
    (acc, item) => [
      ...acc,
      { rel: "preload", as: "image", href: item.images.webp },
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

  padding: 4rem 1.5rem 1rem;
  background-color: #090f1b;

  &__subheading {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.9rem;
    letter-spacing: 2.7px;
    text-transform: uppercase;
    color: var(--c-white);

    margin-bottom: 0.85rem;

    &__dark {
      font-weight: 700;
      opacity: 0.25;
    }
  }

  &__gallery {
    width: 100%;

    &__item {
      margin-top: auto;

      &__image {
        display: block;

        width: 50%;
        height: auto;

        max-width: 100%;
        max-height: 100%;

        &__wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
      }
    }
  }

  &__hr {
    width: 100%;

    margin: 0 0 1.1rem;
    border-color: #383b4b;
  }

  &__crew-selector {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;
    margin: 0.75rem 0 0.75rem;
    list-style-type: none;

    &__item {
      --size: 0.6rem;

      width: var(--size);
      height: var(--size);

      border-radius: 50%;
      background-color: var(--c-white);

      margin: 0 0.4rem;

      opacity: 0.17;
      cursor: pointer;
      transition: opacity 300ms;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }

      &:is(:focus, :hover) {
        opacity: 0.5;
      }

      &--active {
        opacity: 1;
      }
    }
  }

  &__role {
    font-family: "Bellefair", serif;
    font-size: 0.9rem;
    text-align: center;
    text-transform: uppercase;

    color: var(--c-white);

    opacity: 0.5;
    margin-bottom: 0.5rem;
  }

  &__name {
    font-family: "Bellefair", serif;
    font-size: 1.3rem;
    text-transform: uppercase;

    margin: 0 0 1rem;
  }

  &__bio {
    font-family: "Barlow", sans-serif;
    font-size: 0.82rem;
    line-height: 1.67;
    color: var(--c-pink);

    margin-top: 0;
  }
}
</style>
