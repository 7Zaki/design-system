import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const spinnerVariants = cva('animate-spin rounded-full border-2 border-current border-t-transparent', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12 border-4',
    },
    color: {
      primary: 'text-primary-600',
      white:   'text-white',
      gray:    'text-gray-500',
    },
  },
  defaultVariants: { size: 'md', color: 'primary' },
})

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

export function Spinner({ size, color, className, label = 'Loading...' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn('inline-flex items-center gap-2', className)}>
      <span className={cn(spinnerVariants({ size, color }))} />
      {label && <span className="sr-only">{label}</span>}
    </span>
  )
}
