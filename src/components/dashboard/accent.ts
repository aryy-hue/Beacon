// Maps an Accent token to pastel background/foreground CSS variables.
import type { Accent } from '@/types'

const map: Record<Accent, { bg: string; fg: string }> = {
  blue: { bg: 'var(--nw-pastel-blue-bg)', fg: 'var(--nw-pastel-blue-fg)' },
  purple: { bg: 'var(--nw-pastel-purple-bg)', fg: 'var(--nw-pastel-purple-fg)' },
  orange: { bg: 'var(--nw-pastel-orange-bg)', fg: 'var(--nw-pastel-orange-fg)' },
  green: { bg: 'var(--nw-pastel-green-bg)', fg: 'var(--nw-pastel-green-fg)' },
  red: { bg: 'var(--nw-pastel-red-bg)', fg: 'var(--nw-pastel-red-fg)' },
  teal: { bg: 'var(--nw-pastel-teal-bg)', fg: 'var(--nw-pastel-teal-fg)' },
}

export function accentStyle(accent: Accent): Record<string, string> {
  const a = map[accent]
  return { background: a.bg, color: a.fg }
}
