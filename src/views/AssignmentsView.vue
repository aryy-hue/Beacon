<template>
  <div class="page narrow">
    <h1 class="page-title">Assignments</h1>
    <p class="text-secondary page-sub">Stay on top of every deadline.</p>
    <v-chip-group v-model="filter" class="mb-4" aria-label="Filter assignments" mandatory>
      <v-chip value="open" filter variant="tonal">To do</v-chip>
      <v-chip value="done" filter variant="tonal">Completed</v-chip>
      <v-chip value="all" filter variant="tonal">All</v-chip>
    </v-chip-group>
    <LoadingState v-if="loading" label="Loading assignments…" />
    <template v-else>
      <v-card v-for="a in visible" :key="a.id" :id="a.id" rounded="xl" elevation="0" class="assign">
        <v-checkbox
          :model-value="a.done"
          hide-details
          density="comfortable"
          :aria-label="`Mark ${a.title} as done`"
          @update:model-value="toggle(a)"
        />
        <div class="assign-main">
          <p class="assign-title" :class="{ done: a.done }">{{ a.title }}</p>
          <p class="assign-sub">{{ a.courseName }} · {{ a.dueLabel }}</p>
        </div>
        <v-chip
          size="small"
          :color="a.done ? 'success' : isToday(a) ? 'error' : 'primary'"
          variant="tonal"
        >
          {{ a.done ? 'Done' : a.dueLabel }}
        </v-chip>
      </v-card>
      <EmptyState v-if="!visible.length" icon="task_alt" title="All clear!" description="No assignments in this view." />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { Assignment } from '@/types'

const loading = ref(true)
const items = ref<Assignment[]>([])
const filter = ref<'open' | 'done' | 'all'>('open')

const visible = computed(() => {
  if (filter.value === 'done') return items.value.filter((a) => a.done)
  if (filter.value === 'all') return items.value
  return items.value.filter((a) => !a.done)
})

function isToday(a: Assignment) {
  return a.dueLabel === 'Due today'
}
function toggle(a: Assignment) {
  a.done = !a.done
}

onMounted(async () => {
  items.value = await lmsRepo.getAssignments()
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
.assign {
  border: 1px solid var(--nw-outline-variant);
  padding: var(--nw-space-2) var(--nw-space-4);
  margin-bottom: var(--nw-space-3);
  display: flex;
  align-items: center;
  gap: var(--nw-space-2);
}
.assign-main {
  flex: 1;
  min-width: 0;
}
.assign-title {
  margin: 0;
  font-weight: 500;
}
.assign-title.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.assign-sub {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: var(--nw-on-surface-variant);
}
</style>
