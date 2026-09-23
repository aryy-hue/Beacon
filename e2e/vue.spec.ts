import { test, expect } from '@playwright/test'

// Mock session helper: sign in through the UI once per test.
async function signIn(page) {
  await page.goto('/login')
  await page.getByRole('textbox', { name: 'Email address' }).fill('arya.pratama@northwood.school')
  await page.getByRole('textbox', { name: 'Password' }).fill('password123')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL(/\/dashboard/)
}

test('root redirects guests to login', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/login/)
  await expect(page.locator('h1')).toContainText('Welcome back')
})

test('mock sign-in lands on the student dashboard', async ({ page }) => {
  await signIn(page)
  await expect(page.locator('h1')).toContainText('Welcome back, Arya!')
  await expect(page.getByRole('heading', { name: 'My Courses' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'My Schedule' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Upcoming Tasks' })).toBeVisible()
})

test('dashboard route redirects to login when signed out', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login/)
})

test('nav rail reaches courses and assignments', async ({ page }) => {
  await signIn(page)
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await nav.getByRole('link', { name: 'Courses' }).click()
  await expect(page.locator('h1')).toContainText('Courses')
  await nav.getByRole('link', { name: 'Assignments' }).click()
  await expect(page.locator('h1')).toContainText('Assignments')
})
