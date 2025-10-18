'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  children: ReactNode
  onClick?: () => void
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center'
  variant?: 'primary' | 'secondary' | 'glass' | 'neon' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  tooltip?: string
}

export default function FloatingActionButton({
  children,
  onClick,
  position = 'bottom-right',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  tooltip
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6',
    'center': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }
  
    const variantClasses = {
      primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-200',
      glass: 'glass-button text-gray-700',
      neon: 'bg-transparent border-2 border-blue-400 text-blue-400 neon-glow hover:bg-blue-400 hover:text-white',
      gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
    }
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-14 h-14 text-xl',
    lg: 'w-16 h-16 text-2xl'
  }

  return (
    <motion.button
      className={cn(
        'rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        positionClasses[position],
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      title={tooltip}
    >
      {children}
    </motion.button>
  )
}
