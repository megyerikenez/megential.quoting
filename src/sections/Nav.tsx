import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Wordmark } from '../components/Wordmark'

const LINKS = [
  { href: '#szolgaltatasok', label: 'Szolgáltatások' },
  { href: '#folyamat', label: 'Hogyan dolgozunk' },
  { href: '#kapcsolat', label: 'Kapcsolat' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // While the menu is open, background scrolling stops and Escape closes it.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          open ? 'border-line bg-paper' : 'border-line bg-paper/95 backdrop-blur-sm'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <a href="#/" className="-ml-1 px-1 py-2" aria-label="MÉRTÉK — főoldal">
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Fő navigáció">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="-my-3 py-3 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="#/kalkulator" size="md" className="hidden sm:inline-flex">
              Árkalkulátor
            </Button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span
                  className={`absolute left-0 top-2 h-px w-full bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
                />
                <span
                  className={`absolute left-0 top-4 h-px w-full bg-ink transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* The menu lives outside the header, so fixed positioning anchors
          to the viewport (the header's backdrop-blur would otherwise make
          the header its containing block) and the background truly fills
          the page. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col bg-paper md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <nav className="shell flex flex-1 flex-col pt-8" aria-label="Mobil navigáció">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-5"
              >
                <span className="font-mono text-[11px] text-ink-faint" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[26px] font-medium tracking-tight">
                  {link.label}
                </span>
              </a>
            ))}
            <div className="mt-10">
              <Button
                href="#/kalkulator"
                variant="accent"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Árkalkulátor indítása
              </Button>
            </div>
          </nav>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="shell mb-8 flex items-center gap-2 text-[13px] font-medium text-ink-soft"
          >
            Bezárás
            <span aria-hidden="true" className="font-mono text-[11px]">
              ESC
            </span>
          </button>
        </div>
      )}
    </>
  )
}
