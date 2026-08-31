/**
 * Local, deterministic request reference, e.g. `MRT-260830-4K7`.
 * Identical submissions produce identical references — no randomness.
 */

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

function fnv1a(input: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

function datePart(date: Date): string {
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}${mm}${dd}`
}

export function generateReference(seed: { name: string; email: string; min: number; max: number }, date: Date = new Date()): string {
  let hash = fnv1a(`${datePart(date)}|${seed.name}|${seed.email}|${seed.min}|${seed.max}`)
  let suffix = ''
  for (let i = 0; i < 3; i++) {
    suffix += ALPHABET[hash % ALPHABET.length]
    hash = Math.imul(hash ^ (hash >>> 13), 0x5bd1e995) >>> 0
  }
  return `MRT-${datePart(date)}-${suffix}`
}
