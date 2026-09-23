import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { lmsRepo } from '@/repositories/lmsRepo'
import type { Student } from '@/types'

const KEY = 'northwood_session'

function readStored(): Student | null {
  try {
    // "Remember me" sessions live in localStorage; unchecked ones in sessionStorage.
    const raw = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Student) : null
  } catch {
    return null
  }
}

export const useSessionStore = defineStore('session', () => {
  const student = ref<Student | null>(readStored())
  const busy = ref(false)

  const isSignedIn = computed(() => student.value !== null)

  function persist(s: Student | null, remember = true) {
    student.value = s
    localStorage.removeItem(KEY)
    sessionStorage.removeItem(KEY)
    if (s) (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(s))
  }

  async function signIn(email: string, remember = true) {
    busy.value = true
    try {
      persist(await lmsRepo.signIn(email), remember)
    } finally {
      busy.value = false
    }
  }

  async function signUp(fullName: string, email: string, remember = true) {
    busy.value = true
    try {
      persist(await lmsRepo.signUp(fullName, email), remember)
    } finally {
      busy.value = false
    }
  }

  function signOut() {
    persist(null)
  }

  return { student, busy, isSignedIn, signIn, signUp, signOut }
})
