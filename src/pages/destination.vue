<template>
  <main class="main">
    <VBackground name="destination" alt="night sky"></VBackground>

    <p class="main__subheading">
      <span class="main__subheading__dark">01</span>&nbsp; Pick your destination
    </p>

    <Swiper
      class="main__gallery"
      :initial-slide="currentDestinationIdx"
      @swiper="swiper = $event"
      @slide-change="currentDestinationIdx = $event.activeIndex"
    >
      <SwiperSlide
        v-for="(planet, key) in destinations"
        :key="key"
        class="main__gallery__item"
      >
        <picture class="main__gallery__item__image__wrapper">
          <source :srcset="planet.images.webp" type="image/webp" />
          <img
            :src="planet.images.png"
            :aria-label="planet.name"
            class="main__gallery__item__image"
            decoding="async"
          />
        </picture>
      </SwiperSlide>
    </Swiper>

    <div class="main__content">
      <ul class="main__content__planet-selector">
        <li
          v-for="(planet, key) in destinations"
          :key="planet.name"
          :class="{
            'main__content__planet-selector__item': true,
            'main__content__planet-selector__item--active':
              destination.name === planet.name,
          }"
          @click="currentDestinationIdx = key"
        >
          {{ planet.name }}
        </li>
      </ul>

      <Transition mode="out-in" name="fade">
        <h1 class="main__content__heading d-25" :key="currentDestinationIdx">
          {{ destination.name }}
        </h1>
      </Transition>

      <Transition mode="out-in" name="fade">
        <p class="main__content__description d-50" :key="currentDestinationIdx">
          {{ destination.description }}
        </p>
      </Transition>

      <hr class="main__content__hr" />

      <ul class="main__content__info-list">
        <Transition mode="out-in" name="fade">
          <li
            class="main__content__info-list__item d-75"
            :key="currentDestinationIdx"
          >
            <p class="main__content__info-list__item__heading">Avg. distance</p>
            <p class="main__content__info-list__item__info">
              {{ destination.distance }}
            </p>
          </li>
        </Transition>
        <Transition mode="out-in" name="fade">
          <li
            class="main__content__info-list__item d-100"
            :key="currentDestinationIdx"
          >
            <p class="main__content__info-list__item__heading">
              Est. travel time
            </p>
            <p class="main__content__info-list__item__info">
              {{ destination.travel }}
            </p>
          </li>
        </Transition>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import { Swiper, SwiperSlide } from "swiper/vue";

import { destinations } from "../assets/data.json";

import VBackground from "../components/V-Background.vue";

const route = useRoute();
const router = useRouter();
const swiper = ref();
const currentDestinationIdx = ref(route.query.planet || 0);

const destination = computed(() => destinations[currentDestinationIdx.value]);

watch(currentDestinationIdx, (val) => {
  router.replace({ path: "destination", query: { planet: val } });
  swiper.value.slideTo(val);
});

useHead({
  title: computed(() => `${destination.value.name} | Space tourism website`),
  description: computed(() => destination.value.description),
  // preloading planets images
  link: destinations.reduce(
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

  padding: 4rem 1.55rem 1rem;
  background-color: #090f1b;

  &__subheading {
    display: block;

    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.9rem;
    letter-spacing: 2.7px;
    text-transform: uppercase;
    color: var(--c-white);

    width: 100%;

    margin-bottom: 0.75rem;

    &__dark {
      font-weight: 700;
      opacity: 0.25;
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      font-size: 1.1rem;
      text-align: left;
      letter-spacing: 3.5px;

      margin-top: 0.5rem;
      margin-bottom: 2.5rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      grid-row: 1;
      grid-column: span 2;

      font-size: 1.76rem;

      margin-bottom: 0.5rem;
    }
  }

  &__gallery {
    width: 100%;
    padding-top: 1rem;
    margin-bottom: 0.5rem;

    &__item {
      text-align: center;
      margin-top: auto;

      &__image {
        --size: 170px;

        display: block;

        width: 53%;
        height: auto;

        max-width: 100%;
        max-height: 100%;

        &__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;

          height: 100%;

          @media screen and (min-width: #{$breakpoint-desktop}) {
            align-items: flex-end;
          }
        }

        @media screen and (min-width: #{$breakpoint-tablet}) {
          max-width: 43%;
        }

        @media screen and (min-width: #{$breakpoint-desktop}) {
          flex-grow: 1;

          max-width: 75%;
        }
      }
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      margin-bottom: 2.125rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      height: 100%;

      margin: 0;
    }
  }

  &__content {
    &__planet-selector {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 1.1rem 0 0;
      margin-top: 0;
      margin-bottom: 0.75rem;
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

          @media screen and (min-width: #{$breakpoint-desktop}) {
            --y-offset: 0.7rem;
          }
        }

        &:is(:focus, :hover)::after {
          opacity: 0.5;
        }

        &--active::after {
          opacity: 1;
        }

        @media screen and (min-width: #{$breakpoint-tablet}) {
          font-size: 1rem;

          margin: 0 0.85rem 0.85rem;
        }
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        justify-content: flex-start;

        margin: 0;
        padding-bottom: 1.25rem;
      }
    }

    &__heading {
      text-transform: uppercase;
      font-family: "Bellefair", serif;
      font-size: 3.1rem;

      padding-top: 1rem;
      margin: 0;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 4.25rem;

        margin-bottom: 0.35rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        font-size: 5.4rem;
        text-align: left;

        margin: 0;
        padding-bottom: 0.5rem;
      }
    }

    &__description {
      font-family: "Barlow", sans-serif;
      font-size: 0.82rem;
      line-height: 1.67;
      color: var(--c-pink);

      padding: 0.25rem 0 0;
      margin-top: 0;
      margin-bottom: 1.75rem;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 0.9rem;

        max-width: 81%;

        margin: 0 auto 2.75rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        font-size: 1rem;
        text-align: left;
        line-height: 1.78;

        max-width: 100%;
        height: min-content;

        margin: 0;
        padding-bottom: 2.5rem;
      }
    }

    &__hr {
      width: 100%;

      margin-bottom: 1rem;
      border-color: #383b4b;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        max-width: 82%;

        margin-bottom: 0.8rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        max-width: 100%;
      }
    }

    &__info-list {
      display: grid;
      grid-template-rows: repeat(2, fit-content);
      grid-auto-flow: row;

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

          @media screen and (min-width: #{$breakpoint-desktop}) {
            text-align: left;
          }
        }

        &__info {
          font-family: "Bellefair", serif;
          font-size: 1.5rem;
          text-align: center;
          text-transform: uppercase;

          margin: 0;

          @media screen and (min-width: #{$breakpoint-desktop}) {
            text-align: left;
          }
        }
      }

      @media screen and (min-width: #{$breakpoint-tablet}) {
        grid-auto-flow: column;
        justify-content: center;
        gap: 5.75rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        justify-content: start;
        gap: 4.75rem;
      }
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      align-self: end;
    }
  }

  @media screen and (min-width: #{$breakpoint-tablet}) {
    padding: 7rem 2.125rem 1rem;
  }

  @media screen and (min-width: #{$breakpoint-desktop}) {
    column-gap: 4vw;
    grid-template-rows: min-content auto;
    grid-template-columns: 55% auto;

    padding: 11.2rem 11.5vw 11vh;
  }
}
</style>
