<template>
  <div class="auth">
    <div class="art-side">
      <div class="art-inner">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true">
            <span class="material-symbols-rounded" aria-hidden="true">local_library</span>
          </span>
          <strong>Beacon LMS</strong>
        </div>
        <h2 class="art-title">Learning that feels like home.</h2>
        <p class="art-sub">
          Courses, schedules, grades and certificates everything a student needs, in one calm place.
        </p>
        <AuthIllustration />
      </div>
    </div>
    <main class="form-side">
      <div class="form-card">
        <div class="brand-mobile">
          <span class="brand-mark" aria-hidden="true">
            <span class="material-symbols-rounded" aria-hidden="true">local_library</span>
          </span>
          <strong>Beacon LMS</strong>
        </div>
        <h1>Welcome back</h1>
        <p class="text-secondary sub">Sign in to continue learning.</p>

        <v-form v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            label="Email address"
            type="email"
            autocomplete="email"
            :rules="[required, emailRule]"
            class="mb-2"
          >
            <template #prepend-inner>
              <span class="material-symbols-rounded field-icon" aria-hidden="true">mail</span>
            </template>
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            autocomplete="current-password"
            :type="show ? 'text' : 'password'"
            :rules="[required, minRule]"
          >
            <template #prepend-inner>
              <span class="material-symbols-rounded field-icon" aria-hidden="true">lock</span>
            </template>
            <template #append-inner>
              <v-btn
                icon
                variant="text"
                size="small"
                :aria-label="show ? 'Hide password' : 'Show password'"
                @click="show = !show"
              >
                <span class="material-symbols-rounded field-icon" aria-hidden="true">
                  {{ show ? 'visibility_off' : 'visibility' }}
                </span>
              </v-btn>
            </template>
          </v-text-field>
          <div class="row-between">
            <v-checkbox
              v-model="remember"
              label="Remember me"
              color="primary"
              hide-details
              density="comfortable"
              class="remember"
            />
            <RouterLink to="/login" class="link" @click.prevent="hint">Forgot password?</RouterLink>
          </div>
          <v-alert
            v-if="notice"
            type="info"
            variant="tonal"
            rounded="lg"
            class="mb-3"
            role="status"
          >
            {{ notice }}
          </v-alert>
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            size="large"
            block
            :loading="session.busy"
            :disabled="!valid"
          >
            Sign in
          </v-btn>
        </v-form>

        <p class="signup">
          Don't have an account?
          <RouterLink to="/register" class="link">Create account</RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthIllustration from '@/components/auth/AuthIllustration.vue'
import { useSessionStore } from '@/stores/session'

const session = useSessionStore()
const router = useRouter()

const valid = ref(false)
const email = ref('')
const password = ref('')
const show = ref(false)
const remember = ref(false)
const notice = ref('')

const required = (v: string) => !!v || 'This field is required.'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email address.'
const minRule = (v: string) => (v && v.length >= 6) || 'Use at least 6 characters.'

async function submit() {
  notice.value = ''
  await session.signIn(email.value.trim(), remember.value)
  router.push('/dashboard')
}

function hint() {
  notice.value = 'Password reset is not enabled in this demo. Any 6+ character password works.'
}
</script>

<style scoped>
.auth {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
}
.art-side {
  display: none;
  background: var(--nw-primary-container);
  color: var(--nw-on-primary-container);
  padding: var(--nw-space-10);
}
@media (min-width: 1024px) {
  .auth {
    grid-template-columns: 1fr 1fr;
  }
  .art-side {
    display: flex;
  }
}
.art-inner {
  margin: auto;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: var(--nw-space-4);
}
.brand,
.brand-mobile {
  display: flex;
  align-items: center;
  gap: var(--nw-space-2);
  font-size: 1.05rem;
}
.brand-mobile {
  margin-bottom: var(--nw-space-4);
}
@media (min-width: 1024px) {
  .brand-mobile {
    display: none;
  }
}
.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--nw-shape-md);
  background: var(--nw-primary);
  color: var(--nw-on-primary);
  font-weight: 700;
}
.art-title {
  margin: 0;
  font-size: 1.9rem;
  letter-spacing: -0.01em;
}
.art-sub {
  margin: 0;
  opacity: 0.85;
}
.form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--nw-space-6) var(--nw-space-4);
  background: var(--nw-surface-container-lowest);
}
.form-card {
  width: 100%;
  max-width: 400px;
}
.form-card h1 {
  margin: 0 0 4px;
  font-size: 1.75rem;
  letter-spacing: -0.01em;
}
.sub {
  margin: 0 0 var(--nw-space-5);
}
.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--nw-space-4);
}
.link {
  color: var(--nw-primary);
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
}
.link:hover {
  text-decoration: underline;
}
.signup {
  margin-top: var(--nw-space-4);
  text-align: center;
  font-size: 0.9rem;
}
.field-icon {
  color: var(--nw-on-surface-variant);
  font-size: 22px;
}
.brand-mark .material-symbols-rounded {
  font-size: 22px;
}
.remember {
  margin-inline-start: -12px;
  min-height: 48px;
}
.remember :deep(.v-label) {
  font-size: 0.9rem;
  opacity: 1;
}
.remember :deep(.v-selection-control) {
  min-height: 48px;
}
</style>
