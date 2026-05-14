import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const inputVariants = cva(
  'w-full rounded-md border bg-white font-sans text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8  px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-11 px-4 text-base',
      },
      state: {
        default: 'border-gray-300',
        error:   'border-danger-500 focus:ring-danger-500',
        success: 'border-success-500 focus:ring-success-500',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  hint?: string
  error?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, label, hint, error, leftElement, rightElement, id, ...props }, ref) => {
    const resolvedState = error ? 'error' : state

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">{leftElement}</span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              inputVariants({ size, state: resolvedState }),
              leftElement && 'pl-9',
              rightElement && 'pr-9',
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 text-gray-400 pointer-events-none">{rightElement}</span>
          )}
        </div>
        {error && <p className="text-xs text-danger-500">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
