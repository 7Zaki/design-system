import { cn } from '../../../utils/cn'

type GapValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16'

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: GapValue
  align?: 'start' | 'center' | 'end' | 'stretch'
  as?: React.ElementType
}

interface HStackProps extends StackProps {
  wrap?: boolean
}

const gapMap: Record<GapValue, string> = {
  '0': 'gap-0', '1': 'gap-1', '2': 'gap-2', '3': 'gap-3',
  '4': 'gap-4', '5': 'gap-5', '6': 'gap-6', '8': 'gap-8',
  '10': 'gap-10', '12': 'gap-12', '16': 'gap-16',
}

const alignMap = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
}

export function VStack({ className, gap = '4', align = 'stretch', as: Tag = 'div', children, ...props }: StackProps) {
  return (
    <Tag
      className={cn('flex flex-col', gapMap[gap], alignMap[align], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function HStack({ className, gap = '4', align = 'center', wrap, as: Tag = 'div', children, ...props }: HStackProps) {
  return (
    <Tag
      className={cn('flex flex-row', gapMap[gap], alignMap[align], wrap && 'flex-wrap', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
