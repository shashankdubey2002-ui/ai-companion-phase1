'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [currentTime, setCurrentTime] = useState('')
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    // Simulate battery drain
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(20, prev - 0.1))
    }, 10000)
    
    return () => {
      clearInterval(interval)
      clearInterval(batteryInterval)
    }
  }, [])

  return (
    <motion.header 
      className="glass-card border-b border-white/20 px-2 sm:px-4 py-2 sm:py-3 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-4">
        {/* Left side - Status indicators */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.div 
            className="text-xs sm:text-sm font-medium text-gray-900 font-mono"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentTime}
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-4 h-2 sm:w-6 sm:h-3 border border-gray-400 rounded-sm overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-sm"
                style={{ width: `${batteryLevel}%` }}
                animate={{ 
                  background: batteryLevel < 20 
                    ? 'linear-gradient(to right, #ef4444, #dc2626)' 
                    : 'linear-gradient(to right, #4ade80, #16a34a)'
                }}
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">{Math.round(batteryLevel)}%</span>
          </motion.div>
        </div>

        {/* Center - App title */}
        <motion.div 
          className="text-sm sm:text-lg font-bold gradient-text text-center flex-1 mx-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex flex-col items-center">
            <span>AI</span>
            <span className="text-xs sm:text-sm">Companion</span>
          </div>
        </motion.div>

        {/* Right side - Connection status */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex space-x-0.5 sm:space-x-1">
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  className={`w-0.5 h-2 sm:w-1 sm:h-3 rounded-sm ${
                    bar <= 3 ? 'bg-gradient-to-t from-blue-500 to-blue-600' : 'bg-gray-300'
                  }`}
                  animate={{ 
                    opacity: isConnected ? [1, 0.5, 1] : 0.3,
                    scale: isConnected ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: bar * 0.1 
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1 font-medium">4G</span>
          </motion.div>
          
          <motion.div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
            animate={{ 
              scale: isConnected ? [1, 1.2, 1] : 1,
              opacity: isConnected ? [1, 0.7, 1] : 0.5
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
          />
        </div>
      </div>
    </motion.header>
  )
}