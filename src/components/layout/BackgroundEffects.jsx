import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Shooting Star ─────────────────────────────────────── */
function ShootingStar({ delay, duration, top, left, angle }) {
  return (
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
      style={{ top: `${top}%`, left: `${left}%`, width: 120, rotate: angle, willChange: 'transform' }}
      initial={{ opacity: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, 200],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 10,
        ease: 'linear',
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
        filter: `blur(${blur}px)`, // Keep blur STATIC to prevent mobile flickering
        opacity,
        willChange: 'transform, opacity',
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
        opacity: [opacity, opacity * 1.2, opacity],
      }}
      transition={{ 
        duration: dur, 
        delay, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
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
            'linear-gradient(135deg, transparent 0%, hsl(145 60% 38% / 0.12) 30%, hsl(40 90% 55% / 0.1) 60%, transparent 100%)',
          filter: 'blur(60px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.95, 1, 0.95],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      {/* Aurora wave 2 */}
      <motion.div
        className="absolute w-full"
        style={{
          height: 280,
          top: '40%',
          background:
            'linear-gradient(135deg, transparent 0%, hsl(220 70% 50% / 0.08) 20%, hsl(145 60% 38% / 0.1) 70%, transparent 100%)',
          filter: 'blur(80px)',
          willChange: 'transform, opacity',
        }}
        animate={{
          y: [0, 10, 0],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{ duration: 14, delay: 2, repeat: Infinity, ease: 'linear' }}
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

    // Spawn particles — optimized for mobile
    const count = Math.min(window.innerWidth < 768 ? 25 : 60, Math.floor(window.innerWidth / 25))
    const maxDist = window.innerWidth < 768 ? 70 : 100
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
          if (dist < maxDist) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / maxDist)})`
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
          'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)'
      }}
    />
  )
}

/* ─── Noise Texture ─────────────────────────────────────── */
function Noise() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '150px',
      }}
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
      {/* 1. Deep Atmosphere (Aurora) */}
      <Aurora />

      {/* 2. Fluid Orbs */}
      <Orb color="radial-gradient(circle, hsl(145,60%,38%), transparent)" size={800} x={-10} y={-5} blur={150} dur={18} delay={0} opacity={0.2} />
      <Orb color="radial-gradient(circle, hsl(40,90%,55%), transparent)" size={600} x={75} y={10} blur={120} dur={22} delay={4} opacity={0.15} />
      <Orb color="radial-gradient(circle, hsl(220,70%,55%), transparent)" size={500} x={50} y={70} blur={110} dur={16} delay={8} opacity={0.12} />
      <Orb color="radial-gradient(circle, hsl(145,60%,30%), transparent)" size={450} x={20} y={60} blur={100} dur={20} delay={5} opacity={0.18} />

      {/* 3. Particle Field */}
      <ParticleField />

      {/* 4. Cosmic Events (Shooting Stars) */}
      {stars.map((s, i) => <ShootingStar key={i} {...s} />)}

      {/* 5. Cinematic Texture Layers */}
      <GridOverlay />
      <Vignette />
      <Noise />
    </div>
  )
}
