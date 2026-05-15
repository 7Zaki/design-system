import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'

type ToggleSize  = 'sm' | 'md' | 'lg'
type ToggleColor = 'primary' | 'success' | 'warning' | 'danger'

const trackSize: Record<ToggleSize, string>  = { sm: 'h-5 w-9', md: 'h-6 w-11', lg: 'h-7 w-14' }
const thumbSize: Record<ToggleSize, string>  = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }
const thumbOn:   Record<ToggleSize, string>  = { sm: 'translate-x-4', md: 'translate-x-5', lg: 'translate-x-7' }
const trackOn:   Record<ToggleColor, string> = {
  primary: 'bg-primary-600',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-500',
}

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?:          ToggleSize
  color?:         ToggleColor
  label?:         string
  description?:   string
  labelPosition?: 'left' | 'right'
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({
    className, size = 'md', color = 'primary',
    label, description, labelPosition = 'right',
    id, disabled, checked, onChange, ...props
  }, ref) => {
    const on = Boolean(checked)

    return (
      <div className={cn('flex items-start gap-3', labelPosition === 'left' && 'flex-row-reverse justify-end', className)}>
        {/* Hidden real input for form compatibility */}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={on}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
          {...props}
        />

        {/* Visual track */}
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby={id ? `${id}-label` : undefined}
          disabled={disabled}
          onClick={() => {
            const e = { target: { checked: !on } } as React.ChangeEvent<HTMLInputElement>
            onChange?.(e)
          }}
          className={cn(
            'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent',
            'transition-colors duration-200 ease-in-out mt-0.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            trackSize[size],
            on ? trackOn[color] : 'bg-gray-200',
          )}
        >
          <span
            className={cn(
              'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0',
              'transition-transform duration-200 ease-in-out',
              thumbSize[size],
              on ? thumbOn[size] : 'translate-x-0',
            )}
          />
        </button>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                id={id ? `${id}-label` : undefined}
                htmlFor={id}
                className={cn(
                  'text-sm font-medium text-gray-700 cursor-pointer leading-tight',
                  disabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                {label}
              </label>
            )}
            {description && <p className="text-xs text-gray-500">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'
