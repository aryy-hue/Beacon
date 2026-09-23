<template>
  <div class="loading" role="status" aria-label="Loading content">
    <v-progress-circular indeterminate color="primary" size="40" />
    <p class="text-secondary">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Loading…' })
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--nw-space-3);
  padding: var(--nw-space-8) 0;
}
.loading p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
