<template>
  <div class="page narrow">
    <h1 class="page-title">Grades</h1>
    <p class="text-secondary page-sub">Semester 1 · Academic year 2026/2027</p>
    <LoadingState v-if="loading" label="Loading grades…" />
    <template v-else>
      <div class="summary">
        <v-card rounded="xl" elevation="0" class="sum-card">
          <small class="text-secondary">GPA</small>
          <strong>{{ gpa.toFixed(2) }}</strong>
        </v-card>
        <v-card rounded="xl" elevation="0" class="sum-card">
          <small class="text-secondary">Average score</small>
          <strong>{{ avg }}%</strong>
        </v-card>
        <v-card rounded="xl" elevation="0" class="sum-card">
          <small class="text-secondary">Credits earned</small>
          <strong>{{ credits }}</strong>
        </v-card>
      </div>
      <v-card rounded="xl" elevation="0" class="table-card">
        <div v-for="g in grades" :key="g.courseId" class="row">
          <span class="grade-badge" :class="tone(g.score)">{{ g.grade }}</span>
          <span class="row-main">
            <strong>{{ g.courseName }}</strong>
            <small class="text-secondary">{{ g.instructor }} · {{ g.credits }} credits</small>
          </span>
          <strong class="score">{{ g.score }}%</strong>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LoadingState from '@/components/common/LoadingState.vue'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { GradeRow } from '@/types'

const loading = ref(true)
const grades = ref<GradeRow[]>([])

const avg = computed(() =>
  grades.value.length ? Math.round(grades.value.reduce((s, g) => s + g.score, 0) / grades.value.length) : 0,
)
const credits = computed(() => grades.value.reduce((s, g) => s + g.credits, 0))
const gpa = computed(() => {
  if (!grades.value.length) return 0
  const pts = grades.value.reduce((s, g) => s + scoreToPoints(g.score) * g.credits, 0)
  const cr = credits.value || 1
  return pts / cr
})

function scoreToPoints(s: number) {
  if (s >= 90) return 4
  if (s >= 85) return 3.7
  if (s >= 80) return 3.3
  if (s >= 75) return 3
  return 2.5
}
function tone(s: number) {
  if (s >= 90) return 'tone-a'
  if (s >= 80) return 'tone-b'
  return 'tone-c'
}

onMounted(async () => {
  grades.value = await lmsRepo.getGrades()
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
.summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--nw-space-3);
  margin-bottom: var(--nw-space-4);
}
.sum-card {
  background: var(--nw-primary-container);
  color: var(--nw-on-primary-container);
  padding: var(--nw-space-4);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sum-card strong {
  font-size: 1.5rem;
}
.table-card {
  border: 1px solid var(--nw-outline-variant);
  padding: var(--nw-space-2) var(--nw-space-4);
}
.row {
  display: flex;
  align-items: center;
  gap: var(--nw-space-3);
  padding: var(--nw-space-3) 0;
}
.row + .row {
  border-top: 1px solid var(--nw-outline-variant);
}
.grade-badge {
  width: 52px;
  height: 52px;
  flex: none;
  border-radius: var(--nw-shape-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.tone-a { background: var(--nw-pastel-green-bg); color: var(--nw-pastel-green-fg); }
.tone-b { background: var(--nw-pastel-blue-bg); color: var(--nw-pastel-blue-fg); }
.tone-c { background: var(--nw-pastel-orange-bg); color: var(--nw-pastel-orange-fg); }
.row-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.score {
  color: var(--nw-primary);
}
</style>
