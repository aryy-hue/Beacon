<template>
  <div class="page">
    <h1 class="page-title">Class Schedule</h1>
    <p class="text-secondary page-sub">Your weekly classes and upcoming sessions.</p>
    <LoadingState v-if="loading" label="Loading schedule…" />
    <div v-else class="sched-grid">
      <SchedulePanel :events="events" />
      <v-card rounded="xl" elevation="0" class="day-card">
        <h2 class="day-title">This week</h2>
        <div v-for="day in weekDays" :key="day.iso" class="day-block">
          <p class="day-label">{{ day.label }}</p>
          <ul v-if="day.events.length" class="day-events">
            <li v-for="e in day.events" :key="e.id" class="day-event">
              <span class="time">{{ e.start }}</span>
              <span class="ev-main">
                <strong>{{ e.title }}</strong>
                <small class="text-secondary">{{ e.start }}–{{ e.end }} · {{ e.room }}</small>
              </span>
              <v-chip size="small" variant="tonal">{{ e.room }}</v-chip>
            </li>
          </ul>
          <p v-else class="text-secondary no-class">No classes</p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SchedulePanel from '@/components/dashboard/SchedulePanel.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { ScheduleEvent } from '@/types'

const loading = ref(true)
const events = ref<ScheduleEvent[]>([])

const weekDays = computed(() => {
  const base = new Date('2026-09-23T12:00:00')
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    return {
      iso,
      label: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      events: events.value
        .filter((e) => e.date === iso)
        .sort((a, b) => a.start.localeCompare(b.start)),
    }
  })
})

onMounted(async () => {
  events.value = await lmsRepo.getSchedule()
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
  margin: 0 0 var(--nw-space-5);
}
.sched-grid {
  display: grid;
  gap: var(--nw-space-5);
  grid-template-columns: 1fr;
  align-items: start;
}
@media (min-width: 1024px) {
  .sched-grid { grid-template-columns: 360px minmax(0, 1fr); }
}
.day-card {
  border: 1px solid var(--nw-outline-variant);
  padding: var(--nw-space-5);
}
.day-title {
  margin: 0 0 var(--nw-space-2);
  font-size: 1.1rem;
}
.day-block + .day-block {
  margin-top: var(--nw-space-4);
  padding-top: var(--nw-space-4);
  border-top: 1px solid var(--nw-outline-variant);
}
.day-label {
  margin: 0 0 var(--nw-space-2);
  font-weight: 700;
  font-size: 0.9rem;
}
.day-events {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--nw-space-2);
}
.day-event {
  display: flex;
  align-items: center;
  gap: var(--nw-space-3);
  background: var(--nw-surface-container-low);
  border-radius: var(--nw-shape-md);
  padding: var(--nw-space-3) var(--nw-space-4);
}
.time {
  font-weight: 700;
  color: var(--nw-primary);
  font-size: 0.9rem;
  min-width: 48px;
}
.ev-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.no-class {
  margin: 0;
  font-size: 0.85rem;
}
</style>
