import { ref, onMounted, onBeforeUpdate, onUpdated, onUnmounted } from "vue";

/**
 * Reactive hook for getting window width
 * @param {number} initialWidth this will initial width for render, cuz static renderer does not have window
 * @returns {[import('vue').Ref<number>]}
 */
export default function useWindowWidth(initialWidth = 375) {
  const width = ref(initialWidth);

  const setWidth = () => (width.value = window.innerWidth);

  onMounted(() => {
    width.value = window.innerWidth;
    window.addEventListener("resize", setWidth);
  });
  onUpdated(() => {
    width.value = window.innerWidth;
    window.addEventListener("resize", setWidth);
  });
  onBeforeUpdate(() => window.removeEventListener("resize", setWidth));
  onUnmounted(() => window.removeEventListener("resize", setWidth));

  return [width];
}
