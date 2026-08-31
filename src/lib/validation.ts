import type { ContactInfo } from '../types/calculator'

export type ContactField = 'name' | 'email' | 'phone'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Validates a Hungarian phone number leniently:
 * accepts +36 / 06 prefixes, spaces, dashes and parentheses.
 * After stripping, 8–9 digits of a Hungarian number must remain.
 */
export function isValidHungarianPhone(value: string): boolean {
  let digits = value.replace(/[\s.\-()/]/g, '')
  if (digits.startsWith('+36')) digits = digits.slice(3)
  else if (digits.startsWith('36')) digits = digits.slice(2)
  else if (digits.startsWith('06')) digits = digits.slice(2)

  if (!/^\d+$/.test(digits)) return false
  if (digits.length < 8 || digits.length > 9) return false

  // Mobile (20/30/31/50/70) or Budapest landline (1) prefix.
  return /^(1|20|30|31|50|70)/.test(digits)
}

export function validateContact(contact: ContactInfo): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {}

  const name = contact.name.trim()
  if (name.length < 2) {
    errors.name = 'Add meg a neved.'
  } else if (!/^[\p{L}\s.\-']+$/u.test(name)) {
    errors.name = 'A név csak betűket és írásjeleket tartalmazhat.'
  }

  const email = contact.email.trim()
  if (email.length === 0) {
    errors.email = 'Add meg az e-mail-címed.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Ez nem tűnik érvényes e-mail-címnek.'
  }

  const phone = contact.phone.trim()
  if (phone.length === 0) {
    errors.phone = 'Add meg a telefonszámod.'
  } else if (!isValidHungarianPhone(phone)) {
    errors.phone = 'Add meg érvényes magyar telefonszámot, pl. +36 30 123 4567.'
  }

  return errors
}
