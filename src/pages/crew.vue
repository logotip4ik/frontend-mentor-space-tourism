<template>
  <main class="main">
    <picture>
      <source
        media="(max-width: 430px)"
        srcset="/crew/background-crew-mobile.jpg"
      />
      <source
        media="(max-width: 768px)"
        srcset="/crew/background-crew-tablet.jpg"
      />
      <img
        ref="backgroundImage"
        src="/crew/background-crew-desktop.jpg"
        alt="night sky"
        class="main__background-image"
      />
    </picture>

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
import { gsap } from "gsap";

import { Swiper, SwiperSlide } from "swiper/vue";

import { crew } from "../assets/data.json";

const route = useRoute();
const router = useRouter();
const swiper = ref();
const backgroundImage = ref(null);
const currentPersonIdx = ref(route.query.person || 0);

const currentPerson = computed(() => crew[currentPersonIdx.value]);

watch(currentPersonIdx, (val) => {
  router.replace({ path: "crew", query: { person: val } });
  swiper.value.slideTo(val);
});

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

  swiper.value.slideTo(currentPersonIdx.value, 0);
});

const viewport = ["mobile", "tablet", "desktop"];
useHead({
  title: computed(() => `${currentPerson.value.name} | Space tourism website`),
  description: computed(() => currentPerson.value.description),
  link: [
    // preloading background image
    ...viewport.reduce(
      (acc, size) => [
        ...acc,
        {
          rel: "preload",
          as: "image",
          href: `/crew/background-crew-${size}.jpg`,
        },
      ],
      []
    ),
    // preloading planets images
    ...crew.reduce(
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

  padding: 4rem 1.5rem 1rem;
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

    margin-bottom: 0.85rem;

    &__dark {
      font-weight: 700;
      opacity: 0.25;
    }
  }

  &__crew-image {
    --size: 50.5%;

    display: block;

    width: 100%;
    height: auto;

    max-width: var(--size);

    margin: 0;

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: flex-end;
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
