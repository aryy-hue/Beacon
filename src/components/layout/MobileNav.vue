<template>
  <v-bottom-navigation grow class="mobile-nav d-lg-none" color="primary" aria-label="Primary">
    <v-btn v-for="item in items" :key="item.to" :to="item.to" :value="item.to" :aria-label="item.label">
      <span class="material-symbols-rounded" :class="{ fill: isActive(item.to) }" aria-hidden="true">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const items = [
  { to: '/dashboard', label: 'Home', icon: 'dashboard' },
  { to: '/schedule', label: 'Schedule', icon: 'calendar_month' },
  { to: '/courses', label: 'Courses', icon: 'book' },
  { to: '/assignments', label: 'Tasks', icon: 'assignment' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

const route = useRoute()
function isActive(to: string) {
  return route.path === to
}
</script>

<style scoped>
.mobile-nav {
  background: var(--nw-surface-container-low) !important;
  border-top: 1px solid var(--nw-outline-variant);
  height: 72px !important;
}
.nav-label {
  font-size: 0.72rem;
  text-transform: none;
  letter-spacing: 0;
}
</style>
