<template>
  <v-card class="panel" rounded="xl" elevation="0">
    <div class="panel-head">
      <h2 class="panel-title">Upcoming Tasks</h2>
      <v-btn variant="text" size="small" color="primary" to="/assignments" class="text-none">View all</v-btn>
    </div>
    <template v-for="(group, gi) in groups" :key="group.label">
      <p v-if="group.items.length" class="group-label">{{ group.label }}</p>
      <v-list lines="two" class="list">
        <v-list-item
          v-for="t in group.items"
          :key="t.id"
          rounded="lg"
          class="task"
          :to="`/assignments#${t.id}`"
        >
          <template #prepend>
            <span class="task-icon" :style="accentStyle(iconAccent(t.kind))" aria-hidden="true">
              <span class="material-symbols-rounded">{{ kindIcon(t.kind) }}</span>
            </span>
          </template>
          <v-list-item-title class="task-title">{{ t.title }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{ t.courseName }} · {{ t.dueLabel }}</v-list-item-subtitle>
          <template #append>
            <span class="material-symbols-rounded chev" aria-hidden="true">chevron_right</span>
          </template>
        </v-list-item>
      </v-list>
      <v-divider v-if="gi === 0 && groups[1]?.items.length" class="my-2" />
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Accent, Assignment } from '@/types'
import { accentStyle } from './accent'

const props = defineProps<{ tasks: Assignment[] }>()

const kindIcon = (k: Assignment['kind']) =>
  ({ speech: 'mic', essay: 'edit_note', quiz: 'quiz', paper: 'description', project: 'folder_open' })[k]

const iconAccent = (k: Assignment['kind']): Accent =>
  ({ speech: 'orange', essay: 'green', quiz: 'blue', paper: 'purple', project: 'red' })[k] as Accent

const groups = computed(() => [
  { label: 'Today', items: props.tasks.filter((t) => !t.done && t.dueLabel === 'Due today') },
  { label: 'This week', items: props.tasks.filter((t) => !t.done && t.dueLabel !== 'Due today') },
])
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
}
.panel-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}
.group-label {
  margin: var(--nw-space-3) 0 var(--nw-space-1);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--nw-on-surface-variant);
}
.list {
  padding: 0;
  background: transparent;
}
.task {
  margin-bottom: 4px;
}
.task:hover {
  background: var(--nw-surface-container);
}
.task-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--nw-shape-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline-end: 4px;
}
.task-title {
  font-weight: 500;
  font-size: 0.92rem;
}
.chev {
  color: var(--nw-outline);
}
</style>
