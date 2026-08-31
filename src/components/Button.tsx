import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-none font-medium tracking-[0.01em] transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-55'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-clay-deep',
  accent: 'bg-clay text-paper hover:bg-clay-deep',
  outline: 'border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink underline-offset-4 hover:underline hover:decoration-clay hover:decoration-2',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[15px] sm:h-[52px] sm:px-7',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  children: ReactNode
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = 'primary', size = 'md', children, className, ...rest } = props
  const classes = [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
