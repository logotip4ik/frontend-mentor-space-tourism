<template>
  <main class="main">
    <VBackground name="home" alt="earth"></VBackground>

    <div class="main__content">
      <p class="main__content__subheading">So, you want to travel to</p>
      <h1 class="main__content__heading">Space</h1>
      <p class="main__content__info">
        Let’s face it; if you want to go to space, you might as well genuinely
        go to outer space and not hover kind of on the edge of it. Well sit
        back, and relax because we’ll give you a truly out of this world
        experience!
      </p>
    </div>

    <RouterLink class="main__action" to="/destination">
      <span class="main__action__text">Explore</span>
    </RouterLink>
  </main>
</template>

<script setup>
import { useHead } from "@vueuse/head";

import VBackground from "../components/V-Background.vue";

useHead({ title: "Home | Space tourism website" });
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  position: relative;
  z-index: 0;

  min-height: 100vh;

  margin: 0;
  padding: 0 0 2.75rem;

  background-color: var(--c-black);

  &__content {
    color: white;
    text-align: center;

    padding: 0 1.55rem 3rem;

    &__subheading {
      font-family: "Barlow Condensed", sans-serif;
      font-size: 0.9rem;
      text-transform: uppercase;
      text-align: center;
      letter-spacing: 2.7px;

      margin-bottom: 1.2rem;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 1.125rem;
        letter-spacing: 3.1px;

        margin-bottom: 1rem;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        font-size: 1.6rem;
        text-align: left;
        letter-spacing: 4.6px;

        margin-bottom: 1.5rem;
      }
    }

    &__heading {
      font-size: 4.25rem;

      text-transform: uppercase;
      margin: 0 0 1.25rem;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 8.1rem;

        margin: 0;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        text-align: left;

        margin-bottom: 1.4rem;
      }
    }

    &__info {
      font-family: "Barlow", sans-serif;

      color: var(--c-pink);
      font-size: 0.84rem;
      line-height: 1.65;
      text-align: center;

      margin-bottom: 1.4rem;

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 0.9rem;
        line-height: 1.75;

        max-width: 63%;

        margin-bottom: 5.5rem;
        margin-left: auto;
        margin-right: auto;
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        font-size: 1rem;
        line-height: 1.78;
        text-align: left;

        max-width: 53%;

        margin-bottom: 0;
        margin-left: unset;
        margin-right: unset;
      }
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      padding-top: 10rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      padding: 0;
    }
  }

  &__action {
    --size: 150px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    font-family: "Bellefair", serif;
    font-size: 1.1rem;
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

    &::after {
      content: "";

      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;

      width: 100%;
      height: 100%;

      border-radius: 50%;
      background-color: var(--c-white);

      opacity: 0.1;
      transform: translate(-50%, -50%);
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &:is(:hover, :focus)::after {
      transform: translate(-50%, -50%) scale(1.75);
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      --size: 240px;

      font-size: 1.8rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      --size: min(19vw, 270px);
    }
  }

  @media screen and (min-width: #{$breakpoint-desktop}) {
    align-items: flex-end;
    flex-direction: row;

    padding: 0 11.5vmax 15vh;
  }
}
</style>
