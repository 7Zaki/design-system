import { createContext, useContext } from 'react'
import { cn } from '../../../utils/cn'

// ─── Context (for striped/bordered variants) ──────────────────────────────────

interface TableContextValue {
  striped: boolean
  bordered: boolean
  hoverable: boolean
  size: 'sm' | 'md' | 'lg'
}

const TableContext = createContext<TableContextValue>({
  striped: false, bordered: false, hoverable: true, size: 'md',
})

// ─── Table ────────────────────────────────────────────────────────────────────

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  stickyHeader?: boolean
  caption?: string
}

export function Table({
  className, striped = false, bordered = false, hoverable = true,
  size = 'md', stickyHeader = false, caption, children, ...props
}: TableProps) {
  return (
    <TableContext.Provider value={{ striped, bordered, hoverable, size }}>
      <div className={cn('w-full overflow-x-auto rounded-xl border border-gray-200', className)} {...props}>
        <table className="w-full border-collapse text-sm">
          {caption && (
            <caption className="pb-3 text-sm text-gray-500 text-left px-4">{caption}</caption>
          )}
          {children}
        </table>
      </div>
    </TableContext.Provider>
  )
}

// ─── TableHead ────────────────────────────────────────────────────────────────

export function TableHead({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-gray-50 border-b border-gray-200', className)} {...props}>
      {children}
    </thead>
  )
}

// ─── TableBody ────────────────────────────────────────────────────────────────

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  const { striped } = useContext(TableContext)
  return (
    <tbody
      className={cn(
        'divide-y divide-gray-100 bg-white',
        striped && '[&>tr:nth-child(even)]:bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  )
}

// ─── TableFoot ────────────────────────────────────────────────────────────────

export function TableFoot({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot className={cn('bg-gray-50 border-t border-gray-200', className)} {...props}>
      {children}
    </tfoot>
  )
}

// ─── TableRow ─────────────────────────────────────────────────────────────────

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export function TableRow({ className, selected, children, ...props }: TableRowProps) {
  const { hoverable } = useContext(TableContext)
  return (
    <tr
      className={cn(
        'transition-colors',
        hoverable && 'hover:bg-gray-50',
        selected && 'bg-primary-50 hover:bg-primary-50',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

// ─── TableHeader (th) ─────────────────────────────────────────────────────────

type SortDirection = 'asc' | 'desc' | false

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: SortDirection
  onSort?: () => void
}

const cellPadding = { sm: 'px-3 py-2', md: 'px-4 py-3', lg: 'px-5 py-4' }

export function TableHeader({ className, sortable, sortDirection, onSort, children, ...props }: TableHeaderProps) {
  const { size, bordered } = useContext(TableContext)
  return (
    <th
      className={cn(
        cellPadding[size],
        'text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
        bordered && 'border border-gray-200',
        sortable && 'cursor-pointer select-none hover:text-gray-700',
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="text-gray-400">
            {sortDirection === 'asc' ? (
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : sortDirection === 'desc' ? (
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" />
              </svg>
            )}
          </span>
        </span>
      ) : children}
    </th>
  )
}

// ─── TableCell (td) ───────────────────────────────────────────────────────────

export function TableCell({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const { size, bordered } = useContext(TableContext)
  return (
    <td
      className={cn(
        cellPadding[size],
        'text-gray-700 align-middle',
        bordered && 'border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

// ─── TableCaption ─────────────────────────────────────────────────────────────

export function TableCaption({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <p className={cn('mt-3 text-sm text-gray-500 text-center', className)} {...props}>
      {children}
    </p>
  )
}
