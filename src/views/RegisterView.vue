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
        <h2 class="art-title">Join 12,000+ students learning with Beacon LMS.</h2>
        <p class="art-sub">
          Create your account in under a minute and pick up right where your class left off.
        </p>
        <AuthIllustration />
      </div>
    </div>
    <main class="form-side">
      <div class="form-card">
        <div class="brand-mobile">
          <span class="brand-mark" aria-hidden="true">N</span>
          <strong>Beacon LMS</strong>
        </div>
        <h1>Create account</h1>
        <p class="text-secondary sub">Start your learning journey today.</p>

        <v-form v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="fullName"
            label="Full name"
            autocomplete="name"
            :rules="[required]"
            class="mb-1"
          />
          <v-row dense>
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
            class="mb-1"
          />
          <v-row dense>
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
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    @click="show = !show"
                  >
                    <span class="material-symbols-rounded field-icon" aria-hidden="true">
                      {{ show ? 'visibility_off' : 'visibility' }}
                    </span>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="confirm"
                label="Confirm password"
                autocomplete="new-password"
                type="password"
                :rules="[required, matchRule]"
              />
            </v-col>
          </v-row>
          <v-text-field v-model="school" label="School (optional)" class="mb-4" />
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            size="large"
            block
            :loading="session.busy"
            :disabled="!valid"
          >
            Create account
          </v-btn>
        </v-form>

        <p class="signup">
          Already have an account?
          <RouterLink to="/login" class="link">Sign in</RouterLink>
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
const fullName = ref('')
const studentId = ref('')
const grade = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const school = ref('')
const show = ref(false)

const grades = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']

const required = (v: string) => !!v || 'This field is required.'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email address.'
const minRule = (v: string) => (v && v.length >= 6) || 'Use at least 6 characters.'
const matchRule = (v: string) => v === password.value || 'Passwords do not match.'

async function submit() {
  await session.signUp(fullName.value.trim(), email.value.trim())
  router.push('/dashboard')
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
</style>
