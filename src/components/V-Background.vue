<template>
  <picture class="background-image__wrapper">
    <source
      :media="`(min-width: ${breakpoints.DESKTOP}px)`"
      :srcset="`/${props.name}/background-${props.name}-desktop.jpg`"
    />
    <source
      :media="`(min-width: ${breakpoints.TABLET}px)`"
      :srcset="`/${props.name}/background-${props.name}-tablet.jpg`"
    />
    <img
      ref="backgroundImage"
      :src="`/${props.name}/background-${props.name}-mobile.jpg`"
      alt="earth"
      decoding="async"
      class="background-image"
      v-bind="$attrs"
    />
  </picture>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useHead } from "@vueuse/head";
import { gsap } from "gsap";

import { breakpoints } from "../helpers/constants";

const props = defineProps({
  name: { type: String, default: "", required: true },
});

const backgroundImage = ref(null);

onMounted(() => {
  gsap.to(backgroundImage.value, {
    y: 50,
    ease: "none",
    scrollTrigger: { start: "top top", end: "max bottom", scrub: true },
  });
});

const viewport = ["mobile", "tablet", "desktop"];
useHead({
  // preloading background image
  link: viewport.reduce(
    (acc, size) => [
      ...acc,
      {
        rel: "preload",
        as: "image",
        href: `/${props.name}/background-${props.name}-${size}.jpg`,
      },
    ],
    []
  ),
});
</script>

// https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
<script>
export default { inheritAttrs: false };
</script>

<style scoped lang="scss">
.background-image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;

  &__wrapper {
    display: block;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
