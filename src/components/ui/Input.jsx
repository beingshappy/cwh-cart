import { cn } from '../../lib/utils'

export default function Input({
  type = 'text',
  className,
  ...props
}) {
  return (
    <input
      type={type}
      className={cn(
        'w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm',
        'text-foreground placeholder:text-muted-foreground',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/10',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
}
