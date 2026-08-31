import { CheckIcon } from '../../components/icons'

interface OptionRowProps {
  /** Radio group name (behaves as a native radio). */
  name: string
  /** Short identifier, e.g. „A” or „01”. */
  code: string
  title: string
  description?: string
  /** Extra info on the right, e.g. a multiplier. */
  meta?: string
  selected: boolean
  onSelect: () => void
  disabled?: boolean
}

/**
 * Large custom-styled selection row — built on a native radio input, so
 * keyboard navigation and group semantics are preserved.
 */
export function OptionRow({
  name,
  code,
  title,
  description,
  meta,
  selected,
  onSelect,
  disabled = false,
}: OptionRowProps) {
  return (
    <label
      className={`option-card group relative flex cursor-pointer items-start gap-4 border px-4 py-4 transition-colors duration-200 sm:px-5 ${
        selected
          ? 'border-clay bg-clay-tint/50'
          : 'border-line bg-paper hover:border-line-strong hover:bg-cream'
      } ${disabled ? 'cursor-not-allowed opacity-45' : ''}`}
    >
      <input
        type="radio"
        name={name}
        value={code}
        className="sr-only"
        checked={selected}
        onChange={onSelect}
        disabled={disabled}
      />
      <span
        className={`mt-0.5 font-mono text-xs tracking-[0.08em] ${selected ? 'text-clay' : 'text-ink-faint'}`}
        aria-hidden="true"
      >
        {code}
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-medium leading-snug">{title}</span>
        {description && (
          <span className="mt-1 block max-w-xl text-sm leading-relaxed text-ink-soft">
            {description}
          </span>
        )}
      </span>
      {meta && (
        <span className="mt-0.5 font-mono text-xs text-ink-soft" aria-hidden="true">
          {meta}
        </span>
      )}
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200 ${
          selected ? 'border-clay bg-clay text-paper' : 'border-line-strong bg-paper'
        }`}
      >
        {selected && <CheckIcon className="h-3 w-3" />}
      </span>
    </label>
  )
}
