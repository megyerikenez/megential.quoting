const hufFormat = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 })

/** Amount formatted like 3 850 000 Ft. */
export function formatHuf(value: number): string {
  return `${hufFormat.format(value)} Ft`
}

/** Range display: 3 850 000 – 4 650 000 Ft. */
export function formatRange(range: { min: number; max: number }): string {
  return `${hufFormat.format(range.min)} – ${hufFormat.format(range.max)} Ft`
}

/** Compact range for tight spaces: 3,85 – 4,65 M Ft. */
export function formatRangeCompact(range: { min: number; max: number }): string {
  const m = (v: number) => (v / 1_000_000).toLocaleString('hu-HU', { maximumFractionDigits: 2 })
  return `${m(range.min)} – ${m(range.max)} M Ft`
}

/** Even tighter variant for the mobile bottom bar: 3,9–4,7 M Ft. */
export function formatRangeBar(range: { min: number; max: number }): string {
  const m = (v: number) =>
    (v / 1_000_000).toLocaleString('hu-HU', { maximumFractionDigits: 1 })
  return `${m(range.min)}–${m(range.max)} M Ft`
}

/** Weeks range, e.g. „6–8 hét”; half weeks as „5,5–7,5 hét”. */
export function formatWeeks(range: { min: number; max: number }): string {
  const w = (v: number) => v.toLocaleString('hu-HU', { maximumFractionDigits: 1 })
  return `${w(range.min)} – ${w(range.max)} hét`
}

/** Floor area formatted like 68 m². */
export function formatArea(value: number): string {
  return `${value.toLocaleString('hu-HU')} m²`
}
