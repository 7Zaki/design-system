import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

// ─── Heading ──────────────────────────────────────────────────────────────────

const headingVariants = cva('font-semibold tracking-tight text-gray-900', {
  variants: {
    level: {
      h1: 'text-4xl leading-tight',
      h2: 'text-3xl leading-tight',
      h3: 'text-2xl leading-snug',
      h4: 'text-xl leading-snug',
      h5: 'text-lg leading-normal',
      h6: 'text-base leading-normal',
    },
  },
  defaultVariants: { level: 'h2' },
})

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel
}

export function Heading({ className, level = 'h2', as, children, ...props }: HeadingProps) {
  const Tag = (as ?? level) as HeadingLevel
  return (
    <Tag className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Tag>
  )
}

// ─── Text ─────────────────────────────────────────────────────────────────────

const textVariants = cva('', {
  variants: {
    size: {
      xs:   'text-xs leading-4',
      sm:   'text-sm leading-5',
      base: 'text-base leading-6',
      lg:   'text-lg leading-7',
      xl:   'text-xl leading-7',
      '2xl':'text-2xl leading-8',
    },
    weight: {
      light:    'font-light',
      normal:   'font-normal',
      medium:   'font-medium',
      semibold: 'font-semibold',
      bold:     'font-bold',
    },
    textColor: {
      default: 'text-gray-900',
      muted:   'text-gray-500',
      subtle:  'text-gray-400',
      primary: 'text-primary-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      danger:  'text-red-600',
      inherit: '',
    },
    align: {
      left:    'text-left',
      center:  'text-center',
      right:   'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'truncate',
    },
    italic: {
      true: 'italic',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    textColor: 'default',
  },
})

type TextElement = 'p' | 'span' | 'div' | 'strong' | 'em'

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger' | 'inherit'
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  italic?: boolean
}

export function Text({
  className,
  as: Tag = 'p',
  size,
  weight,
  color,
  align,
  truncate,
  italic,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        textVariants({ size, weight, textColor: color, align, truncate, italic }),
        className
      )}
      {...(props as React.HTMLAttributes<HTMLParagraphElement>)}
    >
      {children}
    </Tag>
  )
}

// ─── Code ─────────────────────────────────────────────────────────────────────

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  block?: boolean
}

export function Code({ className, block, children, ...props }: CodeProps) {
  if (block) {
    return (
      <pre className={cn('rounded-lg bg-gray-900 text-gray-100 p-4 text-sm font-mono overflow-x-auto', className)}>
        <code {...props}>{children}</code>
      </pre>
    )
  }
  return (
    <code
      className={cn('rounded bg-gray-100 text-gray-800 px-1.5 py-0.5 text-sm font-mono', className)}
      {...props}
    >
      {children}
    </code>
  )
}
