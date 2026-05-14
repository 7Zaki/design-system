import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'

const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium shrink-0 select-none overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-6  w-6  text-xs',
        sm: 'h-8  w-8  text-sm',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-xl',
      },
      variant: {
        image: '',
        initials: 'bg-primary-100 text-primary-700',
        placeholder: 'bg-gray-200 text-gray-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'initials',
    },
  }
)

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  name?: string
  className?: string
}

export function Avatar({ src, alt, name, size, className }: AvatarProps) {
  if (src) {
    return (
      <span className={cn(avatarVariants({ size, variant: 'image' }), className)}>
        <img src={src} alt={alt ?? name} className="h-full w-full object-cover" />
      </span>
    )
  }

  if (name) {
    return (
      <span className={cn(avatarVariants({ size, variant: 'initials' }), className)}>
        {getInitials(name)}
      </span>
    )
  }

  return (
    <span className={cn(avatarVariants({ size, variant: 'placeholder' }), className)}>
      <svg className="h-3/5 w-3/5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </span>
  )
}

export interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number
  size?: AvatarProps['size']
  className?: string
}

export function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          {...avatar}
          size={size}
          className={cn('ring-2 ring-white', avatar.className)}
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            avatarVariants({ size, variant: 'placeholder' }),
            'ring-2 ring-white text-xs font-semibold'
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
