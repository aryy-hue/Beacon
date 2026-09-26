<template>
  <RouterView v-slot="{ Component, route }">
    <!-- Guest routes (login/register) cross-fade between each other; the
         authenticated shell renders instantly so navigation stays snappy. -->
    <Transition v-if="route.meta.guest" name="auth-swap" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
    <component v-else :is="Component" />
  </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
.auth-swap-enter-active,
.auth-swap-leave-active {
  transition:
    opacity var(--nw-motion-med),
    transform var(--nw-motion-med);
}
.auth-swap-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.99);
}
.auth-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
}
</style>
