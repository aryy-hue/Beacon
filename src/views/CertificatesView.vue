<template>
  <div class="page">
    <h1 class="page-title">Certificates</h1>
    <p class="text-secondary page-sub">Your verified achievements, ready to share.</p>
    <LoadingState v-if="loading" label="Loading certificates…" />
    <div v-else-if="items.length" class="grid">
      <v-card v-for="a in items" :key="a.id" :id="a.id" class="cert lift" rounded="xl" elevation="0">
        <div class="cert-head" :style="accentStyle(a.accent)">
          <span class="material-symbols-rounded cert-icon" aria-hidden="true">{{ a.icon }}</span>
          <small>Northwood · Certificate of Completion</small>
          <strong>{{ a.courseName }}</strong>
          <span>Awarded to {{ studentName }}</span>
        </div>
        <v-card-text>
          <p class="cert-title">{{ a.title }}</p>
          <p class="cert-sub">{{ a.description }} · {{ a.date }}</p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn variant="tonal" color="primary" size="small" class="text-none" @click="open(a)">
            View Certificate
          </v-btn>
          <v-btn variant="text" size="small" class="text-none" @click="open(a)">Verify</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <EmptyState v-else icon="workspace_premium" title="No certificates yet" description="Finish a course to earn your first certificate." />

    <v-dialog v-model="dialog" max-width="480">
      <v-card v-if="active" rounded="xl" class="dlg">
        <div class="cert-head dlg-head" :style="accentStyle(active.accent)">
          <span class="material-symbols-rounded cert-icon" aria-hidden="true">{{ active.icon }}</span>
          <small>Northwood · Certificate of Completion</small>
          <strong>{{ active.courseName }}</strong>
          <span>Awarded to {{ studentName }}</span>
        </div>
        <v-card-text class="pt-4">
          <p class="cert-title">{{ active.title }}</p>
          <p class="cert-sub">{{ active.description }}</p>
          <p class="cert-meta">Certificate no. NW-2026-{{ active.id.toUpperCase() }} · Issued {{ active.date }}</p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" class="text-none" @click="dialog = false">Close</v-btn>
          <v-btn variant="flat" color="primary" class="text-none" @click="dialog = false">Download</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LoadingState from '@/components/common/LoadingState.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { accentStyle } from '@/components/dashboard/accent'
import { lmsRepo } from '@/repositories/lmsRepo'
import { useSessionStore } from '@/stores/session'
import type { Achievement } from '@/types'

const session = useSessionStore()
const studentName = computed(() => session.student?.fullName ?? 'Student')

const loading = ref(true)
const items = ref<Achievement[]>([])
const dialog = ref(false)
const active = ref<Achievement | null>(null)

function open(a: Achievement) {
  active.value = a
  dialog.value = true
}

onMounted(async () => {
  items.value = await lmsRepo.getAchievements()
  loading.value = false
  const hash = window.location.hash.slice(1)
  if (hash) {
    const hit = items.value.find((a) => a.id === hash)
    if (hit) open(hit)
  }
})
</script>

<style scoped>
.page-title {
  margin: 0 0 4px;
  font-size: 1.5rem;
  font-weight: 700;
}
.page-sub {
  margin: 0 0 var(--nw-space-4);
}
.grid {
  display: grid;
  gap: var(--nw-space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 700px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
.cert {
  border: 1px solid var(--nw-outline-variant);
  overflow: hidden;
}
.cert-head {
  padding: var(--nw-space-5);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cert-icon {
  font-size: 40px;
  margin-bottom: var(--nw-space-2);
}
.cert-head small {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.75;
}
.cert-head strong {
  font-size: 1.15rem;
}
.cert-title {
  margin: 0 0 2px;
  font-weight: 700;
}
.cert-sub {
  margin: 0;
  font-size: 0.85rem;
  color: var(--nw-on-surface-variant);
}
.cert-meta {
  margin: var(--nw-space-3) 0 0;
  font-size: 0.8rem;
  color: var(--nw-on-surface-variant);
}
.dlg-head {
  border-radius: var(--nw-shape-xl) var(--nw-shape-xl) 0 0;
}
</style>
