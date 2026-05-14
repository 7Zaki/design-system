import { cn } from '../../../utils/cn'

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  variant?: 'solid' | 'dashed' | 'dotted'
}

const variantMap = {
  solid:  'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
}

export function Divider({
  className,
  orientation = 'horizontal',
  label,
  variant = 'solid',
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch bg-gray-200', className)}
        {...props}
      />
    )
  }

  if (label) {
    return (
      <div role="separator" className={cn('flex items-center gap-3', className)} {...props}>
        <div className={cn('flex-1 border-t border-gray-200', variantMap[variant])} />
        <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{label}</span>
        <div className={cn('flex-1 border-t border-gray-200', variantMap[variant])} />
      </div>
    )
  }

  return (
    <hr
      role="separator"
      className={cn('border-0 border-t border-gray-200', variantMap[variant], className)}
      {...(props as React.HTMLAttributes<HTMLHRElement>)}
    />
  )
}
