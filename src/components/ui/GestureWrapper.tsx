'use client'

import { ReactNode, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface GestureWrapperProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onLongPress?: () => void
  className?: string
  disabled?: boolean
}

export default function GestureWrapper({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onLongPress,
  className = '',
  disabled = false
}: GestureWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useSpring(0)
  const y = useSpring(0)
  const scale = useSpring(1)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    
    const startX = e.clientX
    const startY = e.clientY
    let startTime = Date.now()
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      
      x.set(deltaX * 0.1)
      y.set(deltaY * 0.1)
      scale.set(0.95)
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      const deltaTime = Date.now() - startTime
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime
      
      if (velocity > 0.5) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) {
            onSwipeRight?.()
          } else if (deltaX < -50) {
            onSwipeLeft?.()
          }
        } else {
          if (deltaY > 50) {
            onSwipeDown?.()
          } else if (deltaY < -50) {
            onSwipeUp?.()
          }
        }
      } else if (deltaTime < 300) {
        onTap?.()
      } else if (deltaTime > 500) {
        onLongPress?.()
      }
      
      x.set(0)
      y.set(0)
      scale.set(1)
      
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return
    
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    let startTime = Date.now()
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      
      x.set(deltaX * 0.1)
      y.set(deltaY * 0.1)
      scale.set(0.95)
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      const deltaTime = Date.now() - startTime
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime
      
      if (velocity > 0.5) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) {
            onSwipeRight?.()
          } else if (deltaX < -50) {
            onSwipeLeft?.()
          }
        } else {
          if (deltaY > 50) {
            onSwipeDown?.()
          } else if (deltaY < -50) {
            onSwipeUp?.()
          }
        }
      } else if (deltaTime < 300) {
        onTap?.()
      } else if (deltaTime > 500) {
        onLongPress?.()
      }
      
      x.set(0)
      y.set(0)
      scale.set(1)
      
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <motion.div
      ref={ref}
      className={`touch-none ${className}`}
      style={{
        x,
        y,
        scale
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </motion.div>
  )
}