import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Logo({ size = 32, className = '', onLongPress }) {
  const timerRef = useRef(null)
  const [isPressing, setIsPressing] = useState(false)

  const handleStart = (e) => {
    if (!onLongPress) return
    setIsPressing(true)
    timerRef.current = setTimeout(() => {
      onLongPress()
      setIsPressing(false)
    }, 3000) // 3 seconds (was 10)
  }

  const handleEnd = () => {
    setIsPressing(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  return (
    <div 
      className={`relative flex-shrink-0 cursor-pointer select-none touch-none ${className}`} 
      style={{ width: size, height: size }}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      <motion.div
        animate={isPressing ? { 
          scale: [1, 1.15, 1.05],
          rotate: [0, 5, -5, 0],
          filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
        } : { scale: 1, rotate: 0 }}
        transition={isPressing ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
        className="w-full h-full"
      >
        <img 
          src="/brand-logo.png" 
          alt="CWH Cart Logo" 
          className="w-full h-full object-contain pointer-events-none"
        />
      </motion.div>

      {/* Secret Access Loading Ring */}
      <AnimatePresence>
        {isPressing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 border-2 border-primary rounded-full"
            style={{ 
              animation: 'spin-slow 2s linear infinite',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent'
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-primary/20 blur-xl -z-10 rounded-full opacity-50" />
    </div>
  )
}
