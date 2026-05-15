import { forwardRef, useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { box: 'h-3.5 w-3.5', label: 'text-sm', desc: 'text-xs' },
  md: { box: 'h-4 w-4',     label: 'text-sm', desc: 'text-xs' },
  lg: { box: 'h-5 w-5',     label: 'text-base', desc: 'text-sm' },
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, indeterminate, size = 'md', id, disabled, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null)
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false
      }
    }, [indeterminate, resolvedRef])

    const s = sizeMap[size]

    return (
      <div className={cn('flex gap-2.5', className)}>
        <div className="flex items-center" style={{ paddingTop: '2px' }}>
          <input
            ref={resolvedRef}
            type="checkbox"
            id={id}
            disabled={disabled}
            className={cn(
              s.box,
              'rounded border-gray-300 text-primary-600 cursor-pointer',
              'focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-danger-500',
            )}
            {...props}
          />
        </div>
        {(label || description || error) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(s.label, 'font-medium text-gray-700 cursor-pointer leading-tight', disabled && 'opacity-50 cursor-not-allowed')}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(s.desc, 'text-gray-500')}>{description}</p>
            )}
            {error && (
              <p className="text-xs text-danger-500">{error}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// ─── CheckboxGroup ────────────────────────────────────────────────────────────

export interface CheckboxGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface CheckboxGroupProps {
  label?: string
  options: CheckboxGroupOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  error?: string
  size?: CheckboxProps['size']
  className?: string
}

export function CheckboxGroup({ label, options, value = [], onChange, error, size, className }: CheckboxGroupProps) {
  const toggle = (v: string) => {
    if (!onChange) return
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            id={`cbg-${opt.value}`}
            label={opt.label}
            description={opt.description}
            size={size}
            checked={value.includes(opt.value)}
            disabled={opt.disabled}
            onChange={() => toggle(opt.value)}
          />
        ))}
      </div>
      {error && <p className="text-xs text-danger-500 mt-1">{error}</p>}
    </div>
  )
}
