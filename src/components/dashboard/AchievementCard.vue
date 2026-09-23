<template>
  <section aria-labelledby="ach-heading">
    <div class="section-head">
      <h2 id="ach-heading" class="section-title">Achievements</h2>
      <v-btn variant="text" color="primary" to="/certificates" class="text-none">
        View all
        <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
      </v-btn>
    </div>
    <div class="grid">
      <v-card v-for="a in achievements" :key="a.id" class="ach lift" rounded="xl" elevation="0">
        <div class="medal" :style="accentStyle(a.accent)">
          <span class="material-symbols-rounded" aria-hidden="true">{{ a.icon }}</span>
        </div>
        <div class="ach-body">
          <p class="ach-title">{{ a.title }}</p>
          <p class="ach-sub">{{ a.description }}</p>
          <v-btn variant="tonal" color="primary" size="small" class="text-none mt-2" :to="`/certificates#${a.id}`">
            View Certificate
          </v-btn>
        </div>
      </v-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Achievement } from '@/types'
import { accentStyle } from './accent'

defineProps<{ achievements: Achievement[] }>()
</script>

<style scoped>
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--nw-space-3);
}
.section-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
}
.grid {
  display: grid;
  gap: var(--nw-space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
.ach {
  border: 1px solid var(--nw-outline-variant);
  padding: var(--nw-space-4);
  display: flex;
  gap: var(--nw-space-4);
  align-items: flex-start;
}
.medal {
  width: 56px;
  height: 56px;
  flex: none;
  border-radius: var(--nw-shape-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.medal span {
  font-size: 30px;
}
.ach-body {
  min-width: 0;
}
.ach-title {
  margin: 0 0 2px;
  font-weight: 700;
}
.ach-sub {
  margin: 0;
  font-size: 0.85rem;
  color: var(--nw-on-surface-variant);
}
</style>
