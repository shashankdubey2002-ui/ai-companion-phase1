'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'floating' | 'morphing'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
  tilt?: boolean
  glow?: boolean
  children: React.ReactNode
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md', 
    hover = false, 
    tilt = false,
    glow = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-300'
    
    const variantClasses = {
      default: 'glass-card',
      elevated: 'glass-card shadow-depth',
      floating: 'glass-card floating shadow-floating',
      morphing: 'glass-card morphing-shape'
    }
    
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    }
    
    const hoverClasses = hover ? 'hover:scale-105 hover:shadow-xl' : ''
    const tiltClasses = tilt ? 'tilt-3d' : ''
    const glowClasses = glow ? 'glow' : ''

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={hover ? { scale: 1.02 } : {}}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          hoverClasses,
          tiltClasses,
          glowClasses,
          className
        )}
        ref={ref}
        {...(props as any)}
      >
        {children}
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export default GlassCard
