<template>
  <div class="page">
    <h1 class="page-title">Courses</h1>
    <p class="text-secondary page-sub">Browse your enrolled courses and keep learning.</p>
    <v-text-field
      v-model="query"
      class="search"
      density="comfortable"
      hide-details
      placeholder="Search courses…"
      rounded="lg"
      variant="solo-filled"
      flat
      role="searchbox"
      aria-label="Search courses"
    >
      <template #prepend-inner>
        <span class="material-symbols-rounded search-icon" aria-hidden="true">search</span>
      </template>
    </v-text-field>
    <v-chip-group v-model="category" class="mb-4" aria-label="Filter by category">
      <v-chip value="" filter variant="tonal">All</v-chip>
      <v-chip v-for="c in categories" :key="c" :value="c" filter variant="tonal">{{ c }}</v-chip>
    </v-chip-group>
    <LoadingState v-if="loading" label="Loading courses…" />
    <div v-else-if="filtered.length" class="grid">
      <CourseCard v-for="c in filtered" :key="c.id" :course="c" />
    </div>
    <EmptyState v-else icon="search_off" title="No courses found" description="Try a different search or filter." />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CourseCard from '@/components/dashboard/CourseCard.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { Course } from '@/types'

const route = useRoute()
const loading = ref(true)
const courses = ref<Course[]>([])
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const category = ref('')

const categories = computed(() => [...new Set(courses.value.map((c) => c.category))])
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return courses.value.filter(
    (c) =>
      (!category.value || c.category === category.value) &&
      (!q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)),
  )
})

onMounted(async () => {
  courses.value = await lmsRepo.getCourses()
  loading.value = false
})
</script>

<style scoped>
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
.grid {
  display: grid;
  gap: var(--nw-space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
