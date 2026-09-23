<template>
  <div class="page">
    <LoadingState v-if="loading" label="Loading your dashboard…" />
    <template v-else>
      <WelcomeHero
        :first-name="student?.firstName"
        :open-tasks="openTasks"
        :today-classes="todayClasses"
        :avg-progress="avgProgress"
      />
      <div class="dash-grid">
        <div class="dash-main">
          <CourseSection :courses="courses.slice(0, 3)" />
          <AchievementCard :achievements="achievements" />
        </div>
        <aside class="dash-side">
          <SchedulePanel :events="events" />
          <TaskList :tasks="tasks" />
        </aside>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import WelcomeHero from '@/components/dashboard/WelcomeHero.vue'
import CourseSection from '@/components/dashboard/CourseSection.vue'
import AchievementCard from '@/components/dashboard/AchievementCard.vue'
import SchedulePanel from '@/components/dashboard/SchedulePanel.vue'
import TaskList from '@/components/dashboard/TaskList.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import { lmsRepo } from '@/repositories/lmsRepo'
import { useSessionStore } from '@/stores/session'
import type { Achievement, Assignment, Course, ScheduleEvent } from '@/types'

const session = useSessionStore()
const student = computed(() => session.student)

const loading = ref(true)
const courses = ref<Course[]>([])
const tasks = ref<Assignment[]>([])
const events = ref<ScheduleEvent[]>([])
const achievements = ref<Achievement[]>([])

function todayISO(at = new Date()) {
  return `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, '0')}-${String(at.getDate()).padStart(2, '0')}`
}

const openTasks = computed(() => tasks.value.filter((t) => !t.done).length)
const todayClasses = computed(() => {
  const today = events.value.filter((e) => e.date === todayISO())
  const upcoming = events.value.filter((e) => e.date >= todayISO())
  return today.length || upcoming.length
})
const avgProgress = computed(() =>
  courses.value.length
    ? Math.round(courses.value.reduce((s, c) => s + c.progress, 0) / courses.value.length)
    : 0,
)

onMounted(async () => {
  const [c, a, e, ach] = await Promise.all([
    lmsRepo.getCourses(),
    lmsRepo.getAssignments(),
    lmsRepo.getSchedule(),
    lmsRepo.getAchievements(),
  ])
  courses.value = c
  tasks.value = a
  events.value = e
  achievements.value = ach
  loading.value = false
})
</script>

<style scoped>
.dash-grid {
  display: grid;
  gap: var(--nw-space-5);
  margin-top: var(--nw-space-5);
  grid-template-columns: 1fr;
}
.dash-main {
  display: flex;
  flex-direction: column;
  gap: var(--nw-space-6);
  min-width: 0;
}
.dash-side {
  display: flex;
  flex-direction: column;
  gap: var(--nw-space-5);
  min-width: 0;
}
@media (min-width: 1100px) {
  .dash-grid {
    grid-template-columns: minmax(0, 1fr) 340px;
    align-items: start;
  }
  .dash-side {
    position: sticky;
    top: 84px;
  }
}
</style>
