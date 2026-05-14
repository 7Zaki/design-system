import { createContext, useCallback, useContext, useReducer, useRef } from 'react'
import { cn } from '../../../utils/cn'

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface ToastItem {
  id: string
  message: string
  title?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastState {
  toasts: ToastItem[]
}

type ToastAction =
  | { type: 'ADD'; toast: ToastItem }
  | { type: 'REMOVE'; id: string }

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD':    return { toasts: [...state.toasts, action.toast] }
    case 'REMOVE': return { toasts: state.toasts.filter(t => t.id !== action.id) }
  }
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const variantStyles: Record<ToastVariant, string> = {
  info:    'border-primary-200 bg-white text-gray-900',
  success: 'border-green-200   bg-white text-gray-900',
  warning: 'border-yellow-200  bg-white text-gray-900',
  danger:  'border-red-200     bg-white text-gray-900',
}

const iconColors: Record<ToastVariant, string> = {
  info:    'text-primary-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger:  'text-red-500',
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const cls = cn('h-5 w-5 shrink-0', iconColors[variant])
  if (variant === 'success') return (
    <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
  if (variant === 'danger') return (
    <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
  if (variant === 'warning') return (
    <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
  return (
    <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
}

function ToastItem({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const variant = toast.variant ?? 'info'
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4 shadow-lg min-w-[280px] max-w-sm',
        variantStyles[variant]
      )}
    >
      <ToastIcon variant={variant} />
      <div className="flex-1 min-w-0">
        {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
        <p className="text-sm text-gray-600">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { toasts: [] })
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id })
    const t = timers.current.get(id)
    if (t) { clearTimeout(t); timers.current.delete(id) }
  }, [])

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = crypto.randomUUID()
    dispatch({ type: 'ADD', toast: { ...item, id } })
    const duration = item.duration ?? 4000
    const t = setTimeout(() => dismiss(id), duration)
    timers.current.set(id, t)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {state.toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
