import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { buttonHoverVariants } from '../../lib/animations';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  animated = true,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const base = [
    'inline-flex items-center justify-center font-bold rounded-xl',
    'transition-all duration-500 focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'relative overflow-hidden select-none shine-sweep liquid-glow text-glow',
    // Inset top highlight — gives a "lit from above" premium feel
    'after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent',
  ].join(' ')

  const variants = {
    primary: [
      'bg-gradient-to-b from-[hsl(145,58%,44%)] to-[hsl(145,58%,34%)]',
      'text-white',
      'shadow-[0_4px_16px_rgba(45,160,90,0.4),0_1px_0_rgba(255,255,255,0.15)_inset]',
      'hover:shadow-[0_8px_32px_rgba(45,160,90,0.6),0_0_50px_rgba(45,160,90,0.15),0_1px_0_rgba(255,255,255,0.2)_inset]',
      'hover:from-[hsl(145,58%,50%)] hover:to-[hsl(145,58%,40%)]',
      'active:scale-[0.98]',
    ].join(' '),

    accent: [
      'bg-gradient-to-b from-[hsl(40,88%,60%)] to-[hsl(40,88%,48%)]',
      'text-black font-bold',
      'shadow-[0_4px_16px_rgba(212,175,55,0.4),0_1px_0_rgba(255,255,255,0.25)_inset]',
      'hover:shadow-[0_8px_28px_rgba(212,175,55,0.6),0_1px_0_rgba(255,255,255,0.3)_inset]',
      'hover:from-[hsl(40,88%,65%)] hover:to-[hsl(40,88%,55%)]',
      'active:scale-[0.98]',
    ].join(' '),

    secondary: [
      'bg-white/8 hover:bg-white/14 text-foreground',
      'border border-white/12 hover:border-white/24',
      'backdrop-blur-sm',
      'shadow-[0_4px_16px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.07)_inset]',
      'hover:shadow-[0_8px_24px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.1)_inset]',
    ].join(' '),

    outline: [
      'border-2 border-primary/70 text-primary',
      'hover:bg-primary/10 hover:border-primary',
      'shadow-[0_0_0_0_rgba(45,160,90,0)]',
      'hover:shadow-[0_0_20px_rgba(45,160,90,0.25)]',
    ].join(' '),

    ghost: 'bg-transparent text-foreground hover:bg-white/8 border border-transparent hover:border-white/10',

    danger: [
      'bg-gradient-to-b from-red-500 to-red-600 text-white',
      'shadow-[0_4px_16px_rgba(239,68,68,0.4)]',
      'hover:shadow-[0_8px_28px_rgba(239,68,68,0.6)]',
    ].join(' '),

    success: [
      'bg-gradient-to-b from-green-500 to-green-600 text-white',
      'shadow-[0_4px_16px_rgba(34,197,94,0.4)]',
    ].join(' '),
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-xs gap-1.5',
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
    xl: 'px-10 py-4 text-lg gap-3',
  }

  const Component = animated ? motion.button : 'button'
  const motionProps = animated ? { variants: buttonHoverVariants, whileHover: 'hover', whileTap: 'tap' } : {}

  return (
    <Component
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...motionProps}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !loading && <Icon className="w-4 h-4 flex-shrink-0" />}
    </Component>
  )
}
