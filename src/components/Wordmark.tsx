interface WordmarkProps {
  /** Whether to show the „Prémium felújítás · Budapest” tagline. */
  withTagline?: boolean
  className?: string
}

/**
 * The MÉRTÉK wordmark — the small square next to the name is a dimension
 * mark, the same shape as measurement points on architectural drawings.
 */
export function Wordmark({ withTagline = false, className = '' }: WordmarkProps) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="flex items-center gap-2">
        <span className="text-[19px] font-semibold leading-none tracking-[0.14em]">
          MÉRTÉK
        </span>
        <span className="block h-[7px] w-[7px] bg-clay" aria-hidden="true" />
      </span>
      {withTagline && (
        <span className="dimline mt-1.5 !tracking-[0.22em]">Prémium felújítás · Budapest</span>
      )}
    </span>
  )
}
