import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium rounded-full',
  {
    variants: {
      variant: {
        default:  'bg-gray-100   text-gray-700',
        primary:  'bg-primary-100 text-primary-700',
        success:  'bg-success-50  text-success-700',
        warning:  'bg-warning-50  text-warning-700',
        danger:   'bg-danger-50   text-danger-700',
        info:     'bg-info-50     text-info-700',
        outline:  'border border-gray-300 text-gray-700 bg-transparent',
      },
      size: {
        sm: 'px-2   py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3   py-1   text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  )
}
