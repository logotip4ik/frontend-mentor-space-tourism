<template>
  <main class="main">
    <VBackground name="crew" alt="earth"></VBackground>

    <p class="main__subheading">
      <span class="main__subheading__dark">02</span>&nbsp; Meet your crew
    </p>

    <Swiper
      class="main__gallery"
      :initial-slide="currentPersonIdx"
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

    <div class="main__content">
      <ul class="main__content__crew-selector">
        <li
          v-for="(person, key) in crew"
          :key="key"
          :class="{
            'main__content__crew-selector__item': true,
            'main__content__crew-selector__item--active':
              person.name === currentPerson.name,
          }"
          @click="currentPersonIdx = key"
        ></li>
      </ul>
      <Transition mode="out-in" name="fade">
        <p class="main__content__role d-50" :key="currentPersonIdx">
          {{ currentPerson.role }}
        </p>
      </Transition>
      <Transition mode="out-in" name="fade">
        <h1 class="main__content__name d-25" :key="currentPersonIdx">
          {{ currentPerson.name }}
        </h1>
      </Transition>
      <Transition mode="out-in" name="fade">
        <p class="main__content__bio d-50" :key="currentPersonIdx">
          {{ currentPerson.bio }}
        </p>
      </Transition>
    </div>
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
const currentPersonIdx = ref(
  !isNaN(route.query.person) &&
    route.query.person < crew.length &&
    route.query.person > 0
    ? Number(route.query.person)
    : 0
);

const currentPerson = computed(() => crew[currentPersonIdx.value]);

watch(currentPersonIdx, (val) => {
  router.replace({ path: "crew", query: { person: val } });
  swiper.value.slideTo(val);
});

onMounted(() => (swiper.value.$wrapperEl[0].style.alignItems = "flex-end"));

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
  display: grid;
  grid-template-rows: repeat(3, min-content);
  justify-items: center;
  align-items: flex-start;

  position: relative;
  z-index: 0;

  min-height: 100%;

  text-align: center;
  color: var(--c-white);

  padding: 4.9rem 1.5rem 1rem;
  background-color: #090f1b;

  &__subheading {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.9rem;
    letter-spacing: 2.7px;
    text-transform: uppercase;
    color: var(--c-white);

    margin: 0;

    &__dark {
      font-weight: 700;
      opacity: 0.25;
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      justify-self: start;

      font-size: 1.1rem;
      text-align: left;
      letter-spacing: 3.5px;

      margin-top: 0.5rem;
      margin-bottom: 2.2rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      grid-row: 1;
      grid-column: span 2;

      font-size: 1.73rem;

      margin: 0;
      padding-top: 0.125rem;
    }
  }

  &__gallery {
    width: 100%;

    padding-top: 1rem;

    &__item {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-grow: 1;

      height: max-content;

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

          height: 100%;
        }

        @media screen and (min-width: #{$breakpoint-tablet}) {
          width: 100%;
          max-width: 80%;
        }

        @media screen and (min-width: #{$breakpoint-desktop}) {
          max-width: 600px;
        }
      }
    }

    &::after {
      content: "";

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;

      height: 1px;

      background-color: #383b4b;
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      padding-top: 2.25rem;

      &::after {
        content: none;
      }
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      grid-row: 1 / span 2;

      height: 100%;
    }
  }

  &__content {
    display: grid;
    grid-template-rows: repeat(3, fit-content);

    &__crew-selector {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 1.8rem 0 0;
      margin: 0;
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

        @media screen and (min-width: #{$breakpoint-desktop}) {
          --size: 0.8rem;

          margin: 0 0.75rem 0;
        }
      }

      @media screen and (min-width: #{$breakpoint-tablet}) {
        grid-row: 4;

        padding-top: 2.5rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        justify-self: start;

        padding-bottom: 1.75rem;
      }
    }

    &__role {
      font-family: "Bellefair", serif;
      font-size: 0.9rem;
      text-align: center;
      text-transform: uppercase;

      color: var(--c-white);

      padding: 1.75rem 0 0;
      margin: 0;
      opacity: 0.5;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 1.3rem;

        padding-top: 1.3rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        align-content: start;

        font-size: 1.75rem;
        text-align: left;

        padding: 0;
      }
    }

    &__name {
      font-family: "Bellefair", serif;
      font-size: 1.3rem;
      text-transform: uppercase;

      padding: 0.5rem 0 0;
      margin: 0;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 2.2rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        font-size: 3rem;
        text-align: left;

        padding: 1rem 0 0;
      }
    }

    &__bio {
      font-family: "Barlow", sans-serif;
      font-size: 0.82rem;
      line-height: 1.67;
      color: var(--c-pink);

      padding: 0.9rem 0 0;
      margin: 0;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        justify-self: center;

        font-size: 0.89rem;

        max-width: 67%;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        justify-self: start;

        font-size: 1rem;
        text-align: left;
        line-height: 1.75;

        max-width: 80%;

        padding: 1.45rem 0 0;
      }
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      grid-row: 2;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      grid-template-rows: repeat(3, min-content) auto;
      justify-self: start;

      height: 100%;

      padding-top: 15.5vh;
    }
  }

  @media screen and (min-width: #{$breakpoint-tablet}) {
    padding: 7rem 2.125rem 0;
  }

  @media screen and (min-width: #{$breakpoint-desktop}) {
    column-gap: 2vw;

    grid-template-rows: 3rem auto;
    grid-template-columns: 50% auto;

    padding: 11.5rem 11.5vw 0;
  }
}
</style>
