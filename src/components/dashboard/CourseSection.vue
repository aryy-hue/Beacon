<template>
  <section aria-labelledby="courses-heading">
    <div class="section-head">
      <h2 id="courses-heading" class="section-title">My Courses</h2>
      <v-btn variant="text" color="primary" to="/courses" class="text-none">
        View all
        <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
      </v-btn>
    </div>
    <div class="grid">
      <CourseCard v-for="c in courses" :key="c.id" :course="c" />
    </div>
  </section>
</template>

<script setup lang="ts">
import CourseCard from './CourseCard.vue'
import type { Course } from '@/types'

defineProps<{ courses: Course[] }>()
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
@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
