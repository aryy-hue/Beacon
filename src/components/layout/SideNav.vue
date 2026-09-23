<template>
  <div>
    <v-list nav class="nav-list" aria-label="Primary">
      <v-list-item
        v-for="item in mainItems"
        :key="item.to"
        :to="item.to"
        rounded="lg"
        class="nav-item"
        active-class="nav-active"
      >
        <template #prepend>
          <span class="material-symbols-rounded nav-icon" :class="{ fill: isActive(item.to) }" aria-hidden="true">
            {{ item.icon }}
          </span>
        </template>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
        <template v-if="item.badge" #append>
          <v-badge :content="item.badge" color="error" inline />
        </template>
      </v-list-item>
    </v-list>
    <v-divider class="my-2" />
    <v-list nav aria-label="Account">
      <v-list-item to="/settings" rounded="lg" class="nav-item" active-class="nav-active">
        <template #prepend>
          <span class="material-symbols-rounded nav-icon" :class="{ fill: isActive('/settings') }" aria-hidden="true">settings</span>
        </template>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <v-list-item rounded="lg" class="nav-item" @click="emit('sign-out')">
        <template #prepend>
          <span class="material-symbols-rounded nav-icon" aria-hidden="true">logout</span>
        </template>
        <v-list-item-title>Log Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const emit = defineEmits<{ 'sign-out': [] }>()

const mainItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/schedule', label: 'Class Schedule', icon: 'calendar_month' },
  { to: '/courses', label: 'Courses', icon: 'book' },
  { to: '/assignments', label: 'Assignments', icon: 'assignment', badge: '4' },
  { to: '/resources', label: 'Resources', icon: 'folder' },
  { to: '/grades', label: 'Grades', icon: 'grade' },
  { to: '/certificates', label: 'Certificates', icon: 'workspace_premium' },
]

const route = useRoute()
function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}
</script>

<style scoped>
.nav-list {
  padding: var(--nw-space-2);
}
.nav-item {
  margin-bottom: 2px;
  min-height: 48px;
}
.nav-item :deep(.v-list-item-title) {
  font-size: 0.9rem;
  font-weight: 500;
}
.nav-icon {
  font-size: 22px;
  color: var(--nw-on-surface-variant);
  margin-inline-end: 12px;
}
.nav-active {
  background: var(--nw-primary-container) !important;
  color: var(--nw-on-primary-container) !important;
}
.nav-active .nav-icon {
  color: var(--nw-on-primary-container);
}
.nav-active :deep(.v-list-item-title) {
  font-weight: 700;
}
</style>
