<template>
  <v-card class="hero" rounded="xl" elevation="0">
    <div class="hero-text">
      <p class="hero-eyebrow">{{ dateLine }}</p>
      <h1 class="hero-title">Welcome back, {{ firstName }}!</h1>
      <p class="hero-sub">Here's what you have planned for your learning journey today.</p>
      <div class="hero-stats">
        <div class="stat"><strong>{{ openTasks }}</strong><span>tasks due</span></div>
        <v-divider vertical />
        <div class="stat"><strong>{{ todayClasses }}</strong><span>classes today</span></div>
        <v-divider vertical />
        <div class="stat"><strong>{{ avgProgress }}%</strong><span>avg. progress</span></div>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <svg viewBox="0 0 220 160" role="presentation">
        <rect x="30" y="18" width="160" height="104" rx="12" fill="#ffffff" opacity="0.85" />
        <rect x="30" y="18" width="160" height="22" rx="12" fill="#0b57d0" opacity="0.15" />
        <circle cx="46" cy="29" r="4" fill="#0b57d0" opacity="0.5" />
        <rect x="58" y="25" width="60" height="8" rx="4" fill="#0b57d0" opacity="0.35" />
        <rect x="44" y="52" width="90" height="8" rx="4" fill="#0b57d0" opacity="0.3" />
        <rect x="44" y="66" width="120" height="8" rx="4" fill="#0b57d0" opacity="0.2" />
        <rect x="44" y="80" width="70" height="8" rx="4" fill="#0b57d0" opacity="0.25" />
        <rect x="44" y="98" width="52" height="14" rx="7" fill="#0b57d0" />
        <circle cx="172" cy="112" r="26" fill="#ffffff" opacity="0.9" />
        <path d="M162 112l7 7 13-14" stroke="#0b57d0" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="120" y="118" width="34" height="22" rx="4" fill="#715573" opacity="0.35" />
        <rect x="124" y="112" width="26" height="10" rx="2" fill="#715573" opacity="0.45" />
        <circle cx="70" cy="132" r="8" fill="#ffffff" opacity="0.7" />
        <circle cx="150" cy="34" r="5" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ firstName?: string; openTasks?: number; todayClasses?: number; avgProgress?: number }>(),
  { firstName: 'Student', openTasks: 0, todayClasses: 0, avgProgress: 0 },
)

const dateLine = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
)
</script>

<style scoped>
.hero {
  background: var(--nw-primary-container);
  color: var(--nw-on-primary-container);
  padding: var(--nw-space-6);
  display: flex;
  align-items: center;
  gap: var(--nw-space-6);
  overflow: hidden;
  position: relative;
}
.hero-text {
  flex: 1 1 auto;
  min-width: 0;
}
.hero-eyebrow {
  margin: 0 0 var(--nw-space-1);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.75;
}
.hero-title {
  margin: 0 0 var(--nw-space-2);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.hero-sub {
  margin: 0 0 var(--nw-space-4);
  font-size: 0.95rem;
  opacity: 0.85;
  max-width: 46ch;
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--nw-space-4);
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat strong {
  font-size: 1.25rem;
}
.stat span {
  font-size: 0.78rem;
  opacity: 0.75;
}
.hero-art {
  flex: none;
  width: 220px;
}
.hero-art svg {
  width: 100%;
  height: auto;
  display: block;
}
@media (max-width: 600px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--nw-space-5);
  }
  .hero-art {
    width: 160px;
    align-self: flex-end;
    margin-top: calc(-1 * var(--nw-space-4));
  }
}
</style>
