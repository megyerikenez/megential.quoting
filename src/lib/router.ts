import { useEffect, useState } from 'react'

export interface Route {
  path: string
  query: URLSearchParams
}

/**
 * Parses the hash-based route.
 *
 * Hashes starting with `#/...` are routes; everything else (e.g.
 * `#szolgaltatasok`) is an anchor scrolled natively by the browser.
 */
export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, '')
  if (!raw.startsWith('/')) return { path: '/', query: new URLSearchParams() }
  const [path, qs] = raw.split('?')
  return { path: path || '/', query: new URLSearchParams(qs ?? '') }
}

export function useHashRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return parseHash(hash)
}
