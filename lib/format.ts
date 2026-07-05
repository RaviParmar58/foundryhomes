export const fmtDate = (d: string | Date): string =>
  new Date(d).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })

export const fmtMonthYear = (d: string | Date): string =>
  new Date(d).toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' })

export const todayISODate = (): string => new Date().toISOString().slice(0, 10)

export const readTimeFromContent = (html: string): string => {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}
