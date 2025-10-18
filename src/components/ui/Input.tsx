'use client'

import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'glass' | 'floating' | 'neon'
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    variant = 'default',
    icon,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    
    const baseClasses = 'flex h-12 w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
    
    const variantClasses = {
      default: 'border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
      glass: 'glass-input text-gray-900 placeholder:text-gray-500',
      floating: 'border-2 border-transparent bg-white/10 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-400 focus:bg-white/20',
      neon: 'border-2 border-blue-400 bg-transparent text-blue-400 placeholder:text-blue-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-400/20 neon-glow'
    }
    
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''

    return (
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <motion.label 
            className="text-sm font-medium text-gray-700 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <motion.input
            className={cn(
              baseClasses,
              variantClasses[variant],
              errorClasses,
              icon && 'pl-10',
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...(props as any)}
          />
          {isFocused && variant === 'floating' && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        {error && (
          <motion.p 
            className="text-sm text-red-600 flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-red-500">⚠</span>
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {helperText}
          </motion.p>
        )}
      </motion.div>
    )
  }
)

Input.displayName = 'Input'

export default Input