import type { Category } from '@prisma/client'

export const CATEGORY_LABELS: Record<Category, string> = {
  BUILDING_TIPS: 'Building Tips',
  DESIGN: 'Design',
  STEEL_FRAMING: 'Steel Framing',
  FINANCE: 'Finance',
  CASE_STUDIES: 'Case Studies',
  INDUSTRY_INSIGHTS: 'Industry Insights',
}

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS) as [Category, string][]
