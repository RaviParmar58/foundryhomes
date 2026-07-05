import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Admin - Foundry Homes',
  description: 'Blog management dashboard for Foundry Homes.',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
