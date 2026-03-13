import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Shooting Star ─────────────────────────────────────── */
function ShootingStar({ delay, duration, top, left, angle }) {
  return (
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
      style={{ top: `${top}%`, left: `${left}%`, width: 120, rotate: angle }}
      initial={{ opacity: 0, x: 0, scaleX: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, 180],
        scaleX: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 6,
        ease: 'easeOut',
      }}
    />
  )
}

/* ─── Floating Orb ──────────────────────────────────────── */
function Orb({ color, size, x, y, blur, dur, delay, opacity = 0.18 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: color,
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      animate={{
        x: [0, 60, -40, 30, 0],
        y: [0, -50, 40, -30, 0],
        scale: [1, 1.15, 0.9, 1.05, 1],
        opacity: [opacity, opacity * 1.5, opacity * 0.7, opacity * 1.2, opacity],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ─── Aurora Band ───────────────────────────────────────── */
function Aurora() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Aurora wave 1 */}
      <motion.div
        className="absolute w-full"
        style={{
          height: 360,
          top: '10%',
          background:
            'linear-gradient(135deg, transparent 0%, hsl(145 60% 38% / 0.15) 30%, hsl(40 90% 55% / 0.12) 60%, transparent 100%)',
          filter: 'blur(70px)',
        }}
        animate={{
          skewY: [-2, 2, -1, 3, -2],
          scaleX: [1, 1.08, 0.96, 1.04, 1],
          y: [0, -30, 20, -10, 0],
          opacity: [0.8, 1, 0.9, 1, 0.8],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Aurora wave 2 */}
      <motion.div
        className="absolute w-full"
        style={{
          height: 280,
          top: '40%',
          background:
            'linear-gradient(135deg, transparent 0%, hsl(220 70% 50% / 0.1) 20%, hsl(145 60% 38% / 0.12) 70%, transparent 100%)',
          filter: 'blur(90px)',
        }}
        animate={{
          skewY: [3, -2, 4, -1, 3],
          scaleX: [1, 0.94, 1.06, 0.98, 1],
          y: [0, 25, -15, 20, 0],
          opacity: [0.6, 1, 0.7, 0.9, 0.6],
        }}
        transition={{ duration: 15, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─── Particle Canvas ───────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Spawn particles
    const count = Math.min(60, Math.floor(window.innerWidth / 20))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.05,
        color: Math.random() > 0.7 ? '40,90%,55%' : '145,60%,38%',
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.color}, ${p.opacity})`
        ctx.fill()

        p.x += p.dx
        p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

/* ─── Grid overlay ──────────────────────────────────────── */
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  )
}

/* ─── Radial vignette  ──────────────────────────────────── */
function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
      }}
    />
  )
}

/* ─── Noise Texture ─────────────────────────────────────── */
function Noise() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px',
      }}
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    />
  )
}

/* ─── Main Export ───────────────────────────────────────── */
export default function BackgroundEffects() {
  const stars = [
    { delay: 2, duration: 1.2, top: 8, left: 15, angle: -20 },
    { delay: 7, duration: 1.4, top: 22, left: 55, angle: -15 },
    { delay: 14, duration: 1.0, top: 5, left: 72, angle: -25 },
    { delay: 20, duration: 1.3, top: 35, left: 10, angle: -18 },
    { delay: 28, duration: 1.1, top: 12, left: 85, angle: -22 },
    { delay: 35, duration: 1.5, top: 50, left: 40, angle: -12 },
  ]

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#030a06]" />

      {/* Particle constellation */}
      <ParticleField />

      {/* Aurora bands */}
      <Aurora />

      {/* Large ambient orbs — increased lighting intensity */}
      <Orb color="radial-gradient(circle, hsl(145,60%,38%), transparent)" size={800} x={-10} y={-5} blur={150} dur={18} delay={0} opacity={0.25} />
      <Orb color="radial-gradient(circle, hsl(40,90%,55%), transparent)" size={600} x={75} y={10} blur={120} dur={22} delay={4} opacity={0.18} />
      <Orb color="radial-gradient(circle, hsl(220,70%,55%), transparent)" size={500} x={50} y={70} blur={110} dur={16} delay={8} opacity={0.15} />
      <Orb color="radial-gradient(circle, hsl(145,60%,30%), transparent)" size={450} x={20} y={60} blur={100} dur={20} delay={5} opacity={0.2} />
      <Orb color="radial-gradient(circle, hsl(300,50%,40%), transparent)" size={400} x={85} y={55} blur={110} dur={25} delay={12} opacity={0.12} />

      {/* Shooting stars */}
      {stars.map((s, i) => <ShootingStar key={i} {...s} />)}

      {/* Grid overlay */}
      <GridOverlay />

      {/* Vignette */}
      <Vignette />

      {/* Film grain */}
      <Noise />
    </div>
  )
}
