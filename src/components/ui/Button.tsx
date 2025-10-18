'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'neon' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  glow?: boolean
  floating?: boolean
  shimmer?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled, 
    glow = false,
    floating = false,
    shimmer = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden'
    
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400',
      ghost: 'btn-ghost',
      glass: 'glass-button text-gray-700 hover:text-gray-900',
      neon: 'bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white neon-glow',
      gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
    }
    
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl'
    }
    
    const effectClasses = cn(
      glow && 'glow',
      floating && 'floating',
      shimmer && 'shimmer'
    )

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        effectClasses,
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...(props as any)}
    >
        {loading && (
          <motion.span 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            ⟳
          </motion.span>
        )}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button