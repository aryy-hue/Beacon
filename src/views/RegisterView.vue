<template>
  <div class="auth">
    <div class="art-side">
      <div class="art-glow" aria-hidden="true">
        <span class="blob blob-a"></span>
        <span class="blob blob-b"></span>
        <span class="blob blob-c"></span>
      </div>
      <div class="art-inner">
        <div class="brand anim-rise" style="--i: 0">
          <span class="brand-mark" aria-hidden="true">
            <span class="material-symbols-rounded" aria-hidden="true">local_library</span>
          </span>
          <strong>Beacon LMS</strong>
        </div>
        <h2 class="art-title anim-rise" style="--i: 1">
          Join 12,000+ students learning with Beacon LMS.
        </h2>
        <p class="art-sub anim-rise" style="--i: 2">
          Create your account in under a minute and pick up right where your class left off.
        </p>
        <div class="anim-rise" style="--i: 3">
          <AuthIllustration />
        </div>
      </div>
    </div>
    <main class="form-side">
      <div class="form-card">
        <div class="brand-mobile anim-rise" style="--i: 0">
          <span class="brand-mark" aria-hidden="true">
            <span class="material-symbols-rounded" aria-hidden="true">local_library</span>
          </span>
          <strong>Beacon LMS</strong>
        </div>
        <h1 class="anim-rise" style="--i: 1">Create account</h1>
        <p class="text-secondary sub anim-rise" style="--i: 2">
          Start your learning journey today.
        </p>

        <v-form v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="fullName"
            label="Full name"
            autocomplete="name"
            :rules="[required]"
            class="mb-1 anim-rise"
            style="--i: 3"
          />
          <v-row dense class="anim-rise" style="--i: 4">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="studentId"
                label="Student ID"
                placeholder="NW-2026-0000"
                :rules="[required]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="grade" label="Class / Grade" :items="grades" :rules="[required]" />
            </v-col>
          </v-row>
          <v-text-field
            v-model="email"
            label="Email address"
            type="email"
            autocomplete="email"
            :rules="[required, emailRule]"
            class="mb-1 anim-rise"
            style="--i: 5"
          />
          <v-row dense class="anim-rise" style="--i: 6">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="password"
                label="Password"
                autocomplete="new-password"
                :type="show ? 'text' : 'password'"
                :rules="[required, minRule]"
              >
                <template #append-inner>
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    class="toggle"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    @click="show = !show"
                  >
                    <Transition name="eye" mode="out-in">
                      <span
                        :key="show ? 'hide' : 'show'"
                        class="material-symbols-rounded field-icon eye"
                        aria-hidden="true"
                      >
                        {{ show ? 'visibility_off' : 'visibility' }}
                      </span>
                    </Transition>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="confirm"
                label="Confirm password"
                autocomplete="new-password"
                :type="show ? 'text' : 'password'"
                :rules="[required, matchRule]"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="school"
            label="School (optional)"
            class="mb-4 anim-rise"
            style="--i: 7"
          />
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            size="large"
            block
            class="submit anim-rise"
            style="--i: 8"
            :class="{ 'is-done': done }"
            :loading="session.busy"
            :disabled="!valid || done"
          >
            <span class="submit-label">Create account</span>
            <span class="material-symbols-rounded submit-check" aria-hidden="true">check</span>
          </v-btn>
        </v-form>

        <p class="signup anim-fade" style="--i: 9">
          Already have an account?
          <RouterLink to="/login" class="link">Sign in</RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthIllustration from '@/components/auth/AuthIllustration.vue'
import { useSessionStore } from '@/stores/session'

const session = useSessionStore()
const router = useRouter()

const valid = ref(false)
const fullName = ref('')
const studentId = ref('')
const grade = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const school = ref('')
const show = ref(false)
const done = ref(false)
let disposed = false

onBeforeUnmount(() => {
  disposed = true
})

const grades = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']

const required = (v: string) => !!v || 'This field is required.'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email address.'
const minRule = (v: string) => (v && v.length >= 6) || 'Use at least 6 characters.'
const matchRule = (v: string) => v === password.value || 'Passwords do not match.'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function submit() {
  await session.signUp(fullName.value.trim(), email.value.trim())
  // Celebrate the sign-up before leaving the page, but never trap the user
  // here: if the view unmounts mid-animation, skip straight to the redirect.
  done.value = true
  await wait(650)
  if (!disposed) router.push('/dashboard')
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
  position: relative;
  overflow: hidden;
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
/* Drifting colour wash behind the marketing panel */
.art-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.blob {
  position: absolute;
  border-radius: var(--nw-shape-full);
  filter: blur(46px);
  opacity: 0.55;
}
.blob-a {
  width: 320px;
  height: 320px;
  top: -90px;
  right: -70px;
  background: #ffffff;
  animation: nw-drift 13s ease-in-out infinite;
}
.blob-b {
  width: 260px;
  height: 260px;
  bottom: -80px;
  left: -60px;
  background: var(--nw-tertiary-container);
  animation: nw-sway 17s ease-in-out infinite;
}
.blob-c {
  width: 180px;
  height: 180px;
  top: 45%;
  left: 38%;
  background: var(--nw-pastel-teal-bg);
  opacity: 0.4;
  animation: nw-drift 15s ease-in-out 1.2s infinite reverse;
}
.art-inner {
  position: relative;
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
  max-width: 480px;
}
.form-card h1 {
  margin: 0 0 4px;
  font-size: 1.75rem;
  letter-spacing: -0.01em;
}
.sub {
  margin: 0 0 var(--nw-space-5);
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

/* Password visibility toggle: cross-fade the two glyphs */
.toggle {
  position: relative;
}
.eye {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.eye-enter-active,
.eye-leave-active {
  transition:
    opacity var(--nw-motion-fast),
    transform var(--nw-motion-fast);
}
.eye-enter-from {
  opacity: 0;
  transform: scale(0.55) rotate(-25deg);
}
.eye-leave-to {
  opacity: 0;
  transform: scale(0.55) rotate(25deg);
}

/* Submit button: label swaps to a checkmark on success */
.submit {
  position: relative;
  overflow: hidden;
  transition:
    background-color var(--nw-motion-med),
    color var(--nw-motion-med);
}
.submit-label {
  transition:
    opacity var(--nw-motion-fast),
    transform var(--nw-motion-fast),
    visibility var(--nw-motion-fast);
}
.submit-check {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity var(--nw-motion-med),
    transform var(--nw-motion-emphasized);
}
.submit.is-done {
  background-color: var(--nw-pastel-green-bg);
  color: var(--nw-pastel-green-fg);
}
.submit.is-done .submit-label {
  opacity: 0;
  visibility: hidden;
  transform: scale(0.85);
}
.submit.is-done .submit-check {
  opacity: 1;
  transform: scale(1);
}
</style>
