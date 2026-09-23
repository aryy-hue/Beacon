import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import AppShell from '@/components/layout/AppShell.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', meta: { guest: true }, component: () => import('@/views/LoginView.vue') },
    { path: '/register', name: 'register', meta: { guest: true }, component: () => import('@/views/RegisterView.vue') },
    {
      path: '/',
      component: AppShell,
      meta: { auth: true },
      children: [
        { path: 'dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
        { path: 'schedule', name: 'schedule', component: () => import('@/views/ScheduleView.vue') },
        { path: 'courses', name: 'courses', component: () => import('@/views/CoursesView.vue') },
        { path: 'assignments', name: 'assignments', component: () => import('@/views/AssignmentsView.vue') },
        { path: 'resources', name: 'resources', component: () => import('@/views/ResourcesView.vue') },
        { path: 'grades', name: 'grades', component: () => import('@/views/GradesView.vue') },
        { path: 'certificates', name: 'certificates', component: () => import('@/views/CertificatesView.vue') },
        { path: 'settings', name: 'settings', component: () => import('@/views/SettingsView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
})

router.beforeEach((to) => {
  const session = useSessionStore()
  if (to.meta.auth && !session.isSignedIn) return { name: 'login' }
  if (to.meta.guest && session.isSignedIn) return { name: 'dashboard' }
  return true
})

export default router
