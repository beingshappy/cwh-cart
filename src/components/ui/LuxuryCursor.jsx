import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function LuxuryCursor() {
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovering, setHovering] = useState(false)

  const springConfig = { stiffness: 400, damping: 30, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  // Slow follower dot
  const trailConfig = { stiffness: 80, damping: 25, mass: 1 }
  const tx = useSpring(0, trailConfig)
  const ty = useSpring(0, trailConfig)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      tx.set(e.clientX)
      ty.set(e.clientY)
      setVisible(true)
    }

    const down = () => setClicked(true)
    const up = () => setClicked(false)

    const checkHover = (e) => {
      const el = e.target
      const isInteractive = el.closest('a, button, [role="button"], input, select, textarea, [data-hover]')
      setHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.style.cursor = ''
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Trail dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: tx,
          y: ty,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          border: `1.5px solid ${hovering ? 'hsl(145,60%,50%)' : 'rgba(255,255,255,0.25)'}`,
          background: hovering ? 'hsl(145,60%,38%,0.08)' : 'transparent',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: clicked ? 5 : 7,
          height: clicked ? 5 : 7,
          background: hovering ? 'hsl(145,60%,55%)' : 'rgba(255,255,255,0.9)',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
