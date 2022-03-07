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
    <Transition :css="false" @enter="showMenu" @leave="closeMenu">
      <ul v-show="isMenuOpened" class="nav__navigation">
        <li
          v-for="(link, key) in links"
          :key="key"
          class="nav__navigation__item"
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
import { ref } from "vue";
import { gsap } from "gsap";

import LogoSVG from "../assets/img/logo.svg";
import HamburgerSVG from "../assets/img/icon-hamburger.svg";
import CloseSVG from "../assets/img/icon-close.svg";

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
    width: 100%;
    max-width: 40px;
    height: auto;
  }

  &__menu-button {
    appearance: none;

    border: none;
    border-radius: 0;

    background: transparent;
    cursor: pointer;
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

    transform: translateX(100%);

    @supports (backdrop-filter: blur(10px)) {
      background-color: rgba($color: #ffffff, $alpha: 0.05);
      backdrop-filter: blur(81.5485px);
    }

    &__item {
      width: 100%;

      font-size: 1rem;
      font-weight: 400;
      font-size: 0.9rem;
      letter-spacing: 2.7px;
      margin-bottom: 1.75rem;
      line-height: 1.2;

      &__link {
        display: inline-block;

        position: relative;

        width: 100%;

        color: currentColor;
        text-decoration: none;
        text-transform: uppercase;

        &.router-link-active::after {
          --pd-y: 5px;

          content: "";

          position: absolute;
          right: 0;
          top: calc(var(--pd-y) * -1);
          bottom: calc(var(--pd-y) * -1);
          width: 3px;

          background-color: var(--c-white);
        }
      }

      &:first-of-type {
        counter-set: list-item;
      }

      &::marker {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 2.7px;

        content: "0" counter(list-item) "  ";
        counter-increment: list-item;
      }
    }
  }
}
</style>
