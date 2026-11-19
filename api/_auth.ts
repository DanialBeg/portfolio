import { createHash, timingSafeEqual } from 'node:crypto'

// Compares a submitted password with ADMIN_PASSWORD without leaking timing.
export function isAdmin(password: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || !password) return false
  const a = createHash('sha256').update(password).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

// Photo folder ids look like "1732000000000-k3j9x2"
export const ID_PATTERN = /^[0-9]{10,16}-[a-z0-9]{4,12}$/
