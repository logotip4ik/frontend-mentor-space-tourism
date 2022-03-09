<template>
  <nav class="nav">
    <router-link to="/">
      <LogoSVG alt="logo image" aria-label="website logo" class="nav__logo" />
    </router-link>
    <button class="nav__menu-button" @click="isMenuOpened = !isMenuOpened">
      <Transition mode="out-in" name="fade">
        <HamburgerSVG
          v-if="!isMenuOpened"
          alt="menu icon"
          class="nav__menu-button__hamburger"
          aria-label="hamburger icon"
        />
        <CloseSVG
          v-else
          alt="close menu icon"
          class="nav__menu-button__close"
          aria-label="close icon"
        />
      </Transition>
    </button>
    <!-- TODO: rewrite how menu is toggled to prevent it showing when screen size is changing -->
    <Transition :css="false" @enter="showMenu" @leave="closeMenu">
      <ul
        v-show="isMenuOpened || width >= breakpoints.TABLET"
        class="nav__navigation"
      >
        <li
          v-for="(link, key) in links"
          :key="key"
          :class="{
            nav__navigation__item: true,
            'nav__navigation__item--active': route.path === link.to,
          }"
          @click="isMenuOpened = false"
        >
          <RouterLink :to="link.to" class="nav__navigation__item__link">
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";

import useWindowWidth from "../hooks/useWindowWidth";
import { breakpoints } from "../helpers/constants";

import LogoSVG from "../assets/img/logo.svg";
import HamburgerSVG from "../assets/img/icon-hamburger.svg";
import CloseSVG from "../assets/img/icon-close.svg";

const route = useRoute();
const [width] = useWindowWidth();
const isMenuOpened = ref(false);

const links = [
  { to: "/", label: "Home" },
  { to: "/destination", label: "Destination" },
  { to: "/crew", label: "Crew" },
  { to: "/technology", label: "Technology" },
];

/** @param {HTMLElement} el */
function showMenu(el, onComplete) {
  const tl = gsap.timeline();

  tl.set(el.children, { opacity: 0, onComplete });
  tl.fromTo(el, { x: el.clientWidth }, { x: 0, ease: "power2.out(2)" });
  tl.to(el.children, { opacity: 1, stagger: 0.075 }, "-=0.25");
}

/** @param {HTMLElement} el */
function closeMenu(el, onComplete) {
  gsap.to(el, { x: el.clientWidth, ease: "power3.out", onComplete });
}
</script>

<style lang="scss">
.nav {
  --pd-y: 1.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100%;

  padding: var(--pd-y) 1.3rem;

  &__logo {
    --size: 40px;

    width: 100%;
    max-width: var(--size);
    height: auto;

    @media screen and (min-width: #{$breakpoint-tablet}) {
      --size: 55px;

      margin-top: 0.35rem;
      margin-left: 2rem;
      margin-right: 2rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      --size: 50px;

      margin-top: 0.25rem;
      margin-left: 3rem;
      margin-right: 3rem;
    }
  }

  &__menu-button {
    appearance: none;

    border: none;
    border-radius: 0;

    background: transparent;
    cursor: pointer;

    @media screen and (min-width: #{$breakpoint-tablet}) {
      display: none;
    }
  }

  &__navigation {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;

    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;

    width: 68%;
    height: 100vh;

    margin: 0;
    padding-top: 6.5rem;
    padding-left: 3.5rem;

    color: var(--c-white);
    background-color: rgba($color: #4e4e4e, $alpha: 0.75);

    list-style-type: none;
    transform: translateX(100%);

    @supports (backdrop-filter: blur(10px)) {
      background-color: rgba($color: #ffffff, $alpha: 0.05);
      backdrop-filter: blur(81.5485px);
    }

    &__item {
      position: relative;

      width: 100%;

      font-size: 1rem;
      font-weight: 400;
      font-size: 0.9rem;
      letter-spacing: 2.7px;
      margin-bottom: 1.75rem;
      line-height: 1.2;

      &__link {
        display: inline-block;

        width: 100%;

        color: currentColor;
        text-decoration: none;
        text-transform: uppercase;

        @media screen and (min-width: #{$breakpoint-desktop}) {
          width: unset;
        }
      }

      &:first-of-type {
        counter-set: list-item;
      }

      &::marker {
        content: "0" counter(list-item) "  ";

        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 2.7px;

        counter-increment: list-item;

        @media screen and (min-width: #{$breakpoint-tablet}) {
          content: none;
        }

        @media screen and (min-width: #{$breakpoint-desktop}) {
          content: "0" counter(list-item) "  ";

          font-size: 0.88rem;
        }
      }

      &::after {
        --pd-y: 5px;

        content: "";

        position: absolute;
        right: 0;
        top: calc(var(--pd-y) * -1);
        bottom: calc(var(--pd-y) * -1);
        width: 3px;

        opacity: 0;
        background-color: var(--c-white);
        transition: opacity 300ms;

        @media screen and (min-width: #{$breakpoint-tablet}) {
          top: unset;
          bottom: 0;
          left: 0;

          width: 100%;
          height: 3px;
        }
      }

      &:is(:focus, :hover)::after {
        opacity: 0.5;
      }

      &--active::after {
        opacity: 1 !important;
      }

      @media screen and (min-width: #{$breakpoint-tablet}) {
        font-size: 0.78rem;
        line-height: 6.7;
        text-align: center;
        letter-spacing: 2.3625px;

        margin: 0;
        margin-right: 2.1rem;
        padding: 0;

        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }

      @media screen and (min-width: #{$breakpoint-desktop}) {
        font-size: 0.85rem;
        letter-spacing: 2.8px;
        line-height: 6.2;

        width: max-content;

        margin-right: 2.55rem;
      }
    }

    @media screen and (min-width: #{$breakpoint-tablet}) {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;

      position: static;

      width: auto;
      height: auto;

      padding: 0 2.5rem 0 2.5rem;
    }

    @media screen and (min-width: #{$breakpoint-desktop}) {
      padding: 0 11.5vw 0 8.25vw;

      list-style-position: inside;
    }
  }

  @media screen and (min-width: #{$breakpoint-tablet}) {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  @media screen and (min-width: #{$breakpoint-desktop}) {
    padding-top: 2.125rem;
    padding-left: 0;
  }
}
</style>
