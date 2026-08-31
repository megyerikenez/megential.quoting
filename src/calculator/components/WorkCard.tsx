import { CheckIcon } from '../../components/icons'

interface WorkCardProps {
  code: string
  title: string
  description: string
  selected: boolean
  onToggle: () => void
  disabled?: boolean
  disabledReason?: string
}

/**
 * Multi-select work card — built on a native checkbox.
 */
export function WorkCard({
  code,
  title,
  description,
  selected,
  onToggle,
  disabled = false,
  disabledReason,
}: WorkCardProps) {
  return (
    <label
      className={`work-card group relative flex cursor-pointer flex-col border p-4 transition-colors duration-200 sm:p-5 ${
        selected
          ? 'border-clay bg-clay-tint/50'
          : 'border-line bg-paper hover:border-line-strong hover:bg-cream'
      } ${disabled ? 'cursor-not-allowed opacity-45' : ''}`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={selected}
        onChange={onToggle}
        disabled={disabled}
      />
      <span className="flex items-start justify-between gap-3">
        <span
          className={`font-mono text-[11px] tracking-[0.1em] ${selected ? 'text-clay' : 'text-ink-faint'}`}
          aria-hidden="true"
        >
          {code}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200 ${
            selected ? 'border-clay bg-clay text-paper' : 'border-line-strong bg-paper'
          }`}
        >
          {selected && <CheckIcon className="h-3 w-3" />}
        </span>
      </span>
      <span className="mt-3 block text-[15px] font-medium leading-snug">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{description}</span>
      {disabled && disabledReason && (
        <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          {disabledReason}
        </span>
      )}
    </label>
  )
}
