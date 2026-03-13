import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Lock, Terminal, Cpu, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createPortal } from 'react-dom'
import { useStore } from '../../store/useStore'

export default function AdminBackdoor({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { isLockedDown, setLockedDown } = useStore()

  const handleToggleLockdown = () => {
    const newState = !isLockedDown
    setLockedDown(newState)
    toast.success(newState ? 'Security Protocols Re-engaged' : 'Security Protocols Temporarily Relaxed', {
      description: newState ? 'Zoom, selection, and right-click have been restricted.' : 'Restrictions lifted for administrative access.',
      duration: 3000,
    })
  }

  const handleEnterAccount = () => {
    onClose()
    navigate('/account')
  }
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        />

        {/* Popup Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg glass-dark border-primary/30 overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-primary" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">Admin Protocol 0.812</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} className="text-white/60" />
            </button>
          </div>

          <div className="p-8 text-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: isLockedDown ? [0, 5, -5, 0] : 0,
                filter: isLockedDown ? 'none' : 'grayscale(1)'
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border ${
                isLockedDown ? 'bg-primary/10 border-primary/20' : 'bg-destructive/10 border-destructive/20'
              }`}
            >
              <ShieldCheck size={40} className={isLockedDown ? "text-primary drop-shadow-[0_0_15px_rgba(45,160,90,0.5)]" : "text-destructive"} />
            </motion.div>

            <h2 className="text-3xl font-display font-bold mb-2">
              {isLockedDown ? 'System Locked' : 'System Unlocked'}
            </h2>
            <p className="text-white/50 text-sm mb-8">
              {isLockedDown 
                ? 'All security protocols are active and enforced.' 
                : 'Sensitive interactions are currently enabled.'}
            </p>

            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                { icon: Lock, label: 'Lockdown', val: isLockedDown ? 'ENFORCED' : 'DEACTIVATED' },
                { icon: Cpu, label: 'Core Load', val: '12% Stable' },
                { icon: Database, label: 'DB Latency', val: '4ms' },
                { icon: ShieldCheck, label: 'Overlay', val: 'Active' },
              ].map((stat, i) => (
                <div key={i} className="glass p-3 rounded-xl border-white/5 flex items-center gap-3">
                  <stat.icon size={14} className="text-primary" />
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-tighter">{stat.label}</p>
                    <p className="text-xs font-bold">{stat.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleToggleLockdown}
                className={`w-full py-3 font-bold rounded-xl transition-all shadow-lg ${
                  isLockedDown 
                    ? 'bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/30' 
                    : 'bg-primary hover:bg-primary-light text-white shadow-primary/25'
                }`}
              >
                {isLockedDown ? 'DEACTIVATE SECURITY' : 'RE-ENGAGE LOCKDOWN'}
              </motion.button>

              <button 
                onClick={handleEnterAccount}
                className="w-full py-2 text-white/40 hover:text-white transition-colors text-xs font-medium uppercase tracking-widest"
              >
                Go to Account Dashboard
              </button>
            </div>
          </div>

          {/* Bottom decorative bar */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
