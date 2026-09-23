<template>
  <div class="empty">
    <span class="material-symbols-rounded empty-icon" aria-hidden="true">{{ icon }}</span>
    <p class="empty-title">{{ title }}</p>
    <p class="text-secondary empty-sub">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ icon?: string; title?: string; description?: string }>(), {
  icon: 'inbox',
  title: 'Nothing here yet',
  description: 'New items will appear in this space.',
})
</script>

<style scoped>
.empty {
  text-align: center;
  padding: var(--nw-space-8) var(--nw-space-4);
}
.empty-icon {
  font-size: 48px;
  color: var(--nw-outline);
}
.empty-title {
  font-weight: 500;
  font-size: 1.05rem;
  margin: var(--nw-space-3) 0 var(--nw-space-1);
}
.empty-sub {
  margin: 0 0 var(--nw-space-4);
  font-size: 0.9rem;
}
</style>
