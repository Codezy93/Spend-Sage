const SESSION_COOKIE_NAME = 'spendsage-auth'
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function isBrowser() {
  return typeof document !== 'undefined'
}

function buildCookie(value, maxAgeSeconds = DEFAULT_MAX_AGE) {
  const isSecure = typeof window !== 'undefined' && window?.location?.protocol === 'https:'
  const secureFlag = isSecure ? '; Secure' : ''
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secureFlag}`
}

export function setSessionCookie(value, maxAgeSeconds = DEFAULT_MAX_AGE) {
  if (!isBrowser()) return
  document.cookie = buildCookie(value, maxAgeSeconds)
}

export function clearSessionCookie() {
  if (!isBrowser()) return
  document.cookie = `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
}

export { SESSION_COOKIE_NAME }
