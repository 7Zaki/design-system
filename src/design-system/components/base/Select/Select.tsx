import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const selectVariants = cva(
  'w-full rounded-md border bg-white font-sans text-gray-900 appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 pr-9',
  {
    variants: {
      size: {
        sm: 'h-8  pl-3 text-sm',
        md: 'h-10 pl-3 text-sm',
        lg: 'h-11 pl-4 text-base',
      },
      state: {
        default: 'border-gray-300',
        error:   'border-danger-500 focus:ring-danger-500',
        success: 'border-success-500 focus:ring-success-500',
      },
    },
    defaultVariants: { size: 'md', state: 'default' },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  options: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, state, label, hint, error, placeholder, options, id, ...props }, ref) => {
    const resolvedState = error ? 'error' : state

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={id}
            className={cn(selectVariants({ size, state: resolvedState }), className)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        {error && <p className="text-xs text-danger-500">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
