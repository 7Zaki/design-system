import { createContext, forwardRef, useContext } from 'react'
import { cn } from '../../../utils/cn'

// ─── Context (shared by RadioGroup) ──────────────────────────────────────────

interface RadioGroupContextValue {
  name: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

// ─── Radio ────────────────────────────────────────────────────────────────────

const sizeMap = {
  sm: { box: 'h-3.5 w-3.5', label: 'text-sm', desc: 'text-xs' },
  md: { box: 'h-4 w-4',     label: 'text-sm', desc: 'text-xs' },
  lg: { box: 'h-5 w-5',     label: 'text-base', desc: 'text-sm' },
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, size: sizeProp, id, disabled, onChange, ...props }, ref) => {
    const ctx = useContext(RadioGroupContext)
    const size = sizeProp ?? ctx?.size ?? 'md'
    const s = sizeMap[size]

    const isChecked = ctx && props.value !== undefined ? ctx.value === props.value : props.checked
    const isDisabled = disabled ?? ctx?.disabled

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      if (ctx && props.value !== undefined) ctx.onChange?.(String(props.value))
    }

    return (
      <div className={cn('flex gap-2.5', className)}>
        <div className="flex items-center" style={{ paddingTop: '2px' }}>
          <input
            ref={ref}
            type="radio"
            id={id}
            name={ctx?.name ?? props.name}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            className={cn(
              s.box,
              'cursor-pointer border-gray-300 text-primary-600',
              'focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(s.label, 'font-medium text-gray-700 cursor-pointer leading-tight', isDisabled && 'opacity-50 cursor-not-allowed')}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(s.desc, 'text-gray-500')}>{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export interface RadioGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  label?: string
  options: RadioGroupOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function RadioGroup({
  name, label, options, value, onChange, error, disabled,
  orientation = 'vertical', size = 'md', className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, disabled, size }}>
      <fieldset className={cn('flex flex-col gap-1', className)}>
        {label && (
          <legend className="text-sm font-medium text-gray-700 mb-1">{label}</legend>
        )}
        <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
          {options.map((opt) => (
            <Radio
              key={opt.value}
              id={`${name}-${opt.value}`}
              value={opt.value}
              label={opt.label}
              description={opt.description}
              disabled={opt.disabled}
            />
          ))}
        </div>
        {error && <p className="text-xs text-danger-500 mt-1">{error}</p>}
      </fieldset>
    </RadioGroupContext.Provider>
  )
}
