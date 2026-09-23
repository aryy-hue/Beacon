<template>
  <v-app class="shell">
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail && !mobile"
      :permanent="!mobile"
      :temporary="mobile"
      width="264"
      rail-width="80"
      class="sidenav"
      aria-label="Main navigation"
    >
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">
          <span class="material-symbols-rounded" aria-hidden="true">local_library</span>
        </span>
        <span v-if="!rail || mobile" class="brand-name">Beacon</span>
      </div>
      <SideNav @sign-out="signOut" />
    </v-navigation-drawer>

    <TopBar
      :student="student"
      :notifications="notifications"
      @menu="drawer = !drawer"
      @sign-out="signOut"
    />

    <v-main class="main">
      <RouterView />
    </v-main>

    <MobileNav />
  </v-app>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useSessionStore } from '@/stores/session'
import SideNav from './SideNav.vue'
import TopBar from './TopBar.vue'
import MobileNav from './MobileNav.vue'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { AppNotification } from '@/types'

const session = useSessionStore()
const router = useRouter()
const { mobile, mdAndDown } = useDisplay()

const student = computed(() => session.student)
const drawer = ref(!mobile.value)
const rail = computed(() => mdAndDown.value && !mobile.value)

const notifications = ref<AppNotification[]>([])
lmsRepo.getNotifications().then((n) => (notifications.value = n))

function signOut() {
  session.signOut()
  router.push('/login')
}
</script>

<style scoped>
.shell {
  background: var(--nw-surface);
}
.sidenav {
  background: var(--nw-surface-container-low) !important;
  border-right: 1px solid var(--nw-outline-variant);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--nw-space-3);
  padding: var(--nw-space-4) var(--nw-space-4) var(--nw-space-2);
}
.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--nw-shape-md);
  background: var(--nw-primary);
  color: var(--nw-on-primary);
  font-weight: 700;
  font-size: 1.2rem;
}
.brand-name {
  font-weight: 700;
  font-size: 1.1rem;
  white-space: nowrap;
}
.main {
  padding-bottom: 88px;
}
@media (min-width: 1280px) {
  .main {
    padding-bottom: var(--nw-space-6);
  }
}
</style>
