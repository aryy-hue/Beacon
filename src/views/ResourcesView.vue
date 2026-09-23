<template>
  <div class="page narrow">
    <h1 class="page-title">Resources</h1>
    <p class="text-secondary page-sub">Slides, videos and reading packs from your teachers.</p>
    <v-text-field
      v-model="query"
      class="search"
      density="comfortable"
      hide-details
      placeholder="Search resources…"
      rounded="lg"
      variant="solo-filled"
      flat
      role="searchbox"
      aria-label="Search resources"
    >
      <template #prepend-inner>
        <span class="material-symbols-rounded search-icon" aria-hidden="true">search</span>
      </template>
    </v-text-field>
    <LoadingState v-if="loading" label="Loading resources…" />
    <v-list v-else lines="two" class="list">
      <v-list-item v-for="r in filtered" :key="r.id" rounded="lg" class="res">
        <template #prepend>
          <span class="res-icon" :style="accentStyle(r.accent)" aria-hidden="true">
            <span class="material-symbols-rounded">{{ kindIcon(r.kind) }}</span>
          </span>
        </template>
        <v-list-item-title class="res-title">{{ r.title }}</v-list-item-title>
        <v-list-item-subtitle class="text-caption">{{ r.courseName }} · {{ r.meta }}</v-list-item-subtitle>
        <template #append>
          <v-btn icon variant="text" size="small" :aria-label="`Download ${r.title}`">
            <span class="material-symbols-rounded" aria-hidden="true">download</span>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <EmptyState v-if="!loading && !filtered.length" icon="search_off" title="No resources found" description="Try a different search." />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { accentStyle } from '@/components/dashboard/accent'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { Resource } from '@/types'

const loading = ref(true)
const items = ref<Resource[]>([])
const query = ref('')

const kindIcon = (k: Resource['kind']) =>
  ({ slides: 'slideshow', video: 'play_circle', doc: 'description', link: 'link' })[k]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return items.value.filter(
    (r) => !q || r.title.toLowerCase().includes(q) || r.courseName.toLowerCase().includes(q),
  )
})

onMounted(async () => {
  items.value = await lmsRepo.getResources()
  loading.value = false
})
</script>

<style scoped>
.narrow {
  max-width: 860px;
}
.page-title {
  margin: 0 0 4px;
  font-size: 1.5rem;
  font-weight: 700;
}
.page-sub {
  margin: 0 0 var(--nw-space-4);
}
.search {
  max-width: 440px;
  margin-bottom: var(--nw-space-3);
}
.search-icon {
  color: var(--nw-on-surface-variant);
}
.list {
  padding: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.res {
  border: 1px solid var(--nw-outline-variant);
}
.res-title {
  font-weight: 500;
  font-size: 0.92rem;
}
.res-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--nw-shape-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 4px;
}
</style>
