<template>
  <VNavbar></VNavbar>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import VNavbar from "./components/V-Navbar.vue";
</script>
