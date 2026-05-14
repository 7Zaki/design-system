import { cn } from '../../../utils/cn'

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 12
type GapValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8'

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Cols
  smCols?: Cols
  mdCols?: Cols
  lgCols?: Cols
  gap?: GapValue
  colGap?: GapValue
  rowGap?: GapValue
}

const colsMap: Record<Cols, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
  4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12',
}

const smColsMap: Record<Cols, string> = {
  1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6', 12: 'sm:grid-cols-12',
}

const mdColsMap: Record<Cols, string> = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
  4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12',
}

const lgColsMap: Record<Cols, string> = {
  1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12',
}

const gapMap: Record<GapValue, string>    = { '0':'gap-0','1':'gap-1','2':'gap-2','3':'gap-3','4':'gap-4','5':'gap-5','6':'gap-6','8':'gap-8' }
const colGapMap: Record<GapValue, string> = { '0':'gap-x-0','1':'gap-x-1','2':'gap-x-2','3':'gap-x-3','4':'gap-x-4','5':'gap-x-5','6':'gap-x-6','8':'gap-x-8' }
const rowGapMap: Record<GapValue, string> = { '0':'gap-y-0','1':'gap-y-1','2':'gap-y-2','3':'gap-y-3','4':'gap-y-4','5':'gap-y-5','6':'gap-y-6','8':'gap-y-8' }

export function Grid({
  className, cols = 1, smCols, mdCols, lgCols,
  gap, colGap, rowGap, children, ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        colsMap[cols],
        smCols && smColsMap[smCols],
        mdCols && mdColsMap[mdCols],
        lgCols && lgColsMap[lgCols],
        gap    && gapMap[gap],
        colGap && colGapMap[colGap],
        rowGap && rowGapMap[rowGap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'full'
  rowSpan?: 1 | 2 | 3
}

const colSpanMap = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 12: 'col-span-12', full: 'col-span-full',
}

const rowSpanMap = { 1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-3' }

export function GridItem({ className, colSpan, rowSpan, children, ...props }: GridItemProps) {
  return (
    <div
      className={cn(
        colSpan && colSpanMap[colSpan],
        rowSpan && rowSpanMap[rowSpan],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
