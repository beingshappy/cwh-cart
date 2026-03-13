import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-[rgba(10,22,14,0.6)] backdrop-blur-xl p-6',
        'shadow-[0_8px_32px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.06)_inset]',
        'transition-all duration-300',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return (
    <h2
      className={cn('text-2xl font-bold text-foreground text-glow', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn('text-muted-foreground text-sm text-shadow-sm', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('mt-6 flex gap-4', className)} {...props} />
}
