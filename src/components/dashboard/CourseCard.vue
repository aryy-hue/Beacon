<template>
  <v-card class="course lift" rounded="xl" elevation="0" :to="to" :aria-label="course.title">
    <div class="thumb" :style="accentStyle(course.accent)">
      <span class="material-symbols-rounded thumb-icon" aria-hidden="true">{{ course.icon }}</span>
      <v-chip size="small" class="thumb-chip" variant="flat">{{ course.category }}</v-chip>
    </div>
    <v-card-text class="body">
      <p class="title clamp-1">{{ course.title }}</p>
      <p class="teacher">{{ course.instructor }} · {{ course.lessonsDone }}/{{ course.lessonsTotal }} lessons</p>
      <div class="progress-row">
        <v-progress-linear
          :model-value="course.progress"
          color="primary"
          height="8"
          rounded
          role="progressbar"
          :aria-valuenow="course.progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`${course.title} progress`"
        />
        <strong class="pct">{{ course.progress }}%</strong>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Course } from '@/types'
import { accentStyle } from './accent'

withDefaults(defineProps<{ course: Course; to?: string }>(), { to: '/courses' })
</script>

<style scoped>
.course {
  border: 1px solid var(--nw-outline-variant);
  overflow: hidden;
  height: 100%;
}
.thumb {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.thumb-icon {
  font-size: 52px;
}
.thumb-chip {
  position: absolute;
  left: 12px;
  top: 12px;
  background: rgb(255 255 255 / 0.85) !important;
}
.body {
  padding: var(--nw-space-4) !important;
}
.title {
  font-weight: 700;
  font-size: 1rem;
  margin: 0 0 2px;
}
.teacher {
  margin: 0 0 var(--nw-space-3);
  font-size: 0.82rem;
  color: var(--nw-on-surface-variant);
}
.progress-row {
  display: flex;
  align-items: center;
  gap: var(--nw-space-3);
}
.pct {
  font-size: 0.85rem;
  color: var(--nw-primary);
  min-width: 40px;
  text-align: right;
}
</style>
