<template>
  <span class="user-avatar" :style="{ background: color }" aria-hidden="true">{{ initials }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ name?: string; color?: string; size?: number }>(), {
  name: 'Student',
  color: '#0b57d0',
  size: 40,
})

const initials = computed(() =>
  props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join(''),
)
</script>

<style scoped>
.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
  border-radius: var(--nw-shape-full);
  color: #fff;
  font-weight: 500;
  font-size: calc(v-bind(size + 'px') * 0.38);
  flex: none;
}
</style>
