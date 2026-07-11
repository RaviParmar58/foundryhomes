'use client'

import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'

/**
 * Mounts the shared page behaviours (navbar scroll state, burger menu,
 * reveal-on-scroll, counters) on routes that are server components and
 * therefore can't call the hook themselves (model detail pages, blog
 * article pages). Render exactly once per page, and never on pages that
 * already call useFoundryAnimations directly - the handlers would bind twice.
 */
export default function PageFx() {
  useFoundryAnimations()
  return null
}
