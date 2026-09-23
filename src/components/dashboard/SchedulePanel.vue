<template>
  <v-card class="panel" rounded="xl" elevation="0">
    <div class="panel-head">
      <h2 class="panel-title">My Schedule</h2>
      <v-btn variant="text" size="small" color="primary" to="/schedule" class="text-none"
        >Full view</v-btn
      >
    </div>

    <div class="cal-head">
      <v-btn icon variant="text" size="small" aria-label="Previous month" @click="shift(-1)">
        <span class="material-symbols-rounded" aria-hidden="true">chevron_left</span>
      </v-btn>
      <strong>{{ monthLabel }}</strong>
      <v-btn icon variant="text" size="small" aria-label="Next month" @click="shift(1)">
        <span class="material-symbols-rounded" aria-hidden="true">chevron_right</span>
      </v-btn>
    </div>

    <div class="cal-grid" role="grid" :aria-label="monthLabel">
      <span
        v-for="(d, i) in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
        :key="i"
        class="dow"
        aria-hidden="true"
        >{{ d }}</span
      >
      <button
        v-for="cell in cells"
        :key="cell.key"
        role="gridcell"
        class="day"
        :class="{
          dim: !cell.inMonth,
          today: cell.isToday,
          selected: cell.isSelected,
          marked: cell.marked,
        }"
        :aria-label="cell.aria"
        :aria-pressed="cell.isSelected"
        @click="select(cell.date)"
      >
        {{ cell.day }}
      </button>
    </div>

    <v-divider class="my-3" />

    <p class="up-label">Upcoming classes</p>
    <ul class="events">
      <li v-for="e in upcoming" :key="e.id" class="event">
        <span class="dot" :style="{ background: dotColor(e.accent) }" aria-hidden="true" />
        <span class="event-main">
          <strong>{{ e.title }}</strong>
          <small class="text-secondary"
            >{{ fmtDay(e.date) }} · {{ e.start }}–{{ e.end }} · {{ e.room }}</small
          >
        </span>
      </li>
    </ul>
    <EmptyState
      v-if="!upcoming.length"
      icon="event_available"
      title="No classes soon"
      description="Enjoy the break!"
    />
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Accent, ScheduleEvent } from '@/types'

const props = defineProps<{ events: ScheduleEvent[] }>()

const today = new Date()
today.setHours(0, 0, 0, 0)
const cursor = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selected = ref<string>(toISO(today))

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function shift(n: number) {
  cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth() + n, 1)
}
function select(iso: string) {
  selected.value = iso
}

const monthLabel = computed(() =>
  cursor.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
)

const eventDates = computed(() => new Set(props.events.map((e) => e.date)))

const cells = computed(() => {
  const y = cursor.value.getFullYear()
  const m = cursor.value.getMonth()
  const first = new Date(y, m, 1).getDay()
  const days = new Date(y, m + 1, 0).getDate()
  const prevDays = new Date(y, m, 0).getDate()
  const out: {
    key: string
    day: number
    date: string
    inMonth: boolean
    isToday: boolean
    isSelected: boolean
    marked: boolean
    aria: string
  }[] = []
  for (let i = first - 1; i >= 0; i--) {
    const d = new Date(y, m - 1, prevDays - i)
    const iso = toISO(d)
    out.push({
      key: 'p' + iso,
      day: d.getDate(),
      date: iso,
      inMonth: false,
      isToday: iso === toISO(today),
      isSelected: iso === selected.value,
      marked: eventDates.value.has(iso),
      aria: d.toDateString(),
    })
  }
  for (let d = 1; d <= days; d++) {
    const date = new Date(y, m, d)
    const iso = toISO(date)
    out.push({
      key: iso,
      day: d,
      date: iso,
      inMonth: true,
      isToday: iso === toISO(today),
      isSelected: iso === selected.value,
      marked: eventDates.value.has(iso),
      aria: date.toDateString(),
    })
  }
  while (out.length % 7 !== 0) {
    const last = out.length - (first + days)
    const d = new Date(y, m + 1, last + 1)
    const iso = toISO(d)
    out.push({
      key: 'n' + iso,
      day: d.getDate(),
      date: iso,
      inMonth: false,
      isToday: false,
      isSelected: iso === selected.value,
      marked: eventDates.value.has(iso),
      aria: d.toDateString(),
    })
  }
  return out
})

const upcoming = computed(() =>
  [...props.events]
    .filter((e) => e.date >= toISO(today))
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))
    .slice(0, 3),
)

function fmtDay(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  const t = toISO(today)
  if (iso === t) return 'Today'
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (iso === toISO(tomorrow)) return 'Tomorrow'
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const dotPalette: Record<Accent, string> = {
  blue: '#0b57d0',
  purple: '#7b1fa2',
  orange: '#e8710a',
  green: '#1e7e34',
  red: '#d32f2f',
  teal: '#00796b',
}
function dotColor(a: Accent) {
  return dotPalette[a]
}
</script>

<style scoped>
.panel {
  border: 1px solid var(--nw-outline-variant);
  padding: var(--nw-space-4);
}
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--nw-space-2);
}
.panel-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}
.cal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--nw-space-2);
  font-size: 0.9rem;
}
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  text-align: center;
}
.dow {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--nw-on-surface-variant);
  padding: 4px 0;
}
.day {
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.82rem;
  aspect-ratio: 1;
  border-radius: var(--nw-shape-full);
  cursor: pointer;
  position: relative;
}
.day:hover {
  background: var(--nw-surface-container-high);
}
.day.dim {
  opacity: 0.35;
}
.day.today {
  font-weight: 700;
  color: var(--nw-primary);
}
.day.selected {
  background: var(--nw-primary);
  color: var(--nw-on-primary);
  font-weight: 700;
}
.day.marked::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 4px;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.7;
}
.up-label {
  margin: 0 0 var(--nw-space-2);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--nw-on-surface-variant);
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--nw-space-3);
}
.event {
  display: flex;
  gap: var(--nw-space-3);
  align-items: flex-start;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
  flex: none;
}
.event-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.event-main strong {
  font-size: 0.9rem;
}
.event-main small {
  font-size: 0.78rem;
}
</style>
