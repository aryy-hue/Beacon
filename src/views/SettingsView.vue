<template>
  <div class="page narrow">
    <h1 class="page-title">Settings</h1>
    <p class="text-secondary page-sub">Manage your profile and preferences.</p>

    <v-card rounded="xl" elevation="0" class="card">
      <div class="profile-row">
        <UserAvatar :name="form.fullName" :color="student?.avatarColor" :size="64" />
        <div>
          <strong class="name">{{ form.fullName }}</strong>
          <p class="text-secondary sub">{{ student?.studentId }} · {{ student?.grade }}</p>
        </div>
      </div>
      <v-form v-model="valid" @submit.prevent="save">
        <v-text-field v-model="form.fullName" label="Full name" :rules="[required]" class="mb-2" />
        <v-text-field v-model="form.email" label="Email address" type="email" :rules="[required, emailRule]" class="mb-2" />
        <v-text-field v-model="form.school" label="School" :rules="[required]" class="mb-4" />
        <v-btn type="submit" color="primary" variant="flat" :disabled="!valid" :loading="saving">
          Save changes
        </v-btn>
      </v-form>
      <v-alert v-if="saved" type="success" variant="tonal" rounded="lg" class="mt-4" role="status">
        Profile saved successfully.
      </v-alert>
    </v-card>

    <v-card rounded="xl" elevation="0" class="card">
      <h2 class="card-title">Preferences</h2>
      <div class="pref-row">
        <div>
          <strong>Dark mode</strong>
          <p class="text-secondary sub">Switch between light and dark theme.</p>
        </div>
        <v-switch v-model="dark" color="primary" hide-details aria-label="Dark mode" @update:model-value="applyTheme" />
      </div>
      <v-divider class="my-3" />
      <div class="pref-row">
        <div>
          <strong>Email notifications</strong>
          <p class="text-secondary sub">Get deadline reminders by email.</p>
        </div>
        <v-switch v-model="emailNotif" color="primary" hide-details aria-label="Email notifications" />
      </div>
    </v-card>

    <v-card rounded="xl" elevation="0" class="card">
      <h2 class="card-title">Account</h2>
      <v-btn variant="tonal" color="error" class="text-none" @click="signOut">
        <span class="material-symbols-rounded" aria-hidden="true">logout</span>
        Log Out
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { useSessionStore } from '@/stores/session'

const session = useSessionStore()
const router = useRouter()
const theme = useTheme()

const student = session.student
const valid = ref(false)
const saving = ref(false)
const saved = ref(false)
const form = reactive({
  fullName: student?.fullName ?? '',
  email: student?.email ?? '',
  school: student?.school ?? '',
})
const dark = ref(theme.global.name.value === 'schoolDark')
const emailNotif = ref(true)

const required = (v: string) => !!v || 'This field is required.'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email address.'

function applyTheme() {
  const next = dark.value ? 'schoolDark' : 'schoolLight'
  theme.global.name.value = next
  localStorage.setItem('northwood_theme', next)
  document.documentElement.classList.toggle('dark', dark.value)
  document.documentElement.classList.toggle('beacon-dark', dark.value)
}

function save() {
  saving.value = true
  saved.value = false
  setTimeout(() => {
    if (session.student) {
      session.student = { ...session.student, fullName: form.fullName, email: form.email, school: form.school }
      localStorage.setItem('northwood_session', JSON.stringify(session.student))
    }
    saving.value = false
    saved.value = true
  }, 500)
}

function signOut() {
  session.signOut()
  router.push('/login')
}

onMounted(() => {
  const stored = localStorage.getItem('northwood_theme')
  if (stored === 'schoolDark' || stored === 'schoolLight') {
    theme.global.name.value = stored
    dark.value = stored === 'schoolDark'
    document.documentElement.classList.toggle('dark', dark.value)
  }
})
</script>

<style scoped>
.narrow {
  max-width: 720px;
}
.page-title {
  margin: 0 0 4px;
  font-size: 1.5rem;
  font-weight: 700;
}
.page-sub {
  margin: 0 0 var(--nw-space-4);
}
.card {
  border: 1px solid var(--nw-outline-variant);
  padding: var(--nw-space-5);
  margin-bottom: var(--nw-space-4);
}
.card-title {
  margin: 0 0 var(--nw-space-3);
  font-size: 1.05rem;
}
.profile-row {
  display: flex;
  align-items: center;
  gap: var(--nw-space-4);
  margin-bottom: var(--nw-space-4);
}
.name {
  font-size: 1.1rem;
}
.sub {
  margin: 2px 0 0;
  font-size: 0.85rem;
}
.pref-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--nw-space-4);
}
</style>
