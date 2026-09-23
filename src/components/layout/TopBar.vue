<template>
  <v-app-bar flat class="topbar">
    <v-app-bar-nav-icon class="d-lg-none" @click="emit('menu')" aria-label="Open navigation menu">
      <span class="material-symbols-rounded" aria-hidden="true">menu</span>
    </v-app-bar-nav-icon>

    <v-spacer />

    <v-menu location="bottom end" :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" aria-label="Notifications">
          <v-badge :content="unread" color="error" :model-value="unread > 0">
            <span class="material-symbols-rounded" aria-hidden="true">notifications</span>
          </v-badge>
        </v-btn>
      </template>
      <v-card min-width="320" max-width="360" rounded="lg">
        <v-card-title class="text-subtitle-1 font-weight-bold">Notifications</v-card-title>
        <v-divider />
        <v-list lines="two">
          <v-list-item v-for="n in notifications" :key="n.id" :class="{ unread: !n.read }">
            <v-list-item-title class="text-body-2 font-weight-medium">{{
              n.title
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption"
              >{{ n.body }} · {{ n.time }}</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu location="bottom end">
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="text" class="profile-btn" aria-label="Profile menu">
          <UserAvatar :name="student?.fullName" :color="student?.avatarColor" :size="36" />
          <span class="d-none d-md-flex flex-column align-start ml-2 profile-text">
            <strong>{{ student?.firstName }}</strong>
            <small class="text-secondary">{{ student?.grade }}</small>
          </span>
          <span class="material-symbols-rounded d-none d-md-block" aria-hidden="true"
            >expand_more</span
          >
        </v-btn>
      </template>
      <v-list min-width="220" rounded="lg">
        <v-list-item to="/settings">
          <template #prepend
            ><span class="material-symbols-rounded" aria-hidden="true">settings</span></template
          >
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item to="/certificates">
          <template #prepend
            ><span class="material-symbols-rounded" aria-hidden="true"
              >workspace_premium</span
            ></template
          >
          <v-list-item-title>My certificates</v-list-item-title>
        </v-list-item>
        <v-divider class="my-1" />
        <v-list-item @click="emit('sign-out')">
          <template #prepend
            ><span class="material-symbols-rounded" aria-hidden="true">logout</span></template
          >
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import UserAvatar from '@/components/common/UserAvatar.vue'
import type { AppNotification, Student } from '@/types'

const props = withDefaults(
  defineProps<{ student?: Student | null; notifications?: AppNotification[] }>(),
  { notifications: () => [] },
)
const emit = defineEmits<{ menu: []; 'sign-out': [] }>()

const router = useRouter()
const query = ref('')
const unread = computed(() => props.notifications.filter((n) => !n.read).length)

function goSearch() {
  router.push({ path: '/courses', query: query.value.trim() ? { q: query.value.trim() } : {} })
}
</script>

<style scoped>
.topbar {
  background: var(--nw-surface) !important;
  border-bottom: 1px solid var(--nw-outline-variant);
}
.topbar :deep(.v-toolbar__content) {
  gap: 4px;
}
.search {
  max-width: 560px; /* was 420px */
  width: 100%;
}
.search-icon {
  color: var(--nw-on-surface-variant);
}
.profile-btn {
  text-transform: none;
  min-height: 48px;
}
.profile-text {
  line-height: 1.2;
}
.profile-text small {
  font-size: 0.72rem;
}
.unread {
  background: var(--nw-primary-container);
}
</style>
